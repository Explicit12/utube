import{E as I,k as s,c as o,e as d,d as S,u as A,r as v,s as O,l as B,b as T,U as L,o as U,K as g,F as _,q as y,v as b,w as z,t as k,f as h,g as $,C as N,B as R,x as V}from"./index.9bdb13cd.js";import{_ as D}from"./TheButton.vue_vue_type_script_setup_true_lang.2e746eea.js";const E={},F=d("span",{class:"flex animate-pulse items-center gap-2"},[d("div",{class:"h-8 w-10 rounded-lg bg-gray-200"}),d("span",{class:"h-4 w-full rounded-sm bg-gray-200"})],-1),M=[F];function P(l,n){return s(),o("li",null,M)}const q=I(E,[["render",P]]),K={class:"space-y-5 pt-6"},j=["src"],G={key:1,class:"h-8 w-8 rounded-lg bg-gray-200"},H={class:"overflow-hidden text-ellipsis whitespace-nowrap"},J=S({__name:"SubscriptionList",setup(l){const t=A(),a=v(new Set),m=v(6),{subscriptions:i}=O(t),C=B(()=>new Set([...a.value].slice(0,m.value))),{t:p}=T();return L(()=>i.value.size,async()=>{var f;const u=(f=[...a.value].find(e=>!i.value.has(e.authorId)))==null?void 0:f.authorId,c=[...i.value].filter(e=>![...a.value].find(r=>r.authorId===e));u?a.value=new Set([...a.value].filter(e=>e.authorId!==u)):c.length&&(await Promise.all(c.map(r=>g(r)))).forEach(r=>{[...a.value].find(x=>x.authorId===r.authorId)||a.value.add(r)})}),U(()=>{Promise.all([...i.value].map(g)).then(u=>{a.value=new Set(u)})}),(u,c)=>{const f=V("RouterLink");return s(),o(_,null,[d("ul",K,[a.value.size?(s(!0),o(_,{key:0},y(h(C),e=>(s(),o("li",{key:e.author},[b(f,{to:{name:"channel",params:{id:e.authorId}},class:"flex items-center gap-2 font-sans font-normal text-gray-900"},{default:z(()=>[e.authorThumbnails[0]?(s(),o("img",{key:0,src:e.authorThumbnails[0].url,decoding:"async",referrerpolicy:"no-referrer",crossorigin:"anonymous",loading:"lazy",alt:"channel avatar",class:"rounded-lg",width:"32",height:"32"},null,8,j)):(s(),o("div",G)),d("span",H,k(e.author),1)]),_:2},1032,["to"])]))),128)):(s(),o(_,{key:1},y(6,e=>b(q,{key:e})),64))]),a.value.size&&a.value.size>6?(s(),$(D,{key:0,type:"secondary",class:"mt-4 w-full",onClick:c[0]||(c[0]=e=>m.value=m.value===6?h(i).size:6)},{default:z(()=>[N(k(m.value<=6?h(p)("button-more"):h(p)("button-less")),1)]),_:1})):R("",!0)],64)}}});function w(l){l.__i18n=l.__i18n||[],l.__i18n.push({locale:"",resource:{"en-US":{"button-more":n=>{const{normalize:t}=n;return t(["More"])},"button-less":n=>{const{normalize:t}=n;return t(["Less"])}},"uk-UA":{"button-more":n=>{const{normalize:t}=n;return t(["\u0411\u0456\u043B\u044C\u0448\u0435"])},"button-less":n=>{const{normalize:t}=n;return t(["\u041C\u0435\u043D\u0448\u0435"])}},"ru-RU":{"button-more":n=>{const{normalize:t}=n;return t(["\u0415\u0449\u0451"])},"button-less":n=>{const{normalize:t}=n;return t(["\u041C\u0435\u043D\u044C\u0448\u0435"])}}}})}typeof w=="function"&&w(J);export{J as default};
