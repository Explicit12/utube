import{G as K,k as s,c as a,e as t,F as C,n as P,d as $,M as X,s as Y,l as D,r as m,g as d,x as U,y as q,a as A,b as Z,m as uu,o as eu,f as o,t as v,D as tu,p as w,C as I,_ as su,h as F,i as nu,N as ou,O as R,L as au,P as ru,Q as lu,R as iu,S,U as cu,E as T}from"./index.883e5150.js";import{_ as mu,C as du}from"./ChannelCompactSkeleton.f5081869.js";import"./TheButton.vue_vue_type_script_setup_true_lang.8f9866de.js";const _u={},hu={class:"animate-pulse"},pu={class:"w-full"},vu=t("div",{class:"h-4 w-4/5 rounded-sm bg-gray-400"},null,-1);function fu(l,e){return s(),a("div",hu,[t("div",pu,[vu,(s(),a(C,null,P(3,u=>t("div",{key:u,class:"mt-2 h-4 w-6/12 rounded-sm bg-gray-200"})),64))])])}const yu=K(_u,[["render",fu]]),gu={controls:"",playsinline:"",style:{"--plyr-color-main":"#2563eb"}},xu=["src"],wu=["src"],Cu=$({__name:"ThePlayer",props:{formatStreams:null},setup(l){const e=X(),{userLocale:u}=Y(e),E={play:"\u041F\u043B\u0435\u0439",pause:"\u041F\u0430\u0443\u0437\u0430",currentTime:"\u0422\u0435\u043A\u0443\u0449\u0435\u0435 \u0432\u0440\u0435\u043C\u044F",duration:"\u0414\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C",volume:"\u0413\u0440\u043E\u043C\u043A\u043E\u0441\u0442\u044C",mute:"\u0412\u044B\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0437\u0432\u0443\u043A",unmute:"\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0437\u0432\u0443\u043A",enterFullscreen:"\u0412\u043E\u0439\u0442\u0438 \u0432 \u0440\u0435\u0436\u0438\u043C \u043F\u043E\u043B\u043D\u043E\u0433\u043E \u044D\u043A\u0440\u0430\u043D\u0430",exitFullscreen:"\u0412\u044B\u0439\u0442\u0438 \u0438\u0437 \u0440\u0435\u0436\u0438\u043C\u0430 \u043F\u043E\u043B\u043D\u043E\u0433\u043E \u044D\u043A\u0440\u0430\u043D\u0430",settings:"\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",speed:"\u0421\u043A\u043E\u0440\u043E\u0441\u0442\u044C",normal:"\u041D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u0430\u044F",quality:"\u041A\u0430\u0447\u0435\u0441\u0442\u0432\u043E"},b={play:"\u041F\u043B\u0435\u0439",pause:"\u041F\u0443\u0437\u0430",currentTime:"\u041F\u043E\u0442\u043E\u0447\u043D\u0438\u0439 \u0447\u0430\u0441",duration:"\u0422\u0440\u0438\u0432\u0430\u043B\u0456\u0442\u044C",volume:"\u0413\u0443\u0447\u043D\u0456\u0441\u0442\u044C",mute:"\u0412\u0438\u043C\u043A\u043D\u0443\u0442\u0438 \u0437\u0432\u0443\u043A",unmute:"\u0423\u0432\u0456\u043C\u043A\u043D\u0443\u0442\u0438 \u0437\u0432\u0443\u043A",enterFullscreen:"\u0423\u0432\u0456\u0439\u0442\u0438 \u0432 \u0440\u0435\u0436\u0438\u043C \u043F\u043E\u043B\u043D\u043E\u0433\u043E \u044D\u043A\u0440\u0430\u043D\u0443",exitFullscreen:"\u0412\u0438\u0439\u0442\u0438 \u0437 \u0440\u0435\u0436\u0438\u043C\u0443 \u043F\u043E\u043B\u043D\u043E\u0433\u043E \u044D\u043A\u0440\u0430\u043D\u0443",settings:"\u041D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F",speed:"\u0428\u0432\u0438\u0434\u043A\u0456\u0441\u0442\u044C",normal:"\u041D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u0430",quality:"\u042F\u043A\u0456\u0441\u0442\u044C"},f=D(()=>u.value==="en-US"?{}:u.value==="uk-UA"?b:u.value==="ru-RU"?E:{}),h=m({autoplay:!0,ratio:"16:9",i18n:f});return(y,i)=>{const r=q("vue-plyr");return s(),d(r,{options:h.value},{default:U(()=>[t("video",gu,[t("source",{size:"720",src:l.formatStreams[1].url,type:"video/mp4"},null,8,xu),t("source",{size:"1080",src:l.formatStreams[2].url,type:"video/mp4"},null,8,wu)])]),_:1},8,["options"])}}}),Du={class:"flex flex-col gap-6 px-4 lg:px-6 2xl:flex-row"},Eu={class:"flex max-w-[1240px] basis-3/4 flex-col gap-4"},bu={key:1,class:"aspect-video animate-pulse rounded-lg bg-gray-200"},ku={key:0},Au={class:"font-sans text-lg font-bold text-gray-900 line-clamp-1"},Fu={class:"flex justify-between pt-2"},Bu={class:"font-sans text-base font-normal text-gray-500"},zu={class:"flex gap-4"},Vu={class:"flex items-center gap-2 font-sans text-base font-normal text-gray-500"},Iu={class:"rotate-180"},Ru={class:"flex items-center gap-2 font-sans text-base font-normal text-gray-500"},Su={key:1},Tu=t("div",{class:"h-4 w-4/5 rounded-sm bg-gray-400"},null,-1),Lu=[Tu],Pu=t("hr",null,null,-1),$u=t("hr",null,null,-1),Uu=t("hr",null,null,-1),qu={key:5,class:"flex flex-col gap-4 pb-8"},Nu={class:"pt-8 font-sans text-xl font-normal uppercase text-gray-500"},Ou={class:"basis-1/4"},Mu={class:"pt-8 font-sans text-xl font-normal uppercase text-gray-500"},Qu=$({__name:"WatchView",props:{watch:null,authorId:null},setup(l){const e=l,u=A(()=>F(()=>import("./TheError.0668a5eb.js"),["assets/TheError.0668a5eb.js","assets/index.883e5150.js","assets/index.d24e2409.css"])),E=A(()=>F(()=>import("./TheComment.3936592b.js"),["assets/TheComment.3936592b.js","assets/index.883e5150.js","assets/index.d24e2409.css","assets/isElemenetOverflow.e211b495.js"])),b=A(()=>F(()=>import("./VideoDiscription.bfc3c697.js"),["assets/VideoDiscription.bfc3c697.js","assets/index.883e5150.js","assets/index.d24e2409.css","assets/isElemenetOverflow.e211b495.js"])),f=m([]),h=m([]),y=m([]),i=m(),r=m(),g=m(""),_=m(),{t:k}=Z(),B=cu(),z=nu(),N=D(()=>i.value?T(i.value.likeCount):""),O=D(()=>i.value?T(i.value.viewCount):""),M=D(()=>typeof B.query.watch=="string"?B.query.watch:"");async function V(n,x){try{const p=await ou(n);h.value=p;const c=await R(n);i.value=c;const Q=await au(x);r.value=Q;const j=await ru(n);g.value=j;const G=await lu(n),W=await Promise.all(G.slice(0,20).map(J=>R(J.videoId)));f.value=W;const H=await iu(n);y.value=H}catch(p){console.error(p),_.value=p}}return uu(n=>{if(typeof n.query.watch!="string"||typeof n.params.authorId!="string")return!1;i.value=void 0,r.value=void 0,g.value="",h.value=[],f.value=[],y.value=[],V(n.query.watch,n.params.authorId).then(()=>{var x;_.value&&((x=_.value.response)==null?void 0:x.status)===404&&z.replace({name:"notFound"})})}),eu(()=>{V(e.watch,e.authorId).then(()=>{var n;_.value&&((n=_.value.response)==null?void 0:n.status)===404&&z.replace({name:"notFound"})})}),(n,x)=>{const p=q("RouterLink");return s(),a("main",Du,[_.value?(s(),d(o(u),{key:1,message:_.value.message,class:"col-span-full row-span-full"},null,8,["message"])):(s(),a(C,{key:0},[t("div",Eu,[(s(),a("div",{key:o(M),class:"mt-8"},[h.value.length?(s(),d(Cu,{key:0,"format-streams":h.value},null,8,["format-streams"])):(s(),a("div",bu))])),i.value?(s(),a("div",ku,[t("h1",Au,v(i.value.title),1),t("div",Fu,[t("span",Bu,v(o(O))+" "+v(o(k)("views")),1),t("div",zu,[t("span",Vu,[tu(v(o(N))+" ",1),t("span",Iu,[w(o(S),{width:"24",height:"24",clss:"text-gray-400"})])]),t("span",Ru,[w(o(S),{width:"24",height:"24",clss:"text-gray-900"})])])])])):(s(),a("div",Su,Lu)),Pu,r.value?(s(),d(p,{key:2,to:{name:"channel",params:{id:r.value.authorId}}},{default:U(()=>[w(mu,{name:r.value.author,subs:r.value.subCount,"channels-id":r.value.authorId,thumbnail:r.value.authorThumbnails},null,8,["name","subs","channels-id","thumbnail"])]),_:1},8,["to"])):(s(),d(du,{key:3})),$u,g.value!=="<p></p>"?(s(),a(C,{key:4},[g.value?(s(),d(o(b),{key:0,"discription-html":g.value},null,8,["discription-html"])):(s(),d(yu,{key:1})),Uu],64)):I("",!0),y.value.length?(s(),a("div",qu,[t("h2",Nu,v(o(k)("comments.headline")),1),(s(!0),a(C,null,P(y.value,c=>(s(),d(o(E),{key:c.commentId,author:{name:c.author,authorId:c.authorId,thumbnails:c.authorThumbnails},content:c.content,published:c.published},null,8,["author","content","published"]))),128))])):I("",!0)]),t("div",Ou,[t("h2",Mu,v(o(k)("recommendations.headline")),1),w(su,{class:"py-2","show-per-view":10,videos:f.value,"horizontal-layout":!0},null,8,["videos"])])],64))])}}});function L(l){l.__i18n=l.__i18n||[],l.__i18n.push({locale:"",resource:{"en-US":{views:e=>{const{normalize:u}=e;return u(["views"])},recommendations:{headline:e=>{const{normalize:u}=e;return u(["Recommended"])}},comments:{headline:e=>{const{normalize:u}=e;return u(["Comments"])}}},"uk-UA":{views:e=>{const{normalize:u}=e;return u(["\u043F\u0435\u0440\u0435\u0433\u043B\u044F\u0434\u0456\u0432"])},recommendations:{headline:e=>{const{normalize:u}=e;return u(["\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0456\u0457"])}},comments:{headline:e=>{const{normalize:u}=e;return u(["\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440\u0456"])}}},"ru-RU":{views:e=>{const{normalize:u}=e;return u(["\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u043E\u0432"])},recommendations:{headline:e=>{const{normalize:u}=e;return u(["\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0438"])}},comments:{headline:e=>{const{normalize:u}=e;return u(["\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438"])}}}}})}typeof L=="function"&&L(Qu);export{Qu as default};
