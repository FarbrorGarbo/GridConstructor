(this.webpackJsonpgridconstructor=this.webpackJsonpgridconstructor||[]).push([[0],[,,,,function(e,t,n){e.exports=n(11)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(3),o=n.n(r),u=(n(9),n(1)),c=function(e){return e*(Math.PI/180)},l=function(e,t){var n=c(e.rotation),a=c(e.elevation),i=t.x*Math.sin(n)+t.y*Math.cos(n),r=t.x*Math.cos(n)-t.y*Math.sin(n),o=i*Math.cos(a)-t.z*Math.sin(a),u=i*Math.sin(a)+t.z*Math.cos(a);return[e.picturePlane*r/(e.distance+o)+e.offsetH,e.picturePlane*u/(e.distance+o)+e.offsetV]},s=function(e){var t=e.settings,n=i.a.useRef(null),a=i.a.useState({width:window.innerWidth,height:window.innerHeight}),r=Object(u.a)(a,2),o=r[0],c=r[1];return i.a.useEffect((function(){var e=n.current;if(e){e.width=o.width,e.height=o.height;var a=e.getContext("2d");if(a){a.clearRect(0,0,e.width,e.height),a.strokeStyle="#f00";[[{x:0,y:0,z:0},{x:500,y:0,z:0}],[{x:480,y:0,z:5},{x:500,y:0,z:0}]].forEach((function(n){var i=l(t,n[0]),r=l(t,n[1]);a.beginPath(),a.moveTo(i[0],e.height-i[1]),a.lineTo(r[0],e.height-r[1]),a.lineTo(r[0],e.height-r[1]),a.stroke()})),a.strokeStyle="#0f0";[[{x:0,y:0,z:0},{x:0,y:500,z:0}],[{x:5,y:480,z:0},{x:0,y:500,z:0}]].forEach((function(n){var i=l(t,n[0]),r=l(t,n[1]);a.beginPath(),a.moveTo(i[0],e.height-i[1]),a.lineTo(r[0],e.height-r[1]),a.lineTo(r[0],e.height-r[1]),a.stroke()})),a.strokeStyle="#00f";[[{x:0,y:0,z:0},{x:0,y:0,z:500}],[{x:5,y:0,z:480},{x:0,y:0,z:500}]].forEach((function(n){var i=l(t,n[0]),r=l(t,n[1]);a.beginPath(),a.moveTo(i[0],e.height-i[1]),a.lineTo(r[0],e.height-r[1]),a.lineTo(r[0],e.height-r[1]),a.stroke()})),a.strokeStyle="#aaa",a.beginPath();[[{x:-200,y:-200,z:-200},{x:200,y:-200,z:-200}],[{x:-200,y:200,z:-200},{x:200,y:200,z:-200}],[{x:-200,y:-200,z:200},{x:200,y:-200,z:200}],[{x:-200,y:200,z:200},{x:200,y:200,z:200}],[{x:-200,y:-200,z:-200},{x:-200,y:-200,z:200}],[{x:200,y:-200,z:-200},{x:200,y:-200,z:200}],[{x:200,y:200,z:-200},{x:200,y:200,z:200}],[{x:-200,y:200,z:-200},{x:-200,y:200,z:200}],[{x:-200,y:-200,z:200},{x:-200,y:200,z:200}],[{x:200,y:-200,z:200},{x:200,y:200,z:200}],[{x:-200,y:-200,z:-200},{x:-200,y:200,z:-200}],[{x:200,y:-200,z:-200},{x:200,y:200,z:-200}]].forEach((function(n){var i=l(t,n[0]),r=l(t,n[1]);a.moveTo(i[0],e.height-i[1]),a.lineTo(r[0],e.height-r[1])})),a.stroke()}}var i=function(){c({width:window.innerWidth,height:window.innerHeight})};return window.addEventListener("resize",i),function(){window.removeEventListener("resize",i)}}),[t,o]),i.a.createElement("canvas",{className:"canvas",ref:n})},h=(n(10),function(e){var t=i.a.useRef(null),n=i.a.useState(e.value),a=Object(u.a)(n,2),r=a[0],o=a[1],c=e.returnValue;return i.a.useEffect((function(){c(r)}),[c,r]),i.a.createElement("label",null,e.label,":",i.a.createElement("input",{ref:t,type:"number",min:e.min,max:e.max,step:e.step,onChange:function(){return function(){var n=parseInt(""===t.current.value?"0":t.current.value);n<e.min?n=e.min:n>e.max&&(n=e.max),o(n)}()},value:r.toString()}))}),f=function(){var e=i.a.useState(!1),t=Object(u.a)(e,2),n=t[0],a=t[1];var r=i.a.useState(25),o=Object(u.a)(r,2),c=o[0],l=o[1],f=i.a.useState(20),x=Object(u.a)(f,2),m=x[0],y=x[1],v=i.a.useState(1e3),z=Object(u.a)(v,2),g=z[0],d=z[1],b=i.a.useState(1e3),E=Object(u.a)(b,2),p=E[0],w=E[1],S=i.a.useState(Math.floor(window.innerWidth/2)),k=Object(u.a)(S,2),M=k[0],O=k[1],P=i.a.useState(Math.floor(window.innerHeight/2)),T=Object(u.a)(P,2),V=T[0],j=T[1];return i.a.createElement("div",{className:"App"},i.a.createElement(s,{settings:{rotation:c,elevation:m,distance:g,picturePlane:p,offsetH:M,offsetV:V}}),n&&i.a.createElement("div",{className:"settings"},i.a.createElement("h2",null,"Perspektive Settings"),i.a.createElement(h,{label:"Rotation",min:0,max:359,step:5,value:c,returnValue:function(e){l(e)}}),i.a.createElement(h,{label:"Elevation",min:0,max:90,step:5,value:m,returnValue:function(e){y(e)}}),i.a.createElement(h,{label:"Distance",min:0,max:999999,step:50,value:g,returnValue:function(e){d(e)}}),i.a.createElement(h,{label:"Distance to Picture Plane",min:0,max:999999,step:50,value:p,returnValue:function(e){w(e)}}),i.a.createElement(h,{label:"Offset Horisontal",min:0,max:999999,step:5,value:M,returnValue:function(e){O(e)}}),i.a.createElement(h,{label:"Offset Vertical",min:0,max:999999,step:5,value:V,returnValue:function(e){j(e)}})),i.a.createElement("button",{onClick:function(e){e.preventDefault(),a(!n)}},n?"Close":"Settings"))};o.a.render(i.a.createElement(f,null),document.getElementById("root"))}],[[4,1,2]]]);
//# sourceMappingURL=main.3a92131a.chunk.js.map