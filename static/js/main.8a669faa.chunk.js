(this.webpackJsonpgridconstructor=this.webpackJsonpgridconstructor||[]).push([[0],{12:function(t,e,n){},13:function(t,e,n){},14:function(t,e,n){"use strict";n.r(e);var a=n(0),i=n.n(a),s=n(3),r=n.n(s),c=(n(12),n(4)),o=n(1),l=n(5),h=n(6),u=new(function(){function t(){Object(l.a)(this,t),this._settings=void 0,this._canvasElm=void 0,this._cxt=void 0,this._scale=void 0,this._pan=void 0,this._degrees_to_radians=function(t){return t*(Math.PI/180)},this._settings=this._getInitialSettings(),this._scale=1,this._pan={h:window.innerWidth/2,v:-window.innerHeight/2},this._cxt=null}return Object(h.a)(t,[{key:"_getInitialSettings",value:function(){return{rotation:0,elevation:0,distance:1e3,picturePlane:1e3,offsetH:1754,offsetV:1240,docSize:{width:3508,height:2480}}}},{key:"_project",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this._settings,e=arguments.length>1?arguments[1]:void 0,n=this._degrees_to_radians(t.rotation),a=this._degrees_to_radians(t.elevation),i=e.x*Math.sin(n)+e.y*Math.cos(n),s=e.x*Math.cos(n)-e.y*Math.sin(n),r=i*Math.cos(a)-e.z*Math.sin(a),c=i*Math.sin(a)+e.z*Math.cos(a),o=t.picturePlane*s/(t.distance+r),l=t.picturePlane*c/(t.distance+r);return{h:o*this._scale+this._pan.h,v:l*this._scale-this._pan.v}}},{key:"getSettings",value:function(){return this._settings}},{key:"setSettings",value:function(t){this._settings=t}},{key:"setCanvasSize",value:function(){this._canvasElm&&this._canvasElm.getContext&&(this._canvasElm.width=window.innerWidth,this._canvasElm.height=window.innerHeight)}},{key:"setScale",value:function(t){this._scale=t}},{key:"pan",value:function(t,e){this._pan.h+=t/window.devicePixelRatio,this._pan.v+=e/window.devicePixelRatio}},{key:"registerCanvas",value:function(t){t&&t.getContext?(this._canvasElm=t,this._canvasElm.width=window.innerWidth,this._canvasElm.height=window.innerHeight,this._cxt=this._canvasElm.getContext("2d"),this._scale=1):console.warn("Registered canvase element is not of type <canvas>!")}},{key:"draw",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this._settings,n=arguments.length>1?arguments[1]:void 0;if(this._canvasElm&&this._cxt){this._canvasElm.width=window.innerWidth,this._canvasElm.height=window.innerHeight,this._cxt.clearRect(0,0,this._canvasElm.width,this._canvasElm.height),this._cxt.fillStyle="rgb(231, 230, 227)",this._cxt.fillRect(0,0,this._canvasElm.width,this._canvasElm.height),this._cxt.strokeStyle="#f00";var a=[[{x:0,y:0,z:0},{x:500,y:0,z:0}],[{x:480,y:0,z:5},{x:500,y:0,z:0}]];a.forEach((function(n){var a=t._project(e,n[0]),i=t._project(e,n[1]);t._cxt.beginPath(),t._cxt.moveTo(a.h,t._canvasElm.height-a.v),t._cxt.lineTo(i.h,t._canvasElm.height-i.v),t._cxt.lineTo(i.h,t._canvasElm.height-i.v),t._cxt.stroke()})),this._cxt.strokeStyle="#0f0";var i=[[{x:0,y:0,z:0},{x:0,y:500,z:0}],[{x:5,y:480,z:0},{x:0,y:500,z:0}]];i.forEach((function(n){var a=t._project(e,n[0]),i=t._project(e,n[1]);t._cxt.beginPath(),t._cxt.moveTo(a.h,t._canvasElm.height-a.v),t._cxt.lineTo(i.h,t._canvasElm.height-i.v),t._cxt.lineTo(i.h,t._canvasElm.height-i.v),t._cxt.stroke()})),this._cxt.strokeStyle="#00f";var s=[[{x:0,y:0,z:0},{x:0,y:0,z:500}],[{x:5,y:0,z:480},{x:0,y:0,z:500}]];s.forEach((function(n){var a=t._project(e,n[0]),i=t._project(e,n[1]);t._cxt.beginPath(),t._cxt.moveTo(a.h,t._canvasElm.height-a.v),t._cxt.lineTo(i.h,t._canvasElm.height-i.v),t._cxt.lineTo(i.h,t._canvasElm.height-i.v),t._cxt.stroke()})),this._cxt.strokeStyle="#aaa",this._cxt.beginPath();var r=[[{x:-100,y:-100,z:-100},{x:100,y:-100,z:-100}],[{x:-100,y:100,z:-100},{x:100,y:100,z:-100}],[{x:-100,y:-100,z:100},{x:100,y:-100,z:100}],[{x:-100,y:100,z:100},{x:100,y:100,z:100}],[{x:-100,y:-100,z:-100},{x:-100,y:-100,z:100}],[{x:100,y:-100,z:-100},{x:100,y:-100,z:100}],[{x:100,y:100,z:-100},{x:100,y:100,z:100}],[{x:-100,y:100,z:-100},{x:-100,y:100,z:100}],[{x:-100,y:-100,z:100},{x:-100,y:100,z:100}],[{x:100,y:-100,z:100},{x:100,y:100,z:100}],[{x:-100,y:-100,z:-100},{x:-100,y:100,z:-100}],[{x:100,y:-100,z:-100},{x:100,y:100,z:-100}]];if(r.forEach((function(n){var a=t._project(e,n[0]),i=t._project(e,n[1]);t._cxt.moveTo(a.h,t._canvasElm.height-a.v),t._cxt.lineTo(i.h,t._canvasElm.height-i.v)})),this._cxt.stroke(),n)for(var c in this._cxt.strokeStyle="#000",n.points){var o=this._project(e,n.points[c]);this._cxt.beginPath(),this._cxt.arc(o.h,this._canvasElm.height-o.v,5,0,2*Math.PI),this._cxt.stroke()}}}}]),t}()),v=function(t){t.settings,t.drawing;var e=i.a.useRef(null);return i.a.useLayoutEffect((function(){var t=e.current;t&&u.registerCanvas(t)}),[]),i.a.createElement("canvas",{className:"canvas",ref:e})};n(13);function f(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}var _=function(t){var e=i.a.useRef(null),n=i.a.useState(t.value),a=Object(o.a)(n,2),s=a[0],r=a[1],c=t.returnValue;return i.a.useEffect((function(){c(s)}),[c,s]),i.a.createElement("label",null,t.label,":",i.a.createElement("input",{ref:e,type:"number",min:t.min,max:t.max,step:t.step,onChange:function(){return function(){var n=parseInt(""===e.current.value?"0":e.current.value);n<t.min?n=t.min:n>t.max&&(n=t.max),r(n)}()},value:s.toString()}))},x=function(){var t=i.a.useState(function(){var t=localStorage.getItem("gc_settings");return t?JSON.parse(t):u.getSettings()}()),e=Object(o.a)(t,2),n=e[0],a=e[1],s=function(t,e){if(n){var i=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?f(n,!0).forEach((function(e){Object(c.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):f(n).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},n);switch(t){case"rotation":i.rotation=e;break;case"elevation":i.elevation=e;break;case"distance":i.distance=e;break;case"picturePlane":i.picturePlane=e;break;case"offsetH":i.offsetH=e;break;case"offsetV":i.offsetV=e}JSON.stringify(n)!==JSON.stringify(i)&&a(i)}};i.a.useEffect((function(){localStorage.setItem("gc_settings",JSON.stringify(n))}),[n]);var r=i.a.useState(!1),l=Object(o.a)(r,2),h=l[0],x=l[1],g=i.a.useState(function(){var t=localStorage.getItem("gc_current_drawing");return t?JSON.parse(t):{points:{x0_y0_z0:{x:0,y:0,z:0}}}}()),m=Object(o.a)(g,1)[0],y=i.a.useState(null),d=Object(o.a)(y,2),p=d[0],E=d[1],w=i.a.useState(1),b=Object(o.a)(w,2),z=b[0],S=b[1];return i.a.useEffect((function(){p&&u.pan(p.x,p.y),u.setScale(z),u.draw(n,m);var t=function(){u.setCanvasSize(),u.draw(n,m)};return window.addEventListener("resize",t),function(){window.removeEventListener("resize",t)}}),[p,z,n,m]),i.a.createElement("div",{className:"App",onMouseMove:function(t){var e;1===(e=t).buttons?E({x:e.movementX,y:e.movementY}):p&&E(null)},onWheel:function(t){S(z-.001*t.deltaY)}},i.a.createElement(v,{settings:n,drawing:m}),i.a.createElement("div",{className:"menu"},i.a.createElement("button",{onClick:function(t){t.preventDefault(),x(!h)}},h?"Back":"Settings")),h&&i.a.createElement("div",{className:"settings"},i.a.createElement("h2",null,"Perspektive Settings"),i.a.createElement(_,{label:"Rotation",min:0,max:359,step:5,value:n.rotation,returnValue:function(t){return s("rotation",t)}}),i.a.createElement(_,{label:"Elevation",min:0,max:90,step:5,value:n.elevation,returnValue:function(t){return s("elevation",t)}}),i.a.createElement(_,{label:"Distance",min:0,max:999999,step:50,value:n.distance,returnValue:function(t){return s("distance",t)}}),i.a.createElement(_,{label:"Distance to Picture Plane",min:0,max:999999,step:50,value:n.picturePlane,returnValue:function(t){return s("picturePlane",t)}}),i.a.createElement(_,{label:"Offset Horisontal",min:0,max:999999,step:5,value:n.offsetH,returnValue:function(t){return s("offsetH",t)}}),i.a.createElement(_,{label:"Offset Vertical",min:0,max:999999,step:5,value:n.offsetV,returnValue:function(t){return s("offsetV",t)}})))};r.a.render(i.a.createElement(x,null),document.getElementById("root"))},7:function(t,e,n){t.exports=n(14)}},[[7,1,2]]]);
//# sourceMappingURL=main.8a669faa.chunk.js.map