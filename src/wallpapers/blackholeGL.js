import { createFlow } from './surge';

// Ray-traced black hole (WebGL). Each pixel fires a light ray that bends around a
// Schwarzschild black hole (units: Schwarzschild radius = 1), so the far side of the
// accretion disk appears lensed over and under the horizon, as in Interstellar.

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform vec2 uCenter;
uniform float uTime;
uniform float uFlow;   // accumulated disk flow phase (speed surges, never jumps)
uniform float uSurge;  // 0..1, current surge strength
uniform vec3 uFg;
uniform vec3 uAccent;
uniform vec3 uBg;

const float RIN = 2.6;
const float ROUT = 15.0;

float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x), mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x), mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
    f.z);
}

float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + 7.1;
    a *= 0.5;
  }
  return v;
}

// Filaments: fast variation across radius, slow along the orbit -> long streaks.
// detail fades the finest octave on lensed images, where it would alias into dots.
float filaments(float r, float a, float detail) {
  vec2 c = vec2(cos(a), sin(a));
  float n = fbm(vec3(r * 2.4, c * 1.6));
  float fine = noise(vec3(r * 9.0, c * 4.0));
  return n * 0.8 + mix(0.22, fine, detail) * 0.45;
}

vec3 disk(vec3 p, vec3 dir, float detail, out float alpha) {
  float r = length(p.xz);
  float phi = atan(p.z, p.x);
  float omega = 1.6 * pow(r, -1.5);

  // Differential rotation shears the filaments. Two phases cross-fade so the
  // pattern keeps flowing without winding up forever. Everything time-dependent
  // in the disk must go through f1/f2 — raw uTime here would shear without bound
  // and break the streaks into speckle after a few minutes.
  float T = uFlow;
  float f1 = fract(T);
  float f2 = fract(T + 0.5);
  float w1 = 1.0 - abs(2.0 * f1 - 1.0);
  float a1 = phi + omega * f1 * 9.0;
  float a2 = phi + omega * f2 * 9.0;
  float dens = w1 * filaments(r, a1, detail) + (1.0 - w1) * filaments(r + 3.3, a2, detail);

  dens = 0.15 + dens * 0.95;
  float edge = smoothstep(RIN * 0.92, RIN + 1.0, r) * (1.0 - smoothstep(ROUT * 0.5, ROUT, r));
  float temp = pow(RIN / r, 1.05);

  // Doppler beaming: gas moving toward the camera is much brighter.
  vec3 v = normalize(vec3(-p.z, 0.0, p.x)) * sqrt(0.5 / r);
  float dop = pow(max(1.0 + 1.5 * dot(v, -dir), 0.15), 3.0);

  float b = temp * edge * dens * dop * (1.0 + 0.22 * uSurge);
  alpha = clamp(b * 1.3, 0.0, 1.0);

  vec3 deep = uFg * 0.45;
  vec3 hot = mix(uAccent, vec3(1.0), 0.75);
  vec3 col = mix(deep, uFg, smoothstep(0.05, 0.5, temp * dens));
  col = mix(col, hot, smoothstep(0.5, 1.3, b));

  // Plasma flares: bright blue-white knots riding the inner disk (same bounded flow).
  float k1 = noise(vec3(r * 1.3, cos(a1) * 2.5, sin(a1) * 2.5 + f1 * 1.5));
  float k2 = noise(vec3(r * 1.3 + 5.1, cos(a2) * 2.5, sin(a2) * 2.5 + f2 * 1.5));
  float flare = smoothstep(0.7, 0.92, w1 * k1 + (1.0 - w1) * k2);
  flare *= smoothstep(RIN * 2.6, RIN * 1.1, r) * dop * mix(0.5, 1.0, detail) * (0.6 + 1.1 * uSurge);
  alpha = clamp(alpha + flare * 0.5, 0.0, 1.0);
  return col * b * 1.9 + vec3(0.8, 0.9, 1.0) * flare * 1.4;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - uCenter) / uRes.y;
  float roll = -0.3;
  uv = mat2(cos(roll), sin(roll), -sin(roll), cos(roll)) * uv;

  float el = 0.12 + 0.035 * sin(uTime * 0.07);
  float az = 0.2 * sin(uTime * 0.045);
  vec3 camPos = vec3(sin(az) * cos(el), sin(el), -cos(az) * cos(el)) * 12.0;
  vec3 fwd = normalize(-camPos);
  vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
  vec3 up = cross(fwd, right);
  vec3 dir = normalize(fwd + (uv.x * right + uv.y * up) * 1.15);

  vec3 pos = camPos;
  vec3 vel = dir;
  float h2 = dot(cross(pos, vel), cross(pos, vel));

  vec3 col = vec3(0.0);
  float alpha = 0.0;
  vec3 haze = vec3(0.0);
  float minR = 100.0;
  float crossings = 0.0;
  bool captured = false;

  for (int i = 0; i < 180; i++) {
    float r2 = dot(pos, pos);
    float r = sqrt(r2);
    float dt = clamp(0.07 * r, 0.04, 1.4);
    vec3 old = pos;
    // Photon geodesic: x'' = -1.5 h^2 x / |x|^5
    vel += -1.5 * h2 * pos / (r2 * r2 * r) * dt;
    pos += vel * dt;

    minR = min(minR, r);
    // Soft glowing gas around the disk plane.
    float rr = length(pos.xz);
    haze += uFg * dt * 0.009 * exp(-abs(pos.y) * 0.7) * smoothstep(ROUT * 1.1, RIN, rr) * (1.0 - alpha);

    if (old.y * pos.y < 0.0) {
      vec3 p = mix(old, pos, old.y / (old.y - pos.y));
      float pr = length(p.xz);
      if (pr > RIN * 0.9 && pr < ROUT) {
        float a;
        // First crossing is the direct image; later ones are lensed and compressed.
        vec3 c = disk(p, normalize(vel), crossings < 0.5 ? 1.0 : 0.25, a);
        crossings += 1.0;
        col += c * (1.0 - alpha);
        alpha += a * (1.0 - alpha);
        if (alpha > 0.97) break;
      }
    }
    if (r < 1.0) { captured = true; break; }
    if (r > 45.0 && dot(pos, vel) > 0.0) break;
  }

  vec3 bg = uBg * 0.6;
  if (!captured) {
    vec3 d = normalize(vel);
    vec3 q = d * 220.0;
    vec3 cell = floor(q);
    float s = hash(cell);
    float core = 1.0 - smoothstep(0.08, 0.3, length(fract(q) - 0.5));
    float star = step(0.992, s) * core * (0.55 + 0.45 * sin(uTime * 1.5 + s * 90.0));
    bg += star * mix(uFg, vec3(1.0), 0.7) * 0.9;
  } else {
    bg = vec3(0.0);
  }

  vec3 hot = mix(uAccent, vec3(1.0), 0.6);
  float ring = exp(-max(minR - 1.5, 0.0) * 2.2) * (captured ? 0.35 : 1.0);
  col += bg * (1.0 - alpha) + haze + hot * ring * 0.25 * (1.0 - alpha * 0.6);
  col = 1.0 - exp(-col * 1.35);
  gl_FragColor = vec4(col, 1.0);
}
`;

const compile = (gl, type, src) => {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn('blackhole shader:', gl.getShaderInfoLog(s));
    return null;
  }
  return s;
};

const norm = (rgb) => rgb.map((v) => v / 255);

/** Returns a scene or null when WebGL isn't available (caller falls back to 2D). */
export function blackholeGL(canvas, palette) {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl) return null;

  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const u = (name) => gl.getUniformLocation(program, name);
  const uRes = u('uRes');
  const uCenter = u('uCenter');
  const uTime = u('uTime');
  const uFlow = u('uFlow');
  const uSurge = u('uSurge');
  // Base flow is a touch faster than before; surges briefly push it ~2.5x.
  const flow = createFlow(0.1, 1.6);
  gl.uniform3fv(u('uFg'), norm(palette.fg));
  gl.uniform3fv(u('uAccent'), norm(palette.accent));
  gl.uniform3fv(u('uBg'), norm(palette.bg));

  // Ray tracing is heavy: render below CSS resolution and drop further if frames run slow.
  const MAX_SCALE = 0.6;
  let scale = MAX_SCALE;
  let cssW = 0;
  let cssH = 0;
  let slow = 0;

  const applySize = () => {
    canvas.width = Math.max(1, Math.round(cssW * scale));
    canvas.height = Math.max(1, Math.round(cssH * scale));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    // Keep the hole right of center on wide screens so desktop icons stay clear.
    const cx = cssW > 900 ? 0.62 : 0.5;
    gl.uniform2f(uCenter, canvas.width * cx, canvas.height * 0.52);
  };

  return {
    fps: 40,
    resize(w, h) {
      cssW = w;
      cssH = h;
      applySize();
    },
    frame(t, dt) {
      // Adapt resolution both ways, so one slow moment (a drag, a tab switch) isn't permanent.
      if (dt > 45) slow += 1;
      else if (dt < 30) slow -= 1;
      if (slow > 20 && scale > 0.35) {
        scale = Math.max(0.35, scale * 0.8);
        slow = 0;
        applySize();
      } else if (slow < -240 && scale < MAX_SCALE) {
        scale = Math.min(MAX_SCALE, scale * 1.15);
        slow = 0;
        applySize();
      }
      gl.uniform1f(uTime, t / 1000);
      gl.uniform1f(uFlow, flow.step(t, dt));
      gl.uniform1f(uSurge, flow.level);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    destroy() {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    },
  };
}
