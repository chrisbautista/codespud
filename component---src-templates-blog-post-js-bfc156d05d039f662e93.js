(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"3KJp":function(e,t,a){"use strict";a.d(t,"a",(function(){return d}));var n=a("N1om"),r=a.n(n),i=a("q1tI"),o=a.n(i),l=a("vOnD"),m=a("Wbzz");function d(e){var t=e.tags;return!t||t.length<=0?null:o.a.createElement(s,null,t.map((function(e){return o.a.createElement(m.Link,{key:e,to:"/tags/"+r()(e),className:"tag-pill"},e)})))}var s=l.a.span.withConfig({displayName:"tagpills__TagContainer",componentId:"p1aoa9-0"})(["display:flex;width:100%;max-width:1024px;justify-content:center;margin:0 auto;flex-wrap:wrap;a{font-weight:bold;margin:0 5px 10px;font-size:1rem;}"])},Jdp1:function(e,t,a){"use strict";a.d(t,"a",(function(){return o})),a.d(t,"b",(function(){return l}));var n=a("q1tI"),r=a.n(n),i=a("vOnD"),o={Grid:0,InArticle:1};function l(e){var t=e.type,a=void 0===t?o.Grid:t,n="ca-pub-4889352773674825";r.a.useEffect((function(e){var t={google_ad_client:n};"object"==typeof window&&(window.adsbygoogle=window.adsbygoogle||[]).push(t)}),[]);var i={};return a===o.InArticle?r.a.createElement(m,Object.assign({className:"adsbygoogle"},i,{"data-ad-layout":"in-article","data-ad-format":"fluid","data-ad-client":n,"data-ad-slot":"2581564797"})):r.a.createElement(m,Object.assign({className:"adsbygoogle"},i,{"data-ad-client":n,"data-ad-slot":"3654107349","data-ad-format":"auto","data-full-width-responsive":"true"}))}var m=i.a.ins.withConfig({displayName:"adunit__Ins",componentId:"sc-1nr4oln-0"})(["display:block;width:100%;height:100%;background:white;box-shadow:1px 1px 3px 0 rgba(0,0,0,0.15);"])},yZlL:function(e,t,a){"use strict";a.r(t);var n=a("dI71"),r=a("q1tI"),i=a.n(r),o=a("Wbzz"),l=a("Bl7J"),m=a("vrFN"),d=a("3KJp"),s=a("10BB"),c=a("vOnD"),p=a("Jdp1"),f=function(e){function t(){return e.apply(this,arguments)||this}Object(n.a)(t,e);var a=t.prototype;return a.componentDidMount=function(){this.setupAria()},a.setupAria=function(){var e=this,t=document.querySelectorAll('iframe[src*="codepen"]');t.length&&Array.from(t).forEach((function(t){t.setAttribute("title",e.props.data.markdownRemark.frontmatter.title+" codepen")}));var a=document.querySelectorAll('a[href*="codepen.io/"]');a.length&&Array.from(a).forEach((function(e){""===e.innerHTML.trim()&&(e.classList.add("sr-only"),e.setAttribute("tabindex",-1),e.setAttribute("aria-hidden","true"),e.innerHTML="codepen")}))},a.render=function(){var e=this.props.data.markdownRemark,t=this.props.data.site.siteMetadata.title,a=this.props.pageContext,n=a.previous,r=a.next,c=!(e.frontmatter&&e.frontmatter.contentType&&"works"===e.frontmatter.contentType),f="/2009/about-me/"===e.fields.slug;return console.log(e.fields.slug),i.a.createElement(l.a,{location:this.props.location,title:t,isInsidePage:!0},i.a.createElement(b,null,i.a.createElement(m.a,{title:e.frontmatter.title,description:e.frontmatter.description||e.excerpt}),i.a.createElement(g,{src:e.frontmatter.featured_image,alt:e.frontmatter.title,attribution:e.frontmatter.featured_image_attribution}),i.a.createElement(w,null,i.a.createElement(v,{isPost:c,title:e.frontmatter.title})),i.a.createElement(h,null,e.frontmatter.title,i.a.createElement("p",{className:"date"},e.frontmatter.date),i.a.createElement(d.a,{tags:e.frontmatter.tags})),!f&&i.a.createElement(p.b,{type:p.a.InArticle}),i.a.createElement(y,{dangerouslySetInnerHTML:{__html:e.html}}),!f&&i.a.createElement(u,null,i.a.createElement("li",null,r&&i.a.createElement(o.Link,{to:r.fields.slug,rel:"next"},i.a.createElement(s.b,{type:s.a.Back,style:{width:"0.625rem"}})," ",r.frontmatter.title)),i.a.createElement("li",null,n&&i.a.createElement(o.Link,{to:n.fields.slug,rel:"prev"},n.frontmatter.title," ",i.a.createElement(s.b,{type:s.a.Next,style:{width:"0.625rem"}})))),!f&&i.a.createElement(p.b,{type:p.a.InArticle})))},t}(i.a.Component);t.default=f;function g(e){var t=e.src,a=e.alt,n=e.attribution;return t?i.a.createElement("figure",{className:"featured-image"},i.a.createElement("div",{className:"container"},i.a.createElement(x,{src:t,alt:a})),n&&i.a.createElement("figcaption",{dangerouslySetInnerHTML:{__html:n}})):null}var u=c.a.ul.withConfig({displayName:"blog-post__PaginationNav",componentId:"sc-1993m0e-0"})(["display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;list-style:none;padding:0;margin-left:1rem;margin-top:3rem;padding-top:1rem;@media screen and (max-width:900px){display:block;padding:0.5rem 0.5rem 1rem;text-align:center;margin:0;li{display:block;padding:0.4rem 0;margin:0.3rem 0 0;svg{margin-right:0.2rem;margin-left:0.2rem;}}}"]),h=c.a.h1.withConfig({displayName:"blog-post__PostTitle",componentId:"sc-1993m0e-1"})(["text-align:center;margin:3rem auto;font-size:3.5rem;max-width:1024px;.date{font-size:0.875rem;}@media screen and (max-width:1200px){font-size:3rem;}@media screen and (max-width:960px){font-size:2.5rem;}@media screen and (max-width:768px){font-size:2rem;}"]),x=c.a.img.withConfig({displayName:"blog-post__FeaturedImage",componentId:"sc-1993m0e-2"})(["width:100%;object-fit:cover;"]),w=c.a.div.withConfig({displayName:"blog-post__MetaDiv",componentId:"sc-1993m0e-3"})(["display:flex;justify-content:space-between;align-items:center;font-family:Montserrat;font-size:0.875rem;max-width:1024px;margin:2rem auto 0;@media screen and (max-width:768px){margin-top:1rem;}"]),b=c.a.article.withConfig({displayName:"blog-post__PostWrapper",componentId:"sc-1993m0e-4"})(['max-width:1024px;margin:0 auto;padding:0 56px 56px;border-radius:5px;background-color:#fff;overflow:hidden;@media screen and (max-width:900px){padding:0 20px 1.5rem;}@media screen and (max-width:768px){padding:0 1rem 20px;border-radius:0;}.featured-image{display:block;padding:0;margin:0 auto;position:relative;left:-56px;top:0;width:calc(100% + 112px);[class*="container"]{height:350px;margin:0;padding:0;@media screen and (max-width:768px){height:175px;}}figcaption{--caption-color:#c2c4cc;display:inline-block;position:absolute;bottom:15px;right:0;margin-top:-56px;padding:0.5rem 1rem;color:var(--caption-color);background-color:rgba(0,0,0,0.20);font-size:0.75rem;@media screen and (max-width:768px){right:2rem;}a{color:var(--caption-color);}}image{display:block;margin:0;padding:0;}.container{max-width:100%;}}[class*="container"]{display:flex;justify-content:center;max-width:1024px;height:350px;margin:0 auto;padding:0;}.demo{border:1px solid #d3d3d3;padding:1.5rem;label{font-size:1rem;font-weight:bold;}}']),y=c.a.div.withConfig({displayName:"blog-post__PostContent",componentId:"sc-1993m0e-5"})(["max-width:1024px;margin:0 auto;font-weight:normal;line-height:1.75;h1{font-size:3.052rem;}h2{font-size:2.441rem;}h3{font-size:1.953rem;}h4{font-size:1.563rem;}h5{font-size:1.25rem;}small,.text_small{font-size:0.8rem;}@media screen and (max-width:768px){h1{font-size:2rem;}h2{margin-top:2rem;font-size:1.841em;}h3{font-size:1.703rem;}h4{font-size:1.563rem;}h5{font-size:1.25rem;}}"]);function v(e){var t=e.isPost,a=e.title,n=i.a.createElement(s.b,{type:s.a.Next,style:{width:"9px",height:"14px"}});return t?i.a.createElement("span",null,i.a.createElement("a",{href:"/",alt:"Home"},"Home")," ",n," ",a):i.a.createElement("span",null,i.a.createElement(o.Link,{to:"/works",alt:"Portfolio"},"Portfolio")," ",n," ",a)}}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-bfc156d05d039f662e93.js.map