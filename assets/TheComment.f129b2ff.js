import{d as x,Z as h,$ as g,r as u,b as p,l as d,o as w,z as y,k as l,c as i,e as n,f as o,v as b,I as k,t as c,J as C,B as M}from"./index.d5c4554c.js";import{i as B}from"./isElemenetOverflow.e211b495.js";const I={class:"flex gap-4"},L={class:"aspect-square max-h-[36px] min-w-[36px] max-w-[36px]"},N=["src","alt"],$={key:1,class:"flex h-full w-full items-center justify-center rounded-lg bg-gray-200"},E={class:"flex flex-col items-start gap-2"},R={class:"flex gap-2"},U={class:"font-sans text-base font-medium text-gray-600"},V={class:"font-sans text-base font-normal text-gray-500"},j=x({__name:"TheComment",props:{content:null,author:null,published:null},setup(t){const e=t;h.extend(g);const a=u(!1),{t:m}=p(),s=u(!1),r=u(),v=d(()=>h.unix(e.published).fromNow()),z=d(()=>r.value?B(r.value):!1);return w(()=>{e.author.thumbnails[0].url&&y(e.author.thumbnails[0].url).catch(()=>a.value=!0)}),(A,f)=>(l(),i("div",I,[n("div",L,[t.author.thumbnails[2].url&&!a.value?(l(),i("img",{key:0,src:t.author.thumbnails[2].url,decoding:"async",referrerpolicy:"no-referrer",crossorigin:"anonymous",loading:"lazy",alt:`${t.author.name} ${o(m)("channel-avatar-alt")}`,class:"h-full w-full rounded-lg",width:"32",height:"32"},null,8,N)):(l(),i("div",$,[b(o(k),{class:"text-gray-500",width:"32",height:"32"})]))]),n("div",E,[n("div",R,[n("span",U,c(t.author.name),1),n("span",V,c(o(v)),1)]),n("p",{ref_key:"commentContentRef",ref:r,class:C([{"line-clamp-3":!s.value},"font-sans text-base font-normal text-gray-900"])},c(t.content),3),r.value&&o(z)?(l(),i("button",{key:0,class:"font-sans text-base font-medium text-gray-900",onClick:f[0]||(f[0]=D=>s.value=!s.value)},c(o(m)(s.value?"showLess":"showMore")),1)):M("",!0)])]))}});function _(t){t.__i18n=t.__i18n||[],t.__i18n.push({locale:"",resource:{"en-US":{"alt-avatar":e=>{const{normalize:a}=e;return a(["Channel avatar"])},showMore:e=>{const{normalize:a}=e;return a(["More"])},showLess:e=>{const{normalize:a}=e;return a(["Less"])},"channel-avatar-alt":e=>{const{normalize:a}=e;return a(["avatar"])}},"uk-UA":{"alt-avatar":e=>{const{normalize:a}=e;return a(["\u0410\u0432\u0430\u0442\u0430\u0440 \u043A\u0430\u043D\u0430\u043B\u0443"])},showMore:e=>{const{normalize:a}=e;return a(["\u0411\u0456\u043B\u044C\u0448\u0435"])},showLess:e=>{const{normalize:a}=e;return a(["\u041C\u0435\u043D\u0448\u0435"])},"channel-avatar-alt":e=>{const{normalize:a}=e;return a(["\u0430\u0432\u0430\u0442\u0430\u0440"])}},"ru-RU":{"alt-avatar":e=>{const{normalize:a}=e;return a(["\u0410\u0432\u0430\u0442\u0430\u0440 \u043A\u0430\u043D\u0430\u043B\u0430"])},showMore:e=>{const{normalize:a}=e;return a(["\u0411\u043E\u043B\u044C\u0448\u0435"])},showLess:e=>{const{normalize:a}=e;return a(["\u041C\u0435\u043D\u044C\u0448\u0435"])},"channel-avatar-alt":e=>{const{normalize:a}=e;return a(["\u0430\u0432\u0430\u0442\u0430\u0440"])}}}})}typeof _=="function"&&_(j);export{j as default};
