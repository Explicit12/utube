import{d as z,a as x,b as w,u as k,r as _,X as D,c as E,e as d,t as b,f as m,g as C,B as U,h as B,k as y}from"./index.d5c4554c.js";async function g(o){const r=new FileReader;return r.readAsText(o),new Promise(e=>{r.onload=a=>e(S(a))})}async function S(o){const e=o.target.result;if(typeof e=="string"){const a=e.slice(0,e.indexOf(`
`)).split(",");return e.slice(e.indexOf(`
`)+1).split(`
`).filter(l=>l!=="").map(l=>{const t=l.split(",");return a.reduce((c,f,p)=>(c[f]=t[p],c),{})})}}const T={for:"file-input",class:"sr-only"},A=z({__name:"SubscriptionFileInput",setup(o){const r=x(()=>B(()=>import("./TheError.c668cb66.js"),["assets/TheError.c668cb66.js","assets/index.d5c4554c.js","assets/index.3ad399a0.css"])),{t:e}=w(),a=k(),{subscribeToChannel:l}=a,t=_(),c=_();async function f(n){try{if(n&&n[0].type==="text/csv"){t.value=void 0;const s=await g(n[0]);s==null||s.forEach(u=>l(u["Channel Id"]))}else throw new Error("Wrong file type")}catch(s){console.error(s.message),t.value=s}}async function p(n){const u=(n==null?void 0:n.currentTarget).files;try{if(u&&u[0].type==="text/csv"){t.value=void 0;const i=await g(u[0]);i==null||i.forEach(v=>l(v["Channel Id"]))}else throw new Error("Wrong file type")}catch(i){console.error(i.message),t.value=i}}return D(c,f),(n,s)=>(y(),E("form",null,[d("div",{ref_key:"importDropZone",ref:c,class:"mt-6 flex h-64 w-full items-center justify-center rounded-lg border-4 border-dashed border-blue-600 p-4 text-center"},b(m(e)("drop-zone")),513),d("label",T,b(m(e)("file-input-label")),1),d("input",{id:"file-input",type:"file",class:"mt-4 block w-full font-sans text-base font-normal text-gray-900 file:block file:w-full file:rounded-lg file:border-2 file:border-transparent file:bg-blue-50 file:py-2 file:px-4 hover:cursor-pointer file:hover:cursor-pointer",onChange:p},null,32),t.value?(y(),C(m(r),{key:0,message:t.value.message,class:"h-fit p-2"},null,8,["message"])):U("",!0)]))}});function h(o){o.__i18n=o.__i18n||[],o.__i18n.push({locale:"",resource:{"en-US":{"drop-zone":r=>{const{normalize:e}=r;return e(["Drop subscriptions.csv file here"])},"file-input-label":r=>{const{normalize:e}=r;return e(["Upload file"])}},"uk-UA":{"drop-zone":r=>{const{normalize:e}=r;return e(["\u041F\u0435\u0440\u0435\u0442\u044F\u0433\u043D\u0456\u0442\u044C \u0441\u044E\u0434\u0438 subscriptions.csv \u0444\u0430\u0439\u043B"])},"file-input-label":r=>{const{normalize:e}=r;return e(["Upload file"])}},"ru-RU":{"drop-zone":r=>{const{normalize:e}=r;return e(["\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 subscriptions.csv \u0444\u0430\u0439\u043B \u0441\u044E\u0434\u0430"])},"file-input-label":r=>{const{normalize:e}=r;return e(["Upload file"])}}}})}typeof h=="function"&&h(A);export{A as default};
