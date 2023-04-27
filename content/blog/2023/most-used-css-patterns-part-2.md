---
title: "CSS Snippets I Use 90% of The Time - Part 2"
author: chris
type: post
date: 2023-02-09 12:22:00+00:00
url: /2023/most-used-css-patterns-part-2/
redirect_from: 
  - /most-used-css-patterns-part-2/
featured_image: /blog/pankaj-patel-css-unsplash.jpg
featured_image_attribution: photo by <a href="https://unsplash.com/@pankajpatel">Pankaj Patel</a>
tags: [css, snippets, UX, frontend, cheatsheet]
api: [display, translate, transform, flex, justify-content, align-items, text-overflow, line-clamp]
draft: false
---
<!--

Part 2
- centered child
- modal overlay
- text truncate
   - line
   - multiline
- card container
- fullscreen image

Part 3
- news layout
- 2 column layout
- grid layout
- z layout
- f layout 


angle

I love CSS
I hate repeating myself
I am hoarder

-->

> This is part 2 of [CSS snippets I used 90% of the time](/most-used-css-patterns) post. 

As promised this is second part of CSS styles I commonly used with my projects. If you are going to think of a rule I'd say this is my 80/20 rule for CSS. <!--more--> I have a common set patterns when designing and building sites. The rest depends on what the client needs.



The list this time are of interactive and UI elements used on of my recent projects.    

<h2 id="create">Centering an element in a box</h2>

