export default class{static getMediaDimensions(t){return t instanceof HTMLImageElement?{width:t.naturalWidth,height:t.naturalHeight}:t instanceof HTMLVideoElement?{width:t.videoWidth,height:t.videoHeight}:{width:t.width,height:t.height}}static isMediaLoaded(t){if(!(t instanceof HTMLImageElement||t instanceof HTMLVideoElement))throw new Error("Invalid argument element");return t instanceof HTMLImageElement?t.complete:t.readyState>=HTMLMediaElement.HAVE_FUTURE_DATA}static getInnerDimensions(t){const e=getComputedStyle(t);return{width:t.clientWidth-(parseFloat(e.getPropertyValue("padding-left"))+parseFloat(e.getPropertyValue("padding-right"))),height:t.clientHeight-(parseFloat(e.getPropertyValue("padding-top"))+parseFloat(e.getPropertyValue("padding-bottom")))}}static awaitMediaLoaded(t){return new Promise((e,o)=>{t.addEventListener(t instanceof HTMLVideoElement?"loadedmetadata":"load",t=>e(t),{once:!0}),t.addEventListener("error",t=>o(t),{once:!0})})}static getRotatedRectCoordinates(t,e,o,a,i=0){let r,n,l,s;if(0!==i){const d=t+o/2,h=e+a/2;r=this.getRotationCoordinate(t,e,d,h,i),n=this.getRotationCoordinate(t+o,e,d,h,i),l=this.getRotationCoordinate(t+o,e+a,d,h,i),s=this.getRotationCoordinate(t,e+a,d,h,i)}else r={x:t,y:e},n={x:t+o,y:e},l={x:t+o,y:e+a},s={x:t,y:e+a};return[r,n,l,s]}static getRotationCoordinate(t,e,o,a,i){const r=i*(Math.PI/180),n=Math.sin(r),l=Math.cos(r);return{x:l*(t-o)-n*(e-a)+o,y:n*(t-o)+l*(e-a)+a}}static getCenterCoordinate(...t){const e=t.reduce((t,{x:e,y:o})=>(t.x+=e,t.y+=o,t),{x:0,y:0});return e.x/=t.length,e.y/=t.length,e}static getAngleBetweenCoordinates(t,e,o,a){return 180*Math.atan2(a-e,o-t)/Math.PI}static getDistance(t,e,o,a){return Math.sqrt(Math.pow(o-t,2)+Math.pow(a-e,2))}static fitParent(t,e,o){const{width:a,height:i}=this.getMediaDimensions(t),r=getComputedStyle(t),n=getComputedStyle(e),l=parseFloat(n.getPropertyValue("width"))-parseFloat(n.getPropertyValue("padding-right"))-parseFloat(n.getPropertyValue("border-right-width"))-parseFloat(n.getPropertyValue("padding-left"))-parseFloat(n.getPropertyValue("border-left-width")),s=parseFloat(n.getPropertyValue("height"))-parseFloat(n.getPropertyValue("padding-top"))-parseFloat(n.getPropertyValue("border-top-width"))-parseFloat(n.getPropertyValue("padding-bottom"))-parseFloat(n.getPropertyValue("border-bottom-width")),d=parseFloat(n.getPropertyValue("padding-top"))+parseFloat(n.getPropertyValue("border-top-width"))+parseFloat(n.getPropertyValue("margin-top")),h=parseFloat(n.getPropertyValue("padding-left"))+parseFloat(n.getPropertyValue("border-left-width"))+parseFloat(n.getPropertyValue("margin-left")),g=l/a,p=s/i,c="contain"===o?Math.min(g,p):Math.max(g,p),u=h+(l-a*c)/2,y=d+(s-i*c)/2,w=a*c,f=i*c;"cover"===o&&(e.style.overflow="hidden"),"static"===n.getPropertyValue("position")&&(e.style.position="relative"),"absolute"!==r.getPropertyValue("position")&&(t.style.position="absolute"),t.style.left=u+"px",t.style.top=y+"px",t.style.width=w+"px",t.style.height=f+"px"}static getRenderClientRect(t){const e=getComputedStyle(t).getPropertyValue("object-fit"),o=getComputedStyle(t).getPropertyValue("object-position").split(" "),{width:a,height:i}=this.getMediaDimensions(t),r=a/i,n=t.clientWidth,l=t.clientHeight,s=n/l,d=parseInt(o[0])/100,h=parseInt(o[1])/100;let g=0,p=0,c=0,u=0;const y={width:1,height:1,x:0,y:0};return"none"===e?(g=n,p=l,c=(a-n)*d,u=(i-l)*h):"contain"===e||"scale-down"===e?(g=a,p=i,r>s?(y.height=i/l/(a/n),y.y=(1-y.height)*h):(y.width=a/n/(i/l),y.x=(1-y.width)*d)):"cover"===e?r>s?(g=i*s,p=i,c=(a-g)*d):(g=a,p=a/s,u=(i-p)*h):"fill"===e?(g=a,p=i):console.error(`Unexpected object-fit attribute with value ${e} relative to`),{x:c,y:u,width:g,height:p,destination:y}}static drawPoint(t,e,o,a){a=Object.assign({radius:3,color:"rgb(0,64,221)"},a||{});const i=t.getContext("2d");i.beginPath(),i.arc(e,o,a.radius,0,2*Math.PI),i.fillStyle=a.color,i.fill()}static drawCenterPoint(t,e,o){o=Object.assign({radius:3,color:"rgb(0,64,221)"},o||{});const{x:a,y:i}=this.getCenterCoordinate(...e);this.drawPoint(t,a,i,o)}static drawRectangle(t,e,o,a,i,r){r=Object.assign({degree:0,lineWidth:2,lineColor:"rgb(0,64,221)",shadowBlur:0,shadowColor:"rgb(0,64,221)",fill:void 0},r||{});const n=this.getRotatedRectCoordinates(e,o,a,i,r.degree),l=t.getContext("2d");l.lineWidth=r.lineWidth,l.strokeStyle=r.lineWidth?r.lineColor:"transparent",r.shadowBlur&&(l.shadowOffsetX=0,l.shadowOffsetY=0,l.shadowBlur=r.shadowBlur,l.shadowColor=r.shadowColor),l.beginPath(),l.moveTo(n[0].x,n[0].y),l.lineTo(n[1].x,n[1].y),l.lineTo(n[2].x,n[2].y),l.lineTo(n[3].x,n[3].y),l.closePath(),l.stroke(),r.fill&&(l.fillStyle=r.fill,l.fill())}static drawRectangleCorners(t,e,o,a,i,r){r=Object.assign({lineWidth:2,lineColor:"rgb(0,64,221)",shadowBlur:0,shadowColor:"rgb(0,64,221)"},r||{});const n=t.getContext("2d");r.lineWidth&&(n.strokeStyle=r.lineColor,n.lineWidth=r.lineWidth),r.shadowBlur&&(n.shadowOffsetX=0,n.shadowOffsetY=0,n.shadowBlur=r.shadowBlur,n.shadowColor=r.shadowColor);const l=Math.min(a,i)/4;n.beginPath(),n.moveTo(e,o+l),n.lineTo(e,o),n.lineTo(e+l,o),n.moveTo(e+a-l,o),n.lineTo(e+a,o),n.lineTo(e+a,o+l),n.moveTo(e,o+i-l),n.lineTo(e,o+i),n.lineTo(e+l,o+i),n.moveTo(e+a-l,o+i),n.lineTo(e+a,o+i),n.lineTo(e+a,o+i-l),n.stroke()}static drawText(t,e,o,a,i){i=Object.assign({font:"14px arial,sans-serif",color:"black",align:"left",baseline:"top"},i||{});const r=t.getContext("2d");r.font=i.font,r.fillStyle=i.color,r.textAlign=i.align,r.textBaseline=i.baseline,r.fillText(e,o,a)}static drawLine(t,e,o,a,i,r){r=Object.assign({lineWidth:1,color:"rgb(0,64,221)"},r||{});const n=t.getContext("2d");n.beginPath(),n.moveTo(e,o),n.lineTo(a,i),n.strokeStyle=r.color,n.lineWidth=r.lineWidth,n.stroke()}static clearCanvas(t){t.getContext("2d").clearRect(0,0,t.width,t.height)}static flipHorizontal(t){const e=t.getContext("2d"),o=e.getImageData(0,0,t.width,t.height),a=o.height,i=o.width;for(let t=0;t<a;t++)for(let e=0;e<i/2;e++){const a=4*t*i+4*e,r=4*(t+1)*i-4*(e+1);for(let t=0;t<4;t++){let e=o.data[a+t];o.data[a+t]=o.data[r+t],o.data[r+t]=e}}e.putImageData(o,0,0,0,0,i,a)}}