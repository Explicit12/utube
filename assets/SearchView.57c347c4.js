import{d as B,a as E,r as n,l as i,m as R,o as V,n as p,p as f,c as u,e as d,F as y,q as C,f as _,g as c,_ as I,h as S,k as a,w as L,v as T,x as A}from"./index.253ef467.js";import{_ as Q,C as F}from"./ChannelCompactSkeleton.1ddf761d.js";import"./TheButton.vue_vue_type_script_setup_true_lang.c667e72f.js";const N={class:"px-4 lg:px-6"},P={class:"mx-auto flex max-w-screen-xl flex-col justify-center"},$={key:0,class:"flex flex-col gap-4 pt-8"},j=d("hr",null,null,-1),z={key:1,class:"flex flex-col gap-4 pt-8"},D=d("hr",null,null,-1),G=B({__name:"SearchView",props:{searchQuery:null},setup(x){const m=x,k=E(()=>S(()=>import("./TheError.4d261302.js"),["assets/TheError.4d261302.js","assets/index.253ef467.js","assets/index.9898ffc1.css"])),h=n(),r=n(),o=n([]),l=n([]),v=n(3),b=i(()=>[...o.value].sort((e,s)=>e.subCount&&s.subCount?s.subCount-e.subCount:0)),g=i(()=>b.value.slice(0,v.value)),q=i(()=>l.value.filter(e=>e.published&&e.viewCount));return R(e=>{if(typeof e.query.search_query!="string")return!1;o.value=[],l.value=[],p(e.query.search_query).then(s=>{o.value=s}).catch(s=>h.value=s),f(e.query.search_query).then(s=>{l.value=s}).catch(s=>r.value=s)}),V(()=>{p(m.searchQuery).then(e=>{o.value=e}).catch(e=>h.value=e),f(m.searchQuery).then(e=>{l.value=e}).catch(e=>r.value=e)}),(e,s)=>{const w=A("RouterLink");return a(),u("main",N,[d("div",P,[o.value.length&&!h.value?(a(),u("div",$,[(a(!0),u(y,null,C(_(g),t=>(a(),c(w,{key:t.authorId,to:{name:"channel",params:{id:t.authorId}}},{default:L(()=>[T(Q,{name:t.author,subs:t.subCount?t.subCount:0,thumbnail:t.authorThumbnails,"channels-id":t.authorId},null,8,["name","subs","thumbnail","channels-id"])]),_:2},1032,["to"]))),128)),j])):(a(),u("div",z,[(a(!0),u(y,null,C(v.value,t=>(a(),c(F,{key:t}))),128)),D])),r.value?(a(),c(_(k),{key:3,message:r.value.message},null,8,["message"])):(a(),c(I,{key:2,videos:_(q),"show-per-view":10,"horizontal-layout":!0,class:"py-4"},null,8,["videos"]))])])}}});export{G as default};