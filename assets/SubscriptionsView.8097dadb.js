import{d as g,a as x,u as b,s as k,b as V,r as _,o as z,c as E,e as w,t as B,f as d,g as f,_ as D,h as P,i as R,j as S,k as i}from"./index.253ef467.js";const U={class:"flex flex-col justify-center px-4 lg:px-6"},A={class:"pt-8 font-sans text-2xl font-bold text-gray-900"},C=g({__name:"SubscriptionsView",setup(n){const e=x(()=>P(()=>import("./TheError.4d261302.js"),["assets/TheError.4d261302.js","assets/index.253ef467.js","assets/index.9898ffc1.css"])),s=b(),h=R(),{subscriptions:c}=k(s),{t:p}=V(),l=_([]),a=_();async function v(){try{const u=(await Promise.all([...c.value].map(t=>new Promise(r=>{S(t).then(y=>r(y))})))).reduce((t,r)=>t.concat(r),[]);l.value=u}catch(o){a.value=o}}return z(()=>{c.value.size||h.replace({name:"home"}),v()}),(o,u)=>(i(),E("main",U,[w("h1",A,B(d(p)("headline")),1),a.value?(i(),f(d(e),{key:1,message:a.value.message},null,8,["message"])):(i(),f(D,{key:0,videos:l.value,"show-per-view":20,"sort-by-time":"",class:"py-4"},null,8,["videos"]))]))}});function m(n){n.__i18n=n.__i18n||[],n.__i18n.push({locale:"",resource:{"en-US":{headline:e=>{const{normalize:s}=e;return s(["Sbubscriptions"])}},"uk-UA":{headline:e=>{const{normalize:s}=e;return s(["\u041F\u0456\u0434\u043F\u0438\u0441\u043A\u0438"])}},"ru-RU":{headline:e=>{const{normalize:s}=e;return s(["\u041F\u043E\u0434\u043F\u0438\u0441\u043A\u0438"])}}}})}typeof m=="function"&&m(C);export{C as default};