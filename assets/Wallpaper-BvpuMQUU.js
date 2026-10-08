import{E as e,S as t,T as n,_ as r,a as i,c as a,d as o,f as s,g as c,h as l,i as u,l as d,m as f,n as p,o as m,p as h,r as g,s as _,u as v,v as y,w as b,y as x}from"./index-iLLZF77f.js";var S=e(),C=m(),w=[{id:`terminal`,title:`Terminal`,file:`Terminal`,glyph:`>_`,size:[720,460]},{id:`about`,title:`whoami.txt`,file:`whoami.txt`,glyph:`◉`,size:[560,480]},{id:`projects`,title:`Projects`,file:`Projects/`,glyph:`▤`,size:[760,500]},{id:`experience`,title:`Work.log`,file:`Work.log`,glyph:`⚒`,size:[600,480]},{id:`skills`,title:`Skills.cfg`,file:`Skills.cfg`,glyph:`★`,size:[560,460]},{id:`resume`,title:`Resume.pdf`,file:`Resume.pdf`,glyph:`▧`,size:[520,420]},{id:`contact`,title:`Mail`,file:`Mail`,glyph:`✉`,size:[480,380]},{id:`settings`,title:`Settings`,file:`Settings`,glyph:`⚙`,size:[460,440]}],T=e=>w.find(t=>t.id===e),E=e=>{let t=String(e||``).toLowerCase().replace(/\/$/,``);return w.find(e=>e.id===t||e.title.toLowerCase().replace(/\/$/,``)===t||e.file.toLowerCase().replace(/\/$/,``)===t)},D=(0,S.createContext)(null),ee=D.Provider,O={LIVE:`ok`,ACTIVE:`accent`,DONE:`dim`},k=({value:e})=>{let t=(0,S.useContext)(D);if(e==null||e===!1)return null;if(typeof e==`string`||typeof e==`number`)return e;if(Array.isArray(e))return e.map((e,t)=>(0,C.jsx)(k,{value:e},t));if(e.cmd){let n=e.label??e.cmd;return t?(0,C.jsx)(`button`,{type:`button`,className:`blk-cmd`,onClick:()=>t(e.cmd),title:`Run: ${e.cmd}`,children:n}):(0,C.jsx)(`code`,{className:`blk-cmd`,children:n})}if(e.href){let t=/^https?:/.test(e.href);return(0,C.jsx)(`a`,{className:`blk-link`,href:e.href,onClick:()=>_(`click`),...t?{target:`_blank`,rel:`noreferrer`}:{},children:e.label??e.href.replace(/^(https?:\/\/|mailto:)(www\.)?/,``)})}if(e.badge){let t=e.tone??O[e.badge]??`dim`;return(0,C.jsxs)(`span`,{className:`blk-badge tone-${t}`,children:[`● `,e.badge]})}return e.b?(0,C.jsx)(`strong`,{children:e.b}):e.dim?(0,C.jsx)(`span`,{className:`tone-dim`,children:e.dim}):e.accent?(0,C.jsx)(`span`,{className:`tone-accent`,children:e.accent}):null},A=({block:e})=>{switch(e.type){case`heading`:return(0,C.jsx)(`div`,{className:`blk-heading`,children:e.text});case`pre`:return(0,C.jsx)(`pre`,{className:`blk-pre`,children:e.text});case`list`:return(0,C.jsx)(`ul`,{className:`blk-list`,children:e.items.map((e,t)=>(0,C.jsx)(`li`,{children:(0,C.jsx)(k,{value:e})},t))});case`kv`:return(0,C.jsx)(`dl`,{className:`blk-kv`,children:e.items.map(([e,t])=>(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`dt`,{children:e}),(0,C.jsx)(`dd`,{children:(0,C.jsx)(k,{value:t})})]},e))});case`table`:return(0,C.jsx)(`div`,{className:`blk-table-wrap`,children:(0,C.jsxs)(`table`,{className:`blk-table`,children:[e.head&&(0,C.jsx)(`thead`,{children:(0,C.jsx)(`tr`,{children:e.head.map((t,n)=>(0,C.jsx)(`th`,{className:e.wideOnly?.includes(n)?`wide-only`:void 0,children:t},t))})}),(0,C.jsx)(`tbody`,{children:e.rows.map((t,n)=>(0,C.jsx)(`tr`,{children:t.map((t,n)=>(0,C.jsx)(`td`,{className:e.wideOnly?.includes(n)?`wide-only`:void 0,children:(0,C.jsx)(k,{value:t})},n))},n))})]})});case`spacer`:return(0,C.jsx)(`div`,{className:`blk-spacer`});default:return(0,C.jsx)(`p`,{className:`blk-text${e.tone?` tone-${e.tone}`:``}`,children:(0,C.jsx)(k,{value:e.text})})}},j=({blocks:e,reveal:t=!1})=>(0,C.jsx)(`div`,{className:`blocks${t?` blocks-reveal`:``}`,children:e.map((e,t)=>(0,C.jsx)(`div`,{className:`blk`,style:{"--i":t},children:(0,C.jsx)(A,{block:e})},t))}),M=(e,t)=>({type:`text`,text:e,tone:t}),N=e=>[M(e,`error`)],P=[{name:`help`,desc:`List available commands`,run:()=>te()},{name:`whoami`,aliases:[`about`],desc:`Who is Akash?`,run:()=>y()},{name:`projects`,aliases:[`project`],args:`[n]`,complete:()=>t.map((e,t)=>String(t+1)),desc:`List projects, or show one`,run:([e])=>{if(!e)return l();let n=h(e);return n?f(n):N(`projects: no project '${e}' (1–${t.length})`)}},{name:`experience`,aliases:[`work`],desc:`Work history`,run:()=>s()},{name:`ezuraarc`,aliases:[`company`,`studio`],desc:`${b.role} @ ${b.name}`,run:()=>d()},{name:`education`,desc:`Education`,run:()=>o()},{name:`skills`,args:`[--group]`,complete:()=>x.map(e=>`--${e.flag}`),desc:`Skills, optionally filtered`,run:([e])=>{if(!e)return c();let t=e.replace(/^-+/,``);return x.some(e=>e.flag===t)?c(t):N(`skills: unknown group '${e}'. Try: ${x.map(e=>`--${e.flag}`).join(` `)}`)}},{name:`contact`,aliases:[`email`],desc:`How to reach me`,run:()=>v()},{name:`resume`,desc:`Open the resume`,run:(e,t)=>(t.openApp(`resume`),[M(`Opening Resume.pdf…`,`dim`)])},{name:`github`,desc:`GitHub profile`,run:()=>[M({href:n.links.github})]},{name:`linkedin`,desc:`LinkedIn profile`,run:()=>[M({href:n.links.linkedin})]},{name:`ls`,desc:`List apps on this system`,run:()=>[{type:`table`,rows:w.map(e=>[{dim:e.glyph},{cmd:`open ${e.id}`,label:e.file}])}]},{name:`open`,args:`<app|github|linkedin|ezuraarc>`,complete:()=>[...w.map(e=>e.id),...Object.keys(n.links)],desc:`Open an app or link`,run:([e],t)=>{if(!e)return N("usage: open <app|github|linkedin|ezuraarc>   (see `ls`)");if(n.links[e])return window.open(n.links[e],`_blank`,`noopener`),[M(`Opening ${e}…`,`dim`)];let r=E(e);return r?(t.openApp(r.id),[M(`Opening ${r.title}…`,`dim`)]):N(`open: '${e}' not found (see \`ls\`)`)}},{name:`theme`,args:`[name]`,complete:()=>g.map(e=>e.id),desc:`Switch phosphor color`,run:([e],t)=>e?g.some(t=>t.id===e)?(t.setTheme(e),[M(`✓ phosphor switched → ${e}`)]):N(`theme: unknown '${e}'`):[M([`current: `,{b:t.theme}]),M(g.flatMap((e,t)=>[t?`  `:``,{cmd:`theme ${e.id}`,label:e.id}]))]},{name:`wallpaper`,aliases:[`bg`],args:`[name]`,complete:()=>u.map(e=>e.id),desc:`Change desktop background`,run:([e],t)=>e?u.some(t=>t.id===e)?(t.setWallpaper(e),[M(`✓ background → ${e}`)]):N(`wallpaper: unknown '${e}'`):[M([`current: `,{b:t.wallpaper}]),M(u.flatMap((e,t)=>[t?`  `:``,{cmd:`wallpaper ${e.id}`,label:e.id}]))]},{name:`style`,args:`[retro|modern]`,complete:()=>[`modern`,`retro`],desc:`Switch art style`,run:([e],t)=>e===`modern`?(t.setStyle(`modern`),[M(`Switching to modern style…`,`dim`)]):!e||e===`retro`?[M([`current: retro. Try `,{cmd:`style modern`}])]:N(`style: unknown '${e}'`)},{name:`sound`,args:`[on|off]`,complete:()=>[`on`,`off`],desc:`Toggle sound effects`,run:([e],t)=>{let n=e===`on`?!1:e===`off`||!t.muted;return t.setMuted(n),[M(`sound ${n?`off`:`on`}`)]}},{name:`crt`,args:`[on|off]`,complete:()=>[`on`,`off`],desc:`Toggle CRT scanlines & flicker`,run:([e],t)=>{let n=e===`on`||e!==`off`&&!t.crt;return t.setCrt(n),[M(`crt effects ${n?`on`:`off`}`)]}},{name:`history`,desc:`Command history`,run:(e,t)=>t.history.length?[{type:`table`,rows:t.history.map((e,t)=>[{dim:String(t+1)},{cmd:e}])}]:[M(`(empty)`,`dim`)]},{name:`date`,desc:`Current date & time`,run:()=>[M(new Date().toString())]},{name:`echo`,args:`<text>`,desc:`Print text`,run:e=>[M(e.join(` `))]},{name:`clear`,desc:`Clear the screen (Ctrl+L)`,run:(e,t)=>t.clear()},{name:`reboot`,desc:`Restart ACLI-OS`,run:(e,t)=>t.reboot()},{name:`exit`,desc:`Close this terminal`,run:(e,t)=>t.closeSelf?t.closeSelf():[M(`nowhere to exit to — this is home.`,`dim`)]},{name:`sudo`,hidden:!0,run:()=>N(`akash is not in the sudoers file. This incident will be reported.`)}],F=new Map;P.forEach(e=>[e.name,...e.aliases||[]].forEach(t=>F.set(t,e)));var I=e=>F.get(e);function te(){return[{type:`heading`,text:`commands`},{type:`table`,rows:P.filter(e=>!e.hidden).map(e=>[{cmd:e.name},{dim:e.args||``},e.desc])},{type:`spacer`},M(`TAB complete · ↑↓ history · Ctrl+L clear · Ctrl+C cancel · click any highlighted command`,`dim`)]}var L=e=>e.trim().split(/\s+/).filter(Boolean),ne=(e,t)=>{let[n,...r]=L(e);if(!n)return[];let i=I(n.toLowerCase());return i?i.run(r,t)||[]:N(`${n}: command not found. Type \`help\`.`)},R=e=>{let t=/\s$/.test(e),n=L(e);if(n.length===0)return[];if(n.length===1&&!t){let e=n[0].toLowerCase();return[...F.keys()].filter(t=>t.startsWith(e)&&!I(t).hidden&&t!==e).sort()}let r=I(n[0].toLowerCase());if(!r?.complete||n.length>2||n.length===2&&t)return[];let i=t?``:n[1].toLowerCase();return r.complete().filter(e=>e.startsWith(i)&&e!==i)},z=(e,t)=>{let n=L(e);return/\s$/.test(e)||n.length===0?`${e}${t} `:(n[n.length-1]=t,`${n.join(` `)} `)},B=`ak@acli:~$`,re=[`help`,`whoami`,`projects`,`experience`,`skills`,`contact`,`theme`,`clear`],ie=1,V=(e,t)=>({id:ie++,line:e,blocks:t});function ae({system:e,variant:t=`desktop`,focused:n=!0}){let a=i(),[o,s]=(0,S.useState)(()=>[V(null,r())]),[c,l]=(0,S.useState)(``),[u,d]=(0,S.useState)(0),[f,p]=(0,S.useState)([]),[m,h]=(0,S.useState)(-1),[g,v]=(0,S.useState)(-1),[y,b]=(0,S.useState)(!1),x=(0,S.useRef)(null),w=(0,S.useRef)(null),T=y?R(c):[],E=()=>x.current?.focus({preventScroll:!0});(0,S.useEffect)(()=>{n&&t===`desktop`&&E()},[n,t]),(0,S.useEffect)(()=>{let e=w.current;e&&(e.scrollTop=e.scrollHeight)},[o]);let D=(0,S.useCallback)(n=>{let r=n.trim();if(_(`enter`),!r){s(e=>[...e,V(``,[])]);return}let i=[...f,r];p(i),h(-1);let o=!1,c=ne(r,{...e,...a,history:i,device:t,clear:()=>{o=!0}});o?s([]):(c[0]?.tone===`error`&&_(`error`),s(e=>[...e,V(r,c)]))},[f,a,e,t]),O=e=>{l(e),d(e.length),v(-1)},k=(0,S.useCallback)(e=>{D(e),O(``),b(!1),E()},[D]),A=e=>{let t=e.key;if(e.ctrlKey&&(t===`l`||t===`L`))e.preventDefault(),s([]);else if(e.ctrlKey&&(t===`c`||t===`C`)&&e.currentTarget.selectionStart===e.currentTarget.selectionEnd)e.preventDefault(),s(e=>[...e,V(`${c}^C`,[])]),O(``),b(!1);else switch(t){case`Enter`:if(e.preventDefault(),g>=0&&T[g]){O(z(c,T[g])),b(!1);return}k(c);return;case`Tab`:{e.preventDefault();let t=R(c);if(t.length===1)O(z(c,t[0])),b(!1);else if(t.length>1){b(!0);let n=e.shiftKey?-1:1;v(e=>(e+n+t.length)%t.length),_(`click`)}return}case`Escape`:b(!1),v(-1);return;case`ArrowUp`:case`ArrowDown`:{if(!f.length)return;e.preventDefault();let n=t===`ArrowUp`?Math.min(m+1,f.length-1):Math.max(m-1,-1);h(n),O(n===-1?``:f[f.length-1-n]),b(!1);return}}},M=e=>{l(e.target.value),d(e.target.selectionStart??e.target.value.length),v(-1),b(e.target.value.trim().length>0),_(`key`)},N=e=>d(e.target.selectionStart??c.length);return(0,C.jsx)(ee,{value:k,children:(0,C.jsxs)(`div`,{className:`term term-${t}`,onClick:e=>{e.target.closest(`a, button, input`)||window.getSelection()?.toString()||E()},children:[(0,C.jsxs)(`div`,{className:`term-log`,ref:w,"aria-live":`polite`,children:[o.map(e=>(0,C.jsxs)(`div`,{className:`term-entry`,children:[e.line!==null&&(0,C.jsxs)(`div`,{className:`term-line`,children:[(0,C.jsx)(`span`,{className:`term-prompt`,children:B}),` `,e.line]}),e.blocks.length>0&&(0,C.jsx)(j,{blocks:e.blocks,reveal:!0})]},e.id)),(0,C.jsxs)(`label`,{className:`term-input-line`,children:[(0,C.jsx)(`span`,{className:`term-prompt`,children:B}),(0,C.jsxs)(`span`,{className:`term-field`,children:[(0,C.jsxs)(`span`,{className:`term-mirror`,"aria-hidden":`true`,children:[c.slice(0,u),(0,C.jsx)(`span`,{className:`term-cursor${n?``:` idle`}`,children:c[u]||` `}),c.slice(u+1)]}),(0,C.jsx)(`input`,{ref:x,className:`term-input`,value:c,onChange:M,onKeyDown:A,onKeyUp:N,onClick:N,onSelect:N,"aria-label":`Terminal command`,autoComplete:`off`,autoCapitalize:`off`,autoCorrect:`off`,spellCheck:!1,enterKeyHint:`go`})]})]}),T.length>0&&(0,C.jsx)(`div`,{className:`term-suggestions`,role:`listbox`,"aria-label":`Completions`,children:T.map((e,t)=>(0,C.jsx)(`button`,{type:`button`,role:`option`,"aria-selected":t===g,className:t===g?`active`:``,onClick:()=>{O(z(c,e)),b(!1),E()},children:e},e))})]}),t===`mobile`&&(0,C.jsx)(`div`,{className:`term-chips`,"aria-label":`Quick commands`,children:re.map(e=>(0,C.jsx)(`button`,{type:`button`,onClick:()=>k(e),children:e},e))})]})})}var H=({children:e,className:t=``})=>(0,C.jsx)(`div`,{className:`app-page ${t}`,children:e}),oe=({system:e,variant:t,focused:n})=>(0,C.jsx)(ae,{system:e,variant:t,focused:n}),se=()=>(0,C.jsxs)(H,{children:[(0,C.jsx)(`pre`,{className:`app-logo`,"aria-hidden":`true`,children:a}),(0,C.jsx)(j,{blocks:y()})]}),ce=({variant:e,props:n})=>{let[r,i]=(0,S.useState)(n?.slug??(e===`desktop`?t[0].slug:null)),a=t.find(e=>e.slug===r);(0,S.useEffect)(()=>{n?.slug&&i(n.slug)},[n?.slug]);let o=e=>{_(`click`),i(e)},s=(0,C.jsx)(`ul`,{className:`proj-list`,role:`listbox`,"aria-label":`Projects`,children:t.map(e=>(0,C.jsx)(`li`,{children:(0,C.jsxs)(`button`,{type:`button`,role:`option`,"aria-selected":e.slug===r,className:e.slug===r?`active`:``,onClick:()=>o(e.slug),children:[(0,C.jsxs)(`span`,{className:`proj-name`,children:[`▸ `,e.name]}),(0,C.jsxs)(`span`,{className:`proj-status s-${e.status.toLowerCase()}`,children:[`● `,e.status]})]})},e.slug))});return e===`mobile`?(0,C.jsx)(H,{children:a?(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(`button`,{type:`button`,className:`app-back`,onClick:()=>o(null),children:`‹ all projects`}),(0,C.jsx)(j,{blocks:f(a)})]}):s}):(0,C.jsxs)(`div`,{className:`proj-split`,children:[(0,C.jsx)(`div`,{className:`proj-pane`,children:s}),(0,C.jsx)(`div`,{className:`proj-detail`,children:a&&(0,C.jsx)(j,{blocks:f(a),reveal:!0},a.slug)})]})},le=()=>(0,C.jsx)(H,{children:(0,C.jsx)(j,{blocks:[...s(),{type:`spacer`},...o()]})}),ue=()=>(0,C.jsx)(H,{children:x.map(e=>(0,C.jsxs)(`section`,{className:`skill-group`,children:[(0,C.jsx)(`h3`,{className:`blk-heading`,children:e.label}),(0,C.jsx)(`div`,{className:`skill-chips`,children:e.items.map(e=>(0,C.jsx)(`span`,{className:`chip`,children:e},e))})]},e.flag))}),de=()=>(0,C.jsxs)(H,{className:`center`,children:[(0,C.jsx)(`pre`,{className:`app-logo small`,"aria-hidden":`true`,children:`┌──────────┐
│ ▤▤▤▤▤▤▤▤ │
│ ▤▤▤▤▤    │
│ ▤▤▤▤▤▤▤  │
│ ▤▤▤      │
└──────────┘`}),(0,C.jsx)(`p`,{className:`tone-dim`,children:`Resume.pdf — public copy coming soon.`}),(0,C.jsxs)(`p`,{children:[`Meanwhile:`,` `,(0,C.jsx)(`a`,{className:`blk-link`,href:n.links.linkedin,target:`_blank`,rel:`noreferrer`,children:`LinkedIn`})]})]}),fe=()=>(0,C.jsxs)(H,{children:[(0,C.jsx)(j,{blocks:v()}),(0,C.jsxs)(`div`,{className:`app-actions`,children:[(0,C.jsx)(`a`,{className:`btn`,href:`mailto:${n.email}`,onClick:()=>_(`click`),children:`✉ Send email`}),(0,C.jsx)(`a`,{className:`btn`,href:n.links.github,target:`_blank`,rel:`noreferrer`,onClick:()=>_(`click`),children:`GitHub`}),(0,C.jsx)(`a`,{className:`btn`,href:n.links.linkedin,target:`_blank`,rel:`noreferrer`,onClick:()=>_(`click`),children:`LinkedIn`}),(0,C.jsxs)(`a`,{className:`btn`,href:b.url,target:`_blank`,rel:`noopener`,onClick:()=>_(`click`),children:[b.name,` ↗`]})]})]}),U=({label:e,on:t,onChange:n})=>(0,C.jsxs)(`button`,{type:`button`,role:`switch`,"aria-checked":t,className:`toggle`,onClick:()=>{n(!t),_(`click`)},children:[(0,C.jsx)(`span`,{children:e}),(0,C.jsxs)(`span`,{className:`toggle-state`,children:[`[`,t?`■ ON `:` OFF□`,`]`]})]}),pe=()=>{let{theme:e,setTheme:t}=i();return(0,C.jsx)(`div`,{className:`theme-picker`,role:`radiogroup`,"aria-label":`Phosphor color`,children:g.map(n=>(0,C.jsxs)(`button`,{type:`button`,role:`radio`,"aria-checked":e===n.id,className:e===n.id?`active`:``,onClick:()=>{t(n.id),_(`click`)},children:[(0,C.jsx)(`span`,{className:`swatch`,style:{background:n.swatch}}),n.label]},n.id))})},me=()=>{let{wallpaper:e,setWallpaper:t}=i();return(0,C.jsx)(`div`,{className:`theme-picker`,role:`radiogroup`,"aria-label":`Background`,children:u.map(n=>(0,C.jsx)(`button`,{type:`button`,role:`radio`,"aria-checked":e===n.id,className:e===n.id?`active`:``,onClick:()=>{t(n.id),_(`click`)},children:n.label},n.id))})},W=({system:e})=>{let{muted:t,setMuted:n,crt:r,setCrt:a,setStyle:o}=i();return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(`h3`,{className:`blk-heading`,children:`phosphor`}),(0,C.jsx)(pe,{}),(0,C.jsx)(`h3`,{className:`blk-heading`,children:`background`}),(0,C.jsx)(me,{}),(0,C.jsx)(`h3`,{className:`blk-heading`,children:`system`}),(0,C.jsx)(U,{label:`Sound effects`,on:!t,onChange:e=>n(!e)}),(0,C.jsx)(U,{label:`CRT scanlines & flicker`,on:r,onChange:a}),(0,C.jsxs)(`div`,{className:`app-actions`,children:[(0,C.jsx)(`button`,{type:`button`,className:`btn`,onClick:()=>e.reboot(),children:`↻ Replay boot`}),(0,C.jsx)(`button`,{type:`button`,className:`btn`,onClick:()=>o(`modern`),children:`✦ Switch to Modern style`})]})]})},he={terminal:oe,about:se,projects:ce,experience:le,skills:ue,resume:de,contact:fe,settings:({system:e})=>(0,C.jsx)(H,{children:(0,C.jsx)(W,{system:e})})},ge=e=>{let t=e.trim();if(t.startsWith(`#`)){let e=t.length===4?t.slice(1).replace(/./g,e=>e+e):t.slice(1,7),n=parseInt(e,16);return[n>>16&255,n>>8&255,n&255]}let n=t.match(/\d+(\.\d+)?/g);return n?n.slice(0,3).map(Number):[255,255,255]},_e=()=>{let e=getComputedStyle(document.documentElement),t=t=>ge(e.getPropertyValue(t)||`#ffffff`);return{bg:t(`--bg`),fg:t(`--fg`),dim:t(`--dim`),accent:t(`--accent`)}},G=([e,t,n],r=1)=>`rgba(${e},${t},${n},${r})`,K=(e,t,n)=>e.map((e,r)=>Math.round(e+(t[r]-e)*n)),q=Math.PI*2,J=[255,255,255];function ve(e,t){let n=0,r=0,i=0,a=0,o=0,s=K(t.accent,J,.55),c=K(t.fg,t.accent,.35),l=.2,u=Array.from({length:360},()=>({x:Math.random(),y:Math.random(),size:Math.random()<.08?2:1,phase:Math.random()*q,speed:.4+Math.random()})),d=[],f=(e,t)=>{n=e,r=t,i=n*(n>900?.6:.5),a=r*.47,o=Math.max(30,Math.min(n,r)*.105);let s=Math.round(Math.min(1400,Math.max(400,n*r/1100)));d=Array.from({length:s},()=>({u:Math.random()**1.6,a:Math.random()*q,width:.6+Math.random()*1.4,jitter:(Math.random()-.5)*.12}))},p=()=>o*1.5,m=()=>o*4.6,h=o=>{e.save(),e.beginPath(),e.rect(0,o<0?0:a,n,o<0?a:r-a),e.clip(),e.translate(i,a),e.scale(1,l);let u=e.createRadialGradient(0,0,p()*.95,0,0,m());u.addColorStop(0,G(s,0)),u.addColorStop(.04,G(s,.95)),u.addColorStop(.2,G(c,.6)),u.addColorStop(.55,G(t.fg,.22)),u.addColorStop(1,G(t.fg,0)),e.fillStyle=u,e.beginPath(),e.arc(0,0,m(),0,q),e.arc(0,0,p()*.95,0,q,!0),e.fill(),e.restore()},g=(n,r)=>{let u=p(),f=m();for(let p of d){let d=u+(f-u)*p.u,m=9e-4*(u/d)**1.5;r&&(p.a+=n*m);let h=Math.sin(p.a);if(r!==h>0)continue;let g=1-p.u,_=g>.6?K(c,s,(g-.6)/.4):K(t.fg,c,g/.6),v=.55+.45*Math.cos(p.a),y=.05+m*160,b=p.jitter*o*.6;e.strokeStyle=G(_,(.15+g*.7)*v),e.lineWidth=p.width,e.beginPath(),e.moveTo(i+d*Math.cos(p.a-y),a+d*Math.sin(p.a-y)*l+b),e.lineTo(i+d*Math.cos(p.a),a+d*h*l+b),e.stroke()}};return{resize:f,frame:(l,d)=>{e.globalCompositeOperation=`source-over`,e.fillStyle=G(t.bg),e.fillRect(0,0,n,r);let f=l*4e-6;for(let s of u){let c=(s.x+f*s.speed)%1*n,u=s.y*r,d=c-i,p=u-a,m=Math.hypot(d,p)||1;if(m<o*1.2)continue;let h=o*o*2.6/m;c+=d/m*h,u+=p/m*h,e.fillStyle=G(K(t.fg,J,.6),.35+.35*Math.sin(l*.0015*s.speed+s.phase)),e.fillRect(c,u,s.size,s.size)}e.globalCompositeOperation=`lighter`;let p=e.createRadialGradient(i,a,o,i,a,o*8);p.addColorStop(0,G(t.fg,.35)),p.addColorStop(.35,G(t.fg,.1)),p.addColorStop(1,G(t.fg,0)),e.fillStyle=p,e.fillRect(0,0,n,r),h(-1),g(d,!1);let m=1+.04*Math.sin(l*.0012),_=e.createRadialGradient(i,a,o*.98,i,a,o*2.1*m);_.addColorStop(0,G(s,.95)),_.addColorStop(.12,G(c,.55)),_.addColorStop(.4,G(t.fg,.16)),_.addColorStop(1,G(t.fg,0)),e.fillStyle=_,e.beginPath(),e.arc(i,a,o*2.1*m,0,q),e.fill(),e.globalCompositeOperation=`source-over`,e.fillStyle=`#000`,e.beginPath(),e.arc(i,a,o,0,q),e.fill(),e.globalCompositeOperation=`lighter`,e.shadowColor=G(s),e.shadowBlur=o*.35,e.strokeStyle=G(s,.9),e.lineWidth=Math.max(1.5,o*.035),e.beginPath(),e.arc(i,a,o*1.02,0,q),e.stroke(),e.shadowBlur=0,h(1),g(d,!0),e.globalCompositeOperation=`source-over`}}}var ye=`
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`,be=`
precision highp float;
uniform vec2 uRes;
uniform vec2 uCenter;
uniform float uTime;
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
float filaments(float r, float a) {
  vec2 c = vec2(cos(a), sin(a));
  float n = fbm(vec3(r * 2.4, c * 1.6));
  float fine = noise(vec3(r * 11.0, c * 5.0));
  return n * 0.8 + fine * 0.45;
}

vec3 disk(vec3 p, vec3 dir, out float alpha) {
  float r = length(p.xz);
  float phi = atan(p.z, p.x);
  float omega = 1.6 * pow(r, -1.5);

  // Differential rotation shears the filaments. Two phases cross-fade so the
  // pattern keeps flowing without winding up forever.
  float T = uTime * 0.07;
  float f1 = fract(T);
  float f2 = fract(T + 0.5);
  float w1 = 1.0 - abs(2.0 * f1 - 1.0);
  float dens = w1 * filaments(r, phi + omega * f1 * 9.0) + (1.0 - w1) * filaments(r + 3.3, phi + omega * f2 * 9.0);

  dens = 0.15 + dens * 0.95;
  float edge = smoothstep(RIN * 0.92, RIN + 1.0, r) * (1.0 - smoothstep(ROUT * 0.5, ROUT, r));
  float temp = pow(RIN / r, 1.05);

  // Doppler beaming: gas moving toward the camera is much brighter.
  vec3 v = normalize(vec3(-p.z, 0.0, p.x)) * sqrt(0.5 / r);
  float dop = pow(max(1.0 + 1.5 * dot(v, -dir), 0.15), 3.0);

  float b = temp * edge * dens * dop;
  alpha = clamp(b * 1.3, 0.0, 1.0);

  vec3 deep = uFg * 0.45;
  vec3 hot = mix(uAccent, vec3(1.0), 0.75);
  vec3 col = mix(deep, uFg, smoothstep(0.05, 0.5, temp * dens));
  col = mix(col, hot, smoothstep(0.5, 1.3, b));

  // Plasma flares: bright blue-white knots riding the inner disk.
  float fa = phi + omega * uTime * 0.6;
  float flare = smoothstep(0.7, 0.92, noise(vec3(r * 1.3, cos(fa) * 2.5, sin(fa) * 2.5 + uTime * 0.15)));
  flare *= smoothstep(RIN * 2.6, RIN * 1.1, r) * dop;
  alpha = clamp(alpha + flare * 0.5, 0.0, 1.0);
  return col * b * 1.9 + vec3(0.8, 0.9, 1.0) * flare * 1.4;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - uCenter) / uRes.y;
  float roll = -0.3;
  uv = mat2(cos(roll), sin(roll), -sin(roll), cos(roll)) * uv;

  float el = 0.12 + 0.025 * sin(uTime * 0.05);
  float az = 0.15 * sin(uTime * 0.03);
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
        vec3 c = disk(p, normalize(vel), a);
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
`,Y=(e,t,n)=>{let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(console.warn(`blackhole shader:`,e.getShaderInfoLog(r)),null)},X=e=>e.map(e=>e/255);function xe(e,t){let n=e.getContext(`webgl`,{antialias:!1,alpha:!1,powerPreference:`low-power`});if(!n)return null;let r=Y(n,n.VERTEX_SHADER,ye),i=Y(n,n.FRAGMENT_SHADER,be);if(!r||!i)return null;let a=n.createProgram();if(n.attachShader(a,r),n.attachShader(a,i),n.linkProgram(a),!n.getProgramParameter(a,n.LINK_STATUS))return null;n.useProgram(a);let o=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,o),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),n.STATIC_DRAW);let s=n.getAttribLocation(a,`aPos`);n.enableVertexAttribArray(s),n.vertexAttribPointer(s,2,n.FLOAT,!1,0,0);let c=e=>n.getUniformLocation(a,e),l=c(`uRes`),u=c(`uCenter`),d=c(`uTime`);n.uniform3fv(c(`uFg`),X(t.fg)),n.uniform3fv(c(`uAccent`),X(t.accent)),n.uniform3fv(c(`uBg`),X(t.bg));let f=.6,p=0,m=0,h=0,g=()=>{e.width=Math.max(1,Math.round(p*f)),e.height=Math.max(1,Math.round(m*f)),n.viewport(0,0,e.width,e.height),n.uniform2f(l,e.width,e.height);let t=p>900?.62:.5;n.uniform2f(u,e.width*t,e.height*.52)};return{fps:40,resize(e,t){p=e,m=t,g()},frame(e,t){t>45?h+=1:h=Math.max(0,h-1),h>20&&f>.3&&(f*=.8,h=0,g()),n.uniform1f(d,e/1e3),n.drawArrays(n.TRIANGLES,0,3)},destroy(){n.deleteBuffer(o),n.deleteProgram(a),n.deleteShader(r),n.deleteShader(i)}}}var Z=Math.PI*2,Q=[255,255,255],Se=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},Ce=(e,t)=>{let n=new Float32Array(e+1);n[0]=Math.random(),n[e]=Math.random();for(let r=e,i=1;r>1;r/=2,i*=t)for(let t=r/2;t<e;t+=r)n[t]=(n[t-r/2]+n[t+r/2])/2+(Math.random()-.5)*i;let r=1/0,i=-1/0;return n.forEach(e=>{r=Math.min(r,e),i=Math.max(i,e)}),n.map(e=>(e-r)/(i-r||1))};function we(e,t){let n=0,r=0,i=0,a=0,o=0,s=0,c=[],l=[],u=Array.from({length:220},()=>({x:Math.random(),y:Math.random()**1.6,p:Math.random()*Z,s:Math.random()})),d=K(t.accent,Q,.35),f=(e,t)=>{n=e,r=t,i=Math.round(r*.62),a=n*(n>900?.6:.5),o=Math.min(n,r)*.22,s=i-o*.5,c=[{height:.2,rough:.55,tint:.2},{height:.14,rough:.6,tint:.1},{height:.08,rough:.65,tint:.03}].map(e=>{let t=Ce(256,e.rough),o=[];for(let s=0;s<=256;s++){let c=s/256*n,l=.25+.75*Se(0,n*.28,Math.abs(c-a));o.push([c,i-t[s]*r*e.height*l])}return{...e,pts:o}})},p=r=>{let a=e.createLinearGradient(0,0,0,i);a.addColorStop(0,G(t.bg)),a.addColorStop(.55,G(K(t.bg,t.fg,.08))),a.addColorStop(1,G(K(t.bg,t.accent,.3))),e.fillStyle=a,e.fillRect(0,0,n,i);for(let a of u){let o=a.y*i*.85,s=1-o/(i*.85);e.fillStyle=G(K(t.fg,Q,.6),(.2+.5*Math.abs(Math.sin(r*8e-4+a.p)))*s),e.fillRect(a.x*n,o,a.s>.92?2:1,a.s>.92?2:1)}Math.random()<.004&&l.length<2&&l.push({x:Math.random()*n,y:Math.random()*i*.4,life:1});for(let n=l.length-1;n>=0;n--){let r=l[n],i=e.createLinearGradient(r.x,r.y,r.x-90,r.y-30);i.addColorStop(0,G(Q,.8*r.life)),i.addColorStop(1,G(t.fg,0)),e.strokeStyle=i,e.lineWidth=1.5,e.beginPath(),e.moveTo(r.x,r.y),e.lineTo(r.x-90,r.y-30),e.stroke(),r.x+=9,r.y+=3,r.life-=.025,r.life<=0&&l.splice(n,1)}},m=r=>{e.globalCompositeOperation=`lighter`;for(let[r,c,l]of[[o*.9,o*2.2,.35],[o,o*4.5,.12]]){let o=e.createRadialGradient(a,s,r,a,s,c);o.addColorStop(0,G(t.accent,l)),o.addColorStop(1,G(t.accent,0)),e.fillStyle=o,e.fillRect(0,0,n,i)}e.globalCompositeOperation=`source-over`,e.save(),e.beginPath(),e.arc(a,s,o,0,Z),e.clip(),e.beginPath();let c=s-o,l=s-o*.3;e.rect(a-o,c,o*2,l-c);let u=o*.18,f=r*.01%u;for(let t=l-u+f;t<s+o;t+=u){let n=u*(.2+Math.max(0,(t-l)/(o*1.15))*.6),r=Math.max(l,t);e.rect(a-o,r,o*2,Math.max(0,t+u-n-r))}e.clip();let p=e.createLinearGradient(0,c,0,s+o);p.addColorStop(0,G(K(d,Q,.4))),p.addColorStop(.45,G(t.accent)),p.addColorStop(1,G(K(t.fg,t.accent,.3))),e.fillStyle=p,e.fillRect(a-o,c,o*2,o*2),e.restore()},h=()=>{c.forEach((o,s)=>{e.beginPath(),e.moveTo(0,i),o.pts.forEach(([t,n])=>e.lineTo(t,n)),e.lineTo(n,i),e.closePath();let c=e.createLinearGradient(0,i-r*o.height,0,i);c.addColorStop(0,G(K(t.bg,t.accent,o.tint))),c.addColorStop(1,G(K(t.bg,t.fg,o.tint*.6))),e.fillStyle=c,e.fill();let l=a/n,u=e.createLinearGradient(0,0,n,0);u.addColorStop(0,G(t.fg,.08)),u.addColorStop(Math.max(0,l-.25),G(t.fg,.3)),u.addColorStop(l,G(d,.95-s*.2)),u.addColorStop(Math.min(1,l+.25),G(t.fg,.3)),u.addColorStop(1,G(t.fg,.08)),e.strokeStyle=u,e.lineWidth=s===2?1.5:1,e.beginPath(),o.pts.forEach(([t,n],r)=>r?e.lineTo(t,n):e.moveTo(t,n)),e.stroke()}),e.globalCompositeOperation=`lighter`;let o=e.createLinearGradient(0,i-r*.07,0,i+r*.06);o.addColorStop(0,G(t.accent,0)),o.addColorStop(.6,G(t.accent,.16)),o.addColorStop(1,G(t.accent,0)),e.fillStyle=o,e.fillRect(0,i-r*.07,n,r*.13),e.globalCompositeOperation=`source-over`},g=s=>{let c=r-i,l=e.createLinearGradient(0,i,0,r);l.addColorStop(0,G(K(t.bg,t.accent,.18))),l.addColorStop(.3,G(K(t.bg,t.fg,.05))),l.addColorStop(1,G(t.bg)),e.fillStyle=l,e.fillRect(0,i,n,c),e.globalCompositeOperation=`lighter`,e.save(),e.translate(a,i),e.scale(.45,1.4);let u=e.createRadialGradient(0,0,0,0,0,o*1.2);u.addColorStop(0,G(t.accent,.35)),u.addColorStop(1,G(t.accent,0)),e.fillStyle=u,e.fillRect(-o*1.3,0,o*2.6,o*1.3),e.restore();let f=e.createLinearGradient(0,i,0,r);f.addColorStop(0,G(t.fg,0)),f.addColorStop(.25,G(t.fg,.45)),f.addColorStop(1,G(t.fg,.9));let p=s*4e-4%1;for(let[t,o]of[[4,.18],[1.2,1]]){e.globalAlpha=o,e.lineWidth=t,e.strokeStyle=f,e.beginPath();for(let t=-30;t<=30;t++)e.moveTo(a+n/70*t,i),e.lineTo(a+n/7.5*t,r);for(let t=0;t<22;t++){let r=i+c*((t+p)/22)**2.6;e.moveTo(0,r),e.lineTo(n,r)}e.stroke()}e.globalAlpha=1,e.shadowColor=G(t.accent),e.shadowBlur=18,e.strokeStyle=G(d,.9),e.lineWidth=1.5,e.beginPath(),e.moveTo(0,i),e.lineTo(n,i),e.stroke(),e.shadowBlur=0,e.globalCompositeOperation=`source-over`};return{resize:f,frame:e=>{p(e),m(e),h(),g(e)}}}var $=e=>(t,n)=>{let r=t.getContext(`2d`),i=e(r,n);return{resize(e,n,a){t.width=Math.round(e*a),t.height=Math.round(n*a),r.setTransform(a,0,0,a,0,0),i.resize(e,n)},frame:i.frame}},Te={blackhole:(e,t)=>xe(e,t)??$(ve)(e,t),synthwave:$(we)};function Ee(){let{wallpaper:e,theme:t}=i(),n=p(),r=(0,S.useRef)(null),a=Te[e];return(0,S.useEffect)(()=>{let e=r.current;if(!e||!a)return;let t=a(e,_e()),i=Math.min(window.devicePixelRatio||1,1.5),o=t.fps?1e3/t.fps:0,s=0,c=performance.now(),l=()=>{t.resize(e.clientWidth,e.clientHeight,i),n&&t.frame(2e4,0)},u=e=>{s=requestAnimationFrame(u),!(e-c<o)&&(t.frame(e,Math.min(e-c,100)),c=e)},d=new ResizeObserver(l);return d.observe(e),l(),n||(s=requestAnimationFrame(u)),()=>{cancelAnimationFrame(s),d.disconnect(),t.destroy?.()}},[a,t,n]),a?(0,C.jsx)(`canvas`,{ref:r,className:`wallpaper`,"aria-hidden":`true`},e):(0,C.jsx)(`div`,{className:`wallpaper phosphor-grid`,"aria-hidden":`true`})}export{T as a,w as i,he as n,W as r,Ee as t};