(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{yZlL:function(t,e,a){"use strict";a.r(e),a.d(e,"pageQuery",(function(){return u}));var n=a("q1tI"),r=a.n(n),i=a("Wbzz"),l=a("Bl7J"),o=a("vrFN"),p=a("vOnD");var s=p.a.ul.withConfig({displayName:"blog-post__PaginationNav",componentId:"sc-1993m0e-0"})(["display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;list-style:none;padding:0;"]),m=p.a.h1.withConfig({displayName:"blog-post__PostTitle",componentId:"sc-1993m0e-1"})(["text-align:center;margin:0 0 3rem;"]),c=p.a.img.withConfig({displayName:"blog-post__Img",componentId:"sc-1993m0e-2"})(["height:300px;width:auto;display:block;@media screen and (max-width:759px){width:100%;height:auto;}"]),d=function(t){var e,a;function n(){return t.apply(this,arguments)||this}return a=t,(e=n).prototype=Object.create(a.prototype),e.prototype.constructor=e,e.__proto__=a,n.prototype.render=function(){var t=this.props.data.markdownRemark,e=this.props.data.site.siteMetadata.title,a=this.props.pageContext,n=a.previous,p=a.next;return r.a.createElement(l.a,{location:this.props.location,title:e},r.a.createElement(o.a,{title:t.frontmatter.title,description:t.frontmatter.description||t.excerpt}),r.a.createElement("p",{style:{textAlign:"right"}},t.frontmatter.date),r.a.createElement(m,null,t.frontmatter.title),r.a.createElement("div",null,t.frontmatter.featured_image&&r.a.createElement(c,{src:t.frontmatter.featured_image,alt:t.frontmatter.title})),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:t.html}}),r.a.createElement("hr",null),r.a.createElement(s,null,r.a.createElement("li",null,p&&r.a.createElement(i.Link,{to:p.fields.slug,rel:"next"},"← ",p.frontmatter.title)),r.a.createElement("li",null,n&&r.a.createElement(i.Link,{to:n.fields.slug,rel:"prev"},n.frontmatter.title," →"))))},n}(r.a.Component);e.default=d;var u="4229058038"}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-96104448f2797b855f6d.js.map