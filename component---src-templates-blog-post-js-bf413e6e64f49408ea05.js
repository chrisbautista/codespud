(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{yZlL:function(e,t,a){"use strict";a.r(t);var n=a("dI71"),r=a("q1tI"),i=a.n(r),o=a("Wbzz"),l=a("Bl7J"),m=a("vrFN"),c=a("3KJp"),d=a("10BB"),s=a("vOnD"),p=function(e){function t(){return e.apply(this,arguments)||this}Object(n.a)(t,e);var a=t.prototype;return a.componentDidMount=function(){this.setupAria()},a.setupAria=function(){var e=this,t=document.querySelectorAll('iframe[src*="codepen"]');t.length&&Array.from(t).forEach((function(t){t.setAttribute("title",e.props.data.markdownRemark.frontmatter.title+" codepen")}));var a=document.querySelectorAll('a[href*="codepen.io/"]');a.length&&Array.from(a).forEach((function(e){""===e.innerHTML.trim()&&(e.classList.add("sr-only"),e.setAttribute("tabindex",-1),e.setAttribute("aria-hidden","true"),e.innerHTML="codepen")}))},a.render=function(){var e=this.props.data.markdownRemark,t=this.props.data.site.siteMetadata.title,a=this.props.pageContext,n=a.previous,r=a.next,s=!(e.frontmatter&&e.frontmatter.contentType&&"works"===e.frontmatter.contentType);return i.a.createElement(l.a,{location:this.props.location,title:t},i.a.createElement(y,null,i.a.createElement(m.a,{title:e.frontmatter.title,description:e.frontmatter.description||e.excerpt}),i.a.createElement(g,{src:e.frontmatter.featured_image,alt:e.frontmatter.title,attribution:e.frontmatter.featured_image_attribution}),i.a.createElement(x,null,i.a.createElement(w,{isPost:s,title:e.frontmatter.title})),i.a.createElement(u,null,e.frontmatter.title,i.a.createElement("p",{className:"date"},e.frontmatter.date),i.a.createElement(c.a,{tags:e.frontmatter.tags})),i.a.createElement(b,{dangerouslySetInnerHTML:{__html:e.html}}),i.a.createElement(f,null,i.a.createElement("li",null,r&&i.a.createElement(o.Link,{to:r.fields.slug,rel:"next"},i.a.createElement(d.b,{type:d.a.Back})," ",r.frontmatter.title)),i.a.createElement("li",null,n&&i.a.createElement(o.Link,{to:n.fields.slug,rel:"prev"},n.frontmatter.title," ",i.a.createElement(d.b,{type:d.a.Next}))))))},t}(i.a.Component);t.default=p;function g(e){var t=e.src,a=e.alt,n=e.attribution;return t?i.a.createElement("figure",{className:"featured-image"},i.a.createElement("div",{className:"container"},i.a.createElement(h,{src:t,alt:a})),n&&i.a.createElement("figcaption",{dangerouslySetInnerHTML:{__html:n}})):null}var f=s.a.ul.withConfig({displayName:"blog-post__PaginationNav",componentId:"sc-1993m0e-0"})(["display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;list-style:none;padding:0;margin-left:1rem;margin-top:3rem;padding-top:1rem;@media screen and (max-width:900px){display:block;padding:0.5rem 0.5rem 1rem;text-align:center;margin:0;li{display:block;padding:0.4rem 0;margin:0.3rem 0 0;svg{margin-right:0.2rem;margin-left:0.2rem;}}}"]),u=s.a.h1.withConfig({displayName:"blog-post__PostTitle",componentId:"sc-1993m0e-1"})(["text-align:center;margin:3rem auto;font-size:2.5rem;max-width:1024px;.date{font-size:0.875rem;}"]),h=s.a.img.withConfig({displayName:"blog-post__FeaturedImage",componentId:"sc-1993m0e-2"})(["width:100%;object-fit:cover;"]),x=s.a.div.withConfig({displayName:"blog-post__MetaDiv",componentId:"sc-1993m0e-3"})(["display:flex;justify-content:space-between;align-items:center;font-family:Montserrat;font-size:0.875rem;max-width:1024px;margin:2rem auto 0;@media screen and (max-width:768px){margin-top:1rem;}"]),y=s.a.article.withConfig({displayName:"blog-post__PostWrapper",componentId:"sc-1993m0e-4"})(["max-width:1024px;margin:0 auto;padding:0 56px 56px;border-radius:5px;background-color:#fff;overflow:hidden;@media screen and (max-width:900px){padding:20px;}@media screen and (max-width:768px){padding:1rem;}.featured-image{display:block;padding:0;margin:0 auto;position:relative;left:-56px;top:0;width:calc(100% + 112px);[class*=container]{height:350px;margin:0;padding:0;}figcaption{display:inline-block;position:absolute;bottom:15px;right:0;margin-top:-56px;padding:1rem 2rem;color:#d1d2dc;background-color:rgba(0,0,0,0.20);font-size:0.875rem;a{color:#d1d2dc;}}image{display:block;margin:0;padding:0;}.container{max-width:100%;}}[class*=container]{display:flex;justify-content:center;max-width:1024px;height:350px;margin:0 auto;padding:0;}"]),b=s.a.div.withConfig({displayName:"blog-post__PostContent",componentId:"sc-1993m0e-5"})(["max-width:1024px;margin:0 auto;h2,h3{line-height:1.3;}h2{font-size:2.074rem}h3{font-size:1.728rem}"]);function w(e){var t=e.isPost,a=e.title,n=i.a.createElement(d.b,{type:d.a.Next,style:{width:"9px",height:"14px"}});return t?i.a.createElement("span",null,i.a.createElement("a",{href:"/",alt:"Home"},"Home")," ",n," ",a):i.a.createElement("span",null,i.a.createElement(o.Link,{to:"/works",alt:"Portfolio"},"Portfolio")," ",n," ",a)}}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-bf413e6e64f49408ea05.js.map