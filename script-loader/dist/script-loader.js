"use strict";function ScriptLoader(options={}){const{useLogger,path,id,statics,dynamics,main}=options;this.name="[SCRIPT-LOADER]";this.slug="script-loader";if(!statics||!main){console.error(`${this.name} "statics" and "main" options are required.`)}this.useLogger=useLogger===undefined?false:useLogger;this.logWindow;this.scriptDirectoryPath=path?path:"./";this.mainContainer=document.createElement("div");this.staticContainer=document.createElement("div");this.dynamicContainer=document.createElement("div");this.startTime=null;this.endTime=null;const scriptObject={statics:statics,dynamics:dynamics,main:main};this.init=()=>{this.startTime=Date.now();if(this.useLogger){this.log("init",false,scriptObject)}this.setupScriptContainers();this.load(scriptObject)};this.setupScriptContainers=()=>{this.mainContainer.style.position="absolute";this.mainContainer.dataset.name=`${this.slug}_main-container`;this.mainContainer.id=`${id?id:ID()}_mainContainer`;this.staticContainer.dataset.name=this.slug+"_"+"static-scripts-container";this.mainContainer.appendChild(this.staticContainer);this.dynamicContainer.dataset.name=this.slug+"_"+"dynamic-scripts-container";this.mainContainer.appendChild(this.dynamicContainer);document.body.innerHTML+="\x3c!-- Loaded with Script Loader --\x3e\n";document.body.appendChild(this.mainContainer)};this.load=scriptObject=>{if(this.useLogger)this.log("Start loading scripts...",true);const promises=[];if(scriptObject.statics&&scriptObject.statics.length>0){const promise1=this.loadScripts(true,scriptObject.statics).then(()=>{if(this.useLogger){this.log(`static scripts loaded`,true)}});promises.push(promise1)}if(scriptObject.dynamics&&scriptObject.dynamics.length>0){const promise2=this.loadScripts(false,scriptObject.dynamics).then(()=>{if(this.useLogger){this.log(`dynamic scripts loaded`,true)}});promises.push(promise2)}return Promise.all(promises).then(()=>{if(scriptObject.main){this.loadScript(true,scriptObject.main).then(()=>{this.finish()})}})};this.loadScripts=(isStatic,scripts)=>{return new Promise((resolve,reject)=>{var counter=0;var loadLoop=()=>{if(scripts[counter]){this.loadScript(isStatic,scripts[counter]).then(()=>{if(this.useLogger){this.log("progress",false,{value:counter+1,total:scripts.length})}counter++;if(counter>=scripts.length){if(this.useLogger)console.groupEnd("Load Progress");resolve()}else{loadLoop()}}).catch(err=>reject(err))}else{resolve()}};if(this.useLogger)console.groupCollapsed("Load Progress");loadLoop()})};this.loadScript=(isStatic,name)=>{let startTime=Date.now(),endTime,totalTime;if(this.useLogger){this.log(`Loading ${isStatic?"static":"dynamic"} script named <strong>${name}</strong>...`,true)}return new Promise((resolve,reject)=>{var script=document.createElement("script");script.src=this.scriptDirectoryPath+name+".js";script.onload=()=>{endTime=Date.now();totalTime=(endTime-startTime)/1e3;const message=`*${name} script loaded in ${totalTime}s.`;if(this.useLogger){this.log(message,true)}resolve({isSuccess:true,time:totalTime,payload:{message:message}})};script.onerror=function(err){endTime=Date.now();totalTime=(endTime-startTime)/1e3;console.error(err);reject({isSuccess:false,time:totalTime,payload:err})};if(isStatic){this.staticContainer.appendChild(script)}else{this.dynamicContainer.appendChild(script)}})};this.finish=()=>{this.endTime=Date.now();if(this.useLogger){const totalTime=(this.endTime-this.startTime)/1e3;this.log("finish",false,totalTime)}};this.log=(message,useBreak,payload)=>{if(message==="init"){console.group(this.name);console.table(payload);const logWindowTitle=this.name+" Log Window";this.logWindow=document.createElement("div");this.logWindow.title=logWindowTitle;this.logWindow.dataset.name=this.slug+"_"+"log-window";this.logWindow.setAttribute("style","box-sizing:border-box;color:#222;font-size:0.8em;border:1px solid;padding:0.5rem;max-height:584px;overflow-y:auto;");this.logWindow.innerHTML+=`${logWindowTitle}<hr>`;this.logWindow.innerHTML+="Script Object : <pre style='border:1px solid;padding:5px;'><code>"+JSON.stringify(scriptObject,"",2)+"</code></pre>";this.mainContainer.appendChild(this.logWindow)}else if(message==="progress"){const progress=payload.value/payload.total*100;console.log(`Progress: ${progress} %`);const messageHtml=`<div><label style="display:none">Loading progress:</label><progress value="${payload.value}" max="${payload.total}"> ${progress}% </progress></div>`;this.logWindow.innerHTML+=messageHtml}else if(message==="finish"){const message=`Total load time: ${payload} seconds`;console.log(message);this.logWindow.innerHTML+=`<p>Total load time: <strong>${payload}</strong> seconds</p>`;console.groupEnd(this.name)}else{console.log(message);this.logWindow.innerHTML+=message+(useBreak?"<br/>":"")}};this.reset=()=>{this.dynamicContainer.innerHTML=""};return this;function ID(){return"_"+Math.random().toString(36).substr(2,9)}}