---
title: "Top three things to do for better keyboard and screenreader navigation"
author: chris
type: post
date: 2023-01-20 08:07:00+00:00
url: /2023/making-a-case-about-table-accessibility/
redirect_from: 
  - /making-a-case-about-table-accessibility/
featured_image: /blog/christin-hume-unsplash.jpg
featured_image_attribution: photo by <a href="https://unsplash.com/@christinhumephoto">Christine Hume</a>
tags: [accessibility, UX, frontend]
api: []
draft: false
---
Improving accessibility is an exercise in empathy. We put ourselves in other people's shoes and imagine how we can do a specific task. Tasks like going up a flight of stairs, knowing when to cross a street, or how to consume a website. <!--more--> Knowing the difficulties people encounter when using your website/application, can aid us in designing better experiences for our users.

One of the areas UX designers and developers alike fail to give attention to is keyboard navigation. Keyboard navigation is important because you may have users that depend on the keyboard or screenreaders to read your website. If your site is hard to navigate for these users, they might just quit your site all together and move on. 

Here are my top three tips for better keyboard and screen reader navigation

## 1. Use headings and landmarks

I mentioned before in [five steps to improve accessibility](/2022/five_steps_to_improve_accessibility). One of the simplest thing you can do to improve accessibility is to use semantic tags like headings and landmarks to mark up your HTML. Headings and landmark tags not only help tell the screen reader about the information hierarchy on your page but also helps in navigation. This technique benefits screenreader users. 

