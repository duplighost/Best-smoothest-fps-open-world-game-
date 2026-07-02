(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const yl="171",hf=0,tc=1,uf=2,Wh=1,Xh=2,Wn=3,fi=0,Oe=1,Fe=2,Zn=0,Ni=1,on=2,ec=3,nc=4,ff=5,Li=100,df=101,pf=102,mf=103,gf=104,vf=200,_f=201,xf=202,Mf=203,Ta=204,ba=205,yf=206,Sf=207,wf=208,Tf=209,bf=210,Ef=211,Af=212,Cf=213,Rf=214,Ea=0,Aa=1,Ca=2,ps=3,Ra=4,Pa=5,La=6,Da=7,qh=0,Pf=1,Lf=2,ui=0,Yh=1,Zh=2,jh=3,Sl=4,Df=5,Kh=6,Jh=7,$h=300,ms=301,gs=302,Ua=303,Ia=304,_o=306,Na=1e3,Ui=1001,Fa=1002,rn=1003,Uf=1004,_r=1005,Un=1006,Eo=1007,Ii=1008,Jn=1009,Qh=1010,tu=1011,rr=1012,wl=1013,Fi=1014,In=1015,jn=1016,Tl=1017,bl=1018,vs=1020,eu=35902,nu=1021,iu=1022,bn=1023,su=1024,ru=1025,fs=1026,_s=1027,El=1028,Al=1029,ou=1030,Cl=1031,Rl=1033,io=33776,so=33777,ro=33778,oo=33779,za=35840,Oa=35841,Ba=35842,ka=35843,Ga=36196,Va=37492,Ha=37496,Wa=37808,Xa=37809,qa=37810,Ya=37811,Za=37812,ja=37813,Ka=37814,Ja=37815,$a=37816,Qa=37817,tl=37818,el=37819,nl=37820,il=37821,ao=36492,sl=36494,rl=36495,au=36283,ol=36284,al=36285,ll=36286,If=3200,Nf=3201,lu=0,Ff=1,hi="",$e="srgb",xs="srgb-linear",co="linear",he="srgb",Gi=7680,ic=519,zf=512,Of=513,Bf=514,cu=515,kf=516,Gf=517,Vf=518,Hf=519,cl=35044,Zs=35048,sc="300 es",qn=2e3,ho=2001;class Es{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}}const ke=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let rc=1234567;const Js=Math.PI/180,or=180/Math.PI;function Nn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ke[s&255]+ke[s>>8&255]+ke[s>>16&255]+ke[s>>24&255]+"-"+ke[t&255]+ke[t>>8&255]+"-"+ke[t>>16&15|64]+ke[t>>24&255]+"-"+ke[e&63|128]+ke[e>>8&255]+"-"+ke[e>>16&255]+ke[e>>24&255]+ke[n&255]+ke[n>>8&255]+ke[n>>16&255]+ke[n>>24&255]).toLowerCase()}function Yt(s,t,e){return Math.max(t,Math.min(e,s))}function Pl(s,t){return(s%t+t)%t}function Wf(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function Xf(s,t,e){return s!==t?(e-s)/(t-s):0}function $s(s,t,e){return(1-e)*s+e*t}function qf(s,t,e,n){return $s(s,t,1-Math.exp(-e*n))}function Yf(s,t=1){return t-Math.abs(Pl(s,t*2)-t)}function Zf(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function jf(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function Kf(s,t){return s+Math.floor(Math.random()*(t-s+1))}function Jf(s,t){return s+Math.random()*(t-s)}function $f(s){return s*(.5-Math.random())}function Qf(s){s!==void 0&&(rc=s);let t=rc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function td(s){return s*Js}function ed(s){return s*or}function nd(s){return(s&s-1)===0&&s!==0}function id(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function sd(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function rd(s,t,e,n,i){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),f=o((t-n)/2),d=r((n-t)/2),m=o((n-t)/2);switch(i){case"XYX":s.set(a*h,l*u,l*f,a*c);break;case"YZY":s.set(l*f,a*h,l*u,a*c);break;case"ZXZ":s.set(l*u,l*f,a*h,a*c);break;case"XZX":s.set(a*h,l*m,l*d,a*c);break;case"YXY":s.set(l*d,a*h,l*m,a*c);break;case"ZYZ":s.set(l*m,l*d,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Tn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function ue(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const yt={DEG2RAD:Js,RAD2DEG:or,generateUUID:Nn,clamp:Yt,euclideanModulo:Pl,mapLinear:Wf,inverseLerp:Xf,lerp:$s,damp:qf,pingpong:Yf,smoothstep:Zf,smootherstep:jf,randInt:Kf,randFloat:Jf,randFloatSpread:$f,seededRandom:Qf,degToRad:td,radToDeg:ed,isPowerOfTwo:nd,ceilPowerOfTwo:id,floorPowerOfTwo:sd,setQuaternionFromProperEuler:rd,normalize:ue,denormalize:Tn};class et{constructor(t=0,e=0){et.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Yt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Wt{constructor(t,e,n,i,r,o,a,l,c){Wt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c)}set(t,e,n,i,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],m=n[8],v=i[0],g=i[3],p=i[6],M=i[1],y=i[4],_=i[7],b=i[2],E=i[5],A=i[8];return r[0]=o*v+a*M+l*b,r[3]=o*g+a*y+l*E,r[6]=o*p+a*_+l*A,r[1]=c*v+h*M+u*b,r[4]=c*g+h*y+u*E,r[7]=c*p+h*_+u*A,r[2]=f*v+d*M+m*b,r[5]=f*g+d*y+m*E,r[8]=f*p+d*_+m*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,f=a*l-h*r,d=c*r-o*l,m=e*u+n*f+i*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return t[0]=u*v,t[1]=(i*c-h*n)*v,t[2]=(a*n-i*o)*v,t[3]=f*v,t[4]=(h*e-i*l)*v,t[5]=(i*r-a*e)*v,t[6]=d*v,t[7]=(n*l-c*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Ao.makeScale(t,e)),this}rotate(t){return this.premultiply(Ao.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ao.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ao=new Wt;function hu(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function uo(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function od(){const s=uo("canvas");return s.style.display="block",s}const oc={};function ls(s){s in oc||(oc[s]=!0,console.warn(s))}function ad(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function ld(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function cd(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const ac=new Wt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),lc=new Wt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function hd(){const s={enabled:!0,workingColorSpace:xs,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===he&&(i.r=Kn(i.r),i.g=Kn(i.g),i.b=Kn(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===he&&(i.r=ds(i.r),i.g=ds(i.g),i.b=ds(i.b))),i},fromWorkingColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},toWorkingColorSpace:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===hi?co:this.spaces[i].transfer},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[xs]:{primaries:t,whitePoint:n,transfer:co,toXYZ:ac,fromXYZ:lc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:$e},outputColorSpaceConfig:{drawingBufferColorSpace:$e}},[$e]:{primaries:t,whitePoint:n,transfer:he,toXYZ:ac,fromXYZ:lc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:$e}}}),s}const ee=hd();function Kn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ds(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Vi;class ud{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Vi===void 0&&(Vi=uo("canvas")),Vi.width=t.width,Vi.height=t.height;const n=Vi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Vi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=uo("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Kn(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Kn(e[n]/255)*255):e[n]=Kn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let fd=0;class uu{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:fd++}),this.uuid=Nn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Co(i[o].image)):r.push(Co(i[o]))}else r=Co(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function Co(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?ud.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let dd=0;class He extends Es{constructor(t=He.DEFAULT_IMAGE,e=He.DEFAULT_MAPPING,n=Ui,i=Ui,r=Un,o=Ii,a=bn,l=Jn,c=He.DEFAULT_ANISOTROPY,h=hi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dd++}),this.uuid=Nn(),this.name="",this.source=new uu(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new et(0,0),this.repeat=new et(1,1),this.center=new et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Wt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==$h)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Na:t.x=t.x-Math.floor(t.x);break;case Ui:t.x=t.x<0?0:1;break;case Fa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Na:t.y=t.y-Math.floor(t.y);break;case Ui:t.y=t.y<0?0:1;break;case Fa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}He.DEFAULT_IMAGE=null;He.DEFAULT_MAPPING=$h;He.DEFAULT_ANISOTROPY=1;class de{constructor(t=0,e=0,n=0,i=1){de.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],m=l[9],v=l[2],g=l[6],p=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+v)<.1&&Math.abs(m+g)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(c+1)/2,_=(d+1)/2,b=(p+1)/2,E=(h+f)/4,A=(u+v)/4,R=(m+g)/4;return y>_&&y>b?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=E/n,r=A/n):_>b?_<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(_),n=E/i,r=R/i):b<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(b),n=A/r,i=R/r),this.set(n,i,r,e),this}let M=Math.sqrt((g-m)*(g-m)+(u-v)*(u-v)+(f-h)*(f-h));return Math.abs(M)<.001&&(M=1),this.x=(g-m)/M,this.y=(u-v)/M,this.z=(f-h)/M,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this.w=Yt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this.w=Yt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class pd extends Es{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new de(0,0,t,e),this.scissorTest=!1,this.viewport=new de(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Un,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new He(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new uu(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class En extends pd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class fu extends He{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=rn,this.minFilter=rn,this.wrapR=Ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class md extends He{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=rn,this.minFilter=rn,this.wrapR=Ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ve{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const f=r[o+0],d=r[o+1],m=r[o+2],v=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=m,t[e+3]=v;return}if(u!==v||l!==f||c!==d||h!==m){let g=1-a;const p=l*f+c*d+h*m+u*v,M=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const b=Math.sqrt(y),E=Math.atan2(b,p*M);g=Math.sin(g*E)/b,a=Math.sin(a*E)/b}const _=a*M;if(l=l*g+f*_,c=c*g+d*_,h=h*g+m*_,u=u*g+v*_,g===1-a){const b=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=b,c*=b,h*=b,u*=b}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],f=r[o+1],d=r[o+2],m=r[o+3];return t[e]=a*m+h*u+l*d-c*f,t[e+1]=l*m+h*f+c*u-a*d,t[e+2]=c*m+h*d+a*f-l*u,t[e+3]=h*m-a*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),f=l(n/2),d=l(i/2),m=l(r/2);switch(o){case"XYZ":this._x=f*h*u+c*d*m,this._y=c*d*u-f*h*m,this._z=c*h*m+f*d*u,this._w=c*h*u-f*d*m;break;case"YXZ":this._x=f*h*u+c*d*m,this._y=c*d*u-f*h*m,this._z=c*h*m-f*d*u,this._w=c*h*u+f*d*m;break;case"ZXY":this._x=f*h*u-c*d*m,this._y=c*d*u+f*h*m,this._z=c*h*m+f*d*u,this._w=c*h*u-f*d*m;break;case"ZYX":this._x=f*h*u-c*d*m,this._y=c*d*u+f*h*m,this._z=c*h*m-f*d*u,this._w=c*h*u+f*d*m;break;case"YZX":this._x=f*h*u+c*d*m,this._y=c*d*u+f*h*m,this._z=c*h*m-f*d*u,this._w=c*h*u-f*d*m;break;case"XZY":this._x=f*h*u-c*d*m,this._y=c*d*u-f*h*m,this._z=c*h*m+f*d*u,this._w=c*h*u+f*d*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(o-i)*d}else if(n>a&&n>u){const d=2*Math.sqrt(1+n-a-u);this._w=(h-l)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(r+c)/d}else if(a>u){const d=2*Math.sqrt(1+a-n-u);this._w=(r-c)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-n-a);this._w=(o-i)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Yt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*i+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=i*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(t=0,e=0,n=0){C.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(cc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(cc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-r*i),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ro.copy(this).projectOnVector(t),this.sub(Ro)}reflect(t){return this.sub(Ro.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Yt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ro=new C,cc=new Ve;class Oi{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(gn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(gn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=gn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,gn):gn.fromBufferAttribute(r,o),gn.applyMatrix4(t.matrixWorld),this.expandByPoint(gn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),xr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),xr.copy(n.boundingBox)),xr.applyMatrix4(t.matrixWorld),this.union(xr)}const i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,gn),gn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ds),Mr.subVectors(this.max,Ds),Hi.subVectors(t.a,Ds),Wi.subVectors(t.b,Ds),Xi.subVectors(t.c,Ds),Qn.subVectors(Wi,Hi),ti.subVectors(Xi,Wi),xi.subVectors(Hi,Xi);let e=[0,-Qn.z,Qn.y,0,-ti.z,ti.y,0,-xi.z,xi.y,Qn.z,0,-Qn.x,ti.z,0,-ti.x,xi.z,0,-xi.x,-Qn.y,Qn.x,0,-ti.y,ti.x,0,-xi.y,xi.x,0];return!Po(e,Hi,Wi,Xi,Mr)||(e=[1,0,0,0,1,0,0,0,1],!Po(e,Hi,Wi,Xi,Mr))?!1:(yr.crossVectors(Qn,ti),e=[yr.x,yr.y,yr.z],Po(e,Hi,Wi,Xi,Mr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,gn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(gn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(On[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),On[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),On[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),On[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),On[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),On[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),On[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),On[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(On),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const On=[new C,new C,new C,new C,new C,new C,new C,new C],gn=new C,xr=new Oi,Hi=new C,Wi=new C,Xi=new C,Qn=new C,ti=new C,xi=new C,Ds=new C,Mr=new C,yr=new C,Mi=new C;function Po(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){Mi.fromArray(s,r);const a=i.x*Math.abs(Mi.x)+i.y*Math.abs(Mi.y)+i.z*Math.abs(Mi.z),l=t.dot(Mi),c=e.dot(Mi),h=n.dot(Mi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const gd=new Oi,Us=new C,Lo=new C;class mi{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):gd.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Us.subVectors(t,this.center);const e=Us.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Us,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Lo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Us.copy(t.center).add(Lo)),this.expandByPoint(Us.copy(t.center).sub(Lo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Bn=new C,Do=new C,Sr=new C,ei=new C,Uo=new C,wr=new C,Io=new C;class Ll{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Bn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Bn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Bn.copy(this.origin).addScaledVector(this.direction,e),Bn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Do.copy(t).add(e).multiplyScalar(.5),Sr.copy(e).sub(t).normalize(),ei.copy(this.origin).sub(Do);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Sr),a=ei.dot(this.direction),l=-ei.dot(Sr),c=ei.lengthSq(),h=Math.abs(1-o*o);let u,f,d,m;if(h>0)if(u=o*l-a,f=o*a-l,m=r*h,u>=0)if(f>=-m)if(f<=m){const v=1/h;u*=v,f*=v,d=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f<=-m?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=m?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Do).addScaledVector(Sr,f),d}intersectSphere(t,e){Bn.subVectors(t.center,this.origin);const n=Bn.dot(this.direction),i=Bn.dot(Bn)-n*n,r=t.radius*t.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,i=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,i=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Bn)!==null}intersectTriangle(t,e,n,i,r){Uo.subVectors(e,t),wr.subVectors(n,t),Io.crossVectors(Uo,wr);let o=this.direction.dot(Io),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ei.subVectors(this.origin,t);const l=a*this.direction.dot(wr.crossVectors(ei,wr));if(l<0)return null;const c=a*this.direction.dot(Uo.cross(ei));if(c<0||l+c>o)return null;const h=-a*ei.dot(Io);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Bt{constructor(t,e,n,i,r,o,a,l,c,h,u,f,d,m,v,g){Bt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c,h,u,f,d,m,v,g)}set(t,e,n,i,r,o,a,l,c,h,u,f,d,m,v,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=m,p[11]=v,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Bt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/qi.setFromMatrixColumn(t,0).length(),r=1/qi.setFromMatrixColumn(t,1).length(),o=1/qi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=o*h,d=o*u,m=a*h,v=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+m*c,e[5]=f-v*c,e[9]=-a*l,e[2]=v-f*c,e[6]=m+d*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*h,d=l*u,m=c*h,v=c*u;e[0]=f+v*a,e[4]=m*a-d,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-m,e[6]=v+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*h,d=l*u,m=c*h,v=c*u;e[0]=f-v*a,e[4]=-o*u,e[8]=m+d*a,e[1]=d+m*a,e[5]=o*h,e[9]=v-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*h,d=o*u,m=a*h,v=a*u;e[0]=l*h,e[4]=m*c-d,e[8]=f*c+v,e[1]=l*u,e[5]=v*c+f,e[9]=d*c-m,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,d=o*c,m=a*l,v=a*c;e[0]=l*h,e[4]=v-f*u,e[8]=m*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=d*u+m,e[10]=f-v*u}else if(t.order==="XZY"){const f=o*l,d=o*c,m=a*l,v=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+v,e[5]=o*h,e[9]=d*u-m,e[2]=m*u-d,e[6]=a*h,e[10]=v*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(vd,t,_d)}lookAt(t,e,n){const i=this.elements;return tn.subVectors(t,e),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),ni.crossVectors(n,tn),ni.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),ni.crossVectors(n,tn)),ni.normalize(),Tr.crossVectors(tn,ni),i[0]=ni.x,i[4]=Tr.x,i[8]=tn.x,i[1]=ni.y,i[5]=Tr.y,i[9]=tn.y,i[2]=ni.z,i[6]=Tr.z,i[10]=tn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],m=n[2],v=n[6],g=n[10],p=n[14],M=n[3],y=n[7],_=n[11],b=n[15],E=i[0],A=i[4],R=i[8],S=i[12],x=i[1],L=i[5],F=i[9],z=i[13],G=i[2],W=i[6],q=i[10],K=i[14],V=i[3],st=i[7],dt=i[11],Tt=i[15];return r[0]=o*E+a*x+l*G+c*V,r[4]=o*A+a*L+l*W+c*st,r[8]=o*R+a*F+l*q+c*dt,r[12]=o*S+a*z+l*K+c*Tt,r[1]=h*E+u*x+f*G+d*V,r[5]=h*A+u*L+f*W+d*st,r[9]=h*R+u*F+f*q+d*dt,r[13]=h*S+u*z+f*K+d*Tt,r[2]=m*E+v*x+g*G+p*V,r[6]=m*A+v*L+g*W+p*st,r[10]=m*R+v*F+g*q+p*dt,r[14]=m*S+v*z+g*K+p*Tt,r[3]=M*E+y*x+_*G+b*V,r[7]=M*A+y*L+_*W+b*st,r[11]=M*R+y*F+_*q+b*dt,r[15]=M*S+y*z+_*K+b*Tt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],m=t[3],v=t[7],g=t[11],p=t[15];return m*(+r*l*u-i*c*u-r*a*f+n*c*f+i*a*d-n*l*d)+v*(+e*l*d-e*c*f+r*o*f-i*o*d+i*c*h-r*l*h)+g*(+e*c*u-e*a*d-r*o*u+n*o*d+r*a*h-n*c*h)+p*(-i*a*h-e*l*u+e*a*f+i*o*u-n*o*f+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],m=t[12],v=t[13],g=t[14],p=t[15],M=u*g*c-v*f*c+v*l*d-a*g*d-u*l*p+a*f*p,y=m*f*c-h*g*c-m*l*d+o*g*d+h*l*p-o*f*p,_=h*v*c-m*u*c+m*a*d-o*v*d-h*a*p+o*u*p,b=m*u*l-h*v*l-m*a*f+o*v*f+h*a*g-o*u*g,E=e*M+n*y+i*_+r*b;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/E;return t[0]=M*A,t[1]=(v*f*r-u*g*r-v*i*d+n*g*d+u*i*p-n*f*p)*A,t[2]=(a*g*r-v*l*r+v*i*c-n*g*c-a*i*p+n*l*p)*A,t[3]=(u*l*r-a*f*r-u*i*c+n*f*c+a*i*d-n*l*d)*A,t[4]=y*A,t[5]=(h*g*r-m*f*r+m*i*d-e*g*d-h*i*p+e*f*p)*A,t[6]=(m*l*r-o*g*r-m*i*c+e*g*c+o*i*p-e*l*p)*A,t[7]=(o*f*r-h*l*r+h*i*c-e*f*c-o*i*d+e*l*d)*A,t[8]=_*A,t[9]=(m*u*r-h*v*r-m*n*d+e*v*d+h*n*p-e*u*p)*A,t[10]=(o*v*r-m*a*r+m*n*c-e*v*c-o*n*p+e*a*p)*A,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*d-e*a*d)*A,t[12]=b*A,t[13]=(h*v*i-m*u*i+m*n*f-e*v*f-h*n*g+e*u*g)*A,t[14]=(m*a*i-o*v*i-m*n*l+e*v*l+o*n*g-e*a*g)*A,t[15]=(o*u*i-h*a*i+h*n*l-e*u*l-o*n*f+e*a*f)*A,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,f=r*c,d=r*h,m=r*u,v=o*h,g=o*u,p=a*u,M=l*c,y=l*h,_=l*u,b=n.x,E=n.y,A=n.z;return i[0]=(1-(v+p))*b,i[1]=(d+_)*b,i[2]=(m-y)*b,i[3]=0,i[4]=(d-_)*E,i[5]=(1-(f+p))*E,i[6]=(g+M)*E,i[7]=0,i[8]=(m+y)*A,i[9]=(g-M)*A,i[10]=(1-(f+v))*A,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=qi.set(i[0],i[1],i[2]).length();const o=qi.set(i[4],i[5],i[6]).length(),a=qi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],vn.copy(this);const c=1/r,h=1/o,u=1/a;return vn.elements[0]*=c,vn.elements[1]*=c,vn.elements[2]*=c,vn.elements[4]*=h,vn.elements[5]*=h,vn.elements[6]*=h,vn.elements[8]*=u,vn.elements[9]*=u,vn.elements[10]*=u,e.setFromRotationMatrix(vn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=qn){const l=this.elements,c=2*r/(e-t),h=2*r/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i);let d,m;if(a===qn)d=-(o+r)/(o-r),m=-2*o*r/(o-r);else if(a===ho)d=-o/(o-r),m=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=qn){const l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(o-r),f=(e+t)*c,d=(n+i)*h;let m,v;if(a===qn)m=(o+r)*u,v=-2*u;else if(a===ho)m=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=v,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const qi=new C,vn=new Bt,vd=new C(0,0,0),_d=new C(1,1,1),ni=new C,Tr=new C,tn=new C,hc=new Bt,uc=new Ve;class An{constructor(t=0,e=0,n=0,i=An.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],f=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(Yt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Yt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Yt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Yt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Yt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Yt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return hc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(hc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return uc.setFromEuler(this),this.setFromQuaternion(uc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}An.DEFAULT_ORDER="XYZ";class du{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let xd=0;const fc=new C,Yi=new Ve,kn=new Bt,br=new C,Is=new C,Md=new C,yd=new Ve,dc=new C(1,0,0),pc=new C(0,1,0),mc=new C(0,0,1),gc={type:"added"},Sd={type:"removed"},Zi={type:"childadded",child:null},No={type:"childremoved",child:null};class Ae extends Es{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:xd++}),this.uuid=Nn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ae.DEFAULT_UP.clone();const t=new C,e=new An,n=new Ve,i=new C(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Bt},normalMatrix:{value:new Wt}}),this.matrix=new Bt,this.matrixWorld=new Bt,this.matrixAutoUpdate=Ae.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ae.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new du,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Yi.setFromAxisAngle(t,e),this.quaternion.multiply(Yi),this}rotateOnWorldAxis(t,e){return Yi.setFromAxisAngle(t,e),this.quaternion.premultiply(Yi),this}rotateX(t){return this.rotateOnAxis(dc,t)}rotateY(t){return this.rotateOnAxis(pc,t)}rotateZ(t){return this.rotateOnAxis(mc,t)}translateOnAxis(t,e){return fc.copy(t).applyQuaternion(this.quaternion),this.position.add(fc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(dc,t)}translateY(t){return this.translateOnAxis(pc,t)}translateZ(t){return this.translateOnAxis(mc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(kn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?br.copy(t):br.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Is.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?kn.lookAt(Is,br,this.up):kn.lookAt(br,Is,this.up),this.quaternion.setFromRotationMatrix(kn),i&&(kn.extractRotation(i.matrixWorld),Yi.setFromRotationMatrix(kn),this.quaternion.premultiply(Yi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(gc),Zi.child=t,this.dispatchEvent(Zi),Zi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Sd),No.child=t,this.dispatchEvent(No),No.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),kn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),kn.multiply(t.parent.matrixWorld)),t.applyMatrix4(kn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(gc),Zi.child=t,this.dispatchEvent(Zi),Zi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Is,t,Md),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Is,yd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Ae.DEFAULT_UP=new C(0,1,0);Ae.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ae.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const _n=new C,Gn=new C,Fo=new C,Vn=new C,ji=new C,Ki=new C,vc=new C,zo=new C,Oo=new C,Bo=new C,ko=new de,Go=new de,Vo=new de;class fn{constructor(t=new C,e=new C,n=new C){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),_n.subVectors(t,e),i.cross(_n);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){_n.subVectors(i,e),Gn.subVectors(n,e),Fo.subVectors(t,e);const o=_n.dot(_n),a=_n.dot(Gn),l=_n.dot(Fo),c=Gn.dot(Gn),h=Gn.dot(Fo),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(c*l-a*h)*f,m=(o*h-a*l)*f;return r.set(1-d-m,m,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Vn)===null?!1:Vn.x>=0&&Vn.y>=0&&Vn.x+Vn.y<=1}static getInterpolation(t,e,n,i,r,o,a,l){return this.getBarycoord(t,e,n,i,Vn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Vn.x),l.addScaledVector(o,Vn.y),l.addScaledVector(a,Vn.z),l)}static getInterpolatedAttribute(t,e,n,i,r,o){return ko.setScalar(0),Go.setScalar(0),Vo.setScalar(0),ko.fromBufferAttribute(t,e),Go.fromBufferAttribute(t,n),Vo.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(ko,r.x),o.addScaledVector(Go,r.y),o.addScaledVector(Vo,r.z),o}static isFrontFacing(t,e,n,i){return _n.subVectors(n,e),Gn.subVectors(t,e),_n.cross(Gn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return _n.subVectors(this.c,this.b),Gn.subVectors(this.a,this.b),_n.cross(Gn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return fn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return fn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return fn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return fn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return fn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let o,a;ji.subVectors(i,n),Ki.subVectors(r,n),zo.subVectors(t,n);const l=ji.dot(zo),c=Ki.dot(zo);if(l<=0&&c<=0)return e.copy(n);Oo.subVectors(t,i);const h=ji.dot(Oo),u=Ki.dot(Oo);if(h>=0&&u<=h)return e.copy(i);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(ji,o);Bo.subVectors(t,r);const d=ji.dot(Bo),m=Ki.dot(Bo);if(m>=0&&d<=m)return e.copy(r);const v=d*c-l*m;if(v<=0&&c>=0&&m<=0)return a=c/(c-m),e.copy(n).addScaledVector(Ki,a);const g=h*m-d*u;if(g<=0&&u-h>=0&&d-m>=0)return vc.subVectors(r,i),a=(u-h)/(u-h+(d-m)),e.copy(i).addScaledVector(vc,a);const p=1/(g+v+f);return o=v*p,a=f*p,e.copy(n).addScaledVector(ji,o).addScaledVector(Ki,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const pu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ii={h:0,s:0,l:0},Er={h:0,s:0,l:0};function Ho(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class j{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=$e){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=ee.workingColorSpace){return this.r=t,this.g=e,this.b=n,ee.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=ee.workingColorSpace){if(t=Pl(t,1),e=Yt(e,0,1),n=Yt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Ho(o,r,t+1/3),this.g=Ho(o,r,t),this.b=Ho(o,r,t-1/3)}return ee.toWorkingColorSpace(this,i),this}setStyle(t,e=$e){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=$e){const n=pu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Kn(t.r),this.g=Kn(t.g),this.b=Kn(t.b),this}copyLinearToSRGB(t){return this.r=ds(t.r),this.g=ds(t.g),this.b=ds(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=$e){return ee.fromWorkingColorSpace(Ge.copy(this),t),Math.round(Yt(Ge.r*255,0,255))*65536+Math.round(Yt(Ge.g*255,0,255))*256+Math.round(Yt(Ge.b*255,0,255))}getHexString(t=$e){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.fromWorkingColorSpace(Ge.copy(this),e);const n=Ge.r,i=Ge.g,r=Ge.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ee.workingColorSpace){return ee.fromWorkingColorSpace(Ge.copy(this),e),t.r=Ge.r,t.g=Ge.g,t.b=Ge.b,t}getStyle(t=$e){ee.fromWorkingColorSpace(Ge.copy(this),t);const e=Ge.r,n=Ge.g,i=Ge.b;return t!==$e?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(ii),this.setHSL(ii.h+t,ii.s+e,ii.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ii),t.getHSL(Er);const n=$s(ii.h,Er.h,e),i=$s(ii.s,Er.s,e),r=$s(ii.l,Er.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ge=new j;j.NAMES=pu;let wd=0;class gi extends Es{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:wd++}),this.uuid=Nn(),this.name="",this.type="Material",this.blending=Ni,this.side=fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ta,this.blendDst=ba,this.blendEquation=Li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new j(0,0,0),this.blendAlpha=0,this.depthFunc=ps,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ic,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Gi,this.stencilZFail=Gi,this.stencilZPass=Gi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ni&&(n.blending=this.blending),this.side!==fi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ta&&(n.blendSrc=this.blendSrc),this.blendDst!==ba&&(n.blendDst=this.blendDst),this.blendEquation!==Li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ps&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ic&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Gi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Gi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Gi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class di extends gi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new j(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.combine=qh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Pe=new C,Ar=new et;class Gt{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=cl,this.updateRanges=[],this.gpuType=In,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ar.fromBufferAttribute(this,e),Ar.applyMatrix3(t),this.setXY(e,Ar.x,Ar.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Pe.fromBufferAttribute(this,e),Pe.applyMatrix3(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Pe.fromBufferAttribute(this,e),Pe.applyMatrix4(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Pe.fromBufferAttribute(this,e),Pe.applyNormalMatrix(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Pe.fromBufferAttribute(this,e),Pe.transformDirection(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Tn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ue(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Tn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ue(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Tn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ue(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Tn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ue(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Tn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ue(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array),i=ue(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array),i=ue(i,this.array),r=ue(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==cl&&(t.usage=this.usage),t}}class mu extends Gt{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class gu extends Gt{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class fe extends Gt{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Td=0;const hn=new Bt,Wo=new Ae,Ji=new C,en=new Oi,Ns=new Oi,Ie=new C;class pe extends Es{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Td++}),this.uuid=Nn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(hu(t)?gu:mu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Wt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return hn.makeRotationFromQuaternion(t),this.applyMatrix4(hn),this}rotateX(t){return hn.makeRotationX(t),this.applyMatrix4(hn),this}rotateY(t){return hn.makeRotationY(t),this.applyMatrix4(hn),this}rotateZ(t){return hn.makeRotationZ(t),this.applyMatrix4(hn),this}translate(t,e,n){return hn.makeTranslation(t,e,n),this.applyMatrix4(hn),this}scale(t,e,n){return hn.makeScale(t,e,n),this.applyMatrix4(hn),this}lookAt(t){return Wo.lookAt(t),Wo.updateMatrix(),this.applyMatrix4(Wo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ji).negate(),this.translate(Ji.x,Ji.y,Ji.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new fe(n,3))}else{const n=Math.min(t.length,e.count);for(let i=0;i<n;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Oi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];en.setFromBufferAttribute(r),this.morphTargetsRelative?(Ie.addVectors(this.boundingBox.min,en.min),this.boundingBox.expandByPoint(Ie),Ie.addVectors(this.boundingBox.max,en.max),this.boundingBox.expandByPoint(Ie)):(this.boundingBox.expandByPoint(en.min),this.boundingBox.expandByPoint(en.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){const n=this.boundingSphere.center;if(en.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Ns.setFromBufferAttribute(a),this.morphTargetsRelative?(Ie.addVectors(en.min,Ns.min),en.expandByPoint(Ie),Ie.addVectors(en.max,Ns.max),en.expandByPoint(Ie)):(en.expandByPoint(Ns.min),en.expandByPoint(Ns.max))}en.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)Ie.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ie));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ie.fromBufferAttribute(a,c),l&&(Ji.fromBufferAttribute(t,c),Ie.add(Ji)),i=Math.max(i,n.distanceToSquared(Ie))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Gt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new C,l[R]=new C;const c=new C,h=new C,u=new C,f=new et,d=new et,m=new et,v=new C,g=new C;function p(R,S,x){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,x),f.fromBufferAttribute(r,R),d.fromBufferAttribute(r,S),m.fromBufferAttribute(r,x),h.sub(c),u.sub(c),d.sub(f),m.sub(f);const L=1/(d.x*m.y-m.x*d.y);isFinite(L)&&(v.copy(h).multiplyScalar(m.y).addScaledVector(u,-d.y).multiplyScalar(L),g.copy(u).multiplyScalar(d.x).addScaledVector(h,-m.x).multiplyScalar(L),a[R].add(v),a[S].add(v),a[x].add(v),l[R].add(g),l[S].add(g),l[x].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let R=0,S=M.length;R<S;++R){const x=M[R],L=x.start,F=x.count;for(let z=L,G=L+F;z<G;z+=3)p(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const y=new C,_=new C,b=new C,E=new C;function A(R){b.fromBufferAttribute(i,R),E.copy(b);const S=a[R];y.copy(S),y.sub(b.multiplyScalar(b.dot(S))).normalize(),_.crossVectors(E,S);const L=_.dot(l[R])<0?-1:1;o.setXYZW(R,y.x,y.y,y.z,L)}for(let R=0,S=M.length;R<S;++R){const x=M[R],L=x.start,F=x.count;for(let z=L,G=L+F;z<G;z+=3)A(t.getX(z+0)),A(t.getX(z+1)),A(t.getX(z+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Gt(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new C,r=new C,o=new C,a=new C,l=new C,c=new C,h=new C,u=new C;if(t)for(let f=0,d=t.count;f<d;f+=3){const m=t.getX(f+0),v=t.getX(f+1),g=t.getX(f+2);i.fromBufferAttribute(e,m),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,g),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)i.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ie.fromBufferAttribute(t,e),Ie.normalize(),t.setXYZ(e,Ie.x,Ie.y,Ie.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h);let d=0,m=0;for(let v=0,g=l.length;v<g;v++){a.isInterleavedBufferAttribute?d=l[v]*a.data.stride+a.offset:d=l[v]*h;for(let p=0;p<h;p++)f[m++]=c[d++]}return new Gt(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new pe,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=t(f,n);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const _c=new Bt,yi=new Ll,Cr=new mi,xc=new C,Rr=new C,Pr=new C,Lr=new C,Xo=new C,Dr=new C,Mc=new C,Ur=new C;class kt extends Ae{constructor(t=new pe,e=new di){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(r&&a){Dr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(Xo.fromBufferAttribute(u,t),o?Dr.addScaledVector(Xo,h):Dr.addScaledVector(Xo.sub(e),h))}e.add(Dr)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Cr.copy(n.boundingSphere),Cr.applyMatrix4(r),yi.copy(t.ray).recast(t.near),!(Cr.containsPoint(yi.origin)===!1&&(yi.intersectSphere(Cr,xc)===null||yi.origin.distanceToSquared(xc)>(t.far-t.near)**2))&&(_c.copy(r).invert(),yi.copy(t.ray).applyMatrix4(_c),!(n.boundingBox!==null&&yi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,yi)))}_computeIntersections(t,e,n){let i;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,v=f.length;m<v;m++){const g=f[m],p=o[g.materialIndex],M=Math.max(g.start,d.start),y=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let _=M,b=y;_<b;_+=3){const E=a.getX(_),A=a.getX(_+1),R=a.getX(_+2);i=Ir(this,p,t,n,c,h,u,E,A,R),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const m=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let g=m,p=v;g<p;g+=3){const M=a.getX(g),y=a.getX(g+1),_=a.getX(g+2);i=Ir(this,o,t,n,c,h,u,M,y,_),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,v=f.length;m<v;m++){const g=f[m],p=o[g.materialIndex],M=Math.max(g.start,d.start),y=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let _=M,b=y;_<b;_+=3){const E=_,A=_+1,R=_+2;i=Ir(this,p,t,n,c,h,u,E,A,R),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const m=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let g=m,p=v;g<p;g+=3){const M=g,y=g+1,_=g+2;i=Ir(this,o,t,n,c,h,u,M,y,_),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}}function bd(s,t,e,n,i,r,o,a){let l;if(t.side===Oe?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,t.side===fi,a),l===null)return null;Ur.copy(a),Ur.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Ur);return c<e.near||c>e.far?null:{distance:c,point:Ur.clone(),object:s}}function Ir(s,t,e,n,i,r,o,a,l,c){s.getVertexPosition(a,Rr),s.getVertexPosition(l,Pr),s.getVertexPosition(c,Lr);const h=bd(s,t,e,n,Rr,Pr,Lr,Mc);if(h){const u=new C;fn.getBarycoord(Mc,Rr,Pr,Lr,u),i&&(h.uv=fn.getInterpolatedAttribute(i,a,l,c,u,new et)),r&&(h.uv1=fn.getInterpolatedAttribute(r,a,l,c,u,new et)),o&&(h.normal=fn.getInterpolatedAttribute(o,a,l,c,u,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new C,materialIndex:0};fn.getNormal(Rr,Pr,Lr,f.normal),h.face=f,h.barycoord=u}return h}class As extends pe{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let f=0,d=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,i,o,2),m("x","z","y",1,-1,t,n,-e,i,o,3),m("x","y","z",1,-1,t,e,n,i,r,4),m("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new fe(c,3)),this.setAttribute("normal",new fe(h,3)),this.setAttribute("uv",new fe(u,2));function m(v,g,p,M,y,_,b,E,A,R,S){const x=_/A,L=b/R,F=_/2,z=b/2,G=E/2,W=A+1,q=R+1;let K=0,V=0;const st=new C;for(let dt=0;dt<q;dt++){const Tt=dt*L-z;for(let Vt=0;Vt<W;Vt++){const ne=Vt*x-F;st[v]=ne*M,st[g]=Tt*y,st[p]=G,c.push(st.x,st.y,st.z),st[v]=0,st[g]=0,st[p]=E>0?1:-1,h.push(st.x,st.y,st.z),u.push(Vt/A),u.push(1-dt/R),K+=1}}for(let dt=0;dt<R;dt++)for(let Tt=0;Tt<A;Tt++){const Vt=f+Tt+W*dt,ne=f+Tt+W*(dt+1),Y=f+(Tt+1)+W*(dt+1),nt=f+(Tt+1)+W*dt;l.push(Vt,ne,nt),l.push(ne,Y,nt),V+=6}a.addGroup(d,V,S),d+=V,f+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new As(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ms(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function qe(s){const t={};for(let e=0;e<s.length;e++){const n=Ms(s[e]);for(const i in n)t[i]=n[i]}return t}function Ed(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function vu(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}const ys={clone:Ms,merge:qe};var Ad=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Cd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class le extends gi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ad,this.fragmentShader=Cd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ms(t.uniforms),this.uniformsGroups=Ed(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class _u extends Ae{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Bt,this.projectionMatrix=new Bt,this.projectionMatrixInverse=new Bt,this.coordinateSystem=qn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const si=new C,yc=new et,Sc=new et;class nn extends _u{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=or*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Js*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return or*2*Math.atan(Math.tan(Js*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(si.x,si.y).multiplyScalar(-t/si.z),si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(si.x,si.y).multiplyScalar(-t/si.z)}getViewSize(t,e){return this.getViewBounds(t,yc,Sc),e.subVectors(Sc,yc)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Js*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const $i=-90,Qi=1;class Rd extends Ae{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new nn($i,Qi,t,e);i.layers=this.layers,this.add(i);const r=new nn($i,Qi,t,e);r.layers=this.layers,this.add(r);const o=new nn($i,Qi,t,e);o.layers=this.layers,this.add(o);const a=new nn($i,Qi,t,e);a.layers=this.layers,this.add(a);const l=new nn($i,Qi,t,e);l.layers=this.layers,this.add(l);const c=new nn($i,Qi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===qn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ho)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class xu extends He{constructor(t,e,n,i,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:ms,super(t,e,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Pd extends En{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new xu(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Un}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new As(5,5,5),r=new le({name:"CubemapFromEquirect",uniforms:Ms(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Oe,blending:Zn});r.uniforms.tEquirect.value=e;const o=new kt(i,r),a=e.minFilter;return e.minFilter===Ii&&(e.minFilter=Un),new Rd(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}}class Dl{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new j(t),this.near=e,this.far=n}clone(){return new Dl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Ld extends Ae{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new An,this.environmentIntensity=1,this.environmentRotation=new An,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Dd{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=cl,this.updateRanges=[],this.version=0,this.uuid=Nn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Nn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Nn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Xe=new C;class fo{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.applyMatrix4(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.applyNormalMatrix(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.transformDirection(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Tn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ue(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ue(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ue(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ue(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ue(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Tn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Tn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Tn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Tn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array),i=ue(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array),i=ue(i,this.array),r=ue(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new Gt(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new fo(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ul extends gi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new j(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let ts;const Fs=new C,es=new C,ns=new C,is=new et,zs=new et,Mu=new Bt,Nr=new C,Os=new C,Fr=new C,wc=new et,qo=new et,Tc=new et;class yu extends Ae{constructor(t=new Ul){if(super(),this.isSprite=!0,this.type="Sprite",ts===void 0){ts=new pe;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Dd(e,5);ts.setIndex([0,1,2,0,2,3]),ts.setAttribute("position",new fo(n,3,0,!1)),ts.setAttribute("uv",new fo(n,2,3,!1))}this.geometry=ts,this.material=t,this.center=new et(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),es.setFromMatrixScale(this.matrixWorld),Mu.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ns.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&es.multiplyScalar(-ns.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const o=this.center;zr(Nr.set(-.5,-.5,0),ns,o,es,i,r),zr(Os.set(.5,-.5,0),ns,o,es,i,r),zr(Fr.set(.5,.5,0),ns,o,es,i,r),wc.set(0,0),qo.set(1,0),Tc.set(1,1);let a=t.ray.intersectTriangle(Nr,Os,Fr,!1,Fs);if(a===null&&(zr(Os.set(-.5,.5,0),ns,o,es,i,r),qo.set(0,1),a=t.ray.intersectTriangle(Nr,Fr,Os,!1,Fs),a===null))return;const l=t.ray.origin.distanceTo(Fs);l<t.near||l>t.far||e.push({distance:l,point:Fs.clone(),uv:fn.getInterpolation(Fs,Nr,Os,Fr,wc,qo,Tc,new et),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function zr(s,t,e,n,i,r){is.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(zs.x=r*is.x-i*is.y,zs.y=i*is.x+r*is.y):zs.copy(is),s.copy(t),s.x+=zs.x,s.y+=zs.y,s.applyMatrix4(Mu)}class Ud extends He{constructor(t=null,e=1,n=1,i,r,o,a,l,c=rn,h=rn,u,f){super(null,o,a,l,c,h,i,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ar extends Gt{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ss=new Bt,bc=new Bt,Or=[],Ec=new Oi,Id=new Bt,Bs=new kt,ks=new mi;class cs extends kt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ar(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Id)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Oi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ss),Ec.copy(t.boundingBox).applyMatrix4(ss),this.boundingBox.union(Ec)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new mi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ss),ks.copy(t.boundingSphere).applyMatrix4(ss),this.boundingSphere.union(ks)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(Bs.geometry=this.geometry,Bs.material=this.material,Bs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ks.copy(this.boundingSphere),ks.applyMatrix4(n),t.ray.intersectsSphere(ks)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,ss),bc.multiplyMatrices(n,ss),Bs.matrixWorld=bc,Bs.raycast(t,Or);for(let o=0,a=Or.length;o<a;o++){const l=Or[o];l.instanceId=r,l.object=this,e.push(l)}Or.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new ar(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ud(new Float32Array(i*this.count),i,this.count,El,In));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}const Yo=new C,Nd=new C,Fd=new Wt;class Ci{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Yo.subVectors(n,e).cross(Nd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Yo),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Fd.getNormalMatrix(t),i=this.coplanarPoint(Yo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Si=new mi,Br=new C;class Il{constructor(t=new Ci,e=new Ci,n=new Ci,i=new Ci,r=new Ci,o=new Ci){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=qn){const n=this.planes,i=t.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],f=i[7],d=i[8],m=i[9],v=i[10],g=i[11],p=i[12],M=i[13],y=i[14],_=i[15];if(n[0].setComponents(l-r,f-c,g-d,_-p).normalize(),n[1].setComponents(l+r,f+c,g+d,_+p).normalize(),n[2].setComponents(l+o,f+h,g+m,_+M).normalize(),n[3].setComponents(l-o,f-h,g-m,_-M).normalize(),n[4].setComponents(l-a,f-u,g-v,_-y).normalize(),e===qn)n[5].setComponents(l+a,f+u,g+v,_+y).normalize();else if(e===ho)n[5].setComponents(a,u,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Si.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Si.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Si)}intersectsSprite(t){return Si.center.set(0,0,0),Si.radius=.7071067811865476,Si.applyMatrix4(t.matrixWorld),this.intersectsSphere(Si)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Br.x=i.normal.x>0?t.max.x:t.min.x,Br.y=i.normal.y>0?t.max.y:t.min.y,Br.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Br)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Su extends gi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new j(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const po=new C,mo=new C,Ac=new Bt,Gs=new Ll,kr=new mi,Zo=new C,Cc=new C;class zd extends Ae{constructor(t=new pe,e=new Su){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)po.fromBufferAttribute(e,i-1),mo.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=po.distanceTo(mo);t.setAttribute("lineDistance",new fe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),kr.copy(n.boundingSphere),kr.applyMatrix4(i),kr.radius+=r,t.ray.intersectsSphere(kr)===!1)return;Ac.copy(i).invert(),Gs.copy(t.ray).applyMatrix4(Ac);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let v=d,g=m-1;v<g;v+=c){const p=h.getX(v),M=h.getX(v+1),y=Gr(this,t,Gs,l,p,M);y&&e.push(y)}if(this.isLineLoop){const v=h.getX(m-1),g=h.getX(d),p=Gr(this,t,Gs,l,v,g);p&&e.push(p)}}else{const d=Math.max(0,o.start),m=Math.min(f.count,o.start+o.count);for(let v=d,g=m-1;v<g;v+=c){const p=Gr(this,t,Gs,l,v,v+1);p&&e.push(p)}if(this.isLineLoop){const v=Gr(this,t,Gs,l,m-1,d);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Gr(s,t,e,n,i,r){const o=s.geometry.attributes.position;if(po.fromBufferAttribute(o,i),mo.fromBufferAttribute(o,r),e.distanceSqToSegment(po,mo,Zo,Cc)>n)return;Zo.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(Zo);if(!(l<t.near||l>t.far))return{distance:l,point:Cc.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}const Rc=new C,Pc=new C;class Od extends zd{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)Rc.fromBufferAttribute(e,i),Pc.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Rc.distanceTo(Pc);t.setAttribute("lineDistance",new fe(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Bd extends gi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new j(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Lc=new Bt,hl=new Ll,Vr=new mi,Hr=new C;class Bi extends Ae{constructor(t=new pe,e=new Bd){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vr.copy(n.boundingSphere),Vr.applyMatrix4(i),Vr.radius+=r,t.ray.intersectsSphere(Vr)===!1)return;Lc.copy(i).invert(),hl.copy(t.ray).applyMatrix4(Lc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let m=f,v=d;m<v;m++){const g=c.getX(m);Hr.fromBufferAttribute(u,g),Dc(Hr,g,l,i,t,e,this)}}else{const f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let m=f,v=d;m<v;m++)Hr.fromBufferAttribute(u,m),Dc(Hr,m,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Dc(s,t,e,n,i,r,o){const a=hl.distanceSqToPoint(s);if(a<e){const l=new C;hl.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class ge extends Ae{constructor(){super(),this.isGroup=!0,this.type="Group"}}class fr extends He{constructor(t,e,n,i,r,o,a,l,c){super(t,e,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class wu extends He{constructor(t,e,n,i,r,o,a,l,c,h=fs){if(h!==fs&&h!==_s)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===fs&&(n=Fi),n===void 0&&h===_s&&(n=vs),super(null,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:rn,this.minFilter=l!==void 0?l:rn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Fn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);const h=n[i],f=n[i+1]-h,d=(o-h)/f;return(i+d)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),l=e||(o.isVector2?new et:new C);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new C,i=[],r=[],o=[],a=new C,l=new Bt;for(let d=0;d<=t;d++){const m=d/t;i[d]=this.getTangentAt(m,new C)}r[0]=new C,o[0]=new C;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),f=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(Yt(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,m))}o[d].crossVectors(i[d],r[d])}if(e===!0){let d=Math.acos(Yt(r[0].dot(r[t]),-1,1));d/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(i[m],d*m)),o[m].crossVectors(i[m],r[m])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Nl extends Fn{constructor(t=0,e=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new et){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class kd extends Nl{constructor(t,e,n,i,r,o){super(t,e,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Fl(){let s=0,t=0,e=0,n=0;function i(r,o,a,l){s=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let f=(o-r)/c-(a-r)/(c+h)+(a-o)/h,d=(a-o)/h-(l-o)/(h+u)+(l-a)/u;f*=h,d*=h,i(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return s+t*r+e*o+n*a}}}const Wr=new C,jo=new Fl,Ko=new Fl,Jo=new Fl;class Gd extends Fn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new C){const n=e,i=this.points,r=i.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(Wr.subVectors(i[0],i[1]).add(i[0]),c=Wr);const u=i[a%r],f=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(Wr.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Wr),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(u),d),v=Math.pow(u.distanceToSquared(f),d),g=Math.pow(f.distanceToSquared(h),d);v<1e-4&&(v=1),m<1e-4&&(m=v),g<1e-4&&(g=v),jo.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,m,v,g),Ko.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,m,v,g),Jo.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,m,v,g)}else this.curveType==="catmullrom"&&(jo.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),Ko.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),Jo.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(jo.calc(l),Ko.calc(l),Jo.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new C().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Uc(s,t,e,n,i){const r=(n-t)*.5,o=(i-e)*.5,a=s*s,l=s*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*s+e}function Vd(s,t){const e=1-s;return e*e*t}function Hd(s,t){return 2*(1-s)*s*t}function Wd(s,t){return s*s*t}function Qs(s,t,e,n){return Vd(s,t)+Hd(s,e)+Wd(s,n)}function Xd(s,t){const e=1-s;return e*e*e*t}function qd(s,t){const e=1-s;return 3*e*e*s*t}function Yd(s,t){return 3*(1-s)*s*s*t}function Zd(s,t){return s*s*s*t}function tr(s,t,e,n,i){return Xd(s,t)+qd(s,e)+Yd(s,n)+Zd(s,i)}class Tu extends Fn{constructor(t=new et,e=new et,n=new et,i=new et){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new et){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(tr(t,i.x,r.x,o.x,a.x),tr(t,i.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class jd extends Fn{constructor(t=new C,e=new C,n=new C,i=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new C){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(tr(t,i.x,r.x,o.x,a.x),tr(t,i.y,r.y,o.y,a.y),tr(t,i.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class bu extends Fn{constructor(t=new et,e=new et){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new et){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new et){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Kd extends Fn{constructor(t=new C,e=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new C){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new C){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Eu extends Fn{constructor(t=new et,e=new et,n=new et){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new et){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Qs(t,i.x,r.x,o.x),Qs(t,i.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Jd extends Fn{constructor(t=new C,e=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new C){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Qs(t,i.x,r.x,o.x),Qs(t,i.y,r.y,o.y),Qs(t,i.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Au extends Fn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new et){const n=e,i=this.points,r=(i.length-1)*t,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(Uc(a,l.x,c.x,h.x,u.x),Uc(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new et().fromArray(i))}return this}}var Ic=Object.freeze({__proto__:null,ArcCurve:kd,CatmullRomCurve3:Gd,CubicBezierCurve:Tu,CubicBezierCurve3:jd,EllipseCurve:Nl,LineCurve:bu,LineCurve3:Kd,QuadraticBezierCurve:Eu,QuadraticBezierCurve3:Jd,SplineCurve:Au});class $d extends Fn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ic[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new Ic[i.type]().fromJSON(i))}return this}}class ul extends $d{constructor(t){super(),this.type="Path",this.currentPoint=new et,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new bu(this.currentPoint.clone(),new et(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new Eu(this.currentPoint.clone(),new et(t,e),new et(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,o){const a=new Tu(this.currentPoint.clone(),new et(t,e),new et(n,i),new et(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Au(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,i,r,o),this}absarc(t,e,n,i,r,o){return this.absellipse(t,e,n,n,i,r,o),this}ellipse(t,e,n,i,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,o,a,l),this}absellipse(t,e,n,i,r,o,a,l){const c=new Nl(t,e,n,i,r,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class zl extends pe{constructor(t=[new et(0,-.5),new et(.5,0),new et(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Yt(i,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],h=1/e,u=new C,f=new et,d=new C,m=new C,v=new C;let g=0,p=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:g=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,d.x=p*1,d.y=-g,d.z=p*0,v.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case t.length-1:l.push(v.x,v.y,v.z);break;default:g=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,d.x=p*1,d.y=-g,d.z=p*0,m.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),l.push(d.x,d.y,d.z),v.copy(m)}for(let M=0;M<=e;M++){const y=n+M*h*i,_=Math.sin(y),b=Math.cos(y);for(let E=0;E<=t.length-1;E++){u.x=t[E].x*_,u.y=t[E].y,u.z=t[E].x*b,o.push(u.x,u.y,u.z),f.x=M/e,f.y=E/(t.length-1),a.push(f.x,f.y);const A=l[3*E+0]*_,R=l[3*E+1],S=l[3*E+0]*b;c.push(A,R,S)}}for(let M=0;M<e;M++)for(let y=0;y<t.length-1;y++){const _=y+M*t.length,b=_,E=_+t.length,A=_+t.length+1,R=_+1;r.push(b,E,R),r.push(A,R,E)}this.setIndex(r),this.setAttribute("position",new fe(o,3)),this.setAttribute("uv",new fe(a,2)),this.setAttribute("normal",new fe(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zl(t.points,t.segments,t.phiStart,t.phiLength)}}class xo extends zl{constructor(t=1,e=1,n=4,i=8){const r=new ul;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new xo(t.radius,t.length,t.capSegments,t.radialSegments)}}class Ol extends pe{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new C,h=new et;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=n+u/e*i;c.x=t*Math.cos(d),c.y=t*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new fe(o,3)),this.setAttribute("normal",new fe(a,3)),this.setAttribute("uv",new fe(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ol(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class dn extends pe{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],f=[],d=[];let m=0;const v=[],g=n/2;let p=0;M(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new fe(u,3)),this.setAttribute("normal",new fe(f,3)),this.setAttribute("uv",new fe(d,2));function M(){const _=new C,b=new C;let E=0;const A=(e-t)/n;for(let R=0;R<=r;R++){const S=[],x=R/r,L=x*(e-t)+t;for(let F=0;F<=i;F++){const z=F/i,G=z*l+a,W=Math.sin(G),q=Math.cos(G);b.x=L*W,b.y=-x*n+g,b.z=L*q,u.push(b.x,b.y,b.z),_.set(W,A,q).normalize(),f.push(_.x,_.y,_.z),d.push(z,1-x),S.push(m++)}v.push(S)}for(let R=0;R<i;R++)for(let S=0;S<r;S++){const x=v[S][R],L=v[S+1][R],F=v[S+1][R+1],z=v[S][R+1];(t>0||S!==0)&&(h.push(x,L,z),E+=3),(e>0||S!==r-1)&&(h.push(L,F,z),E+=3)}c.addGroup(p,E,0),p+=E}function y(_){const b=m,E=new et,A=new C;let R=0;const S=_===!0?t:e,x=_===!0?1:-1;for(let F=1;F<=i;F++)u.push(0,g*x,0),f.push(0,x,0),d.push(.5,.5),m++;const L=m;for(let F=0;F<=i;F++){const G=F/i*l+a,W=Math.cos(G),q=Math.sin(G);A.x=S*q,A.y=g*x,A.z=S*W,u.push(A.x,A.y,A.z),f.push(0,x,0),E.x=W*.5+.5,E.y=q*.5*x+.5,d.push(E.x,E.y),m++}for(let F=0;F<i;F++){const z=b+F,G=L+F;_===!0?h.push(G,G+1,z):h.push(G+1,G,z),R+=3}c.addGroup(p,R,_===!0?1:2),p+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new dn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class dr extends dn{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new dr(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Bl extends pe{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],o=[];a(i),c(n),h(),this.setAttribute("position",new fe(r,3)),this.setAttribute("normal",new fe(r.slice(),3)),this.setAttribute("uv",new fe(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(M){const y=new C,_=new C,b=new C;for(let E=0;E<e.length;E+=3)d(e[E+0],y),d(e[E+1],_),d(e[E+2],b),l(y,_,b,M)}function l(M,y,_,b){const E=b+1,A=[];for(let R=0;R<=E;R++){A[R]=[];const S=M.clone().lerp(_,R/E),x=y.clone().lerp(_,R/E),L=E-R;for(let F=0;F<=L;F++)F===0&&R===E?A[R][F]=S:A[R][F]=S.clone().lerp(x,F/L)}for(let R=0;R<E;R++)for(let S=0;S<2*(E-R)-1;S++){const x=Math.floor(S/2);S%2===0?(f(A[R][x+1]),f(A[R+1][x]),f(A[R][x])):(f(A[R][x+1]),f(A[R+1][x+1]),f(A[R+1][x]))}}function c(M){const y=new C;for(let _=0;_<r.length;_+=3)y.x=r[_+0],y.y=r[_+1],y.z=r[_+2],y.normalize().multiplyScalar(M),r[_+0]=y.x,r[_+1]=y.y,r[_+2]=y.z}function h(){const M=new C;for(let y=0;y<r.length;y+=3){M.x=r[y+0],M.y=r[y+1],M.z=r[y+2];const _=g(M)/2/Math.PI+.5,b=p(M)/Math.PI+.5;o.push(_,1-b)}m(),u()}function u(){for(let M=0;M<o.length;M+=6){const y=o[M+0],_=o[M+2],b=o[M+4],E=Math.max(y,_,b),A=Math.min(y,_,b);E>.9&&A<.1&&(y<.2&&(o[M+0]+=1),_<.2&&(o[M+2]+=1),b<.2&&(o[M+4]+=1))}}function f(M){r.push(M.x,M.y,M.z)}function d(M,y){const _=M*3;y.x=t[_+0],y.y=t[_+1],y.z=t[_+2]}function m(){const M=new C,y=new C,_=new C,b=new C,E=new et,A=new et,R=new et;for(let S=0,x=0;S<r.length;S+=9,x+=6){M.set(r[S+0],r[S+1],r[S+2]),y.set(r[S+3],r[S+4],r[S+5]),_.set(r[S+6],r[S+7],r[S+8]),E.set(o[x+0],o[x+1]),A.set(o[x+2],o[x+3]),R.set(o[x+4],o[x+5]),b.copy(M).add(y).add(_).divideScalar(3);const L=g(b);v(E,x+0,M,L),v(A,x+2,y,L),v(R,x+4,_,L)}}function v(M,y,_,b){b<0&&M.x===1&&(o[y]=M.x-1),_.x===0&&_.z===0&&(o[y]=b/2/Math.PI+.5)}function g(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bl(t.vertices,t.indices,t.radius,t.details)}}class Mo extends ul{constructor(t){super(t),this.uuid=Nn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new ul().fromJSON(i))}return this}}const Qd={triangulate:function(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=Cu(s,0,i,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c,h,u,f,d;if(n&&(r=sp(s,t,r,e)),s.length>80*e){a=c=s[0],l=h=s[1];for(let m=e;m<i;m+=e)u=s[m],f=s[m+1],u<a&&(a=u),f<l&&(l=f),u>c&&(c=u),f>h&&(h=f);d=Math.max(c-a,h-l),d=d!==0?32767/d:0}return lr(r,o,e,a,l,d,0),o}};function Cu(s,t,e,n,i){let r,o;if(i===mp(s,t,e,n)>0)for(r=t;r<e;r+=n)o=Nc(r,s[r],s[r+1],o);else for(r=e-n;r>=t;r-=n)o=Nc(r,s[r],s[r+1],o);return o&&yo(o,o.next)&&(hr(o),o=o.next),o}function zi(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(yo(e,e.next)||ye(e.prev,e,e.next)===0)){if(hr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function lr(s,t,e,n,i,r,o){if(!s)return;!o&&r&&cp(s,n,i,r);let a=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?ep(s,n,i,r):tp(s)){t.push(l.i/e|0),t.push(s.i/e|0),t.push(c.i/e|0),hr(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=np(zi(s),t,e),lr(s,t,e,n,i,r,2)):o===2&&ip(s,t,e,n,i,r):lr(zi(s),t,e,n,i,r,1);break}}}function tp(s){const t=s.prev,e=s,n=s.next;if(ye(t,e,n)>=0)return!1;const i=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=i<r?i<o?i:o:r<o?r:o,u=a<l?a<c?a:c:l<c?l:c,f=i>r?i>o?i:o:r>o?r:o,d=a>l?a>c?a:c:l>c?l:c;let m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=f&&m.y>=u&&m.y<=d&&hs(i,a,r,l,o,c,m.x,m.y)&&ye(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function ep(s,t,e,n){const i=s.prev,r=s,o=s.next;if(ye(i,r,o)>=0)return!1;const a=i.x,l=r.x,c=o.x,h=i.y,u=r.y,f=o.y,d=a<l?a<c?a:c:l<c?l:c,m=h<u?h<f?h:f:u<f?u:f,v=a>l?a>c?a:c:l>c?l:c,g=h>u?h>f?h:f:u>f?u:f,p=fl(d,m,t,e,n),M=fl(v,g,t,e,n);let y=s.prevZ,_=s.nextZ;for(;y&&y.z>=p&&_&&_.z<=M;){if(y.x>=d&&y.x<=v&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&hs(a,h,l,u,c,f,y.x,y.y)&&ye(y.prev,y,y.next)>=0||(y=y.prevZ,_.x>=d&&_.x<=v&&_.y>=m&&_.y<=g&&_!==i&&_!==o&&hs(a,h,l,u,c,f,_.x,_.y)&&ye(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;y&&y.z>=p;){if(y.x>=d&&y.x<=v&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&hs(a,h,l,u,c,f,y.x,y.y)&&ye(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;_&&_.z<=M;){if(_.x>=d&&_.x<=v&&_.y>=m&&_.y<=g&&_!==i&&_!==o&&hs(a,h,l,u,c,f,_.x,_.y)&&ye(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function np(s,t,e){let n=s;do{const i=n.prev,r=n.next.next;!yo(i,r)&&Ru(i,n,n.next,r)&&cr(i,r)&&cr(r,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),hr(n),hr(n.next),n=s=r),n=n.next}while(n!==s);return zi(n)}function ip(s,t,e,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&fp(o,a)){let l=Pu(o,a);o=zi(o,o.next),l=zi(l,l.next),lr(o,t,e,n,i,r,0),lr(l,t,e,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function sp(s,t,e,n){const i=[];let r,o,a,l,c;for(r=0,o=t.length;r<o;r++)a=t[r]*n,l=r<o-1?t[r+1]*n:s.length,c=Cu(s,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(up(c));for(i.sort(rp),r=0;r<i.length;r++)e=op(i[r],e);return e}function rp(s,t){return s.x-t.x}function op(s,t){const e=ap(s,t);if(!e)return t;const n=Pu(e,s);return zi(n,n.next),zi(e,e.next)}function ap(s,t){let e=t,n=-1/0,i;const r=s.x,o=s.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const f=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>n&&(n=f,i=e.x<e.next.x?e:e.next,f===r))return i}e=e.next}while(e!==t);if(!i)return null;const a=i,l=i.x,c=i.y;let h=1/0,u;e=i;do r>=e.x&&e.x>=l&&r!==e.x&&hs(o<c?r:n,o,l,c,o<c?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),cr(e,s)&&(u<h||u===h&&(e.x>i.x||e.x===i.x&&lp(i,e)))&&(i=e,h=u)),e=e.next;while(e!==a);return i}function lp(s,t){return ye(s.prev,s,t.prev)<0&&ye(t.next,s,s.next)<0}function cp(s,t,e,n){let i=s;do i.z===0&&(i.z=fl(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,hp(i)}function hp(s){let t,e,n,i,r,o,a,l,c=1;do{for(e=s,s=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;e=n}r.nextZ=null,c*=2}while(o>1);return s}function fl(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function up(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function hs(s,t,e,n,i,r,o,a){return(i-o)*(t-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(i-o)*(n-a)}function fp(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!dp(s,t)&&(cr(s,t)&&cr(t,s)&&pp(s,t)&&(ye(s.prev,s,t.prev)||ye(s,t.prev,t))||yo(s,t)&&ye(s.prev,s,s.next)>0&&ye(t.prev,t,t.next)>0)}function ye(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function yo(s,t){return s.x===t.x&&s.y===t.y}function Ru(s,t,e,n){const i=qr(ye(s,t,e)),r=qr(ye(s,t,n)),o=qr(ye(e,n,s)),a=qr(ye(e,n,t));return!!(i!==r&&o!==a||i===0&&Xr(s,e,t)||r===0&&Xr(s,n,t)||o===0&&Xr(e,s,n)||a===0&&Xr(e,t,n))}function Xr(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function qr(s){return s>0?1:s<0?-1:0}function dp(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Ru(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function cr(s,t){return ye(s.prev,s,s.next)<0?ye(s,t,s.next)>=0&&ye(s,s.prev,t)>=0:ye(s,t,s.prev)<0||ye(s,s.next,t)<0}function pp(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Pu(s,t){const e=new dl(s.i,s.x,s.y),n=new dl(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Nc(s,t,e,n){const i=new dl(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function hr(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function dl(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function mp(s,t,e,n){let i=0;for(let r=t,o=e-n;r<e;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}class er{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return er.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];Fc(t),zc(n,t);let o=t.length;e.forEach(Fc);for(let l=0;l<e.length;l++)i.push(o),o+=e[l].length,zc(n,e[l]);const a=Qd.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function Fc(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function zc(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class Cs extends Bl{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Cs(t.radius,t.detail)}}class Rn extends pe{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=t/a,f=e/l,d=[],m=[],v=[],g=[];for(let p=0;p<h;p++){const M=p*f-o;for(let y=0;y<c;y++){const _=y*u-r;m.push(_,-M,0),v.push(0,0,1),g.push(y/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<a;M++){const y=M+c*p,_=M+c*(p+1),b=M+1+c*(p+1),E=M+1+c*p;d.push(y,_,E),d.push(_,b,E)}this.setIndex(d),this.setAttribute("position",new fe(m,3)),this.setAttribute("normal",new fe(v,3)),this.setAttribute("uv",new fe(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rn(t.width,t.height,t.widthSegments,t.heightSegments)}}class pr extends pe{constructor(t=new Mo([new et(0,.5),new et(-.5,-.5),new et(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],r=[],o=[];let a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new fe(i,3)),this.setAttribute("normal",new fe(r,3)),this.setAttribute("uv",new fe(o,2));function c(h){const u=i.length/3,f=h.extractPoints(e);let d=f.shape;const m=f.holes;er.isClockWise(d)===!1&&(d=d.reverse());for(let g=0,p=m.length;g<p;g++){const M=m[g];er.isClockWise(M)===!0&&(m[g]=M.reverse())}const v=er.triangulateShape(d,m);for(let g=0,p=m.length;g<p;g++){const M=m[g];d=d.concat(M)}for(let g=0,p=d.length;g<p;g++){const M=d[g];i.push(M.x,M.y,0),r.push(0,0,1),o.push(M.x,M.y)}for(let g=0,p=v.length;g<p;g++){const M=v[g],y=M[0]+u,_=M[1]+u,b=M[2]+u;n.push(y,_,b),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return gp(e,t)}static fromJSON(t,e){const n=[];for(let i=0,r=t.shapes.length;i<r;i++){const o=e[t.shapes[i]];n.push(o)}return new pr(n,t.curveSegments)}}function gp(s,t){if(t.shapes=[],Array.isArray(s))for(let e=0,n=s.length;e<n;e++){const i=s[e];t.shapes.push(i.uuid)}else t.shapes.push(s.uuid);return t}class Le extends pe{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new C,f=new C,d=[],m=[],v=[],g=[];for(let p=0;p<=n;p++){const M=[],y=p/n;let _=0;p===0&&o===0?_=.5/e:p===n&&l===Math.PI&&(_=-.5/e);for(let b=0;b<=e;b++){const E=b/e;u.x=-t*Math.cos(i+E*r)*Math.sin(o+y*a),u.y=t*Math.cos(o+y*a),u.z=t*Math.sin(i+E*r)*Math.sin(o+y*a),m.push(u.x,u.y,u.z),f.copy(u).normalize(),v.push(f.x,f.y,f.z),g.push(E+_,1-y),M.push(c++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){const y=h[p][M+1],_=h[p][M],b=h[p+1][M],E=h[p+1][M+1];(p!==0||o>0)&&d.push(y,_,E),(p!==n-1||l<Math.PI)&&d.push(_,b,E)}this.setIndex(d),this.setAttribute("position",new fe(m,3)),this.setAttribute("normal",new fe(v,3)),this.setAttribute("uv",new fe(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Le(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class vp extends le{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ce extends gi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new j(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new j(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=lu,this.normalScale=new et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class _p extends gi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=If,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class xp extends gi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class kl extends Ae{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new j(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Mp extends kl{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ae.DEFAULT_UP),this.updateMatrix(),this.groundColor=new j(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const $o=new Bt,Oc=new C,Bc=new C;class Lu{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new et(512,512),this.map=null,this.mapPass=null,this.matrix=new Bt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Il,this._frameExtents=new et(1,1),this._viewportCount=1,this._viewports=[new de(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Oc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Oc),Bc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Bc),e.updateMatrixWorld(),$o.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix($o),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply($o)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const kc=new Bt,Vs=new C,Qo=new C;class yp extends Lu{constructor(){super(new nn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new et(4,2),this._viewportCount=6,this._viewports=[new de(2,1,1,1),new de(0,1,1,1),new de(3,1,1,1),new de(1,1,1,1),new de(3,0,1,1),new de(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Vs.setFromMatrixPosition(t.matrixWorld),n.position.copy(Vs),Qo.copy(n.position),Qo.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Qo),n.updateMatrixWorld(),i.makeTranslation(-Vs.x,-Vs.y,-Vs.z),kc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(kc)}}class Du extends kl{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new yp}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Gl extends _u{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Sp extends Lu{constructor(){super(new Gl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Gc extends kl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ae.DEFAULT_UP),this.updateMatrix(),this.target=new Ae,this.shadow=new Sp}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class wp extends nn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Uu{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Vc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Vc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Vc(){return performance.now()}function Hc(s,t,e,n){const i=Tp(n);switch(e){case nu:return s*t;case su:return s*t;case ru:return s*t*2;case El:return s*t/i.components*i.byteLength;case Al:return s*t/i.components*i.byteLength;case ou:return s*t*2/i.components*i.byteLength;case Cl:return s*t*2/i.components*i.byteLength;case iu:return s*t*3/i.components*i.byteLength;case bn:return s*t*4/i.components*i.byteLength;case Rl:return s*t*4/i.components*i.byteLength;case io:case so:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case ro:case oo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Oa:case ka:return Math.max(s,16)*Math.max(t,8)/4;case za:case Ba:return Math.max(s,8)*Math.max(t,8)/2;case Ga:case Va:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Ha:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Wa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Xa:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case qa:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Ya:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Za:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case ja:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Ka:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Ja:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case $a:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Qa:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case tl:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case el:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case nl:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case il:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case ao:case sl:case rl:return Math.ceil(s/4)*Math.ceil(t/4)*16;case au:case ol:return Math.ceil(s/4)*Math.ceil(t/4)*8;case al:case ll:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Tp(s){switch(s){case Jn:case Qh:return{byteLength:1,components:1};case rr:case tu:case jn:return{byteLength:2,components:1};case Tl:case bl:return{byteLength:2,components:4};case Fi:case wl:case In:return{byteLength:4,components:1};case eu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:yl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=yl);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Iu(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function bp(s){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,f=s.createBuffer();s.bindBuffer(l,f),s.bufferData(l,c,h),a.onUploadCallback();let d;if(c instanceof Float32Array)d=s.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=s.SHORT;else if(c instanceof Uint32Array)d=s.UNSIGNED_INT;else if(c instanceof Int32Array)d=s.INT;else if(c instanceof Int8Array)d=s.BYTE;else if(c instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(s.bindBuffer(c,a),u.length===0)s.bufferSubData(c,0,h);else{u.sort((d,m)=>d.start-m.start);let f=0;for(let d=1;d<u.length;d++){const m=u[f],v=u[d];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++f,u[f]=v)}u.length=f+1;for(let d=0,m=u.length;d<m;d++){const v=u[d];s.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(s.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var Ep=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ap=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Cp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Rp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Lp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Dp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Up=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ip=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Np=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Fp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,zp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Op=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Bp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,kp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Gp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Vp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Hp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Xp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,qp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Yp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Zp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,jp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Kp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Jp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,$p=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Qp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,tm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,em=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,nm="gl_FragColor = linearToOutputTexel( gl_FragColor );",im=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,sm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,rm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,om=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,am=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,lm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,cm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,hm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,um=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,dm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,pm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,mm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,gm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,vm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,_m=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,xm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Mm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ym=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Sm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Tm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,bm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Em=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Am=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Cm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Rm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Pm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Dm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Um=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Im=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Nm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,zm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Om=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Bm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,km=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Vm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Wm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Xm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ym=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Zm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,jm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Km=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Jm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,$m=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Qm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,t0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,e0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,n0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,i0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,s0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,r0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,o0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,a0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,l0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,c0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,h0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,u0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,f0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,d0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,p0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,m0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,g0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,v0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,_0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,x0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,M0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,y0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,S0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,w0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,T0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const b0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,E0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,A0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,C0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,R0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,P0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,L0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,D0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,U0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,I0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,N0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,F0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,z0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,O0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,B0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,k0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,G0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,V0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,H0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,W0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,X0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,q0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Y0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Z0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,j0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,K0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,J0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Q0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,tg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,eg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ng=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ig=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qt={alphahash_fragment:Ep,alphahash_pars_fragment:Ap,alphamap_fragment:Cp,alphamap_pars_fragment:Rp,alphatest_fragment:Pp,alphatest_pars_fragment:Lp,aomap_fragment:Dp,aomap_pars_fragment:Up,batching_pars_vertex:Ip,batching_vertex:Np,begin_vertex:Fp,beginnormal_vertex:zp,bsdfs:Op,iridescence_fragment:Bp,bumpmap_pars_fragment:kp,clipping_planes_fragment:Gp,clipping_planes_pars_fragment:Vp,clipping_planes_pars_vertex:Hp,clipping_planes_vertex:Wp,color_fragment:Xp,color_pars_fragment:qp,color_pars_vertex:Yp,color_vertex:Zp,common:jp,cube_uv_reflection_fragment:Kp,defaultnormal_vertex:Jp,displacementmap_pars_vertex:$p,displacementmap_vertex:Qp,emissivemap_fragment:tm,emissivemap_pars_fragment:em,colorspace_fragment:nm,colorspace_pars_fragment:im,envmap_fragment:sm,envmap_common_pars_fragment:rm,envmap_pars_fragment:om,envmap_pars_vertex:am,envmap_physical_pars_fragment:_m,envmap_vertex:lm,fog_vertex:cm,fog_pars_vertex:hm,fog_fragment:um,fog_pars_fragment:fm,gradientmap_pars_fragment:dm,lightmap_pars_fragment:pm,lights_lambert_fragment:mm,lights_lambert_pars_fragment:gm,lights_pars_begin:vm,lights_toon_fragment:xm,lights_toon_pars_fragment:Mm,lights_phong_fragment:ym,lights_phong_pars_fragment:Sm,lights_physical_fragment:wm,lights_physical_pars_fragment:Tm,lights_fragment_begin:bm,lights_fragment_maps:Em,lights_fragment_end:Am,logdepthbuf_fragment:Cm,logdepthbuf_pars_fragment:Rm,logdepthbuf_pars_vertex:Pm,logdepthbuf_vertex:Lm,map_fragment:Dm,map_pars_fragment:Um,map_particle_fragment:Im,map_particle_pars_fragment:Nm,metalnessmap_fragment:Fm,metalnessmap_pars_fragment:zm,morphinstance_vertex:Om,morphcolor_vertex:Bm,morphnormal_vertex:km,morphtarget_pars_vertex:Gm,morphtarget_vertex:Vm,normal_fragment_begin:Hm,normal_fragment_maps:Wm,normal_pars_fragment:Xm,normal_pars_vertex:qm,normal_vertex:Ym,normalmap_pars_fragment:Zm,clearcoat_normal_fragment_begin:jm,clearcoat_normal_fragment_maps:Km,clearcoat_pars_fragment:Jm,iridescence_pars_fragment:$m,opaque_fragment:Qm,packing:t0,premultiplied_alpha_fragment:e0,project_vertex:n0,dithering_fragment:i0,dithering_pars_fragment:s0,roughnessmap_fragment:r0,roughnessmap_pars_fragment:o0,shadowmap_pars_fragment:a0,shadowmap_pars_vertex:l0,shadowmap_vertex:c0,shadowmask_pars_fragment:h0,skinbase_vertex:u0,skinning_pars_vertex:f0,skinning_vertex:d0,skinnormal_vertex:p0,specularmap_fragment:m0,specularmap_pars_fragment:g0,tonemapping_fragment:v0,tonemapping_pars_fragment:_0,transmission_fragment:x0,transmission_pars_fragment:M0,uv_pars_fragment:y0,uv_pars_vertex:S0,uv_vertex:w0,worldpos_vertex:T0,background_vert:b0,background_frag:E0,backgroundCube_vert:A0,backgroundCube_frag:C0,cube_vert:R0,cube_frag:P0,depth_vert:L0,depth_frag:D0,distanceRGBA_vert:U0,distanceRGBA_frag:I0,equirect_vert:N0,equirect_frag:F0,linedashed_vert:z0,linedashed_frag:O0,meshbasic_vert:B0,meshbasic_frag:k0,meshlambert_vert:G0,meshlambert_frag:V0,meshmatcap_vert:H0,meshmatcap_frag:W0,meshnormal_vert:X0,meshnormal_frag:q0,meshphong_vert:Y0,meshphong_frag:Z0,meshphysical_vert:j0,meshphysical_frag:K0,meshtoon_vert:J0,meshtoon_frag:$0,points_vert:Q0,points_frag:tg,shadow_vert:eg,shadow_frag:ng,sprite_vert:ig,sprite_frag:sg},ot={common:{diffuse:{value:new j(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Wt}},envmap:{envMap:{value:null},envMapRotation:{value:new Wt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Wt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Wt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Wt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Wt},normalScale:{value:new et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Wt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Wt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Wt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Wt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new j(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new j(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0},uvTransform:{value:new Wt}},sprite:{diffuse:{value:new j(16777215)},opacity:{value:1},center:{value:new et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}}},Dn={basic:{uniforms:qe([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.fog]),vertexShader:qt.meshbasic_vert,fragmentShader:qt.meshbasic_frag},lambert:{uniforms:qe([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new j(0)}}]),vertexShader:qt.meshlambert_vert,fragmentShader:qt.meshlambert_frag},phong:{uniforms:qe([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new j(0)},specular:{value:new j(1118481)},shininess:{value:30}}]),vertexShader:qt.meshphong_vert,fragmentShader:qt.meshphong_frag},standard:{uniforms:qe([ot.common,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.roughnessmap,ot.metalnessmap,ot.fog,ot.lights,{emissive:{value:new j(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag},toon:{uniforms:qe([ot.common,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.gradientmap,ot.fog,ot.lights,{emissive:{value:new j(0)}}]),vertexShader:qt.meshtoon_vert,fragmentShader:qt.meshtoon_frag},matcap:{uniforms:qe([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,{matcap:{value:null}}]),vertexShader:qt.meshmatcap_vert,fragmentShader:qt.meshmatcap_frag},points:{uniforms:qe([ot.points,ot.fog]),vertexShader:qt.points_vert,fragmentShader:qt.points_frag},dashed:{uniforms:qe([ot.common,ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qt.linedashed_vert,fragmentShader:qt.linedashed_frag},depth:{uniforms:qe([ot.common,ot.displacementmap]),vertexShader:qt.depth_vert,fragmentShader:qt.depth_frag},normal:{uniforms:qe([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,{opacity:{value:1}}]),vertexShader:qt.meshnormal_vert,fragmentShader:qt.meshnormal_frag},sprite:{uniforms:qe([ot.sprite,ot.fog]),vertexShader:qt.sprite_vert,fragmentShader:qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Wt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qt.background_vert,fragmentShader:qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Wt}},vertexShader:qt.backgroundCube_vert,fragmentShader:qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qt.cube_vert,fragmentShader:qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qt.equirect_vert,fragmentShader:qt.equirect_frag},distanceRGBA:{uniforms:qe([ot.common,ot.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qt.distanceRGBA_vert,fragmentShader:qt.distanceRGBA_frag},shadow:{uniforms:qe([ot.lights,ot.fog,{color:{value:new j(0)},opacity:{value:1}}]),vertexShader:qt.shadow_vert,fragmentShader:qt.shadow_frag}};Dn.physical={uniforms:qe([Dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Wt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Wt},clearcoatNormalScale:{value:new et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Wt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Wt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Wt},sheen:{value:0},sheenColor:{value:new j(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Wt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Wt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Wt},transmissionSamplerSize:{value:new et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Wt},attenuationDistance:{value:0},attenuationColor:{value:new j(0)},specularColor:{value:new j(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Wt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Wt},anisotropyVector:{value:new et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Wt}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag};const Yr={r:0,b:0,g:0},wi=new An,rg=new Bt;function og(s,t,e,n,i,r,o){const a=new j(0);let l=r===!0?0:1,c,h,u=null,f=0,d=null;function m(y){let _=y.isScene===!0?y.background:null;return _&&_.isTexture&&(_=(y.backgroundBlurriness>0?e:t).get(_)),_}function v(y){let _=!1;const b=m(y);b===null?p(a,l):b&&b.isColor&&(p(b,1),_=!0);const E=s.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(y,_){const b=m(_);b&&(b.isCubeTexture||b.mapping===_o)?(h===void 0&&(h=new kt(new As(1,1,1),new le({name:"BackgroundCubeMaterial",uniforms:Ms(Dn.backgroundCube.uniforms),vertexShader:Dn.backgroundCube.vertexShader,fragmentShader:Dn.backgroundCube.fragmentShader,side:Oe,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),wi.copy(_.backgroundRotation),wi.x*=-1,wi.y*=-1,wi.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(wi.y*=-1,wi.z*=-1),h.material.uniforms.envMap.value=b,h.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(rg.makeRotationFromEuler(wi)),h.material.toneMapped=ee.getTransfer(b.colorSpace)!==he,(u!==b||f!==b.version||d!==s.toneMapping)&&(h.material.needsUpdate=!0,u=b,f=b.version,d=s.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new kt(new Rn(2,2),new le({name:"BackgroundMaterial",uniforms:Ms(Dn.background.uniforms),vertexShader:Dn.background.vertexShader,fragmentShader:Dn.background.fragmentShader,side:fi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=ee.getTransfer(b.colorSpace)!==he,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||f!==b.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,u=b,f=b.version,d=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,_){y.getRGB(Yr,vu(s)),n.buffers.color.setClear(Yr.r,Yr.g,Yr.b,_,o)}function M(){h!==void 0&&(h.geometry.dispose(),h.material.dispose()),c!==void 0&&(c.geometry.dispose(),c.material.dispose())}return{getClearColor:function(){return a},setClearColor:function(y,_=1){a.set(y),l=_,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(a,l)},render:v,addToRenderList:g,dispose:M}}function ag(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=f(null);let r=i,o=!1;function a(x,L,F,z,G){let W=!1;const q=u(z,F,L);r!==q&&(r=q,c(r.object)),W=d(x,z,F,G),W&&m(x,z,F,G),G!==null&&t.update(G,s.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,_(x,L,F,z),G!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(G).buffer))}function l(){return s.createVertexArray()}function c(x){return s.bindVertexArray(x)}function h(x){return s.deleteVertexArray(x)}function u(x,L,F){const z=F.wireframe===!0;let G=n[x.id];G===void 0&&(G={},n[x.id]=G);let W=G[L.id];W===void 0&&(W={},G[L.id]=W);let q=W[z];return q===void 0&&(q=f(l()),W[z]=q),q}function f(x){const L=[],F=[],z=[];for(let G=0;G<e;G++)L[G]=0,F[G]=0,z[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:F,attributeDivisors:z,object:x,attributes:{},index:null}}function d(x,L,F,z){const G=r.attributes,W=L.attributes;let q=0;const K=F.getAttributes();for(const V in K)if(K[V].location>=0){const dt=G[V];let Tt=W[V];if(Tt===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(Tt=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(Tt=x.instanceColor)),dt===void 0||dt.attribute!==Tt||Tt&&dt.data!==Tt.data)return!0;q++}return r.attributesNum!==q||r.index!==z}function m(x,L,F,z){const G={},W=L.attributes;let q=0;const K=F.getAttributes();for(const V in K)if(K[V].location>=0){let dt=W[V];dt===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(dt=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(dt=x.instanceColor));const Tt={};Tt.attribute=dt,dt&&dt.data&&(Tt.data=dt.data),G[V]=Tt,q++}r.attributes=G,r.attributesNum=q,r.index=z}function v(){const x=r.newAttributes;for(let L=0,F=x.length;L<F;L++)x[L]=0}function g(x){p(x,0)}function p(x,L){const F=r.newAttributes,z=r.enabledAttributes,G=r.attributeDivisors;F[x]=1,z[x]===0&&(s.enableVertexAttribArray(x),z[x]=1),G[x]!==L&&(s.vertexAttribDivisor(x,L),G[x]=L)}function M(){const x=r.newAttributes,L=r.enabledAttributes;for(let F=0,z=L.length;F<z;F++)L[F]!==x[F]&&(s.disableVertexAttribArray(F),L[F]=0)}function y(x,L,F,z,G,W,q){q===!0?s.vertexAttribIPointer(x,L,F,G,W):s.vertexAttribPointer(x,L,F,z,G,W)}function _(x,L,F,z){v();const G=z.attributes,W=F.getAttributes(),q=L.defaultAttributeValues;for(const K in W){const V=W[K];if(V.location>=0){let st=G[K];if(st===void 0&&(K==="instanceMatrix"&&x.instanceMatrix&&(st=x.instanceMatrix),K==="instanceColor"&&x.instanceColor&&(st=x.instanceColor)),st!==void 0){const dt=st.normalized,Tt=st.itemSize,Vt=t.get(st);if(Vt===void 0)continue;const ne=Vt.buffer,Y=Vt.type,nt=Vt.bytesPerElement,gt=Y===s.INT||Y===s.UNSIGNED_INT||st.gpuType===wl;if(st.isInterleavedBufferAttribute){const rt=st.data,Ct=rt.stride,Nt=st.offset;if(rt.isInstancedInterleavedBuffer){for(let Rt=0;Rt<V.locationSize;Rt++)p(V.location+Rt,rt.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Rt=0;Rt<V.locationSize;Rt++)g(V.location+Rt);s.bindBuffer(s.ARRAY_BUFFER,ne);for(let Rt=0;Rt<V.locationSize;Rt++)y(V.location+Rt,Tt/V.locationSize,Y,dt,Ct*nt,(Nt+Tt/V.locationSize*Rt)*nt,gt)}else{if(st.isInstancedBufferAttribute){for(let rt=0;rt<V.locationSize;rt++)p(V.location+rt,st.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let rt=0;rt<V.locationSize;rt++)g(V.location+rt);s.bindBuffer(s.ARRAY_BUFFER,ne);for(let rt=0;rt<V.locationSize;rt++)y(V.location+rt,Tt/V.locationSize,Y,dt,Tt*nt,Tt/V.locationSize*rt*nt,gt)}}else if(q!==void 0){const dt=q[K];if(dt!==void 0)switch(dt.length){case 2:s.vertexAttrib2fv(V.location,dt);break;case 3:s.vertexAttrib3fv(V.location,dt);break;case 4:s.vertexAttrib4fv(V.location,dt);break;default:s.vertexAttrib1fv(V.location,dt)}}}}M()}function b(){R();for(const x in n){const L=n[x];for(const F in L){const z=L[F];for(const G in z)h(z[G].object),delete z[G];delete L[F]}delete n[x]}}function E(x){if(n[x.id]===void 0)return;const L=n[x.id];for(const F in L){const z=L[F];for(const G in z)h(z[G].object),delete z[G];delete L[F]}delete n[x.id]}function A(x){for(const L in n){const F=n[L];if(F[x.id]===void 0)continue;const z=F[x.id];for(const G in z)h(z[G].object),delete z[G];delete F[x.id]}}function R(){S(),o=!0,r!==i&&(r=i,c(r.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:R,resetDefaultState:S,dispose:b,releaseStatesOfGeometry:E,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:g,disableUnusedAttributes:M}}function lg(s,t,e){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let d=0;for(let m=0;m<u;m++)d+=h[m];e.update(d,n,1)}function l(c,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let m=0;m<c.length;m++)o(c[m],h[m],f[m]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let m=0;for(let v=0;v<u;v++)m+=h[v]*f[v];e.update(m,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function cg(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(A){return!(A!==bn&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const R=A===jn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Jn&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==In&&!R)}function l(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),M=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),y=s.getParameter(s.MAX_VARYING_VECTORS),_=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),b=m>0,E=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:M,maxVaryings:y,maxFragmentUniforms:_,vertexTextures:b,maxSamples:E}}function hg(s){const t=this;let e=null,n=0,i=!1,r=!1;const o=new Ci,a=new Wt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||i;return i=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const m=u.clippingPlanes,v=u.clipIntersection,g=u.clipShadows,p=s.get(u);if(!i||m===null||m.length===0||r&&!g)r?h(null):c();else{const M=r?0:n,y=M*4;let _=p.clippingState||null;l.value=_,_=h(m,f,y,d);for(let b=0;b!==y;++b)_[b]=e[b];p.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,m){const v=u!==null?u.length:0;let g=null;if(v!==0){if(g=l.value,m!==!0||g===null){const p=d+v*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(g===null||g.length<p)&&(g=new Float32Array(p));for(let y=0,_=d;y!==v;++y,_+=4)o.copy(u[y]).applyMatrix4(M,a),o.normal.toArray(g,_),g[_+3]=o.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}function ug(s){let t=new WeakMap;function e(o,a){return a===Ua?o.mapping=ms:a===Ia&&(o.mapping=gs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ua||a===Ia)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Pd(l.height);return c.fromEquirectangularTexture(s,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const us=4,Wc=[.125,.215,.35,.446,.526,.582],Di=20,ta=new Gl,Xc=new j;let ea=null,na=0,ia=0,sa=!1;const Ri=(1+Math.sqrt(5))/2,rs=1/Ri,qc=[new C(-Ri,rs,0),new C(Ri,rs,0),new C(-rs,0,Ri),new C(rs,0,Ri),new C(0,Ri,-rs),new C(0,Ri,rs),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)];class Yc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){ea=this._renderer.getRenderTarget(),na=this._renderer.getActiveCubeFace(),ia=this._renderer.getActiveMipmapLevel(),sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Kc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ea,na,ia),this._renderer.xr.enabled=sa,t.scissorTest=!1,Zr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ms||t.mapping===gs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ea=this._renderer.getRenderTarget(),na=this._renderer.getActiveCubeFace(),ia=this._renderer.getActiveMipmapLevel(),sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Un,minFilter:Un,generateMipmaps:!1,type:jn,format:bn,colorSpace:xs,depthBuffer:!1},i=Zc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=fg(r)),this._blurMaterial=dg(r,t,e)}return i}_compileMaterial(t){const e=new kt(this._lodPlanes[0],t);this._renderer.compile(e,ta)}_sceneToCubeUV(t,e,n,i){const a=new nn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Xc),h.toneMapping=ui,h.autoClear=!1;const d=new di({name:"PMREM.Background",side:Oe,depthWrite:!1,depthTest:!1}),m=new kt(new As,d);let v=!1;const g=t.background;g?g.isColor&&(d.color.copy(g),t.background=null,v=!0):(d.color.copy(Xc),v=!0);for(let p=0;p<6;p++){const M=p%3;M===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):M===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const y=this._cubeSize;Zr(i,M*y,p>2?y:0,y,y),h.setRenderTarget(i),v&&h.render(m,a),h.render(t,a)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===ms||t.mapping===gs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Kc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jc());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new kt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Zr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,ta)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=qc[(i-r-1)%qc.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new kt(this._lodPlanes[i],c),f=c.uniforms,d=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Di-1),v=r/m,g=isFinite(r)?1+Math.floor(h*v):Di;g>Di&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Di}`);const p=[];let M=0;for(let A=0;A<Di;++A){const R=A/v,S=Math.exp(-R*R/2);p.push(S),A===0?M+=S:A<g&&(M+=2*S)}for(let A=0;A<p.length;A++)p[A]=p[A]/M;f.envMap.value=t.texture,f.samples.value=g,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:y}=this;f.dTheta.value=m,f.mipInt.value=y-n;const _=this._sizeLods[i],b=3*_*(i>y-us?i-y+us:0),E=4*(this._cubeSize-_);Zr(e,b,E,3*_,2*_),l.setRenderTarget(e),l.render(u,ta)}}function fg(s){const t=[],e=[],n=[];let i=s;const r=s-us+1+Wc.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>s-us?l=Wc[o-s+us-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,m=6,v=3,g=2,p=1,M=new Float32Array(v*m*d),y=new Float32Array(g*m*d),_=new Float32Array(p*m*d);for(let E=0;E<d;E++){const A=E%3*2/3-1,R=E>2?0:-1,S=[A,R,0,A+2/3,R,0,A+2/3,R+1,0,A,R,0,A+2/3,R+1,0,A,R+1,0];M.set(S,v*m*E),y.set(f,g*m*E);const x=[E,E,E,E,E,E];_.set(x,p*m*E)}const b=new pe;b.setAttribute("position",new Gt(M,v)),b.setAttribute("uv",new Gt(y,g)),b.setAttribute("faceIndex",new Gt(_,p)),t.push(b),i>us&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Zc(s,t,e){const n=new En(s,t,e);return n.texture.mapping=_o,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Zr(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function dg(s,t,e){const n=new Float32Array(Di),i=new C(0,1,0);return new le({name:"SphericalGaussianBlur",defines:{n:Di,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Vl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function jc(){return new le({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Vl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Kc(){return new le({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Vl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Vl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function pg(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ua||l===Ia,h=l===ms||l===gs;if(c||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Yc(s)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return c&&d&&d.height>0||h&&d&&i(d)?(e===null&&(e=new Yc(s)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function mg(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&ls("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function gg(s,t,e,n){const i={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const m in f.attributes)t.remove(f.attributes[m]);f.removeEventListener("dispose",o),delete i[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const d in f)t.update(f[d],s.ARRAY_BUFFER)}function c(u){const f=[],d=u.index,m=u.attributes.position;let v=0;if(d!==null){const M=d.array;v=d.version;for(let y=0,_=M.length;y<_;y+=3){const b=M[y+0],E=M[y+1],A=M[y+2];f.push(b,E,E,A,A,b)}}else if(m!==void 0){const M=m.array;v=m.version;for(let y=0,_=M.length/3-1;y<_;y+=3){const b=y+0,E=y+1,A=y+2;f.push(b,E,E,A,A,b)}}else return;const g=new(hu(f)?gu:mu)(f,1);g.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,g)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function vg(s,t,e){let n;function i(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,d){s.drawElements(n,d,r,f*o),e.update(d,n,1)}function c(f,d,m){m!==0&&(s.drawElementsInstanced(n,d,r,f*o,m),e.update(d,n,m))}function h(f,d,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,m);let g=0;for(let p=0;p<m;p++)g+=d[p];e.update(g,n,1)}function u(f,d,m,v){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<f.length;p++)c(f[p]/o,d[p],v[p]);else{g.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,v,0,m);let p=0;for(let M=0;M<m;M++)p+=d[M]*v[M];e.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function _g(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function xg(s,t,e){const n=new WeakMap,i=new de;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let x=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",x)};var d=x;f!==void 0&&f.texture.dispose();const m=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let _=0;m===!0&&(_=1),v===!0&&(_=2),g===!0&&(_=3);let b=a.attributes.position.count*_,E=1;b>t.maxTextureSize&&(E=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);const A=new Float32Array(b*E*4*u),R=new fu(A,b,E,u);R.type=In,R.needsUpdate=!0;const S=_*4;for(let L=0;L<u;L++){const F=p[L],z=M[L],G=y[L],W=b*E*4*L;for(let q=0;q<F.count;q++){const K=q*S;m===!0&&(i.fromBufferAttribute(F,q),A[W+K+0]=i.x,A[W+K+1]=i.y,A[W+K+2]=i.z,A[W+K+3]=0),v===!0&&(i.fromBufferAttribute(z,q),A[W+K+4]=i.x,A[W+K+5]=i.y,A[W+K+6]=i.z,A[W+K+7]=0),g===!0&&(i.fromBufferAttribute(G,q),A[W+K+8]=i.x,A[W+K+9]=i.y,A[W+K+10]=i.z,A[W+K+11]=G.itemSize===4?i.w:1)}}f={count:u,texture:R,size:new et(b,E)},n.set(a,f),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const v=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(s,"morphTargetBaseInfluence",v),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:r}}function Mg(s,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}const Nu=new He,Jc=new wu(1,1),Fu=new fu,zu=new md,Ou=new xu,$c=[],Qc=[],th=new Float32Array(16),eh=new Float32Array(9),nh=new Float32Array(4);function Rs(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=$c[i];if(r===void 0&&(r=new Float32Array(i),$c[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function De(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Ue(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function So(s,t){let e=Qc[t];e===void 0&&(e=new Int32Array(t),Qc[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function yg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Sg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;s.uniform2fv(this.addr,t),Ue(e,t)}}function wg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(De(e,t))return;s.uniform3fv(this.addr,t),Ue(e,t)}}function Tg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;s.uniform4fv(this.addr,t),Ue(e,t)}}function bg(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(De(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Ue(e,t)}else{if(De(e,n))return;nh.set(n),s.uniformMatrix2fv(this.addr,!1,nh),Ue(e,n)}}function Eg(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(De(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Ue(e,t)}else{if(De(e,n))return;eh.set(n),s.uniformMatrix3fv(this.addr,!1,eh),Ue(e,n)}}function Ag(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(De(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Ue(e,t)}else{if(De(e,n))return;th.set(n),s.uniformMatrix4fv(this.addr,!1,th),Ue(e,n)}}function Cg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Rg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;s.uniform2iv(this.addr,t),Ue(e,t)}}function Pg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(De(e,t))return;s.uniform3iv(this.addr,t),Ue(e,t)}}function Lg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;s.uniform4iv(this.addr,t),Ue(e,t)}}function Dg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Ug(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;s.uniform2uiv(this.addr,t),Ue(e,t)}}function Ig(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(De(e,t))return;s.uniform3uiv(this.addr,t),Ue(e,t)}}function Ng(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;s.uniform4uiv(this.addr,t),Ue(e,t)}}function Fg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Jc.compareFunction=cu,r=Jc):r=Nu,e.setTexture2D(t||r,i)}function zg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||zu,i)}function Og(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Ou,i)}function Bg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Fu,i)}function kg(s){switch(s){case 5126:return yg;case 35664:return Sg;case 35665:return wg;case 35666:return Tg;case 35674:return bg;case 35675:return Eg;case 35676:return Ag;case 5124:case 35670:return Cg;case 35667:case 35671:return Rg;case 35668:case 35672:return Pg;case 35669:case 35673:return Lg;case 5125:return Dg;case 36294:return Ug;case 36295:return Ig;case 36296:return Ng;case 35678:case 36198:case 36298:case 36306:case 35682:return Fg;case 35679:case 36299:case 36307:return zg;case 35680:case 36300:case 36308:case 36293:return Og;case 36289:case 36303:case 36311:case 36292:return Bg}}function Gg(s,t){s.uniform1fv(this.addr,t)}function Vg(s,t){const e=Rs(t,this.size,2);s.uniform2fv(this.addr,e)}function Hg(s,t){const e=Rs(t,this.size,3);s.uniform3fv(this.addr,e)}function Wg(s,t){const e=Rs(t,this.size,4);s.uniform4fv(this.addr,e)}function Xg(s,t){const e=Rs(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function qg(s,t){const e=Rs(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Yg(s,t){const e=Rs(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Zg(s,t){s.uniform1iv(this.addr,t)}function jg(s,t){s.uniform2iv(this.addr,t)}function Kg(s,t){s.uniform3iv(this.addr,t)}function Jg(s,t){s.uniform4iv(this.addr,t)}function $g(s,t){s.uniform1uiv(this.addr,t)}function Qg(s,t){s.uniform2uiv(this.addr,t)}function tv(s,t){s.uniform3uiv(this.addr,t)}function ev(s,t){s.uniform4uiv(this.addr,t)}function nv(s,t,e){const n=this.cache,i=t.length,r=So(e,i);De(n,r)||(s.uniform1iv(this.addr,r),Ue(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||Nu,r[o])}function iv(s,t,e){const n=this.cache,i=t.length,r=So(e,i);De(n,r)||(s.uniform1iv(this.addr,r),Ue(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||zu,r[o])}function sv(s,t,e){const n=this.cache,i=t.length,r=So(e,i);De(n,r)||(s.uniform1iv(this.addr,r),Ue(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||Ou,r[o])}function rv(s,t,e){const n=this.cache,i=t.length,r=So(e,i);De(n,r)||(s.uniform1iv(this.addr,r),Ue(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||Fu,r[o])}function ov(s){switch(s){case 5126:return Gg;case 35664:return Vg;case 35665:return Hg;case 35666:return Wg;case 35674:return Xg;case 35675:return qg;case 35676:return Yg;case 5124:case 35670:return Zg;case 35667:case 35671:return jg;case 35668:case 35672:return Kg;case 35669:case 35673:return Jg;case 5125:return $g;case 36294:return Qg;case 36295:return tv;case 36296:return ev;case 35678:case 36198:case 36298:case 36306:case 35682:return nv;case 35679:case 36299:case 36307:return iv;case 35680:case 36300:case 36308:case 36293:return sv;case 36289:case 36303:case 36311:case 36292:return rv}}class av{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=kg(e.type)}}class lv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=ov(e.type)}}class cv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(t,e[a.id],n)}}}const ra=/(\w+)(\])?(\[|\.)?/g;function ih(s,t){s.seq.push(t),s.map[t.id]=t}function hv(s,t,e){const n=s.name,i=n.length;for(ra.lastIndex=0;;){const r=ra.exec(n),o=ra.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){ih(e,c===void 0?new av(a,s,t):new lv(a,s,t));break}else{let u=e.map[a];u===void 0&&(u=new cv(a),ih(e,u)),e=u}}}class lo{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);hv(r,o,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function sh(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const uv=37297;let fv=0;function dv(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const rh=new Wt;function pv(s){ee._getMatrix(rh,ee.workingColorSpace,s);const t=`mat3( ${rh.elements.map(e=>e.toFixed(4))} )`;switch(ee.getTransfer(s)){case co:return[t,"LinearTransferOETF"];case he:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function oh(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+dv(s.getShaderSource(t),o)}else return i}function mv(s,t){const e=pv(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function gv(s,t){let e;switch(t){case Yh:e="Linear";break;case Zh:e="Reinhard";break;case jh:e="Cineon";break;case Sl:e="ACESFilmic";break;case Kh:e="AgX";break;case Jh:e="Neutral";break;case Df:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const jr=new C;function vv(){ee.getLuminanceCoefficients(jr);const s=jr.x.toFixed(4),t=jr.y.toFixed(4),e=jr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function _v(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(js).join(`
`)}function xv(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Mv(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function js(s){return s!==""}function ah(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function lh(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const yv=/^[ \t]*#include +<([\w\d./]+)>/gm;function pl(s){return s.replace(yv,wv)}const Sv=new Map;function wv(s,t){let e=qt[t];if(e===void 0){const n=Sv.get(t);if(n!==void 0)e=qt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return pl(e)}const Tv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ch(s){return s.replace(Tv,bv)}function bv(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function hh(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Ev(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Wh?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Xh?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Wn&&(t="SHADOWMAP_TYPE_VSM"),t}function Av(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case ms:case gs:t="ENVMAP_TYPE_CUBE";break;case _o:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Cv(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case gs:t="ENVMAP_MODE_REFRACTION";break}return t}function Rv(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case qh:t="ENVMAP_BLENDING_MULTIPLY";break;case Pf:t="ENVMAP_BLENDING_MIX";break;case Lf:t="ENVMAP_BLENDING_ADD";break}return t}function Pv(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Lv(s,t,e,n){const i=s.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Ev(e),c=Av(e),h=Cv(e),u=Rv(e),f=Pv(e),d=_v(e),m=xv(r),v=i.createProgram();let g,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(js).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(js).join(`
`),p.length>0&&(p+=`
`)):(g=[hh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(js).join(`
`),p=[hh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ui?"#define TONE_MAPPING":"",e.toneMapping!==ui?qt.tonemapping_pars_fragment:"",e.toneMapping!==ui?gv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",qt.colorspace_pars_fragment,mv("linearToOutputTexel",e.outputColorSpace),vv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(js).join(`
`)),o=pl(o),o=ah(o,e),o=lh(o,e),a=pl(a),a=ah(a,e),a=lh(a,e),o=ch(o),a=ch(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===sc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===sc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=M+g+o,_=M+p+a,b=sh(i,i.VERTEX_SHADER,y),E=sh(i,i.FRAGMENT_SHADER,_);i.attachShader(v,b),i.attachShader(v,E),e.index0AttributeName!==void 0?i.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function A(L){if(s.debug.checkShaderErrors){const F=i.getProgramInfoLog(v).trim(),z=i.getShaderInfoLog(b).trim(),G=i.getShaderInfoLog(E).trim();let W=!0,q=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(W=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,v,b,E);else{const K=oh(i,b,"vertex"),V=oh(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+F+`
`+K+`
`+V)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(z===""||G==="")&&(q=!1);q&&(L.diagnostics={runnable:W,programLog:F,vertexShader:{log:z,prefix:g},fragmentShader:{log:G,prefix:p}})}i.deleteShader(b),i.deleteShader(E),R=new lo(i,v),S=Mv(i,v)}let R;this.getUniforms=function(){return R===void 0&&A(this),R};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=i.getProgramParameter(v,uv)),x},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=fv++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=b,this.fragmentShader=E,this}let Dv=0;class Uv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Iv(t),e.set(t,n)),n}}class Iv{constructor(t){this.id=Dv++,this.code=t,this.usedTimes=0}}function Nv(s,t,e,n,i,r,o){const a=new du,l=new Uv,c=new Set,h=[],u=i.logarithmicDepthBuffer,f=i.vertexTextures;let d=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return c.add(S),S===0?"uv":`uv${S}`}function g(S,x,L,F,z){const G=F.fog,W=z.geometry,q=S.isMeshStandardMaterial?F.environment:null,K=(S.isMeshStandardMaterial?e:t).get(S.envMap||q),V=K&&K.mapping===_o?K.image.height:null,st=m[S.type];S.precision!==null&&(d=i.getMaxPrecision(S.precision),d!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));const dt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Tt=dt!==void 0?dt.length:0;let Vt=0;W.morphAttributes.position!==void 0&&(Vt=1),W.morphAttributes.normal!==void 0&&(Vt=2),W.morphAttributes.color!==void 0&&(Vt=3);let ne,Y,nt,gt;if(st){const ce=Dn[st];ne=ce.vertexShader,Y=ce.fragmentShader}else ne=S.vertexShader,Y=S.fragmentShader,l.update(S),nt=l.getVertexShaderID(S),gt=l.getFragmentShaderID(S);const rt=s.getRenderTarget(),Ct=s.state.buffers.depth.getReversed(),Nt=z.isInstancedMesh===!0,Rt=z.isBatchedMesh===!0,xe=!!S.map,$t=!!S.matcap,Ee=!!K,D=!!S.aoMap,an=!!S.lightMap,jt=!!S.bumpMap,Kt=!!S.normalMap,Pt=!!S.displacementMap,ve=!!S.emissiveMap,Lt=!!S.metalnessMap,P=!!S.roughnessMap,w=S.anisotropy>0,O=S.clearcoat>0,J=S.dispersion>0,Q=S.iridescence>0,Z=S.sheen>0,Et=S.transmission>0,ht=w&&!!S.anisotropyMap,mt=O&&!!S.clearcoatMap,Qt=O&&!!S.clearcoatNormalMap,it=O&&!!S.clearcoatRoughnessMap,vt=Q&&!!S.iridescenceMap,It=Q&&!!S.iridescenceThicknessMap,Ft=Z&&!!S.sheenColorMap,_t=Z&&!!S.sheenRoughnessMap,Jt=!!S.specularMap,Xt=!!S.specularColorMap,me=!!S.specularIntensityMap,U=Et&&!!S.transmissionMap,lt=Et&&!!S.thicknessMap,H=!!S.gradientMap,$=!!S.alphaMap,ft=S.alphaTest>0,ut=!!S.alphaHash,Ht=!!S.extensions;let Se=ui;S.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(Se=s.toneMapping);const Be={shaderID:st,shaderType:S.type,shaderName:S.name,vertexShader:ne,fragmentShader:Y,defines:S.defines,customVertexShaderID:nt,customFragmentShaderID:gt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:Rt,batchingColor:Rt&&z._colorsTexture!==null,instancing:Nt,instancingColor:Nt&&z.instanceColor!==null,instancingMorph:Nt&&z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:rt===null?s.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:xs,alphaToCoverage:!!S.alphaToCoverage,map:xe,matcap:$t,envMap:Ee,envMapMode:Ee&&K.mapping,envMapCubeUVHeight:V,aoMap:D,lightMap:an,bumpMap:jt,normalMap:Kt,displacementMap:f&&Pt,emissiveMap:ve,normalMapObjectSpace:Kt&&S.normalMapType===Ff,normalMapTangentSpace:Kt&&S.normalMapType===lu,metalnessMap:Lt,roughnessMap:P,anisotropy:w,anisotropyMap:ht,clearcoat:O,clearcoatMap:mt,clearcoatNormalMap:Qt,clearcoatRoughnessMap:it,dispersion:J,iridescence:Q,iridescenceMap:vt,iridescenceThicknessMap:It,sheen:Z,sheenColorMap:Ft,sheenRoughnessMap:_t,specularMap:Jt,specularColorMap:Xt,specularIntensityMap:me,transmission:Et,transmissionMap:U,thicknessMap:lt,gradientMap:H,opaque:S.transparent===!1&&S.blending===Ni&&S.alphaToCoverage===!1,alphaMap:$,alphaTest:ft,alphaHash:ut,combine:S.combine,mapUv:xe&&v(S.map.channel),aoMapUv:D&&v(S.aoMap.channel),lightMapUv:an&&v(S.lightMap.channel),bumpMapUv:jt&&v(S.bumpMap.channel),normalMapUv:Kt&&v(S.normalMap.channel),displacementMapUv:Pt&&v(S.displacementMap.channel),emissiveMapUv:ve&&v(S.emissiveMap.channel),metalnessMapUv:Lt&&v(S.metalnessMap.channel),roughnessMapUv:P&&v(S.roughnessMap.channel),anisotropyMapUv:ht&&v(S.anisotropyMap.channel),clearcoatMapUv:mt&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:Qt&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:it&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:vt&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:It&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ft&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:_t&&v(S.sheenRoughnessMap.channel),specularMapUv:Jt&&v(S.specularMap.channel),specularColorMapUv:Xt&&v(S.specularColorMap.channel),specularIntensityMapUv:me&&v(S.specularIntensityMap.channel),transmissionMapUv:U&&v(S.transmissionMap.channel),thicknessMapUv:lt&&v(S.thicknessMap.channel),alphaMapUv:$&&v(S.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(Kt||w),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!W.attributes.uv&&(xe||$),fog:!!G,useFog:S.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ct,skinning:z.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:Tt,morphTextureStride:Vt,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&L.length>0,shadowMapType:s.shadowMap.type,toneMapping:Se,decodeVideoTexture:xe&&S.map.isVideoTexture===!0&&ee.getTransfer(S.map.colorSpace)===he,decodeVideoTextureEmissive:ve&&S.emissiveMap.isVideoTexture===!0&&ee.getTransfer(S.emissiveMap.colorSpace)===he,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Fe,flipSided:S.side===Oe,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Ht&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ht&&S.extensions.multiDraw===!0||Rt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Be.vertexUv1s=c.has(1),Be.vertexUv2s=c.has(2),Be.vertexUv3s=c.has(3),c.clear(),Be}function p(S){const x=[];if(S.shaderID?x.push(S.shaderID):(x.push(S.customVertexShaderID),x.push(S.customFragmentShaderID)),S.defines!==void 0)for(const L in S.defines)x.push(L),x.push(S.defines[L]);return S.isRawShaderMaterial===!1&&(M(x,S),y(x,S),x.push(s.outputColorSpace)),x.push(S.customProgramCacheKey),x.join()}function M(S,x){S.push(x.precision),S.push(x.outputColorSpace),S.push(x.envMapMode),S.push(x.envMapCubeUVHeight),S.push(x.mapUv),S.push(x.alphaMapUv),S.push(x.lightMapUv),S.push(x.aoMapUv),S.push(x.bumpMapUv),S.push(x.normalMapUv),S.push(x.displacementMapUv),S.push(x.emissiveMapUv),S.push(x.metalnessMapUv),S.push(x.roughnessMapUv),S.push(x.anisotropyMapUv),S.push(x.clearcoatMapUv),S.push(x.clearcoatNormalMapUv),S.push(x.clearcoatRoughnessMapUv),S.push(x.iridescenceMapUv),S.push(x.iridescenceThicknessMapUv),S.push(x.sheenColorMapUv),S.push(x.sheenRoughnessMapUv),S.push(x.specularMapUv),S.push(x.specularColorMapUv),S.push(x.specularIntensityMapUv),S.push(x.transmissionMapUv),S.push(x.thicknessMapUv),S.push(x.combine),S.push(x.fogExp2),S.push(x.sizeAttenuation),S.push(x.morphTargetsCount),S.push(x.morphAttributeCount),S.push(x.numDirLights),S.push(x.numPointLights),S.push(x.numSpotLights),S.push(x.numSpotLightMaps),S.push(x.numHemiLights),S.push(x.numRectAreaLights),S.push(x.numDirLightShadows),S.push(x.numPointLightShadows),S.push(x.numSpotLightShadows),S.push(x.numSpotLightShadowsWithMaps),S.push(x.numLightProbes),S.push(x.shadowMapType),S.push(x.toneMapping),S.push(x.numClippingPlanes),S.push(x.numClipIntersection),S.push(x.depthPacking)}function y(S,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reverseDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),S.push(a.mask)}function _(S){const x=m[S.type];let L;if(x){const F=Dn[x];L=ys.clone(F.uniforms)}else L=S.uniforms;return L}function b(S,x){let L;for(let F=0,z=h.length;F<z;F++){const G=h[F];if(G.cacheKey===x){L=G,++L.usedTimes;break}}return L===void 0&&(L=new Lv(s,x,S,r),h.push(L)),L}function E(S){if(--S.usedTimes===0){const x=h.indexOf(S);h[x]=h[h.length-1],h.pop(),S.destroy()}}function A(S){l.remove(S)}function R(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:_,acquireProgram:b,releaseProgram:E,releaseShaderCache:A,programs:h,dispose:R}}function Fv(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function zv(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function uh(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function fh(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(u,f,d,m,v,g){let p=s[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:m,renderOrder:u.renderOrder,z:v,group:g},s[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=v,p.group=g),t++,p}function a(u,f,d,m,v,g){const p=o(u,f,d,m,v,g);d.transmission>0?n.push(p):d.transparent===!0?i.push(p):e.push(p)}function l(u,f,d,m,v,g){const p=o(u,f,d,m,v,g);d.transmission>0?n.unshift(p):d.transparent===!0?i.unshift(p):e.unshift(p)}function c(u,f){e.length>1&&e.sort(u||zv),n.length>1&&n.sort(f||uh),i.length>1&&i.sort(f||uh)}function h(){for(let u=t,f=s.length;u<f;u++){const d=s[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function Ov(){let s=new WeakMap;function t(n,i){const r=s.get(n);let o;return r===void 0?(o=new fh,s.set(n,[o])):i>=r.length?(o=new fh,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function Bv(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new C,color:new j};break;case"SpotLight":e={position:new C,direction:new C,color:new j,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new C,color:new j,distance:0,decay:0};break;case"HemisphereLight":e={direction:new C,skyColor:new j,groundColor:new j};break;case"RectAreaLight":e={color:new j,position:new C,halfWidth:new C,halfHeight:new C};break}return s[t.id]=e,e}}}function kv(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let Gv=0;function Vv(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Hv(s){const t=new Bv,e=kv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);const i=new C,r=new Bt,o=new Bt;function a(c){let h=0,u=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let d=0,m=0,v=0,g=0,p=0,M=0,y=0,_=0,b=0,E=0,A=0;c.sort(Vv);for(let S=0,x=c.length;S<x;S++){const L=c[S],F=L.color,z=L.intensity,G=L.distance,W=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=F.r*z,u+=F.g*z,f+=F.b*z;else if(L.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(L.sh.coefficients[q],z);A++}else if(L.isDirectionalLight){const q=t.get(L);if(q.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const K=L.shadow,V=e.get(L);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,n.directionalShadow[d]=V,n.directionalShadowMap[d]=W,n.directionalShadowMatrix[d]=L.shadow.matrix,M++}n.directional[d]=q,d++}else if(L.isSpotLight){const q=t.get(L);q.position.setFromMatrixPosition(L.matrixWorld),q.color.copy(F).multiplyScalar(z),q.distance=G,q.coneCos=Math.cos(L.angle),q.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),q.decay=L.decay,n.spot[v]=q;const K=L.shadow;if(L.map&&(n.spotLightMap[b]=L.map,b++,K.updateMatrices(L),L.castShadow&&E++),n.spotLightMatrix[v]=K.matrix,L.castShadow){const V=e.get(L);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,n.spotShadow[v]=V,n.spotShadowMap[v]=W,_++}v++}else if(L.isRectAreaLight){const q=t.get(L);q.color.copy(F).multiplyScalar(z),q.halfWidth.set(L.width*.5,0,0),q.halfHeight.set(0,L.height*.5,0),n.rectArea[g]=q,g++}else if(L.isPointLight){const q=t.get(L);if(q.color.copy(L.color).multiplyScalar(L.intensity),q.distance=L.distance,q.decay=L.decay,L.castShadow){const K=L.shadow,V=e.get(L);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,V.shadowCameraNear=K.camera.near,V.shadowCameraFar=K.camera.far,n.pointShadow[m]=V,n.pointShadowMap[m]=W,n.pointShadowMatrix[m]=L.shadow.matrix,y++}n.point[m]=q,m++}else if(L.isHemisphereLight){const q=t.get(L);q.skyColor.copy(L.color).multiplyScalar(z),q.groundColor.copy(L.groundColor).multiplyScalar(z),n.hemi[p]=q,p++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ot.LTC_FLOAT_1,n.rectAreaLTC2=ot.LTC_FLOAT_2):(n.rectAreaLTC1=ot.LTC_HALF_1,n.rectAreaLTC2=ot.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const R=n.hash;(R.directionalLength!==d||R.pointLength!==m||R.spotLength!==v||R.rectAreaLength!==g||R.hemiLength!==p||R.numDirectionalShadows!==M||R.numPointShadows!==y||R.numSpotShadows!==_||R.numSpotMaps!==b||R.numLightProbes!==A)&&(n.directional.length=d,n.spot.length=v,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=_+b-E,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=A,R.directionalLength=d,R.pointLength=m,R.spotLength=v,R.rectAreaLength=g,R.hemiLength=p,R.numDirectionalShadows=M,R.numPointShadows=y,R.numSpotShadows=_,R.numSpotMaps=b,R.numLightProbes=A,n.version=Gv++)}function l(c,h){let u=0,f=0,d=0,m=0,v=0;const g=h.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){const y=c[p];if(y.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(g),u++}else if(y.isSpotLight){const _=n.spot[d];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(g),d++}else if(y.isRectAreaLight){const _=n.rectArea[m];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(g),o.identity(),r.copy(y.matrixWorld),r.premultiply(g),o.extractRotation(r),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),m++}else if(y.isPointLight){const _=n.point[f];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(g),f++}else if(y.isHemisphereLight){const _=n.hemi[v];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(g),v++}}}return{setup:a,setupView:l,state:n}}function dh(s){const t=new Hv(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Wv(s){let t=new WeakMap;function e(i,r=0){const o=t.get(i);let a;return o===void 0?(a=new dh(s),t.set(i,[a])):r>=o.length?(a=new dh(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const Xv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,qv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Yv(s,t,e){let n=new Il;const i=new et,r=new et,o=new de,a=new _p({depthPacking:Nf}),l=new xp,c={},h=e.maxTextureSize,u={[fi]:Oe,[Oe]:fi,[Fe]:Fe},f=new le({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new et},radius:{value:4}},vertexShader:Xv,fragmentShader:qv}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const m=new pe;m.setAttribute("position",new Gt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new kt(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wh;let p=this.type;this.render=function(E,A,R){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;const S=s.getRenderTarget(),x=s.getActiveCubeFace(),L=s.getActiveMipmapLevel(),F=s.state;F.setBlending(Zn),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const z=p!==Wn&&this.type===Wn,G=p===Wn&&this.type!==Wn;for(let W=0,q=E.length;W<q;W++){const K=E[W],V=K.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;i.copy(V.mapSize);const st=V.getFrameExtents();if(i.multiply(st),r.copy(V.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/st.x),i.x=r.x*st.x,V.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/st.y),i.y=r.y*st.y,V.mapSize.y=r.y)),V.map===null||z===!0||G===!0){const Tt=this.type!==Wn?{minFilter:rn,magFilter:rn}:{};V.map!==null&&V.map.dispose(),V.map=new En(i.x,i.y,Tt),V.map.texture.name=K.name+".shadowMap",V.camera.updateProjectionMatrix()}s.setRenderTarget(V.map),s.clear();const dt=V.getViewportCount();for(let Tt=0;Tt<dt;Tt++){const Vt=V.getViewport(Tt);o.set(r.x*Vt.x,r.y*Vt.y,r.x*Vt.z,r.y*Vt.w),F.viewport(o),V.updateMatrices(K,Tt),n=V.getFrustum(),_(A,R,V.camera,K,this.type)}V.isPointLightShadow!==!0&&this.type===Wn&&M(V,R),V.needsUpdate=!1}p=this.type,g.needsUpdate=!1,s.setRenderTarget(S,x,L)};function M(E,A){const R=t.update(v);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new En(i.x,i.y)),f.uniforms.shadow_pass.value=E.map.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,s.setRenderTarget(E.mapPass),s.clear(),s.renderBufferDirect(A,null,R,f,v,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,s.setRenderTarget(E.map),s.clear(),s.renderBufferDirect(A,null,R,d,v,null)}function y(E,A,R,S){let x=null;const L=R.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(L!==void 0)x=L;else if(x=R.isPointLight===!0?l:a,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const F=x.uuid,z=A.uuid;let G=c[F];G===void 0&&(G={},c[F]=G);let W=G[z];W===void 0&&(W=x.clone(),G[z]=W,A.addEventListener("dispose",b)),x=W}if(x.visible=A.visible,x.wireframe=A.wireframe,S===Wn?x.side=A.shadowSide!==null?A.shadowSide:A.side:x.side=A.shadowSide!==null?A.shadowSide:u[A.side],x.alphaMap=A.alphaMap,x.alphaTest=A.alphaTest,x.map=A.map,x.clipShadows=A.clipShadows,x.clippingPlanes=A.clippingPlanes,x.clipIntersection=A.clipIntersection,x.displacementMap=A.displacementMap,x.displacementScale=A.displacementScale,x.displacementBias=A.displacementBias,x.wireframeLinewidth=A.wireframeLinewidth,x.linewidth=A.linewidth,R.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const F=s.properties.get(x);F.light=R}return x}function _(E,A,R,S,x){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&x===Wn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,E.matrixWorld);const z=t.update(E),G=E.material;if(Array.isArray(G)){const W=z.groups;for(let q=0,K=W.length;q<K;q++){const V=W[q],st=G[V.materialIndex];if(st&&st.visible){const dt=y(E,st,S,x);E.onBeforeShadow(s,E,A,R,z,dt,V),s.renderBufferDirect(R,null,z,dt,E,V),E.onAfterShadow(s,E,A,R,z,dt,V)}}}else if(G.visible){const W=y(E,G,S,x);E.onBeforeShadow(s,E,A,R,z,W,null),s.renderBufferDirect(R,null,z,W,E,null),E.onAfterShadow(s,E,A,R,z,W,null)}}const F=E.children;for(let z=0,G=F.length;z<G;z++)_(F[z],A,R,S,x)}function b(E){E.target.removeEventListener("dispose",b);for(const R in c){const S=c[R],x=E.target.uuid;x in S&&(S[x].dispose(),delete S[x])}}}const Zv={[Ea]:Aa,[Ca]:La,[Ra]:Da,[ps]:Pa,[Aa]:Ea,[La]:Ca,[Da]:Ra,[Pa]:ps};function jv(s,t){function e(){let U=!1;const lt=new de;let H=null;const $=new de(0,0,0,0);return{setMask:function(ft){H!==ft&&!U&&(s.colorMask(ft,ft,ft,ft),H=ft)},setLocked:function(ft){U=ft},setClear:function(ft,ut,Ht,Se,Be){Be===!0&&(ft*=Se,ut*=Se,Ht*=Se),lt.set(ft,ut,Ht,Se),$.equals(lt)===!1&&(s.clearColor(ft,ut,Ht,Se),$.copy(lt))},reset:function(){U=!1,H=null,$.set(-1,0,0,0)}}}function n(){let U=!1,lt=!1,H=null,$=null,ft=null;return{setReversed:function(ut){if(lt!==ut){const Ht=t.get("EXT_clip_control");lt?Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.ZERO_TO_ONE_EXT):Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.NEGATIVE_ONE_TO_ONE_EXT);const Se=ft;ft=null,this.setClear(Se)}lt=ut},getReversed:function(){return lt},setTest:function(ut){ut?rt(s.DEPTH_TEST):Ct(s.DEPTH_TEST)},setMask:function(ut){H!==ut&&!U&&(s.depthMask(ut),H=ut)},setFunc:function(ut){if(lt&&(ut=Zv[ut]),$!==ut){switch(ut){case Ea:s.depthFunc(s.NEVER);break;case Aa:s.depthFunc(s.ALWAYS);break;case Ca:s.depthFunc(s.LESS);break;case ps:s.depthFunc(s.LEQUAL);break;case Ra:s.depthFunc(s.EQUAL);break;case Pa:s.depthFunc(s.GEQUAL);break;case La:s.depthFunc(s.GREATER);break;case Da:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}$=ut}},setLocked:function(ut){U=ut},setClear:function(ut){ft!==ut&&(lt&&(ut=1-ut),s.clearDepth(ut),ft=ut)},reset:function(){U=!1,H=null,$=null,ft=null,lt=!1}}}function i(){let U=!1,lt=null,H=null,$=null,ft=null,ut=null,Ht=null,Se=null,Be=null;return{setTest:function(ce){U||(ce?rt(s.STENCIL_TEST):Ct(s.STENCIL_TEST))},setMask:function(ce){lt!==ce&&!U&&(s.stencilMask(ce),lt=ce)},setFunc:function(ce,pn,zn){(H!==ce||$!==pn||ft!==zn)&&(s.stencilFunc(ce,pn,zn),H=ce,$=pn,ft=zn)},setOp:function(ce,pn,zn){(ut!==ce||Ht!==pn||Se!==zn)&&(s.stencilOp(ce,pn,zn),ut=ce,Ht=pn,Se=zn)},setLocked:function(ce){U=ce},setClear:function(ce){Be!==ce&&(s.clearStencil(ce),Be=ce)},reset:function(){U=!1,lt=null,H=null,$=null,ft=null,ut=null,Ht=null,Se=null,Be=null}}}const r=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,d=[],m=null,v=!1,g=null,p=null,M=null,y=null,_=null,b=null,E=null,A=new j(0,0,0),R=0,S=!1,x=null,L=null,F=null,z=null,G=null;const W=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,K=0;const V=s.getParameter(s.VERSION);V.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(V)[1]),q=K>=1):V.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),q=K>=2);let st=null,dt={};const Tt=s.getParameter(s.SCISSOR_BOX),Vt=s.getParameter(s.VIEWPORT),ne=new de().fromArray(Tt),Y=new de().fromArray(Vt);function nt(U,lt,H,$){const ft=new Uint8Array(4),ut=s.createTexture();s.bindTexture(U,ut),s.texParameteri(U,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(U,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ht=0;Ht<H;Ht++)U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY?s.texImage3D(lt,0,s.RGBA,1,1,$,0,s.RGBA,s.UNSIGNED_BYTE,ft):s.texImage2D(lt+Ht,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ft);return ut}const gt={};gt[s.TEXTURE_2D]=nt(s.TEXTURE_2D,s.TEXTURE_2D,1),gt[s.TEXTURE_CUBE_MAP]=nt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),gt[s.TEXTURE_2D_ARRAY]=nt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),gt[s.TEXTURE_3D]=nt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),rt(s.DEPTH_TEST),o.setFunc(ps),jt(!1),Kt(tc),rt(s.CULL_FACE),D(Zn);function rt(U){h[U]!==!0&&(s.enable(U),h[U]=!0)}function Ct(U){h[U]!==!1&&(s.disable(U),h[U]=!1)}function Nt(U,lt){return u[U]!==lt?(s.bindFramebuffer(U,lt),u[U]=lt,U===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=lt),U===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=lt),!0):!1}function Rt(U,lt){let H=d,$=!1;if(U){H=f.get(lt),H===void 0&&(H=[],f.set(lt,H));const ft=U.textures;if(H.length!==ft.length||H[0]!==s.COLOR_ATTACHMENT0){for(let ut=0,Ht=ft.length;ut<Ht;ut++)H[ut]=s.COLOR_ATTACHMENT0+ut;H.length=ft.length,$=!0}}else H[0]!==s.BACK&&(H[0]=s.BACK,$=!0);$&&s.drawBuffers(H)}function xe(U){return m!==U?(s.useProgram(U),m=U,!0):!1}const $t={[Li]:s.FUNC_ADD,[df]:s.FUNC_SUBTRACT,[pf]:s.FUNC_REVERSE_SUBTRACT};$t[mf]=s.MIN,$t[gf]=s.MAX;const Ee={[vf]:s.ZERO,[_f]:s.ONE,[xf]:s.SRC_COLOR,[Ta]:s.SRC_ALPHA,[bf]:s.SRC_ALPHA_SATURATE,[wf]:s.DST_COLOR,[yf]:s.DST_ALPHA,[Mf]:s.ONE_MINUS_SRC_COLOR,[ba]:s.ONE_MINUS_SRC_ALPHA,[Tf]:s.ONE_MINUS_DST_COLOR,[Sf]:s.ONE_MINUS_DST_ALPHA,[Ef]:s.CONSTANT_COLOR,[Af]:s.ONE_MINUS_CONSTANT_COLOR,[Cf]:s.CONSTANT_ALPHA,[Rf]:s.ONE_MINUS_CONSTANT_ALPHA};function D(U,lt,H,$,ft,ut,Ht,Se,Be,ce){if(U===Zn){v===!0&&(Ct(s.BLEND),v=!1);return}if(v===!1&&(rt(s.BLEND),v=!0),U!==ff){if(U!==g||ce!==S){if((p!==Li||_!==Li)&&(s.blendEquation(s.FUNC_ADD),p=Li,_=Li),ce)switch(U){case Ni:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case on:s.blendFunc(s.ONE,s.ONE);break;case ec:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case nc:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Ni:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case on:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case ec:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case nc:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}M=null,y=null,b=null,E=null,A.set(0,0,0),R=0,g=U,S=ce}return}ft=ft||lt,ut=ut||H,Ht=Ht||$,(lt!==p||ft!==_)&&(s.blendEquationSeparate($t[lt],$t[ft]),p=lt,_=ft),(H!==M||$!==y||ut!==b||Ht!==E)&&(s.blendFuncSeparate(Ee[H],Ee[$],Ee[ut],Ee[Ht]),M=H,y=$,b=ut,E=Ht),(Se.equals(A)===!1||Be!==R)&&(s.blendColor(Se.r,Se.g,Se.b,Be),A.copy(Se),R=Be),g=U,S=!1}function an(U,lt){U.side===Fe?Ct(s.CULL_FACE):rt(s.CULL_FACE);let H=U.side===Oe;lt&&(H=!H),jt(H),U.blending===Ni&&U.transparent===!1?D(Zn):D(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);const $=U.stencilWrite;a.setTest($),$&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),ve(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?rt(s.SAMPLE_ALPHA_TO_COVERAGE):Ct(s.SAMPLE_ALPHA_TO_COVERAGE)}function jt(U){x!==U&&(U?s.frontFace(s.CW):s.frontFace(s.CCW),x=U)}function Kt(U){U!==hf?(rt(s.CULL_FACE),U!==L&&(U===tc?s.cullFace(s.BACK):U===uf?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ct(s.CULL_FACE),L=U}function Pt(U){U!==F&&(q&&s.lineWidth(U),F=U)}function ve(U,lt,H){U?(rt(s.POLYGON_OFFSET_FILL),(z!==lt||G!==H)&&(s.polygonOffset(lt,H),z=lt,G=H)):Ct(s.POLYGON_OFFSET_FILL)}function Lt(U){U?rt(s.SCISSOR_TEST):Ct(s.SCISSOR_TEST)}function P(U){U===void 0&&(U=s.TEXTURE0+W-1),st!==U&&(s.activeTexture(U),st=U)}function w(U,lt,H){H===void 0&&(st===null?H=s.TEXTURE0+W-1:H=st);let $=dt[H];$===void 0&&($={type:void 0,texture:void 0},dt[H]=$),($.type!==U||$.texture!==lt)&&(st!==H&&(s.activeTexture(H),st=H),s.bindTexture(U,lt||gt[U]),$.type=U,$.texture=lt)}function O(){const U=dt[st];U!==void 0&&U.type!==void 0&&(s.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function J(){try{s.compressedTexImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Q(){try{s.compressedTexImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Z(){try{s.texSubImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Et(){try{s.texSubImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ht(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function mt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Qt(){try{s.texStorage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function it(){try{s.texStorage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function vt(){try{s.texImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function It(){try{s.texImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ft(U){ne.equals(U)===!1&&(s.scissor(U.x,U.y,U.z,U.w),ne.copy(U))}function _t(U){Y.equals(U)===!1&&(s.viewport(U.x,U.y,U.z,U.w),Y.copy(U))}function Jt(U,lt){let H=c.get(lt);H===void 0&&(H=new WeakMap,c.set(lt,H));let $=H.get(U);$===void 0&&($=s.getUniformBlockIndex(lt,U.name),H.set(U,$))}function Xt(U,lt){const $=c.get(lt).get(U);l.get(lt)!==$&&(s.uniformBlockBinding(lt,$,U.__bindingPointIndex),l.set(lt,$))}function me(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},st=null,dt={},u={},f=new WeakMap,d=[],m=null,v=!1,g=null,p=null,M=null,y=null,_=null,b=null,E=null,A=new j(0,0,0),R=0,S=!1,x=null,L=null,F=null,z=null,G=null,ne.set(0,0,s.canvas.width,s.canvas.height),Y.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:rt,disable:Ct,bindFramebuffer:Nt,drawBuffers:Rt,useProgram:xe,setBlending:D,setMaterial:an,setFlipSided:jt,setCullFace:Kt,setLineWidth:Pt,setPolygonOffset:ve,setScissorTest:Lt,activeTexture:P,bindTexture:w,unbindTexture:O,compressedTexImage2D:J,compressedTexImage3D:Q,texImage2D:vt,texImage3D:It,updateUBOMapping:Jt,uniformBlockBinding:Xt,texStorage2D:Qt,texStorage3D:it,texSubImage2D:Z,texSubImage3D:Et,compressedTexSubImage2D:ht,compressedTexSubImage3D:mt,scissor:Ft,viewport:_t,reset:me}}function Kv(s,t,e,n,i,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new et,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(P,w){return d?new OffscreenCanvas(P,w):uo("canvas")}function v(P,w,O){let J=1;const Q=Lt(P);if((Q.width>O||Q.height>O)&&(J=O/Math.max(Q.width,Q.height)),J<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const Z=Math.floor(J*Q.width),Et=Math.floor(J*Q.height);u===void 0&&(u=m(Z,Et));const ht=w?m(Z,Et):u;return ht.width=Z,ht.height=Et,ht.getContext("2d").drawImage(P,0,0,Z,Et),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+Z+"x"+Et+")."),ht}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),P;return P}function g(P){return P.generateMipmaps}function p(P){s.generateMipmap(P)}function M(P){return P.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?s.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function y(P,w,O,J,Q=!1){if(P!==null){if(s[P]!==void 0)return s[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let Z=w;if(w===s.RED&&(O===s.FLOAT&&(Z=s.R32F),O===s.HALF_FLOAT&&(Z=s.R16F),O===s.UNSIGNED_BYTE&&(Z=s.R8)),w===s.RED_INTEGER&&(O===s.UNSIGNED_BYTE&&(Z=s.R8UI),O===s.UNSIGNED_SHORT&&(Z=s.R16UI),O===s.UNSIGNED_INT&&(Z=s.R32UI),O===s.BYTE&&(Z=s.R8I),O===s.SHORT&&(Z=s.R16I),O===s.INT&&(Z=s.R32I)),w===s.RG&&(O===s.FLOAT&&(Z=s.RG32F),O===s.HALF_FLOAT&&(Z=s.RG16F),O===s.UNSIGNED_BYTE&&(Z=s.RG8)),w===s.RG_INTEGER&&(O===s.UNSIGNED_BYTE&&(Z=s.RG8UI),O===s.UNSIGNED_SHORT&&(Z=s.RG16UI),O===s.UNSIGNED_INT&&(Z=s.RG32UI),O===s.BYTE&&(Z=s.RG8I),O===s.SHORT&&(Z=s.RG16I),O===s.INT&&(Z=s.RG32I)),w===s.RGB_INTEGER&&(O===s.UNSIGNED_BYTE&&(Z=s.RGB8UI),O===s.UNSIGNED_SHORT&&(Z=s.RGB16UI),O===s.UNSIGNED_INT&&(Z=s.RGB32UI),O===s.BYTE&&(Z=s.RGB8I),O===s.SHORT&&(Z=s.RGB16I),O===s.INT&&(Z=s.RGB32I)),w===s.RGBA_INTEGER&&(O===s.UNSIGNED_BYTE&&(Z=s.RGBA8UI),O===s.UNSIGNED_SHORT&&(Z=s.RGBA16UI),O===s.UNSIGNED_INT&&(Z=s.RGBA32UI),O===s.BYTE&&(Z=s.RGBA8I),O===s.SHORT&&(Z=s.RGBA16I),O===s.INT&&(Z=s.RGBA32I)),w===s.RGB&&O===s.UNSIGNED_INT_5_9_9_9_REV&&(Z=s.RGB9_E5),w===s.RGBA){const Et=Q?co:ee.getTransfer(J);O===s.FLOAT&&(Z=s.RGBA32F),O===s.HALF_FLOAT&&(Z=s.RGBA16F),O===s.UNSIGNED_BYTE&&(Z=Et===he?s.SRGB8_ALPHA8:s.RGBA8),O===s.UNSIGNED_SHORT_4_4_4_4&&(Z=s.RGBA4),O===s.UNSIGNED_SHORT_5_5_5_1&&(Z=s.RGB5_A1)}return(Z===s.R16F||Z===s.R32F||Z===s.RG16F||Z===s.RG32F||Z===s.RGBA16F||Z===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function _(P,w){let O;return P?w===null||w===Fi||w===vs?O=s.DEPTH24_STENCIL8:w===In?O=s.DEPTH32F_STENCIL8:w===rr&&(O=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Fi||w===vs?O=s.DEPTH_COMPONENT24:w===In?O=s.DEPTH_COMPONENT32F:w===rr&&(O=s.DEPTH_COMPONENT16),O}function b(P,w){return g(P)===!0||P.isFramebufferTexture&&P.minFilter!==rn&&P.minFilter!==Un?Math.log2(Math.max(w.width,w.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?w.mipmaps.length:1}function E(P){const w=P.target;w.removeEventListener("dispose",E),R(w),w.isVideoTexture&&h.delete(w)}function A(P){const w=P.target;w.removeEventListener("dispose",A),x(w)}function R(P){const w=n.get(P);if(w.__webglInit===void 0)return;const O=P.source,J=f.get(O);if(J){const Q=J[w.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&S(P),Object.keys(J).length===0&&f.delete(O)}n.remove(P)}function S(P){const w=n.get(P);s.deleteTexture(w.__webglTexture);const O=P.source,J=f.get(O);delete J[w.__cacheKey],o.memory.textures--}function x(P){const w=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(w.__webglFramebuffer[J]))for(let Q=0;Q<w.__webglFramebuffer[J].length;Q++)s.deleteFramebuffer(w.__webglFramebuffer[J][Q]);else s.deleteFramebuffer(w.__webglFramebuffer[J]);w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer[J])}else{if(Array.isArray(w.__webglFramebuffer))for(let J=0;J<w.__webglFramebuffer.length;J++)s.deleteFramebuffer(w.__webglFramebuffer[J]);else s.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&s.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let J=0;J<w.__webglColorRenderbuffer.length;J++)w.__webglColorRenderbuffer[J]&&s.deleteRenderbuffer(w.__webglColorRenderbuffer[J]);w.__webglDepthRenderbuffer&&s.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const O=P.textures;for(let J=0,Q=O.length;J<Q;J++){const Z=n.get(O[J]);Z.__webglTexture&&(s.deleteTexture(Z.__webglTexture),o.memory.textures--),n.remove(O[J])}n.remove(P)}let L=0;function F(){L=0}function z(){const P=L;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),L+=1,P}function G(P){const w=[];return w.push(P.wrapS),w.push(P.wrapT),w.push(P.wrapR||0),w.push(P.magFilter),w.push(P.minFilter),w.push(P.anisotropy),w.push(P.internalFormat),w.push(P.format),w.push(P.type),w.push(P.generateMipmaps),w.push(P.premultiplyAlpha),w.push(P.flipY),w.push(P.unpackAlignment),w.push(P.colorSpace),w.join()}function W(P,w){const O=n.get(P);if(P.isVideoTexture&&Pt(P),P.isRenderTargetTexture===!1&&P.version>0&&O.__version!==P.version){const J=P.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(O,P,w);return}}e.bindTexture(s.TEXTURE_2D,O.__webglTexture,s.TEXTURE0+w)}function q(P,w){const O=n.get(P);if(P.version>0&&O.__version!==P.version){Y(O,P,w);return}e.bindTexture(s.TEXTURE_2D_ARRAY,O.__webglTexture,s.TEXTURE0+w)}function K(P,w){const O=n.get(P);if(P.version>0&&O.__version!==P.version){Y(O,P,w);return}e.bindTexture(s.TEXTURE_3D,O.__webglTexture,s.TEXTURE0+w)}function V(P,w){const O=n.get(P);if(P.version>0&&O.__version!==P.version){nt(O,P,w);return}e.bindTexture(s.TEXTURE_CUBE_MAP,O.__webglTexture,s.TEXTURE0+w)}const st={[Na]:s.REPEAT,[Ui]:s.CLAMP_TO_EDGE,[Fa]:s.MIRRORED_REPEAT},dt={[rn]:s.NEAREST,[Uf]:s.NEAREST_MIPMAP_NEAREST,[_r]:s.NEAREST_MIPMAP_LINEAR,[Un]:s.LINEAR,[Eo]:s.LINEAR_MIPMAP_NEAREST,[Ii]:s.LINEAR_MIPMAP_LINEAR},Tt={[zf]:s.NEVER,[Hf]:s.ALWAYS,[Of]:s.LESS,[cu]:s.LEQUAL,[Bf]:s.EQUAL,[Vf]:s.GEQUAL,[kf]:s.GREATER,[Gf]:s.NOTEQUAL};function Vt(P,w){if(w.type===In&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===Un||w.magFilter===Eo||w.magFilter===_r||w.magFilter===Ii||w.minFilter===Un||w.minFilter===Eo||w.minFilter===_r||w.minFilter===Ii)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(P,s.TEXTURE_WRAP_S,st[w.wrapS]),s.texParameteri(P,s.TEXTURE_WRAP_T,st[w.wrapT]),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,st[w.wrapR]),s.texParameteri(P,s.TEXTURE_MAG_FILTER,dt[w.magFilter]),s.texParameteri(P,s.TEXTURE_MIN_FILTER,dt[w.minFilter]),w.compareFunction&&(s.texParameteri(P,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(P,s.TEXTURE_COMPARE_FUNC,Tt[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===rn||w.minFilter!==_r&&w.minFilter!==Ii||w.type===In&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");s.texParameterf(P,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function ne(P,w){let O=!1;P.__webglInit===void 0&&(P.__webglInit=!0,w.addEventListener("dispose",E));const J=w.source;let Q=f.get(J);Q===void 0&&(Q={},f.set(J,Q));const Z=G(w);if(Z!==P.__cacheKey){Q[Z]===void 0&&(Q[Z]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,O=!0),Q[Z].usedTimes++;const Et=Q[P.__cacheKey];Et!==void 0&&(Q[P.__cacheKey].usedTimes--,Et.usedTimes===0&&S(w)),P.__cacheKey=Z,P.__webglTexture=Q[Z].texture}return O}function Y(P,w,O){let J=s.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(J=s.TEXTURE_2D_ARRAY),w.isData3DTexture&&(J=s.TEXTURE_3D);const Q=ne(P,w),Z=w.source;e.bindTexture(J,P.__webglTexture,s.TEXTURE0+O);const Et=n.get(Z);if(Z.version!==Et.__version||Q===!0){e.activeTexture(s.TEXTURE0+O);const ht=ee.getPrimaries(ee.workingColorSpace),mt=w.colorSpace===hi?null:ee.getPrimaries(w.colorSpace),Qt=w.colorSpace===hi||ht===mt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qt);let it=v(w.image,!1,i.maxTextureSize);it=ve(w,it);const vt=r.convert(w.format,w.colorSpace),It=r.convert(w.type);let Ft=y(w.internalFormat,vt,It,w.colorSpace,w.isVideoTexture);Vt(J,w);let _t;const Jt=w.mipmaps,Xt=w.isVideoTexture!==!0,me=Et.__version===void 0||Q===!0,U=Z.dataReady,lt=b(w,it);if(w.isDepthTexture)Ft=_(w.format===_s,w.type),me&&(Xt?e.texStorage2D(s.TEXTURE_2D,1,Ft,it.width,it.height):e.texImage2D(s.TEXTURE_2D,0,Ft,it.width,it.height,0,vt,It,null));else if(w.isDataTexture)if(Jt.length>0){Xt&&me&&e.texStorage2D(s.TEXTURE_2D,lt,Ft,Jt[0].width,Jt[0].height);for(let H=0,$=Jt.length;H<$;H++)_t=Jt[H],Xt?U&&e.texSubImage2D(s.TEXTURE_2D,H,0,0,_t.width,_t.height,vt,It,_t.data):e.texImage2D(s.TEXTURE_2D,H,Ft,_t.width,_t.height,0,vt,It,_t.data);w.generateMipmaps=!1}else Xt?(me&&e.texStorage2D(s.TEXTURE_2D,lt,Ft,it.width,it.height),U&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,it.width,it.height,vt,It,it.data)):e.texImage2D(s.TEXTURE_2D,0,Ft,it.width,it.height,0,vt,It,it.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Xt&&me&&e.texStorage3D(s.TEXTURE_2D_ARRAY,lt,Ft,Jt[0].width,Jt[0].height,it.depth);for(let H=0,$=Jt.length;H<$;H++)if(_t=Jt[H],w.format!==bn)if(vt!==null)if(Xt){if(U)if(w.layerUpdates.size>0){const ft=Hc(_t.width,_t.height,w.format,w.type);for(const ut of w.layerUpdates){const Ht=_t.data.subarray(ut*ft/_t.data.BYTES_PER_ELEMENT,(ut+1)*ft/_t.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,H,0,0,ut,_t.width,_t.height,1,vt,Ht)}w.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,H,0,0,0,_t.width,_t.height,it.depth,vt,_t.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,H,Ft,_t.width,_t.height,it.depth,0,_t.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Xt?U&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,H,0,0,0,_t.width,_t.height,it.depth,vt,It,_t.data):e.texImage3D(s.TEXTURE_2D_ARRAY,H,Ft,_t.width,_t.height,it.depth,0,vt,It,_t.data)}else{Xt&&me&&e.texStorage2D(s.TEXTURE_2D,lt,Ft,Jt[0].width,Jt[0].height);for(let H=0,$=Jt.length;H<$;H++)_t=Jt[H],w.format!==bn?vt!==null?Xt?U&&e.compressedTexSubImage2D(s.TEXTURE_2D,H,0,0,_t.width,_t.height,vt,_t.data):e.compressedTexImage2D(s.TEXTURE_2D,H,Ft,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xt?U&&e.texSubImage2D(s.TEXTURE_2D,H,0,0,_t.width,_t.height,vt,It,_t.data):e.texImage2D(s.TEXTURE_2D,H,Ft,_t.width,_t.height,0,vt,It,_t.data)}else if(w.isDataArrayTexture)if(Xt){if(me&&e.texStorage3D(s.TEXTURE_2D_ARRAY,lt,Ft,it.width,it.height,it.depth),U)if(w.layerUpdates.size>0){const H=Hc(it.width,it.height,w.format,w.type);for(const $ of w.layerUpdates){const ft=it.data.subarray($*H/it.data.BYTES_PER_ELEMENT,($+1)*H/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,$,it.width,it.height,1,vt,It,ft)}w.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,vt,It,it.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Ft,it.width,it.height,it.depth,0,vt,It,it.data);else if(w.isData3DTexture)Xt?(me&&e.texStorage3D(s.TEXTURE_3D,lt,Ft,it.width,it.height,it.depth),U&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,vt,It,it.data)):e.texImage3D(s.TEXTURE_3D,0,Ft,it.width,it.height,it.depth,0,vt,It,it.data);else if(w.isFramebufferTexture){if(me)if(Xt)e.texStorage2D(s.TEXTURE_2D,lt,Ft,it.width,it.height);else{let H=it.width,$=it.height;for(let ft=0;ft<lt;ft++)e.texImage2D(s.TEXTURE_2D,ft,Ft,H,$,0,vt,It,null),H>>=1,$>>=1}}else if(Jt.length>0){if(Xt&&me){const H=Lt(Jt[0]);e.texStorage2D(s.TEXTURE_2D,lt,Ft,H.width,H.height)}for(let H=0,$=Jt.length;H<$;H++)_t=Jt[H],Xt?U&&e.texSubImage2D(s.TEXTURE_2D,H,0,0,vt,It,_t):e.texImage2D(s.TEXTURE_2D,H,Ft,vt,It,_t);w.generateMipmaps=!1}else if(Xt){if(me){const H=Lt(it);e.texStorage2D(s.TEXTURE_2D,lt,Ft,H.width,H.height)}U&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,vt,It,it)}else e.texImage2D(s.TEXTURE_2D,0,Ft,vt,It,it);g(w)&&p(J),Et.__version=Z.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function nt(P,w,O){if(w.image.length!==6)return;const J=ne(P,w),Q=w.source;e.bindTexture(s.TEXTURE_CUBE_MAP,P.__webglTexture,s.TEXTURE0+O);const Z=n.get(Q);if(Q.version!==Z.__version||J===!0){e.activeTexture(s.TEXTURE0+O);const Et=ee.getPrimaries(ee.workingColorSpace),ht=w.colorSpace===hi?null:ee.getPrimaries(w.colorSpace),mt=w.colorSpace===hi||Et===ht?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt);const Qt=w.isCompressedTexture||w.image[0].isCompressedTexture,it=w.image[0]&&w.image[0].isDataTexture,vt=[];for(let $=0;$<6;$++)!Qt&&!it?vt[$]=v(w.image[$],!0,i.maxCubemapSize):vt[$]=it?w.image[$].image:w.image[$],vt[$]=ve(w,vt[$]);const It=vt[0],Ft=r.convert(w.format,w.colorSpace),_t=r.convert(w.type),Jt=y(w.internalFormat,Ft,_t,w.colorSpace),Xt=w.isVideoTexture!==!0,me=Z.__version===void 0||J===!0,U=Q.dataReady;let lt=b(w,It);Vt(s.TEXTURE_CUBE_MAP,w);let H;if(Qt){Xt&&me&&e.texStorage2D(s.TEXTURE_CUBE_MAP,lt,Jt,It.width,It.height);for(let $=0;$<6;$++){H=vt[$].mipmaps;for(let ft=0;ft<H.length;ft++){const ut=H[ft];w.format!==bn?Ft!==null?Xt?U&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ft,0,0,ut.width,ut.height,Ft,ut.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ft,Jt,ut.width,ut.height,0,ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ft,0,0,ut.width,ut.height,Ft,_t,ut.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ft,Jt,ut.width,ut.height,0,Ft,_t,ut.data)}}}else{if(H=w.mipmaps,Xt&&me){H.length>0&&lt++;const $=Lt(vt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,lt,Jt,$.width,$.height)}for(let $=0;$<6;$++)if(it){Xt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,vt[$].width,vt[$].height,Ft,_t,vt[$].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Jt,vt[$].width,vt[$].height,0,Ft,_t,vt[$].data);for(let ft=0;ft<H.length;ft++){const Ht=H[ft].image[$].image;Xt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ft+1,0,0,Ht.width,Ht.height,Ft,_t,Ht.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ft+1,Jt,Ht.width,Ht.height,0,Ft,_t,Ht.data)}}else{Xt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Ft,_t,vt[$]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Jt,Ft,_t,vt[$]);for(let ft=0;ft<H.length;ft++){const ut=H[ft];Xt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ft+1,0,0,Ft,_t,ut.image[$]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ft+1,Jt,Ft,_t,ut.image[$])}}}g(w)&&p(s.TEXTURE_CUBE_MAP),Z.__version=Q.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function gt(P,w,O,J,Q,Z){const Et=r.convert(O.format,O.colorSpace),ht=r.convert(O.type),mt=y(O.internalFormat,Et,ht,O.colorSpace),Qt=n.get(w),it=n.get(O);if(it.__renderTarget=w,!Qt.__hasExternalTextures){const vt=Math.max(1,w.width>>Z),It=Math.max(1,w.height>>Z);Q===s.TEXTURE_3D||Q===s.TEXTURE_2D_ARRAY?e.texImage3D(Q,Z,mt,vt,It,w.depth,0,Et,ht,null):e.texImage2D(Q,Z,mt,vt,It,0,Et,ht,null)}e.bindFramebuffer(s.FRAMEBUFFER,P),Kt(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,J,Q,it.__webglTexture,0,jt(w)):(Q===s.TEXTURE_2D||Q>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,J,Q,it.__webglTexture,Z),e.bindFramebuffer(s.FRAMEBUFFER,null)}function rt(P,w,O){if(s.bindRenderbuffer(s.RENDERBUFFER,P),w.depthBuffer){const J=w.depthTexture,Q=J&&J.isDepthTexture?J.type:null,Z=_(w.stencilBuffer,Q),Et=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ht=jt(w);Kt(w)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ht,Z,w.width,w.height):O?s.renderbufferStorageMultisample(s.RENDERBUFFER,ht,Z,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,Z,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Et,s.RENDERBUFFER,P)}else{const J=w.textures;for(let Q=0;Q<J.length;Q++){const Z=J[Q],Et=r.convert(Z.format,Z.colorSpace),ht=r.convert(Z.type),mt=y(Z.internalFormat,Et,ht,Z.colorSpace),Qt=jt(w);O&&Kt(w)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Qt,mt,w.width,w.height):Kt(w)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Qt,mt,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,mt,w.width,w.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ct(P,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,P),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=n.get(w.depthTexture);J.__renderTarget=w,(!J.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),W(w.depthTexture,0);const Q=J.__webglTexture,Z=jt(w);if(w.depthTexture.format===fs)Kt(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Q,0,Z):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Q,0);else if(w.depthTexture.format===_s)Kt(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Q,0,Z):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Nt(P){const w=n.get(P),O=P.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==P.depthTexture){const J=P.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),J){const Q=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,J.removeEventListener("dispose",Q)};J.addEventListener("dispose",Q),w.__depthDisposeCallback=Q}w.__boundDepthTexture=J}if(P.depthTexture&&!w.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Ct(w.__webglFramebuffer,P)}else if(O){w.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[J]),w.__webglDepthbuffer[J]===void 0)w.__webglDepthbuffer[J]=s.createRenderbuffer(),rt(w.__webglDepthbuffer[J],P,!1);else{const Q=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Z=w.__webglDepthbuffer[J];s.bindRenderbuffer(s.RENDERBUFFER,Z),s.framebufferRenderbuffer(s.FRAMEBUFFER,Q,s.RENDERBUFFER,Z)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=s.createRenderbuffer(),rt(w.__webglDepthbuffer,P,!1);else{const J=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Q=w.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,Q),s.framebufferRenderbuffer(s.FRAMEBUFFER,J,s.RENDERBUFFER,Q)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Rt(P,w,O){const J=n.get(P);w!==void 0&&gt(J.__webglFramebuffer,P,P.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),O!==void 0&&Nt(P)}function xe(P){const w=P.texture,O=n.get(P),J=n.get(w);P.addEventListener("dispose",A);const Q=P.textures,Z=P.isWebGLCubeRenderTarget===!0,Et=Q.length>1;if(Et||(J.__webglTexture===void 0&&(J.__webglTexture=s.createTexture()),J.__version=w.version,o.memory.textures++),Z){O.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(w.mipmaps&&w.mipmaps.length>0){O.__webglFramebuffer[ht]=[];for(let mt=0;mt<w.mipmaps.length;mt++)O.__webglFramebuffer[ht][mt]=s.createFramebuffer()}else O.__webglFramebuffer[ht]=s.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){O.__webglFramebuffer=[];for(let ht=0;ht<w.mipmaps.length;ht++)O.__webglFramebuffer[ht]=s.createFramebuffer()}else O.__webglFramebuffer=s.createFramebuffer();if(Et)for(let ht=0,mt=Q.length;ht<mt;ht++){const Qt=n.get(Q[ht]);Qt.__webglTexture===void 0&&(Qt.__webglTexture=s.createTexture(),o.memory.textures++)}if(P.samples>0&&Kt(P)===!1){O.__webglMultisampledFramebuffer=s.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ht=0;ht<Q.length;ht++){const mt=Q[ht];O.__webglColorRenderbuffer[ht]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,O.__webglColorRenderbuffer[ht]);const Qt=r.convert(mt.format,mt.colorSpace),it=r.convert(mt.type),vt=y(mt.internalFormat,Qt,it,mt.colorSpace,P.isXRRenderTarget===!0),It=jt(P);s.renderbufferStorageMultisample(s.RENDERBUFFER,It,vt,P.width,P.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ht,s.RENDERBUFFER,O.__webglColorRenderbuffer[ht])}s.bindRenderbuffer(s.RENDERBUFFER,null),P.depthBuffer&&(O.__webglDepthRenderbuffer=s.createRenderbuffer(),rt(O.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Z){e.bindTexture(s.TEXTURE_CUBE_MAP,J.__webglTexture),Vt(s.TEXTURE_CUBE_MAP,w);for(let ht=0;ht<6;ht++)if(w.mipmaps&&w.mipmaps.length>0)for(let mt=0;mt<w.mipmaps.length;mt++)gt(O.__webglFramebuffer[ht][mt],P,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,mt);else gt(O.__webglFramebuffer[ht],P,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);g(w)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Et){for(let ht=0,mt=Q.length;ht<mt;ht++){const Qt=Q[ht],it=n.get(Qt);e.bindTexture(s.TEXTURE_2D,it.__webglTexture),Vt(s.TEXTURE_2D,Qt),gt(O.__webglFramebuffer,P,Qt,s.COLOR_ATTACHMENT0+ht,s.TEXTURE_2D,0),g(Qt)&&p(s.TEXTURE_2D)}e.unbindTexture()}else{let ht=s.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ht=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ht,J.__webglTexture),Vt(ht,w),w.mipmaps&&w.mipmaps.length>0)for(let mt=0;mt<w.mipmaps.length;mt++)gt(O.__webglFramebuffer[mt],P,w,s.COLOR_ATTACHMENT0,ht,mt);else gt(O.__webglFramebuffer,P,w,s.COLOR_ATTACHMENT0,ht,0);g(w)&&p(ht),e.unbindTexture()}P.depthBuffer&&Nt(P)}function $t(P){const w=P.textures;for(let O=0,J=w.length;O<J;O++){const Q=w[O];if(g(Q)){const Z=M(P),Et=n.get(Q).__webglTexture;e.bindTexture(Z,Et),p(Z),e.unbindTexture()}}}const Ee=[],D=[];function an(P){if(P.samples>0){if(Kt(P)===!1){const w=P.textures,O=P.width,J=P.height;let Q=s.COLOR_BUFFER_BIT;const Z=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Et=n.get(P),ht=w.length>1;if(ht)for(let mt=0;mt<w.length;mt++)e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+mt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+mt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Et.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Et.__webglFramebuffer);for(let mt=0;mt<w.length;mt++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(Q|=s.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(Q|=s.STENCIL_BUFFER_BIT)),ht){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Et.__webglColorRenderbuffer[mt]);const Qt=n.get(w[mt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Qt,0)}s.blitFramebuffer(0,0,O,J,0,0,O,J,Q,s.NEAREST),l===!0&&(Ee.length=0,D.length=0,Ee.push(s.COLOR_ATTACHMENT0+mt),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Ee.push(Z),D.push(Z),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,D)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Ee))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ht)for(let mt=0;mt<w.length;mt++){e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+mt,s.RENDERBUFFER,Et.__webglColorRenderbuffer[mt]);const Qt=n.get(w[mt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+mt,s.TEXTURE_2D,Qt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Et.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const w=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[w])}}}function jt(P){return Math.min(i.maxSamples,P.samples)}function Kt(P){const w=n.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Pt(P){const w=o.render.frame;h.get(P)!==w&&(h.set(P,w),P.update())}function ve(P,w){const O=P.colorSpace,J=P.format,Q=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||O!==xs&&O!==hi&&(ee.getTransfer(O)===he?(J!==bn||Q!==Jn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),w}function Lt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=F,this.setTexture2D=W,this.setTexture2DArray=q,this.setTexture3D=K,this.setTextureCube=V,this.rebindTextures=Rt,this.setupRenderTarget=xe,this.updateRenderTargetMipmap=$t,this.updateMultisampleRenderTarget=an,this.setupDepthRenderbuffer=Nt,this.setupFrameBufferTexture=gt,this.useMultisampledRTT=Kt}function Jv(s,t){function e(n,i=hi){let r;const o=ee.getTransfer(i);if(n===Jn)return s.UNSIGNED_BYTE;if(n===Tl)return s.UNSIGNED_SHORT_4_4_4_4;if(n===bl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===eu)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Qh)return s.BYTE;if(n===tu)return s.SHORT;if(n===rr)return s.UNSIGNED_SHORT;if(n===wl)return s.INT;if(n===Fi)return s.UNSIGNED_INT;if(n===In)return s.FLOAT;if(n===jn)return s.HALF_FLOAT;if(n===nu)return s.ALPHA;if(n===iu)return s.RGB;if(n===bn)return s.RGBA;if(n===su)return s.LUMINANCE;if(n===ru)return s.LUMINANCE_ALPHA;if(n===fs)return s.DEPTH_COMPONENT;if(n===_s)return s.DEPTH_STENCIL;if(n===El)return s.RED;if(n===Al)return s.RED_INTEGER;if(n===ou)return s.RG;if(n===Cl)return s.RG_INTEGER;if(n===Rl)return s.RGBA_INTEGER;if(n===io||n===so||n===ro||n===oo)if(o===he)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===io)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===so)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ro)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===oo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===io)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===so)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ro)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===oo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===za||n===Oa||n===Ba||n===ka)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===za)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Oa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ba)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ka)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ga||n===Va||n===Ha)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ga||n===Va)return o===he?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ha)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Wa||n===Xa||n===qa||n===Ya||n===Za||n===ja||n===Ka||n===Ja||n===$a||n===Qa||n===tl||n===el||n===nl||n===il)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Wa)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Xa)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===qa)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ya)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Za)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ja)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ka)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ja)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===$a)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Qa)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===tl)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===el)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===nl)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===il)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ao||n===sl||n===rl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ao)return o===he?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===sl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===rl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===au||n===ol||n===al||n===ll)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ao)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ol)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===al)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ll)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===vs?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}const $v={type:"move"};class oa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ge,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ge,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ge,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,n),p=this._getHandJoint(c,v);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,m=.005;c.inputState.pinching&&f>d+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent($v)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ge;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Qv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,t_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class e_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new He,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new le({vertexShader:Qv,fragmentShader:t_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new kt(new Rn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class n_ extends Es{constructor(t,e){super();const n=this;let i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,m=null;const v=new e_,g=e.getContextAttributes();let p=null,M=null;const y=[],_=[],b=new et;let E=null;const A=new nn;A.viewport=new de;const R=new nn;R.viewport=new de;const S=[A,R],x=new wp;let L=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let nt=y[Y];return nt===void 0&&(nt=new oa,y[Y]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(Y){let nt=y[Y];return nt===void 0&&(nt=new oa,y[Y]=nt),nt.getGripSpace()},this.getHand=function(Y){let nt=y[Y];return nt===void 0&&(nt=new oa,y[Y]=nt),nt.getHandSpace()};function z(Y){const nt=_.indexOf(Y.inputSource);if(nt===-1)return;const gt=y[nt];gt!==void 0&&(gt.update(Y.inputSource,Y.frame,c||o),gt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function G(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",G),i.removeEventListener("inputsourceschange",W);for(let Y=0;Y<y.length;Y++){const nt=_[Y];nt!==null&&(_[Y]=null,y[Y].disconnect(nt))}L=null,F=null,v.reset(),t.setRenderTarget(p),d=null,f=null,u=null,i=null,M=null,ne.stop(),n.isPresenting=!1,t.setPixelRatio(E),t.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",G),i.addEventListener("inputsourceschange",W),g.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(b),i.renderState.layers===void 0){const nt={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,e,nt),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new En(d.framebufferWidth,d.framebufferHeight,{format:bn,type:Jn,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let nt=null,gt=null,rt=null;g.depth&&(rt=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=g.stencil?_s:fs,gt=g.stencil?vs:Fi);const Ct={colorFormat:e.RGBA8,depthFormat:rt,scaleFactor:r};u=new XRWebGLBinding(i,e),f=u.createProjectionLayer(Ct),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),M=new En(f.textureWidth,f.textureHeight,{format:bn,type:Jn,depthTexture:new wu(f.textureWidth,f.textureHeight,gt,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),ne.setContext(i),ne.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function W(Y){for(let nt=0;nt<Y.removed.length;nt++){const gt=Y.removed[nt],rt=_.indexOf(gt);rt>=0&&(_[rt]=null,y[rt].disconnect(gt))}for(let nt=0;nt<Y.added.length;nt++){const gt=Y.added[nt];let rt=_.indexOf(gt);if(rt===-1){for(let Nt=0;Nt<y.length;Nt++)if(Nt>=_.length){_.push(gt),rt=Nt;break}else if(_[Nt]===null){_[Nt]=gt,rt=Nt;break}if(rt===-1)break}const Ct=y[rt];Ct&&Ct.connect(gt)}}const q=new C,K=new C;function V(Y,nt,gt){q.setFromMatrixPosition(nt.matrixWorld),K.setFromMatrixPosition(gt.matrixWorld);const rt=q.distanceTo(K),Ct=nt.projectionMatrix.elements,Nt=gt.projectionMatrix.elements,Rt=Ct[14]/(Ct[10]-1),xe=Ct[14]/(Ct[10]+1),$t=(Ct[9]+1)/Ct[5],Ee=(Ct[9]-1)/Ct[5],D=(Ct[8]-1)/Ct[0],an=(Nt[8]+1)/Nt[0],jt=Rt*D,Kt=Rt*an,Pt=rt/(-D+an),ve=Pt*-D;if(nt.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(ve),Y.translateZ(Pt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Ct[10]===-1)Y.projectionMatrix.copy(nt.projectionMatrix),Y.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const Lt=Rt+Pt,P=xe+Pt,w=jt-ve,O=Kt+(rt-ve),J=$t*xe/P*Lt,Q=Ee*xe/P*Lt;Y.projectionMatrix.makePerspective(w,O,J,Q,Lt,P),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function st(Y,nt){nt===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(nt.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;let nt=Y.near,gt=Y.far;v.texture!==null&&(v.depthNear>0&&(nt=v.depthNear),v.depthFar>0&&(gt=v.depthFar)),x.near=R.near=A.near=nt,x.far=R.far=A.far=gt,(L!==x.near||F!==x.far)&&(i.updateRenderState({depthNear:x.near,depthFar:x.far}),L=x.near,F=x.far),A.layers.mask=Y.layers.mask|2,R.layers.mask=Y.layers.mask|4,x.layers.mask=A.layers.mask|R.layers.mask;const rt=Y.parent,Ct=x.cameras;st(x,rt);for(let Nt=0;Nt<Ct.length;Nt++)st(Ct[Nt],rt);Ct.length===2?V(x,A,R):x.projectionMatrix.copy(A.projectionMatrix),dt(Y,x,rt)};function dt(Y,nt,gt){gt===null?Y.matrix.copy(nt.matrixWorld):(Y.matrix.copy(gt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(nt.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(nt.projectionMatrix),Y.projectionMatrixInverse.copy(nt.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=or*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(Y){l=Y,f!==null&&(f.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(x)};let Tt=null;function Vt(Y,nt){if(h=nt.getViewerPose(c||o),m=nt,h!==null){const gt=h.views;d!==null&&(t.setRenderTargetFramebuffer(M,d.framebuffer),t.setRenderTarget(M));let rt=!1;gt.length!==x.cameras.length&&(x.cameras.length=0,rt=!0);for(let Nt=0;Nt<gt.length;Nt++){const Rt=gt[Nt];let xe=null;if(d!==null)xe=d.getViewport(Rt);else{const Ee=u.getViewSubImage(f,Rt);xe=Ee.viewport,Nt===0&&(t.setRenderTargetTextures(M,Ee.colorTexture,f.ignoreDepthValues?void 0:Ee.depthStencilTexture),t.setRenderTarget(M))}let $t=S[Nt];$t===void 0&&($t=new nn,$t.layers.enable(Nt),$t.viewport=new de,S[Nt]=$t),$t.matrix.fromArray(Rt.transform.matrix),$t.matrix.decompose($t.position,$t.quaternion,$t.scale),$t.projectionMatrix.fromArray(Rt.projectionMatrix),$t.projectionMatrixInverse.copy($t.projectionMatrix).invert(),$t.viewport.set(xe.x,xe.y,xe.width,xe.height),Nt===0&&(x.matrix.copy($t.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),rt===!0&&x.cameras.push($t)}const Ct=i.enabledFeatures;if(Ct&&Ct.includes("depth-sensing")){const Nt=u.getDepthInformation(gt[0]);Nt&&Nt.isValid&&Nt.texture&&v.init(t,Nt,i.renderState)}}for(let gt=0;gt<y.length;gt++){const rt=_[gt],Ct=y[gt];rt!==null&&Ct!==void 0&&Ct.update(rt,nt,c||o)}Tt&&Tt(Y,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),m=null}const ne=new Iu;ne.setAnimationLoop(Vt),this.setAnimationLoop=function(Y){Tt=Y},this.dispose=function(){}}}const Ti=new An,i_=new Bt;function s_(s,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,vu(s)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,M,y,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),f(g,p),p.isMeshPhysicalMaterial&&d(g,p,_)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),v(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,M,y):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Oe&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Oe&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const M=t.get(p),y=M.envMap,_=M.envMapRotation;y&&(g.envMap.value=y,Ti.copy(_),Ti.x*=-1,Ti.y*=-1,Ti.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ti.y*=-1,Ti.z*=-1),g.envMapRotation.value.setFromMatrix4(i_.makeRotationFromEuler(Ti)),g.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,M,y){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*M,g.scale.value=y*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function d(g,p,M){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Oe&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function v(g,p){const M=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function r_(s,t,e,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,y){const _=y.program;n.uniformBlockBinding(M,_)}function c(M,y){let _=i[M.id];_===void 0&&(m(M),_=h(M),i[M.id]=_,M.addEventListener("dispose",g));const b=y.program;n.updateUBOMapping(M,b);const E=t.render.frame;r[M.id]!==E&&(f(M),r[M.id]=E)}function h(M){const y=u();M.__bindingPointIndex=y;const _=s.createBuffer(),b=M.__size,E=M.usage;return s.bindBuffer(s.UNIFORM_BUFFER,_),s.bufferData(s.UNIFORM_BUFFER,b,E),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,_),_}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const y=i[M.id],_=M.uniforms,b=M.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let E=0,A=_.length;E<A;E++){const R=Array.isArray(_[E])?_[E]:[_[E]];for(let S=0,x=R.length;S<x;S++){const L=R[S];if(d(L,E,S,b)===!0){const F=L.__offset,z=Array.isArray(L.value)?L.value:[L.value];let G=0;for(let W=0;W<z.length;W++){const q=z[W],K=v(q);typeof q=="number"||typeof q=="boolean"?(L.__data[0]=q,s.bufferSubData(s.UNIFORM_BUFFER,F+G,L.__data)):q.isMatrix3?(L.__data[0]=q.elements[0],L.__data[1]=q.elements[1],L.__data[2]=q.elements[2],L.__data[3]=0,L.__data[4]=q.elements[3],L.__data[5]=q.elements[4],L.__data[6]=q.elements[5],L.__data[7]=0,L.__data[8]=q.elements[6],L.__data[9]=q.elements[7],L.__data[10]=q.elements[8],L.__data[11]=0):(q.toArray(L.__data,G),G+=K.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,F,L.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(M,y,_,b){const E=M.value,A=y+"_"+_;if(b[A]===void 0)return typeof E=="number"||typeof E=="boolean"?b[A]=E:b[A]=E.clone(),!0;{const R=b[A];if(typeof E=="number"||typeof E=="boolean"){if(R!==E)return b[A]=E,!0}else if(R.equals(E)===!1)return R.copy(E),!0}return!1}function m(M){const y=M.uniforms;let _=0;const b=16;for(let A=0,R=y.length;A<R;A++){const S=Array.isArray(y[A])?y[A]:[y[A]];for(let x=0,L=S.length;x<L;x++){const F=S[x],z=Array.isArray(F.value)?F.value:[F.value];for(let G=0,W=z.length;G<W;G++){const q=z[G],K=v(q),V=_%b,st=V%K.boundary,dt=V+st;_+=st,dt!==0&&b-dt<K.storage&&(_+=b-dt),F.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=_,_+=K.storage}}}const E=_%b;return E>0&&(_+=b-E),M.__size=_,M.__cache={},this}function v(M){const y={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(y.boundary=4,y.storage=4):M.isVector2?(y.boundary=8,y.storage=8):M.isVector3||M.isColor?(y.boundary=16,y.storage=12):M.isVector4?(y.boundary=16,y.storage=16):M.isMatrix3?(y.boundary=48,y.storage=48):M.isMatrix4?(y.boundary=64,y.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),y}function g(M){const y=M.target;y.removeEventListener("dispose",g);const _=o.indexOf(y.__bindingPointIndex);o.splice(_,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete r[y.id]}function p(){for(const M in i)s.deleteBuffer(i[M]);o=[],i={},r={}}return{bind:l,update:c,dispose:p}}class o_{constructor(t={}){const{canvas:e=od(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const m=new Uint32Array(4),v=new Int32Array(4);let g=null,p=null;const M=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=$e,this.toneMapping=ui,this.toneMappingExposure=1;const _=this;let b=!1,E=0,A=0,R=null,S=-1,x=null;const L=new de,F=new de;let z=null;const G=new j(0);let W=0,q=e.width,K=e.height,V=1,st=null,dt=null;const Tt=new de(0,0,q,K),Vt=new de(0,0,q,K);let ne=!1;const Y=new Il;let nt=!1,gt=!1;const rt=new Bt,Ct=new Bt,Nt=new C,Rt=new de,xe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let $t=!1;function Ee(){return R===null?V:1}let D=n;function an(T,I){return e.getContext(T,I)}try{const T={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${yl}`),e.addEventListener("webglcontextlost",$,!1),e.addEventListener("webglcontextrestored",ft,!1),e.addEventListener("webglcontextcreationerror",ut,!1),D===null){const I="webgl2";if(D=an(I,T),D===null)throw an(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let jt,Kt,Pt,ve,Lt,P,w,O,J,Q,Z,Et,ht,mt,Qt,it,vt,It,Ft,_t,Jt,Xt,me,U;function lt(){jt=new mg(D),jt.init(),Xt=new Jv(D,jt),Kt=new cg(D,jt,t,Xt),Pt=new jv(D,jt),Kt.reverseDepthBuffer&&f&&Pt.buffers.depth.setReversed(!0),ve=new _g(D),Lt=new Fv,P=new Kv(D,jt,Pt,Lt,Kt,Xt,ve),w=new ug(_),O=new pg(_),J=new bp(D),me=new ag(D,J),Q=new gg(D,J,ve,me),Z=new Mg(D,Q,J,ve),Ft=new xg(D,Kt,P),it=new hg(Lt),Et=new Nv(_,w,O,jt,Kt,me,it),ht=new s_(_,Lt),mt=new Ov,Qt=new Wv(jt),It=new og(_,w,O,Pt,Z,d,l),vt=new Yv(_,Z,Kt),U=new r_(D,ve,Kt,Pt),_t=new lg(D,jt,ve),Jt=new vg(D,jt,ve),ve.programs=Et.programs,_.capabilities=Kt,_.extensions=jt,_.properties=Lt,_.renderLists=mt,_.shadowMap=vt,_.state=Pt,_.info=ve}lt();const H=new n_(_,D);this.xr=H,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const T=jt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=jt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(T){T!==void 0&&(V=T,this.setSize(q,K,!1))},this.getSize=function(T){return T.set(q,K)},this.setSize=function(T,I,B=!0){if(H.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=T,K=I,e.width=Math.floor(T*V),e.height=Math.floor(I*V),B===!0&&(e.style.width=T+"px",e.style.height=I+"px"),this.setViewport(0,0,T,I)},this.getDrawingBufferSize=function(T){return T.set(q*V,K*V).floor()},this.setDrawingBufferSize=function(T,I,B){q=T,K=I,V=B,e.width=Math.floor(T*B),e.height=Math.floor(I*B),this.setViewport(0,0,T,I)},this.getCurrentViewport=function(T){return T.copy(L)},this.getViewport=function(T){return T.copy(Tt)},this.setViewport=function(T,I,B,k){T.isVector4?Tt.set(T.x,T.y,T.z,T.w):Tt.set(T,I,B,k),Pt.viewport(L.copy(Tt).multiplyScalar(V).round())},this.getScissor=function(T){return T.copy(Vt)},this.setScissor=function(T,I,B,k){T.isVector4?Vt.set(T.x,T.y,T.z,T.w):Vt.set(T,I,B,k),Pt.scissor(F.copy(Vt).multiplyScalar(V).round())},this.getScissorTest=function(){return ne},this.setScissorTest=function(T){Pt.setScissorTest(ne=T)},this.setOpaqueSort=function(T){st=T},this.setTransparentSort=function(T){dt=T},this.getClearColor=function(T){return T.copy(It.getClearColor())},this.setClearColor=function(){It.setClearColor.apply(It,arguments)},this.getClearAlpha=function(){return It.getClearAlpha()},this.setClearAlpha=function(){It.setClearAlpha.apply(It,arguments)},this.clear=function(T=!0,I=!0,B=!0){let k=0;if(T){let N=!1;if(R!==null){const tt=R.texture.format;N=tt===Rl||tt===Cl||tt===Al}if(N){const tt=R.texture.type,ct=tt===Jn||tt===Fi||tt===rr||tt===vs||tt===Tl||tt===bl,pt=It.getClearColor(),xt=It.getClearAlpha(),zt=pt.r,Ot=pt.g,Dt=pt.b;ct?(m[0]=zt,m[1]=Ot,m[2]=Dt,m[3]=xt,D.clearBufferuiv(D.COLOR,0,m)):(v[0]=zt,v[1]=Ot,v[2]=Dt,v[3]=xt,D.clearBufferiv(D.COLOR,0,v))}else k|=D.COLOR_BUFFER_BIT}I&&(k|=D.DEPTH_BUFFER_BIT),B&&(k|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",$,!1),e.removeEventListener("webglcontextrestored",ft,!1),e.removeEventListener("webglcontextcreationerror",ut,!1),It.dispose(),mt.dispose(),Qt.dispose(),Lt.dispose(),w.dispose(),O.dispose(),Z.dispose(),me.dispose(),U.dispose(),Et.dispose(),H.dispose(),H.removeEventListener("sessionstart",Yl),H.removeEventListener("sessionend",Zl),vi.stop()};function $(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function ft(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const T=ve.autoReset,I=vt.enabled,B=vt.autoUpdate,k=vt.needsUpdate,N=vt.type;lt(),ve.autoReset=T,vt.enabled=I,vt.autoUpdate=B,vt.needsUpdate=k,vt.type=N}function ut(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Ht(T){const I=T.target;I.removeEventListener("dispose",Ht),Se(I)}function Se(T){Be(T),Lt.remove(T)}function Be(T){const I=Lt.get(T).programs;I!==void 0&&(I.forEach(function(B){Et.releaseProgram(B)}),T.isShaderMaterial&&Et.releaseShaderCache(T))}this.renderBufferDirect=function(T,I,B,k,N,tt){I===null&&(I=xe);const ct=N.isMesh&&N.matrixWorld.determinant()<0,pt=rf(T,I,B,k,N);Pt.setMaterial(k,ct);let xt=B.index,zt=1;if(k.wireframe===!0){if(xt=Q.getWireframeAttribute(B),xt===void 0)return;zt=2}const Ot=B.drawRange,Dt=B.attributes.position;let te=Ot.start*zt,oe=(Ot.start+Ot.count)*zt;tt!==null&&(te=Math.max(te,tt.start*zt),oe=Math.min(oe,(tt.start+tt.count)*zt)),xt!==null?(te=Math.max(te,0),oe=Math.min(oe,xt.count)):Dt!=null&&(te=Math.max(te,0),oe=Math.min(oe,Dt.count));const Re=oe-te;if(Re<0||Re===1/0)return;me.setup(N,k,pt,B,xt);let we,ie=_t;if(xt!==null&&(we=J.get(xt),ie=Jt,ie.setIndex(we)),N.isMesh)k.wireframe===!0?(Pt.setLineWidth(k.wireframeLinewidth*Ee()),ie.setMode(D.LINES)):ie.setMode(D.TRIANGLES);else if(N.isLine){let Ut=k.linewidth;Ut===void 0&&(Ut=1),Pt.setLineWidth(Ut*Ee()),N.isLineSegments?ie.setMode(D.LINES):N.isLineLoop?ie.setMode(D.LINE_LOOP):ie.setMode(D.LINE_STRIP)}else N.isPoints?ie.setMode(D.POINTS):N.isSprite&&ie.setMode(D.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)ie.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(jt.get("WEBGL_multi_draw"))ie.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Ut=N._multiDrawStarts,ze=N._multiDrawCounts,ae=N._multiDrawCount,mn=xt?J.get(xt).bytesPerElement:1,ki=Lt.get(k).currentProgram.getUniforms();for(let Qe=0;Qe<ae;Qe++)ki.setValue(D,"_gl_DrawID",Qe),ie.render(Ut[Qe]/mn,ze[Qe])}else if(N.isInstancedMesh)ie.renderInstances(te,Re,N.count);else if(B.isInstancedBufferGeometry){const Ut=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,ze=Math.min(B.instanceCount,Ut);ie.renderInstances(te,Re,ze)}else ie.render(te,Re)};function ce(T,I,B){T.transparent===!0&&T.side===Fe&&T.forceSinglePass===!1?(T.side=Oe,T.needsUpdate=!0,vr(T,I,B),T.side=fi,T.needsUpdate=!0,vr(T,I,B),T.side=Fe):vr(T,I,B)}this.compile=function(T,I,B=null){B===null&&(B=T),p=Qt.get(B),p.init(I),y.push(p),B.traverseVisible(function(N){N.isLight&&N.layers.test(I.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),T!==B&&T.traverseVisible(function(N){N.isLight&&N.layers.test(I.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();const k=new Set;return T.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const tt=N.material;if(tt)if(Array.isArray(tt))for(let ct=0;ct<tt.length;ct++){const pt=tt[ct];ce(pt,B,N),k.add(pt)}else ce(tt,B,N),k.add(tt)}),y.pop(),p=null,k},this.compileAsync=function(T,I,B=null){const k=this.compile(T,I,B);return new Promise(N=>{function tt(){if(k.forEach(function(ct){Lt.get(ct).currentProgram.isReady()&&k.delete(ct)}),k.size===0){N(T);return}setTimeout(tt,10)}jt.get("KHR_parallel_shader_compile")!==null?tt():setTimeout(tt,10)})};let pn=null;function zn(T){pn&&pn(T)}function Yl(){vi.stop()}function Zl(){vi.start()}const vi=new Iu;vi.setAnimationLoop(zn),typeof self<"u"&&vi.setContext(self),this.setAnimationLoop=function(T){pn=T,H.setAnimationLoop(T),T===null?vi.stop():vi.start()},H.addEventListener("sessionstart",Yl),H.addEventListener("sessionend",Zl),this.render=function(T,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),H.enabled===!0&&H.isPresenting===!0&&(H.cameraAutoUpdate===!0&&H.updateCamera(I),I=H.getCamera()),T.isScene===!0&&T.onBeforeRender(_,T,I,R),p=Qt.get(T,y.length),p.init(I),y.push(p),Ct.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),Y.setFromProjectionMatrix(Ct),gt=this.localClippingEnabled,nt=it.init(this.clippingPlanes,gt),g=mt.get(T,M.length),g.init(),M.push(g),H.enabled===!0&&H.isPresenting===!0){const tt=_.xr.getDepthSensingMesh();tt!==null&&To(tt,I,-1/0,_.sortObjects)}To(T,I,0,_.sortObjects),g.finish(),_.sortObjects===!0&&g.sort(st,dt),$t=H.enabled===!1||H.isPresenting===!1||H.hasDepthSensing()===!1,$t&&It.addToRenderList(g,T),this.info.render.frame++,nt===!0&&it.beginShadows();const B=p.state.shadowsArray;vt.render(B,T,I),nt===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();const k=g.opaque,N=g.transmissive;if(p.setupLights(),I.isArrayCamera){const tt=I.cameras;if(N.length>0)for(let ct=0,pt=tt.length;ct<pt;ct++){const xt=tt[ct];Kl(k,N,T,xt)}$t&&It.render(T);for(let ct=0,pt=tt.length;ct<pt;ct++){const xt=tt[ct];jl(g,T,xt,xt.viewport)}}else N.length>0&&Kl(k,N,T,I),$t&&It.render(T),jl(g,T,I);R!==null&&(P.updateMultisampleRenderTarget(R),P.updateRenderTargetMipmap(R)),T.isScene===!0&&T.onAfterRender(_,T,I),me.resetDefaultState(),S=-1,x=null,y.pop(),y.length>0?(p=y[y.length-1],nt===!0&&it.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?g=M[M.length-1]:g=null};function To(T,I,B,k){if(T.visible===!1)return;if(T.layers.test(I.layers)){if(T.isGroup)B=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(I);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Y.intersectsSprite(T)){k&&Rt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ct);const ct=Z.update(T),pt=T.material;pt.visible&&g.push(T,ct,pt,B,Rt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Y.intersectsObject(T))){const ct=Z.update(T),pt=T.material;if(k&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Rt.copy(T.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),Rt.copy(ct.boundingSphere.center)),Rt.applyMatrix4(T.matrixWorld).applyMatrix4(Ct)),Array.isArray(pt)){const xt=ct.groups;for(let zt=0,Ot=xt.length;zt<Ot;zt++){const Dt=xt[zt],te=pt[Dt.materialIndex];te&&te.visible&&g.push(T,ct,te,B,Rt.z,Dt)}}else pt.visible&&g.push(T,ct,pt,B,Rt.z,null)}}const tt=T.children;for(let ct=0,pt=tt.length;ct<pt;ct++)To(tt[ct],I,B,k)}function jl(T,I,B,k){const N=T.opaque,tt=T.transmissive,ct=T.transparent;p.setupLightsView(B),nt===!0&&it.setGlobalState(_.clippingPlanes,B),k&&Pt.viewport(L.copy(k)),N.length>0&&gr(N,I,B),tt.length>0&&gr(tt,I,B),ct.length>0&&gr(ct,I,B),Pt.buffers.depth.setTest(!0),Pt.buffers.depth.setMask(!0),Pt.buffers.color.setMask(!0),Pt.setPolygonOffset(!1)}function Kl(T,I,B,k){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[k.id]===void 0&&(p.state.transmissionRenderTarget[k.id]=new En(1,1,{generateMipmaps:!0,type:jt.has("EXT_color_buffer_half_float")||jt.has("EXT_color_buffer_float")?jn:Jn,minFilter:Ii,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ee.workingColorSpace}));const tt=p.state.transmissionRenderTarget[k.id],ct=k.viewport||L;tt.setSize(ct.z,ct.w);const pt=_.getRenderTarget();_.setRenderTarget(tt),_.getClearColor(G),W=_.getClearAlpha(),W<1&&_.setClearColor(16777215,.5),_.clear(),$t&&It.render(B);const xt=_.toneMapping;_.toneMapping=ui;const zt=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),p.setupLightsView(k),nt===!0&&it.setGlobalState(_.clippingPlanes,k),gr(T,B,k),P.updateMultisampleRenderTarget(tt),P.updateRenderTargetMipmap(tt),jt.has("WEBGL_multisampled_render_to_texture")===!1){let Ot=!1;for(let Dt=0,te=I.length;Dt<te;Dt++){const oe=I[Dt],Re=oe.object,we=oe.geometry,ie=oe.material,Ut=oe.group;if(ie.side===Fe&&Re.layers.test(k.layers)){const ze=ie.side;ie.side=Oe,ie.needsUpdate=!0,Jl(Re,B,k,we,ie,Ut),ie.side=ze,ie.needsUpdate=!0,Ot=!0}}Ot===!0&&(P.updateMultisampleRenderTarget(tt),P.updateRenderTargetMipmap(tt))}_.setRenderTarget(pt),_.setClearColor(G,W),zt!==void 0&&(k.viewport=zt),_.toneMapping=xt}function gr(T,I,B){const k=I.isScene===!0?I.overrideMaterial:null;for(let N=0,tt=T.length;N<tt;N++){const ct=T[N],pt=ct.object,xt=ct.geometry,zt=k===null?ct.material:k,Ot=ct.group;pt.layers.test(B.layers)&&Jl(pt,I,B,xt,zt,Ot)}}function Jl(T,I,B,k,N,tt){T.onBeforeRender(_,I,B,k,N,tt),T.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),N.onBeforeRender(_,I,B,k,T,tt),N.transparent===!0&&N.side===Fe&&N.forceSinglePass===!1?(N.side=Oe,N.needsUpdate=!0,_.renderBufferDirect(B,I,k,N,T,tt),N.side=fi,N.needsUpdate=!0,_.renderBufferDirect(B,I,k,N,T,tt),N.side=Fe):_.renderBufferDirect(B,I,k,N,T,tt),T.onAfterRender(_,I,B,k,N,tt)}function vr(T,I,B){I.isScene!==!0&&(I=xe);const k=Lt.get(T),N=p.state.lights,tt=p.state.shadowsArray,ct=N.state.version,pt=Et.getParameters(T,N.state,tt,I,B),xt=Et.getProgramCacheKey(pt);let zt=k.programs;k.environment=T.isMeshStandardMaterial?I.environment:null,k.fog=I.fog,k.envMap=(T.isMeshStandardMaterial?O:w).get(T.envMap||k.environment),k.envMapRotation=k.environment!==null&&T.envMap===null?I.environmentRotation:T.envMapRotation,zt===void 0&&(T.addEventListener("dispose",Ht),zt=new Map,k.programs=zt);let Ot=zt.get(xt);if(Ot!==void 0){if(k.currentProgram===Ot&&k.lightsStateVersion===ct)return Ql(T,pt),Ot}else pt.uniforms=Et.getUniforms(T),T.onBeforeCompile(pt,_),Ot=Et.acquireProgram(pt,xt),zt.set(xt,Ot),k.uniforms=pt.uniforms;const Dt=k.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Dt.clippingPlanes=it.uniform),Ql(T,pt),k.needsLights=af(T),k.lightsStateVersion=ct,k.needsLights&&(Dt.ambientLightColor.value=N.state.ambient,Dt.lightProbe.value=N.state.probe,Dt.directionalLights.value=N.state.directional,Dt.directionalLightShadows.value=N.state.directionalShadow,Dt.spotLights.value=N.state.spot,Dt.spotLightShadows.value=N.state.spotShadow,Dt.rectAreaLights.value=N.state.rectArea,Dt.ltc_1.value=N.state.rectAreaLTC1,Dt.ltc_2.value=N.state.rectAreaLTC2,Dt.pointLights.value=N.state.point,Dt.pointLightShadows.value=N.state.pointShadow,Dt.hemisphereLights.value=N.state.hemi,Dt.directionalShadowMap.value=N.state.directionalShadowMap,Dt.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Dt.spotShadowMap.value=N.state.spotShadowMap,Dt.spotLightMatrix.value=N.state.spotLightMatrix,Dt.spotLightMap.value=N.state.spotLightMap,Dt.pointShadowMap.value=N.state.pointShadowMap,Dt.pointShadowMatrix.value=N.state.pointShadowMatrix),k.currentProgram=Ot,k.uniformsList=null,Ot}function $l(T){if(T.uniformsList===null){const I=T.currentProgram.getUniforms();T.uniformsList=lo.seqWithValue(I.seq,T.uniforms)}return T.uniformsList}function Ql(T,I){const B=Lt.get(T);B.outputColorSpace=I.outputColorSpace,B.batching=I.batching,B.batchingColor=I.batchingColor,B.instancing=I.instancing,B.instancingColor=I.instancingColor,B.instancingMorph=I.instancingMorph,B.skinning=I.skinning,B.morphTargets=I.morphTargets,B.morphNormals=I.morphNormals,B.morphColors=I.morphColors,B.morphTargetsCount=I.morphTargetsCount,B.numClippingPlanes=I.numClippingPlanes,B.numIntersection=I.numClipIntersection,B.vertexAlphas=I.vertexAlphas,B.vertexTangents=I.vertexTangents,B.toneMapping=I.toneMapping}function rf(T,I,B,k,N){I.isScene!==!0&&(I=xe),P.resetTextureUnits();const tt=I.fog,ct=k.isMeshStandardMaterial?I.environment:null,pt=R===null?_.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:xs,xt=(k.isMeshStandardMaterial?O:w).get(k.envMap||ct),zt=k.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Ot=!!B.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Dt=!!B.morphAttributes.position,te=!!B.morphAttributes.normal,oe=!!B.morphAttributes.color;let Re=ui;k.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Re=_.toneMapping);const we=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ie=we!==void 0?we.length:0,Ut=Lt.get(k),ze=p.state.lights;if(nt===!0&&(gt===!0||T!==x)){const We=T===x&&k.id===S;it.setState(k,T,We)}let ae=!1;k.version===Ut.__version?(Ut.needsLights&&Ut.lightsStateVersion!==ze.state.version||Ut.outputColorSpace!==pt||N.isBatchedMesh&&Ut.batching===!1||!N.isBatchedMesh&&Ut.batching===!0||N.isBatchedMesh&&Ut.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Ut.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Ut.instancing===!1||!N.isInstancedMesh&&Ut.instancing===!0||N.isSkinnedMesh&&Ut.skinning===!1||!N.isSkinnedMesh&&Ut.skinning===!0||N.isInstancedMesh&&Ut.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Ut.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Ut.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Ut.instancingMorph===!1&&N.morphTexture!==null||Ut.envMap!==xt||k.fog===!0&&Ut.fog!==tt||Ut.numClippingPlanes!==void 0&&(Ut.numClippingPlanes!==it.numPlanes||Ut.numIntersection!==it.numIntersection)||Ut.vertexAlphas!==zt||Ut.vertexTangents!==Ot||Ut.morphTargets!==Dt||Ut.morphNormals!==te||Ut.morphColors!==oe||Ut.toneMapping!==Re||Ut.morphTargetsCount!==ie)&&(ae=!0):(ae=!0,Ut.__version=k.version);let mn=Ut.currentProgram;ae===!0&&(mn=vr(k,I,N));let ki=!1,Qe=!1,Ls=!1;const _e=mn.getUniforms(),ln=Ut.uniforms;if(Pt.useProgram(mn.program)&&(ki=!0,Qe=!0,Ls=!0),k.id!==S&&(S=k.id,Qe=!0),ki||x!==T){Pt.buffers.depth.getReversed()?(rt.copy(T.projectionMatrix),ld(rt),cd(rt),_e.setValue(D,"projectionMatrix",rt)):_e.setValue(D,"projectionMatrix",T.projectionMatrix),_e.setValue(D,"viewMatrix",T.matrixWorldInverse);const je=_e.map.cameraPosition;je!==void 0&&je.setValue(D,Nt.setFromMatrixPosition(T.matrixWorld)),Kt.logarithmicDepthBuffer&&_e.setValue(D,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&_e.setValue(D,"isOrthographic",T.isOrthographicCamera===!0),x!==T&&(x=T,Qe=!0,Ls=!0)}if(N.isSkinnedMesh){_e.setOptional(D,N,"bindMatrix"),_e.setOptional(D,N,"bindMatrixInverse");const We=N.skeleton;We&&(We.boneTexture===null&&We.computeBoneTexture(),_e.setValue(D,"boneTexture",We.boneTexture,P))}N.isBatchedMesh&&(_e.setOptional(D,N,"batchingTexture"),_e.setValue(D,"batchingTexture",N._matricesTexture,P),_e.setOptional(D,N,"batchingIdTexture"),_e.setValue(D,"batchingIdTexture",N._indirectTexture,P),_e.setOptional(D,N,"batchingColorTexture"),N._colorsTexture!==null&&_e.setValue(D,"batchingColorTexture",N._colorsTexture,P));const cn=B.morphAttributes;if((cn.position!==void 0||cn.normal!==void 0||cn.color!==void 0)&&Ft.update(N,B,mn),(Qe||Ut.receiveShadow!==N.receiveShadow)&&(Ut.receiveShadow=N.receiveShadow,_e.setValue(D,"receiveShadow",N.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(ln.envMap.value=xt,ln.flipEnvMap.value=xt.isCubeTexture&&xt.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&I.environment!==null&&(ln.envMapIntensity.value=I.environmentIntensity),Qe&&(_e.setValue(D,"toneMappingExposure",_.toneMappingExposure),Ut.needsLights&&of(ln,Ls),tt&&k.fog===!0&&ht.refreshFogUniforms(ln,tt),ht.refreshMaterialUniforms(ln,k,V,K,p.state.transmissionRenderTarget[T.id]),lo.upload(D,$l(Ut),ln,P)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(lo.upload(D,$l(Ut),ln,P),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&_e.setValue(D,"center",N.center),_e.setValue(D,"modelViewMatrix",N.modelViewMatrix),_e.setValue(D,"normalMatrix",N.normalMatrix),_e.setValue(D,"modelMatrix",N.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const We=k.uniformsGroups;for(let je=0,bo=We.length;je<bo;je++){const _i=We[je];U.update(_i,mn),U.bind(_i,mn)}}return mn}function of(T,I){T.ambientLightColor.needsUpdate=I,T.lightProbe.needsUpdate=I,T.directionalLights.needsUpdate=I,T.directionalLightShadows.needsUpdate=I,T.pointLights.needsUpdate=I,T.pointLightShadows.needsUpdate=I,T.spotLights.needsUpdate=I,T.spotLightShadows.needsUpdate=I,T.rectAreaLights.needsUpdate=I,T.hemisphereLights.needsUpdate=I}function af(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(T,I,B){Lt.get(T.texture).__webglTexture=I,Lt.get(T.depthTexture).__webglTexture=B;const k=Lt.get(T);k.__hasExternalTextures=!0,k.__autoAllocateDepthBuffer=B===void 0,k.__autoAllocateDepthBuffer||jt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,I){const B=Lt.get(T);B.__webglFramebuffer=I,B.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(T,I=0,B=0){R=T,E=I,A=B;let k=!0,N=null,tt=!1,ct=!1;if(T){const xt=Lt.get(T);if(xt.__useDefaultFramebuffer!==void 0)Pt.bindFramebuffer(D.FRAMEBUFFER,null),k=!1;else if(xt.__webglFramebuffer===void 0)P.setupRenderTarget(T);else if(xt.__hasExternalTextures)P.rebindTextures(T,Lt.get(T.texture).__webglTexture,Lt.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Dt=T.depthTexture;if(xt.__boundDepthTexture!==Dt){if(Dt!==null&&Lt.has(Dt)&&(T.width!==Dt.image.width||T.height!==Dt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(T)}}const zt=T.texture;(zt.isData3DTexture||zt.isDataArrayTexture||zt.isCompressedArrayTexture)&&(ct=!0);const Ot=Lt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ot[I])?N=Ot[I][B]:N=Ot[I],tt=!0):T.samples>0&&P.useMultisampledRTT(T)===!1?N=Lt.get(T).__webglMultisampledFramebuffer:Array.isArray(Ot)?N=Ot[B]:N=Ot,L.copy(T.viewport),F.copy(T.scissor),z=T.scissorTest}else L.copy(Tt).multiplyScalar(V).floor(),F.copy(Vt).multiplyScalar(V).floor(),z=ne;if(Pt.bindFramebuffer(D.FRAMEBUFFER,N)&&k&&Pt.drawBuffers(T,N),Pt.viewport(L),Pt.scissor(F),Pt.setScissorTest(z),tt){const xt=Lt.get(T.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+I,xt.__webglTexture,B)}else if(ct){const xt=Lt.get(T.texture),zt=I||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,xt.__webglTexture,B||0,zt)}S=-1},this.readRenderTargetPixels=function(T,I,B,k,N,tt,ct){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let pt=Lt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ct!==void 0&&(pt=pt[ct]),pt){Pt.bindFramebuffer(D.FRAMEBUFFER,pt);try{const xt=T.texture,zt=xt.format,Ot=xt.type;if(!Kt.textureFormatReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Kt.textureTypeReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=T.width-k&&B>=0&&B<=T.height-N&&D.readPixels(I,B,k,N,Xt.convert(zt),Xt.convert(Ot),tt)}finally{const xt=R!==null?Lt.get(R).__webglFramebuffer:null;Pt.bindFramebuffer(D.FRAMEBUFFER,xt)}}},this.readRenderTargetPixelsAsync=async function(T,I,B,k,N,tt,ct){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let pt=Lt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ct!==void 0&&(pt=pt[ct]),pt){const xt=T.texture,zt=xt.format,Ot=xt.type;if(!Kt.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Kt.textureTypeReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(I>=0&&I<=T.width-k&&B>=0&&B<=T.height-N){Pt.bindFramebuffer(D.FRAMEBUFFER,pt);const Dt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Dt),D.bufferData(D.PIXEL_PACK_BUFFER,tt.byteLength,D.STREAM_READ),D.readPixels(I,B,k,N,Xt.convert(zt),Xt.convert(Ot),0);const te=R!==null?Lt.get(R).__webglFramebuffer:null;Pt.bindFramebuffer(D.FRAMEBUFFER,te);const oe=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await ad(D,oe,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Dt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,tt),D.deleteBuffer(Dt),D.deleteSync(oe),tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,I=null,B=0){T.isTexture!==!0&&(ls("WebGLRenderer: copyFramebufferToTexture function signature has changed."),I=arguments[0]||null,T=arguments[1]);const k=Math.pow(2,-B),N=Math.floor(T.image.width*k),tt=Math.floor(T.image.height*k),ct=I!==null?I.x:0,pt=I!==null?I.y:0;P.setTexture2D(T,0),D.copyTexSubImage2D(D.TEXTURE_2D,B,0,0,ct,pt,N,tt),Pt.unbindTexture()};const lf=D.createFramebuffer(),cf=D.createFramebuffer();this.copyTextureToTexture=function(T,I,B=null,k=null,N=0,tt=null){T.isTexture!==!0&&(ls("WebGLRenderer: copyTextureToTexture function signature has changed."),k=arguments[0]||null,T=arguments[1],I=arguments[2],tt=arguments[3]||0,B=null),tt===null&&(N!==0?(ls("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),tt=N,N=0):tt=0);let ct,pt,xt,zt,Ot,Dt,te,oe,Re;const we=T.isCompressedTexture?T.mipmaps[tt]:T.image;if(B!==null)ct=B.max.x-B.min.x,pt=B.max.y-B.min.y,xt=B.isBox3?B.max.z-B.min.z:1,zt=B.min.x,Ot=B.min.y,Dt=B.isBox3?B.min.z:0;else{const cn=Math.pow(2,-N);ct=Math.floor(we.width*cn),pt=Math.floor(we.height*cn),T.isDataArrayTexture?xt=we.depth:T.isData3DTexture?xt=Math.floor(we.depth*cn):xt=1,zt=0,Ot=0,Dt=0}k!==null?(te=k.x,oe=k.y,Re=k.z):(te=0,oe=0,Re=0);const ie=Xt.convert(I.format),Ut=Xt.convert(I.type);let ze;I.isData3DTexture?(P.setTexture3D(I,0),ze=D.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(P.setTexture2DArray(I,0),ze=D.TEXTURE_2D_ARRAY):(P.setTexture2D(I,0),ze=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,I.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,I.unpackAlignment);const ae=D.getParameter(D.UNPACK_ROW_LENGTH),mn=D.getParameter(D.UNPACK_IMAGE_HEIGHT),ki=D.getParameter(D.UNPACK_SKIP_PIXELS),Qe=D.getParameter(D.UNPACK_SKIP_ROWS),Ls=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,we.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,we.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,zt),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ot),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Dt);const _e=T.isDataArrayTexture||T.isData3DTexture,ln=I.isDataArrayTexture||I.isData3DTexture;if(T.isDepthTexture){const cn=Lt.get(T),We=Lt.get(I),je=Lt.get(cn.__renderTarget),bo=Lt.get(We.__renderTarget);Pt.bindFramebuffer(D.READ_FRAMEBUFFER,je.__webglFramebuffer),Pt.bindFramebuffer(D.DRAW_FRAMEBUFFER,bo.__webglFramebuffer);for(let _i=0;_i<xt;_i++)_e&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Lt.get(T).__webglTexture,N,Dt+_i),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Lt.get(I).__webglTexture,tt,Re+_i)),D.blitFramebuffer(zt,Ot,ct,pt,te,oe,ct,pt,D.DEPTH_BUFFER_BIT,D.NEAREST);Pt.bindFramebuffer(D.READ_FRAMEBUFFER,null),Pt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(N!==0||T.isRenderTargetTexture||Lt.has(T)){const cn=Lt.get(T),We=Lt.get(I);Pt.bindFramebuffer(D.READ_FRAMEBUFFER,lf),Pt.bindFramebuffer(D.DRAW_FRAMEBUFFER,cf);for(let je=0;je<xt;je++)_e?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,cn.__webglTexture,N,Dt+je):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,cn.__webglTexture,N),ln?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,We.__webglTexture,tt,Re+je):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,We.__webglTexture,tt),N!==0?D.blitFramebuffer(zt,Ot,ct,pt,te,oe,ct,pt,D.COLOR_BUFFER_BIT,D.NEAREST):ln?D.copyTexSubImage3D(ze,tt,te,oe,Re+je,zt,Ot,ct,pt):D.copyTexSubImage2D(ze,tt,te,oe,zt,Ot,ct,pt);Pt.bindFramebuffer(D.READ_FRAMEBUFFER,null),Pt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else ln?T.isDataTexture||T.isData3DTexture?D.texSubImage3D(ze,tt,te,oe,Re,ct,pt,xt,ie,Ut,we.data):I.isCompressedArrayTexture?D.compressedTexSubImage3D(ze,tt,te,oe,Re,ct,pt,xt,ie,we.data):D.texSubImage3D(ze,tt,te,oe,Re,ct,pt,xt,ie,Ut,we):T.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,tt,te,oe,ct,pt,ie,Ut,we.data):T.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,tt,te,oe,we.width,we.height,ie,we.data):D.texSubImage2D(D.TEXTURE_2D,tt,te,oe,ct,pt,ie,Ut,we);D.pixelStorei(D.UNPACK_ROW_LENGTH,ae),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,mn),D.pixelStorei(D.UNPACK_SKIP_PIXELS,ki),D.pixelStorei(D.UNPACK_SKIP_ROWS,Qe),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ls),tt===0&&I.generateMipmaps&&D.generateMipmap(ze),Pt.unbindTexture()},this.copyTextureToTexture3D=function(T,I,B=null,k=null,N=0){return T.isTexture!==!0&&(ls("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,k=arguments[1]||null,T=arguments[2],I=arguments[3],N=arguments[4]||0),ls('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,I,B,k,N)},this.initRenderTarget=function(T){Lt.get(T).__webglFramebuffer===void 0&&P.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?P.setTextureCube(T,0):T.isData3DTexture?P.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?P.setTexture2DArray(T,0):P.setTexture2D(T,0),Pt.unbindTexture()},this.resetState=function(){E=0,A=0,R=null,Pt.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ee._getDrawingBufferColorSpace(t),e.unpackColorSpace=ee._getUnpackColorSpace()}}const Bu={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Ps{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const a_=new Gl(-1,1,1,-1,0,1);class l_ extends pe{constructor(){super(),this.setAttribute("position",new fe([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new fe([0,2,0,0,2,0],2))}}const c_=new l_;class Hl{constructor(t){this._mesh=new kt(c_,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,a_)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class ml extends Ps{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof le?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=ys.clone(t.uniforms),this.material=new le({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Hl(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class ph extends Ps{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const i=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class h_ extends Ps{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class u_{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new et);this._width=n.width,this._height=n.height,e=new En(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:jn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ml(Bu),this.copyPass.material.blending=Zn,this.clock=new Uu}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let i=0,r=this.passes.length;i<r;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}ph!==void 0&&(o instanceof ph?n=!0:o instanceof h_&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new et);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class f_ extends Ps{constructor(t,e,n=null,i=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new j}render(t,e,n){const i=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=i}}const d_={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new j(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Ss extends Ps{constructor(t,e,n,i){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=i,this.resolution=t!==void 0?new et(t.x,t.y):new et(256,256),this.clearColor=new j(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new En(r,o,{type:jn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const f=new En(r,o,{type:jn});f.texture.name="UnrealBloomPass.h"+u,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const d=new En(r,o,{type:jn});d.texture.name="UnrealBloomPass.v"+u,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),r=Math.round(r/2),o=Math.round(o/2)}const a=d_;this.highPassUniforms=ys.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new le({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new et(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=Bu;this.copyUniforms=ys.clone(h.uniforms),this.blendMaterial=new le({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:on,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new j,this.oldClearAlpha=1,this.basic=new di,this.fsQuad=new Hl(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),i=Math.round(e/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new et(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(t,e,n,i,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Ss.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Ss.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new le({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new et(.5,.5)},direction:{value:new et(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(t){return new le({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Ss.BlurDirectionX=new et(1,0);Ss.BlurDirectionY=new et(0,1);const p_={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class m_ extends Ps{constructor(){super();const t=p_;this.uniforms=ys.clone(t.uniforms),this.material=new vp({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Hl(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},ee.getTransfer(this._outputColorSpace)===he&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Yh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Zh?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===jh?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Sl?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Kh?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Jh&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const ku=1337,Me={skyTop:7321576,skyHorizon:16180152,sun:16773583,fog:14933184,grass:6988870,grassDry:10465372,grassLush:5018688,dirt:9071430,rock:9407360,sand:14272410,trunk:7032634,trunkLight:8808524,leafA:7319102,leafB:9224783,leafC:5214010,leafAutumn:14260798,water:3112564,waterDeep:1923926},Mt={chunkSize:64,viewChunks:4,terrainRes:18,waterLevel:-3.4,fogNear:150,fogFar:245},se={radius:.42,groundClearance:.28,runSpeed:17.2,sprintSpeed:24,turnResponse:15,slopeBoost:.35,jumpSpeed:11.8,leapForward:8.8,gravity:24,coyoteTime:.22,jumpBuffer:.22,glideGravity:5.05,glideForward:20.8,glideMaxSpeed:40,glideTurn:1.55,glidePitchDive:10.8,glideLift:.86,climbSpeed:10,autoClimbDist:3.3,autoClimbDot:.2,branchRunSpeed:13,swimSpeed:9.3,buoyancy:10,diveSpeed:6.5},Je={distance:7,height:2.85,minDistance:3.2,maxDistance:13,fov:64,autoAlignRate:2.25,mouseSensitivity:.0024,touchSensitivity:.0052,pitchMin:-.58,pitchMax:1.08,collisionPad:.58},g_={uniforms:{tDiffuse:{value:null},uSun:{value:new et(.5,.85)},uIntensity:{value:0},uColor:{value:new j(Me.sun)}},vertexShader:`
    varying vec2 vUv;
    void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
  `,fragmentShader:`
    varying vec2 vUv;
    uniform sampler2D tDiffuse;
    uniform vec2 uSun;
    uniform float uIntensity;
    uniform vec3 uColor;
    void main(){
      vec3 base = texture2D(tDiffuse, vUv).rgb;
      if (uIntensity <= 0.001) { gl_FragColor = vec4(base, 1.0); return; }
      vec2 dir = (uSun - vUv);
      const int N = 16;
      vec2 stp = dir / float(N) * 0.85;
      vec2 uv = vUv;
      float decay = 1.0;
      vec3 accum = vec3(0.0);
      for (int i = 0; i < N; i++) {
        uv += stp;
        vec3 s = texture2D(tDiffuse, clamp(uv, 0.0, 1.0)).rgb;
        // only near-white highlights (sky core through the canopy) make shafts
        float l = max(0.0, max(s.r, max(s.g, s.b)) - 0.78);
        accum += s * l * decay;
        decay *= 0.9;
      }
      accum /= float(N);
      // soft-clamp so shafts add glow without ever washing the frame out
      accum = accum / (accum + 0.5);
      vec3 col = base + accum * uColor * uIntensity;
      gl_FragColor = vec4(col, 1.0);
    }
  `},v_={uniforms:{tDiffuse:{value:null},uVignette:{value:.32},uWarm:{value:new j(16767392)},uWarmAmt:{value:.08},uSat:{value:1.2}},vertexShader:`
    varying vec2 vUv;
    void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
  `,fragmentShader:`
    varying vec2 vUv;
    uniform sampler2D tDiffuse;
    uniform float uVignette, uWarmAmt, uSat;
    uniform vec3 uWarm;
    void main(){
      vec3 c = texture2D(tDiffuse, vUv).rgb;
      float l = dot(c, vec3(0.2126,0.7152,0.0722));
      // cinematic split-tone: cool shadows, warm highlights
      vec3 cool = vec3(0.74, 0.84, 1.0);
      vec3 warm = vec3(1.0, 0.88, 0.66);
      vec3 tone = mix(cool, warm, smoothstep(0.15, 0.85, l));
      c *= mix(vec3(1.0), tone, 0.14);
      // saturation
      l = dot(c, vec3(0.2126,0.7152,0.0722));
      c = mix(vec3(l), c, uSat);
      // gentle filmic contrast
      c = mix(c, c * c * (3.0 - 2.0 * c), 0.18);
      // vignette
      vec2 d = vUv - 0.5;
      float v = smoothstep(0.9, 0.22, dot(d,d) * 2.0);
      c *= mix(1.0, v, uVignette); c = pow(clamp(c * 1.05, 0.0, 1.0), vec3(0.96));
      gl_FragColor = vec4(c, 1.0);
    }
  `};class __{constructor(t){this.container=t,this.renderer=new o_({antialias:!0,powerPreference:"high-performance",stencil:!1,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.45)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Xh,this.renderer.toneMapping=Sl,this.renderer.toneMappingExposure=.99,this.renderer.outputColorSpace=$e,t.appendChild(this.renderer.domElement),this.scene=new Ld,this.scene.background=new j(Me.skyHorizon),this.scene.fog=new Dl(Me.fog,Mt.fogNear,Mt.fogFar),this.camera=new nn(Je.fov,window.innerWidth/window.innerHeight,.1,900),this.camera.position.set(0,6,12),this._buildComposer(),this.clock=new Uu,window.addEventListener("resize",()=>this.resize())}_buildComposer(){const t=this.renderer.getSize(new et);this.composer=new u_(this.renderer),this.composer.addPass(new f_(this.scene,this.camera)),this.bloom=new Ss(t,.3,.58,.9),this.composer.addPass(this.bloom),this.composer.addPass(new m_),this.godrays=new ml(g_),this.composer.addPass(this.godrays),this.grade=new ml(v_),this.composer.addPass(this.grade)}resize(){const t=window.innerWidth,e=window.innerHeight;this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,e),this.composer.setSize(t,e)}render(){this.composer.render()}}class x_{constructor(t){this.canvas=t,this.move=new et,this.look=new et,this.zoom=0,this.sprint=!1,this.action=!1,this._actionEdge=!1,this.keys=new Set,this.locked=!1,this.isTouch=!1,this._initKeyboard(),this._initMouse(),this._initTouch()}consumeActionEdge(){const t=this._actionEdge;return this._actionEdge=!1,t}consumeLook(t){return t.copy(this.look),this.look.set(0,0),t}consumeZoom(){const t=this.zoom;return this.zoom=0,t}_setAction(t){t&&!this.action&&(this._actionEdge=!0),this.action=t}_initKeyboard(){const t=e=>e.code;window.addEventListener("keydown",e=>{this.keys.add(t(e)),e.code==="Space"&&(this._setAction(!0),e.preventDefault()),(e.code==="ShiftLeft"||e.code==="ShiftRight")&&(this.sprint=!0),this._updateKeyMove()}),window.addEventListener("keyup",e=>{this.keys.delete(t(e)),e.code==="Space"&&this._setAction(!1),(e.code==="ShiftLeft"||e.code==="ShiftRight")&&(this.sprint=!1),this._updateKeyMove()})}_updateKeyMove(){if(this.isTouch&&this._moveTouchId!==null)return;let t=0,e=0;(this.keys.has("KeyW")||this.keys.has("ArrowUp"))&&(e+=1),(this.keys.has("KeyS")||this.keys.has("ArrowDown"))&&(e-=1),(this.keys.has("KeyD")||this.keys.has("ArrowRight"))&&(t+=1),(this.keys.has("KeyA")||this.keys.has("ArrowLeft"))&&(t-=1),this.move.set(t,e),this.move.lengthSq()>1&&this.move.normalize()}_initMouse(){const t=this.canvas;t.addEventListener("click",()=>{!this.locked&&!this.isTouch&&t.requestPointerLock?.()}),document.addEventListener("pointerlockchange",()=>{this.locked=document.pointerLockElement===t}),window.addEventListener("mousemove",e=>{this.locked&&(this.look.x+=e.movementX,this.look.y+=e.movementY)}),window.addEventListener("wheel",e=>{this.zoom+=Math.sign(e.deltaY)},{passive:!0})}_initTouch(){this._moveTouchId=null,this._lookTouchId=null,this._moveOrigin=new et,this._lookPrev=new et;const t=64,e=o=>{this.isTouch=!0;for(const a of o.changedTouches){const l=a.clientX<window.innerWidth*.5;if(l&&this._moveTouchId===null)this._moveTouchId=a.identifier,this._moveOrigin.set(a.clientX,a.clientY),this.move.set(0,0);else if(!l&&this._lookTouchId===null){this._lookTouchId=a.identifier,this._lookPrev.set(a.clientX,a.clientY);const c=performance.now();c-(this._lastRightTap||0)<280&&this._setAction(!0),this._lastRightTap=c}}o.preventDefault()},n=o=>{for(const a of o.changedTouches)if(a.identifier===this._moveTouchId){let l=a.clientX-this._moveOrigin.x,c=a.clientY-this._moveOrigin.y;const h=Math.hypot(l,c);h>t*1.6&&(this._moveOrigin.x+=l*(1-t*1.6/h),this._moveOrigin.y+=c*(1-t*1.6/h),l=a.clientX-this._moveOrigin.x,c=a.clientY-this._moveOrigin.y),this.move.set(yt.clamp(l/t,-1,1),yt.clamp(-c/t,-1,1)),this.move.lengthSq()>1&&this.move.normalize()}else a.identifier===this._lookTouchId&&(this.look.x+=(a.clientX-this._lookPrev.x)*2,this.look.y+=(a.clientY-this._lookPrev.y)*2,this._lookPrev.set(a.clientX,a.clientY));o.preventDefault()},i=o=>{for(const a of o.changedTouches)a.identifier===this._moveTouchId?(this._moveTouchId=null,this.move.set(0,0)):a.identifier===this._lookTouchId&&(this._lookTouchId=null,this._setAction(!1))},r={passive:!1};this.canvas.addEventListener("touchstart",e,r),this.canvas.addEventListener("touchmove",n,r),window.addEventListener("touchend",i),window.addEventListener("touchcancel",i)}}const mh=[{chord:[220,277.18,329.63,415.3],scale:[440,554.4,659.3,830.6,880,1108.7],rate:[1.8,4.6],vol:.052},{chord:[174.61,261.63,329.63,392],scale:[392,440,523.3,587.3,659.3,784],rate:[2.2,5.2],vol:.056},{chord:[220,261.63,329.63,392],scale:[261.6,329.6,392,440,523.3,659.3],rate:[2.8,6.4],vol:.05},{chord:[164.81,246.94,329.63,493.88],scale:[784,987.8,1174.7,1318.5,1568],rate:[4.8,10.5],vol:.044}];class M_{constructor(){this.ctx=null,this.started=!1,this._birdT=0,this._melodyT=3.5,this._seasonT=0}start(){if(this.started)return;const t=window.AudioContext||window.webkitAudioContext;if(!t)return;this.ctx=new t,this.started=!0;const e=this.ctx;this.master=e.createGain(),this.master.gain.value=0,this.master.connect(e.destination),this.master.gain.linearRampToValueAtTime(.32,e.currentTime+3);const n=2*e.sampleRate,i=e.createBuffer(1,n,e.sampleRate),r=i.getChannelData(0);let o=0;for(let f=0;f<n;f++){const d=Math.random()*2-1;o=(o+.02*d)/1.02,r[f]=o*3.2}this.noise=e.createBufferSource(),this.noise.buffer=i,this.noise.loop=!0,this.windFilter=e.createBiquadFilter(),this.windFilter.type="lowpass",this.windFilter.frequency.value=480,this.windGain=e.createGain(),this.windGain.gain.value=.5,this.noise.connect(this.windFilter).connect(this.windGain).connect(this.master);const a=e.createOscillator();a.frequency.value=.07;const l=e.createGain();l.gain.value=.28,a.connect(l).connect(this.windGain.gain),a.start(),this.noise.start(),this.waterFilter=e.createBiquadFilter(),this.waterFilter.type="bandpass",this.waterFilter.frequency.value=900,this.waterFilter.Q.value=.7,this.waterGain=e.createGain(),this.waterGain.gain.value=0,this.noise.connect(this.waterFilter).connect(this.waterGain).connect(this.master),this.rainFilter=e.createBiquadFilter(),this.rainFilter.type="highpass",this.rainFilter.frequency.value=1100,this.rainGain=e.createGain(),this.rainGain.gain.value=0,this.noise.connect(this.rainFilter).connect(this.rainGain).connect(this.master),this.padGain=e.createGain(),this.padGain.gain.value=.06,this.padGain.connect(this.master);const c=[146.83,220,293.66,440];this.padOscs=c.map((f,d)=>{const m=e.createOscillator();m.type="sine",m.frequency.value=f;const v=e.createGain();v.gain.value=.25/(d+1);const g=e.createOscillator();g.frequency.value=.05+d*.013;const p=e.createGain();return p.gain.value=1.5,g.connect(p).connect(m.detune),g.start(),m.connect(v).connect(this.padGain),m.start(),m}),this.wispGain=e.createGain(),this.wispGain.gain.value=0,this.wispGain.connect(this.master),[1318.5,1567.98,1975.53].forEach((f,d)=>{const m=e.createOscillator();m.type="sine",m.frequency.value=f;const v=e.createGain();v.gain.value=.5/(d+1);const g=e.createOscillator();g.frequency.value=4.5+d*.8;const p=e.createGain();p.gain.value=.4,g.connect(p).connect(v.gain),g.start(),m.connect(v).connect(this.wispGain),m.start()}),this.cozyGain=e.createGain(),this.cozyGain.gain.value=0,this.cozyGain.connect(this.master),[110,164.81,220].forEach((f,d)=>{const m=e.createOscillator();m.type=d===0?"sine":"triangle",m.frequency.value=f;const v=e.createGain();v.gain.value=.4/(d+1),m.connect(v).connect(this.cozyGain),m.start()});const h=Math.floor(.4*e.sampleRate);this._puffBuf=e.createBuffer(1,h,e.sampleRate);const u=this._puffBuf.getChannelData(0);for(let f=0;f<h;f++)u[f]=(Math.random()*2-1)*(1-f/h)}wisp(t,e){!this.started||!this.ctx||this.wispGain.gain.setTargetAtTime(e*e*.05,this.ctx.currentTime,.2)}wispDart(){if(!this.started||!this.ctx)return;const t=[880,1046.5,1318.5,1567.98];this._bell(.05,t[Math.random()*2|0]),setTimeout(()=>this._bell(.045,t[2+(Math.random()*2|0)]),95)}puff(){if(!this.started||!this.ctx)return;const t=this.ctx,e=t.currentTime,n=t.createBufferSource();n.buffer=this._puffBuf;const i=t.createBiquadFilter();i.type="bandpass",i.frequency.value=1400+Math.random()*700,i.Q.value=.8;const r=t.createGain();r.gain.value=0,n.connect(i).connect(r).connect(this.master),r.gain.setValueAtTime(0,e),r.gain.linearRampToValueAtTime(.05,e+.03),r.gain.exponentialRampToValueAtTime(8e-4,e+.35),n.start(e),n.stop(e+.4)}setCozy(t){!this.started||!this.ctx||(this.cozyGain.gain.setTargetAtTime(t*.09,this.ctx.currentTime,.4),this.padGain.gain.setTargetAtTime(.06+t*.06,this.ctx.currentTime,.5))}_bell(t,e){const n=this.ctx,i=n.currentTime,r=n.createGain();r.gain.value=0;const o=n.createStereoPanner?n.createStereoPanner():null;o?(o.pan.value=Math.random()*1.4-.7,r.connect(o).connect(this.master)):r.connect(this.master),[1,2,3].forEach((a,l)=>{const c=n.createOscillator();c.type="sine",c.frequency.value=e*a;const h=n.createGain();h.gain.value=l===0?1:.28/l,c.connect(h).connect(r),c.start(i),c.stop(i+2.2)}),r.gain.setValueAtTime(0,i),r.gain.linearRampToValueAtTime(t,i+.02),r.gain.exponentialRampToValueAtTime(8e-4,i+1.8+Math.random())}flowerChime(){if(!this.started||!this.ctx)return;const t=[523.3,587.3,659.3,784,880,1046.5,1174.7];this._bell(.035+Math.random()*.025,t[Math.random()*t.length|0])}glide(t,e,n){if(!this.started||!this.ctx)return;const i=e?Math.min(1,Math.max(0,(n-11)/18)):0;if(this._chimeT=(this._chimeT||0)-t,i>.12&&this._chimeT<=0){this._chimeT=.25+Math.random()*(1.6-i*1.2);const r=[261.6,293.7,329.6,392,440,523.3,587.3],o=r[Math.random()*r.length|0]*(Math.random()<.3?2:1);this._bell(.05+i*.14,o)}}_chirp(){const t=this.ctx,e=t.currentTime,n=t.createStereoPanner?t.createStereoPanner():null,i=t.createGain();i.gain.value=0,n?n.connect(this.master):i.connect(this.master),n&&(i.connect(n),n.pan.value=Math.random()*1.6-.8);const r=2+(Math.random()*3|0),o=1800+Math.random()*1600;for(let a=0;a<r;a++){const l=t.createOscillator();l.type="sine";const c=e+a*(.07+Math.random()*.05),h=o*(1+(Math.random()-.5)*.3);l.frequency.setValueAtTime(h*.8,c),l.frequency.exponentialRampToValueAtTime(h,c+.04),l.frequency.exponentialRampToValueAtTime(h*.9,c+.09);const u=t.createGain();u.gain.setValueAtTime(0,c),u.gain.linearRampToValueAtTime(.18,c+.01),u.gain.exponentialRampToValueAtTime(.001,c+.11),l.connect(u).connect(i),l.start(c),l.stop(c+.13)}i.gain.setValueAtTime(.5,e)}update(t,e,n,i=0,r=1){if(!this.started||!this.ctx)return;const o=this.ctx;this.rainGain.gain.setTargetAtTime(i*.5,o.currentTime,.4);const a=e==="air"?Math.min(1,Math.max(0,(n-8)/22)):0,l=.5+a*1.1;this.windGain.gain.setTargetAtTime(l,o.currentTime,.3),this.windFilter.frequency.setTargetAtTime(480+a*1400,o.currentTime,.3),this.waterGain.gain.setTargetAtTime(e==="swim"?.5:0,o.currentTime,.25);const c=Math.max(0,Math.min(3,r)),h=Math.min(Math.floor(c),2),u=c-h,f=mh[h],d=mh[h+1];if(this._seasonT-=t,this._seasonT<=0){this._seasonT=.5;for(let m=0;m<this.padOscs.length;m++){const v=f.chord[m]*(1-u)+d.chord[m]*u;this.padOscs[m].frequency.setTargetAtTime(v,o.currentTime,1.5)}}if(this._melodyT-=t,this._melodyT<=0){const m=u<.5?f:d;if(a<.4){if(this._melodyT=m.rate[0]+Math.random()*(m.rate[1]-m.rate[0]),Math.random()<.85){const v=m.scale[Math.random()*m.scale.length|0];this._bell(m.vol*(.7+Math.random()*.6),v)}}else this._melodyT=1.2}this._birdT-=t,this._birdT<=0&&(this._birdT=2.5+Math.random()*6,a<.3&&Math.random()<.7&&this._chirp())}}class wo extends kt{constructor(){const t=wo.SkyShader,e=new le({name:t.name,uniforms:ys.clone(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:Oe,depthWrite:!1});super(new As(1,1,1),e),this.isSky=!0}}wo.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new C},up:{value:new C(0,1,0)}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;
		uniform vec3 up;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calcuation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( dot( vSunDirection, up ) );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorbtion + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform vec3 up;

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPosition );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
			L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

			vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

			vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

			gl_FragColor = vec4( retColor, 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};const Ke=[{e:-16,sunI:0,sunC:3820152,hemiI:.5,hSky:4873876,hGnd:2633791,fog:2305878,star:1,skyMul:.05},{e:-5,sunI:.5,sunC:16742980,hemiI:.54,hSky:5925524,hGnd:3024688,fog:5915224,star:.5,skyMul:.3},{e:4,sunI:2.3,sunC:16755808,hemiI:.58,hSky:10138326,hGnd:4867632,fog:15123618,star:0,skyMul:.82},{e:18,sunI:2.7,sunC:16769708,hemiI:.64,hSky:11850474,hGnd:4609327,fog:10926484,star:0,skyMul:.92},{e:40,sunI:2.7,sunC:16772814,hemiI:.7,hSky:11324650,hGnd:5134390,fog:10400655,star:0,skyMul:1}],y_=new j,S_=new j,gh=new j;function w_(s){let t=Ke[0],e=Ke[Ke.length-1];for(let r=0;r<Ke.length-1;r++)if(s>=Ke[r].e&&s<=Ke[r+1].e){t=Ke[r],e=Ke[r+1];break}s<Ke[0].e&&(t=e=Ke[0]),s>Ke[Ke.length-1].e&&(t=e=Ke[Ke.length-1]);const n=t===e?0:(s-t.e)/(e.e-t.e),i=r=>t[r]+(e[r]-t[r])*n;return{sunI:i("sunI"),hemiI:i("hemiI"),star:i("star"),skyMul:i("skyMul"),sunC:y_.set(t.sunC).lerp(S_.set(e.sunC),n).clone(),hSky:new j(t.hSky).lerp(new j(e.hSky),n),hGnd:new j(t.hGnd).lerp(new j(e.hGnd),n),fog:new j(t.fog).lerp(new j(e.fog),n)}}class T_{constructor(t,e={}){this.scene=t,this.time=e.startTime??.32,this.dayLength=e.dayLength??260,this.peakElevation=36,this.sky=new wo,this.sky.scale.setScalar(45e4);const n=this.sky.material.uniforms;n.turbidity.value=3.3,n.rayleigh.value=2.9,n.mieCoefficient.value=.0035,n.mieDirectionalG.value=.82;const i=this.sky.material;i.fragmentShader=`uniform float uNightDim;
`+i.fragmentShader.replace("gl_FragColor = vec4( retColor, 1.0 );","gl_FragColor = vec4( retColor * uNightDim, 1.0 );"),i.uniforms.uNightDim={value:1},i.needsUpdate=!0,t.add(this.sky),this.sunDir=new C(0,1,0),this.moonDir=new C(0,1,0),this.cloudTint=new j(16777215),this.sun=new Gc(16773583,3),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(1024,1024),this.sun.shadow.camera.near=1,this.sun.shadow.camera.far=160;const r=60;Object.assign(this.sun.shadow.camera,{left:-r,right:r,top:r,bottom:-r}),this.sun.shadow.bias=-6e-4,this.sun.shadow.normalBias=.6,this.sun.shadow.radius=3,t.add(this.sun,this.sun.target),this.hemi=new Mp(12376300,4872755,.7),t.add(this.hemi),this.fill=new Gc(11126015,.25),t.add(this.fill),this._buildStars(),this._buildMoon(),this._shadowDist=70}setTime(t){this.time=(t%1+1)%1}_buildStars(){const n=new Float32Array(4500),i=new Float32Array(1500);for(let o=0;o<1500;o++){const a=Math.random(),l=Math.random()*.86,c=a*Math.PI*2,h=Math.acos(1-l);n[o*3]=820*Math.sin(h)*Math.cos(c),n[o*3+1]=820*Math.cos(h),n[o*3+2]=820*Math.sin(h)*Math.sin(c),i[o]=2+Math.random()*3.5}const r=new pe;r.setAttribute("position",new Gt(n,3)),r.setAttribute("aSize",new Gt(i,1)),this.starMat=new le({uniforms:{uOpacity:{value:0}},transparent:!0,depthWrite:!1,depthTest:!0,blending:on,fog:!1,vertexShader:`attribute float aSize; uniform float uOpacity; varying float vO;
        void main(){ vO=uOpacity; vec4 mv=modelViewMatrix*vec4(position,1.0);
        gl_PointSize=aSize*(1.0+0.4*sin(position.x*12.3+position.z));
        gl_Position=projectionMatrix*mv; }`,fragmentShader:`varying float vO; void main(){ vec2 d=gl_PointCoord-0.5;
        float a=smoothstep(0.5,0.0,length(d)); gl_FragColor=vec4(vec3(1.0,0.98,0.9), a*vO); }`}),this.stars=new Bi(r,this.starMat),this.stars.frustumCulled=!1,this.stars.renderOrder=-1,this.scene.add(this.stars)}_buildMoon(){this.moon=new ge;const t=new kt(new Le(18,24,24),new di({color:15921376,fog:!1})),e=new kt(new Le(30,24,24),new di({color:12374271,transparent:!0,opacity:.25,fog:!1,blending:on,side:Oe}));this.moon.add(t,e),this.moonMat=t.material,this.moonGlow=e.material,this.moon.renderOrder=-1,this.scene.add(this.moon)}update(t,e,n,i=0){const dNight=this.dayAmount<.16?3.2:this.dayAmount<.34?1.8:1;this.time=(this.time+t*dNight/this.dayLength)%1;const r=Math.PI*2,o=this.peakElevation*.92*Math.sin((this.time-.25)*r)+4.5;this.sunElev=o;const a=90+this.time*300;this._dir(o,a,this.sunDir);const l=this.peakElevation*.8*Math.sin((this.time+.25)*r);this._dir(l,a+180,this.moonDir),this.dayAmount=yt.clamp((o+3)/12.5,0,1);const c=w_(o);this.sky.position.copy(n),this.sky.material.uniforms.sunPosition.value.copy(this.sunDir),this.sky.material.uniforms.rayleigh.value=1.6+c.skyMul*1.4,this.sky.material.uniforms.mieCoefficient.value=.003+(1-c.skyMul)*.004,this.sky.material.uniforms.uNightDim.value=Math.max(.07,c.skyMul)*.9,this.sun.color.copy(c.sunC),this.sun.intensity=c.sunI*(1-i*.5),this.sun.position.copy(e).addScaledVector(this.sunDir,this._shadowDist),this.sun.target.position.copy(e),this.sun.target.updateMatrixWorld(),this.sun.castShadow=c.sunI>.4,this.hemi.color.copy(c.hSky),this.hemi.groundColor.copy(c.hGnd),this.hemi.intensity=c.hemiI,this.fill.color.copy(c.hSky),this.fill.intensity=.16+c.skyMul*.22,this.fill.position.copy(e).addScaledVector(this.moonDir,40),gh.set(10133404).multiplyScalar(.35+this.dayAmount*.65),this.scene.fog&&this.scene.fog.color.copy(c.fog).lerp(gh,i*.5),this.scene.background&&this.scene.background.copy(this.scene.fog.color),this.cloudTint.set(16777215).lerp(c.sunC,.4).multiplyScalar(.18+this.dayAmount*.82),this.starMat.uniforms.uOpacity.value=c.star,this.stars.position.copy(n),this.stars.rotation.y+=t*.006,this.moon.position.copy(n).addScaledVector(this.moonDir,700);const h=yt.clamp((l+4)/12,0,1);this.moonMat.opacity=h,this.moonMat.transparent=!0,this.moonGlow.opacity=h*.25,this.moon.visible=h>.01}_dir(t,e,n){const i=yt.degToRad(90-t),r=yt.degToRad(e);return n.setFromSphericalCoords(1,i,r),n}}const Gu=Math.sqrt(3),b_=.5*(Gu-1),Hs=(3-Gu)/6,E_=1/3,Pn=1/6,nr=s=>Math.floor(s)|0,vh=new Float64Array([1,1,-1,1,1,-1,-1,-1,1,0,-1,0,1,0,-1,0,0,1,0,-1,0,1,0,-1]),aa=new Float64Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]);function Vu(s=Math.random){const t=Hu(s),e=new Float64Array(t).map(i=>vh[i%12*2]),n=new Float64Array(t).map(i=>vh[i%12*2+1]);return function(r,o){let a=0,l=0,c=0;const h=(r+o)*b_,u=nr(r+h),f=nr(o+h),d=(u+f)*Hs,m=u-d,v=f-d,g=r-m,p=o-v;let M,y;g>p?(M=1,y=0):(M=0,y=1);const _=g-M+Hs,b=p-y+Hs,E=g-1+2*Hs,A=p-1+2*Hs,R=u&255,S=f&255;let x=.5-g*g-p*p;if(x>=0){const z=R+t[S],G=e[z],W=n[z];x*=x,a=x*x*(G*g+W*p)}let L=.5-_*_-b*b;if(L>=0){const z=R+M+t[S+y],G=e[z],W=n[z];L*=L,l=L*L*(G*_+W*b)}let F=.5-E*E-A*A;if(F>=0){const z=R+1+t[S+1],G=e[z],W=n[z];F*=F,c=F*F*(G*E+W*A)}return 70*(a+l+c)}}function A_(s=Math.random){const t=Hu(s),e=new Float64Array(t).map(r=>aa[r%12*3]),n=new Float64Array(t).map(r=>aa[r%12*3+1]),i=new Float64Array(t).map(r=>aa[r%12*3+2]);return function(o,a,l){let c,h,u,f;const d=(o+a+l)*E_,m=nr(o+d),v=nr(a+d),g=nr(l+d),p=(m+v+g)*Pn,M=m-p,y=v-p,_=g-p,b=o-M,E=a-y,A=l-_;let R,S,x,L,F,z;b>=E?E>=A?(R=1,S=0,x=0,L=1,F=1,z=0):b>=A?(R=1,S=0,x=0,L=1,F=0,z=1):(R=0,S=0,x=1,L=1,F=0,z=1):E<A?(R=0,S=0,x=1,L=0,F=1,z=1):b<A?(R=0,S=1,x=0,L=0,F=1,z=1):(R=0,S=1,x=0,L=1,F=1,z=0);const G=b-R+Pn,W=E-S+Pn,q=A-x+Pn,K=b-L+2*Pn,V=E-F+2*Pn,st=A-z+2*Pn,dt=b-1+3*Pn,Tt=E-1+3*Pn,Vt=A-1+3*Pn,ne=m&255,Y=v&255,nt=g&255;let gt=.6-b*b-E*E-A*A;if(gt<0)c=0;else{const Rt=ne+t[Y+t[nt]];gt*=gt,c=gt*gt*(e[Rt]*b+n[Rt]*E+i[Rt]*A)}let rt=.6-G*G-W*W-q*q;if(rt<0)h=0;else{const Rt=ne+R+t[Y+S+t[nt+x]];rt*=rt,h=rt*rt*(e[Rt]*G+n[Rt]*W+i[Rt]*q)}let Ct=.6-K*K-V*V-st*st;if(Ct<0)u=0;else{const Rt=ne+L+t[Y+F+t[nt+z]];Ct*=Ct,u=Ct*Ct*(e[Rt]*K+n[Rt]*V+i[Rt]*st)}let Nt=.6-dt*dt-Tt*Tt-Vt*Vt;if(Nt<0)f=0;else{const Rt=ne+1+t[Y+1+t[nt+1]];Nt*=Nt,f=Nt*Nt*(e[Rt]*dt+n[Rt]*Tt+i[Rt]*Vt)}return 32*(c+h+u+f)}}function Hu(s){const e=new Uint8Array(512);for(let n=0;n<512/2;n++)e[n]=n;for(let n=0;n<512/2-1;n++){const i=n+~~(s()*(256-n)),r=e[n];e[n]=e[i],e[i]=r}for(let n=256;n<512;n++)e[n]=e[n-256];return e}function Wl(s){let t=s>>>0;return function(){t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function At(s,t,e=0){let n=s*374761393+t*668265263+e*2147483647|0;return n=Math.imul(n^n>>>13,1274126177),n^=n>>>16,(n>>>0)/4294967296}const Wu=Wl(ku),ws=Vu(Wu),_h=A_(Wu),xh=Vu(Wl(ku^2654435769));function pi(s,t,e=5,n=2,i=.5){let r=.5,o=1,a=0,l=0;for(let c=0;c<e;c++)a+=r*ws(s*o,t*o),l+=r,r*=i,o*=n;return a/l}function C_(s,t,e=5){const n=xh(s*.5,t*.5),i=xh(s*.5+5.2,t*.5+1.3);return pi(s+n*.6,t+i*.6,e)}const Mh=[{ground:0x2f6b38,grass:0x55b84d,snow:0,flower:1,leaves:[0x6cc65a,0x428d3f,0x2f6b38,0xff6f8f,0xffd866,0x8bd9ff]},{ground:0x1f3324,grass:0x294d33,snow:0,flower:.16,leaves:[0x13291b,0x1f3d25,0x2f5f37,0x3f7b4b,0x24482e]},{ground:0x5f6f32,grass:0x79a848,snow:0,flower:.3,leaves:[0x5f8f45,0x86a84a,0xb4a64a,0xd49a42,0x6fa652]},{ground:0xf1f7fb,grass:0xd4edf5,snow:1,flower:0,leaves:[0xffffff,0xe4f1f6,0xcfe5ee,0xa8c2d2,0xffffff]},{ground:0xd8c16f,grass:0xf0d98d,snow:0,flower:.05,leaves:[0x7c8d35,0xa7bd55,0xd5c267,0x4f7230,0xe8db94]},{ground:0x244f5e,grass:0x5ed3c8,snow:0,flower:.08,leaves:[0x113848,0x1d6f78,0x52d1cf,0xa8fff1,0x29525f]},{ground:0x302c32,grass:0x6a3550,snow:0,flower:.02,leaves:[0x17171d,0x34273a,0x8e4b61,0xff9a4e,0xf6d06f]}],Ts=.0011,Xu=new j,qu=new j;function biomeMixValue(s,t){return yt.clamp(pi(s*Ts+40,t*Ts-17,4)*.9+.5,0,1)}function mr(s,t){let e=biomeMixValue(s,t)*6;const n=Math.min(Math.floor(e),5),i=yt.smoothstep(e-n,.22,.78);return{a:Mh[n],b:Mh[n+1],t:i}}function R_(s,t,e){const{a:n,b:i,t:r}=mr(s,t);return e.copy(Xu.set(n.ground)).lerp(qu.set(i.ground),r)}function P_(s,t,e){const{a:n,b:i,t:r}=mr(s,t);return e.copy(Xu.set(n.grass)).lerp(qu.set(i.grass),r)}function Yn(s,t){const{a:e,b:n,t:i}=mr(s,t);return e.snow*(1-i)+n.snow*i}function go(s,t){const{a:e,b:n,t:i}=mr(s,t);return e.flower*(1-i)+n.flower*i}function Xl(s,t,e){const{a:n,b:i,t:r}=mr(s,t),w=n.snow*(1-r)+i.snow*r,o=w>.16?Mh[3].leaves:e()<r?i.leaves:n.leaves;return o[e()*o.length|0]}function Kr(s,t){return Math.min(6,Math.floor(biomeMixValue(s,t)*7))}function L_(s,t){return biomeMixValue(s,t)*6}function bt(s,t){let e=C_(s*.0052,t*.0052,5);e=Math.sign(e)*Math.pow(Math.abs(e),1.25);let n=e*19+2.5;n+=pi(s*.021+11.3,t*.021-4.7,3)*3.4,n+=pi(s*.085,t*.085,2)*.9;const i=Math.abs(ws(s*.0032+30,t*.0032-12)),r=yt.smoothstep(i,0,.095);return n=yt.lerp(Mt.waterLevel-3,n,r),n}const wn=.6;function gl(s,t,e=new C){const n=bt(s-wn,t),i=bt(s+wn,t),r=bt(s,t-wn),o=bt(s,t+wn);return e.set(n-i,2*wn,r-o).normalize(),e}function Ze(s,t){const e=bt(s-wn,t),n=bt(s+wn,t),i=bt(s,t-wn),r=bt(s,t+wn),o=(n-e)/(2*wn),a=(r-i)/(2*wn);return Math.min(1,Math.sqrt(o*o+a*a))}const Ks=new j;new j(Me.grass);new j(Me.grassLush);new j(Me.grassDry);const D_=new j(Me.dirt),U_=new j(Me.rock),I_=new j(Me.sand),N_=new j(15660024);function F_(s,t,e,n,i=Ks){R_(s,t,i);const r=ws(s*.035,t*.035)*.5+.5;i.multiplyScalar(.9+r*.18);const o=yt.smoothstep(Yn(s,t),.08,.42)*(1-yt.smoothstep(n,.5,.95)),a=yt.smoothstep(n,.45,.9);i.lerp(D_,yt.smoothstep(n,.3,.6)*.7*(1-o)),i.lerp(U_,a*(1-o*.8));const l=1-yt.smoothstep(Math.abs(e-Mt.waterLevel),0,1.6);i.lerp(I_,l*.82*(1-o)),i.lerp(N_,o*.99);const c=.93+ws(s*.5,t*.5)*.07;return i.multiplyScalar(c),i}let la=null;function z_(){return la||(la=new Ce({vertexColors:!0,roughness:.97,metalness:0})),la}function O_(s,t){const e=Mt.chunkSize,n=Mt.terrainRes,i=s*e,r=t*e,o=new Rn(e,e,n,n);o.rotateX(-Math.PI/2);const a=o.attributes.position,l=new Float32Array(a.count*3);for(let h=0;h<a.count;h++){const u=a.getX(h),f=a.getZ(h),d=i+u,m=r+f,v=bt(d,m);a.setY(h,v);const g=Ze(d,m);F_(d,m,v,g,Ks),l[h*3]=Ks.r,l[h*3+1]=Ks.g,l[h*3+2]=Ks.b}o.setAttribute("color",new Gt(l,3)),o.computeVertexNormals();const c=new kt(o,z_());return c.position.set(i,0,r),c.receiveShadow=!0,c.castShadow=!1,c.matrixAutoUpdate=!1,c.updateMatrix(),c}function Cn(s,t=!1){const e=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},o={},a=s[0].morphTargetsRelative,l=new pe;let c=0;for(let h=0;h<s.length;++h){const u=s[h];let f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in u.morphAttributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,h),c+=d}}if(e){let h=0;const u=[];for(let f=0;f<s.length;++f){const d=s[f].index;for(let m=0;m<d.count;++m)u.push(d.getX(m)+h);h+=s[f].attributes.position.count}l.setIndex(u)}for(const h in r){const u=yh(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<u;++f){const d=[];for(let v=0;v<o[h].length;++v)d.push(o[h][v][f]);const m=yh(d);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}return l}function yh(s){let t,e,n,i=-1,r=0;for(let c=0;c<s.length;++c){const h=s[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new Gt(o,e,n);let l=0;for(let c=0;c<s.length;++c){const h=s[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let f=0,d=h.count;f<d;f++)for(let m=0;m<e;m++){const v=h.getComponent(f,m);a.setComponent(f+u,m,v)}}else o.set(h.array,l);l+=h.count*e}return i!==void 0&&(a.gpuType=i),a}const un={uTime:{value:0},uWind:{value:.22},uGust:{value:0},uSunView:{value:new C(0,0,1)},uGlowColor:{value:new j(16769440)},uGlowAmt:{value:1.35}};function Yu(){const s=new Ce({vertexColors:!0,roughness:.85,metalness:0});return s.onBeforeCompile=t=>{t.uniforms.uTime=un.uTime,t.uniforms.uWind=un.uWind,t.uniforms.uGust=un.uGust,t.uniforms.uSunView=un.uSunView,t.uniforms.uGlowColor=un.uGlowColor,t.uniforms.uGlowAmt=un.uGlowAmt,t.vertexShader=`uniform float uTime;
uniform float uWind;
uniform float uGust;
attribute float aWind;
varying float vWind;
`+t.vertexShader.replace("#include <begin_vertex>",`
        #include <begin_vertex>
        vWind = aWind;
        float _w = uWind * (1.0 + uGust * 2.5);
        vec4 _wp = modelMatrix * vec4(transformed, 1.0);
        float _ph = _wp.x * 0.14 + _wp.z * 0.17 + uTime * (1.5 + uGust * 2.0);
        float _sway = sin(_ph) + 0.5 * sin(_ph * 2.3 + 1.1);
        transformed.x += _sway * aWind * _w;
        transformed.z += cos(_ph * 0.85 + 0.6) * aWind * _w * 0.7;
        transformed.y -= abs(_sway) * aWind * _w * 0.15;
        `),t.fragmentShader=`uniform vec3 uSunView;
uniform vec3 uGlowColor;
uniform float uGlowAmt;
varying float vWind;
`+t.fragmentShader.replace("#include <opaque_fragment>",`
        {
          vec3 _Lv = normalize(uSunView);
          vec3 _Vv = normalize(vViewPosition);
          float _trans = pow(max(dot(-_Vv, _Lv), 0.0), 3.0);
          float _wrap = max(0.0, dot(normal, _Lv) * 0.5 + 0.5);
          totalEmissiveRadiance += uGlowColor * (_trans * 0.9 + _wrap * 0.12) * uGlowAmt * diffuseColor.rgb * vWind;
        }
        #include <opaque_fragment>`)},s}const B_=new C(0,1,0),Sh=new C,wh=new Ve,ca=new Bt;function ha(s,t,e,n,i,r,o,a){const l=s.distanceTo(t);let c=new dn(n,e,l,i,1,!1);c.translate(0,l/2,0),Sh.subVectors(t,s).normalize(),wh.setFromUnitVectors(B_,Sh),ca.makeRotationFromQuaternion(wh),ca.setPosition(s.x,s.y,s.z),c.applyMatrix4(ca);const h=c.toNonIndexed();c.dispose(),c=h;const u=c.attributes.position.count,f=new Float32Array(u*3),d=new Float32Array(u);for(let m=0;m<u;m++){f[m*3]=r.r,f[m*3+1]=r.g,f[m*3+2]=r.b;const v=c.attributes.position.getY(m),g=yt.clamp((v-s.y)/Math.max(.001,t.y-s.y),0,1);d[m]=yt.lerp(o,a,g)}return c.setAttribute("color",new Gt(f,3)),c.setAttribute("aWind",new Gt(d,1)),c}const bi=new C,Th=new j,bh=new j,Jr=new j;function ri(s,t,e,n,i,r=1){const o=new Cs(t,Math.max(2,e)),a=o.attributes.position,l=s.x*.6+11.3,c=s.y*.6-4.1,h=s.z*.6+7.7;for(let m=0;m<a.count;m++){bi.set(a.getX(m),a.getY(m),a.getZ(m));const v=bi.x/t,g=bi.y/t,p=bi.z/t,M=1+_h(v*1.7+l,g*1.7+c,p*1.7+h)*.17+_h(v*3.6-l,g*3.6+h,p*3.6-c)*.07;a.setXYZ(m,bi.x*M,bi.y*M*r,bi.z*M)}o.translate(s.x,s.y,s.z),o.computeVertexNormals();const u=a.count,f=new Float32Array(u*3),d=new Float32Array(u);Th.copy(n).multiplyScalar(1.16),bh.copy(n).multiplyScalar(.66);for(let m=0;m<u;m++){const v=yt.clamp((a.getY(m)-s.y)/t*.6+.5,0,1);Jr.copy(bh).lerp(Th,v);const g=.96+m*2654435761%100/100*.08;f[m*3]=Jr.r*g,f[m*3+1]=Jr.g*g,f[m*3+2]=Jr.b*g,d[m]=i}return o.setAttribute("color",new Gt(f,3)),o.setAttribute("aWind",new Gt(d,1)),o}const k_=new j(Me.trunk),G_=new j(Me.trunkLight),Eh=[Me.leafA,Me.leafB,Me.leafC].map(s=>new j(s)),V_=new j(Me.leafAutumn),H_=new j(15972045),W_=new j(16443118);function X_(s){const t=s();return t<.09?H_.clone():t<.15?W_.clone():t<.27?V_.clone():Eh[s()*Eh.length|0].clone()}function q_(s){const t=Wl(s),e=t();let n,i,r,o;e<.2?(n=9+t()*6,i=.5+t()*.35,r="round"):e<.48?(n=15+t()*10,i=.45+t()*.34,r="tall"):e<.9?(n=14+t()*10,i=.42+t()*.3,r="cone"):(n=10+t()*6,i=.3+t()*.2,r="slim"),o=X_(t);const a=k_.clone().lerp(G_,t()*.6),l=[],c=[],h=(t()-.5)*1.6,u=t()*Math.PI*2,f=new C(Math.cos(u)*h,n,Math.sin(u)*h),d=new C(f.x*.45,n*.5,f.z*.45),m=new C(0,0,0);l.push(ha(m,d,i,i*.7,8,a,0,.06)),l.push(ha(d,f,i*.7,i*.42,7,a,.06,.16));const v=r==="slim"?3:4+(t()*3|0),g=n*(r==="tall"?.55:.42);for(let y=0;y<v;y++){const _=y/v,b=yt.lerp(g,n*.92,_+t()*.1),E=b/n,A=new C(f.x*E,b,f.z*E),R=t()*Math.PI*2,S=.5+t()*.7,x=(r==="round"?3.4:2.4)+t()*2,L=new C(A.x+Math.cos(R)*x,A.y+S*x*.5,A.z+Math.sin(R)*x),F=Math.max(.12,i*(.5-_*.2));l.push(ha(A,L,F,F*.5,6,a,.18,.5)),c.push({a:A.clone(),b:L.clone(),r:F});const z=o.clone().multiplyScalar(.85+t()*.3);if(r==="round"||r==="tall"||r==="slim"){l.push(ri(L,2+t()*1.2,2,z,.7));const G=A.clone().lerp(L,.62);l.push(ri(G,1.3+t()*.7,2,z.clone().multiplyScalar(.92),.55))}}const p=o.clone();if(r==="round"){const y=2.7+t()*.9;l.push(ri(f,y*1.2,2,p,.55,.95));for(let _=0;_<4;_++){const b=new C((t()-.5)*3,(t()-.45)*1.8,(t()-.5)*3);l.push(ri(f.clone().add(b),y*(.62+t()*.34),2,p.clone().multiplyScalar(.86+t()*.22),.6,.92))}}else if(r==="tall")for(let y=0;y<4;y++){const _=f.clone().add(new C((t()-.5)*3,-y*1.9,(t()-.5)*3));l.push(ri(_,3-y*.45,2,p.clone().multiplyScalar(1-y*.05),.6,.88))}else if(r==="cone"){const y=4+(t()*2|0);for(let _=0;_<y;_++){const b=_/y,E=yt.lerp(n*.45,n+1.5,b),A=yt.lerp(3.2,.5,b)+t()*.3,R=new C(f.x*(E/n),E,f.z*(E/n)),S=ri(R,A,1,p.clone().multiplyScalar(.9+b*.15),.5,.55);l.push(S)}}else{const y=2+t()*.7;l.push(ri(f,y,2,p,.65)),l.push(ri(f.clone().add(new C((t()-.5)*2,-1.4,(t()-.5)*2)),y*.7,2,p.clone().multiplyScalar(.88),.6))}const M=Cn(l,!1);M.computeBoundingSphere();for(const y of l)y.dispose();return{geometry:M,skeleton:{trunkHeight:n,trunkRadius:i,top:f.clone(),branches:c},radius:M.boundingSphere.radius}}const ua=9,Ws=new Bt,fa=new C,$r=new j;class Y_{constructor(){this.material=Yu(),this.templates=[];for(let t=0;t<ua;t++)this.templates.push(q_(2583+t*131))}populate(t,e,n){const i=Mt.chunkSize,r=t*i,o=e*i,a=6.5,l=Math.floor(i/a),c=[],h=[];for(let u=0;u<l;u++)for(let f=0;f<l;f++){const d=t*l+f,m=e*l+u,v=At(d,m,1),g=pi((r+f*a)*.0055,(o+u*a)*.0055,3)*.5+.5,p=.16+g*g*.68;if(v>p)continue;const M=(At(d,m,2)-.5)*a*.9,y=(At(d,m,3)-.5)*a*.9,_=r+f*a+a*.5+M,b=o+u*a+a*.5+y,E=bt(_,b);if(E<Mt.waterLevel+.25||Ze(_,b)>.72)continue;const Bm=Kr(_,b),Sm=Yn(_,b),Fm=go(_,b),A=(Sm>.35||Bm===3?[1,2,5,6][At(d,m,4)*4|0]:Bm===1?[1,2,6][At(d,m,4)*3|0]:At(d,m,4)*ua)|0,R=(Sm>.35?.96:Fm>.55?.82:.74)+At(d,m,5)*(Sm>.35?.95:.86),S=At(d,m,6)*Math.PI*2;this._addTree(c,h,d,m,_,b,E,R,S,A)}if(At(t,e,80)<.2){const u=r+(.25+At(t,e,81)*.5)*i,f=o+(.25+At(t,e,82)*.5)*i,d=bt(u,f);if(d>Mt.waterLevel+1&&Ze(u,f)<.42){const m=At(t,e,83)*ua|0,v=2.6+At(t,e,84)*1.3;this._addTree(c,h,t*131+7,e*131+9,u,f,d,v,At(t,e,85)*6.28,m),h[h.length-1].giant=!0}}if(c.length){const u=Cn(c,!1);for(const d of c)d.dispose();const f=new kt(u,this.material);f.castShadow=!0,f.receiveShadow=!0,f.matrixAutoUpdate=!1,n.add(f)}return h}_addTree(t,e,n,i,r,o,a,l,c,h){const u=this.templates[h];Ws.makeRotationY(c),Ws.scale(fa.set(l,l,l)),Ws.setPosition(r,a-.3,o);const f=u.geometry.clone();f.applyMatrix4(Ws);let d=70;const m=()=>At(n,i,d++);$r.set(Xl(r,o,m));const v=f.getAttribute("color"),g=f.getAttribute("aWind");for(let p=0;p<v.count;p++)if(g.getX(p)>.28){const M=.84+(p*2654435761>>>0)%1e3/1e3*.32;v.setXYZ(p,$r.r*M,$r.g*M,$r.b*M)}t.push(f),e.push(this._record(u,Ws.clone(),r,o,a,l))}_record(t,e,n,i,r,o){const a=t.skeleton,l=[],c=new C(0,.3,0).applyMatrix4(e),h=a.top.clone().applyMatrix4(e);l.push({a:c,b:h,r:a.trunkRadius*o,kind:"trunk"});let u=0;for(const f of a.branches){const d=f.a.clone().applyMatrix4(e),m=f.b.clone().applyMatrix4(e);l.push({a:d,b:m,r:f.r*o,kind:"branch"}),u=Math.max(u,d.distanceTo(fa.set(n,d.y,i)),m.distanceTo(fa.set(n,m.y,i)))}return{x:n,z:i,baseY:r,topY:h.y,trunkRadius:a.trunkRadius*o,height:a.trunkHeight*o,reach:Math.max(u,a.trunkRadius*o)+1.5,segments:l}}updateWind(t){un.uTime.value=t}}const Ah={uTime:un.uTime,uWind:{value:.1}};function Z_(){const s=new Ce({vertexColors:!0,roughness:.9,metalness:0,side:Fe,alphaTest:0});return s.onBeforeCompile=t=>{t.uniforms.uTime=Ah.uTime,t.uniforms.uWind=Ah.uWind,t.uniforms.uGust=un.uGust,t.vertexShader=`uniform float uTime;
uniform float uWind;
uniform float uGust;
attribute float aTip;
`+t.vertexShader.replace("#include <begin_vertex>",`
        #include <begin_vertex>
        float gw = uWind * (1.0 + uGust * 3.0);
        vec3 ipos = instanceMatrix[3].xyz;
        float ph = ipos.x * 0.2 + ipos.z * 0.22 + uTime * (1.9 + uGust * 2.5);
        float s = (sin(ph) + 0.4 * sin(ph * 2.3 + 1.0)) * gw;
        transformed.x += s * aTip;
        transformed.z += cos(ph * 0.9 + 0.5) * gw * aTip * 0.6;
      `)},s}function sn(s,t,e){s=s.index?s.toNonIndexed():s;const n=s.attributes.position.count,i=new Float32Array(n*3),r=new Float32Array(n),o=new j;for(let a=0;a<n;a++)o.copy(t),i[a*3]=o.r,i[a*3+1]=o.g,i[a*3+2]=o.b,r[a]=typeof e=="function"?e(s.attributes.position.getY(a)):e;return s.setAttribute("color",new Gt(i,3)),s.setAttribute("aWind",new Gt(r.slice(),1)),s.setAttribute("aTip",new Gt(r,1)),s}function j_(){const s=[];for(let e=0;e<5;e++){const n=.42+Math.random()*.26,i=.06,r=new Rn(i,n,1,2);r.translate(0,n/2,0),r.rotateY(e/4*Math.PI+Math.random()*.5),r.rotateX((Math.random()-.5)*.3),r.translate((Math.random()-.5)*.08,0,(Math.random()-.5)*.08);const o=r.toNonIndexed();r.dispose();const a=o.attributes.position.count,l=new Float32Array(a*3),c=new Float32Array(a);for(let h=0;h<a;h++){const u=o.attributes.position.getY(h),f=yt.clamp(u/n,0,1),d=.55+f*.5;l[h*3]=d,l[h*3+1]=d,l[h*3+2]=d,c[h]=f*f}o.setAttribute("color",new Gt(l,3)),o.setAttribute("aTip",new Gt(c,1)),s.push(o)}const t=Cn(s,!1);return s.forEach(e=>e.dispose()),t.computeVertexNormals(),t}function K_(s){const t=[],e=s()<.5?new j(13784383):new j(14721596),n=new dn(.05,.07,.28,6);n.translate(0,.14,0),t.push(sn(n,new j(15787728),0));const i=new Le(.16,8,6,0,Math.PI*2,0,Math.PI*.5);i.scale(1,.7,1),i.translate(0,.28,0),t.push(sn(i,e,0));const r=Cn(t,!1);return t.forEach(o=>o.dispose()),r}function Ch(s){const t=[],e=[15921906,16767326,15306680,9415145],n=new j(e[s()*e.length|0]),i=new dn(.012,.018,.34,4);i.translate(0,.17,0),t.push(sn(i,new j(6130234),a=>yt.clamp(a/.34,0,1)));for(let a=0;a<5;a++){const l=new Le(.06,6,5);l.scale(1,.4,1.5);const c=a/5*Math.PI*2;l.translate(Math.cos(c)*.08,.36,Math.sin(c)*.08),t.push(sn(l,n,.8))}const r=new Le(.045,6,5);r.translate(0,.37,0),t.push(sn(r,new j(16041282),.8));const o=Cn(t,!1);return t.forEach(a=>a.dispose()),o}function da(s){const t=new Cs(.3+s()*.4,0),e=t.attributes.position;for(let i=0;i<e.count;i++)e.setXYZ(i,e.getX(i)*(.7+s()*.5),e.getY(i)*(.5+s()*.3),e.getZ(i)*(.7+s()*.5));t.computeVertexNormals(),t.translate(0,.1,0);const n=new j(Me.rock).multiplyScalar(.8+s()*.3);return sn(t,n,0)}function Rh(s,t=0,e=0){const n=[],i=new j(Xl(t,e,s));for(let o=0;o<3;o++){const a=new Cs(.3+s()*.25,1);a.translate((s()-.5)*.4,.25+s()*.2,(s()-.5)*.4),n.push(sn(a,i.clone().multiplyScalar(.85+s()*.3),.5))}const r=Cn(n,!1);return n.forEach(o=>o.dispose()),r}function J_(s){const t=[],e=new dn(.03,.045,.22,6);e.translate(0,.11,0),t.push(e);const n=new Le(.13,10,7,0,Math.PI*2,0,Math.PI*.55);n.scale(1,.8,1),n.translate(0,.22,0),t.push(n);const i=Cn(t,!1);return t.forEach(r=>r.dispose()),i}function $_(s){const t=[],e=new j(Me.rock);let n=0,i=.45+s()*.18;const r=4+(s()*3|0);for(let o=0;o<r;o++){const a=new Cs(i,0),l=a.attributes.position;for(let c=0;c<l.count;c++)l.setXYZ(c,l.getX(c)*(.9+s()*.3),l.getY(c)*(.58+s()*.22),l.getZ(c)*(.9+s()*.3));a.computeVertexNormals(),a.translate((s()-.5)*.12,n+i*.6,(s()-.5)*.12),t.push(sn(a,e.clone().multiplyScalar(.78+s()*.34),0)),n+=i*1,i*=.76}return Cn(t,!1)}function Q_(s){const t=[],e=new j(15988732),n=new j(1315855),i=[.5,.36,.27],r=[];let o=0;for(const c of i){const h=new Le(c,12,10);h.translate(0,o+c,0),t.push(sn(h,e,0)),r.push(o+c),o+=c*1.65}const a=r[2];for(const c of[-1,1]){const h=new Le(.035,6,6);h.translate(c*.09,a+.05,.23),t.push(sn(h,n,0))}const l=new dr(.035,.2,6);l.rotateX(Math.PI/2),l.translate(0,a,.3),t.push(sn(l,new j(15238204),0));for(let c=0;c<3;c++){const h=new Le(.028,6,6);h.translate(0,r[1]-.08+c*.11,.32),t.push(sn(h,n,0))}for(const c of[-1,1]){const h=new dn(.018,.018,.46,4);h.rotateZ(c*1.05),h.translate(c*.4,r[1]+.05,0),t.push(sn(h,new j(7032634),0))}return Cn(t,!1)}class tx{constructor(){this.grassGeo=j_(),this.grassMat=Z_(),this.detailMat=Yu(),this.glowMat=new Ce({color:2771538,emissive:new j(5236434),emissiveIntensity:0,roughness:.6})}populate(t,e,n){const i=Mt.chunkSize,r=t*i,o=e*i,a=2,l=Math.floor(i/a),c=[],h=[],u=new Ae,f=new j;for(let b=0;b<l;b++)for(let E=0;E<l;E++){const A=t*l+E,R=e*l+b,S=At(A,R,11),x=pi((r+E*a)*.02,(o+b*a)*.02,2)*.5+.5,L=r+E*a+(At(A,R,12)-.5)*a,F=o+b*a+(At(A,R,13)-.5)*a,z=Yn(L,F);if(S>(.28+x*.42)*(1-z*.7))continue;const G=bt(L,F);if(G<Mt.waterLevel+.3||Ze(L,F)>.7)continue;u.position.set(L,G,F),u.rotation.y=At(A,R,14)*Math.PI*2;const W=.7+At(A,R,15)*.9;u.scale.set(W,W*(.8+x*.5),W),u.updateMatrix(),c.push(u.matrix.clone()),P_(L,F,f).multiplyScalar(.82+ws(L*.05,F*.05)*.3),h.push(f.clone())}if(c.length){const b=new cs(this.grassGeo,this.grassMat,c.length);b.castShadow=!1,b.receiveShadow=!0;for(let E=0;E<c.length;E++)b.setMatrixAt(E,c[E]),b.setColorAt(E,h[E]);b.instanceMatrix.needsUpdate=!0,b.instanceColor&&(b.instanceColor.needsUpdate=!0),b.frustumCulled=!0,b.boundingSphere=new mi(new C(r+i/2,0,o+i/2),i),n.add(b)}const d=[],m=7.5,v=Math.floor(i/m);for(let b=0;b<v;b++)for(let E=0;E<v;E++){const A=t*v+E,R=e*v+b;if(At(A,R,21)>.7)continue;const x=r+E*m+(At(A,R,22)-.5)*m,L=o+b*m+(At(A,R,23)-.5)*m,F=bt(x,L);if(F<Mt.waterLevel+.2)continue;const z=Ze(x,L),G=At(A,R,24),W=Yn(x,L),q=go(x,L);let K;z>.5?K=da(Hn(A,R,1)):W>.5?K=G<.55?da(Hn(A,R,1)):Rh(Hn(A,R,4),x,L):G<.52*q?K=Ch(Hn(A,R,3)):G<.5?K=K_(Hn(A,R,2)):G<.78?K=Rh(Hn(A,R,4),x,L):K=da(Hn(A,R,5));const V=.7+At(A,R,25)*.8,st=new Bt;st.makeRotationY(At(A,R,26)*Math.PI*2),st.scale(new C(V,V,V)),st.setPosition(x,F,L),K.applyMatrix4(st),d.push(K)}const g=2.6,p=Math.floor(i/g);for(let b=0;b<p;b++)for(let E=0;E<p;E++){const A=t*p+E+7,R=e*p+b+13,S=r+E*g+(At(A,R,61)-.5)*g,x=o+b*g+(At(A,R,62)-.5)*g,L=go(S,x);if(L<.08||At(A,R,63)>L*1.15)continue;const F=bt(S,x);if(F<Mt.waterLevel+.3||Ze(S,x)>.55)continue;const z=Ch(Hn(A,R,6)),G=.8+At(A,R,64)*.7,W=new Bt().makeRotationY(At(A,R,65)*Math.PI*2);W.scale(new C(G,G,G)),W.setPosition(S,F,x),z.applyMatrix4(W),d.push(z)}if(At(t,e,73)<.11){const b=r+(.2+At(t,e,74)*.6)*i,E=o+(.2+At(t,e,75)*.6)*i,A=bt(b,E);if(A>Mt.waterLevel+.3&&Ze(b,E)<.45){const R=$_(Hn(t,e,7)),S=.9+At(t,e,76)*.6,x=new Bt().makeRotationY(At(t,e,77)*6.28);x.scale(new C(S,S,S)),x.setPosition(b,A,E),R.applyMatrix4(x),d.push(R)}}if(Yn(r+i/2,o+i/2)>.35&&At(t,e,78)<.65){const b=r+(.2+At(t,e,79)*.6)*i,E=o+(.2+At(t,e,86)*.6)*i,A=bt(b,E);if(A>Mt.waterLevel+.3&&Yn(b,E)>.5&&Ze(b,E)<.4){const S=1+At(t,e,87)*.5,_sm=new kt(Q_(),this.detailMat);_sm.position.set(b,A,E),_sm.scale.setScalar(S),_sm.rotation.y=At(t,e,88)*6.28,_sm.castShadow=!0,n.add(_sm),(n.userData.sm||(n.userData.sm=[])).push({m:_sm,broken:!1,t:0,fall:0})}}if(d.length){const b=Cn(d,!1);d.forEach(A=>A.dispose());const E=new kt(b,this.detailMat);E.castShadow=!0,E.receiveShadow=!0,n.add(E)}const M=[],y=(b,E,A)=>{const R=bt(b,E);if(R<Mt.waterLevel+.1||Ze(b,E)>.58)return;const S=J_(),x=new Bt().makeScale(A,A,A);x.setPosition(b,R,E),S.applyMatrix4(x),M.push(S)},_=7;for(let b=0;b<_;b++)for(let E=0;E<_;E++){const A=t*_+E,R=e*_+b;if(At(A,R,41)>.46)continue;const S=r+(E+At(A,R,42))*(i/_),x=o+(b+At(A,R,43))*(i/_);y(S,x,.7+At(A,R,44)*.7)}if(At(t,e,91)<.16){const b=r+i*(.3+At(t,e,92)*.4),E=o+i*(.3+At(t,e,93)*.4),A=2.2+At(t,e,94)*1.4,R=9+(At(t,e,95)*4|0);for(let S=0;S<R;S++){const x=S/R*Math.PI*2;y(b+Math.cos(x)*A,E+Math.sin(x)*A,.8)}}if(M.length){const b=Cn(M,!1);M.forEach(A=>A.dispose());const E=new kt(b,this.glowMat);E.castShadow=!1,E.receiveShadow=!0,n.add(E)}}}function Hn(s,t,e){let n=(s*73856093^t*19349663^e*83492791)>>>0;return function(){n|=0,n=n+1831565813|0;let i=Math.imul(n^n>>>15,1|n);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296}}class ex{constructor(t){this.scene=t,this.chunks=new Map,this.forest=new Y_,this.scatter=new tx,this._curKey=null,this._queue=[],this.maxBuildsPerFrame=1,this.activeTrees=[]}_key(t,e){return t+","+e}update(t){const e=Mt.chunkSize,n=Math.round(t.x/e),i=Math.round(t.z/e),r=this._key(n,i);if(r!==this._curKey){this._curKey=r;const l=Mt.viewChunks,c=new Set,h=[];for(let u=-l;u<=l;u++)for(let f=-l;f<=l;f++){if(f*f+u*u>(l+.5)*(l+.5))continue;const d=n+f,m=i+u;c.add(this._key(d,m)),this.chunks.has(this._key(d,m))||h.push([f*f+u*u,d,m])}h.sort((u,f)=>u[0]-f[0]),this._queue=h;for(const[u,f]of this.chunks)c.has(u)||(this.scene.remove(f.group),nx(f.group),this.chunks.delete(u))}let o=this.maxBuildsPerFrame,a=!1;for(;o-- >0&&this._queue.length;){const[,l,c]=this._queue.shift(),h=this._key(l,c);this.chunks.has(h)||(this._build(l,c,h),a=!0)}a&&this._refreshActiveTrees()}buildAllPending(){for(;this._queue.length;){const[,t,e]=this._queue.shift(),n=this._key(t,e);this.chunks.has(n)||this._build(t,e,n)}this._refreshActiveTrees()}_build(t,e,n){const i=new ge;i.add(O_(t,e));const r=this.forest.populate(t,e,i);this.scatter.populate(t,e,i),this.scene.add(i),this.chunks.set(n,{group:i,trees:r,cx:t,cz:e})}_refreshActiveTrees(){this.activeTrees.length=0;for(const t of this.chunks.values())for(const e of t.trees)this.activeTrees.push(e)}update_anim(t){this.forest.updateWind(t)}stepSnowmen(t,p,yn,ci){for(const ch of this.chunks.values()){const L=ch.group.userData.sm;if(!L)continue;for(const s of L){const m=s.m,dx=m.position.x-p.x,dz=m.position.z-p.z,d2=dx*dx+dz*dz,rr=.7*m.scale.x+.7;if(s.broken){s.t+=t,s.fall=Math.min(1,s.fall+t*3),m.rotation.z=s.fall*1.45;if(s.t>5&&d2>144){s.broken=!1,s.fall=0,m.rotation.z=0}}else if(d2<rr*rr&&Math.abs(p.y-m.position.y)<2.4){s.broken=!0,s.t=0,s.fall=0,yn&&yn.dust(new C(m.position.x,m.position.y+.9*m.scale.x,m.position.z)),ci&&ci.puff&&ci.puff()}}}}}function nx(s){s.traverse(t=>{(t.isMesh||t.isInstancedMesh)&&t.geometry?.dispose?.()})}class ix{constructor(t,e){const n=new Rn(Mt.fogFar*2.4,Mt.fogFar*2.4,80,80);n.rotateX(-Math.PI/2),this.uniforms={uTime:{value:0},uSunDir:{value:e.clone()},uDeep:{value:new j(Me.waterDeep)},uShallow:{value:new j(Me.water)},uSkyHorizon:{value:new j(Me.skyHorizon)},uSkyTop:{value:new j(Me.skyTop)},uSun:{value:new j(Me.sun)},uFogColor:{value:new j(Me.fog)},uFogNear:{value:Mt.fogNear},uFogFar:{value:Mt.fogFar},uRain:{value:0}};const i=new le({uniforms:this.uniforms,transparent:!0,depthWrite:!1,side:Fe,vertexShader:`
        uniform float uTime;
        varying vec3 vWorld;
        varying vec3 vNormal;
        // small gerstner-ish ripples from world position so waves don't swim
        float wave(vec2 p, vec2 dir, float freq, float speed, float t){
          return sin(dot(p, dir) * freq + t * speed);
        }
        void main(){
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vec2 p = wp.xz;
          float t = uTime;
          float h = 0.0;
          h += wave(p, normalize(vec2(1.0,0.3)), 0.20, 1.1, t) * 0.18;
          h += wave(p, normalize(vec2(-0.4,1.0)), 0.33, 1.6, t) * 0.10;
          h += wave(p, normalize(vec2(0.7,-0.8)), 0.7, 2.2, t) * 0.04;
          wp.y += h;
          // approximate normal from wave gradient
          float e = 0.5;
          float hx = wave(p+vec2(e,0.0), normalize(vec2(1.0,0.3)),0.20,1.1,t)*0.18;
          float hz = wave(p+vec2(0.0,e), normalize(vec2(-0.4,1.0)),0.33,1.6,t)*0.10;
          vNormal = normalize(vec3(h-hx, e, h-hz));
          vWorld = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,fragmentShader:`
        precision highp float;
        uniform vec3 uSunDir, uDeep, uShallow, uSkyHorizon, uSkyTop, uSun, uFogColor;
        uniform float uTime, uFogNear, uFogFar, uRain;
        varying vec3 vWorld;
        varying vec3 vNormal;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
        // expanding rain rings in each grid cell near the fragment
        float ripples(vec2 p, float t){
          float sum = 0.0;
          vec2 ip = floor(p);
          for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
            vec2 cell = ip + vec2(float(i), float(j));
            float s = hash(cell);
            vec2 c = cell + vec2(hash(cell+3.1), hash(cell+7.7));
            float ph = t * 1.6 + s * 12.0;
            float age = fract(ph);
            float rad = age * 0.55;
            float d = length(p - c);
            sum += smoothstep(0.05, 0.0, abs(d - rad)) * (1.0 - age) * step(0.5, hash(cell + floor(ph)));
          }
          return sum;
        }
        void main(){
          vec3 N = normalize(vNormal);
          if (uRain > 0.01) {
            float e = 0.12;
            float r0 = ripples(vWorld.xz * 1.3, uTime);
            float rx = ripples(vWorld.xz * 1.3 + vec2(e, 0.0), uTime);
            float rz = ripples(vWorld.xz * 1.3 + vec2(0.0, e), uTime);
            N = normalize(N + vec3(r0 - rx, 0.0, r0 - rz) * uRain * 2.2);
          }
          vec3 V = normalize(cameraPosition - vWorld);
          float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);
          // sky reflection approximation
          vec3 R = reflect(-V, N);
          vec3 sky = mix(uSkyHorizon, uSkyTop, clamp(R.y*1.2, 0.0, 1.0));
          // base water gradient by view angle
          vec3 base = mix(uDeep, uShallow, clamp(dot(N,V)*0.8+0.2,0.0,1.0));
          vec3 col = mix(base, sky, clamp(fres*1.3, 0.0, 0.9));
          // sun glitter
          float spec = pow(max(dot(R, normalize(uSunDir)), 0.0), 80.0);
          col += uSun * spec * 1.6;
          // sparkle ripples
          float spk = pow(max(0.0, sin(vWorld.x*3.0 + uTime*2.0)*sin(vWorld.z*3.0 - uTime*1.7)), 16.0);
          col += uSun * spk * 0.25 * fres;
          float alpha = mix(0.38, 0.62, fres);
          // distance fog to blend with the scene
          float d = length(cameraPosition - vWorld);
          float fog = smoothstep(uFogNear, uFogFar, d);
          col = mix(col, uFogColor, fog);
          gl_FragColor = vec4(col, alpha);
        }
      `});this.mesh=new kt(n,i),this.mesh.position.y=Mt.waterLevel,this.mesh.renderOrder=1,this.mesh.frustumCulled=!1,t.add(this.mesh)}update(t,e){this.uniforms.uTime.value=t,this.mesh.position.x=Math.round(e.x),this.mesh.position.z=Math.round(e.z)}}function sx(){const s=document.createElement("canvas");s.width=s.height=64;const t=s.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);e.addColorStop(0,"rgba(255,250,230,1)"),e.addColorStop(.3,"rgba(255,244,210,0.7)"),e.addColorStop(1,"rgba(255,240,200,0)"),t.fillStyle=e,t.fillRect(0,0,64,64);const n=new fr(s);return n.colorSpace=$e,n}class rx{constructor(t,e=320){this.count=e,this.range=new C(70,34,70);const n=new Float32Array(e*3),i=new Float32Array(e*3);this.seed=new Float32Array(e);const r=[16773320,16770728,16773320,16173528,16173528,14085304],o=new j;for(let c=0;c<e;c++)n[c*3]=(Math.random()-.5)*this.range.x,n[c*3+1]=Math.random()*this.range.y,n[c*3+2]=(Math.random()-.5)*this.range.z,this.seed[c]=Math.random()*1e3,o.set(r[Math.random()*r.length|0]),i[c*3]=o.r,i[c*3+1]=o.g,i[c*3+2]=o.b;const a=new pe;a.setAttribute("position",new Gt(n,3)),a.setAttribute("color",new Gt(i,3)),this.geo=a;const l=new le({transparent:!0,depthWrite:!1,blending:on,fog:!1,uniforms:{uTex:{value:sx()}},vertexShader:`
        varying vec3 vCol; varying float vA;
        void main(){
          vCol = color;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          float dist = -mv.z;
          gl_PointSize = clamp(46.0 / max(1.0, dist), 1.0, 6.0);
          // only motes in a near band are visible, so they never accumulate into haze
          vA = smoothstep(3.0, 9.0, dist) * smoothstep(46.0, 24.0, dist);
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`
        uniform sampler2D uTex; varying vec3 vCol; varying float vA;
        void main(){
          if (vA <= 0.001) discard;
          float a = texture2D(uTex, gl_PointCoord).a;
          gl_FragColor = vec4(vCol, a * vA * 0.26);
        }`});l.vertexColors=!0,this.points=new Bi(a,l),this.points.frustumCulled=!1,this.points.renderOrder=2,t.add(this.points),this._base=new C}update(t,e){const n=this.geo.attributes.position.array,i=this.range,r=e.x-i.x/2,o=e.z-i.z/2;for(let a=0;a<this.count;a++){const l=this.seed[a];let c=n[a*3],h=n[a*3+1],u=n[a*3+2];h+=(.18+l%1*.12)*.016*16,c+=Math.sin(t*.4+l)*.01,u+=Math.cos(t*.33+l*1.3)*.01,h>e.y+i.y*.6&&(h=e.y-i.y*.2);const f=c-r,d=u-o;f<0?c+=i.x:f>i.x&&(c-=i.x),d<0?u+=i.z:d>i.z&&(u-=i.z),n[a*3]=c,n[a*3+1]=h,n[a*3+2]=u}this.geo.attributes.position.needsUpdate=!0}}function ox(){const s=new Mo;return s.moveTo(0,0),s.bezierCurveTo(.05,.18,.22,.22,.26,.08),s.bezierCurveTo(.3,-.04,.2,-.2,.1,-.22),s.bezierCurveTo(.04,-.22,0,-.12,0,0),new pr(s,8)}class ax{constructor(t,e=7){this.scene=t,this.list=[],this.scatters=0;const n=ox(),i=[15239482,15921906,10205414,15911244,14254e3,15695188],r=new xo(.025,.12,3,6);for(let o=0;o<e;o++){const a=new ge,l=i[o%i.length],c=new Ce({color:l,roughness:.6,side:Fe,emissive:new j(l).multiplyScalar(.12)}),h=new kt(r,new Ce({color:2761504,roughness:.7}));h.rotation.x=Math.PI/2,a.add(h);const u=new ge,f=new ge,d=new kt(n,c);d.castShadow=!1;const m=new kt(n,c);m.scale.x=-1,u.add(d),f.add(m),a.add(u),a.add(f);const v=.8+Math.random()*.7;a.scale.setScalar(v),this.scene.add(a),this.list.push({g:a,wl:u,wr:f,pos:new C,vel:new C,target:new C,phase:Math.random()*10,flap:22+Math.random()*10,retarget:0,flee:0,placed:!1})}}_newTarget(t,e){const n=Math.random()*Math.PI*2,i=4+Math.random()*16,r=e.x+Math.cos(n)*i,o=e.z+Math.sin(n)*i,a=Math.max(bt(r,o),Mt.waterLevel),l=go(r,o);t.landing=a>Mt.waterLevel+.3&&Math.random()<.32+l*.5;const c=t.landing?a+.16:a+1+Math.random()*3.6;t.target.set(r,c,o),t.retarget=2+Math.random()*3}update(t,e,n=0){for(const i of this.list){i.phase+=t,(!i.placed||i.pos.distanceToSquared(e)>3600)&&(i.pos.copy(e).add(new C((Math.random()-.5)*20,3+Math.random()*4,(Math.random()-.5)*20)),this._newTarget(i,e),i.placed=!0,i.rest=0,i.flee=0);const r=i.pos.x-e.x,o=i.pos.z-e.z,a=Math.hypot(r,o);if(i.flee<=0&&n>3&&a<5&&Math.abs(i.pos.y-e.y)<6){i.flee=.9+Math.random()*.5,this.scatters++,i.rest=0,i.landing=!1;const g=1/(a||1);i.vel.set(r*g,0,o*g).multiplyScalar(6+Math.random()*5),i.vel.y+=3+Math.random()*3;const p=Math.atan2(o,r)+(Math.random()-.5)*1.2,M=9+Math.random()*8,y=e.x+Math.cos(p)*M,_=e.z+Math.sin(p)*M;i.target.set(y,Math.max(bt(y,_),Mt.waterLevel)+2.5+Math.random()*3,_),i.retarget=2+Math.random()*2}if(i.rest>0){i.rest-=t,i.g.position.copy(i.pos);const g=1.35+Math.sin(i.phase*2.5)*.5;i.wl.rotation.z=g,i.wr.rotation.z=-g,i.rest<=0&&(this._newTarget(i,e),i.landing=!1);continue}const l=i.flee>0;l&&(i.flee-=t),i.retarget-=t;const c=i.pos.distanceToSquared(i.target)<1;if(c&&i.landing&&!l){i.rest=2.5+Math.random()*4;continue}!l&&(i.retarget<=0||c)&&this._newTarget(i,e);const h=i.target.clone().sub(i.pos),u=h.length()||1;h.multiplyScalar(1/u),i.vel.addScaledVector(h,(l?10:6)*t),i.vel.y+=Math.sin(i.phase*6)*.6*t,i.vel.multiplyScalar(l?.96:.92);const f=l?11:4,d=i.vel.length();d>f&&i.vel.multiplyScalar(f/d),i.pos.addScaledVector(i.vel,t),i.g.position.copy(i.pos);const m=Math.atan2(i.vel.x,i.vel.z);i.g.rotation.set(i.landing?.3:0,m,Math.sin(i.phase*3)*(l?.35:.15));const v=Math.sin(i.phase*i.flap*(l?1.7:1))*.9+.5;i.wl.rotation.z=v,i.wr.rotation.z=-v}}}function lx(){const s=document.createElement("canvas");s.width=s.height=48;const t=s.getContext("2d"),e=t.createRadialGradient(24,24,0,24,24,24);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.5,"rgba(255,255,255,0.6)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,48,48),new fr(s)}class cx{constructor(t,e=260){this.max=e,this.head=0,this.pos=new Float32Array(e*3),this.col=new Float32Array(e*3),this.vel=new Float32Array(e*3),this.life=new Float32Array(e),this.maxLife=new Float32Array(e),this.size=new Float32Array(e),this.grav=new Float32Array(e);for(let r=0;r<e;r++)this.pos[r*3+1]=-9999;const n=new pe;n.setAttribute("position",new Gt(this.pos,3)),n.setAttribute("color",new Gt(this.col,3)),n.setAttribute("aLife",new Gt(this.life,1)),n.setAttribute("aSize",new Gt(this.size,1)),this.geo=n;const i=new le({uniforms:{uTex:{value:lx()}},transparent:!0,depthWrite:!1,vertexColors:!0,vertexShader:`
        attribute float aLife; attribute float aSize;
        varying float vLife; varying vec3 vCol;
        void main(){
          vLife = aLife; vCol = color;
          vec4 mv = modelViewMatrix * vec4(position,1.0);
          gl_PointSize = aSize * (0.3 + aLife) * (260.0 / max(1.0, -mv.z));
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`
        uniform sampler2D uTex; varying float vLife; varying vec3 vCol;
        void main(){
          if (vLife <= 0.0) discard;
          float a = texture2D(uTex, gl_PointCoord).a;
          gl_FragColor = vec4(vCol, a * clamp(vLife,0.0,1.0));
        }`});this.points=new Bi(n,i),this.points.frustumCulled=!1,this.points.renderOrder=3,t.add(this.points),this._c=new j}_emit(t,e,n,i,r,o,a,l,c,h){const u=this.head;this.head=(this.head+1)%this.max,this.pos[u*3]=t,this.pos[u*3+1]=e,this.pos[u*3+2]=n,this.vel[u*3]=i,this.vel[u*3+1]=r,this.vel[u*3+2]=o,this._c.set(a),this.col[u*3]=this._c.r,this.col[u*3+1]=this._c.g,this.col[u*3+2]=this._c.b,this.size[u]=l,this.life[u]=1,this.maxLife[u]=c,this.grav[u]=h}splash(t){for(let e=0;e<26;e++){const n=Math.random()*Math.PI*2,i=1+Math.random()*4;this._emit(t.x,t.y+.1,t.z,Math.cos(n)*i,2+Math.random()*5,Math.sin(n)*i,Math.random()<.5?13496059:16777215,.5+Math.random()*.6,.6+Math.random()*.4,12)}}dust(t){for(let e=0;e<16;e++){const n=Math.random()*Math.PI*2,i=.5+Math.random()*2.2;this._emit(t.x,t.y+.05,t.z,Math.cos(n)*i,.4+Math.random()*1.2,Math.sin(n)*i,13483415,.7+Math.random()*.8,.5+Math.random()*.3,1.5)}}windLeaf(t,e,n,i,r,o){this._emit(t,e,n,r+(Math.random()-.5)*2.5,-.4+Math.random()*.6,o+(Math.random()-.5)*2.5,i,.45+Math.random()*.45,3+Math.random()*2.5,1.1)}petals(t){const e=[16170198,16769643,16511999,10205414,15699888,12772744,16761421];for(let n=0;n<7;n++){const i=Math.random()*Math.PI*2,r=1+Math.random()*2.6;this._emit(t.x+(Math.random()-.5)*.7,t.y+.15,t.z+(Math.random()-.5)*.7,Math.cos(i)*r,1.3+Math.random()*2,Math.sin(i)*r,e[Math.random()*e.length|0],.4+Math.random()*.45,.9+Math.random()*.7,2.4)}}sparkle(t,e=16777215){for(let n=0;n<9;n++){const i=Math.random()*Math.PI*2,r=1+Math.random()*3.2;this._emit(t.x,t.y,t.z,Math.cos(i)*r,(Math.random()-.25)*3,Math.sin(i)*r,e,.3+Math.random()*.4,.5+Math.random()*.5,1)}}dandelion(t,e,n,i,r){for(let o=0;o<8;o++)this._emit(t+(Math.random()-.5)*.5,e+Math.random()*.4,n+(Math.random()-.5)*.5,i+(Math.random()-.5)*1.4,.4+Math.random()*.9,r+(Math.random()-.5)*1.4,16514292,.28+Math.random()*.22,3.5+Math.random()*2.5,-.25)}footDust(t){for(let e=0;e<2;e++){const n=Math.random()*Math.PI*2,i=.3+Math.random()*.9;this._emit(t.x+(Math.random()-.5)*.3,t.y+.06,t.z+(Math.random()-.5)*.3,Math.cos(n)*i,.3+Math.random()*.7,Math.sin(n)*i,14273704,.45+Math.random()*.45,.4+Math.random()*.25,1.8)}}leaves(t){for(let e=0;e<10;e++){const n=Math.random()*Math.PI*2,i=1+Math.random()*2;this._emit(t.x,t.y+1+Math.random(),t.z,Math.cos(n)*i,1+Math.random()*2,Math.sin(n)*i,Math.random()<.3?14260798:8831567,.5+Math.random()*.5,.8+Math.random()*.5,3.5)}}update(t){const{pos:e,vel:n,life:i,maxLife:r,grav:o}=this;for(let a=0;a<this.max;a++){if(i[a]<=0)continue;if(i[a]-=t/r[a],i[a]<=0){e[a*3+1]=-9999;continue}n[a*3+1]-=o[a]*t;const l=Math.exp(-1.5*t);n[a*3]*=l,n[a*3+2]*=l,e[a*3]+=n[a*3]*t,e[a*3+1]+=n[a*3+1]*t,e[a*3+2]+=n[a*3+2]*t}this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.aLife.needsUpdate=!0}}function Ph(s,t,e,n,i,r,o){const l=[],c=[],h=new j(i),u=new j(r),f=[];for(let p=0;p<=200;p++){const M=p/200*Math.PI*2,y=Math.cos(M),_=Math.sin(M);let b=0,E=1,A=.6;for(let R=0;R<4;R++)b+=A*Math.abs(ws(y*o*E+n,_*o*E-n)),A*=.5,E*=2.1;f.push(t+e*(.25+b))}const d=t-120;for(let p=0;p<200;p++){const M=p/200*Math.PI*2,y=(p+1)/200*Math.PI*2,_=Math.cos(M)*s,b=Math.sin(M)*s,E=Math.cos(y)*s,A=Math.sin(y)*s,R=f[p],S=f[p+1];l.push(_,d,b,E,d,A,E,S,A),l.push(_,d,b,E,S,A,_,R,b),c.push(u.r,u.g,u.b,u.r,u.g,u.b,h.r,h.g,h.b),c.push(u.r,u.g,u.b,h.r,h.g,h.b,h.r,h.g,h.b)}const m=new pe;m.setAttribute("position",new Gt(new Float32Array(l),3)),m.setAttribute("color",new Gt(new Float32Array(c),3));const v=new di({vertexColors:!0,fog:!1,side:Fe}),g=new kt(m,v);return g.frustumCulled=!1,g}class hx{constructor(t){this.group=new ge,this.group.add(Ph(560,26,200,11.3,11187922,13423846,2.2)),this.group.add(Ph(385,16,150,47.9,8689340,11450836,3.1)),t.add(this.group)}update(t){this.group.position.set(t.x,0,t.z)}}class ux{constructor(t,e={}){this.scene=t,this.cloudiness=.2,this.wetness=0,this._cloudTarget=.2,this._wetTarget=0,this._timer=8,this.snowing=0,this.changeEvery=e.changeEvery??[38,85],this._buildClouds(),this._buildPrecip(e.drops??2400)}_buildClouds(){const t=new Rn(1400,1400,1,1);t.rotateX(Math.PI/2),this.cloudMat=new le({transparent:!0,depthWrite:!1,side:Fe,fog:!1,uniforms:{uTime:{value:0},uCover:{value:.2},uOpacity:{value:0},uTint:{value:new j(16777215)}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
        varying vec2 vUv; uniform float uTime, uCover, uOpacity; uniform vec3 uTint;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
        float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
          return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y); }
        float fbm(vec2 p){ float v=0.0,a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.04; a*=0.5; } return v; }
        void main(){
          vec2 uv = vUv*7.0 + vec2(uTime*0.012, uTime*0.007);
          float n = fbm(uv);
          float c = smoothstep(0.62 - uCover*0.42, 0.86 - uCover*0.22, n);
          vec2 d = abs(vUv-0.5)*2.0;
          float edge = 1.0 - smoothstep(0.55, 0.98, max(d.x,d.y)); // hide the plane border
          gl_FragColor = vec4(uTint, c * uOpacity * edge);
        }`}),this.clouds=new kt(t,this.cloudMat),this.clouds.position.y=165,this.clouds.frustumCulled=!1,this.clouds.renderOrder=-1,this.scene.add(this.clouds)}_buildPrecip(t){this.box=new C(64,42,64),this.n=t;const e=new Float32Array(t*3);this.vy=new Float32Array(t);for(let i=0;i<t;i++)e[i*3]=(Math.random()-.5)*this.box.x,e[i*3+1]=(Math.random()-.5)*this.box.y,e[i*3+2]=(Math.random()-.5)*this.box.z,this.vy[i]=.8+Math.random()*.5;const n=new pe;n.setAttribute("position",new Gt(e,3)),this.precipGeo=n,this.precipMat=new le({transparent:!0,depthWrite:!1,fog:!1,blending:Ni,uniforms:{uOpacity:{value:0},uColor:{value:new j(11519712)},uSnow:{value:0},uSize:{value:1}},vertexShader:`
        uniform float uSnow, uSize; varying float vS;
        void main(){ vS = uSnow; vec4 mv = modelViewMatrix * vec4(position,1.0);
          gl_PointSize = uSize * (mix(7.0, 5.0, uSnow)) * (40.0 / max(1.0,-mv.z));
          gl_Position = projectionMatrix * mv; }`,fragmentShader:`
        uniform float uOpacity; uniform vec3 uColor; varying float vS;
        void main(){
          vec2 p = gl_PointCoord - 0.5;
          // rain = vertical streak, snow = soft round flake
          float rain = smoothstep(0.5, 0.0, abs(p.x)*6.0) * smoothstep(0.5, 0.1, abs(p.y));
          float snow = smoothstep(0.5, 0.0, length(p));
          float a = mix(rain, snow, vS) * uOpacity;
          gl_FragColor = vec4(uColor, a);
        }`}),this.precip=new Bi(n,this.precipMat),this.precip.frustumCulled=!1,this.precip.renderOrder=4,this.scene.add(this.precip)}_retarget(){const t=Math.random();t<.46?(this._cloudTarget=.08+Math.random()*.2,this._wetTarget=0):t<.8?(this._cloudTarget=.45+Math.random()*.3,this._wetTarget=0):(this._cloudTarget=.7+Math.random()*.3,this._wetTarget=.6+Math.random()*.4),this._timer=this.changeEvery[0]+Math.random()*(this.changeEvery[1]-this.changeEvery[0])}update(t,e,n){this._timer-=t,this._timer<=0&&this._retarget();const i=1-Math.exp(-.3*t);this.cloudiness+=(this._cloudTarget-this.cloudiness)*i,this.wetness+=(this._wetTarget-this.wetness)*i;const r=Yn(e.x,e.z)>.5?1:0;this.snowing+=(r-this.snowing)*(1-Math.exp(-1.5*t)),this.cloudMat.uniforms.uTime.value+=t,this.cloudMat.uniforms.uCover.value=this.cloudiness,this.cloudMat.uniforms.uOpacity.value=yt.clamp(this.cloudiness*.95,0,.9),n&&this.cloudMat.uniforms.uTint.value.copy(n),this.clouds.position.set(e.x,165,e.z);const o=this.precipGeo.attributes.position.array,a=this.box.x,l=this.box.y,c=this.box.z,h=yt.lerp(34,5,this.snowing)*t,u=yt.lerp(1.5,5,this.snowing)*t,f=this.cloudMat.uniforms.uTime.value;if(this.wetness>.02){for(let d=0;d<this.n;d++){let m=o[d*3],v=o[d*3+1]-h*this.vy[d],g=o[d*3+2];this.snowing>.02?(m+=Math.sin(f*1.5+d)*u,g+=Math.cos(f*1.2+d*1.3)*u):m+=u*.4,v<-l/2&&(v+=l,m=(Math.random()-.5)*a,g=(Math.random()-.5)*c),m>a/2?m-=a:m<-a/2&&(m+=a),g>c/2?g-=c:g<-c/2&&(g+=c),o[d*3]=m,o[d*3+1]=v,o[d*3+2]=g}this.precipGeo.attributes.position.needsUpdate=!0}this.precip.position.copy(e),this.precipMat.uniforms.uOpacity.value=this.wetness,this.precipMat.uniforms.uSnow.value=this.snowing,this.precipMat.uniforms.uColor.value.set(this.snowing>.5?16777215:11979488)}}class fx{constructor(t,e){this.group=new ge,this.birds=[];const n=new di({color:2830138,fog:!0,side:Fe}),i=(()=>{const r=new pe,o=new Float32Array([0,0,0,-.9,.05,-.35,-.9,.05,.35,0,0,0,.9,.05,.35,.9,.05,-.35]);return r.setAttribute("position",new Gt(o,3)),r.computeVertexNormals(),r})();for(let r=0;r<e;r++){const o=new ge,a=new kt(i,n);o.add(a),o.userData={off:new C((Math.random()-.5)*16,(Math.random()-.5)*6,(Math.random()-.5)*16),ph:Math.random()*6,flap:8+Math.random()*4,wing:a};const l=.7+Math.random()*.7;o.scale.setScalar(l),this.group.add(o),this.birds.push(o)}t.add(this.group),this.pos=new C,this.vel=new C,this.reset(new C)}reset(t){const e=Math.random()*Math.PI*2;this.pos.set(t.x+Math.cos(e)*260,70+Math.random()*60,t.z+Math.sin(e)*260);const n=Math.random()*Math.PI*2;this.vel.set(Math.cos(n),(Math.random()-.5)*.05,Math.sin(n)).multiplyScalar(7+Math.random()*5),this._turn=(Math.random()-.5)*.2}update(t,e,n){const i=Math.atan2(this.vel.z,this.vel.x)+this._turn*t,r=this.vel.length();this.vel.x=Math.cos(i)*r,this.vel.z=Math.sin(i)*r,this.pos.addScaledVector(this.vel,t),this.pos.distanceTo(e)>340&&this.reset(e);const o=Math.atan2(this.vel.x,this.vel.z);for(const a of this.birds){const l=a.userData;a.position.copy(this.pos).add(l.off),a.rotation.y=o;const c=Math.sin(n*l.flap+l.ph);l.wing.rotation.x=c*.6,l.wing.rotation.z=0,a.position.y+=Math.sin(n*2+l.ph)*.3}}}const Xs=new Ce({color:10251075,roughness:.9}),Lh=new Ce({color:14271654,roughness:.9}),Dh=new Ce({color:9073232,roughness:.8});function os(s,t,e,n,i=10){const r=new Le(1,i,i);r.scale(t,e,n);const o=new kt(r,s);return o.castShadow=!0,o}class dx{constructor(){this.group=new ge;const t=os(Xs,.55,.45,.95);t.position.y=1.15,this.group.add(t);const e=os(Lh,.42,.32,.7);e.position.set(0,1,.05),this.group.add(e),this.neck=new ge,this.neck.position.set(0,1.4,.8),this.group.add(this.neck);const n=os(Xs,.22,.38,.22);n.position.y=.2,this.neck.add(n);const i=os(Xs,.22,.22,.42);i.position.set(0,.45,.18),this.neck.add(i);for(const a of[-1,1]){const l=os(Xs,.07,.16,.05);l.position.set(a*.16,.6,.1),this.neck.add(l);const c=new kt(new dn(.025,.04,.5,5),Dh);c.position.set(a*.12,.78,.12),c.rotation.z=a*.4,this.neck.add(c);const h=new kt(new dn(.02,.03,.28,5),Dh);h.position.set(a*.26,1,.12),h.rotation.z=a*.8,this.neck.add(h)}this.legs=[];const r=new dn(.07,.05,1.1,6);for(const[a,l]of[[-.32,.6],[.32,.6],[-.34,-.55],[.34,-.55]]){const c=new ge;c.position.set(a,1.05,l);const h=new kt(r,Xs);h.position.y=-.55,h.castShadow=!0,c.add(h),this.group.add(c),this.legs.push(c)}const o=os(Lh,.1,.16,.1);o.position.set(0,1.3,-.92),this.group.add(o),this.pos=new C,this.target=new C,this.heading=Math.random()*Math.PI*2,this.speed=0,this.phase=Math.random()*6,this.graze=1,this._retime=0,this.placed=!1}_wander(t){const e=Math.random()*Math.PI*2,n=12+Math.random()*40,i=t.x+Math.cos(e)*n,r=t.z+Math.sin(e)*n;this.target.set(i,bt(i,r),r),this._retime=3+Math.random()*5}update(t,e,n){if(!this.placed||this.pos.distanceToSquared(e)>14400){for(let l=0;l<10;l++){const c=Math.random()*Math.PI*2,h=22+Math.random()*40,u=e.x+Math.cos(c)*h,f=e.z+Math.sin(c)*h;if(bt(u,f)>Mt.waterLevel+.6&&Ze(u,f)<.5){this.pos.set(u,bt(u,f),f),this.placed=!0;break}}this._wander(e)}if(this._retime-=t,this.pos.distanceTo(e)<16)this.heading=Math.atan2(this.pos.x-e.x,this.pos.z-e.z),this.speed+=(9-this.speed)*(1-Math.exp(-4*t)),this.graze+=(0-this.graze)*(1-Math.exp(-8*t));else{this._retime<=0&&this._wander(e);const l=this.target.x-this.pos.x,c=this.target.z-this.pos.z;if(Math.hypot(l,c)>2){let f=Math.atan2(l,c)-this.heading;f=Math.atan2(Math.sin(f),Math.cos(f)),this.heading+=f*(1-Math.exp(-3*t)),this.speed+=(2.2-this.speed)*(1-Math.exp(-2*t)),this.graze+=(0-this.graze)*(1-Math.exp(-3*t))}else this.speed+=(0-this.speed)*(1-Math.exp(-3*t)),this.graze+=(1-this.graze)*(1-Math.exp(-2*t))}const o=new C(Math.sin(this.heading),0,Math.cos(this.heading));this.pos.addScaledVector(o,this.speed*t),this.pos.y=bt(this.pos.x,this.pos.z),this.group.position.copy(this.pos),this.group.rotation.y=this.heading,this.phase+=t*(2+this.speed*1.5);const a=Math.min(1,this.speed/4);for(let l=0;l<4;l++)this.legs[l].rotation.x=Math.sin(this.phase+l%2*Math.PI+(l<2?0:Math.PI))*.5*a;this.neck.rotation.x=yt.lerp(.1,1.1,this.graze)+Math.sin(n*2+this.phase)*.04,this.group.position.y+=Math.abs(Math.sin(this.phase))*.04*a}}class px{constructor(t,e={}){this.flocks=[];const n=e.flocks??2;for(let r=0;r<n;r++)this.flocks.push(new fx(t,9+(Math.random()*5|0)));this.deer=[];const i=e.deer??5;for(let r=0;r<i;r++){const o=new dx;t.add(o.group),this.deer.push(o)}}update(t,e,n){for(const i of this.flocks)i.update(t,e,n);for(const i of this.deer)i.update(t,e,n)}}class mx{constructor(t,e=130){this.count=e,this.range=60;const n=new Float32Array(e*3),i=new Float32Array(e);this.seed=new Float32Array(e);for(let o=0;o<e;o++)n[o*3]=(Math.random()-.5)*this.range,n[o*3+1]=.5+Math.random()*3.5,n[o*3+2]=(Math.random()-.5)*this.range,i[o]=Math.random()*6.28,this.seed[o]=Math.random()*100;const r=new pe;r.setAttribute("position",new Gt(n,3)),r.setAttribute("aPhase",new Gt(i,1)),this.geo=r,this.mat=new le({transparent:!0,depthWrite:!1,blending:on,fog:!1,uniforms:{uTime:{value:0},uNight:{value:0}},vertexShader:`
        attribute float aPhase; uniform float uTime, uNight; varying float vB;
        void main(){
          float blink = pow(max(0.0, sin(uTime * 2.2 + aPhase)), 12.0);
          vB = blink * uNight;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = (1.2 + 2.4 * blink) * (14.0 / max(1.0, -mv.z));
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`
        varying float vB;
        void main(){
          if (vB <= 0.002) discard;
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.05, d);
          gl_FragColor = vec4(vec3(0.7, 0.95, 0.42), a * vB * 0.85);
        }`}),this.points=new Bi(r,this.mat),this.points.frustumCulled=!1,this.points.renderOrder=3,t.add(this.points)}update(t,e,n,i){this.mat.uniforms.uTime.value=e;const r=yt.clamp(1-i*1.4,0,1);if(this.mat.uniforms.uNight.value=r,r<=.01)return;const o=this.geo.attributes.position.array,a=this.range,l=n.x-a/2,c=n.z-a/2;for(let h=0;h<this.count;h++){const u=this.seed[h];let f=o[h*3],d=o[h*3+2];f+=Math.sin(e*.5+u)*.012,d+=Math.cos(e*.42+u*1.3)*.012;let m=f-l,v=d-c;m<0?f+=a:m>a&&(f-=a),v<0?d+=a:v>a&&(d-=a);const g=bt(f,d),p=Math.max(g,Mt.waterLevel)+.6+(1.6+Math.sin(e*.6+u)*1.1);o[h*3]=f,o[h*3+1]=p,o[h*3+2]=d}this.geo.attributes.position.needsUpdate=!0}}class gx{constructor(t,e=40){this.max=e,this.head=0,this.life=7;const n=new Rn(1,1);n.rotateX(-Math.PI/2);const i=new Float32Array(e);n.setAttribute("aAlpha",new ar(i,1)),this.alpha=i,this.mat=new le({transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,uniforms:{uColor:{value:new j(6715535)}},vertexShader:`attribute float aAlpha; varying float vA; varying vec2 vUv;
        void main(){ vA = aAlpha; vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position,1.0); }`,fragmentShader:`varying float vA; varying vec2 vUv; uniform vec3 uColor;
        void main(){ if (vA <= 0.002) discard; vec2 d = vUv - 0.5;
        float m = smoothstep(0.5, 0.28, length(d)); gl_FragColor = vec4(uColor, m * vA * 0.62); }`}),this.mesh=new cs(n,this.mat,e),this.mesh.frustumCulled=!1,this.mesh.instanceMatrix.setUsage(Zs);const r=new Bt().makeScale(0,0,0);for(let o=0;o<e;o++)this.mesh.setMatrixAt(o,r);this.mesh.instanceMatrix.needsUpdate=!0,t.add(this.mesh),this._m=new Bt,this._q=new Ve,this._up=new C(0,1,0),this._n=new C,this._s=new C,this._last=new C(1e9,0,0)}stamp(t,e,n,i){const r=bt(t,e)+.03,o=gl(t,e,this._n);this._q.setFromUnitVectors(this._up,o);const a=new Ve().setFromAxisAngle(this._up,n+(Math.random()-.5)*.3);this._q.multiply(a);const l=Math.cos(n)*.18*i,c=-Math.sin(n)*.18*i;this._s.set(.42,1,.56),this._m.compose(new C(t+l,r,e+c),this._q,this._s);const h=this.head;this.head=(this.head+1)%this.max,this.mesh.setMatrixAt(h,this._m),this.alpha[h]=1,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.geometry.attributes.aAlpha.needsUpdate=!0}update(t,e,n){let i=!1;for(let r=0;r<this.max;r++)this.alpha[r]>0&&(this.alpha[r]=Math.max(0,this.alpha[r]-t/this.life),i=!0);if(i&&(this.mesh.geometry.attributes.aAlpha.needsUpdate=!0),n&&e.state==="ground"){const r=e.position;this._last.distanceToSquared(r)>.55*.55&&(this._side=-(this._side||1),this.stamp(r.x,r.z,e.facing,this._side),this._last.copy(r))}}}const Uh=new Ce({color:10467012,roughness:.5,metalness:.2}),vx=new Ce({color:15194280,roughness:.5}),_x=new Ce({color:4160826,roughness:.82,metalness:0,side:Fe}),xx=new Ce({color:16503522,roughness:.7,emissive:4857904,emissiveIntensity:.15}),as=18;function Mx(){const s=new ge,t=new kt(new Le(1,10,8),Uh);t.scale.set(.12,.16,.34),t.castShadow=!0,s.add(t);const e=new kt(new Le(1,8,6),vx);e.scale.set(.09,.08,.26),e.position.y=-.05,s.add(e);const n=new kt(new dr(.12,.18,4),Uh);return n.rotation.x=-Math.PI/2,n.position.z=-.34,n.scale.set(1,.4,1),s.add(n),s._tail=n,s}function yx(){const s=document.createElement("canvas");s.width=s.height=48;const t=s.getContext("2d"),e=t.createRadialGradient(24,24,0,24,24,24);return e.addColorStop(0,"rgba(0,0,0,0.8)"),e.addColorStop(.55,"rgba(0,0,0,0.34)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,48,48),new fr(s)}class Sx{constructor(t,e,n=6){this.scene=t,this.fx=e,this.fish=[];for(let d=0;d<n;d++){const m=Mx();m.userData={ang:Math.random()*6.28,rad:2+Math.random()*5,speed:.5+Math.random()*.5,depth:.4+Math.random()*1.2,jump:0,jumpT:4+Math.random()*8,phase:Math.random()*6},m.visible=!1,t.add(m),this.fish.push(m)}this.pond=null,this._scan=0,this._padPond=null,this._m=new Bt,this._q=new Ve,this._e=new An,this._v=new C;const i=28,r=new Rn(1,1);r.rotateX(-Math.PI/2);const o=new Float32Array(i);r.setAttribute("aAge",new ar(o,1)),this.ringAge=o,this.ringHead=0,this.ringN=i,this.ringMat=new le({transparent:!0,depthWrite:!1,uniforms:{uColor:{value:new j(16777215)}},vertexShader:`attribute float aAge; varying float vA; varying vec2 vU;
        void main(){ vA = aAge; vU = uv;
        gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position,1.0); }`,fragmentShader:`varying float vA; varying vec2 vU; uniform vec3 uColor;
        void main(){ if (vA <= 0.0 || vA >= 1.0) discard;
          float r = length(vU - 0.5) * 2.0;
          float ring = smoothstep(vA - 0.12, vA, r) * smoothstep(vA + 0.04, vA, r);
          gl_FragColor = vec4(uColor, ring * (1.0 - vA) * 0.5); }`}),this.rings=new cs(r,this.ringMat,i),this.rings.frustumCulled=!1,this.rings.instanceMatrix.setUsage(Zs);const a=new Bt().makeScale(0,0,0);for(let d=0;d<i;d++)this.rings.setMatrixAt(d,a);t.add(this.rings);const l=new Ol(1,18),c=new Float32Array(n);l.setAttribute("aFade",new ar(c,1)),this.shadowFade=c,this.shadowMat=new le({transparent:!0,depthWrite:!1,uniforms:{uTex:{value:yx()}},vertexShader:`attribute float aFade; varying float vF; varying vec2 vU;
        void main(){ vF = aFade; vU = uv;
        gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position,1.0); }`,fragmentShader:`uniform sampler2D uTex; varying float vF; varying vec2 vU;
        void main(){ if (vF <= 0.002) discard;
          float a = texture2D(uTex, vU).a;
          gl_FragColor = vec4(0.03, 0.05, 0.04, a * vF); }`}),this.shadows=new cs(l,this.shadowMat,n),this.shadows.frustumCulled=!1,this.shadows.renderOrder=2,this.shadows.instanceMatrix.setUsage(Zs);for(let d=0;d<n;d++)this.shadows.setMatrixAt(d,a);t.add(this.shadows);const h=new Mo;h.absarc(0,0,1,.42,Math.PI*2-.42,!1),h.lineTo(0,0);const u=new pr(h,26);this.pads=new cs(u,_x,as),this.pads.receiveShadow=!0,this.pads.frustumCulled=!1,this.pads.instanceMatrix.setUsage(Zs);const f=new dr(.17,.24,6);this.flowers=new cs(f,xx,as),this.flowers.frustumCulled=!1,this.flowers.instanceMatrix.setUsage(Zs);for(let d=0;d<as;d++)this.pads.setMatrixAt(d,a),this.flowers.setMatrixAt(d,a);t.add(this.pads,this.flowers),this.padData=[]}_ring(t,e,n,i){const r=this.ringHead;this.ringHead=(this.ringHead+1)%this.ringN,this._m.compose(this._v.set(t,e,n),new Ve,new C(i,1,i)),this.rings.setMatrixAt(r,this._m),this.ringAge[r]=.001,this.rings.instanceMatrix.needsUpdate=!0}_findPond(t){let e=null,n=1e9;for(let i=6;i<70;i+=6){for(let r=0;r<6.28;r+=.5){const o=t.x+Math.cos(r)*i,a=t.z+Math.sin(r)*i;if(bt(o,a)<Mt.waterLevel-1.2){const c=i;c<n&&(n=c,e=new C(o,Mt.waterLevel,a))}}if(e)break}return e}_layoutPads(){const t=Math.round(this.pond.x/4),e=Math.round(this.pond.z/4);let n=0;const i=()=>At(t,e,n++);this.padData.length=0;const r=new Bt().makeScale(0,0,0);for(let o=0;o<as;o++){const a=i()*6.28,l=i()*9,c=this.pond.x+Math.cos(a)*l,h=this.pond.z+Math.sin(a)*l,u=bt(c,h)<Mt.waterLevel-.3,f={x:c,z:h,active:u,scale:.55+i()*.95,yaw:i()*6.28,phase:i()*6.28,flower:u&&i()<.34};this.padData.push(f),u||(this.pads.setMatrixAt(o,r),this.flowers.setMatrixAt(o,r)),f.flower||this.flowers.setMatrixAt(o,r)}this.pads.instanceMatrix.needsUpdate=!0,this.flowers.instanceMatrix.needsUpdate=!0}_hideSurface(){const t=new Bt().makeScale(0,0,0);for(let e=0;e<as;e++)this.pads.setMatrixAt(e,t),this.flowers.setMatrixAt(e,t);for(let e=0;e<this.fish.length;e++)this.shadows.setMatrixAt(e,t);this.pads.instanceMatrix.needsUpdate=!0,this.flowers.instanceMatrix.needsUpdate=!0,this.shadows.instanceMatrix.needsUpdate=!0}update(t,e,n){let i=!1;for(let o=0;o<this.ringN;o++)this.ringAge[o]>0&&this.ringAge[o]<1&&(this.ringAge[o]+=t*.6,i=!0);if(i&&(this.rings.geometry.attributes.aAge.needsUpdate=!0),this._scan-=t,this._scan<=0||!this.pond||this.pond.distanceTo(n)>75){this._scan=2;const o=this._findPond(n);if(o)this.pond=o;else{this.pond=null;for(const a of this.fish)a.visible=!1}}if(!this.pond){this._hideSurface(),this._padPond=null;return}(!this._padPond||this._padPond.distanceTo(this.pond)>1)&&(this._padPond=this.pond.clone(),this._layoutPads());const r=Mt.waterLevel;for(let o=0;o<as;o++){const a=this.padData[o];if(!a||!a.active)continue;const l=Math.sin(e*1.3+a.phase)*.04;this._e.set(-Math.PI/2+Math.sin(e*.9+a.phase)*.05,a.yaw,Math.cos(e*1.1+a.phase)*.05),this._q.setFromEuler(this._e),this._m.compose(this._v.set(a.x,r+.06+l,a.z),this._q,new C(a.scale,a.scale,a.scale)),this.pads.setMatrixAt(o,this._m),a.flower&&(this._e.set(0,a.yaw,0),this._q.setFromEuler(this._e),this._m.compose(this._v.set(a.x,r+.16+l,a.z),this._q,new C(a.scale*.6,a.scale*.7,a.scale*.6)),this.flowers.setMatrixAt(o,this._m))}this.pads.instanceMatrix.needsUpdate=!0,this.flowers.instanceMatrix.needsUpdate=!0;for(let o=0;o<this.fish.length;o++){const a=this.fish[o],l=a.userData;a.visible=!0,l.ang+=l.speed*t*(.4+.6);const c=this.pond.x+Math.cos(l.ang*.3)*2,h=this.pond.z+Math.sin(l.ang*.23)*2,u=c+Math.cos(l.ang)*l.rad,f=h+Math.sin(l.ang)*l.rad;l.jumpT-=t,l.jumpT<=0&&l.jump<=0&&(l.jump=1,l.jumpT=7+Math.random()*12);let d=r-l.depth,m=0;l.jump>0&&(l.jump-=t*1.3,m=Math.sin(Math.max(0,l.jump)*Math.PI),d=r+m*1.6-.1,l.jump<.06&&(this.fx.splash({x:u,y:r,z:f}),this._ring(u,r+.05,f,2.2)),l.jump>.94&&this._ring(u,r+.05,f,1.6)),a.position.set(u,d,f);const v=l.ang+Math.PI/2;a.rotation.y=v,a.rotation.x=l.jump>0?(.5-(1-l.jump))*1.2:Math.sin(e*3+l.phase)*.1,a._tail.rotation.y=Math.sin(e*12+l.phase)*.5;const g=.55+l.depth*.5;this._e.set(-Math.PI/2,v,0),this._q.setFromEuler(this._e),this._m.compose(this._v.set(u,r+.03,f),this._q,new C(g,g*1.3,g)),this.shadows.setMatrixAt(o,this._m),this.shadowFade[o]=yt.clamp(.85-l.depth*.32,.18,.85)*(1-m)}this.shadows.instanceMatrix.needsUpdate=!0,this.shadows.geometry.attributes.aFade.needsUpdate=!0}}class wx{constructor(t,e=80){this.n=e;const n=new Float32Array(e*2*3);this.geo=new pe,this.geo.setAttribute("position",new Gt(n,3)),this.mat=new Su({color:15397631,transparent:!0,opacity:0,blending:on,depthWrite:!1,depthTest:!1,fog:!1}),this.lines=new Od(this.geo,this.mat),this.lines.frustumCulled=!1,this.lines.renderOrder=4,t.add(this.lines),this.off=[];for(let i=0;i<e;i++)this.off.push({a:Math.random()*6.28,r:1.5+Math.random()*8,d:Math.random()});this._f=new C,this._r=new C,this._u=new C,this._up=new C(0,1,0)}update(t,e,n,i,r){const o=r?yt.clamp((i-17)/16,0,1):0;if(this.mat.opacity+=(o*.3-this.mat.opacity)*Math.min(1,t*6),this.mat.opacity<.008){this.lines.visible=!1;return}this.lines.visible=!0;const a=this._f.copy(n);a.lengthSq()<1e-4&&a.set(0,0,1),a.normalize();const l=this._r.crossVectors(a,this._up);l.lengthSq()<1e-4&&l.set(1,0,0),l.normalize();const c=this._u.crossVectors(l,a).normalize(),h=this.geo.attributes.position.array,u=2.5+i*.32,f=8,d=34;for(let m=0;m<this.n;m++){const v=this.off[m];v.d-=t*(.5+i*.05),v.d<0&&(v.d+=1,v.a=Math.random()*6.28,v.r=1.5+Math.random()*8);const g=f-v.d*d,p=(l.x*Math.cos(v.a)+c.x*Math.sin(v.a))*v.r,M=(l.y*Math.cos(v.a)+c.y*Math.sin(v.a))*v.r,y=(l.z*Math.cos(v.a)+c.z*Math.sin(v.a))*v.r,_=e.x+a.x*g+p,b=e.y+a.y*g+M,E=e.z+a.z*g+y,A=m*6;h[A]=_,h[A+1]=b,h[A+2]=E,h[A+3]=_-a.x*u,h[A+4]=b-a.y*u,h[A+5]=E-a.z*u}this.geo.attributes.position.needsUpdate=!0}}function Tx(){const s=document.createElement("canvas");s.width=s.height=64;const t=s.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.25,"rgba(255,255,255,0.7)"),e.addColorStop(.6,"rgba(255,255,255,0.18)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),new fr(s)}class bx{constructor(t){this.scene=t,this.pos=new C,this.vel=new C,this.target=new C,this.col=new j,this.hue=.45,this._placed=!1,this._dartCool=0,this._dir=Math.random()*6.28,this.freeze=!1;const e=Tx(),n=r=>{const o=new yu(new Ul({map:e,color:16777215,transparent:!0,depthWrite:!1,blending:on,fog:!1}));return o.scale.setScalar(r),o.frustumCulled=!1,o};this.halo=n(2.4),this.core=n(.9),this.light=new Du(16777215,0,18,2),this.group=new ge,this.group.add(this.halo,this.core,this.light),t.add(this.group),this.trailN=28,this.trailPos=new Float32Array(this.trailN*3),this.trailAge=new Float32Array(this.trailN);for(let r=0;r<this.trailN;r++)this.trailPos[r*3+1]=-9999;const i=new pe;i.setAttribute("position",new Gt(this.trailPos,3)),i.setAttribute("aAge",new Gt(this.trailAge,1)),this.trailGeo=i,this.trailMat=new le({transparent:!0,depthWrite:!1,blending:on,fog:!1,uniforms:{uColor:{value:new j(16777215)}},vertexShader:`
        attribute float aAge; varying float vA;
        void main(){ vA = aAge;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = (1.0 + 7.0 * aAge) * (60.0 / max(1.0, -mv.z));
          gl_Position = projectionMatrix * mv; }`,fragmentShader:`
        varying float vA; uniform vec3 uColor;
        void main(){ if (vA <= 0.01) discard;
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(uColor, a * vA * vA * 0.5); }`}),this.trail=new Bi(i,this.trailMat),this.trail.frustumCulled=!1,this.trail.renderOrder=3,t.add(this.trail),this._trailHead=0,this._trailT=0}_hoverY(t,e){return Math.max(bt(t,e),Mt.waterLevel)+3.2}_newTarget(t,e){this._dir+=(Math.random()-.5)*1.5;const n=e?15+Math.random()*11:9+Math.random()*8,i=t.x+Math.cos(this._dir)*n,r=t.z+Math.sin(this._dir)*n;this.target.set(i,this._hoverY(i,r)+(Math.random()-.5)*2,r)}park(t,e,n){this.pos.set(t,e,n),this.freeze=!0,this._placed=!0}update(t,e,n,i){if(!this._placed){this._dir=Math.random()*6.28;const u=n.x+Math.cos(this._dir)*12,f=n.z+Math.sin(this._dir)*12;this.pos.set(u,this._hoverY(u,f),f),this._newTarget(n,!0),this._placed=!0}const r=this.pos.distanceTo(n);let o=!1;if(!this.freeze){r>130&&(this._placed=!1),this._dartCool-=t,r<10&&this._dartCool<=0?(this._newTarget(n,!0),this._dartCool=1,o=!0):this.pos.distanceTo(this.target)<2.5&&this._newTarget(n,r<26);const u=r>32,f=u?2:o?17:7.5,d=this.target.clone().sub(this.pos),m=d.length();m>.001&&d.multiplyScalar(1/m),this.vel.addScaledVector(d,(u?6:18)*t),this.vel.x+=Math.sin(e*1.7+1)*t*1.2,this.vel.z+=Math.cos(e*1.3+2)*t*1.2;const v=this.vel.length();v>f&&this.vel.multiplyScalar(f/v),this.pos.addScaledVector(this.vel,t);const g=this._hoverY(this.pos.x,this.pos.z)+Math.sin(e*1.8)*.35;this.pos.y+=(g-this.pos.y)*(1-Math.exp(-3*t))}this.group.position.copy(this.pos),this.hue=(this.hue+t*.03)%1,this.col.setHSL(this.hue,.55,.72);const a=yt.clamp(1-(r-5)/22,0,1),l=.85+Math.sin(e*4)*.15,c=(.5+a*.5)*l;this.core.material.color.copy(this.col).multiplyScalar(1.35),this.halo.material.color.copy(this.col),this.core.material.opacity=c,this.halo.material.opacity=.6*c,this.core.scale.setScalar(.8+a*.5),this.halo.scale.setScalar((2+a*1.4)*(.95+Math.sin(e*3)*.05));const h=yt.clamp(1-i*1.1,0,1);this.light.color.copy(this.col),this.light.intensity=(.6+a*1.4)*(.4+h*1.5)*l,this.trailMat.uniforms.uColor.value.copy(this.col).multiplyScalar(1.15);for(let u=0;u<this.trailN;u++)this.trailAge[u]>0&&(this.trailAge[u]=Math.max(0,this.trailAge[u]-t*1.6));if(this._trailT-=t,this._trailT<=0){this._trailT=.03;const u=this._trailHead;this._trailHead=(this._trailHead+1)%this.trailN,this.trailPos[u*3]=this.pos.x,this.trailPos[u*3+1]=this.pos.y,this.trailPos[u*3+2]=this.pos.z,this.trailAge[u]=1,this.trailGeo.attributes.position.needsUpdate=!0}return this.trailGeo.attributes.aAge.needsUpdate=!0,{near:a,darted:o,dist:r}}}const Ex=`
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`,Ax=`
  varying vec2 vUv;
  uniform float uTime, uAmt, uBright, uSpeed, uSeed;
  uniform vec3 uLo, uHi;
  void main(){
    float x = vUv.x;
    float y = vUv.y;
    float t = uTime * uSpeed + uSeed;
    // wavy curtain: the glowing bottom edge undulates across the sky
    float edge = 0.10
      + 0.06 * sin(x * 6.2831 * 3.0 + t * 0.7)
      + 0.03 * sin(x * 6.2831 * 7.0 - t * 0.5);
    float vp = smoothstep(edge, edge + 0.10, y) * (1.0 - smoothstep(0.58, 1.0, y));
    // several broad ribbons drifting around the ring, so a couple are always in
    // view whichever way you look
    float rib =
        0.9 * smoothstep(0.105, 0.0, abs(fract(x       - t * 0.013 + 0.50) - 0.5)) +
        0.8 * smoothstep(0.085, 0.0, abs(fract(x       - t * 0.021 + 0.13) - 0.5)) +
        0.8 * smoothstep(0.075, 0.0, abs(fract(x       + t * 0.017 + 0.81) - 0.5)) +
        0.7 * smoothstep(0.070, 0.0, abs(fract(x * 2.0 - t * 0.011 + 0.30) - 0.5)) +
        0.6 * smoothstep(0.065, 0.0, abs(fract(x * 2.0 + t * 0.009 + 0.66) - 0.5));
    rib = clamp(rib, 0.0, 1.5);
    // fine vertical shimmer striations
    float shim = 0.78 + 0.22 * sin(x * 240.0 + sin(x * 30.0 - t * 0.6) * 3.0 + t);
    vec3 col = mix(uLo, uHi, clamp(y * 1.4, 0.0, 1.0));
    float a = vp * rib * shim * uAmt * uBright;
    if (a <= 0.002) discard;
    gl_FragColor = vec4(col * (0.7 + 0.5 * rib), a);
  }
`;function Ih(s,t,e,n,i,r,o,a){const l=new dn(s,s,t,128,1,!0),c=new le({vertexShader:Ex,fragmentShader:Ax,transparent:!0,depthWrite:!1,depthTest:!0,blending:on,fog:!1,side:Oe,uniforms:{uTime:{value:0},uAmt:{value:0},uBright:{value:a},uSpeed:{value:r},uSeed:{value:o},uLo:{value:new j(n)},uHi:{value:new j(i)}}}),h=new kt(l,c);return h.position.y=e,h.frustumCulled=!1,h.renderOrder=-1,h}class Cx{constructor(t){this.group=new ge,this.layers=[Ih(600,300,220,4847014,9067775,1,0,1.5),Ih(560,320,240,4251903,12607743,-.7,13,.95)];for(const e of this.layers)this.group.add(e);t.add(this.group),this.amt=0}update(t,e,n){this.amt+=(n-this.amt)*.04,this.group.position.set(t.x,0,t.z);const i=this.amt>.003;if(this.group.visible=i,!!i)for(const r of this.layers)r.material.uniforms.uTime.value=e,r.material.uniforms.uAmt.value=this.amt}}class Rx{constructor(t,e=3,n=12){this.max=e,this.trail=n,this.n=e*n,this.pos=new Float32Array(this.n*3),this.a=new Float32Array(this.n);for(let r=0;r<this.n;r++)this.pos[r*3+1]=-9999;const i=new pe;i.setAttribute("position",new Gt(this.pos,3)),i.setAttribute("aA",new Gt(this.a,1)),this.geo=i,this.mat=new le({transparent:!0,depthWrite:!1,blending:on,fog:!1,uniforms:{uNight:{value:0}},vertexShader:`
        attribute float aA; uniform float uNight; varying float vA;
        void main(){ vA = aA * uNight;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = (1.0 + 9.0 * aA) * (90.0 / max(1.0, -mv.z));
          gl_Position = projectionMatrix * mv; }`,fragmentShader:`
        varying float vA;
        void main(){ if (vA <= 0.01) discard;
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vec3(0.85, 0.92, 1.0), a * vA); }`}),this.points=new Bi(i,this.mat),this.points.frustumCulled=!1,this.points.renderOrder=0,t.add(this.points),this.stars=[];for(let r=0;r<e;r++)this.stars.push({active:!1,base:r*n,head:0,life:0,pos:new C,vel:new C});this._t=3+Math.random()*6}_spawn(t){const n=Math.random()*6.28,i=yt.degToRad(34+Math.random()*42);t.pos.set(700*Math.cos(i)*Math.cos(n),700*Math.sin(i),700*Math.cos(i)*Math.sin(n));const r=n+(Math.random()<.5?1:-1)*(1+Math.random());t.vel.set(Math.cos(r),-.25-Math.random()*.5,Math.sin(r)).normalize().multiplyScalar(720+Math.random()*420),t.life=.7+Math.random()*.5,t.active=!0,t.head=0;for(let o=0;o<this.trail;o++)this.a[t.base+o]=0,this.pos[(t.base+o)*3+1]=-9999}update(t,e,n,i){this.points.position.copy(e),this.mat.uniforms.uNight.value=n;for(const r of this.stars){if(r.active){r.life-=t,r.pos.addScaledVector(r.vel,t);const o=r.base+r.head;r.head=(r.head+1)%this.trail,this.pos[o*3]=r.pos.x,this.pos[o*3+1]=r.pos.y,this.pos[o*3+2]=r.pos.z,this.a[o]=1,r.life<=0&&(r.active=!1)}for(let o=0;o<this.trail;o++){const a=r.base+o;this.a[a]>0&&(this.a[a]=Math.max(0,this.a[a]-t*3.2))}}if(this._t-=t,n>.55&&i>.4&&this._t<=0){const r=this.stars.find(o=>!o.active);r&&this._spawn(r),this._t=3.5+Math.random()*9}this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.aA.needsUpdate=!0}}const Px=`
  varying vec2 vUv; varying vec3 vW;
  void main(){ vUv = uv; vW = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`,Lx=`
  varying vec2 vUv; varying vec3 vW;
  uniform float uTime, uAmt; uniform vec3 uColor;
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float vnoise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
    float a = hash(i), b = hash(i + vec2(1,0)), c = hash(i + vec2(0,1)), d = hash(i + vec2(1,1));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y); }
  void main(){
    if (uAmt <= 0.002) discard;
    vec2 p = vW.xz * 0.02;
    float n = vnoise(p + vec2(uTime * 0.010, uTime * 0.013)) * 0.6
            + vnoise(p * 2.3 - vec2(uTime * 0.019, 0.0)) * 0.4;
    float edge = smoothstep(1.0, 0.35, length(vUv - 0.5) * 2.0);  // hide the sheet's rim
    float a = smoothstep(0.30, 0.78, n) * edge * uAmt;
    if (a <= 0.003) discard;
    gl_FragColor = vec4(uColor, a * 0.38);
  }
`;class Dx{constructor(t){const e=new Rn(620,620,1,1);e.rotateX(-Math.PI/2),this.mat=new le({vertexShader:Px,fragmentShader:Lx,transparent:!0,depthWrite:!1,depthTest:!0,side:Fe,fog:!1,uniforms:{uTime:{value:0},uAmt:{value:0},uColor:{value:new j(14674674)}}}),this.mesh=new kt(e,this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1,this.mesh.position.y=Mt.waterLevel+.25,t.add(this.mesh),this.amt=0}update(t,e,n){this.amt+=(n-this.amt)*.05,this.mesh.position.x=t.x,this.mesh.position.z=t.z,this.mesh.visible=this.amt>.004,this.mesh.visible&&(this.mat.uniforms.uTime.value=e,this.mat.uniforms.uAmt.value=this.amt)}}function Ux(){const s=document.createElement("canvas");s.width=s.height=64;const t=s.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.4,"rgba(255,255,255,0.5)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),new fr(s)}class Ix{constructor(t){this.group=new ge,this.group.visible=!1,this.nookMat=new Ce({color:1314056,roughness:1,transparent:!0,opacity:0});const e=new kt(new Le(1,16,12),this.nookMat);e.scale.set(.8,1,.5),this.group.add(e),this.bedMat=new Ce({color:7311180,roughness:.9,emissive:2767386,emissiveIntensity:.25,transparent:!0,opacity:0});const n=new kt(new Le(1,14,8),this.bedMat);n.scale.set(.6,.18,.4),n.position.set(0,-.5,.12),this.group.add(n),this.glow=new yu(new Ul({map:Ux(),color:16763001,transparent:!0,opacity:0,depthWrite:!1,blending:on,fog:!1})),this.glow.scale.setScalar(2.2),this.glow.position.set(0,.05,.25),this.glow.frustumCulled=!1,this.group.add(this.glow),this.light=new Du(16758890,0,9,2),this.light.position.set(0,.4,.35),this.group.add(this.light),t.add(this.group),this._struct=0,this._glow=0}update(t,e,n,i,r){const o=e?i:0,a=e?Math.max(i*.3,r):0;if(this._struct+=(o-this._struct)*(1-Math.exp(-4*t)),this._glow+=(a-this._glow)*(1-Math.exp(-4*t)),this._struct<.01&&this._glow<.01){this.group.visible=!1;return}if(this.group.visible=!0,e){const c=n.x-e.x,h=n.z-e.z,u=Math.atan2(c,h),f=e.trunkRadius*.9;this.group.position.set(e.x+Math.sin(u)*f,e.baseY+.6,e.z+Math.cos(u)*f),this.group.rotation.y=u}const l=.85+Math.sin(performance.now()*.003)*.15;this.nookMat.opacity=Math.min(1,this._struct*1.4),this.bedMat.opacity=Math.min(1,this._struct*1.4),this.glow.material.opacity=this._glow*.85*l,this.glow.scale.setScalar(1.7+this._glow*.9),this.light.intensity=this._glow*2.4*l}}class Nx{constructor(t,e){this.camera=t,this.input=e,this.yaw=0,this.pitch=.26,this.distance=Je.distance,this.target=new C,this._desired=new C,this._lookAt=new C,this._curLook=new C,this.forward=new C(0,0,1),this.right=new C(1,0,0),this._idleLook=0,this._initialized=!1,this.trauma=0,this.fov=Je.fov}addShake(t){this.trauma=Math.min(1,this.trauma+t)}updateBasis(){this.forward.set(Math.sin(this.yaw),0,Math.cos(this.yaw)),this.right.set(-Math.cos(this.yaw),0,Math.sin(this.yaw))}updateLook(t){const e=this.input,n=e.consumeLook(new et),i=e.isTouch?Je.touchSensitivity:Je.mouseSensitivity;n.lengthSq()>0?(this.yaw-=n.x*i,this.pitch+=n.y*i,this._idleLook=0):this._idleLook+=t,this.pitch=yt.clamp(this.pitch,Je.pitchMin,Je.pitchMax);const r=e.consumeZoom();r&&(this.distance=yt.clamp(this.distance+r*.8,Je.minDistance,Je.maxDistance)),this.updateBasis()}follow(t,e){const n=e.velocity,i=Math.hypot(n.x,n.z);if(this._idleLook>.5&&i>4&&e.state!=="climb"){let u=Math.atan2(n.x,n.z)-this.yaw;u=Math.atan2(Math.sin(u),Math.cos(u));const f=Je.autoAlignRate*Math.min(1,i/14);this.yaw+=u*(1-Math.exp(-f*t)),this.updateBasis()}this.target.copy(e.position).y+=1;const r=Math.cos(this.pitch),o=Math.sin(this.pitch);this._desired.set(this.target.x-this.forward.x*r*this.distance,this.target.y+o*this.distance+Je.height*.25,this.target.z-this.forward.z*r*this.distance),this._initialized||(this.camera.position.copy(this._desired),this._curLook.copy(this.target),this._initialized=!0);const a=1-Math.exp(-7.5*t);this.camera.position.lerp(this._desired,a),this._avoidTrunks(e);{const _tx=this.target.x,_tz=this.target.z,_ty=this.target.y,_dx=this.camera.position.x-_tx,_dz=this.camera.position.z-_tz,_dy=this.camera.position.y-_ty,_a=Math.hypot(_dx,_dz);if(_a>.6)for(let _k=1;_k<=5;_k++){const _f=_k/5;if(bt(_tx+_dx*_f,_tz+_dz*_f)+.15>_ty+_dy*_f){const _n=Math.max(.28,(_k-1)/5);this.camera.position.set(_tx+_dx*_n,_ty+_dy*_n,_tz+_dz*_n);break}}}const l=bt(this.camera.position.x,this.camera.position.z)+Je.collisionPad;if(this.camera.position.y<l&&(this.camera.position.y=l),this.trauma>.001){const h=this.trauma*this.trauma,u=performance.now()*.05;this.camera.position.x+=Math.sin(u*1.7)*h*.5,this.camera.position.y+=Math.sin(u*2.3+1.7)*h*.5,this.camera.position.z+=Math.sin(u*1.9+3.1)*h*.4,this.trauma=Math.max(0,this.trauma-t*1.8)}const c=1-Math.exp(-10.5*t);this._curLook.lerp(this.target,c),this.camera.lookAt(this._curLook)}_avoidTrunks(t){const e=t.world?.activeTrees;if(!e||!e.length)return;const n=this.target.x,i=this.target.z;let r=this.camera.position.x-n,o=this.camera.position.z-i;const a=Math.hypot(r,o);if(a<.3)return;r/=a,o/=a;let l=a;for(const c of e){if(c.topY<this.target.y-1.5)continue;const h=c.x-n,u=c.z-i,f=h*r+u*o;if(f<=.4||f>=a)continue;const d=h*h+u*u-f*f,m=c.trunkRadius+Je.collisionPad+.3;if(d<m*m){const v=f-Math.sqrt(m*m-d);v<l&&(l=v)}}if(l<a){const c=Math.max(1.4,l);this.camera.position.x=n+r*c,this.camera.position.z=i+o*c,this.camera.position.y=yt.lerp(this.target.y+.6,this.camera.position.y,c/a)}}}const Ei=new Ce({color:0xd6b98b,roughness:.96,metalness:0}),Nh=new Ce({color:0x9b6a39,roughness:.97,metalness:0}),Fh=new Ce({color:0xf2dfbf,roughness:.95,metalness:0}),Fx=new Ce({color:0x1a120d,roughness:.72,metalness:0}),zh=new di({color:16777215,transparent:!0,opacity:0}),Oh=new Ce({color:0xd79a9b,roughness:.86,metalness:0}),CuteMat=new Ce({color:0xd6b98b,roughness:.96,metalness:0,transparent:!0,opacity:0}),zx=new Ce({color:0xc8975a,roughness:.9,metalness:0,side:Fe,transparent:!0,opacity:.9});function Ln(s,t,e,n,i=16){const r=new Le(1,i,i);r.scale(t,e,n);const o=new kt(r,s);return o.castShadow=!0,o}class Ox{
constructor(){
this.group=new ge;
this.group.name="Glide cute flying-squirrel avatar v80 fast-stable tree-grab";
this.bodyG=new ge;
this.bodyG.name="soft bean body rig";
this.group.add(this.bodyG);
const makeMat=(color,rough=.92,opacity=1,side)=>{const mat=new Ce({color,roughness:rough,metalness:0});if(opacity<1){mat.transparent=!0;mat.opacity=opacity;mat.depthWrite=!1}if(side)mat.side=side;return mat};
this.mat={fur:makeMat(0xd9b47b,.97),furDark:makeMat(0xb9874f,.96),belly:makeMat(0xffedce,.94),eye:makeMat(0x130c08,.68),shine:makeMat(0xffffff,.5),nose:makeMat(0x1c120c,.72),ear:makeMat(0xe7a99e,.86),blush:makeMat(0xf1a49a,.86,.72),wing:makeMat(0xc8935a,.9,.9,Fe)};
const sph=(mat,sx,sy,sz,seg=18)=>{const geo=new Le(1,seg,seg);geo.scale(sx,sy,sz);const mesh=new kt(geo,mat);mesh.castShadow=!0;mesh.receiveShadow=!0;return mesh};
this.body=sph(this.mat.fur,.39,.32,.49,20);this.body.position.set(0,.33,-.04);this.bodyG.add(this.body);
this.belly=sph(this.mat.belly,.27,.21,.16,18);this.belly.position.set(0,.30,.31);this.bodyG.add(this.belly);
this.headG=new ge;this.headG.name="round expressive head";this.headG.position.set(0,.73,.30);this.bodyG.add(this.headG);
this.head=sph(this.mat.fur,.37,.33,.31,22);this.headG.add(this.head);
this.muzzle=sph(this.mat.belly,.23,.13,.105,18);this.muzzle.position.set(0,-.085,.285);this.headG.add(this.muzzle);
this.eyes=[];this.shines=[];this.cheeks=[];this.ears=[];
for(const side of[-1,1]){
 const eye=sph(this.mat.eye,.055,.073,.024,18);eye.name=side<0?"left warm eye":"right warm eye";eye.position.set(side*.128,.035,.307);this.headG.add(eye);this.eyes.push(eye);
 const hi=sph(this.mat.shine,.014,.018,.006,8);hi.position.set(side*.108,.065,.326);this.headG.add(hi);this.shines.push(hi);
 const cheek=sph(this.mat.blush,.062,.033,.017,10);cheek.position.set(side*.205,-.095,.305);this.headG.add(cheek);this.cheeks.push(cheek);
 const earG=new ge;earG.position.set(side*.235,.245,-.025);earG.rotation.z=side*-.18;earG.userData={sx:side,baseZ:side*-.18};this.headG.add(earG);this.ears.push(earG);
 const outer=sph(this.mat.fur,.115,.14,.055,14);outer.position.set(0,.03,0);earG.add(outer);
 const inner=sph(this.mat.ear,.067,.087,.028,12);inner.position.set(0,.035,.033);earG.add(inner);
}
this.nose=sph(this.mat.nose,.032,.022,.018,10);this.nose.position.set(0,-.12,.386);this.headG.add(this.nose);
this.smile=sph(this.mat.nose,.012,.006,.006,8);this.smile.position.set(0,-.154,.382);this.headG.add(this.smile);
this.legs={};
const paw=(name,x,z,front)=>{const g=new ge;g.name=name;g.position.set(x,.165,z);g.userData={x,z,front};const limb=sph(this.mat.fur,front?.045:.054,front?.105:.075,front?.041:.056,10);limb.position.y=-.06;g.add(limb);const pad=sph(this.mat.belly,front?.036:.044,.026,front?.030:.036,8);pad.position.set(0,-.135,front?.034:.018);g.add(pad);this.bodyG.add(g);this.legs[name]=g};
paw("fl",-.205,.205,!0);paw("fr",.205,.205,!0);paw("bl",-.235,-.175,!1);paw("br",.235,-.175,!1);
this.pata={};
for(const side of[-1,1]){
 const shape=new Mo;shape.moveTo(0,.24);shape.quadraticCurveTo(side*.55,.24,side*.82,-.03);shape.quadraticCurveTo(side*.54,-.32,0,-.25);shape.lineTo(0,.24);
 const geo=new pr(shape,18);const wing=new kt(geo,this.mat.wing);wing.name=side<0?"left soft gliding membrane":"right soft gliding membrane";wing.rotation.x=-Math.PI/2;wing.position.set(0,.285,.055);wing.castShadow=!0;wing.receiveShadow=!0;this.bodyG.add(wing);this.pata[side<0?"l":"r"]=wing;
}
this.tailG=new ge;this.tailG.name="fluffy balancing tail";this.tailG.position.set(0,.34,-.43);this.bodyG.add(this.tailG);this.tailSegs=[];
let parent=this.tailG;
const tail=[{w:.24,h:.16,d:.28,z:-.06,y:.02,mat:this.mat.furDark},{w:.30,h:.19,d:.36,z:-.19,y:.055,mat:this.mat.furDark},{w:.34,h:.22,d:.40,z:-.23,y:.065,mat:this.mat.fur},{w:.25,h:.16,d:.29,z:-.19,y:.025,mat:this.mat.belly}];
for(const seg of tail){const g=new ge;g.position.set(0,seg.y,seg.z);const blob=sph(seg.mat,seg.w,seg.h,seg.d,16);blob.position.z=-seg.d*.18;g.add(blob);parent.add(g);this.tailSegs.push(g);parent=g}
this.glide=0;this.climb=0;this.swim=0;this.runW=0;this.phase=0;this.idle=0;this._blink=1.2;this._blinkT=0;this._sq=0;this._sqV=0;this._lookT=.5;this._lookYaw=0;this._earKick=0;this._setLegBase();
}
_setLegBase(){this.legs.fl.rotation.set(.04,0,.18);this.legs.fr.rotation.set(.04,0,-.18);this.legs.bl.rotation.set(-.03,0,.12);this.legs.br.rotation.set(-.03,0,-.12)}
update(t,e){
 const time=this._t=(this._t||0)+t;
 const isAir=e.state==="glide"||e.state==="air",isClimb=e.state==="climb",isSwim=e.state==="swim";
 const damp=(a,b,k)=>a+(b-a)*(1-Math.exp(-k*t));
 this.glide=damp(this.glide,isAir?1:0,11);this.climb=damp(this.climb,isClimb?1:0,10);this.swim=damp(this.swim,isSwim?1:0,8);
 const speed=yt.clamp((e.speed||0)/8,0,1);this.runW=damp(this.runW,speed*(1-this.glide)*(1-this.swim),8);this.phase+=t*(3.4+(e.speed||0)*.78+this.swim*2);
 const p=this.phase,g=this.glide,run=this.runW,sw=this.swim;
 this.pata.l.scale.setScalar(.24+g*.82);this.pata.r.scale.setScalar(.24+g*.82);this.pata.l.material.opacity=.38+g*.5;
 const leg=(part,offset,side)=>{const stride=Math.sin(p*2+offset)*(.62*run+.28*sw);const glidePose=part.userData.front?-.82:.42;part.rotation.x=yt.lerp(stride,glidePose,g);part.rotation.z=yt.lerp(part.userData.x<0?.18:-.18,side*.86,g);part.position.y=.165+Math.max(0,Math.sin(p*2+offset))*.035*run+Math.sin(p*3+offset)*.025*sw};
 leg(this.legs.fl,0,-1);leg(this.legs.fr,Math.PI,1);leg(this.legs.bl,Math.PI,-1);leg(this.legs.br,0,1);
 if(e.stretch)this._sqV+=e.stretch*11;if(e.land)this._sqV-=e.land*13;this._sqV+=(-this._sq*86-this._sqV*12)*t;this._sq+=this._sqV*t;this._sq=yt.clamp(this._sq,-.65,.8);
 const bob=Math.max(0,Math.sin(p*2))*.035*run+Math.sin(time*2)*.035*sw;
 this.bodyG.position.y=bob;this.bodyG.rotation.z=damp(this.bodyG.rotation.z,-(e.turn||0)*.38,.1);this.bodyG.rotation.x=damp(this.bodyG.rotation.x,yt.lerp(0,-.13,g)+sw*.08,.08);
 this.bodyG.scale.set((1+g*.13)*(1-this._sq*.12),(1-g*.13)*(1+this._sq*.22),(1+g*.10)*(1-this._sq*.11));
 this.headG.rotation.x=damp(this.headG.rotation.x,yt.lerp(-.035+Math.sin(p*2)*.045*run,-.24,g)+sw*.12,10);
 this.headG.position.y=damp(this.headG.position.y,.73-g*.03+Math.sin(time*1.7)*.015*(1-run-g),8);
 this._blink-=t;if(this._blink<0){this._blink=1.7+Math.random()*3.2;this._blinkT=.14}this._blinkT=(this._blinkT||0)-t;const blink=this._blinkT>0?Math.sin((1-this._blinkT/.14)*Math.PI):0;
 for(const eye of this.eyes)eye.scale.y=1-blink*.86;
 for(const shine of this.shines)shine.visible=blink<.35;
 const idle=yt.clamp(1-run-g-sw,0,1);this._lookT-=t;if(this._lookT<0){this._lookT=1.2+Math.random()*2.5;this._lookYaw=(Math.random()-.5)*.46}this.headG.rotation.y=damp(this.headG.rotation.y,(this._lookYaw||0)*idle,3);
 this._earT=(this._earT||0)-t;if(this._earT<0){this._earT=.75+Math.random()*2.7;this._earKick=.55}this._earKick=(this._earKick||0)*Math.exp(-7*t);
 for(const ear of this.ears){ear.rotation.z=(ear.userData.baseZ||0)+Math.sin(time*28)*this._earKick*.18*ear.userData.sx+Math.sin(time*1.5+ear.userData.sx)*.025*idle;ear.rotation.x=.05*g}
 const tailSwing=(.09+.18*run)*(1-g)+sw*.22;for(let i=0;i<this.tailSegs.length;i++){const seg=this.tailSegs[i],a=i/Math.max(1,this.tailSegs.length-1);seg.rotation.x=yt.lerp(.12+.08*i,-.10-.04*i,g)+Math.sin(time*2.4-i*.65)*.05*(.4+run+sw);seg.rotation.y=Math.sin(p*1.55-i*.4)*tailSwing*(.55+a)+Math.sin(time*1.2+i)*.025*idle;seg.rotation.z=Math.sin(time*1.4+i)*.018*idle}
 if(idle>.25){this.bodyG.scale.y*=1+Math.sin(time*2.2)*.018*idle;this.cheeks.forEach((c,i)=>c.scale.setScalar(1+Math.sin(time*2.1+i)*.025*idle))}
 const rest=e.rest||0;if(rest>.001){this.bodyG.scale.multiplyScalar(1-.08*rest);this.headG.rotation.x=damp(this.headG.rotation.x,.44,8*rest);this.headG.position.y=damp(this.headG.position.y,.53,7*rest);this.tailG.rotation.y=damp(this.tailG.rotation.y,.72,8*rest);for(const eye of this.eyes)eye.scale.y*=1-.78*rest;for(const shine of this.shines)shine.visible=rest<.45}else this.tailG.rotation.y=damp(this.tailG.rotation.y,0,4)
}
}const Qr=new C(0,1,0),Sn=new C,Pi=new C,xn=new C,oi=new C,ai=new C,Te=new C,li=new C,Bh=new Ve,kh=new Bt;function pa(s,t,e,n){Sn.subVectors(e,t);const i=Sn.lengthSq()||1e-6;let r=Pi.subVectors(s,t).dot(Sn)/i;return r=yt.clamp(r,0,1),n.copy(t).addScaledVector(Sn,r),r}class Bx{constructor(t){this.world=t,this.position=new C(0,0,0),this.velocity=new C,this.state="ground",this.facing=0,this.pitch=0,this.roll=0,this.turnRate=0,this.grounded=!0,this._coyote=0,this._jumpBuf=0,this._grabCooldown=0,this._land=0,this._stretch=0,this.climbTree=null,this.climbSeg=null,this.surfaceNormal=new C(0,1,0),this._tq=new Ve,this.speed=0,this.position.y=bt(0,0)+se.groundClearance}_moveDir(t,e,n){return n.set(0,0,0),n.addScaledVector(e.forward,t.move.y),n.addScaledVector(e.right,t.move.x),n}update(t,e,n){switch(this._coyote-=t,this._jumpBuf-=t,this._grabCooldown-=t,e.consumeActionEdge()&&(this._jumpBuf=se.jumpBuffer),this.state){case"ground":this._ground(t,e,n);break;case"air":this._air(t,e,n);break;case"climb":this._climb(t,e,n);break;case"swim":this._swim(t,e,n);break}return this.speed=Math.hypot(this.velocity.x,this.velocity.z),this._animInfo()}_ground(t,e,n){bt(this.position.x,this.position.z);const i=this._moveDir(e,n,xn),r=i.lengthSq()>1e-4;r&&i.normalize();const o=e.sprint?se.sprintSpeed:se.runSpeed,a=gl(this.position.x,this.position.z,Te),l=r?i.dot(Sn.set(a.x,0,a.z)):0,c=o*(1+l*se.slopeBoost),h=this.velocity;if(r){oi.copy(i).multiplyScalar(c);const d=1-Math.exp(-60/o*t*6);h.x+=(oi.x-h.x)*d,h.z+=(oi.z-h.z)*d;const m=Math.atan2(h.x,h.z);this._slewFacing(m,se.turnResponse,t)}else{const d=Math.exp(-38/Math.max(2,o)*t*6);h.x*=d,h.z*=d}if(this.position.x+=h.x*t,this.position.z+=h.z*t,this.speed>1.2&&this._tryGrabTree(!0))return;const u=bt(this.position.x,this.position.z);if(u<Mt.waterLevel&&this.position.y<=Mt.waterLevel+.2){this.state="swim";return}const f=u+se.groundClearance;if(this.position.y<=f+.08?(this.position.y=f,h.y=0,this.grounded=!0,this._coyote=se.coyoteTime,this.surfaceNormal.copy(gl(this.position.x,this.position.z,Te))):(h.y-=se.gravity*t,this.position.y+=h.y*t,this.grounded=!1,this.position.y<f&&(this.position.y=f,h.y=0)),this._jumpBuf>0&&this._coyote>0){h.y=se.jumpSpeed,this.position.y+=.02,this._jumpBuf=0,this._coyote=0,this.grounded=!1,this._stretch=1,this.state="air";return}!this.grounded&&this._coyote<=0&&h.y<-1&&(this.state="air"),this.surfaceNormal.lerp(Qr,0)}_air(t,e,n){const i=this.velocity,r=e.move.x,o=e.move.y;this.facing-=r*se.glideTurn*t,this.roll=yt.clamp(yt.lerp(this.roll,-r*.20,1-Math.exp(-6*t)),-.20,.20);const a=o>0?-.5*o:.5*-o;this.pitch=yt.clamp(yt.lerp(this.pitch,a*.46,1-Math.exp(-3*t)),-.34,.24);const l=Sn.set(Math.sin(this.facing),Math.sin(this.pitch),Math.cos(this.facing));l.normalize();const c=Math.max(0,-this.pitch),h=se.glideForward+c*se.glidePitchDive;i.addScaledVector(l,h*t);const u=Math.hypot(i.x,i.z),f=Math.min(se.glideGravity,u*se.glideLift);i.y-=(se.glideGravity-f)*t;const d=i.length();if(d>.001&&(Pi.copy(l).multiplyScalar(d),i.lerp(Pi,1-Math.exp(-.28*6*t))),d>se.glideMaxSpeed&&i.multiplyScalar(se.glideMaxSpeed/d),(()=>{const N=Math.max(1,Math.min(8,Math.ceil(i.length()*t/.5))),S=t/N;for(let K=0;K<N;K++){this.position.addScaledVector(i,S);const G=bt(this.position.x,this.position.z)+se.groundClearance;if(this.position.y<G){this.position.y=G;break}}})(),this._tryGrabTree(!1))return;const m=bt(this.position.x,this.position.z),vGround=m+se.groundClearance;if(m<Mt.waterLevel&&this.position.y<=Mt.waterLevel){this.state="swim",this.roll=0;return}if(this.position.y<=vGround){this.position.y=vGround,this._land=yt.clamp(-i.y/14,.25,1),i.y=0,this.roll=0,this.pitch=0,this.state="ground",this._coyote=se.coyoteTime;return}}_enterClimb(t,e,n){this.state="climb",this.climbTree=t,this.climbSeg=e;const i=Math.min(this.speed,se.runSpeed);this.velocity.set(0,Math.max(this.velocity.y,n?i*.6:i*.4),0)}_climb(t,e,n){const i=this.climbTree;if(!i){this.state="air";return}let r=null,o=1/0;for(const M of i.segments){const y=pa(this.position,M.a,M.b,xn),_=xn.distanceToSquared(this.position);_<o&&(o=_,r={seg:M,t:y,point:xn.clone()})}if(!r||o>(r.seg.r+4.6)*(r.seg.r+4.6)){this._leap(.3);return}const a=r.seg;this.climbSeg=a,ai.subVectors(a.b,a.a).normalize(),Te.subVectors(this.position,r.point),Te.addScaledVector(ai,-Te.dot(ai)),Te.lengthSq()<1e-5?Te.set(0,0,1):Te.normalize(),this.surfaceNormal.copy(Te),li.crossVectors(Te,ai).normalize();const l=e.move.y,c=e.move.x,h=a.kind==="branch"?se.branchRunSpeed:se.climbSpeed,u=this.velocity;oi.set(0,0,0).addScaledVector(ai,l*h).addScaledVector(li,c*h*.8);const f=1-Math.exp(-40*.15*t*6);u.lerp(oi,f),this.position.addScaledVector(u,t);let d=null,m=1/0;for(const M of i.segments){const y=pa(this.position,M.a,M.b,xn),_=xn.distanceToSquared(this.position);_<m&&(m=_,d={s:M,t:y,point:xn.clone()})}Te.subVectors(this.position,d.point),ai.subVectors(d.s.b,d.s.a).normalize(),Te.addScaledVector(ai,-Te.dot(ai)),Te.lengthSq()<1e-5?Te.set(0,0,1):Te.normalize();const v=Pi.copy(d.point).addScaledVector(Te,d.s.r+se.radius*.6);this.position.lerp(v,1-Math.exp(-2.2*6*t)),this.surfaceNormal.copy(Te);const g=xn.copy(u);g.lengthSq()>.5&&(this.facing=Math.atan2(g.x,g.z));const p=d.s;if(p.kind==="trunk"&&d.t>.97&&l>.1){this._leap(1,!0);return}if(p.kind==="branch"&&d.t>.98&&l>.1){this._leap(.8,!0);return}if(d.t<.02&&l<0){this.state="ground",this.velocity.multiplyScalar(.3);return}if(this._jumpBuf>0){this._jumpBuf=0,this._leap(1);return}}_leap(t,e=!1){const n=this.velocity;Sn.copy(this.surfaceNormal).multiplyScalar(se.leapForward*t);const i=Pi.set(Math.sin(this.facing),0,Math.cos(this.facing));n.addScaledVector(i,se.leapForward*t*(e?.9:.5)),n.x+=Sn.x,n.z+=Sn.z,n.y=Math.max(n.y,se.jumpSpeed*(e?.7:1)),this.position.addScaledVector(this.surfaceNormal,.2),this.climbTree=null,this.climbSeg=null,this.pitch=-.1,this._grabCooldown=.6,this.state="air"}_swim(t,e,n){const i=this.velocity,r=this._moveDir(e,n,xn);if(r.lengthSq()>1e-4){r.normalize(),oi.copy(r).multiplyScalar(se.swimSpeed);const c=1-Math.exp(-26*.2*t*6);i.x+=(oi.x-i.x)*c,i.z+=(oi.z-i.z)*c,this._slewFacing(Math.atan2(i.x,i.z),6,t)}else i.x*=Math.exp(-2*t),i.z*=Math.exp(-2*t);const a=Mt.waterLevel;if(e.action)i.y-=se.diveSpeed*t*4;else{const c=a-this.position.y;i.y+=(c*se.buoyancy-i.y*4)*t}i.y=yt.clamp(i.y,-6,se.buoyancy),this.position.addScaledVector(i,t),this.position.y=Math.min(this.position.y,a+.3);const l=bt(this.position.x,this.position.z);l>a-.2&&(this.position.y=l+se.groundClearance,this.state="ground",i.y=0),this.surfaceNormal.copy(Qr)}_slewFacing(t,e,n){let i=t-this.facing;i=Math.atan2(Math.sin(i),Math.cos(i)),this.turnRate=i*e,this.facing+=i*(1-Math.exp(-e*n))}_tryGrabTree(t){if(this._grabCooldown>0)return!1;const e=this.world.activeTrees;if(!e.length)return!1;const n=this.position.x,i=this.position.z,r=Math.hypot(this.velocity.x,this.velocity.z)||1;if(!t&&r>99)return!1;const o=this.velocity.x/r,a=this.velocity.z/r;let l=null,c=null,h=1/0;for(const u of e){const f=u.x-n,d=u.z-i,m=Math.hypot(f,d);if(m>u.reach+se.autoClimbDist||this.position.y>u.topY+1)continue;const v=f/(m||1)*o+d/(m||1)*a,g=t?se.autoClimbDot:-.15;if(!(v<g))for(const p of u.segments){pa(this.position,p.a,p.b,xn);const M=xn.distanceTo(this.position),y=p.r+se.radius+(t?se.autoClimbDist:2.2);M<y&&M<h&&(h=M,l=u,c=p)}}return l?(this._enterClimb(l,c,t),!0):!1}_animInfo(){const t={state:this.state,speed:this.velocity.length(),turn:this.turnRate,vy:this.velocity.y,land:this._land,stretch:this._stretch};return this._land=0,this._stretch=0,t}applyTransform(t,e){t.position.copy(this.position),this.state==="ground"&&(t.position.y-=se.groundClearance);if(this.state==="climb")Pi.set(Math.sin(this.facing),0,Math.cos(this.facing)),Te.copy(this.surfaceNormal),li.crossVectors(Te,Pi),li.lengthSq()<1e-4&&li.set(1,0,0),li.normalize(),Sn.crossVectors(li,Te).normalize(),kh.makeBasis(li,Te,Sn),this._tq.setFromRotationMatrix(kh);else{let n=this.pitch,i=this.roll;if(this.state==="air"){n=yt.clamp(n,-.34,.24);i=yt.clamp(i,-.20,.20)}this.state==="ground"&&this.surfaceNormal,Bh.setFromAxisAngle(Qr,this.facing);const r=new Ve().setFromAxisAngle(new C(1,0,0),n),o=new Ve().setFromAxisAngle(new C(0,0,1),i);if(this._tq.copy(Bh).multiply(r).multiply(o),this.state==="ground"){const a=new Ve().setFromUnitVectors(Qr,this.surfaceNormal);this._tq.premultiply(a.slerp(new Ve,.4))}}t.quaternion.slerp(this._tq,1-Math.exp(-12*e))}}const wt=new __(document.getElementById("app")),Ye=new x_(wt.renderer.domElement),$n=location.search.includes("touch=1")||matchMedia("(pointer: coarse)").matches||(navigator.maxTouchPoints||0)>1;$n&&(Mt.viewChunks=3,Mt.fogNear=135,Mt.fogFar=300,wt.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.25)));const St=new T_(wt.scene);$n&&St.sun.shadow.mapSize.set(1024,1024);const kx=new hx(wt.scene),Zu=new Cx(wt.scene),ju=new Rx(wt.scene,$n?1:2),Ku=new Dx(wt.scene),be=new ux(wt.scene,{drops:$n?520:900}),re=new ex(wt.scene),ma=new ix(wt.scene,St.sunDir),vl=new rx(wt.scene,$n?38:68),Ju=new ax(wt.scene,$n?4:7),Gh=new px(wt.scene,$n?{flocks:1,deer:2}:{flocks:1,deer:3}),$u=new mx(wt.scene,$n?32:55),Gx=new gx(wt.scene),yn=new cx(wt.scene),_l=new Sx(wt.scene,yn),Vx=new wx(wt.scene,$n?22:38),ir=new bx(wt.scene),Qu=new Ix(wt.scene),to=new C,at=new Nx(wt.camera,Ye),ur=new Ox;wt.scene.add(ur.group);function Hx(){for(let s=0;s<240;s+=6)for(let t=0;t<6.28;t+=.7){const e=Math.cos(t)*s,n=Math.sin(t)*s,i=bt(e,n);if(i>Mt.waterLevel+1.5&&Ze(e,n)<.4)return new C(e,i,n)}return new C(0,bt(0,0),0)}const Ne=Hx(),X=new Bx(re);X.position.copy(Ne);re.update(X.position);for(let s=0;s<10&&re._queue.length;s++){const[,t,e]=re._queue.shift(),n=re._key(t,e);re.chunks.has(n)||re._build(t,e,n)}re._refreshActiveTrees();const Wx=document.getElementById("veil"),ql=document.getElementById("hint");let sr=!1,tf=!1;function Xx(){sr||(sr=!0,Wx.classList.add("hidden"),setTimeout(()=>{tf||ql.classList.add("show")},1400))}const ci=new M_;function qx(){tf=!0,ql.classList.add("gone"),ci.start()}for(const s of["keydown","pointerdown","touchstart","wheel"])window.addEventListener(s,qx,{once:!0});const xl=document.getElementById("idle"),Yx=document.getElementById("photo"),ef=document.getElementById("shutter"),ga=document.getElementById("flash"),Zx=document.getElementById("cozy");let va=0,bs=!1,vo=!1,Xn=0;function nf(s){bs=s,Yx.classList.toggle("show",s),ef.classList.toggle("show",s),s&&(ql.classList.add("gone"),xl.classList.remove("show"))}window.addEventListener("keydown",s=>{s.code==="KeyP"?nf(!bs):s.code==="Enter"&&bs&&(vo=!0)});ef.addEventListener("click",()=>{vo=!0});window.addEventListener("touchstart",s=>{s.touches.length>=3&&nf(!bs)});const Zt=(location.hash||"").replace("#","");function jx(){if(Zt==="glide"||Zt==="air")X.position.y+=22,X.state="air",X.velocity.set(0,1,15),X.pitch=-.12,at.distance=5,at.pitch=.55;else if(Zt==="swim"){let s=null;for(let t=0;t<400&&!s;t+=8)for(let e=0;e<6.28;e+=.5){const n=Ne.x+Math.cos(e)*t,i=Ne.z+Math.sin(e)*t;if(bt(n,i)<Mt.waterLevel-.5){s=new C(n,Mt.waterLevel,i);break}}s&&(X.position.copy(s),X.state="swim",re.update(X.position),re.buildAllPending())}else if(Zt==="vista"||Zt==="high")at.distance=11,at.pitch=.15;else if(Zt==="horizon")X.position.y+=26,X.state="air",X.velocity.set(0,0,10),at.yaw=Math.atan2(-St.sunDir.x,-St.sunDir.z),at.pitch=.08,at.distance=9;else if(Zt==="sun")at.yaw=Math.atan2(St.sunDir.x,St.sunDir.z),at.pitch=0,at.distance=7;else if(["dawn","noon","dusk","night"].includes(Zt))St.setTime({dawn:.275,noon:.5,dusk:.71,night:0}[Zt]),St.dayLength=1e9,X.position.y+=30,X.state="air",X.velocity.set(0,0,4),at.yaw=2.3,at.pitch=.05,at.distance=10;else if(["spring","summer","autumn","winter"].includes(Zt)){const s={spring:0,summer:1,autumn:2,winter:3}[Zt];let t=null;for(let e=0;e<3500&&!t;e+=36)for(let n=0;n<6.28;n+=.25){const i=Math.cos(n)*e,r=Math.sin(n)*e;if(Kr(i,r)===s&&bt(i,r)>Mt.waterLevel+1){t=new C(i,bt(i,r),r);break}}t&&(X.position.copy(t),re.update(t),re.buildAllPending(),X.position.y+=26,X.state="air",X.velocity.set(0,0,4),at.yaw=2.1,at.pitch=.16,at.distance=10,St.setTime(.32),St.dayLength=1e9)}else if(["rain","storm","cloudy","snow"].includes(Zt)){if(Zt==="snow"){let s=null;for(let t=0;t<3500&&!s;t+=36)for(let e=0;e<6.28;e+=.25){const n=Math.cos(e)*t,i=Math.sin(e)*t;if(Kr(n,i)===3&&bt(n,i)>Mt.waterLevel+1){s=new C(n,bt(n,i),i);break}}s&&(X.position.copy(s),re.update(s),re.buildAllPending()),be.snowing=1}be._cloudTarget=be.cloudiness=Zt==="cloudy"?.72:.95,be._wetTarget=be.wetness=Zt==="cloudy"?0:Zt==="storm"?1:.8,be._timer=1e9,X.position.y+=22,X.state="air",X.velocity.set(0,0,5),at.yaw=2.1,at.pitch=.12,at.distance=10,St.setTime(.4),St.dayLength=1e9}else if(Zt==="ripples"){let s=null;for(let t=0;t<400&&!s;t+=8)for(let e=0;e<6.28;e+=.5){const n=Ne.x+Math.cos(e)*t,i=Ne.z+Math.sin(e)*t;if(bt(n,i)<Mt.waterLevel-.8){s=new C(n,Mt.waterLevel,i);break}}s&&(X.position.copy(s),X.state="swim",re.update(s),re.buildAllPending()),be._cloudTarget=be.cloudiness=.95,be._wetTarget=be.wetness=1,be.snowing=0,be._timer=1e9,at.distance=6.5,at.pitch=.6,St.setTime(.4),St.dayLength=1e9}else if(Zt==="tracks"){let s=null;for(let t=0;t<3500&&!s;t+=36)for(let e=0;e<6.28;e+=.25){const n=Math.cos(e)*t,i=Math.sin(e)*t;if(Kr(n,i)===3&&bt(n,i)>Mt.waterLevel+1&&Ze(n,i)<.35){s=new C(n,bt(n,i),i);break}}s&&(X.position.copy(s),X.state="ground",re.update(s),re.buildAllPending()),at.distance=8,at.pitch=.62,at.yaw=0,St.setTime(.45),St.dayLength=1e9}else if(Zt==="fireflies")St.setTime(.95),St.dayLength=1e9,at.distance=7,at.pitch=.04;else if(Zt==="deer")at.distance=28,at.pitch=.5,at.yaw=.4,St.setTime(.46),St.dayLength=1e9;else if(Zt==="giant"){let s=null;for(let t=0;t<14&&!s;t++)for(let e=-t;e<=t&&!s;e++)for(let n=-t;n<=t&&!s;n++){if(Math.max(Math.abs(e),Math.abs(n))!==t||At(e,n,80)>=.12)continue;const i=e*64+(.25+At(e,n,81)*.5)*64,r=n*64+(.25+At(e,n,82)*.5)*64,o=bt(i,r);o>Mt.waterLevel+1&&Ze(i,r)<.42&&(s=new C(i,o,r))}s&&(X.position.set(s.x+16,bt(s.x+16,s.z+11),s.z+11),re.update(X.position),re.buildAllPending(),at.yaw=Math.atan2(s.x-X.position.x,s.z-X.position.z),at.pitch=-.12,at.distance=9,St.setTime(.34),St.dayLength=1e9,wt.bloom.enabled=!1,wt.godrays.enabled=!1,wt.grade.enabled=!1,wt.scene.fog.near=9e3,wt.scene.fog.far=9001,vl.points.visible=!1)}else if(Zt==="thumb")wt.scene.fog.near=6e3,wt.scene.fog.far=6001,St.setTime(.33),St.dayLength=1e9,at.yaw=2.35,at.pitch=.16,at.distance=4.6,X.facing=.6;else if(Zt==="model")wt.bloom.enabled=!1,wt.godrays.enabled=!1,wt.grade.enabled=!1,wt.scene.fog.near=9e3,wt.scene.fog.far=9001,vl.points.visible=!1,$u.points.visible=!1,St.setTime(.42),St.dayLength=1e9,at.yaw=Math.PI,at.pitch=.05,at.distance=2.7,X.facing=0;else if(Zt==="pose")St.setTime(.5),St.dayLength=1e9,at.yaw=.6,at.pitch=.32,at.distance=5.5,X.facing=0;else if(Zt==="face")St.setTime(.5),St.dayLength=1e9,at.yaw=Math.PI,at.pitch=.28,at.distance=4,X.facing=0;else if(Zt==="climb"){let s=null,t=1/0;for(const e of re.activeTrees){const n=(e.x-Ne.x)**2+(e.z-Ne.z)**2;n<t&&(t=n,s=e)}s&&(X.position.set(s.x,s.baseY+s.height*.45,s.z+s.trunkRadius+.4),X.state="climb",X.climbTree=s,at.distance=4.4,at.yaw=Math.PI,at.pitch=.1)}else if(Zt==="wisp"){St.setTime(.66),St.dayLength=1e9;const s=Ne.z+7;ir.park(Ne.x,bt(Ne.x,s)+2.1,s),at.yaw=0,at.pitch=.05,at.distance=5.4,X.facing=0}else if(Zt==="pond"){let s=null,t=null;for(let e=8;e<360&&!s;e+=8)for(let n=0;n<6.28;n+=.35){const i=Ne.x+Math.cos(n)*e,r=Ne.z+Math.sin(n)*e;if(bt(i,r)<Mt.waterLevel-1.4){s=new C(i,Mt.waterLevel,r);break}}if(s){const e=new C(Ne.x-s.x,0,Ne.z-s.z).normalize();for(let i=4;i<26;i+=1.5){const r=s.x+e.x*i,o=s.z+e.z*i;if(bt(r,o)>Mt.waterLevel+.6){t=new C(r,bt(r,o),o);break}}const n=t||s;X.position.copy(n),re.update(n),re.buildAllPending(),_l.update(.016,0,n),_l.update(.016,0,n),at.yaw=Math.atan2(s.x-n.x,s.z-n.z),at.pitch=.34,at.distance=6.5,St.setTime(.4),St.dayLength=1e9}}else if(Zt==="aurora"){let s=null;for(let t=0;t<3500&&!s;t+=36)for(let e=0;e<6.28;e+=.25){const n=Math.cos(e)*t,i=Math.sin(e)*t;if(Kr(n,i)===3&&bt(n,i)>Mt.waterLevel+1.5&&Ze(n,i)<.35){s=new C(n,bt(n,i),i);break}}s&&(X.position.copy(s),re.update(s),re.buildAllPending(),at.yaw=.7,at.pitch=-.55,at.distance=8,St.setTime(0),St.dayLength=1e9)}else if(Zt==="fog"){let s=null;for(let t=8;t<380&&!s;t+=8)for(let e=0;e<6.28;e+=.35){const n=Ne.x+Math.cos(e)*t,i=Ne.z+Math.sin(e)*t;if(bt(n,i)<Mt.waterLevel-1){s=new C(n,Mt.waterLevel,i);break}}if(s){const t=new C(Ne.x-s.x,0,Ne.z-s.z).normalize();let e=s,n=-1e9;for(let i=10;i<40;i+=2){const r=s.x+t.x*i,o=s.z+t.z*i,a=bt(r,o);a>Mt.waterLevel+.4&&a>n&&(n=a,e=new C(r,a,o))}X.position.copy(e),re.update(e),re.buildAllPending(),at.yaw=Math.atan2(s.x-e.x,s.z-e.z),at.pitch=.3,at.distance=8,St.setTime(.235),St.dayLength=1e9}}else if(Zt==="hollow"){let s=null,t=1e9;const e=Mt.chunkSize;for(let n=-6;n<=6;n++)for(let i=-6;i<=6;i++){if(At(i,n,80)>=.12)continue;const r=i*e+(.25+At(i,n,81)*.5)*e,o=n*e+(.25+At(i,n,82)*.5)*e,a=bt(r,o);if(a>Mt.waterLevel+1&&Ze(r,o)<.42){const l=r*r+o*o;l<t&&(t=l,s=new C(r,a,o))}}if(s){const n=Math.atan2(-s.x,-s.z);X.position.set(s.x+Math.sin(n)*1.6,s.y,s.z+Math.cos(n)*1.6),re.update(X.position),re.buildAllPending(),at.yaw=Math.atan2(s.x-X.position.x,s.z-X.position.z),at.pitch=.1,at.distance=4.4,St.setTime(.72),St.dayLength=1e9,Xn=1}}}jx();let Kx=Zt==="auto"||Zt==="run"||Zt==="tracks",Mn=0,qs=null,_a=null;function Ml(s){Mn+=s;const t=X;if(Mn<.3)Ye.move.set(0,0);else if(Mn<.4&&!qs){let e=1/0;for(const n of re.activeTrees){const i=(n.x-t.position.x)**2+(n.z-t.position.z)**2;i<e&&i>4&&(e=i,qs=n)}qs&&(at.yaw=Math.atan2(qs.x-t.position.x,qs.z-t.position.z))}else Mn<2.4||Mn<3.6?Ye.move.set(0,1):Mn<3.7?Ye._setAction(!0):Mn<3.8?(Ye._setAction(!1),Ye.move.set(0,.2)):Ye.move.set(.15,.4);t.state!==_a&&(console.warn(`T+${Mn.toFixed(2)} ${_a} -> ${t.state} pos=${t.position.toArray().map(e=>e.toFixed(1))} spd=${t.speed.toFixed(1)}`),_a=t.state),Mn-(Ml._s||0)>.5&&(Ml._s=Mn,console.warn(`  · T+${Mn.toFixed(1)} [${t.state}] y=${t.position.y.toFixed(1)} spd=${t.speed.toFixed(1)} vy=${t.velocity.y.toFixed(1)}`))}let eo=0,xa=0,Ys=0;function Jx(s){if(eo+=s,xa++,eo<2)return;const t=xa/eo;eo=0,xa=0,t<40&&Ys<3&&(Ys++,Ys===1?wt.renderer.setPixelRatio(1):Ys===2?(wt.bloom.strength=.28,Mt.viewChunks=Math.max(3,Mt.viewChunks-1)):Ys===3&&(St.sun.shadow.mapSize.set(1024,1024),St.sun.shadow.map?.dispose?.(),St.sun.shadow.map=null))}const Ai=new C,Vh=new C;function $x(){Ai.copy(wt.camera.position).addScaledVector(St.sunDir,1e3),Ai.project(wt.camera),wt.camera.getWorldDirection(Vh);const s=Vh.dot(St.sunDir),e=Ai.z<1&&Math.abs(Ai.x)<1.6&&Math.abs(Ai.y)<1.6?yt.smoothstep(s,.3,.85)*.72*(1-be.cloudiness*.85):0,n=wt.godrays.uniforms;n.uSun.value.set(Ai.x*.5+.5,Ai.y*.5+.5),n.uIntensity.value+=(e-n.uIntensity.value)*.08}let no=null,Ma=0,ya=0,Sa=0,wa=0,Hh=!1;function sf(s){no===null&&(no=s);let t=(s-no)/1e3;no=s,t=Math.min(.05,Math.max(0,t));const e=s/1e3;Zt||Jx(t),Kx&&Ye.move.set(0,1),Zt==="test"&&Ml(t),at.updateLook(t);const n=X.state,i=X.update(t,Ye,at);X.state!==n&&(X.state==="swim"?(yn.splash(X.position),at.addShake(.3)):X.state==="ground"&&(n==="air"||n==="swim")?yn.dust(X.position):X.state==="climb"&&(yn.leaves(X.position),at.addShake(.22))),i.land>0&&at.addShake(.25+i.land*.55),X.state==="air"&&X.speed>21&&at.addShake(t*(X.speed-21)/9*.5),X.applyTransform(ur.group,t);let r=null,o=1e9;for(const M of re.activeTrees){if(!M.giant)continue;const y=Math.hypot(M.x-X.position.x,M.z-X.position.z);y<o&&(o=y,r=M)}let a=0,l=!1;r&&(a=yt.clamp(1-(o-r.trunkRadius)/3.5,0,1),l=o<r.trunkRadius+2.4&&X.state==="ground"&&Math.abs(X.position.y-r.baseY)<2.6);const c=X.speed<1.3&&Ye.move.lengthSq()<.01&&!Ye.action,h=l&&c&&sr;Xn+=((h?1:0)-Xn)*(1-Math.exp(-(h?1.3:3)*t)),i.rest=Xn,ur.update(t,i),at.follow(t,X),Gx.update(t,X,Yn(X.position.x,X.position.z)>.5),Ma-=t,X.state==="ground"&&X.speed>13&&Ma<=0&&(yn.footDust(X.position),Ma=.06),Sa-=t,X.state==="ground"&&X.speed>4&&Sa<=0&&go(X.position.x,X.position.z)>.5&&(Sa=.15,yn.petals(X.position),Math.random()<.55&&ci.flowerChime()),yn.update(t),to.copy(X.velocity),to.lengthSq()>.01&&to.normalize(),Vx.update(t,wt.camera.position,to,X.speed,X.state==="air"),re.update(X.position),re.update_anim(e),re.stepSnowmen(t,X.position,yn,ci),ma.update(e,wt.camera.position),vl.update(e,wt.camera.position);const u=Math.max(0,Math.sin(e*.23)*.5+Math.sin(e*.11+1.3)*.34+Math.sin(e*.063)*.3);if(un.uGust.value=u*.85,ya-=t,u>.55&&ya<=0&&X.state!=="swim"){ya=.12;const M=-7*u,y=3*u,_=Xl(X.position.x,X.position.z,Math.random);yn.windLeaf(X.position.x+(Math.random()-.5)*24,X.position.y+5+Math.random()*8,X.position.z+(Math.random()-.5)*24,_,M,y)}wa-=t,X.state==="ground"&&X.speed>5&&wa<=0&&Yn(X.position.x,X.position.z)<.4&&bt(X.position.x,X.position.z)>Mt.waterLevel+.5&&Math.random()<.5&&(wa=.5+Math.random()*.6,yn.dandelion(X.position.x,X.position.y+.3,X.position.z,-6*u-1,3*u),Math.random()<.5&&ci.puff()),Ju.update(t,X.position,X.speed),Gh.update(t,X.position,e),_l.update(t,e,X.position),$u.update(t,e,X.position,St.dayAmount);const f=ir.update(t,e,X.position,St.dayAmount);f.darted&&yn.sparkle(ir.pos,ir.col.getHex());const d=L_(X.position.x,X.position.z);if(re.scatter.glowMat.emissiveIntensity=yt.clamp(1-St.dayAmount*1.3,0,1)*2.4,Zt==="deer"&&!Hh){const M=Gh.deer[0];M.pos.set(X.position.x,bt(X.position.x,X.position.z+18),X.position.z+18),M.placed=!0,M.heading=Math.PI,M.graze=1,at.yaw=0,at.distance=5.5,at.pitch=.14,Hh=!0}kx.update(wt.camera.position),be.update(t,wt.camera.position,St.cloudTint),St.update(t,X.position,wt.camera.position,be.cloudiness);const m=yt.smoothstep(Yn(X.position.x,X.position.z),.25,.8),v=yt.clamp(1-St.dayAmount*1.4,0,1);Zu.update(wt.camera.position,e,m*v*(1-be.cloudiness*.7)),ju.update(t,wt.camera.position,v,1-be.cloudiness);const g=1-yt.smoothstep(St.sunElev??0,-4,12);Ku.update(wt.camera.position,e,g*(1-be.wetness*.5)*.18),ma.uniforms.uSunDir.value.copy(St.sunDir),ma.uniforms.uRain.value=be.wetness*(1-be.snowing),un.uSunView.value.copy(St.sunDir).transformDirection(wt.camera.matrixWorldInverse),un.uGlowAmt.value=1.35*St.dayAmount*(1-be.cloudiness*.7),$x(),ci.update(t,X.state,X.speed,be.wetness,d),ci.glide(t,X.state==="air",X.speed),ci.wisp(t,f.near),f.darted&&ci.wispDart(),Qu.update(t,r&&a>.02?r:null,X.position,a,Xn),ci.setCozy(Xn),Zx.style.opacity=(Xn*.92).toFixed(3),Xn>.55&&Math.random()<t*2.2&&yn.sparkle({x:X.position.x+(Math.random()-.5),y:X.position.y+.7,z:X.position.z+(Math.random()-.5)},16767392);const p=Je.fov+yt.clamp((X.speed-10)/18,0,1)*15;if(Math.abs(wt.camera.fov-p)>.01&&(wt.camera.fov+=(p-wt.camera.fov)*(1-Math.exp(-3*t)),wt.camera.updateProjectionMatrix()),wt.render(),vo){vo=!1;try{const M=document.createElement("a");M.href=wt.renderer.domElement.toDataURL("image/png"),M.download="glide-"+Date.now()+".png",M.click(),ga.classList.remove("go"),ga.offsetWidth,ga.classList.add("go")}catch{}}Zt||(X.speed>.6||Ye.move.lengthSq()>.01||Ye.action||bs||!sr||Xn>.05?(va=0,bs||xl.classList.remove("show")):(va+=t,va>5&&xl.classList.add("show"))),!sr&&s>150&&Xx(),requestAnimationFrame(sf)}requestAnimationFrame(sf);window.__GAME={engine:wt,world:re,sky:St,weather:be,player:X,camera:at,squirrel:ur,input:Ye,critters:Ju,wisp:ir,aurora:Zu,shootingStars:ju,groundFog:Ku,hollow:Qu,biomeAt(s,t){return{kind:Kr(s,t),blend:+L_(s,t).toFixed(3),snow:+Yn(s,t).toFixed(3),flower:+go(s,t).toFixed(3),ground:+bt(s,t).toFixed(2)}},sampleBiomes(s=X.position.x,t=X.position.z,e=288,n=32){const i=[0,0,0,0,0,0,0];let r=0,o=0,a=0;for(let l=-e;l<=e;l+=n)for(let c=-e;c<=e;c+=n){const h=s+l,u=t+c,f=Kr(h,u);i[f]++,r+=Yn(h,u),o+=go(h,u),a++}return{counts:i,snow:+(r/a).toFixed(3),flower:+(o/a).toFixed(3)}},findBiome(s,t=X.position.x,e=X.position.z){let n=null,i=1/0;for(let r=0;r<=3400;r+=36)for(let o=0;o<6.283;o+=.22){const a=t+Math.cos(o)*r,l=e+Math.sin(o)*r,c=bt(a,l);if(c<=Mt.waterLevel+1||Ze(a,l)>.58)continue;const h=Kr(a,l),u=Yn(a,l),f=go(a,l);if(s===3?u>.55:s===0?f>.55:h===s){const d=(a-t)*(a-t)+(l-e)*(l-e);if(d<i){i=d,n={x:a,y:c,z:l,kind:h,snow:+u.toFixed(3),flower:+f.toFixed(3)}}}}return n},debugInfo(){return{ready:!0,state:X.state,time:+St.time.toFixed(3),sunElev:+(St.sunElev??0).toFixed(1),dayAmount:+(St.dayAmount??0).toFixed(2),glide:+ur.glide.toFixed(2),pos:X.position.toArray().map(s=>+s.toFixed(1)),speed:+X.speed.toFixed(2),chunks:re.chunks.size,trees:re.activeTrees.length,calls:wt.renderer.info.render.calls}}};
