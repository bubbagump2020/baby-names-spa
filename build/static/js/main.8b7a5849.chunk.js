(this.webpackJsonpbaby_names_spa=this.webpackJsonpbaby_names_spa||[]).push([[0],{54:function(e,t,a){e.exports=a(86)},86:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(12),l=a.n(c),o=a(23),i=a(20),s=a(5),u=a(14),b=a.n(u),p=a(16),m=a(17),d=function(){var e=Object(s.e)();return r.a.useEffect((function(){var t,a;(function(){var n=Object(p.a)(b.a.mark((function n(){var r;return b.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,Object(m.post)("https://baby-maker-2000.netlify.app/.netlify/functions/new-list");case 3:200===(r=n.sent).status&&(console.log(r),a=r.data.list.id,localStorage.setItem("user_id",a),t=r.data.list.unique_id,localStorage.setItem("unique_id",t),e.push("/lists/".concat(t))),n.next=10;break;case 7:n.prev=7,n.t0=n.catch(0),console.log(n.t0);case 10:case"end":return n.stop()}}),n,null,[[0,7]])})));return function(){return n.apply(this,arguments)}})()()}),[]),r.a.createElement("div",null)},f=a(6),y=a(51),E="GET_BABIES",h="ADD_BABY",v="ENABLE_BABY",O="DISABLE_BABY",j=function(e){return{type:E,payload:e}},g=function(e){return{type:v,payload:e}},_=a(45),w=a(47),x=a(19),k=a(21),B=a(48),S=a(53),I=a(25),D=function(){var e=Object(i.b)(),t=Object(i.c)((function(e){return{babiesList:e.babiesList.babies}})).babiesList,a=r.a.useState({list_id:parseInt(localStorage.getItem("user_id")),baby_name:""}),n=Object(y.a)(a,2),c=n[0],l=n[1];r.a.useEffect((function(){(function(){var t=Object(p.a)(b.a.mark((function t(){var a,n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=[],t.prev=1,t.next=4,Object(m.get)("https://baby-maker-2000.netlify.app/.netlify/functions/babies-index");case 4:200===(n=t.sent).status&&(a=n.data,e(j(a))),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),console.log(t.t0);case 11:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(){return t.apply(this,arguments)}})()()}));var o=function(){var a=Object(p.a)(b.a.mark((function a(n){var r,c,l,o;return b.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:for(n.preventDefault(),r={},c=t,l=0;l<c.length;l++)n.target.id===c[l].id&&(r=c[l]);return r.enabled?(r.enabled=!1,e((i=r.id,{type:O,payload:i}))):(r.enabled=!0,e(g(r.id))),o={baby:{id:r.id,enabled:r.enabled}},a.prev=6,a.next=9,Object(m.patch)("https://baby-maker-2000.netlify.app/.netlify/functions/update-baby",o);case 9:a.next=14;break;case 11:a.prev=11,a.t0=a.catch(6),console.log(a.t0);case 14:case"end":return a.stop()}var i}),a,null,[[6,11]])})));return function(e){return a.apply(this,arguments)}}();window.onload=function(){var e=document.getElementById("name-list");e.scrollTop=e.scrollHeight};return r.a.createElement(_.a,{style:{margin:"10px"}},r.a.createElement(w.a,null,r.a.createElement(x.a,null,r.a.createElement(B.a,null,r.a.createElement("h1",null,"The Baby Maker 2000"),r.a.createElement("p",null,"Simply put in a name and it'll be saved!"),r.a.createElement("p",null,"Note: To return to this list save your URL some where safe"),r.a.createElement(k.a,{onSubmit:function(t){var a;t.preventDefault(),fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:(a=Object(f.a)({"form-name":"baby"},c),Object.keys(a).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(a[e])})).join("&"))}).then((function(e){return e.json()})).then((function(t){t.message?I.b.error(t.message,{position:"top-center",progress:void 0,closeOnClick:!0,hideProgressBar:!0}):e(j(t))})).catch((function(e){return console.log(e)}))}},r.a.createElement(k.a.Group,null,r.a.createElement(k.a.Label,null,"Name!"),r.a.createElement(k.a.Control,{type:"text",placeholder:"Baby Name",name:"baby-name",onChange:function(e){return function(e){e.preventDefault(),l(Object(f.a)(Object(f.a)({},c),{},{baby_name:e.target.value}))}(e)}})),r.a.createElement(S.a,{variant:"primary",type:"submit"},"Make Baby!")))),r.a.createElement(x.a,{style:{fontSize:"24px",textAlign:"center"}},r.a.createElement("h1",null,"Baby Names!"),r.a.createElement("ul",{id:"name-list",style:{listStyle:"none",overflowAnchor:"bottom",overflow:"scroll",height:"50vh"}},t.map((function(e){return r.a.createElement("div",{key:e.id,style:{cursor:"pointer"}},r.a.createElement("li",null,r.a.createElement("br",null),r.a.createElement("p",{onClick:o,id:e.id,style:{textDecorationLine:e.enabled?"none":"line-through"}},e.baby_name)))}))))))};a(83),a(43);var L=function(){return r.a.createElement("div",null,r.a.createElement(s.a,{exact:!0,path:"/"},r.a.createElement(d,null)),r.a.createElement(s.a,{exact:!0,path:"/lists/:list_id",component:D}),r.a.createElement(I.a,null))},T=a(13),A=a(52),N={babies:[]};var C=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case E:return Object(f.a)(Object(f.a)({},e),{},{babies:t.payload});case v:return Object(f.a)(Object(f.a)({},e),{},{babies:e.babies.map((function(e){return e.id===t.payload?Object(f.a)(Object(f.a)({},e),{},{enabled:!0}):e}))});case O:return Object(f.a)(Object(f.a)({},e),{},{babies:e.babies.map((function(e){return e.id===t.payload?Object(f.a)(Object(f.a)({},e),{},{enabled:!1}):e}))});case h:return Object(f.a)(Object(f.a)({},e),{},{babies:[].concat(Object(A.a)(e.babies),[t.payload])});default:return e}},R=Object(T.b)({babiesList:C}),U=a(49),X=a.n(U),M=a(31),Y={key:"root",storage:X.a},q=Object(M.a)(Y,R),G=Object(T.c)(q,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()),J=Object(M.b)(G),P=a(50);l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(i.a,{store:G},r.a.createElement(P.a,{loading:null,persistor:J},r.a.createElement(o.a,null,r.a.createElement(L,null))))),document.getElementById("root"))}},[[54,1,2]]]);
//# sourceMappingURL=main.8b7a5849.chunk.js.map