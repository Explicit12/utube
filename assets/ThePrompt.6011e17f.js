import{d,b as f,k as _,c as z,e as o,H as k,v as s,w as a,C as l,t as c,f as m}from"./index.253ef467.js";import{_ as u}from"./TheButton.vue_vue_type_script_setup_true_lang.c667e72f.js";const y={class:"rounded-lg bg-white p-8"},$={class:"flex gap-2 pt-4"},v=d({__name:"ThePrompt",emits:["prompt","clickOutside"],setup(r){const{t}=f();return(e,n)=>(_(),z("div",{class:"fixed inset-0 flex h-screen w-screen items-center justify-center bg-gray-900/25",onClick:n[2]||(n[2]=i=>e.$emit("clickOutside"))},[o("div",y,[k(e.$slots,"text"),o("div",$,[s(u,{type:"secondary",onClick:n[0]||(n[0]=i=>e.$emit("prompt",!0))},{default:a(()=>[l(c(m(t)("claim")),1)]),_:1}),s(u,{type:"primary",onClick:n[1]||(n[1]=i=>e.$emit("prompt",!1))},{default:a(()=>[l(c(m(t)("cancel")),1)]),_:1})])])]))}});function p(r){r.__i18n=r.__i18n||[],r.__i18n.push({locale:"",resource:{"en-US":{claim:t=>{const{normalize:e}=t;return e(["Claim"])},cancel:t=>{const{normalize:e}=t;return e(["Cancel"])}},"uk-UA":{claim:t=>{const{normalize:e}=t;return e(["\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0438"])},cancel:t=>{const{normalize:e}=t;return e(["\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438"])}},"ru-RU":{claim:t=>{const{normalize:e}=t;return e(["\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C"])},cancel:t=>{const{normalize:e}=t;return e(["\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C"])}}}})}typeof p=="function"&&p(v);export{v as default};