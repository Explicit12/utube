import{d as h,r as l,b as v,l as c,k as u,c as m,e as p,t as f,f as t,L as w,D as k}from"./index.7a3ff6ff.js";import{i as x}from"./isElemenetOverflow.e211b495.js";const b={class:"font-sans text-xl font-normal uppercase text-gray-400"},y=["innerHTML"],L=h({__name:"VideoDiscription",props:{discriptionHtml:null},setup(r){const n=r,e=l(!1),o=l(),{t:a}=v(),d=c(()=>o.value?x(o.value):!1),z=c(()=>n.discriptionHtml.split(`
`).filter(s=>s!=="").map(s=>"<p class='font-sans text-base break-all font-normal text-gray-900'>"+s.replace(/<a /gi,"<a class='text-blue-600 break-all cursor-pointer underline' ")+"</p>").join(""));return(s,i)=>(u(),m("div",null,[p("h3",b,f(t(a)("headline")),1),p("div",{ref_key:"discriptionRef",ref:o,class:w([{"line-clamp-3":!e.value},"pt-2"]),innerHTML:t(z)},null,10,y),o.value&&t(d)?(u(),m("button",{key:0,class:"font-sans text-base font-medium text-gray-900",onClick:i[0]||(i[0]=M=>e.value=!e.value)},f(t(a)(e.value?"showLess":"showMore")),1)):k("",!0)]))}});function _(r){r.__i18n=r.__i18n||[],r.__i18n.push({locale:"",resource:{"en-US":{headline:n=>{const{normalize:e}=n;return e(["Discription"])},showMore:n=>{const{normalize:e}=n;return e(["More"])},showLess:n=>{const{normalize:e}=n;return e(["Less"])}},"uk-UA":{headline:n=>{const{normalize:e}=n;return e(["\u041E\u043F\u0438\u0441"])},showMore:n=>{const{normalize:e}=n;return e(["\u0411\u0456\u043B\u044C\u0448\u0435"])},showLess:n=>{const{normalize:e}=n;return e(["\u041C\u0435\u043D\u0448\u0435"])}},"ru-RU":{headline:n=>{const{normalize:e}=n;return e(["\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435"])},showMore:n=>{const{normalize:e}=n;return e(["\u0411\u043E\u043B\u044C\u0448\u0435"])},showLess:n=>{const{normalize:e}=n;return e(["\u041C\u0435\u043D\u044C\u0448\u0435"])}}}})}typeof _=="function"&&_(L);export{L as default};
