"use strict";module.exports=class{static getMediaDimensions(t){return t instanceof HTMLImageElement?{width:t.naturalWidth,height:t.naturalHeight}:t instanceof HTMLVideoElement?{width:t.videoWidth,height:t.videoHeight}:{width:t.width,height:t.height}}static isMediaLoaded(t){if(!(t instanceof HTMLImageElement||t instanceof HTMLVideoElement))throw new Error("Invalid argument element");return t instanceof HTMLImageElement?t.complete:t.readyState>=HTMLMediaElement.HAVE_FUTURE_DATA}static getInnerDimensions(t){const e=getComputedStyle(t);return{width:t.clientWidth-(parseFloat(e.getPropertyValue("padding-left"))+parseFloat(e.getPropertyValue("padding-right"))),height:t.clientHeight-(parseFloat(e.getPropertyValue("padding-top"))+parseFloat(e.getPropertyValue("padding-bottom")))}}static awaitMediaLoaded(t){return new Promise((e,o)=>{t.addEventListener(t instanceof HTMLVideoElement?"loadedmetadata":"load",t=>e(t),{once:!0}),t.addEventListener("error",t=>o(t),{once:!0})})}static getRotatedRectCoordinates(t,e,o,a,i=0){let n,r,l,s;if(0!==i){const d=t+o/2,h=e+a/2;n=this.getRotationCoordinate(t,e,d,h,i),r=this.getRotationCoordinate(t+o,e,d,h,i),l=this.getRotationCoordinate(t+o,e+a,d,h,i),s=this.getRotationCoordinate(t,e+a,d,h,i)}else n={x:t,y:e},r={x:t+o,y:e},l={x:t+o,y:e+a},s={x:t,y:e+a};return[n,r,l,s]}static getRotationCoordinate(t,e,o,a,i){const n=i*(Math.PI/180),r=Math.sin(n),l=Math.cos(n);return{x:l*(t-o)-r*(e-a)+o,y:r*(t-o)+l*(e-a)+a}}static getCenterCoordinate(...t){const e=t.reduce((t,{x:e,y:o})=>(t.x+=e,t.y+=o,t),{x:0,y:0});return e.x/=t.length,e.y/=t.length,e}static getAngleBetweenCoordinates(t,e,o,a){return 180*Math.atan2(a-e,o-t)/Math.PI}static getDistance(t,e,o,a){return Math.sqrt(Math.pow(o-t,2)+Math.pow(a-e,2))}static fitParent(t,e,o){const{width:a,height:i}=this.getMediaDimensions(t),n=getComputedStyle(t),r=getComputedStyle(e),l=parseFloat(r.getPropertyValue("width"))-parseFloat(r.getPropertyValue("padding-right"))-parseFloat(r.getPropertyValue("border-right-width"))-parseFloat(r.getPropertyValue("padding-left"))-parseFloat(r.getPropertyValue("border-left-width")),s=parseFloat(r.getPropertyValue("height"))-parseFloat(r.getPropertyValue("padding-top"))-parseFloat(r.getPropertyValue("border-top-width"))-parseFloat(r.getPropertyValue("padding-bottom"))-parseFloat(r.getPropertyValue("border-bottom-width")),d=parseFloat(r.getPropertyValue("padding-top"))+parseFloat(r.getPropertyValue("border-top-width"))+parseFloat(r.getPropertyValue("margin-top")),h=parseFloat(r.getPropertyValue("padding-left"))+parseFloat(r.getPropertyValue("border-left-width"))+parseFloat(r.getPropertyValue("margin-left")),g=l/a,c=s/i,p="contain"===o?Math.min(g,c):Math.max(g,c),u=h+(l-a*p)/2,w=d+(s-i*p)/2,y=a*p,m=i*p;"cover"===o&&(e.style.overflow="hidden"),"static"===r.getPropertyValue("position")&&(e.style.position="relative"),"absolute"!==n.getPropertyValue("position")&&(t.style.position="absolute"),t.style.left=u+"px",t.style.top=w+"px",t.style.width=y+"px",t.style.height=m+"px"}static getRenderClientRect(t){const e=getComputedStyle(t).getPropertyValue("object-fit"),o=getComputedStyle(t).getPropertyValue("object-position").split(" "),{width:a,height:i}=this.getMediaDimensions(t),n=a/i,r=t.clientWidth,l=t.clientHeight,s=r/l,d=parseInt(o[0])/100,h=parseInt(o[1])/100;let g=0,c=0,p=0,u=0;const w={width:1,height:1,x:0,y:0};return"none"===e?(g=r,c=l,p=(a-r)*d,u=(i-l)*h):"contain"===e||"scale-down"===e?(g=a,c=i,n>s?(w.height=i/l/(a/r),w.y=(1-w.height)*h):(w.width=a/r/(i/l),w.x=(1-w.width)*d)):"cover"===e?n>s?(g=i*s,c=i,p=(a-g)*d):(g=a,c=a/s,u=(i-c)*h):"fill"===e?(g=a,c=i):console.error(`Unexpected object-fit attribute with value ${e} relative to`),{x:p,y:u,width:g,height:c,destination:w}}static drawPoint(t,e,o,a){a=Object.assign({radius:3,color:"rgb(0,64,221)"},a||{});const i=t.getContext("2d");i.beginPath(),i.arc(e,o,a.radius,0,2*Math.PI),i.fillStyle=a.color,i.fill()}static drawCenterPoint(t,e,o){o=Object.assign({radius:3,color:"rgb(0,64,221)"},o||{});const{x:a,y:i}=this.getCenterCoordinate(...e);this.drawPoint(t,a,i,o)}static drawRectangle(t,e,o,a,i,n){n=Object.assign({degree:0,lineWidth:2,lineColor:"rgb(0,64,221)",shadowBlur:0,shadowColor:"rgb(0,64,221)",fill:void 0},n||{});const r=this.getRotatedRectCoordinates(e,o,a,i,n.degree),l=t.getContext("2d");l.lineWidth=n.lineWidth,l.strokeStyle=n.lineWidth?n.lineColor:"transparent",n.shadowBlur&&(l.shadowOffsetX=0,l.shadowOffsetY=0,l.shadowBlur=n.shadowBlur,l.shadowColor=n.shadowColor),l.beginPath(),l.moveTo(r[0].x,r[0].y),l.lineTo(r[1].x,r[1].y),l.lineTo(r[2].x,r[2].y),l.lineTo(r[3].x,r[3].y),l.closePath(),l.stroke(),n.fill&&(l.fillStyle=n.fill,l.fill())}static drawRectangleCorners(t,e,o,a,i,n){n=Object.assign({lineWidth:2,lineColor:"rgb(0,64,221)",shadowBlur:0,shadowColor:"rgb(0,64,221)"},n||{});const r=t.getContext("2d");n.lineWidth&&(r.strokeStyle=n.lineColor,r.lineWidth=n.lineWidth),n.shadowBlur&&(r.shadowOffsetX=0,r.shadowOffsetY=0,r.shadowBlur=n.shadowBlur,r.shadowColor=n.shadowColor);const l=Math.min(a,i)/4;r.beginPath(),r.moveTo(e,o+l),r.lineTo(e,o),r.lineTo(e+l,o),r.moveTo(e+a-l,o),r.lineTo(e+a,o),r.lineTo(e+a,o+l),r.moveTo(e,o+i-l),r.lineTo(e,o+i),r.lineTo(e+l,o+i),r.moveTo(e+a-l,o+i),r.lineTo(e+a,o+i),r.lineTo(e+a,o+i-l),r.stroke()}static drawText(t,e,o,a,i){i=Object.assign({font:"14px arial,sans-serif",color:"black",align:"left",baseline:"top"},i||{});const n=t.getContext("2d");n.font=i.font,n.fillStyle=i.color,n.textAlign=i.align,n.textBaseline=i.baseline,n.fillText(e,o,a)}static drawLine(t,e,o,a,i,n){n=Object.assign({lineWidth:1,color:"rgb(0,64,221)"},n||{});const r=t.getContext("2d");r.beginPath(),r.moveTo(e,o),r.lineTo(a,i),r.strokeStyle=n.color,r.lineWidth=n.lineWidth,r.stroke()}static clearCanvas(t){t.getContext("2d").clearRect(0,0,t.width,t.height)}static flipHorizontal(t){const e=t.getContext("2d"),o=e.getImageData(0,0,t.width,t.height),a=o.height,i=o.width;for(let t=0;t<a;t++)for(let e=0;e<i/2;e++){const a=4*t*i+4*e,n=4*(t+1)*i-4*(e+1);for(let t=0;t<4;t++){let e=o.data[a+t];o.data[a+t]=o.data[n+t],o.data[n+t]=e}}e.putImageData(o,0,0,0,0,i,a)}static async loadImage(t){const e=new Image;return e.setAttribute("src",t),await this.awaitMediaLoaded(e),e}static async cropCircle(t,e){e=Object.assign({x:void 0,y:void 0,size:void 0,format:"image/png"},e||{}),"string"==typeof t&&(t=await this.loadImage(t)),this.isMediaLoaded(t)||await this.awaitMediaLoaded(t);const{width:o,height:a}=this.getMediaDimensions(t),i=Math.min(o,a);let n=e.x||0,r=e.y||0;!e.x&&o>a&&(n=o/2-a/2),!e.y&&o<a&&(r=a/2-o/2);const l=document.createElement("canvas");l.width=e.size||i,l.height=e.size||i;const s=l.getContext("2d");s.drawImage(t,n,r,i,i,0,0,l.width,l.height),s.globalCompositeOperation="destination-in",s.beginPath(),s.arc(l.width/2,l.height/2,l.width/2,0,2*Math.PI),s.closePath(),s.fill();const d=new Image;return d.src=l.toDataURL(e.format,1),d}static getTextDimensions(t,e){const o=document.createElement("canvas").getContext("2d");e&&(o.font=e);const a=o.measureText(t),i=Math.ceil(a.actualBoundingBoxAscent+a.actualBoundingBoxDescent);return{width:Math.ceil(a.width),height:i}}};
