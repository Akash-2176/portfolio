import{C as e,D as t,E as n,T as r,_ as i,a,b as o,c as s,d as c,f as l,g as u,h as d,i as f,l as p,m,o as h,p as g,r as _,s as v,u as y,v as b,y as x}from"./index-BVs4NLBs.js";var S=t(),C=v(),w=[{id:`terminal`,title:`Terminal`,file:`Terminal`,glyph:`>_`,size:[720,460]},{id:`about`,title:`whoami.txt`,file:`whoami.txt`,glyph:`◉`,size:[560,480]},{id:`projects`,title:`Projects`,file:`Projects/`,glyph:`▤`,size:[760,500]},{id:`experience`,title:`Work.log`,file:`Work.log`,glyph:`⚒`,size:[600,480]},{id:`skills`,title:`Skills.cfg`,file:`Skills.cfg`,glyph:`★`,size:[560,460]},{id:`resume`,title:`Resume.pdf`,file:`Resume.pdf`,glyph:`▧`,size:[520,420]},{id:`contact`,title:`Mail`,file:`Mail`,glyph:`✉`,size:[480,380]},{id:`settings`,title:`Settings`,file:`Settings`,glyph:`⚙`,size:[460,440]}],T=e=>w.find(t=>t.id===e),E=e=>{let t=String(e||``).toLowerCase().replace(/\/$/,``);return w.find(e=>e.id===t||e.title.toLowerCase().replace(/\/$/,``)===t||e.file.toLowerCase().replace(/\/$/,``)===t)},D=(0,S.createContext)(null),ee=D.Provider,O={LIVE:`ok`,ACTIVE:`accent`,DONE:`dim`},k=({value:e})=>{let t=(0,S.useContext)(D);if(e==null||e===!1)return null;if(typeof e==`string`||typeof e==`number`)return e;if(Array.isArray(e))return e.map((e,t)=>(0,C.jsx)(k,{value:e},t));if(e.cmd){let n=e.label??e.cmd;return t?(0,C.jsx)(`button`,{type:`button`,className:`blk-cmd`,onClick:()=>t(e.cmd),title:`Run: ${e.cmd}`,children:n}):(0,C.jsx)(`code`,{className:`blk-cmd`,children:n})}if(e.href){let t=/^https?:/.test(e.href);return(0,C.jsx)(`a`,{className:`blk-link`,href:e.href,onClick:()=>s(`click`),...t?{target:`_blank`,rel:`noreferrer`}:{},children:e.label??e.href.replace(/^(https?:\/\/|mailto:)(www\.)?/,``)})}if(e.badge){let t=e.tone??O[e.badge]??`dim`;return(0,C.jsxs)(`span`,{className:`blk-badge tone-${t}`,children:[`● `,e.badge]})}return e.b?(0,C.jsx)(`strong`,{children:e.b}):e.dim?(0,C.jsx)(`span`,{className:`tone-dim`,children:e.dim}):e.accent?(0,C.jsx)(`span`,{className:`tone-accent`,children:e.accent}):null},te=({block:e})=>{switch(e.type){case`heading`:return(0,C.jsx)(`div`,{className:`blk-heading`,children:e.text});case`pre`:return(0,C.jsx)(`pre`,{className:`blk-pre`,children:e.text});case`list`:return(0,C.jsx)(`ul`,{className:`blk-list`,children:e.items.map((e,t)=>(0,C.jsx)(`li`,{children:(0,C.jsx)(k,{value:e})},t))});case`kv`:return(0,C.jsx)(`dl`,{className:`blk-kv`,children:e.items.map(([e,t])=>(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`dt`,{children:e}),(0,C.jsx)(`dd`,{children:(0,C.jsx)(k,{value:t})})]},e))});case`table`:return(0,C.jsx)(`div`,{className:`blk-table-wrap`,children:(0,C.jsxs)(`table`,{className:`blk-table`,children:[e.head&&(0,C.jsx)(`thead`,{children:(0,C.jsx)(`tr`,{children:e.head.map((t,n)=>(0,C.jsx)(`th`,{className:e.wideOnly?.includes(n)?`wide-only`:void 0,children:t},t))})}),(0,C.jsx)(`tbody`,{children:e.rows.map((t,n)=>(0,C.jsx)(`tr`,{children:t.map((t,n)=>(0,C.jsx)(`td`,{className:e.wideOnly?.includes(n)?`wide-only`:void 0,children:(0,C.jsx)(k,{value:t})},n))},n))})]})});case`spacer`:return(0,C.jsx)(`div`,{className:`blk-spacer`});default:return(0,C.jsx)(`p`,{className:`blk-text${e.tone?` tone-${e.tone}`:``}`,children:(0,C.jsx)(k,{value:e.text})})}},A=({blocks:e,reveal:t=!1})=>(0,C.jsx)(`div`,{className:`blocks${t?` blocks-reveal`:``}`,children:e.map((e,t)=>(0,C.jsx)(`div`,{className:`blk`,style:{"--i":t},children:(0,C.jsx)(te,{block:e})},t))}),j=(e,t)=>({type:`text`,text:e,tone:t}),M=e=>[j(e,`error`)],N=[{name:`help`,desc:`List available commands`,run:()=>ne()},{name:`whoami`,aliases:[`about`],desc:`Who is Akash?`,run:()=>x()},{name:`projects`,aliases:[`project`],args:`[n]`,complete:()=>e.map((e,t)=>String(t+1)),desc:`List projects, or show one`,run:([t])=>{if(!t)return u();let n=m(t);return n?d(n):M(`projects: no project '${t}' (1–${e.length})`)}},{name:`experience`,aliases:[`work`],desc:`Work history`,run:()=>g()},{name:`ezuraarc`,aliases:[`company`,`studio`],desc:`${r.role} @ ${r.name}`,run:()=>y()},{name:`education`,desc:`Education`,run:()=>l()},{name:`skills`,args:`[--group]`,complete:()=>o.map(e=>`--${e.flag}`),desc:`Skills, optionally filtered`,run:([e])=>{if(!e)return i();let t=e.replace(/^-+/,``);return o.some(e=>e.flag===t)?i(t):M(`skills: unknown group '${e}'. Try: ${o.map(e=>`--${e.flag}`).join(` `)}`)}},{name:`contact`,aliases:[`email`],desc:`How to reach me`,run:()=>c()},{name:`resume`,desc:`Open the resume`,run:(e,t)=>(t.openApp(`resume`),[j(`Opening Resume.pdf…`,`dim`)])},{name:`github`,desc:`GitHub profile`,run:()=>[j({href:n.links.github})]},{name:`linkedin`,desc:`LinkedIn profile`,run:()=>[j({href:n.links.linkedin})]},{name:`ls`,desc:`List apps on this system`,run:()=>[{type:`table`,rows:w.map(e=>[{dim:e.glyph},{cmd:`open ${e.id}`,label:e.file}])}]},{name:`open`,args:`<app|github|linkedin|ezuraarc>`,complete:()=>[...w.map(e=>e.id),...Object.keys(n.links)],desc:`Open an app or link`,run:([e],t)=>{if(!e)return M("usage: open <app|github|linkedin|ezuraarc>   (see `ls`)");if(n.links[e])return window.open(n.links[e],`_blank`,`noopener`),[j(`Opening ${e}…`,`dim`)];let r=E(e);return r?(t.openApp(r.id),[j(`Opening ${r.title}…`,`dim`)]):M(`open: '${e}' not found (see \`ls\`)`)}},{name:`theme`,args:`[name]`,complete:()=>f.map(e=>e.id),desc:`Switch phosphor color`,run:([e],t)=>e?f.some(t=>t.id===e)?(t.setTheme(e),[j(`✓ phosphor switched → ${e}`)]):M(`theme: unknown '${e}'`):[j([`current: `,{b:t.theme}]),j(f.flatMap((e,t)=>[t?`  `:``,{cmd:`theme ${e.id}`,label:e.id}]))]},{name:`wallpaper`,aliases:[`bg`],args:`[name]`,complete:()=>a.map(e=>e.id),desc:`Change desktop background`,run:([e],t)=>e?a.some(t=>t.id===e)?(t.setWallpaper(e),[j(`✓ background → ${e}`)]):M(`wallpaper: unknown '${e}'`):[j([`current: `,{b:t.wallpaper}]),j(a.flatMap((e,t)=>[t?`  `:``,{cmd:`wallpaper ${e.id}`,label:e.id}]))]},{name:`style`,args:`[retro|modern]`,complete:()=>[`modern`,`retro`],desc:`Switch art style`,run:([e],t)=>e===`modern`?(t.setStyle(`modern`),[j(`Switching to modern style…`,`dim`)]):!e||e===`retro`?[j([`current: retro. Try `,{cmd:`style modern`}])]:M(`style: unknown '${e}'`)},{name:`sound`,args:`[on|off]`,complete:()=>[`on`,`off`],desc:`Toggle sound effects`,run:([e],t)=>{let n=e===`on`?!1:e===`off`||!t.muted;return t.setMuted(n),[j(`sound ${n?`off`:`on`}`)]}},{name:`crt`,args:`[on|off]`,complete:()=>[`on`,`off`],desc:`Toggle CRT scanlines & flicker`,run:([e],t)=>{let n=e===`on`||e!==`off`&&!t.crt;return t.setCrt(n),[j(`crt effects ${n?`on`:`off`}`)]}},{name:`history`,desc:`Command history`,run:(e,t)=>t.history.length?[{type:`table`,rows:t.history.map((e,t)=>[{dim:String(t+1)},{cmd:e}])}]:[j(`(empty)`,`dim`)]},{name:`date`,desc:`Current date & time`,run:()=>[j(new Date().toString())]},{name:`echo`,args:`<text>`,desc:`Print text`,run:e=>[j(e.join(` `))]},{name:`clear`,desc:`Clear the screen (Ctrl+L)`,run:(e,t)=>t.clear()},{name:`reboot`,desc:`Restart ACLI-OS`,run:(e,t)=>t.reboot()},{name:`exit`,desc:`Close this terminal`,run:(e,t)=>t.closeSelf?t.closeSelf():[j(`nowhere to exit to — this is home.`,`dim`)]},{name:`sudo`,hidden:!0,run:()=>M(`akash is not in the sudoers file. This incident will be reported.`)}],P=new Map;N.forEach(e=>[e.name,...e.aliases||[]].forEach(t=>P.set(t,e)));var F=e=>P.get(e);function ne(){return[{type:`heading`,text:`commands`},{type:`table`,rows:N.filter(e=>!e.hidden).map(e=>[{cmd:e.name},{dim:e.args||``},e.desc])},{type:`spacer`},j(`TAB complete · ↑↓ history · Ctrl+L clear · Ctrl+C cancel · click any highlighted command`,`dim`)]}var I=e=>e.trim().split(/\s+/).filter(Boolean),re=(e,t)=>{let[n,...r]=I(e);if(!n)return[];let i=F(n.toLowerCase());return i?i.run(r,t)||[]:M(`${n}: command not found. Type \`help\`.`)},L=e=>{let t=/\s$/.test(e),n=I(e);if(n.length===0)return[];if(n.length===1&&!t){let e=n[0].toLowerCase();return[...P.keys()].filter(t=>t.startsWith(e)&&!F(t).hidden&&t!==e).sort()}let r=F(n[0].toLowerCase());if(!r?.complete||n.length>2||n.length===2&&t)return[];let i=t?``:n[1].toLowerCase();return r.complete().filter(e=>e.startsWith(i)&&e!==i)},R=(e,t)=>{let n=I(e);return/\s$/.test(e)||n.length===0?`${e}${t} `:(n[n.length-1]=t,`${n.join(` `)} `)},z=`ak@acli:~$`,ie=[`help`,`whoami`,`projects`,`experience`,`skills`,`contact`,`theme`,`clear`],ae=1,B=(e,t)=>({id:ae++,line:e,blocks:t});function oe({system:e,variant:t=`desktop`,focused:n=!0}){let r=h(),[i,a]=(0,S.useState)(()=>[B(null,b())]),[o,c]=(0,S.useState)(``),[l,u]=(0,S.useState)(0),[d,f]=(0,S.useState)([]),[p,m]=(0,S.useState)(-1),[g,_]=(0,S.useState)(-1),[v,y]=(0,S.useState)(!1),x=(0,S.useRef)(null),w=(0,S.useRef)(null),T=v?L(o):[],E=()=>x.current?.focus({preventScroll:!0});(0,S.useEffect)(()=>{n&&t===`desktop`&&E()},[n,t]),(0,S.useEffect)(()=>{let e=w.current;e&&(e.scrollTop=e.scrollHeight)},[i]);let D=(0,S.useCallback)(n=>{let i=n.trim();if(s(`enter`),!i){a(e=>[...e,B(``,[])]);return}let o=[...d,i];f(o),m(-1);let c=!1,l=re(i,{...e,...r,history:o,device:t,clear:()=>{c=!0}});c?a([]):(l[0]?.tone===`error`&&s(`error`),a(e=>[...e,B(i,l)]))},[d,r,e,t]),O=e=>{c(e),u(e.length),_(-1)},k=(0,S.useCallback)(e=>{D(e),O(``),y(!1),E()},[D]),te=e=>{let t=e.key;if(e.ctrlKey&&(t===`l`||t===`L`))e.preventDefault(),a([]);else if(e.ctrlKey&&(t===`c`||t===`C`)&&e.currentTarget.selectionStart===e.currentTarget.selectionEnd)e.preventDefault(),a(e=>[...e,B(`${o}^C`,[])]),O(``),y(!1);else switch(t){case`Enter`:if(e.preventDefault(),g>=0&&T[g]){O(R(o,T[g])),y(!1);return}k(o);return;case`Tab`:{e.preventDefault();let t=L(o);if(t.length===1)O(R(o,t[0])),y(!1);else if(t.length>1){y(!0);let n=e.shiftKey?-1:1;_(e=>(e+n+t.length)%t.length),s(`click`)}return}case`Escape`:y(!1),_(-1);return;case`ArrowUp`:case`ArrowDown`:{if(!d.length)return;e.preventDefault();let n=t===`ArrowUp`?Math.min(p+1,d.length-1):Math.max(p-1,-1);m(n),O(n===-1?``:d[d.length-1-n]),y(!1);return}}},j=e=>{c(e.target.value),u(e.target.selectionStart??e.target.value.length),_(-1),y(e.target.value.trim().length>0),s(`key`)},M=e=>u(e.target.selectionStart??o.length);return(0,C.jsx)(ee,{value:k,children:(0,C.jsxs)(`div`,{className:`term term-${t}`,onClick:e=>{e.target.closest(`a, button, input`)||window.getSelection()?.toString()||E()},children:[(0,C.jsxs)(`div`,{className:`term-log`,ref:w,"aria-live":`polite`,children:[i.map(e=>(0,C.jsxs)(`div`,{className:`term-entry`,children:[e.line!==null&&(0,C.jsxs)(`div`,{className:`term-line`,children:[(0,C.jsx)(`span`,{className:`term-prompt`,children:z}),` `,e.line]}),e.blocks.length>0&&(0,C.jsx)(A,{blocks:e.blocks,reveal:!0})]},e.id)),(0,C.jsxs)(`label`,{className:`term-input-line`,children:[(0,C.jsx)(`span`,{className:`term-prompt`,children:z}),(0,C.jsxs)(`span`,{className:`term-field`,children:[(0,C.jsxs)(`span`,{className:`term-mirror`,"aria-hidden":`true`,children:[o.slice(0,l),(0,C.jsx)(`span`,{className:`term-cursor${n?``:` idle`}`,children:o[l]||` `}),o.slice(l+1)]}),(0,C.jsx)(`input`,{ref:x,className:`term-input`,value:o,onChange:j,onKeyDown:te,onKeyUp:M,onClick:M,onSelect:M,"aria-label":`Terminal command`,autoComplete:`off`,autoCapitalize:`off`,autoCorrect:`off`,spellCheck:!1,enterKeyHint:`go`})]})]}),T.length>0&&(0,C.jsx)(`div`,{className:`term-suggestions`,role:`listbox`,"aria-label":`Completions`,children:T.map((e,t)=>(0,C.jsx)(`button`,{type:`button`,role:`option`,"aria-selected":t===g,className:t===g?`active`:``,onClick:()=>{O(R(o,e)),y(!1),E()},children:e},e))})]}),t===`mobile`&&(0,C.jsx)(`div`,{className:`term-chips`,"aria-label":`Quick commands`,children:ie.map(e=>(0,C.jsx)(`button`,{type:`button`,onClick:()=>k(e),children:e},e))})]})})}var V=({children:e,className:t=``})=>(0,C.jsx)(`div`,{className:`app-page ${t}`,children:e}),se=({system:e,variant:t,focused:n})=>(0,C.jsx)(oe,{system:e,variant:t,focused:n}),ce=()=>(0,C.jsxs)(V,{children:[(0,C.jsx)(`pre`,{className:`app-logo`,"aria-hidden":`true`,children:p}),(0,C.jsx)(A,{blocks:x()})]}),le=({variant:t,props:n})=>{let[r,i]=(0,S.useState)(n?.slug??(t===`desktop`?e[0].slug:null)),a=e.find(e=>e.slug===r);(0,S.useEffect)(()=>{n?.slug&&i(n.slug)},[n?.slug]);let o=e=>{s(`click`),i(e)},c=(0,C.jsx)(`ul`,{className:`proj-list`,role:`listbox`,"aria-label":`Projects`,children:e.map(e=>(0,C.jsx)(`li`,{children:(0,C.jsxs)(`button`,{type:`button`,role:`option`,"aria-selected":e.slug===r,className:e.slug===r?`active`:``,onClick:()=>o(e.slug),children:[(0,C.jsxs)(`span`,{className:`proj-name`,children:[`▸ `,e.name]}),(0,C.jsxs)(`span`,{className:`proj-status s-${e.status.toLowerCase()}`,children:[`● `,e.status]})]})},e.slug))});return t===`mobile`?(0,C.jsx)(V,{children:a?(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(`button`,{type:`button`,className:`app-back`,onClick:()=>o(null),children:`‹ all projects`}),(0,C.jsx)(A,{blocks:d(a)})]}):c}):(0,C.jsxs)(`div`,{className:`proj-split`,children:[(0,C.jsx)(`div`,{className:`proj-pane`,children:c}),(0,C.jsx)(`div`,{className:`proj-detail`,children:a&&(0,C.jsx)(A,{blocks:d(a),reveal:!0},a.slug)})]})},ue=()=>(0,C.jsx)(V,{children:(0,C.jsx)(A,{blocks:[...g(),{type:`spacer`},...l()]})}),de=()=>(0,C.jsx)(V,{children:o.map(e=>(0,C.jsxs)(`section`,{className:`skill-group`,children:[(0,C.jsx)(`h3`,{className:`blk-heading`,children:e.label}),(0,C.jsx)(`div`,{className:`skill-chips`,children:e.items.map(e=>(0,C.jsx)(`span`,{className:`chip`,children:e},e))})]},e.flag))}),fe=()=>(0,C.jsxs)(V,{className:`center`,children:[(0,C.jsx)(`pre`,{className:`app-logo small`,"aria-hidden":`true`,children:`┌──────────┐
│ ▤▤▤▤▤▤▤▤ │
│ ▤▤▤▤▤    │
│ ▤▤▤▤▤▤▤  │
│ ▤▤▤      │
└──────────┘`}),(0,C.jsx)(`p`,{className:`tone-dim`,children:`Resume.pdf — public copy coming soon.`}),(0,C.jsxs)(`p`,{children:[`Meanwhile:`,` `,(0,C.jsx)(`a`,{className:`blk-link`,href:n.links.linkedin,target:`_blank`,rel:`noreferrer`,children:`LinkedIn`})]})]}),pe=()=>(0,C.jsxs)(V,{children:[(0,C.jsx)(A,{blocks:c()}),(0,C.jsxs)(`div`,{className:`app-actions`,children:[(0,C.jsx)(`a`,{className:`btn`,href:`mailto:${n.email}`,onClick:()=>s(`click`),children:`✉ Send email`}),(0,C.jsx)(`a`,{className:`btn`,href:n.links.github,target:`_blank`,rel:`noreferrer`,onClick:()=>s(`click`),children:`GitHub`}),(0,C.jsx)(`a`,{className:`btn`,href:n.links.linkedin,target:`_blank`,rel:`noreferrer`,onClick:()=>s(`click`),children:`LinkedIn`}),(0,C.jsxs)(`a`,{className:`btn`,href:r.url,target:`_blank`,rel:`noopener`,onClick:()=>s(`click`),children:[r.name,` ↗`]})]})]}),H=({label:e,on:t,onChange:n})=>(0,C.jsxs)(`button`,{type:`button`,role:`switch`,"aria-checked":t,className:`toggle`,onClick:()=>{n(!t),s(`click`)},children:[(0,C.jsx)(`span`,{children:e}),(0,C.jsxs)(`span`,{className:`toggle-state`,children:[`[`,t?`■ ON `:` OFF□`,`]`]})]}),me=()=>{let{theme:e,setTheme:t}=h();return(0,C.jsx)(`div`,{className:`theme-picker`,role:`radiogroup`,"aria-label":`Phosphor color`,children:f.map(n=>(0,C.jsxs)(`button`,{type:`button`,role:`radio`,"aria-checked":e===n.id,className:e===n.id?`active`:``,onClick:()=>{t(n.id),s(`click`)},children:[(0,C.jsx)(`span`,{className:`swatch`,style:{background:n.swatch}}),n.label]},n.id))})},he=()=>{let{wallpaper:e,setWallpaper:t}=h();return(0,C.jsx)(`div`,{className:`theme-picker`,role:`radiogroup`,"aria-label":`Background`,children:a.map(n=>(0,C.jsx)(`button`,{type:`button`,role:`radio`,"aria-checked":e===n.id,className:e===n.id?`active`:``,onClick:()=>{t(n.id),s(`click`)},children:n.label},n.id))})},U=({system:e})=>{let{muted:t,setMuted:n,crt:r,setCrt:i,setStyle:a}=h();return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(`h3`,{className:`blk-heading`,children:`phosphor`}),(0,C.jsx)(me,{}),(0,C.jsx)(`h3`,{className:`blk-heading`,children:`background`}),(0,C.jsx)(he,{}),(0,C.jsx)(`h3`,{className:`blk-heading`,children:`system`}),(0,C.jsx)(H,{label:`Sound effects`,on:!t,onChange:e=>n(!e)}),(0,C.jsx)(H,{label:`CRT scanlines & flicker`,on:r,onChange:i}),(0,C.jsxs)(`div`,{className:`app-actions`,children:[(0,C.jsx)(`button`,{type:`button`,className:`btn`,onClick:()=>e.reboot(),children:`↻ Replay boot`}),(0,C.jsx)(`button`,{type:`button`,className:`btn`,onClick:()=>a(`modern`),children:`✦ Switch to Modern style`})]})]})},ge={terminal:se,about:ce,projects:le,experience:ue,skills:de,resume:fe,contact:pe,settings:({system:e})=>(0,C.jsx)(V,{children:(0,C.jsx)(U,{system:e})})},_e=e=>{let t=e.trim();if(t.startsWith(`#`)){let e=t.length===4?t.slice(1).replace(/./g,e=>e+e):t.slice(1,7),n=parseInt(e,16);return[n>>16&255,n>>8&255,n&255]}let n=t.match(/\d+(\.\d+)?/g);return n?n.slice(0,3).map(Number):[255,255,255]},ve=()=>{let e=getComputedStyle(document.documentElement),t=t=>_e(e.getPropertyValue(t)||`#ffffff`);return{bg:t(`--bg`),fg:t(`--fg`),dim:t(`--dim`),accent:t(`--accent`)}},W=([e,t,n],r=1)=>`rgba(${e},${t},${n},${r})`,G=(e,t,n)=>e.map((e,r)=>Math.round(e+(t[r]-e)*n)),K=Math.PI*2,q=[255,255,255];function ye(e,t){let n=0,r=0,i=0,a=0,o=0,s=G(t.accent,q,.55),c=G(t.fg,t.accent,.35),l=.2,u=Array.from({length:360},()=>({x:Math.random(),y:Math.random(),size:Math.random()<.08?2:1,phase:Math.random()*K,speed:.4+Math.random()})),d=[],f=(e,t)=>{n=e,r=t,i=n*(n>900?.6:.5),a=r*.47,o=Math.max(30,Math.min(n,r)*.105);let s=Math.round(Math.min(1400,Math.max(400,n*r/1100)));d=Array.from({length:s},()=>({u:Math.random()**1.6,a:Math.random()*K,width:.6+Math.random()*1.4,jitter:(Math.random()-.5)*.12}))},p=()=>o*1.5,m=()=>o*4.6,h=o=>{e.save(),e.beginPath(),e.rect(0,o<0?0:a,n,o<0?a:r-a),e.clip(),e.translate(i,a),e.scale(1,l);let u=e.createRadialGradient(0,0,p()*.95,0,0,m());u.addColorStop(0,W(s,0)),u.addColorStop(.04,W(s,.95)),u.addColorStop(.2,W(c,.6)),u.addColorStop(.55,W(t.fg,.22)),u.addColorStop(1,W(t.fg,0)),e.fillStyle=u,e.beginPath(),e.arc(0,0,m(),0,K),e.arc(0,0,p()*.95,0,K,!0),e.fill(),e.restore()},g=(n,r)=>{let u=p(),f=m();for(let p of d){let d=u+(f-u)*p.u,m=9e-4*(u/d)**1.5;r&&(p.a+=n*m);let h=Math.sin(p.a);if(r!==h>0)continue;let g=1-p.u,_=g>.6?G(c,s,(g-.6)/.4):G(t.fg,c,g/.6),v=.55+.45*Math.cos(p.a),y=.05+m*160,b=p.jitter*o*.6;e.strokeStyle=W(_,(.15+g*.7)*v),e.lineWidth=p.width,e.beginPath(),e.moveTo(i+d*Math.cos(p.a-y),a+d*Math.sin(p.a-y)*l+b),e.lineTo(i+d*Math.cos(p.a),a+d*h*l+b),e.stroke()}};return{resize:f,frame:(l,d)=>{e.globalCompositeOperation=`source-over`,e.fillStyle=W(t.bg),e.fillRect(0,0,n,r);let f=l*4e-6;for(let s of u){let c=(s.x+f*s.speed)%1*n,u=s.y*r,d=c-i,p=u-a,m=Math.hypot(d,p)||1;if(m<o*1.2)continue;let h=o*o*2.6/m;c+=d/m*h,u+=p/m*h,e.fillStyle=W(G(t.fg,q,.6),.35+.35*Math.sin(l*.0015*s.speed+s.phase)),e.fillRect(c,u,s.size,s.size)}e.globalCompositeOperation=`lighter`;let p=e.createRadialGradient(i,a,o,i,a,o*8);p.addColorStop(0,W(t.fg,.35)),p.addColorStop(.35,W(t.fg,.1)),p.addColorStop(1,W(t.fg,0)),e.fillStyle=p,e.fillRect(0,0,n,r),h(-1),g(d,!1);let m=1+.04*Math.sin(l*.0012),_=e.createRadialGradient(i,a,o*.98,i,a,o*2.1*m);_.addColorStop(0,W(s,.95)),_.addColorStop(.12,W(c,.55)),_.addColorStop(.4,W(t.fg,.16)),_.addColorStop(1,W(t.fg,0)),e.fillStyle=_,e.beginPath(),e.arc(i,a,o*2.1*m,0,K),e.fill(),e.globalCompositeOperation=`source-over`,e.fillStyle=`#000`,e.beginPath(),e.arc(i,a,o,0,K),e.fill(),e.globalCompositeOperation=`lighter`,e.shadowColor=W(s),e.shadowBlur=o*.35,e.strokeStyle=W(s,.9),e.lineWidth=Math.max(1.5,o*.035),e.beginPath(),e.arc(i,a,o*1.02,0,K),e.stroke(),e.shadowBlur=0,h(1),g(d,!0),e.globalCompositeOperation=`source-over`}}}var J=(e,t)=>e+Math.random()*(t-e);function be({gap:e=[5e3,12e3],length:t=[1800,3400]}={}){let n=-1,r=J(1500,4e3),i=0,a=0;return o=>{if(n<0){if(o<r)return 0;n=o,i=J(...t),a=J(.45,1)}let s=(o-n)/i;return s>=1?(n=-1,r=o+J(...e),0):a*Math.sin(Math.PI*s)**2}}function Y(e,t){let n=be(),r=0,i=0;return{step(a,o){return i=n(a),r+=o/1e3*e*(1+t*i),r},get level(){return i}}}var xe=`
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`,Se=`
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
`,X=(e,t,n)=>{let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(console.warn(`blackhole shader:`,e.getShaderInfoLog(r)),null)},Z=e=>e.map(e=>e/255);function Ce(e,t){let n=e.getContext(`webgl`,{antialias:!1,alpha:!1,powerPreference:`low-power`});if(!n)return null;let r=X(n,n.VERTEX_SHADER,xe),i=X(n,n.FRAGMENT_SHADER,Se);if(!r||!i)return null;let a=n.createProgram();if(n.attachShader(a,r),n.attachShader(a,i),n.linkProgram(a),!n.getProgramParameter(a,n.LINK_STATUS))return null;n.useProgram(a);let o=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,o),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),n.STATIC_DRAW);let s=n.getAttribLocation(a,`aPos`);n.enableVertexAttribArray(s),n.vertexAttribPointer(s,2,n.FLOAT,!1,0,0);let c=e=>n.getUniformLocation(a,e),l=c(`uRes`),u=c(`uCenter`),d=c(`uTime`),f=c(`uFlow`),p=c(`uSurge`),m=Y(.1,1.6);n.uniform3fv(c(`uFg`),Z(t.fg)),n.uniform3fv(c(`uAccent`),Z(t.accent)),n.uniform3fv(c(`uBg`),Z(t.bg));let h=.6,g=h,_=0,v=0,y=0,b=()=>{e.width=Math.max(1,Math.round(_*g)),e.height=Math.max(1,Math.round(v*g)),n.viewport(0,0,e.width,e.height),n.uniform2f(l,e.width,e.height);let t=_>900?.62:.5;n.uniform2f(u,e.width*t,e.height*.52)};return{fps:40,resize(e,t){_=e,v=t,b()},frame(e,t){t>45?y+=1:t<30&&--y,y>20&&g>.35?(g=Math.max(.35,g*.8),y=0,b()):y<-240&&g<h&&(g=Math.min(h,g*1.15),y=0,b()),n.uniform1f(d,e/1e3),n.uniform1f(f,m.step(e,t)),n.uniform1f(p,m.level),n.drawArrays(n.TRIANGLES,0,3)},destroy(){n.deleteBuffer(o),n.deleteProgram(a),n.deleteShader(r),n.deleteShader(i)}}}var we=Math.PI*2,Q=[255,255,255],Te=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},Ee=(e,t)=>{let n=new Float32Array(e+1);n[0]=Math.random(),n[e]=Math.random();for(let r=e,i=1;r>1;r/=2,i*=t)for(let t=r/2;t<e;t+=r)n[t]=(n[t-r/2]+n[t+r/2])/2+(Math.random()-.5)*i;let r=1/0,i=-1/0;return n.forEach(e=>{r=Math.min(r,e),i=Math.max(i,e)}),n.map(e=>(e-r)/(i-r||1))};function De(e,t){let n=0,r=0,i=0,a=0,o=0,s=0,c=[],l=[],u=Array.from({length:220},()=>({x:Math.random(),y:Math.random()**1.6,p:Math.random()*we,s:Math.random()})),d=G(t.accent,Q,.35),f=Y(1,1.4),p=0,m=0,h=(e,t)=>{n=e,r=t,i=Math.round(r*.62),a=n*(n>900?.6:.5),o=Math.min(n,r)*.22,s=i-o*.5,c=[{height:.2,rough:.55,tint:.2},{height:.14,rough:.6,tint:.1},{height:.08,rough:.65,tint:.03}].map(e=>{let t=Ee(256,e.rough),o=[];for(let s=0;s<=256;s++){let c=s/256*n,l=.25+.75*Te(0,n*.28,Math.abs(c-a));o.push([c,i-t[s]*r*e.height*l])}return{...e,pts:o}})},g=r=>{let a=e.createLinearGradient(0,0,0,i);a.addColorStop(0,W(t.bg)),a.addColorStop(.55,W(G(t.bg,t.fg,.08))),a.addColorStop(1,W(G(t.bg,t.accent,.3))),e.fillStyle=a,e.fillRect(0,0,n,i);for(let a of u){let o=a.y*i*.85,s=1-o/(i*.85);e.fillStyle=W(G(t.fg,Q,.6),(.2+.5*Math.abs(Math.sin(r*8e-4+a.p)))*s),e.fillRect(a.x*n,o,a.s>.92?2:1,a.s>.92?2:1)}Math.random()<.004+m*.02&&l.length<2&&l.push({x:Math.random()*n,y:Math.random()*i*.4,life:1});for(let n=l.length-1;n>=0;n--){let r=l[n],i=e.createLinearGradient(r.x,r.y,r.x-90,r.y-30);i.addColorStop(0,W(Q,.8*r.life)),i.addColorStop(1,W(t.fg,0)),e.strokeStyle=i,e.lineWidth=1.5,e.beginPath(),e.moveTo(r.x,r.y),e.lineTo(r.x-90,r.y-30),e.stroke(),r.x+=9,r.y+=3,r.life-=.025,r.life<=0&&l.splice(n,1)}},_=r=>{e.globalCompositeOperation=`lighter`;for(let[r,c,l]of[[o*.9,o*2.2,.35+m*.15],[o,o*4.5,.12+m*.06]]){let o=e.createRadialGradient(a,s,r,a,s,c);o.addColorStop(0,W(t.accent,l)),o.addColorStop(1,W(t.accent,0)),e.fillStyle=o,e.fillRect(0,0,n,i)}e.globalCompositeOperation=`source-over`,e.save(),e.beginPath(),e.arc(a,s,o,0,we),e.clip(),e.beginPath();let c=s-o,l=s-o*.3;e.rect(a-o,c,o*2,l-c);let u=o*.18,f=p*12%u;for(let t=l-u+f;t<s+o;t+=u){let n=u*(.2+Math.max(0,(t-l)/(o*1.15))*.6),r=Math.max(l,t);e.rect(a-o,r,o*2,Math.max(0,t+u-n-r))}e.clip();let h=e.createLinearGradient(0,c,0,s+o);h.addColorStop(0,W(G(d,Q,.4))),h.addColorStop(.45,W(t.accent)),h.addColorStop(1,W(G(t.fg,t.accent,.3))),e.fillStyle=h,e.fillRect(a-o,c,o*2,o*2),e.restore()},v=()=>{c.forEach((o,s)=>{e.beginPath(),e.moveTo(0,i),o.pts.forEach(([t,n])=>e.lineTo(t,n)),e.lineTo(n,i),e.closePath();let c=e.createLinearGradient(0,i-r*o.height,0,i);c.addColorStop(0,W(G(t.bg,t.accent,o.tint))),c.addColorStop(1,W(G(t.bg,t.fg,o.tint*.6))),e.fillStyle=c,e.fill();let l=a/n,u=e.createLinearGradient(0,0,n,0);u.addColorStop(0,W(t.fg,.08)),u.addColorStop(Math.max(0,l-.25),W(t.fg,.3)),u.addColorStop(l,W(d,.95-s*.2)),u.addColorStop(Math.min(1,l+.25),W(t.fg,.3)),u.addColorStop(1,W(t.fg,.08)),e.strokeStyle=u,e.lineWidth=s===2?1.5:1,e.beginPath(),o.pts.forEach(([t,n],r)=>r?e.lineTo(t,n):e.moveTo(t,n)),e.stroke()}),e.globalCompositeOperation=`lighter`;let o=e.createLinearGradient(0,i-r*.07,0,i+r*.06);o.addColorStop(0,W(t.accent,0)),o.addColorStop(.6,W(t.accent,.16)),o.addColorStop(1,W(t.accent,0)),e.fillStyle=o,e.fillRect(0,i-r*.07,n,r*.13),e.globalCompositeOperation=`source-over`},y=s=>{let c=r-i,l=e.createLinearGradient(0,i,0,r);l.addColorStop(0,W(G(t.bg,t.accent,.18))),l.addColorStop(.3,W(G(t.bg,t.fg,.05))),l.addColorStop(1,W(t.bg)),e.fillStyle=l,e.fillRect(0,i,n,c),e.globalCompositeOperation=`lighter`,e.save(),e.translate(a,i),e.scale(.45,1.4);let u=e.createRadialGradient(0,0,0,0,0,o*1.2);u.addColorStop(0,W(t.accent,.35)),u.addColorStop(1,W(t.accent,0)),e.fillStyle=u,e.fillRect(-o*1.3,0,o*2.6,o*1.3),e.restore();let f=e.createLinearGradient(0,i,0,r);f.addColorStop(0,W(t.fg,0)),f.addColorStop(.25,W(t.fg,.45)),f.addColorStop(1,W(t.fg,.9));let m=p*.5%1;for(let[t,o]of[[4,.18],[1.2,1]]){e.globalAlpha=o,e.lineWidth=t,e.strokeStyle=f,e.beginPath();for(let t=-30;t<=30;t++)e.moveTo(a+n/70*t,i),e.lineTo(a+n/7.5*t,r);for(let t=0;t<22;t++){let r=i+c*((t+m)/22)**2.6;e.moveTo(0,r),e.lineTo(n,r)}e.stroke()}e.globalAlpha=1,e.shadowColor=W(t.accent),e.shadowBlur=18,e.strokeStyle=W(d,.9),e.lineWidth=1.5,e.beginPath(),e.moveTo(0,i),e.lineTo(n,i),e.stroke(),e.shadowBlur=0,e.globalCompositeOperation=`source-over`};return{resize:h,frame:(e,t=16)=>{p=f.step(e,t),m=f.level,g(e),_(e),v(),y(e)}}}var $=e=>(t,n)=>{let r=t.getContext(`2d`),i=e(r,n);return{resize(e,n,a){t.width=Math.round(e*a),t.height=Math.round(n*a),r.setTransform(a,0,0,a,0,0),i.resize(e,n)},frame:i.frame}},Oe={blackhole:(e,t)=>Ce(e,t)??$(ye)(e,t),synthwave:$(De)};function ke(){let{wallpaper:e,theme:t}=h(),n=_(),r=(0,S.useRef)(null),i=Oe[e];return(0,S.useEffect)(()=>{let e=r.current;if(!e||!i)return;let t=i(e,ve()),a=Math.min(window.devicePixelRatio||1,1.5),o=t.fps?1e3/t.fps:0,s=0,c=performance.now(),l=()=>{t.resize(e.clientWidth,e.clientHeight,a),n&&t.frame(2e4,0)},u=e=>{s=requestAnimationFrame(u),!(e-c<o)&&(t.frame(e,Math.min(e-c,100)),c=e)},d=new ResizeObserver(l);return d.observe(e),l(),n||(s=requestAnimationFrame(u)),()=>{cancelAnimationFrame(s),d.disconnect(),t.destroy?.()}},[i,t,n]),i?(0,C.jsx)(`canvas`,{ref:r,className:`wallpaper`,"aria-hidden":`true`},e):(0,C.jsx)(`div`,{className:`wallpaper phosphor-grid`,"aria-hidden":`true`})}export{T as a,w as i,ge as n,U as r,ke as t};