(this.webpackJsonpgridconstructor=this.webpackJsonpgridconstructor||[]).push([[0],{12:function(t,e,n){},13:function(t,e,n){},14:function(t,e,n){"use strict";n.r(e);var i=n(0),a=n.n(i),s=n(4),r=n.n(s),c=(n(12),n(2)),o=n(1),h=n(5),l=n(6);function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function f(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?u(n,!0).forEach((function(e){Object(c.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(n).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var v=new(function(){function t(){var e=this;Object(h.a)(this,t),this._settings=void 0,this._drawing=void 0,this._canvasElm=void 0,this._cxt=void 0,this._scale=void 0,this._pan=void 0,this._getPersistentSettings=function(){var t=localStorage.getItem("gc_settings");return t?JSON.parse(t):e._getInitialSettings()},this._readPersistentDrawing=function(){var t=localStorage.getItem("gc_current_drawing");return t?JSON.parse(t):{points:{x0_y0_z0:{x:0,y:0,z:0}}}},this._degrees_to_radians=function(t){return t*(Math.PI/180)},this._settings=this._getPersistentSettings(),this._drawing=this._readPersistentDrawing(),this._scale=1,this._pan={h:window.innerWidth/2,v:-window.innerHeight/2},this._cxt=null}return Object(l.a)(t,[{key:"_getInitialSettings",value:function(){return{rotation:0,elevation:0,distance:1e3,picturePlane:1e3,offsetH:1754,offsetV:1240,docSize:{width:3508,height:2480}}}},{key:"_drawLine",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=arguments.length>2?arguments[2]:void 0,i=arguments.length>3?arguments[3]:void 0,a=this._project(t,n.start,e),s=this._project(t,n.end,e);this._cxt.strokeStyle=i,this._cxt.beginPath(),this._cxt.moveTo(a.h,this._canvasElm.height-a.v),this._cxt.lineTo(s.h,this._canvasElm.height-s.v),this._cxt.stroke()}},{key:"_drawGizmo",value:function(){var t=this;if(this._cxt){var e=f({},this._settings);e.distance=1e3,e.picturePlane=1e3;var n=function(n,i){t._cxt.strokeStyle=n,i.forEach((function(i){t._drawLine(e,!1,i,n)}))},i=[[{start:{x:0,y:0,z:0},end:{x:100,y:0,z:0}},{start:{x:80,y:0,z:3},end:{x:100,y:0,z:0}},{start:{x:80,y:0,z:-3},end:{x:100,y:0,z:0}},{start:{x:80,y:3,z:0},end:{x:100,y:0,z:0}},{start:{x:80,y:-3,z:0},end:{x:100,y:0,z:0}}],[{start:{x:0,y:0,z:0},end:{x:0,y:100,z:0}},{start:{x:3,y:80,z:0},end:{x:0,y:100,z:0}},{start:{x:-3,y:80,z:0},end:{x:0,y:100,z:0}},{start:{x:0,y:80,z:3},end:{x:0,y:100,z:0}},{start:{x:0,y:80,z:-3},end:{x:0,y:100,z:0}}],[{start:{x:0,y:0,z:0},end:{x:0,y:0,z:100}},{start:{x:3,y:0,z:80},end:{x:0,y:0,z:100}},{start:{x:-3,y:0,z:80},end:{x:0,y:0,z:100}},{start:{x:0,y:3,z:80},end:{x:0,y:0,z:100}},{start:{x:0,y:-3,z:80},end:{x:0,y:0,z:100}}]];n("#f00",i[0]),n("#0f0",i[1]),n("#00f",i[2])}}},{key:"_project",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this._settings,e=arguments.length>1?arguments[1]:void 0,n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],i=this._degrees_to_radians(t.rotation),a=this._degrees_to_radians(t.elevation),s=e.x*Math.sin(i)+e.y*Math.cos(i),r=e.x*Math.cos(i)-e.y*Math.sin(i),c=s*Math.cos(a)-e.z*Math.sin(a),o=s*Math.sin(a)+e.z*Math.cos(a),h=t.picturePlane*r/(t.distance+c),l=t.picturePlane*o/(t.distance+c);return n?{h:h*this._scale+this._pan.h,v:l*this._scale-this._pan.v}:{h:h+this._pan.h,v:l-this._pan.v}}},{key:"getSettings",value:function(){return this._settings}},{key:"setSettings",value:function(t){this._settings=t,localStorage.setItem("gc_settings",JSON.stringify(t))}},{key:"setCanvasSize",value:function(){this._canvasElm&&this._canvasElm.getContext&&(this._canvasElm.width=window.innerWidth,this._canvasElm.height=window.innerHeight)}},{key:"getScale",value:function(){return this._scale}},{key:"setScale",value:function(t){this._scale=t,this.draw()}},{key:"pan",value:function(t,e){this._pan.h+=t/window.devicePixelRatio,this._pan.v+=e/window.devicePixelRatio}},{key:"registerCanvas",value:function(t){t&&t.getContext?(this._canvasElm=t,this._canvasElm.width=window.innerWidth,this._canvasElm.height=window.innerHeight,this._cxt=this._canvasElm.getContext("2d"),this._scale=1,document.addEventListener("touchstart",(function(t){t.preventDefault()}),{passive:!1})):console.warn("Registered canvase element is not of type <canvas>!")}},{key:"draw",value:function(){var t=this;if(this._canvasElm&&this._cxt){this._canvasElm.width=window.innerWidth,this._canvasElm.height=window.innerHeight,this._cxt.fillStyle="rgb(231, 230, 227)",this._cxt.fillRect(0,0,this._canvasElm.width,this._canvasElm.height);var e=f({},this._settings);e.rotation=0,e.elevation=0,e.picturePlane=e.distance,this._cxt.fillStyle="rgb(245,245,245)";var n=this._project(e,{x:0,y:0,z:e.docSize.height}),i=this._project(e,{x:e.docSize.width,y:0,z:0});this._cxt.fillRect(n.h-e.offsetH*this._scale,this._canvasElm.height-n.v+e.offsetV*this._scale,i.h-n.h,n.v-i.v),this._cxt.strokeStyle="#aaa",[[{x:0,y:0,z:0},{x:e.docSize.width,y:0,z:0}],[{x:0,y:0,z:e.docSize.height},{x:e.docSize.width,y:0,z:e.docSize.height}],[{x:0,y:0,z:0},{x:0,y:0,z:this._settings.docSize.height}],[{x:e.docSize.width,y:0,z:0},{x:e.docSize.width,y:0,z:e.docSize.height}]].forEach((function(n){var i=t._project(e,n[0]),a=t._project(e,n[1]);t._cxt.beginPath(),t._cxt.moveTo(i.h-e.offsetH*t._scale,t._canvasElm.height-i.v+e.offsetV*t._scale),t._cxt.lineTo(a.h-e.offsetH*t._scale,t._canvasElm.height-a.v+e.offsetV*t._scale),t._cxt.stroke()})),this._drawGizmo(),this._cxt.strokeStyle="#aaa",this._cxt.beginPath();if([[{x:-100,y:-100,z:-100},{x:100,y:-100,z:-100}],[{x:-100,y:100,z:-100},{x:100,y:100,z:-100}],[{x:-100,y:-100,z:100},{x:100,y:-100,z:100}],[{x:-100,y:100,z:100},{x:100,y:100,z:100}],[{x:-100,y:-100,z:-100},{x:-100,y:-100,z:100}],[{x:100,y:-100,z:-100},{x:100,y:-100,z:100}],[{x:100,y:100,z:-100},{x:100,y:100,z:100}],[{x:-100,y:100,z:-100},{x:-100,y:100,z:100}],[{x:-100,y:-100,z:100},{x:-100,y:100,z:100}],[{x:100,y:-100,z:100},{x:100,y:100,z:100}],[{x:-100,y:-100,z:-100},{x:-100,y:100,z:-100}],[{x:100,y:-100,z:-100},{x:100,y:100,z:-100}]].forEach((function(e){t._drawLine(t._settings,!0,{start:e[0],end:e[1]},"#aaa")})),this._cxt.stroke(),this._drawing)for(var a in this._cxt.strokeStyle="#000",this._drawing.points){var s=this._project(this._settings,this._drawing.points[a]);this._cxt.beginPath(),this._cxt.arc(s.h,this._canvasElm.height-s.v,5,0,2*Math.PI),this._cxt.stroke()}}}}]),t}()),d=function(){var t=a.a.useRef(null);return a.a.useLayoutEffect((function(){var e=t.current;e&&v.registerCanvas(e)}),[]),a.a.createElement("canvas",{className:"canvas",ref:t})};n(13);function y(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}var _=function(t){var e=a.a.useRef(null),n=a.a.useState(t.value),i=Object(o.a)(n,2),s=i[0],r=i[1],c=t.returnValue;return a.a.useEffect((function(){c(s)}),[c,s]),a.a.createElement("label",null,t.label,":",a.a.createElement("input",{ref:e,type:"number",min:t.min,max:t.max,step:t.step,onChange:function(){return function(){var n=parseInt(""===e.current.value?"0":e.current.value);n<t.min?n=t.min:n>t.max&&(n=t.max),r(n)}()},value:s.toString()}))},g=function(){var t=a.a.useState(v.getSettings()),e=Object(o.a)(t,2),n=e[0],i=e[1],s=function(t,e){if(n){var a=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?y(n,!0).forEach((function(e){Object(c.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):y(n).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},n);switch(t){case"rotation":a.rotation=e;break;case"elevation":a.elevation=e;break;case"distance":a.distance=e;break;case"picturePlane":a.picturePlane=e;break;case"offsetH":a.offsetH=e;break;case"offsetV":a.offsetV=e}JSON.stringify(n)!==JSON.stringify(a)&&i(a)}};a.a.useEffect((function(){v.setSettings(n)}),[n]);var r=a.a.useState(!1),h=Object(o.a)(r,2),l=h[0],u=h[1],f=a.a.useState(null),g=Object(o.a)(f,2),x=g[0],p=g[1],z=a.a.useState(1),m=Object(o.a)(z,2),w=m[0],b=m[1];a.a.useEffect((function(){v.setScale(w)}),[w]),a.a.useEffect((function(){x&&v.pan(x.x,x.y),v.draw();var t=function(){v.setCanvasSize(),v.draw()};return window.addEventListener("resize",t),function(){window.removeEventListener("resize",t)}}),[x,n]);var S=a.a.useState([-1,-1]),E=Object(o.a)(S,2),O=E[0],P=E[1],j=a.a.useState([0,0]),k=Object(o.a)(j,2),M=k[0],V=k[1],D=a.a.useState(0),H=Object(o.a)(D,2),C=H[0],I=H[1],N=a.a.useState(0),Y=Object(o.a)(N,2),R=Y[0],X=Y[1];return a.a.useEffect((function(){if(0!==C){var t=v.getScale()+.001*C;t<.2&&(t=.2),v.setScale(t)}else 0!==M[0]&&0!==M[1]&&v.pan(M[0],M[1]),v.draw()}),[M,C]),a.a.createElement("div",{className:"App",onMouseMove:function(t){var e;1===(e=t).buttons?p({x:e.movementX,y:e.movementY}):x&&p(null)},onWheel:function(t){return function(t){var e=w-5e-4*t.deltaY;e<.2&&(e=.2),b(e)}(t)},onTouchStart:function(t){!function(t){if(2===t.touches.length){var e=t.touches[1].clientX-t.touches[0].clientX,n=t.touches[1].clientY-t.touches[0].clientY,i=Math.sqrt(e*e+n*n);I(0),X(i)}1===t.touches.length&&P([t.touches[0].clientX,t.touches[0].clientY])}(t)},onTouchEnd:function(t){var e;1===(e=t).touches.length&&(I(0),X(0),P([e.touches[0].clientX,e.touches[0].clientY])),V([0,0])},onTouchMove:function(t){!function(t){if(t.touches.length>1){var e=t.touches[1].clientX-t.touches[0].clientX,n=t.touches[1].clientY-t.touches[0].clientY,i=Math.sqrt(e*e+n*n);I(i-R),X(i)}else{var a=t.touches[0].clientX-O[0],s=t.touches[0].clientY-O[1];P([O[0]+a,O[1]+s]),V([a,s]),I(0),X(0)}}(t)}},a.a.createElement(d,null),a.a.createElement("div",{className:"menu"},a.a.createElement("button",{onClick:function(t){t.preventDefault(),u(!l)}},l?"Back":"Settings")),l&&a.a.createElement("div",{className:"settings",onMouseDown:function(t){return t.stopPropagation()},onMouseMove:function(t){return t.stopPropagation()}},a.a.createElement("h2",null,"Perspektive Settings"),a.a.createElement(_,{label:"Rotation",min:0,max:359,step:5,value:n.rotation,returnValue:function(t){return s("rotation",t)}}),a.a.createElement(_,{label:"Elevation",min:-90,max:90,step:5,value:n.elevation,returnValue:function(t){return s("elevation",t)}}),a.a.createElement(_,{label:"Distance",min:0,max:999999,step:50,value:n.distance,returnValue:function(t){return s("distance",t)}}),a.a.createElement(_,{label:"Distance to Picture Plane",min:0,max:999999,step:50,value:n.picturePlane,returnValue:function(t){return s("picturePlane",t)}}),a.a.createElement(_,{label:"Offset Horisontal",min:0,max:999999,step:5,value:n.offsetH,returnValue:function(t){return s("offsetH",t)}}),a.a.createElement(_,{label:"Offset Vertical",min:0,max:999999,step:5,value:n.offsetV,returnValue:function(t){return s("offsetV",t)}})))};r.a.render(a.a.createElement(g,null),document.getElementById("root"))},7:function(t,e,n){t.exports=n(14)}},[[7,1,2]]]);
//# sourceMappingURL=main.3258de9a.chunk.js.map