There are a lot ways to [center an element](https://css-tricks.com/centering-css-complete-guide/) but in 8 out 10 projects I use only two styles when I need to center an element in a box. I keep two styles because it depends on the circumstance. 

### Using flex

I use this if I can use `display:flex` mostly because flexbox is well "flexible". Most of the time I need to center more than one item so wrapping is a concern. Flexbox is very good with this. 

```scss
// source CSS Tricks
.parent {
   display: flex;
   justify-content: center;
   align-items: center;

   // define dimensions of the box
   width: 100vw;
   height: 100vh;
} 

.child {
   //...
}

```

```html
<div class="parent">
   <div class="centered-child"> Child element </div>
</div>
```

This will center an element inside the box. Another good thing about using this technique is your element is in the normal document flow except when adding `order` property to child elements. If you are concerned with accessibility this is very important to remember. Using [`order` to arrange flex elements is discouraged](https://webaim.org/blog/flexbox-and-the-screen-reader-experience/) because they break the [reading order](https://www.w3.org/WAI/WCAG21/Understanding/meaningful-sequence) of the elements.  

### Absolute positioning

I use this next style if I can't use flexbox and/or I need dynamic element like a modal. Another reason I might use this style is if I can't touch the parent style since the all the positioning style is in the child element. 

```scss
// Source CSS Tricks
.parent {
  position: relative;
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  //...
}

```

```html
<div class="parent">
  <div class="modal">
    This is a modal
  </div>
</div>
```



<h2 id="overlay"> Overlay </h2>

Overlays are another UI pattern I use a lot. They are great for preventing mouse input where you don't want it, giving contrast to an element, and goes great with modals. Before I needed to use javascript to add the overlay as we want to know when the modal is visible in the parent. I accomplish that by adding a `.has-modal` class in the parent when modal is visible. 

```html
<div class="parent has-modal">
  <div class="modal">
    This is a modal
  </div>
</div>
```

```scss
.parent {
  position: relative;
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  //...
}

// overlay
.parent.has-modal:before  {
  content: ' ';
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.3);
}
```

Now we can do away with that and use `:has` selector.

```html
<div class="parent">
  <div class="modal">
    This is a modal
  </div>
</div>
```

```scss
// overlay
.parent:has(.modal):before  {
  content: ' ';
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.3);
}
```
Check out the demo to see the styles in action. 

https://codepen.io/chrisbautista/pen/WNgQRQE

Note that the overlay only prevents mouse input to the elements underneath the overlay. It will not stop keyboard users from tabbing into elements. This is not good for accessibility. We can fix this looping through the elements that need to be ignored and add [inert](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert). 

```javascript
//e.g

let focusableElements = Array.from(document.querySelectorAll(':not(.modal) a, :not(.modal) button, input, :not(.modal) [contentEditable],:not(.modal)  [tabindex]:not([tabindex=-1])'));

focusableElements.forEach(el => {
el.setAttribute('inert','');
});
```

<h2 id="truncaste">Truncate text</h2>

There will be times you want to truncate a large amount of text. It could be to improve a design and optimize the space or just to indicate you have more information and you want to signal the user to dig some more. Whatever reason its good to have a handy CSS class you can use to do the truncation for you. 

Below is the markup we are going to use for truncation classes.

```html
 <div class="truncate-demo">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum laoreet a nisi quis lacinia. Pellentesque sit amet mauris ac nunc pellentesque dignissim a at quam. Aliquam pulvinar nulla sit amet ligula malesuada luctus a et mauris. Maecenas in mauris massa. Proin sit amet tellus a ipsum hendrerit varius. Sed eleifend odio vitae magna gravida mollis. Aenean massa ipsum, vehicula in enim gravida, tempus tempus arcu. Nullam porta nisi vitae sem fringilla, ut tristique neque dapibus. Cras commodo nunc non elit lobortis, at pretium elit efficitur. Etiam condimentum varius rutrum.</div>
```

```scss
.truncate-demo {
  width: 100%;
  border: 2px solid #d3d3d3;
  padding: 8px;
}
```

### One-line truncation 
For one line truncation, the trick is use the CSS property `text-overflow`. Whether its one-line or multiline, you need to first set the boundaries of the text container, in the case of a onle truncate its the width of the container. After that set make sure nothing bleeds out of the container by setting `overflow:hidden`.

<style>

.one-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.truncate-demo {
  width: 100%;
  border: 2px solid #d3d3d3;
  padding: 8px;
}

</style>

```scss

.one-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.truncate-demo {
  width: 100%;
  border: 2px solid #d3d3d3;
  padding: 8px;
}
```

<div class="demo">

 <div class="one-line truncate-demo">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum laoreet a nisi quis lacinia. Pellentesque sit amet mauris ac nunc pellentesque dignissim a at quam. Aliquam pulvinar nulla sit amet ligula malesuada luctus a et mauris. Maecenas in mauris massa. Proin sit amet tellus a ipsum hendrerit varius. Sed eleifend odio vitae magna gravida mollis. Aenean massa ipsum, vehicula in enim gravida, tempus tempus arcu. Nullam porta nisi vitae sem fringilla, ut tristique neque dapibus. Cras commodo nunc non elit lobortis, at pretium elit efficitur. Etiam condimentum varius rutrum.</div>

</div>


### Multiline truncation

For multiline truncation its a bit different but the same principle. For this we need to use [line clamping](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp). 
<style>

.three-line {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

</style>

```scss
.three-line {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
```

<div class="demo">

 <div class="three-line truncate-demo">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum laoreet a nisi quis lacinia. Pellentesque sit amet mauris ac nunc pellentesque dignissim a at quam. Aliquam pulvinar nulla sit amet ligula malesuada luctus a et mauris. Maecenas in mauris massa. Proin sit amet tellus a ipsum hendrerit varius. Sed eleifend odio vitae magna gravida mollis. Aenean massa ipsum, vehicula in enim gravida, tempus tempus arcu. Nullam porta nisi vitae sem fringilla, ut tristique neque dapibus. Cras commodo nunc non elit lobortis, at pretium elit efficitur. Etiam condimentum varius rutrum.</div>

</div>



<h2 id="fullscreenimage">Fullscreen background image</h2>

Fullscreen background images have been a constant mainstay in my projects. The trend started in the late 2000s, popularized by Apple's website featuring the Iphone. Nowadays, most websites especially those in marketing, creative or business websites will have a fullscreen image background or a large image style as "above the fold". Be careful with this depending on the image you may impact the speed at which your site loads. 

```scss

body {
  background-image: url("path/to/background.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100vh;
  margin: 0;
  padding: 0;
}

```

The key part here that enables fullscreen images is `background-size:cover`.  Setting `cover` to [background-size](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size) resizes your image to "cover" most of the container without stretching or skewing the image. 


## Wrapping up

Having a quick reference for common frontend work is a good way to improve your workflow. Hope these list of CSS styles will be of use to you. I recommend installing a snippet library so its available when you need it.  