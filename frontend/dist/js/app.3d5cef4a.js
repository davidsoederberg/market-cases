(function(t){function a(a){for(var s,o,i=a[0],l=a[1],c=a[2],u=0,f=[];u<i.length;u++)o=i[u],n[o]&&f.push(n[o][0]),n[o]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(t[s]=l[s]);d&&d(a);while(f.length)f.shift()();return r.push.apply(r,c||[]),e()}function e(){for(var t,a=0;a<r.length;a++){for(var e=r[a],s=!0,i=1;i<e.length;i++){var l=e[i];0!==n[l]&&(s=!1)}s&&(r.splice(a--,1),t=o(o.s=e[0]))}return t}var s={},n={app:0},r=[];function o(a){if(s[a])return s[a].exports;var e=s[a]={i:a,l:!1,exports:{}};return t[a].call(e.exports,e,e.exports,o),e.l=!0,e.exports}o.m=t,o.c=s,o.d=function(t,a,e){o.o(t,a)||Object.defineProperty(t,a,{enumerable:!0,get:e})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,a){if(1&a&&(t=o(t)),8&a)return t;if(4&a&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(o.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&a&&"string"!=typeof t)for(var s in t)o.d(e,s,function(a){return t[a]}.bind(null,s));return e},o.n=function(t){var a=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(a,"a",a),a},o.o=function(t,a){return Object.prototype.hasOwnProperty.call(t,a)},o.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=a,i=i.slice();for(var c=0;c<i.length;c++)a(i[c]);var d=l;r.push([0,"chunk-vendors"]),e()})({0:function(t,a,e){t.exports=e("56d7")},4678:function(t,a,e){var s={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb718","./de-ch.js":"bb718","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-nz":"6f50","./en-nz.js":"6f50","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-tw":"90ea","./zh-tw.js":"90ea"};function n(t){var a=r(t);return e(a)}function r(t){var a=s[t];if(!(a+1)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return a}n.keys=function(){return Object.keys(s)},n.resolve=r,t.exports=n,n.id="4678"},"56d7":function(t,a,e){"use strict";e.r(a);e("cadf"),e("551c"),e("097d");var s=e("2b0e"),n=e("bb71");e("da64");s["a"].use(n["a"],{iconfont:"md"});var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-app",[e("v-toolbar",{staticClass:"teal darken-1"}),e("v-content",[e("router-view")],1)],1)},o=[],i={},l=i,c=e("2877"),d=e("6544"),u=e.n(d),f=e("7496"),b=e("549c"),h=e("71d9"),v=Object(c["a"])(l,r,o,!1,null,null,null);v.options.__file="App.vue";var p=v.exports;u()(v,{VApp:f["a"],VContent:b["a"],VToolbar:h["a"]});var y=e("8c4f"),j=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("Leaderboard"),e("Tabs")],1)},m=[],x=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",[e("v-layout",{attrs:{"text-xs":"","justify-center":"",align:"center"}},[t.loaded?e("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.mainHeaders,items:t.mainItems,"header-key":"index","item-key":"name","must-sort":"","rows-per-page-items":"6","hide-actions":"",pagination:t.pagination},on:{"update:pagination":function(a){t.pagination=a}},scopedSlots:t._u([{key:"items",fn:function(a){return[e("tr",{on:{click:function(t){a.expanded=!a.expanded}}},[e("td",{staticClass:"text-lg-left"},[t._v(t._s(a.item.name))]),e("td",{staticClass:"text-lg-center",class:{negative:a.item.index<0,positive:a.item.index>0}},[t._v(t._s(a.item.index)+"%")]),e("td",{staticClass:"text-lg-center",class:{negative:a.item.today<0,positive:a.item.today>0}},[t._v(t._s(a.item.today)+"%")])])]}}])}):t._e()],1)],1)},_=[],g=(e("c5f6"),e("7f7f"),e("ac6a"),e("bc3a")),k=e.n(g),w={name:"Leaderboard.vue",data:function(){return{pagination:{soryBy:"index",descending:!0},mainHeaders:[{align:"left",text:"Namn",value:"name",sortable:!1,width:200},{align:"center",text:"YTD",value:"index",width:150},{align:"center",text:"Dags",value:"today",width:150}],mainItems:[],loaded:!1}},methods:{requestData:function(){var t=this;k.a.get("/api/user").then(function(a){a.data.forEach(function(a){var e={};e.name=a.name,e.index=t.indexToPercent(a.intradayData[a.dayData.length-1].index),e.today=0===a.intradayData.length?0:(t.indexToPercent(a.intradayData[a.intradayData.length-1].index)-t.indexToPercent(a.dayData[a.dayData.length-1].index)).toFixed(2),t.mainItems.push(e)}),t.loaded=!0})},indexToPercent:function(t){return Number((t-100).toFixed(2))}},mounted:function(){this.requestData()}},C=w,T=(e("bd69"),e("a523")),D=e("8fea"),I=e("a722"),z=Object(c["a"])(C,x,_,!1,null,"019eb438",null);z.options.__file="Leaderboard.vue";var L=z.exports;u()(z,{VContainer:T["a"],VDataTable:D["a"],VLayout:I["a"]});var O,V,E=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",[e("v-layout",{attrs:{"text-xs":"","justify-center":"","padding-bottom":""}},[e("v-tabs",{attrs:{"slider-color":"teal",centered:""},model:{value:t.active_tab,callback:function(a){t.active_tab=a},expression:"active_tab"}},[e("v-tab",{key:1,attrs:{href:"#tab-1"}},[t._v("David")]),e("v-tab",{key:2,attrs:{href:"#tab-2"}},[t._v("Jakob")]),e("v-tab",{key:3,attrs:{href:"#tab-3"}},[t._v("Tobias")]),e("v-tab",{key:4,attrs:{href:"#tab-4"}},[t._v("Linus")]),e("v-tab",{key:5,attrs:{href:"#tab-5"}},[t._v("Oscar")]),e("v-tab",{key:6,attrs:{href:"#tab-6"}},[t._v("Andreas")])],1)],1),e("v-tabs-items",{model:{value:t.active_tab,callback:function(a){t.active_tab=a},expression:"active_tab"}},[e("v-tab-item",{key:1,attrs:{value:"tab-1"}},[e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{xs6:""}},[e("v-layout",{attrs:{"justify-center":""}},[t.loaded?e("line-chart",{attrs:{options:t.options,"chart-labels":t.labels[0],"chart-data":t.data[0]}}):t._e()],1)],1),e("v-flex",{attrs:{xs6:""}},[e("v-layout",{attrs:{"justify-center":""}},[t.loaded?e("line-chart",{attrs:{options:t.options2,"chart-labels":t.labelsIntraday[0],"chart-data":t.dataIntraday[0]}}):t._e()],1)],1)],1)],1),e("v-tab-item",{key:2,attrs:{value:"tab-2"}},[e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{xs6:""}},[e("v-layout",{attrs:{"justify-center":""}},[t.loaded?e("line-chart",{attrs:{options:t.options,"chart-labels":t.labels[1],"chart-data":t.data[1]}}):t._e()],1)],1),e("v-flex",{attrs:{xs6:""}},[e("v-layout",{attrs:{"justify-center":""}},[t.loaded?e("line-chart",{attrs:{options:t.options2,"chart-labels":t.labelsIntraday[1],"chart-data":t.dataIntraday[1]}}):t._e()],1)],1)],1)],1),e("v-tab-item",{key:3,attrs:{value:"tab-3"}},[e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{xs6:""}},[e("v-layout",{attrs:{"justify-center":""}},[t.loaded?e("line-chart",{attrs:{options:t.options,"chart-labels":t.labels[2],"chart-data":t.data[2]}}):t._e()],1)],1),e("v-flex",{attrs:{xs6:""}},[e("v-layout",{attrs:{"justify-center":""}},[t.loaded?e("line-chart",{attrs:{options:t.options2,"chart-labels":t.labelsIntraday[2],"chart-data":t.dataIntraday[2]}}):t._e()],1)],1)],1)],1),e("v-tab-item",{key:4,attrs:{value:"tab-4"}},[e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{xs6:""}},[e("v-layout",{attrs:{"justify-center":""}},[t.loaded?e("line-chart",{attrs:{options:t.options,"chart-labels":t.labels[3],"chart-data":t.data[3]}}):t._e()],1)],1),e("v-flex",{attrs:{xs6:""}},[e("v-layout",{attrs:{"justify-center":""}},[t.loaded?e("line-chart",{attrs:{options:t.options2,"chart-labels":t.labelsIntraday[3],"chart-data":t.dataIntraday[3]}}):t._e()],1)],1)],1)],1),e("v-tab-item",{key:5,attrs:{value:"tab-5"}},[e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{xs6:""}},[e("v-layout",{attrs:{"justify-center":""}},[t.loaded?e("line-chart",{attrs:{options:t.options,"chart-labels":t.labels[4],"chart-data":t.data[4]}}):t._e()],1)],1),e("v-flex",{attrs:{xs6:""}},[e("v-layout",{attrs:{"justify-center":""}},[t.loaded?e("line-chart",{attrs:{options:t.options2,"chart-labels":t.labelsIntraday[4],"chart-data":t.dataIntraday[4]}}):t._e()],1)],1)],1)],1),e("v-tab-item",{key:6,attrs:{value:"tab-6"}},[e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{xs6:""}},[e("v-layout",{attrs:{"justify-center":""}},[t.loaded?e("line-chart",{attrs:{options:t.options,"chart-labels":t.labels[5],"chart-data":t.data[5]}}):t._e()],1)],1),e("v-flex",{attrs:{xs6:""}},[e("v-layout",{attrs:{"justify-center":""}},[t.loaded?e("line-chart",{attrs:{options:t.options2,"chart-labels":t.labelsIntraday[5],"chart-data":t.dataIntraday[5]}}):t._e()],1)],1)],1)],1)],1)],1)},P=[],A=e("1fca"),F={extends:A["a"],props:["chartData","chartLabels","options"],mounted:function(){this.renderChart({labels:this.chartLabels,datasets:[{label:"Percent",borderColor:"#249EBF",pointBackgroundColor:"white",borderWidth:1,pointBorderColor:"#249EBF",backgroundColor:"transparent",pointRadius:0,data:this.chartData}],title:{display:!0,text:"Test"}},this.options)}},q=F,N=Object(c["a"])(q,O,V,!1,null,null,null);N.options.__file="LineChart.vue";var S=N.exports,M={name:"Tabs",components:{LineChart:S},data:function(){return{labels:[[],[],[],[],[],[]],data:[[],[],[],[],[],[]],labelsIntraday:[[],[],[],[],[],[]],dataIntraday:[[],[],[],[],[],[]],loaded:!1,active_tab:"tab-1",options:{scales:{yAxes:[{ticks:{callback:function(t,a,e){return"".concat(t,"%")}},gridLines:{display:!0}}],xAxes:[{gridLines:{display:!1}}]},legend:{display:!1},responsive:!1,maintainAspectRatio:!0,title:{display:!0,text:"YTD"}},options2:{scales:{yAxes:[{ticks:{callback:function(t,a,e){return"".concat(t,"%")}},gridLines:{display:!0}}],xAxes:[{gridLines:{display:!1}}]},legend:{display:!1},responsive:!1,maintainAspectRatio:!0,title:{display:!0,text:"Intraday"}}}},methods:{requestData:function(){var t=this;k.a.get("/api/user").then(function(a){for(var e=0;e<6;e++)t.labels[e].push("2019/01/01"),t.data[e].push(0),t.labelsIntraday[e].push(""),t.dataIntraday[e].push(0);a.data.forEach(function(a,e){a.dayData.forEach(function(a){t.labels[e].push(a.day),t.data[e].push("".concat(t.indexToPercent(a.index)))}),a.intradayData.forEach(function(s){t.labelsIntraday[e].push(s.time),t.dataIntraday[e].push("".concat(t.indexToPercent(s.index)-t.indexToPercent(a.dayData[a.dayData.length-1].index)))})}),t.loaded=!0})},indexToPercent:function(t){return Number((t-100).toFixed(2))}},mounted:function(){this.requestData()}},$=M,B=(e("b333"),e("0e8f")),H=e("71a3"),J=e("c671"),R=e("fe57"),W=e("aac8"),U=Object(c["a"])($,E,P,!1,null,"e84f8c8c",null);U.options.__file="Tabs.vue";var Y=U.exports;u()(U,{VContainer:T["a"],VFlex:B["a"],VLayout:I["a"],VTab:H["a"],VTabItem:J["a"],VTabs:R["a"],VTabsItems:W["a"]});var Q={components:{Leaderboard:L,Tabs:Y}},G=Q,K=Object(c["a"])(G,j,m,!1,null,null,null);K.options.__file="Home.vue";var X=K.exports,Z=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",[e("v-layout",{attrs:{"text-xs-center":"",wrap:""}},[e("v-flex",{attrs:{"mb-4":""}},[e("h1",{staticClass:"display-2 font-weight-bold mb-3"},[t._v("\n        Welcome to Vuetify\n      ")]),e("p",{staticClass:"subheading font-weight-regular"},[t._v("\n        For help and collaboration with other Vuetify developers,\n        "),e("br"),t._v("please join our online\n        "),e("a",{attrs:{href:"https://community.vuetifyjs.com",target:"_blank"}},[t._v("Discord Community")])])]),e("v-flex",{attrs:{"mb-5":"",xs12:""}},[e("h2",{staticClass:"headline font-weight-bold mb-3"},[t._v("What's next?")]),e("v-layout",{attrs:{"justify-center":""}},t._l(t.whatsNext,function(a,s){return e("a",{key:s,staticClass:"subheading mx-3",attrs:{href:a.href,target:"_blank"}},[t._v("\n          "+t._s(a.text)+"\n        ")])}),0)],1),e("v-flex",{attrs:{xs12:"","mb-5":""}},[e("h2",{staticClass:"headline font-weight-bold mb-3"},[t._v("Important Links")]),e("v-layout",{attrs:{"justify-center":""}},t._l(t.importantLinks,function(a,s){return e("a",{key:s,staticClass:"subheading mx-3",attrs:{href:a.href,target:"_blank"}},[t._v("\n          "+t._s(a.text)+"\n        ")])}),0)],1),e("v-flex",{attrs:{xs12:"","mb-5":""}},[e("h2",{staticClass:"headline font-weight-bold mb-3"},[t._v("Ecosystem")]),e("v-layout",{attrs:{"justify-center":""}},t._l(t.ecosystem,function(a,s){return e("a",{key:s,staticClass:"subheading mx-3",attrs:{href:a.href,target:"_blank"}},[t._v("\n          "+t._s(a.text)+"\n        ")])}),0)],1)],1)],1)},tt=[],at={data:function(){return{ecosystem:[{text:"vuetify-loader",href:"https://github.com/vuetifyjs/vuetify-loader"},{text:"github",href:"https://github.com/vuetifyjs/vuetify"},{text:"awesome-vuetify",href:"https://github.com/vuetifyjs/awesome-vuetify"}],importantLinks:[{text:"Documentation",href:"https://vuetifyjs.com"},{text:"Chat",href:"https://community.vuetifyjs.com"},{text:"Made with Vuetify",href:"https://madewithvuetifyjs.com"},{text:"Twitter",href:"https://twitter.com/vuetifyjs"},{text:"Articles",href:"https://medium.com/vuetify"}],whatsNext:[{text:"Explore components",href:"https://vuetifyjs.com/components/api-explorer"},{text:"Select a layout",href:"https://vuetifyjs.com/layout/pre-defined"},{text:"Frequently Asked Questions",href:"https://vuetifyjs.com/getting-started/frequently-asked-questions"}]}}},et=at,st=Object(c["a"])(et,Z,tt,!1,null,null,null);st.options.__file="About.vue";var nt=st.exports;u()(st,{VContainer:T["a"],VFlex:B["a"],VLayout:I["a"]}),s["a"].use(y["a"]);var rt=new y["a"]({mode:"history",base:"/",routes:[{path:"/",name:"home",component:X},{path:"/about",name:"about",component:nt}]});s["a"].config.productionTip=!1,new s["a"]({router:rt,render:function(t){return t(p)}}).$mount("#app")},6591:function(t,a,e){},"8e6a":function(t,a,e){},b333:function(t,a,e){"use strict";var s=e("8e6a"),n=e.n(s);n.a},bd69:function(t,a,e){"use strict";var s=e("6591"),n=e.n(s);n.a}});
//# sourceMappingURL=app.3d5cef4a.js.map