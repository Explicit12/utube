import{d as I,a as R,r as u,l as h,m as V,o as q,c as n,F as f,n as v,f as d,p as y,_ as E,g as m,e as C,h as L,q as T,v as A,w as P,k as a,x as D,y as F}from"./index.5e032c5a.js";import{_ as N,C as Q}from"./ChannelCompactSkeleton.19c350a6.js";import"./TheButton.vue_vue_type_script_setup_true_lang.41bbad13.js";const $={class:"px-4 lg:px-16"},j={key:0,class:"mx-auto flex max-w-screen-xl flex-col justify-center"},z={key:0,class:"flex flex-col gap-4 pt-8"},M=C("hr",null,null,-1),O={key:1,class:"flex flex-col gap-4 pt-8"},U=C("hr",{class:"border-t-2 dark:border-gray-400"},null,-1),K=I({__name:"SearchView",props:{searchQuery:null},setup(b){const x=b,k=R(()=>L(()=>import("./TheError.dee2d78c.js"),["assets/TheError.dee2d78c.js","assets/index.5e032c5a.js","assets/index.e5e21443.css"])),l=u(),t=u([]),c=u([]),_=u(3),g=h(()=>[...t.value].sort((e,o)=>e.subCount&&o.subCount?o.subCount-e.subCount:0)),w=h(()=>g.value.slice(0,_.value)),S=h(()=>c.value.filter(e=>e.published&&e.viewCount));async function p(e){try{const o=await T(e);t.value=o;const i=await Promise.all(t.value.map(r=>A(r.authorId)));t.value=t.value.map((r,B)=>(r.subCount=i[B],r));const s=await P(e);c.value=s}catch(o){l.value=o}}return V(e=>{if(typeof e.query.search_query!="string")return!1;t.value=[],c.value=[],p(e.query.search_query)}),q(()=>p(x.searchQuery)),(e,o)=>{const i=F("RouterLink");return a(),n("main",$,[l.value?(a(),m(d(k),{key:1,message:l.value.message},null,8,["message"])):(a(),n("div",j,[t.value.length?(a(),n("div",z,[(a(!0),n(f,null,v(d(w),s=>(a(),m(i,{key:s.authorId,to:{name:"channel",params:{id:s.authorId}}},{default:D(()=>[y(N,{name:s.author,subs:s.subCount?s.subCount:0,thumbnail:s.authorThumbnails,"channels-id":s.authorId},null,8,["name","subs","thumbnail","channels-id"])]),_:2},1032,["to"]))),128)),M])):(a(),n("div",O,[(a(!0),n(f,null,v(_.value,s=>(a(),m(Q,{key:s}))),128)),U])),y(E,{videos:d(S),"show-per-view":10,"horizontal-layout":!0,class:"py-4"},null,8,["videos"])]))])}}});export{K as default};