[Headings](https://www.w3.org/WAI/tutorials/page-structure/headings/) provide a straightforward way of distinguishing information hierarchy on a page. The first heading (`<h1 />`) is commonly the title of the page which tells the reader what the site or page is about. After that, you organize the supporting information into sub-topics titled `<h2/>` and so on.  

**Headings** 
- h1
- h2
- h3
- h4
- h5
- h6

[Page regions or landmarks](https://www.w3.org/WAI/tutorials/page-structure/regions/) divide the content into meaningful areas. For example, the `<header />` will contain navigation links and the name of a website, and the `<main />` tag will wrap the "main" content of the page.

**Region tags** 
- header
- footer 
- aside 
- nav
- main
- section

We can also use [ARIA roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles)

**Landmark roles**
  - banner
  - complementary
  - main
  - navigation
  - region
  - and more.

Screen readers are capable of traversing a page through headings and landmarks. Using certain shortcuts, assistive technologies can jump from one heading to another. Some screenreaders can even list all the headings and landmarks on a page and then give the user a choice to jump to a specific heading or landmark. 

## 2. Add skip links

The worst part about navigating a page with the keyboard (e.g. <kbd>Tab</kbd>) is having to go through a lot of page real estate. For example, you would need to go through the main navigation, aside elements, tag lists, and call-to-action buttons before you can get to the main content. It can be exhausting for your users to do that every time. My <kbd>Tab</kbd> key finger (if that is a thing) already hurts just thinking about it. It wastes your users' time when they can already be reading your awesome content. To remedy this add skip links to your markup. Skip links can be part of your design or hidden until needed. These elements allow the user to jump to a specific topic or area on your page. Saving them so much pain. 

<!--ad-->

Here's a simple "skip to main content" link you can incorporate to your site.

```scss
.skip-to-main-content {
  // hide by default but readable to screenreaders 
  width: 1px;
  height: 1px;
  position: absolute;
  top: -999px;
  left: 50%;
  transform: translateX(-50%);
  transitio: top 0.35s;

  &:focus{
    // show in to view when focused 
    top: 0;
    height: auto;
  }
}
```


```html
<body>
<a href="#main-content" class="skip-to-main-content">Skip to main content</a>
...

<article>
  <h1 id="main-content"> </h1>
</article>
</body>

```

The key here is to make the skip link the very top element in the markup so that it gets focused first. The link scrolls the page to the area marked by `id=main-content`. 

## 3. Minimize key presses

If you have a user interface/design that requires a lot of traversals and you can't use skip links, modify the key handling used for navigation. 


### 3.1 Assign other keys for navigation

<div class="img-demo">
  <img src="/blog/just-tabs.png"/>
</div>

Tables are a common pattern to present information for a related group of data. Take, for example, the wireframe above, we have columns for data and a column for action buttons. The easiest we can do is just mark up the HTML so that the focusable elements like buttons can be "tabbed" into. In the previous image, we marked the element the user needs to interact with. If you use the <kbd>Tab</kbd> key, it will take you 8 key presses before a user reaches the `Delete` button. I call **8** key presses the traversal index (`T` index for short) to activate the `Delete` button. 

Before we go further, note I just coined the term, traversal index. Not sure if there's a proper term for that. 

Anyhow, the table still looks fine with three controls(checkbox, delete and save button) and a few rows. But when you've add more focusable elements or when the number of table rows increases, the traversal index will grow quite large. 

We want to reduce the `T` index to make your keyboard(/screen reader) users happy.  Now check out the sample below, 

<div class="img-demo">
  <img src="/blog/with-arrow-keys.png"/>
</div>

In this table, we've added event handlers to use <kbd>Arrow Up</kbd> and <kbd>Arrow Down</kbd> keys to navigate between table rows. Once a row is focused(indicated by grey background color), the user can then use the <kbd>Tab</kbd> key to navigate between the items within the row. With this simple change, we've reduced the `T` index to 4. Sparing your users from carpal tunnel syndrome. 

It is important to note that since this is not a common navigation convention for tables, you need to notify the user about the extended navigation before or when the table is focused. 

> For example,
> 
> **Instruction:** Use arrow keys to navigate rows and <kbd>Tab</kbd>(/<kbd>Shift</kbd>+<kbd>Tab</kbd>) key to move between items in a row. 

<!--ad-->

### 3.2 Limit navigation between same level areas

Here's another,

<div class="img-demo">
  <img src="/blog/page-sections-tabs-only.png"/>
</div>

The wireframe shows three sections (header, table, and links). The header has only one link and the table has four(4) rows with one(1) focusable element per row. To navigate from the header to the "links" section, we will need to press the <kbd>Tab</kbd> key six(6) times. The problematic step here is we spend a lot of time focusing on the table rows before arriving at the Links section.

We can improve the keyboard navigation by keeping the "tab" stops on the three sections initially. One way of doing this is to prevent your table contents from getting focused until needed. For instance, adding [inert](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert) attribute to the `<tbody />` wrapper will prevent the table contents from getting focused. This change reduces the `T` index to `3`. 

The second part of this technique is to assign a special key( or keys) to enable navigation inside the table. For example, same with the previous table navigation handler, when the table is focused pressing <kbd>Arrow down</kbd> or <kbd>Arrow up</kbd> keys will focus one of the rows. Then you can navigate vertically or horizontally inside the table after. We can then continue through the table rows or press <kbd>Escape</kbd> key to exit the table. 

<div class="img-demo">
  <img src="/blog/page-sections-plan-focus.png"/>
</div>

You might think that the additional navigation is complex. It won't be - it really depends on your implementation. It will take quite a bit of coding but the other side of the equation is a better way of navigating your page.

Another option we can do here to improve the `T` index is to assign a key combination(/s) to each section. For example, assign <kbd>/</kbd> + <kbd>l</kbd> to jump straight to the links section. This will keep the default navigation behavior but still provide the user a means to avoid extraneous key presses. 

Again, the key for both techniques is to inform the user of the special keyboard navigation. 

## Wrapping up
  
Improve keyboard accessibility further by making sure to;

- use headings and landmarks; 
- add skip links when necessary and; 
- reduce the number of keypresses to navigate a page/section

## Reference

- [WCAG Tutorials](https://www.w3.org/WAI/tutorials/page-structure/)
- [WebAIM: Skip navigation links](https://webaim.org/techniques/skipnav/)
- [Navigating with a screenreader](https://a11y-guidelines.orange.com/en/web/toolbox/methods-and-test-tools/navigating-with-a-screen-reader/)
- [MDN: WAI-ARIA roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles)
- [MDN: Elements - Content sectioning](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#content_sectioning)
