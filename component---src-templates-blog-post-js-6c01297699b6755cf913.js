(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"3KJp":function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));var a=n("q1tI"),r=n.n(a),i=n("vOnD"),o=n("Wbzz"),l=n("LvDl"),c=n.n(l);function s(t){var e=t.tags;return!e||e.length<=0?null:r.a.createElement(m,null,e.map((function(t){return r.a.createElement(o.Link,{key:t,to:"/tags/"+c.a.kebabCase(t),className:"tag-pill"},t)})))}var m=i.a.span.withConfig({displayName:"tagpills__TagContainer",componentId:"p1aoa9-0"})(["display:flex;width:100%;max-width:1024px;justify-content:center;margin:0 auto;flex-wrap:wrap;a{font-weight:bold;margin:2px 5px;font-size:1rem;}"])},"6VaU":function(t,e,n){"use strict";var a=n("XKFU"),r=n("xF/b"),i=n("S/j/"),o=n("ne8i"),l=n("2OiF"),c=n("zRwo");a(a.P,"Array",{flatMap:function(t){var e,n,a=i(this);return l(t),e=o(a.length),n=c(a,0),r(n,a,a,e,0,1,t,arguments[1]),n}}),n("nGyu")("flatMap")},"7VC1":function(t,e,n){"use strict";var a=n("XKFU"),r=n("Lgjv"),i=n("ol8x"),o=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(i);a(a.P+a.F*o,"String",{padEnd:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0,!1)}})},"9XZr":function(t,e,n){"use strict";var a=n("XKFU"),r=n("Lgjv"),i=n("ol8x"),o=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(i);a(a.P+a.F*o,"String",{padStart:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0,!0)}})},AphP:function(t,e,n){"use strict";var a=n("XKFU"),r=n("S/j/"),i=n("apmT");a(a.P+a.F*n("eeVq")((function(){return null!==new Date(NaN).toJSON()||1!==Date.prototype.toJSON.call({toISOString:function(){return 1}})})),"Date",{toJSON:function(t){var e=r(this),n=i(e);return"number"!=typeof n||isFinite(n)?e.toISOString():null}})},FLlr:function(t,e,n){var a=n("XKFU");a(a.P,"String",{repeat:n("l0Rn")})},I74W:function(t,e,n){"use strict";n("qncB")("trimLeft",(function(t){return function(){return t(this,1)}}),"trimStart")},Lgjv:function(t,e,n){var a=n("ne8i"),r=n("l0Rn"),i=n("vhPU");t.exports=function(t,e,n,o){var l=String(i(t)),c=l.length,s=void 0===n?" ":String(n),m=a(e);if(m<=c||""==s)return l;var p=m-c,u=r.call(s,Math.ceil(p/s.length));return u.length>p&&(u=u.slice(0,p)),o?u+l:l+u}},SPin:function(t,e,n){"use strict";var a=n("XKFU"),r=n("eyMr");a(a.P+a.F*!n("LyE8")([].reduceRight,!0),"Array",{reduceRight:function(t){return r(this,t,arguments.length,arguments[1],!0)}})},YuTi:function(t,e,n){n("HAE/"),t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},fA63:function(t,e,n){"use strict";n("qncB")("trimRight",(function(t){return function(){return t(this,2)}}),"trimEnd")},l0Rn:function(t,e,n){"use strict";var a=n("RYi7"),r=n("vhPU");t.exports=function(t){var e=String(r(this)),n="",i=a(t);if(i<0||i==1/0)throw RangeError("Count can't be negative");for(;i>0;(i>>>=1)&&(e+=e))1&i&&(n+=e);return n}},"xF/b":function(t,e,n){"use strict";var a=n("EWmC"),r=n("0/R4"),i=n("ne8i"),o=n("m0Pp"),l=n("K0xU")("isConcatSpreadable");t.exports=function t(e,n,c,s,m,p,u,f){for(var d,g,h=m,x=0,v=!!u&&o(u,f,3);x<s;){if(x in c){if(d=v?v(c[x],x,n):c[x],g=!1,r(d)&&(g=void 0!==(g=d[l])?!!g:a(d)),g&&p>0)h=t(e,n,d,i(d.length),h,p-1)-1;else{if(h>=9007199254740991)throw TypeError();e[h]=d}h++}x++}return h}},yZlL:function(t,e,n){"use strict";n.r(e),n.d(e,"pageQuery",(function(){return u}));var a=n("q1tI"),r=n.n(a),i=n("Wbzz"),o=n("Bl7J"),l=n("vrFN"),c=n("3KJp"),s=n("10BB"),m=n("vOnD");var p=function(t){var e,n;function a(){return t.apply(this,arguments)||this}return n=t,(e=a).prototype=Object.create(n.prototype),e.prototype.constructor=e,e.__proto__=n,a.prototype.render=function(){var t=this.props.data.markdownRemark,e=this.props.data.site.siteMetadata.title,n=this.props.pageContext,a=n.previous,m=n.next,p=!(t.frontmatter&&t.frontmatter.contentType&&"works"===t.frontmatter.contentType);return r.a.createElement(o.a,{location:this.props.location,title:e},r.a.createElement(v,null,r.a.createElement(l.a,{title:t.frontmatter.title,description:t.frontmatter.description||t.excerpt}),r.a.createElement(f,{src:t.frontmatter.featured_image,alt:t.frontmatter.title,attribution:t.frontmatter.featured_image_attribution}),r.a.createElement(x,null,r.a.createElement(w,{isPost:p,title:t.frontmatter.title})),r.a.createElement(g,null,t.frontmatter.title,r.a.createElement("p",{className:"date"},t.frontmatter.date),r.a.createElement(c.a,{tags:t.frontmatter.tags})),r.a.createElement(y,{dangerouslySetInnerHTML:{__html:t.html}}),r.a.createElement("hr",null),r.a.createElement(d,null,r.a.createElement("li",null,m&&r.a.createElement(i.Link,{to:m.fields.slug,rel:"next"},r.a.createElement(s.b,{type:s.a.Back})," ",m.frontmatter.title)),r.a.createElement("li",null,a&&r.a.createElement(i.Link,{to:a.fields.slug,rel:"prev"},a.frontmatter.title," ",r.a.createElement(s.b,{type:s.a.Next}))))))},a}(r.a.Component);e.default=p;var u="75088817";function f(t){var e=t.src,n=t.alt,a=t.attribution;return e?r.a.createElement("figure",{className:"featured-image"},r.a.createElement("div",{className:"container"},r.a.createElement(h,{src:e,alt:n})),a&&r.a.createElement("figcaption",{dangerouslySetInnerHTML:{__html:a}})):null}var d=m.a.ul.withConfig({displayName:"blog-post__PaginationNav",componentId:"sc-1993m0e-0"})(["display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;list-style:none;padding:0;margin-left:1rem;@media screen and (max-width:900px){display:block;padding:0.5rem 0.5rem 1rem;text-align:center;margin:0;li{display:block;padding:0.4rem 0;margin:0.3rem 0 0;svg{margin-right:0.2rem;margin-left:0.2rem;}}}"]),g=m.a.h1.withConfig({displayName:"blog-post__PostTitle",componentId:"sc-1993m0e-1"})(["text-align:center;margin:3rem auto;font-size:2.5rem;max-width:1024px;.date{font-size:0.875rem;}"]),h=m.a.img.withConfig({displayName:"blog-post__FeaturedImage",componentId:"sc-1993m0e-2"})(["width:100%;object-fit:cover;"]),x=m.a.div.withConfig({displayName:"blog-post__MetaDiv",componentId:"sc-1993m0e-3"})(["display:flex;justify-content:space-between;align-items:center;font-family:Montserrat;font-size:0.875rem;max-width:1024px;margin:3rem auto 0;"]),v=m.a.article.withConfig({displayName:"blog-post__PostWrapper",componentId:"sc-1993m0e-4"})(["max-width:1024px;margin:0 auto;padding:24px;border-radius:4px;background-color:#fff;.featured-image{display:block;max-width:1024px;padding:0;margin:0 auto;[class*=container]{max-width:1024px;height:350px;margin:0;padding:0;}figcaption{margin-top:-8px;}image{display:block;margin:0;padding:0;}}[class*=container]{display:flex;justify-content:center;max-width:1024px;height:350px;margin:0 auto;padding:0;}"]),y=m.a.div.withConfig({displayName:"blog-post__PostContent",componentId:"sc-1993m0e-5"})(["max-width:1024px;margin:0 auto;h2,h3{line-height:1.3;}h2{font-size:2.074rem}h3{font-size:1.728rem}"]);function w(t){var e=t.isPost,n=t.title,a=r.a.createElement(s.b,{type:s.a.Next,style:{width:"9px",height:"14px"}});return e?r.a.createElement("span",null,r.a.createElement("a",{href:"/",alt:"Home"},"Home")," ",a," ",n):r.a.createElement("span",null,r.a.createElement(i.Link,{to:"/works",alt:"Portfolio"},"Portfolio")," ",a," ",n)}}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-6c01297699b6755cf913.js.map