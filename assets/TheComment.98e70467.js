import{d as v,$ as f,a0 as z,r as u,b as y,l as d,o as w,A as p,k as l,c as i,e as n,f as r,p as k,I as b,t as c,J as C,C as M}from"./index.126353d9.js";import{i as I}from"./isElemenetOverflow.e211b495.js";const L={class:"flex gap-4"},B={class:"aspect-square max-h-[36px] min-w-[36px] max-w-[36px]"},N=["src","alt"],$={key:1,class:"flex h-full w-full items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800"},E={class:"flex flex-col items-start gap-2"},V={class:"flex gap-2"},j={class:"font-sans text-base font-medium text-gray-500 dark:text-gray-300"},A={class:"font-sans text-base font-normal text-gray-500 dark:text-gray-200"},D=v({__name:"TheComment",props:{content:null,author:null,published:null},setup(t){const e=t;f.extend(z);const a=u(!1),{t:m}=y(),o=u(!1),s=u(),x=d(()=>f.unix(e.published).fromNow()),g=d(()=>s.value?I(s.value):!1);return w(()=>{e.author.thumbnails[0].url&&p(e.author.thumbnails[0].url).catch(()=>a.value=!0)}),(O,h)=>(l(),i("div",L,[n("div",B,[t.author.thumbnails[2].url&&!a.value?(l(),i("img",{key:0,src:t.author.thumbnails[2].url,decoding:"async",referrerpolicy:"no-referrer",crossorigin:"anonymous",loading:"lazy",alt:`${t.author.name} ${r(m)("channel-avatar-alt")}`,class:"h-full w-full rounded-lg",width:"32",height:"32"},null,8,N)):(l(),i("div",$,[k(r(b),{class:"text-gray-500 dark:text-gray-300",width:"32",height:"32"})]))]),n("div",E,[n("div",V,[n("span",j,c(t.author.name),1),n("span",A,c(r(x)),1)]),n("p",{ref_key:"commentContentRef",ref:s,class:C([{"line-clamp-3":!o.value},"font-sans text-base font-normal text-gray-900 dark:text-white"])},c(t.content),3),s.value&&r(g)?(l(),i("button",{key:0,class:"font-sans text-base font-medium text-gray-900 dark:text-white",onClick:h[0]||(h[0]=R=>o.value=!o.value)},c(r(m)(o.value?"showLess":"showMore")),1)):M("",!0)])]))}});function _(t){t.__i18n=t.__i18n||[],t.__i18n.push({locale:"",resource:{en:{"alt-avatar":e=>{const{normalize:a}=e;return a(["Channel avatar"])},showMore:e=>{const{normalize:a}=e;return a(["More"])},showLess:e=>{const{normalize:a}=e;return a(["Less"])},"channel-avatar-alt":e=>{const{normalize:a}=e;return a(["avatar"])}},uk:{"alt-avatar":e=>{const{normalize:a}=e;return a(["\u0410\u0432\u0430\u0442\u0430\u0440 \u043A\u0430\u043D\u0430\u043B\u0443"])},showMore:e=>{const{normalize:a}=e;return a(["\u0411\u0456\u043B\u044C\u0448\u0435"])},showLess:e=>{const{normalize:a}=e;return a(["\u041C\u0435\u043D\u0448\u0435"])},"channel-avatar-alt":e=>{const{normalize:a}=e;return a(["\u0430\u0432\u0430\u0442\u0430\u0440"])}},ru:{"alt-avatar":e=>{const{normalize:a}=e;return a(["\u0410\u0432\u0430\u0442\u0430\u0440 \u043A\u0430\u043D\u0430\u043B\u0430"])},showMore:e=>{const{normalize:a}=e;return a(["\u0411\u043E\u043B\u044C\u0448\u0435"])},showLess:e=>{const{normalize:a}=e;return a(["\u041C\u0435\u043D\u044C\u0448\u0435"])},"channel-avatar-alt":e=>{const{normalize:a}=e;return a(["\u0430\u0432\u0430\u0442\u0430\u0440"])}}}})}typeof _=="function"&&_(D);export{D as default};
