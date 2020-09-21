(this["webpackJsonpdata-request"]=this["webpackJsonpdata-request"]||[]).push([[0],[,,,,,,,,function(e,t,a){e.exports=a(22)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(6),c=a.n(l);a(13),a(14),a(15);function s(){return r.a.createElement("header",{className:"Header"},r.a.createElement("h1",null,"Data Request App"),r.a.createElement("p",null,"Simple SPA created with React"))}a(16);function o(){return r.a.createElement("footer",{className:"Footer"},"Source files are located in\xa0",r.a.createElement("a",{href:"https://github.com/andevadm/data-request"},"GitHub\xa0repository"))}var i=a(3),m=a.n(i),u=a(4),d=a(7),E=a(1);a(18),a(19);function h(e){var t=e.handleRequest,a=Object(n.useState)("Fetch"),l=Object(E.a)(a,2),c=l[0],s=l[1],o=Object(n.useState)("json"),i=Object(E.a)(o,2),m=i[0],u=i[1];return r.a.createElement("div",{className:"DataRequest"},r.a.createElement("h2",null,"Data Request Form"),r.a.createElement("form",null,r.a.createElement("label",null,"Data source:",r.a.createElement("select",{id:"database",value:"materials",readOnly:!0,disabled:!0},r.a.createElement("option",{value:"materials"},"materials"))),r.a.createElement("label",null,"Select request method:",r.a.createElement("select",{id:"method",value:c,onChange:function(e){return s(e.target.value)}},r.a.createElement("option",{value:"Fetch"},"Fetch"),r.a.createElement("option",{value:"XMLHttpRequest"},"XMLHttpRequest"))),r.a.createElement("label",null,"Select data extension:",r.a.createElement("select",{id:"extension",value:m,onChange:function(e){return u(e.target.value)}},r.a.createElement("option",{value:"json"},"JSON"),r.a.createElement("option",{value:"xml"},"XML"))),r.a.createElement("label",null,"Press the button to obtain data",r.a.createElement("button",{id:"request",onClick:function(e){return t(e,"materials",c,m)}},"Request"))))}a(20);function f(e){var t=e.dataArray,a=e.requestParameters,n=e.handleSelect;return r.a.createElement("div",{className:"DataTable"},0===t.length?r.a.createElement("h2",null,"Data is not obtained"):r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Obtained Data"),r.a.createElement("table",{onClick:function(e){var t;if("TD"===e.target.tagName){var a=e.target.parentNode,r=a.parentNode.getElementsByClassName("selected")[0];r&&r.classList.remove("selected"),a!==r?(a.classList.add("selected"),t=+a.firstChild.textContent):t=-1,n(t)}}},r.a.createElement("tbody",null,t.map((function(e){return r.a.createElement(p,{key:e.id,item:e})})))),r.a.createElement("div",{className:"request-parameters"},r.a.createElement("p",null,"Get method: ",r.a.createElement("em",null,a.method)),r.a.createElement("p",null,"Data extension: ",r.a.createElement("em",{style:{textTransform:"uppercase"}},a.extension)),r.a.createElement("p",null,"Time of data processing: ",r.a.createElement("em",null,a.time,"\xa0ms")))))}function p(e){var t=e.item;return r.a.createElement("tr",{className:"DataTableItem"},r.a.createElement("td",null,t.id),r.a.createElement("td",null,t.name))}a(21);function v(e){var t=e.item;return r.a.createElement("div",{className:"DataItem"},t?r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,t.name),r.a.createElement("div",{className:"item-image"},r.a.createElement("img",{src:"/data-request/data/img/"+t.image,alt:t.name})),r.a.createElement("div",{className:"item-body"},r.a.createElement("div",{className:"item-description"},t.description),r.a.createElement("div",{className:"item-value"},"Density: ",r.a.createElement("em",null,t.density,"\xa0g/cm",r.a.createElement("sup",null,"3"))))):r.a.createElement("h2",null,"No item is selected"))}function b(){var e=Object(n.useState)([]),t=Object(E.a)(e,2),a=t[0],l=t[1],c=Object(n.useState)(-1),s=Object(E.a)(c,2),o=s[0],i=s[1],p=Object(n.useState)({time:0,method:"Fetch",extension:"json"}),b=Object(E.a)(p,2),g=b[0],N=b[1];function y(){return(y=Object(d.a)(m.a.mark((function e(t,a){var n,r,l;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=Date.now(),e.prev=1,e.next=4,fetch(t);case 4:if(!(l=e.sent).ok){e.next=20;break}return console.log("Fetch response is ready"),e.next=9,l.text();case 9:n=e.sent,e.t0=a,e.next="json"===e.t0?13:"xml"===e.t0?15:18;break;case 13:return q(n),e.abrupt("break",19);case 15:return x((new DOMParser).parseFromString(n,"text/xml")),e.abrupt("break",19);case 18:console.log("Error in data extension for Fetch request");case 19:N({time:Date.now()-r,method:"Fetch",extension:a});case 20:e.next=25;break;case 22:e.prev=22,e.t1=e.catch(1),console.log("Error within Fetch request");case 25:case"end":return e.stop()}}),e,null,[[1,22]])})))).apply(this,arguments)}function q(e){try{l(JSON.parse(e)),console.log("JSON data is processed successfully")}catch(t){console.log("Error in the obtained JSON data")}}function x(e){try{var t,a=[],n=Object(u.a)(e.getElementsByTagName("item"));try{for(n.s();!(t=n.n()).done;){var r=t.value,c={};c.id=+r.getAttribute("id");var s,o=Object(u.a)(r.children);try{for(o.s();!(s=o.n()).done;){var i=s.value,m=i.tagName;"image"!==m?(c[m]=i.textContent.trim(),isNaN(c[m])||(c[m]=parseFloat(c[m]))):c[m]=i.getAttribute("src")}}catch(d){o.e(d)}finally{o.f()}a.push(c)}}catch(d){n.e(d)}finally{n.f()}l(a),console.log("XML data is processed successfully")}catch(E){console.log("Error in the obtained XML data")}}return r.a.createElement("div",{className:"DataContainer"},r.a.createElement("div",{className:"column left"},r.a.createElement(h,{handleRequest:function(e,t,a,n){e.preventDefault();var r=t+"."+n,l="/data-request/data/"+r;switch(a){case"XMLHttpRequest":!function(e,t){var a=Date.now();try{var n=new XMLHttpRequest;n.onreadystatechange=function(){if(4===this.readyState&&200===this.status){switch(console.log("XMLHttpRequest is ready"),t){case"json":q(this.responseText);break;case"xml":x(this.responseXML);break;default:console.log("Error in data extension for XMLHttpRequest")}N({time:Date.now()-a,method:"XMLHttpRequest",extension:t})}},n.open("GET",e,!0),n.send()}catch(r){console.log("Error within XMLHttpRequest")}}(l,n);break;case"Fetch":!function(e,t){y.apply(this,arguments)}(l,n);break;default:console.log("Error in selection of request method")}console.log("--- "+(new Date).toLocaleTimeString()+" - New request ---"),console.log("Selected method: "+a),console.log("Selected data: "+r)}})),r.a.createElement("div",{className:"column center"},r.a.createElement(f,{dataArray:a,requestParameters:g,handleSelect:function(e){console.log("ID of selected item: "+e),i(e)}})),r.a.createElement("div",{className:"column right"},r.a.createElement(v,{item:a[o-1]})))}function g(){return r.a.createElement("div",{className:"App"},r.a.createElement(s,null),r.a.createElement(b,null),r.a.createElement(o,null))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(g,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[8,1,2]]]);
//# sourceMappingURL=main.364fc037.chunk.js.map