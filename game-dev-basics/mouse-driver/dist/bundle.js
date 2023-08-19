if(!window)throw Error("`window` is not defined. This module is for browser environment.");function WindowEventProxy(){const e={};return this.addEventListener=(n,o,t)=>{e[n]||(e[n]={}),e[n][o]=t,window.addEventListener(n,t);},this.removeEventListener=(n,o)=>{window.removeEventListener(n,e[n][o]),delete e[n][o];},this.debug=()=>{let n=document.getElementById("WindowEventProxy");n&&document.body.removeChild(n),n=document.createElement("div"),n.id="WindowEventProxy",n.style.border="1px solid",n.style.padding="1rem";const o=[];Object.keys(e).forEach((n=>{Object.keys(e[n]).forEach((e=>{o.push(n+"/"+e);}));})),n.innerHTML=`<pre><code>${JSON.stringify(o," ",2)}</code></pre>`,document.body.appendChild(n),console.log(this);},this}const windowEventProxy=new WindowEventProxy;

function Point(t={}){return this.x=t.x||null,this.y=t.y||null,this}

function CustomMouseEvent(t={}){return Point.call(this,{x:t.x||null,y:t.y||null}),this.name=t.name||"undefined",this}CustomMouseEvent.prototype=Object.assign({},Point.prototype),CustomMouseEvent.prototype.contructor=CustomMouseEvent;

function MouseDriver(){const e=this,o={is_mousedown:!1,is_mouseup:!1,is_mousemove:!1};return this.getState=()=>o,this.on=function(s,n,t){const u=new CustomMouseEvent({name:s});return windowEventProxy.addEventListener(s,`MouseDriver/${n}`,(e=>{"mouseup"===s&&o.is_mousedown?o.is_mousedown=!1:"mousedown"===s&&o.is_mouseup?o.is_mouseup=!1:o[`is_${s}`]=!0,u.x=e.clientX,u.y=e.clientY,t(u);})),e},this.off=function(o,s){return windowEventProxy.removeEventListener(o,s),e},this.debug=windowEventProxy.debug,this}const mouseDriver=new MouseDriver;

export { mouseDriver as default };
