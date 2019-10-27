(this.webpackJsonpgridconstructor=this.webpackJsonpgridconstructor||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(3),o=n.n(i),c=(n(12),n(4)),s=n(1),u=n(5),l=n(6),f=new(function(){function e(){Object(u.a)(this,e),this._settings=void 0,this._degrees_to_radians=function(e){return e*(Math.PI/180)},this._settings=this._getInitialSettings()}return Object(l.a)(e,[{key:"_getInitialSettings",value:function(){return{rotation:0,elevation:0,distance:1e3,picturePlane:1e3,offsetH:500,offsetV:500}}},{key:"project",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this._settings,t=arguments.length>1?arguments[1]:void 0,n=this._degrees_to_radians(e.rotation),a=this._degrees_to_radians(e.elevation),r=t.x*Math.sin(n)+t.y*Math.cos(n),i=t.x*Math.cos(n)-t.y*Math.sin(n),o=r*Math.cos(a)-t.z*Math.sin(a),c=r*Math.sin(a)+t.z*Math.cos(a),s=e.picturePlane*i/(e.distance+o)+e.offsetH,u=e.picturePlane*c/(e.distance+o)+e.offsetV;return{h:s,v:u}}}]),e}()),h=function(e){var t=e.settings,n=e.drawing,a=r.a.useRef(null),i=r.a.useState({width:window.innerWidth,height:window.innerHeight}),o=Object(s.a)(i,2),c=o[0],u=o[1];return r.a.useEffect((function(){var e=a.current;if(e){e.width=c.width,e.height=c.height;var r=e.getContext("2d");if(r){r.clearRect(0,0,e.width,e.height),r.strokeStyle="#f00";[[{x:0,y:0,z:0},{x:500,y:0,z:0}],[{x:480,y:0,z:5},{x:500,y:0,z:0}]].forEach((function(n){var a=f.project(t,n[0]),i=f.project(t,n[1]);r.beginPath(),r.moveTo(a.h,e.height-a.v),r.lineTo(i.h,e.height-i.v),r.lineTo(i.h,e.height-i.v),r.stroke()})),r.strokeStyle="#0f0";[[{x:0,y:0,z:0},{x:0,y:500,z:0}],[{x:5,y:480,z:0},{x:0,y:500,z:0}]].forEach((function(n){var a=f.project(t,n[0]),i=f.project(t,n[1]);r.beginPath(),r.moveTo(a.h,e.height-a.v),r.lineTo(i.h,e.height-i.v),r.lineTo(i.h,e.height-i.v),r.stroke()})),r.strokeStyle="#00f";[[{x:0,y:0,z:0},{x:0,y:0,z:500}],[{x:5,y:0,z:480},{x:0,y:0,z:500}]].forEach((function(n){var a=f.project(t,n[0]),i=f.project(t,n[1]);r.beginPath(),r.moveTo(a.h,e.height-a.v),r.lineTo(i.h,e.height-i.v),r.lineTo(i.h,e.height-i.v),r.stroke()})),r.strokeStyle="#aaa",r.beginPath();if([[{x:-200,y:-200,z:-200},{x:200,y:-200,z:-200}],[{x:-200,y:200,z:-200},{x:200,y:200,z:-200}],[{x:-200,y:-200,z:200},{x:200,y:-200,z:200}],[{x:-200,y:200,z:200},{x:200,y:200,z:200}],[{x:-200,y:-200,z:-200},{x:-200,y:-200,z:200}],[{x:200,y:-200,z:-200},{x:200,y:-200,z:200}],[{x:200,y:200,z:-200},{x:200,y:200,z:200}],[{x:-200,y:200,z:-200},{x:-200,y:200,z:200}],[{x:-200,y:-200,z:200},{x:-200,y:200,z:200}],[{x:200,y:-200,z:200},{x:200,y:200,z:200}],[{x:-200,y:-200,z:-200},{x:-200,y:200,z:-200}],[{x:200,y:-200,z:-200},{x:200,y:200,z:-200}]].forEach((function(n){var a=f.project(t,n[0]),i=f.project(t,n[1]);r.moveTo(a.h,e.height-a.v),r.lineTo(i.h,e.height-i.v)})),r.stroke(),n)for(var i in r.strokeStyle="#000",n.points){var o=f.project(t,n.points[i]);r.beginPath(),r.arc(o.h,o.v,5,0,2*Math.PI),r.stroke()}}}var s=function(){u({width:window.innerWidth,height:window.innerHeight})};return window.addEventListener("resize",s),function(){window.removeEventListener("resize",s)}}),[t,c,n]),r.a.createElement("canvas",{className:"canvas",ref:a})};n(13);function v(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}var g=function(e){var t=r.a.useRef(null),n=r.a.useState(e.value),a=Object(s.a)(n,2),i=a[0],o=a[1],c=e.returnValue;return r.a.useEffect((function(){c(i)}),[c,i]),r.a.createElement("label",null,e.label,":",r.a.createElement("input",{ref:t,type:"number",min:e.min,max:e.max,step:e.step,onChange:function(){return function(){var n=parseInt(""===t.current.value?"0":t.current.value);n<e.min?n=e.min:n>e.max&&(n=e.max),o(n)}()},value:i.toString()}))},y=function(){var e=function(e){var t=localStorage.getItem("gc_settings");return t?JSON.parse(t):e}({rotation:0,elevation:0,distance:1e3,picturePlane:1e3,offsetH:Math.floor(window.innerWidth/2),offsetV:Math.floor(window.innerHeight/2)}),t=r.a.useState(e),n=Object(s.a)(t,2),a=n[0],i=n[1],o=function(e,t){var n=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?v(n,!0).forEach((function(t){Object(c.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):v(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},a);switch(e){case"rotation":n.rotation=t;break;case"elevation":n.elevation=t;break;case"distance":n.distance=t;break;case"picturePlane":n.picturePlane=t;break;case"offsetH":n.offsetH=t;break;case"offsetV":n.offsetV=t}JSON.stringify(a)!==JSON.stringify(n)&&i(n)};r.a.useEffect((function(){console.log("useEffekt",a),localStorage.setItem("gc_settings",JSON.stringify(a))}),[a]);var u=r.a.useState(!1),l=Object(s.a)(u,2),f=l[0],y=l[1];var p=function(){var e=localStorage.getItem("gc_current_drawing");return e?JSON.parse(e):{points:{x0_y0_z0:{x:0,y:0,z:0}}}}(),m=r.a.useState(p),x=Object(s.a)(m,1)[0];return r.a.useEffect((function(){console.log(x)}),[x]),r.a.createElement("div",{className:"App"},r.a.createElement(h,{settings:a,drawing:x}),r.a.createElement("div",{className:"menu"},r.a.createElement("button",{onClick:function(e){e.preventDefault(),y(!f)}},f?"Back":"Settings")),f&&r.a.createElement("div",{className:"settings"},r.a.createElement("h2",null,"Perspektive Settings"),r.a.createElement(g,{label:"Rotation",min:0,max:359,step:5,value:a.rotation,returnValue:function(e){return o("rotation",e)}}),r.a.createElement(g,{label:"Elevation",min:0,max:90,step:5,value:a.elevation,returnValue:function(e){return o("elevation",e)}}),r.a.createElement(g,{label:"Distance",min:0,max:999999,step:50,value:a.distance,returnValue:function(e){return o("distance",e)}}),r.a.createElement(g,{label:"Distance to Picture Plane",min:0,max:999999,step:50,value:a.picturePlane,returnValue:function(e){return o("rotapicturePlane",e)}}),r.a.createElement(g,{label:"Offset Horisontal",min:0,max:999999,step:5,value:a.offsetH,returnValue:function(e){return o("offsetH",e)}}),r.a.createElement(g,{label:"Offset Vertical",min:0,max:999999,step:5,value:a.offsetV,returnValue:function(e){return o("offsetV",e)}})))};o.a.render(r.a.createElement(y,null),document.getElementById("root"))},7:function(e,t,n){e.exports=n(14)}},[[7,1,2]]]);
//# sourceMappingURL=main.f57b1d7e.chunk.js.map