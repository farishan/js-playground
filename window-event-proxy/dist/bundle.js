if(!window)throw Error("`window` is not defined. This module is for browser environment.");function WindowEventProxy(){const e="WindowEventProxy",n={};return this.addEventListener=(e,o,t)=>{n[e]||(n[e]={}),n[e][o]=t,window.addEventListener(e,t);},this.removeEventListener=(e,o)=>{window.removeEventListener(e,n[e][o]),delete n[e][o];},this.debug=()=>{let o=document.getElementById(e);o&&document.body.removeChild(o),o=document.createElement("div"),o.id=e,o.style.border="1px solid",o.style.padding="1rem";const t=[];Object.keys(n).forEach((e=>{Object.keys(n[e]).forEach((n=>{t.push(e+"/"+n);}));})),o.innerHTML=`<pre><code>${JSON.stringify(t," ",2)}</code></pre>`,document.body.appendChild(o),console.log(this);},this}const windowEventProxy=new WindowEventProxy;export{windowEventProxy as default};