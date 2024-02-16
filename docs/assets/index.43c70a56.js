const pt=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=e(n);fetch(n.href,r)}};pt();class A{}class yt{constructor(t,e){this.items={},this._size=0,this.items=t.reduce((i,n)=>({...i,[n]:!0}),{}),this._size=Object.keys(this.items).length,this.onChange=e}*[Symbol.iterator](){yield*this.all()}all(){return Object.keys(this.items)}has(...t){for(const e of t)if(!(e in this.items))return!1;return!0}add(...t){let e=!1;for(const i of t)i in this.items||(this.items[i]=!0,e=!0);return e&&(this._size=Object.keys(this.items).length,this.onChange?.()),this}clear(){this.items={},this._size=0,this.onChange?.()}remove(...t){let e=!1;for(const i of t)i in this.items&&(delete this.items[i],e=!0);return e&&(this._size=Object.keys(this.items).length,this.onChange?.()),!0}get size(){return this._size}}const Z="__anon",H="$id$",m="Components",O="ToDestroy",w="ToIndex",k={PRE_LOAD:100,ON_LOAD:200,POST_LOAD:300,PRE_UPDATE:400,ON_UPDATE:500,POST_UPDATE:600,PRE_RENDER:700,ON_RENDER:800,POST_RENDER:900};var l=(s=>(s[s.SOME=0]="SOME",s[s.ALL=1]="ALL",s[s.ANY=2]="ANY",s[s.NONE=3]="NONE",s[s.IN=4]="IN",s))(l||{});class gt{constructor(t){this.stack=[],this.refs={},this.entities={},this.ctx=t}deserialize(t){this.deserializeEntities(t)}set(t,e,i){let n=t;for(;e.length;){const r=e.shift();r&&(e.length?n=n[r]:n[r]=i)}}recreateEntityReferences(){for(const[t,e]of Object.entries(this.refs)){const i=this.entities[t];for(const[n,r]of e)this.set(i.$,n,this.entities[r])}}deserializeInPlace(t,e,i){const{refs:n,stack:r}=this;let o=i;switch(r.push(i),typeof i){case"object":{if(i)for(const h of Object.getOwnPropertyNames(i)){const[c,a]=[i[h],[...t,h]];r.includes(c)||this.set(o,[h],c&&this.deserializeInPlace(a,e,c))}break}case"string":{if(i.startsWith(H)){const h=i.replace(`${H}|`,""),c=n[e]??[];c.push([t,h]),n[e]=c,o=null}/^[0-9]+n$/.test(i)&&(o=BigInt(i.slice(0,-1)));break}}return r.pop(),o}deserializeEntities(t){const{components:e,entities:i}=this.ctx.manager.registrations,n={},r=[];for(const{id:o,tags:h,type:c,$:a}of t.entities){if(!(c in i)){const x=c.split("|").filter(y=>!e[y]);if(x.length){console.warn(`Missing entities/components: ${x.join(", ")}`);continue}i[c]=n[c]=V.with(...c.split("|").map(y=>e[y]))}for(const d of Object.getOwnPropertyNames(a))a[d]=this.deserializeInPlace([d],o,a[d]);r.push({id:o,entity:i[c],data:a,tags:h})}this.ctx.register(Object.values(n));for(const{id:o,entity:h,data:c,tags:a}of r){const d=this.entities[o]=this.ctx.create(h,c,a);d.id=o}this.stack=[],this.recreateEntityReferences(),this.stack=[]}}class J{constructor(){this.map=new Map}all(){return Array.from(this.map.values()).flatMap(t=>Array.from(t))}keys(){return Array.from(this.map.keys())}get(t){return t.flatMap(e=>Array.from(this.map.get(e)??[]))}append(t,e){const i=this.map.get(t)??new Set;this.map.set(t,i.add(e))}remove(t,e){const i=this.map.get(t);i&&(i.delete(e),i.size||this.map.delete(t))}}function T(...s){let t=0n;for(const e of s)t|=e??0n;return t}const q={any(s,t){return!s||(s&t)>0n},all(s,t){return(s&t)===s},none(s,t){return!t||!(t&s)}},Q=new Map;function mt(s,...t){const e=Q.get(s)??[],i=class extends s{},n=[...e,...t];return Q.set(i,n),Object.defineProperty(i.prototype,m,{value:n.slice(),writable:!0}),i}function xt(...s){const t=class extends ot{};return Object.defineProperty(t.prototype,"items",{value:s.slice(),writable:!0}),t}function*wt(){let s=1;do yield s++;while(!0)}function*tt(){let s=1n;do yield 1n<<s++;while(!0)}class _{constructor(t){this.released=[],this.generator=t}static from(t){const e=t();return new _(()=>e.next().value)}release(t){this.released.push(t)}next(){return this.released.shift()??this.generator()}}function kt(s){return!!(s.prototype?.tick??s.prototype?.stop??s.prototype?.start)}const Et={[l.NONE]:q.none,[l.ALL]:q.all,[l.ANY]:q.any};class vt{constructor(t,e){this.key=null,this.results=new Set,this.constraints=new Set,this.refs=[],this.keys=new Map,this.executed=!1,this.targets={[l.ANY]:null,[l.ALL]:null,[l.NONE]:null},this.reducer=(i,n)=>{const r=n.constraint,o=this.ctx.manager.getID(...n.ids);return i[r]=i[r]?T(i[r],o):o,i},this.ctx=t,this.id=t.ids.id.next(),this.refs=e.filter(i=>i.constraint===l.IN).reduce((i,n)=>i.concat(n.ids),[]),this.steps=e.filter(({constraint:i})=>i!==l.SOME&&i!==l.IN),this.init()}refresh(){this.executed=!0;const t=this.ctx.manager.index;this.results=new Set(t.get(t.keys().filter(e=>this.filter(e))).map(e=>this.ctx.manager.entities[e]))}update(t,e){for(const i of e)this.results.delete(i);for(const i of t){const n=this.keys.get(i.key)??null;(n||n===null&&this.filter(i.key))&&this.results.add(i)}}*[Symbol.iterator](){if(this.executed||this.refresh(),this.refs.length){const t=this.refs.map(e=>this.ctx.manager.entities[e]?.refs.map(i=>i.entity)??[]).reduce((e,i)=>e.concat(i),[]);for(const e of t)this.results.has(e)&&(yield e)}else yield*this.results}get(){return Array.from(this)}first(){for(const t of this)return t;return null}init(){const t={[l.ALL]:[],[l.ANY]:[],[l.NONE]:[]};for(const e of this.steps)e.constraint!==l.SOME&&e.constraint!==l.IN&&(this.constraints.add(e.constraint),t[e.constraint].push(e));for(const e of this.constraints)this.targets=t[e].reduce(this.reducer,this.targets);this.key=T(...Object.values(this.targets))}filter(t){let e=this.keys.get(t)??null;if(e===null){e=!0;for(const i of this.constraints){const n=this.targets[i];if(!n||!Et[i](n,t)){e=!1;break}}this.keys.set(t,e)}return e}}class bt{constructor(){this.generator=_.from(tt),this.registry={}}add(...t){const e=[];for(const i of t)e.push(this.registry[i]??=this.generator.next());return T(...e)}getID(...t){const e=T(...t.map(i=>this.registry[i]??0n));return e===0n?null:e}release(t){const e=this.registry[t];this.generator.release(e)}}var et,st;const g=class{constructor(s){this.keys={},this.index=new J,this.entities={},this.registrations={tags:{},entities:{},components:{}},this.registry=new bt,this.baseEntityKeys=new Map,this.queries={},this.ctx=s,this.id=this.ctx.ids.id.next(),g[w][this.id]=[],g[O][this.id]=[]}getQuery(s,t){return this.queries[t]||(this.queries[t]=new vt(this.ctx,s)),this.queries[t]}register(s,t,e){const i=new Set([...t,...s.flatMap(n=>n.prototype[m])]);for(const n of i)this.registrations.components[n.type]=n,this.registry.add(n.type);for(const n of s){const r=n.prototype[m].map(h=>h.type);let o=n.name;o===Z&&(o=r.join("|")),this.registrations.entities[o]=n,this.baseEntityKeys.set(n,this.registry.getID(...r))}for(const n of e)if(!(n in this.registrations.tags)){const r=this.registrations.tags[n]=this.ctx.ids.id.next();this.registry.add(r)}}tick(){const s=[],t=Array.from(g[O][this.id]),e=g[w][this.id];if(!t.length&&!e.length)return;let i=0n;for(const[n,r]of e)if(this.entities[n.id]=n,n.key=this.getEntityKey(n),n.key!==r){if(i|=r|n.key,!r){s.push(n),this.index.append(n.key,n.id);continue}t.push(n),this.index.remove(r,n.id),g[O][this.id].includes(n)||(this.index.append(n.key,n.id),s.push(n))}for(const n of Object.values(this.queries))n.key&&q.any(i,n.key)&&n.update(s,t);for(const n of t)delete this.entities[n.id],this.index.remove(n.key,n.id),this.ctx.ids.id.release(n.id);g[O][this.id]=[],g[w][this.id]=[]}getID(...s){return this.registry.getID(...s)}stop(){this.queries={},this.index=new J,g[w][this.id]=[],g[O][this.id]=[]}create(s,t={},e=[]){const i=new s(this.ctx,t,e);return g[w][this.id].push([i,i.key??null]),this.entities[i.id]=i,i}getEntityKey(s){const t=this.baseEntityKeys.get(s.constructor)??this.registry.add(...s[m].map(e=>e.type));if(s.tags.size>0){const e=Array.from(s.tags,i=>this.registrations.tags[i]);return T(t,this.registry.add(...e))}return t}};let S=g;et=w,st=O;S[et]={};S[st]={};class Ot{constructor(t){this.key=[],this.resolved=null,this.criteria=[],this.ctx=t,this.reset()}get id(){return this.key.join("\u241D")}get all(){return this.state.tag=l.ALL,this}get any(){return this.state.tag=l.ANY,this}get some(){return this.state.tag=l.SOME,this}get none(){return this.state.tag=l.NONE,this}references(...t){return this.state.tag=l.IN,this.state.ids=t.map(e=>e.id),this.reset()}components(...t){return this.state.ids.push(...t.map(e=>e.type)),this.reset()}tags(...t){const e=this.ctx.manager.registrations.tags,i=t.filter(n=>!e[n]);return i.length&&this.ctx.manager.register([],[],i),this.state.ids=t.map(n=>e[n]),this.reset()}get query(){return this.resolved??=this.ctx.manager.getQuery(this.criteria,this.id)}get(){return this.query.get()}first(){return this.query.first()}[Symbol.iterator](){return this.query[Symbol.iterator]()}reset(){if(this.state&&this.state.tag!==l.SOME){const t=this.state.tag??l.ALL,e=t+"\u241E"+this.state.ids.join("\u241F");this.key.includes(e)||(this.key.push(e),this.criteria.push({constraint:t,ids:this.state.ids.slice()}))}return this.state={tag:null,ids:[]},this}}class St{constructor(t){this.stack=[],this.ctx=t}serialize(t={}){return{entities:this.serializeEntities(t)}}visit(t){const e={};for(const i of Object.getOwnPropertyNames(t)){const n=this.serializeValue(t[i]);n!==void 0&&(e[i]=n)}return e}serializeValue(t){let e=t;switch(this.stack.push(t),typeof t){case"object":{if(Array.isArray(t))e=t.map(i=>typeof i=="object"?i&&this.visit(i):this.serializeValue(i));else if(t){if(t.toJSON)e=t.toJSON();else if(t instanceof V)e=[H,t.id].join("|");else if(t)for(const i of Object.getOwnPropertyNames(t)){const n=t[i];this.stack.includes(n)||(t[i]=n&&this.serializeValue(n))}}break}case"bigint":e=`${t}n`;break;case"number":case"string":case"boolean":{e=t;break}}return this.stack.pop(),e}serializeEntities(t){this.stack=[];const e=t.entityFilter??(()=>!0),n=this.ctx.manager.index.all().map(r=>this.ctx.manager.entities[r]).filter(r=>r&&e(r)).map(r=>{const o=!r.constructor.name||r.constructor.name===Z?r[m].map(h=>h.type).join("|"):r.constructor.name;return{id:r.id,type:o,tags:Array.from(r.tags),$:this.visit(r.$)}});return this.stack=[],n}}class z{constructor(t){this.ctx=t}}class Rt{constructor(t){this.ref=null,this.entity=null,this.ref=t??null}}const K=class{constructor(s,t={},e=[]){this.key=0n,this.refs=[],this.id=t.id??s.ids.id.next(),this.mid=s.manager.id,this.tags=new yt(e,()=>{S[w][this.mid].push([this,this.key??null])}),this[m]=(this.constructor.prototype[m]??[]).slice(),this.$=this.getBindings(t)}static with(...s){return mt(this,...s)}get components(){return{all:this.allComponents.bind(this),has:this.has.bind(this),add:this.addComponent.bind(this),remove:this.removeComponents.bind(this),delete:this.removeComponents.bind(this),[Symbol.iterator]:function*(){yield*this.all()}}}is(...s){return this.tags.has(...s)}has(...s){return s.every(t=>t.type in this.$)}destroy(){if(this.refs.length){for(const s of this.refs)s.entity===this&&(s.entity=null),s.ref===this&&(s.ref=null);this.refs.splice(0,this.refs.length)}S[O][this.mid].push(this)}getBindings(s){const t={};for(const e of this[m]){const[i,n]=[e.type,new e];n instanceof Rt?(this.refs.push(n),n.entity=this,Object.defineProperty(t,i,{get:()=>n.ref,set:r=>{const o=n.ref;o&&o.refs.splice(o.refs.indexOf(n),1),n.ref=r,r?.refs.push(n)}}),t[i]=s[i]??null):t[i]=Object.assign(n,s[i]??{})}return t}allComponents(){return Object.values(this.$)}addComponent(s,t){const e=s.type;let i=!1;e in this.$||(this.$[e]=Object.assign(new s,t??{}),this[m].push(s),S[w][this.mid].push([this,this.key??null]),i=!0),i&&(this.constructor=K)}removeComponents(...s){let t=!1;for(const e of s)e.type in this.$&&(this[m].splice(this[m].indexOf(e),1),delete this.$[e.type],S[w][this.mid].push([this,this.key??null]),t=!0);t&&(this.constructor=K)}};let V=K;class it{constructor(t){this.ctx=t}}class nt extends it{constructor(t,...e){super(t),this.systems=[],this.systems=e}tick(t,e){for(const i of this.systems)i.tick?.(t,e),this.ctx.manager.tick()}async stop(){for(const t of this.systems)await t.stop?.(),this.ctx.manager.tick()}async start(){for(const t of this.systems)await t.start?.(),this.ctx.manager.tick()}addSystems(t){this.systems=t.flat(1).map(e=>kt(e)?new e(this.ctx):{tick:(i,n)=>e(this.ctx,i,n)})}}function rt(...s){return class extends nt{async start(){return this.addSystems(s),super.start()}}}function E(s,...t){const e=t.length===1?t.shift():rt(...t);return Object.assign(e,{phase:s})}function B(s,...t){return class extends nt{constructor(){super(...arguments),this.elapsed=0}tick(i,n){if(this.elapsed+=i,this.elapsed>=s){for(const r of this.systems)r.tick?.(i,n),this.ctx.manager.tick();this.elapsed-=s}}async start(){return this.addSystems(t),super.start()}}}class ot{constructor(){this.ids={bigint:_.from(tt),id:_.from(wt)},this.manager=new S(this),this.$=this.getPlugins(),this.system=this.getSystem()}static with(...t){return xt(...t)}get items(){return[]}tick(t=0,e=Date.now()){this.system.tick?.(t,e),this.manager.tick()}load(t){new gt(this).deserialize(t),this.manager.tick()}save(t){return new St(this).serialize(t)}register(t=[],e=[],i=[]){this.manager.register(t,e,i)}async start(){for(const t of Object.values(this.$))await t.start?.();await this.system.start?.(),this.manager.tick()}async stop(){await this.system.stop?.();for(const t of Object.values(this.$))await t.stop?.();this.manager.stop()}create(t,e={},i=[]){return this.manager.create(t,e,i)}get query(){return new Ot(this)}getPlugins(){const t={};for(const e of this.items){const i=new e(this),{entities:n={},components:r={},tags:o=[]}=i.$??{};this.register(Object.values(n),Object.values(r),o),t[e.type]=i}return t}getSystem(){const t=k.POST_UPDATE-1,e=Object.values(this.items).map(i=>this.$[i.type]).filter(i=>i.$?.systems?.length).reduce((i,n)=>{const r=n.$?.systems??[];return i.concat(r)},[]).flatMap(i=>i).sort((i,n)=>(i.phase??t)-(n.phase??t));return new(rt(...e))(this)}}var Pt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},at={exports:{}};(function(s,t){(function(e,i){s.exports=i()})(Pt,function(){var e=function(){function i(u){return o.appendChild(u.dom),u}function n(u){for(var p=0;p<o.children.length;p++)o.children[p].style.display=p===u?"block":"none";r=u}var r=0,o=document.createElement("div");o.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",o.addEventListener("click",function(u){u.preventDefault(),n(++r%o.children.length)},!1);var h=(performance||Date).now(),c=h,a=0,d=i(new e.Panel("FPS","#0ff","#002")),x=i(new e.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var y=i(new e.Panel("MB","#f08","#201"));return n(0),{REVISION:16,dom:o,addPanel:i,showPanel:n,begin:function(){h=(performance||Date).now()},end:function(){a++;var u=(performance||Date).now();if(x.update(u-h,200),u>c+1e3&&(d.update(1e3*a/(u-c),100),c=u,a=0,y)){var p=performance.memory;y.update(p.usedJSHeapSize/1048576,p.jsHeapSizeLimit/1048576)}return u},update:function(){h=this.end()},domElement:o,setMode:n}};return e.Panel=function(i,n,r){var o=1/0,h=0,c=Math.round,a=c(window.devicePixelRatio||1),d=80*a,x=48*a,y=3*a,u=2*a,p=3*a,b=15*a,N=74*a,C=30*a,$=document.createElement("canvas");$.width=d,$.height=x,$.style.cssText="width:80px;height:48px";var f=$.getContext("2d");return f.font="bold "+9*a+"px Helvetica,Arial,sans-serif",f.textBaseline="top",f.fillStyle=r,f.fillRect(0,0,d,x),f.fillStyle=n,f.fillText(i,y,u),f.fillRect(p,b,N,C),f.fillStyle=r,f.globalAlpha=.9,f.fillRect(p,b,N,C),{dom:$,update:function(M,dt){o=Math.min(o,M),h=Math.max(h,M),f.fillStyle=r,f.globalAlpha=1,f.fillRect(0,0,d,b),f.fillStyle=n,f.fillText(c(M)+" "+i+" ("+c(o)+"-"+c(h)+")",y,u),f.drawImage($,p+a,b,N-a,C,p,b,N-a,C),f.fillRect(p+N-a,b,a,C),f.fillStyle=r,f.globalAlpha=.9,f.fillRect(p+N-a,b,a,c((1-M/dt)*C))}}},e})})(at);var It=at.exports,Nt=[E(k.PRE_LOAD,({$:s})=>s.stats.stats.begin()),E(k.POST_RENDER,({$:s})=>s.stats.stats.end())];function G(s){return Math.round(s*100)/100}function L(s,t){return Math.random()*(t-s)+s}const Ct=.00125;var $t=[E(k.PRE_LOAD,({$:s})=>{s.stats.state.ts=performance.now()}),E(k.POST_RENDER,({$:s})=>{s.stats.state.ticks.push(performance.now()-s.stats.state.ts)}),B(1e3,({$:s})=>{const t=s.stats.state.ticks,e=G(t.reduce((i,n)=>i+n,0)/t.length);s.stats.state.averages.push(e),s.stats.state.ticks=[]}),B(1e4,({$:s})=>{const t=s.stats.state.averages,e=G(t.reduce((i,n)=>i+n,0)/t.length);s.stats.state.averages=[],console.log("Average tick duration (ms)",e)})];class ct extends z{constructor(){super(...arguments),this.$={systems:[...Nt,...$t]},this.stats=new It,this.state={ts:0,averages:[],ticks:[]}}start(){document.body.appendChild(this.stats.dom)}}ct.type="stats";class P extends A{constructor(){super(...arguments),this.x=0,this.y=0}}P.type="position";class W extends A{constructor(){super(...arguments),this.x=0,this.y=0}}W.type="velocity";class U extends A{constructor(){super(...arguments),this.x=0,this.y=0}}U.type="acceleration";class Y extends A{}Y.type="collider";function At(s,t){const e=t*Ct;for(const{$:i}of s.$.physics.query.movers){let{x:n,y:r}=i.acceleration??{x:0,y:0};n=Math.max(1,n>1?n-e:n),r=Math.max(1,r>1?r-e:r),i.acceleration&&(i.acceleration.x=n,i.acceleration.y=r),i.position.x+=i.velocity.x*n*e,i.position.y+=i.velocity.y*r*e}}class ht extends z{constructor(){super(...arguments),this.$={components:[U,P,W,Y],systems:[At]},this.query={movers:this.ctx.query.all.components(P,W).some.components(U,Y)}}}ht.type="physics";class lt extends z{constructor(){super(...arguments),this.scale=1,this.ts=0,this.tick=()=>{const t=performance.now(),e=t-this.ts;this.ctx.tick(e*this.scale,t),this.ts=t,requestAnimationFrame(this.tick)}}start(){this.tick()}}lt.type="ticker";function j(s,t,e){s.beginPath(),s.arc(t.x,t.y,e,0,Math.PI*2,!1),s.fill()}function Lt(s,t,e){s.beginPath(),s.moveTo(t.x,t.y),s.lineTo(e.x,e.y),s.stroke()}var R=(s=>(s.WHITE="#ffffffff",s.BLACK="#000000ff",s.YELLOW="#ffff99ff",s.WHITE_TRANS="#ffffff33",s))(R||{}),v=(s=>(s.CIRCLE="CIRCLE",s.RECT="RECT",s))(v||{});class I extends A{constructor(){super(...arguments),this.data={type:"CIRCLE",radius:1},this.strokeColor=R.WHITE,this.fillColor=null,this.strokeWidth=1}}I.type="shape";function Tt(s){const{ctx:t,...e}=s.$.canvas.state;t.fillStyle=R.BLACK,t.fillRect(0,0,e.width,e.height);for(const i of s.$.canvas.queries.shapes){const{position:n,shape:r}=i.$;switch(t.beginPath(),t.fillStyle=r.fillColor??"transparent",t.strokeStyle=r.strokeColor??"transparent",t.lineWidth=r.strokeWidth??0,r.data.type){case v.CIRCLE:{t.arc(n.x,n.y,r.data.radius,0,2*Math.PI,!1);break}case v.RECT:{t.rect(n.x-r.data.width/2,n.y-r.data.height/2,r.data.width,r.data.height);break}}r.fillColor&&t.fill(),r.strokeColor&&t.stroke()}}class _t extends it{constructor(){super(...arguments),this.onResize=()=>{const t=this.ctx.$.canvas.state;t.width=window.innerWidth,t.height=window.innerHeight}}get width(){return this.ctx.$.canvas.state.width}get height(){return this.ctx.$.canvas.state.height}start(){window.addEventListener("resize",this.onResize)}stop(){window.removeEventListener("resize",this.onResize)}tick(){const t=this.ctx.$.canvas.state.canvas;t.width!==this.width&&(t.width=this.width),t.height!==this.height&&(t.height=this.height)}}class ft extends z{constructor(){super(...arguments),this.dom=document.querySelector("canvas"),this.state={canvas:this.dom,ctx:this.dom.getContext("2d"),width:window.innerWidth,height:window.innerHeight},this.$={components:[I],systems:[B(30/1e3,_t),E(k.ON_RENDER,Tt)]},this.queries={shapes:this.ctx.query.components(I,P)}}get width(){return this.state.width}get height(){return this.state.height}}ft.type="canvas";function Dt(s){for(const{$:t}of s.$.physics.query.movers.all.components(I)){let{x:e,y:i}=t.position;const n=(()=>{switch(t.shape.data.type){case v.CIRCLE:return t.shape.data.radius;case v.RECT:{const r=t.shape.data;return Math.ceil((r.height+r.width)/2)}}})();i=i+n<0?s.$.canvas.height+n:i,i=i-n>s.$.canvas.height?-n:i,e=e+n<0?s.$.canvas.width+n:e,e=e-n>s.$.canvas.width?-n:e,t.position.x=e,t.position.y=i}}function zt({$:s},{$:t}){if(s.shape.data.type!==v.CIRCLE||t.shape.data.type!==v.CIRCLE)return null;const[e,i]=[s.shape.data.radius,t.shape.data.radius],n=t.position.x-s.position.x,r=t.position.y-s.position.y,o=Math.sqrt(r**2+n**2);if(o>e+i||o<Math.abs(e-i))return null;const h=(e**2-i**2+o**2)/(2*o),c=s.position.x+n*h/o,a=s.position.y+r*h/o,d=Math.sqrt(e**2-h**2),x=-r*(d/o),y=n*(d/o);return[{x:c+x,y:a+y},{x:c-x,y:a-y}]}function Mt(s){let t=1;const e=Array.from(s.$.intersections.query.circles);for(const i of e){i.$.intersect.points=[];for(let n=t;n<e.length;n++){const r=zt(i,e[n]);r&&i.$.intersect.points.push(r)}t++}}class D extends A{constructor(){super(...arguments),this.points=[]}}D.type="intersect";function jt(s){const{ctx:t}=s.$.canvas.state,e=Array.from(s.query.components(P,I,D),i=>i.$.intersect.points).flat(1);for(const[i,n]of e)t.lineWidth=2,t.strokeStyle=R.YELLOW,t.fillStyle=R.WHITE_TRANS,j(t,i,6),j(t,n,6),t.fillStyle=R.WHITE,j(t,i,3),j(t,n,3),Lt(t,i,n)}class X extends V.with(P,W,I,D){static create(t){return t.create(this,{position:{x:L(0,t.$.canvas.width),y:L(0,t.$.canvas.height)},velocity:{x:L(-20,20),y:L(-20,20)},shape:{data:{type:v.CIRCLE,radius:L(20,100)},fillColor:null,strokeColor:R.WHITE,strokeWidth:1},intersect:{points:[]}})}}const ut=class extends z{constructor(){super(...arguments),this.$={components:[D],entities:[X],systems:[E(k.POST_UPDATE,Dt),E(k.PRE_RENDER,Mt),E(k.POST_RENDER,jt)]},this.query={circles:this.ctx.query.components(I,P,D)}}start(){for(let s=0;s<ut.CIRCLE_COUNT;s++)X.create(this.ctx)}};let F=ut;F.type="intersections";F.CIRCLE_COUNT=125;(async()=>{const s=ot.with(ft,ct,ht,lt,F);await new s().start()})();