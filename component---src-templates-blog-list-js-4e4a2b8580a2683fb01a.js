(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"3KJp":function(e,t,a){"use strict";a.d(t,"a",(function(){return d}));var n=a("N1om"),i=a.n(n),r=a("q1tI"),l=a.n(r),o=a("vOnD"),s=a("Wbzz");function d(e){var t=e.tags;return!t||t.length<=0?null:l.a.createElement(m,null,t.map((function(e){return l.a.createElement(s.Link,{key:e,to:"/tags/"+i()(e),className:"tag-pill"},e)})))}var m=o.a.span.withConfig({displayName:"tagpills__TagContainer",componentId:"p1aoa9-0"})(["display:flex;width:100%;max-width:1024px;justify-content:center;margin:0 auto;flex-wrap:wrap;a{font-weight:bold;margin:0 5px 10px;font-size:1rem;}"])},Jdp1:function(e,t,a){"use strict";a.d(t,"a",(function(){return l})),a.d(t,"b",(function(){return o}));var n=a("q1tI"),i=a.n(n),r=a("vOnD"),l={Grid:0,InArticle:1};function o(e){var t=e.type,a=void 0===t?l.Grid:t,n=e.withShadow,r=void 0!==n&&n,o="ca-pub-4889352773674825";i.a.useEffect((function(e){var t={google_ad_client:o};"object"==typeof window&&(window.adsbygoogle=window.adsbygoogle||[]).push(t)}),[]);var d={};var m=r?{boxShadow:"1px 1px 3px 0 rgba(0,0,0, 0.15)"}:void 0;return a===l.InArticle?i.a.createElement(s,Object.assign({className:"adsbygoogle",style:m},d,{"data-ad-layout":"in-article","data-ad-format":"fluid","data-ad-client":o,"data-ad-slot":"2581564797"})):i.a.createElement(s,Object.assign({className:"adsbygoogle",style:m},d,{"data-ad-client":o,"data-ad-slot":"3654107349","data-ad-format":"auto","data-full-width-responsive":"true"}))}var s=r.a.ins.withConfig({displayName:"adunit__Ins",componentId:"sc-1nr4oln-0"})(["display:block;width:100%;height:100%;background:white;"])},Mq2p:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var n={en:{More:"More",Back:"Back",Next:"Next"}};function i(){this.culture="en",this.i18n=n[this.culture]}},WwHs:function(e,t,a){"use strict";a.d(t,"a",(function(){return f}));var n=a("q1tI"),i=a.n(n),r=a("Wbzz"),l=a("vOnD"),o=a("3KJp"),s=l.a.div.withConfig({displayName:"blog-story__Story",componentId:"fkbg58-0"})(['clear:both;display:flex;margin-bottom:1rem;vertical-align:center;box-shadow:1px 1px 2px 0 rgba(0,0,0,0.15),2px 2px 4px 0 rgba(0,0,0,0.15);border-radius:6px;background-color:#fdfdfd;overflow:hidden;padding:1rem;min-height:610px;&:empty{display:none;}&:hover{cursor:pointer;}h2{margin-top:0;font-size:1.6rem;}:after{content:" ";display:block;clear:both;}@media (max-width:659px){box-shadow:none;}@media (min-width:960px){&.blog-latest{padding:0;min-height:400px;font-size:1.125rem;[class*="blog-story__StoryWrapper"]{display:flex;min-width:100%;min-height:100%;padding:0;.image-container{min-width:50%;min-height:100%;padding:0;margin:0;}img{width:120%;height:120%;object-fit:cover;}h2{padding:1rem;font-size:2.6rem;}p{padding:1rem 2rem;}}}}@media screen and (min-width:1600px){&.blog-latest{[class*="blog-story__StoryWrapper"]{display:flex;min-width:calc(100% - 232px);min-height:100%;padding:0;.image-container{min-width:40%;min-height:100%;padding:0;margin:0;}}}}@media screen and (min-width:1200px){&.blog-latest{font-size:1.25rem;[class*="blog-story__StoryWrapper"]{h2{font-size:3.6rem;}}}}}']),d=l.a.p.withConfig({displayName:"blog-story__Excerpt",componentId:"fkbg58-1"})(["text-align:left;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:4;overflow:hidden;"]),m=l.a.p.withConfig({displayName:"blog-story__ExcerptFull",componentId:"fkbg58-2"})(["text-align:left;"]),c=l.a.div.withConfig({displayName:"blog-story__StoryWrapper",componentId:"fkbg58-3"})(["border-radius:6px;height:100%;border:1px solid rgba(150,150,150,0.05);text-align:center;"]),p=l.a.div.withConfig({displayName:"blog-story__StoryBody",componentId:"fkbg58-4"})(["padding:1rem;min-height:250px;"]),g=l.a.img.withConfig({displayName:"blog-story__StoryImage",componentId:"fkbg58-5"})(["height:200px;width:100%;margin:0;object-fit:cover;"]),u=l.a.div.withConfig({displayName:"blog-story__HeroAdContainer",componentId:"fkbg58-6"})(["overflow:none;display:none;&:empty{display:none;}@media screen and (min-width:1600px){display:flex;margin:0 0 0 2rem;height:100%;min-width:180px;min-height:200px;}"]);function f(e){e.ctx;var t=e.node,a=e.latest,n=e.ad,l=t.frontmatter.title||t.fields.slug,f=i.a.useRef();function h(){f.current.querySelector("a.post-slug").click()}return i.a.createElement(i.a.Fragment,null,i.a.createElement(s,{style:{overflow:"hidden",padding:0}},!a&&n),i.a.createElement(s,{ref:f,className:a?"blog-latest":""},i.a.createElement(c,null,t.frontmatter.featured_image&&i.a.createElement("div",{className:"image-container"},i.a.createElement(g,{onClick:h,src:t.frontmatter.featured_image,alt:"",tabIndex:"-1"})),i.a.createElement(p,null,i.a.createElement("h2",null,i.a.createElement(r.Link,{className:"post-slug",to:t.fields.slug},l)),i.a.createElement("small",{tabIndex:"-1",onClick:h,onKeyUp:function(e){"Enter"===e.key&&h()},role:"button"},t.frontmatter.date),i.a.createElement(o.a,{tags:t.frontmatter.tags}),a?i.a.createElement(m,{onClick:h,tabIndex:"-1",dangerouslySetInnerHTML:{__html:t.excerpt}}):i.a.createElement(d,{onClick:h,tabIndex:"-1",dangerouslySetInnerHTML:{__html:t.excerpt}}))),i.a.createElement(u,null,a&&n)))}},eWDE:function(e,t,a){"use strict";a.r(t);var n=a("KQm4"),i=a("dI71"),r=a("q1tI"),l=a.n(r),o=a("Mq2p"),s=a("Bl7J"),d=a("vrFN"),m=a("vOnD"),c=a("Wbzz"),p=a("10BB"),g=m.a.ul.withConfig({displayName:"pagination__PaginationNav",componentId:"sc-12m51ge-0"})(["display:inline-flex;flex-wrap:wrap;justify-content:space-between;align-items:center;min-width:50px;list-style:none;padding:0;margin:0;float:right;@media screen and (max-width:769px){margin:2rem 0 0;}li{margin-left:0;list-style:none;span{color:#aaa;}}.page-numbers{font-size:1.2rem;}svg{width:0.5rem;transform:scale(2);}a,span{display:inline-flex;justify-content:center;align-items:center;margin:0 4px;width:44px;height:44px;}a{text-decoration:none;color:#f2f2f2;}"]),u=function(e){var t=e.numPages,a=e.prevPage,n=e.currentPage,i=e.nextPage,r=e.isFirst,o=e.isLast,s=e.showPageNumbers,d=void 0!==s&&s,m=e.ctx;return l.a.createElement(g,null,l.a.createElement("li",null,r?l.a.createElement("span",null,l.a.createElement(f,{type:p.a.Back})):l.a.createElement(c.Link,{to:a,rel:"prev","aria-label":m.i18n.Back},l.a.createElement(f,{type:p.a.Back}))),d&&Array.from({length:t},(function(e,a){return n!==a+1?null:l.a.createElement("li",{className:"page-numbers",key:"pagination-number"+(a+1),style:{margin:0}},l.a.createElement(c.Link,{to:"/"+(0===a?"":a+1)},a+1," / ",t))})),l.a.createElement("li",null,o?l.a.createElement("span",null,l.a.createElement(f,{type:p.a.Next})):l.a.createElement(c.Link,{to:i,rel:"next","aria-label":m.i18n.Next},l.a.createElement(f,{type:p.a.Next}))))};function f(e){var t=e.type;return l.a.createElement(p.b,{type:t,style:{width:"0.625rem"}})}var h=a("Jdp1"),x=a("WwHs"),y=m.a.div.withConfig({displayName:"blog-list__BlogList",componentId:"sc-9mb52s-0"})(["display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));grid-template-rows:masonry;grid-row-gap:1.5rem;grid-column-gap:3rem;grid-auto-flow:dense;width:100%;padding-top:2rem;@media (max-width:1024px){grid-row-gap:1rem;grid-column-gap:2rem;}@media (max-width:768px){grid-row-gap:0.5rem;padding-top:0.5rem;}@media (max-width:659px){display:flex;flex-direction:column;}"]),b=m.a.div.withConfig({displayName:"blog-list__BlogWrapper",componentId:"sc-9mb52s-1"})(["max-width:1600px;margin:0 auto;background-color:transparent;&.first-page{.pages{display:none;}.pages-first-page{display:block;}@media (max-width:768px){grid-row-gap:0.5rem;.pages{display:block;ul{margin:2rem 0 2rem;}}.pages-first-page{display:none;}}}"]),w=function(e){function t(t){var a;return(a=e.call(this,t)||this).state={isSmall:!1},a}Object(i.a)(t,e);var a=t.prototype;return a.componentDidMount=function(){this.setState({isSmall:window.innerWidth<768})},a.render=function(){var e,t=this.props.data,a=t.site.siteMetadata.title,i=t.allMarkdownRemark.edges,r=t.tags.group,m=this.props.pageContext,c=m.currentPage,p=m.numPages,g=new o.a,f=l.a.createElement(u,{numPages:p,prevPage:c-1==1?"/":"/"+(c-1),isFirst:1===c,isLast:c===p,currentPage:c,nextPage:c+1===p?"/"+p:"/"+(c+1),ctx:g}),w=1===c,v=null,E=Object(n.a)(i);w&&(v=i[0],E.shift());var k=4,_=4;return this.state.isSmall&&(k=1,_=3),l.a.createElement(s.a,{location:this.props.location,title:a,backgroundColor:"transparent",tags:r},l.a.createElement(d.a,{title:"All posts",keywords:["blog","gatsby","javascript","react"]}),l.a.createElement(b,{className:w?"first-page":null},l.a.createElement("div",{className:"pages"},f),w&&v.node&&l.a.createElement(x.a,{key:null===(e=v.node.fields)||void 0===e?void 0:e.slug,ctx:g,node:v.node,latest:!0,ad:l.a.createElement(h.b,null)}),w&&l.a.createElement("div",{className:"pages-first-page"},f),l.a.createElement(y,null,E.map((function(e,t){var a=e.node,n=null;return t+1!==k&&0!==(t>_&&(t+1)%_)||(n=l.a.createElement(h.b,{withShadow:!0})),l.a.createElement(x.a,{key:a.fields.slug,ctx:g,node:a,ad:n})})))))},t}(l.a.Component);t.default=w}}]);
//# sourceMappingURL=component---src-templates-blog-list-js-4e4a2b8580a2683fb01a.js.map