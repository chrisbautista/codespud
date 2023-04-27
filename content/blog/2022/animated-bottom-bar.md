---
title: Creating My Animated Bottom Bar Experiment
author: chris
type: post
date: 2022-11-19 01:07:00+00:00
url: /2022/animated-bottom-bar/
redirect_from: 
  - /animated-bottom-bar/

featured_image: /blog/sigmund-_dJCBtdUu74-unsplash.jpg
featured_image_attribution: photo by <a href="https://unsplash.com/@sigmund">Sigmund</a>
tags: [javascript, css, ui, animation]
---

I wanted to see how much we can do with CSS transitions. No keyframe animations at all. Although you would have more control over the animation with keyframes. For our demo, we need a simple change from one state to another. CSS transitions are all we need.

In one of the animations, I used a technique I call the Sibling-Follow technique. Before you ask, I did not invent this technique - just the name. It's nice to name something when it's this good. I got it from one of the front-end sites - I forgot which.

When I understood the technique, my brain ran on overdrive. I was sketching different designs I can abuse this technique. I used this to animate the highlight element in the codepen below.

<!--ad-->
## Sibling-Follow Technique

To illustrate, let me walk you through a simple tab bar animation. If you are familiar with Material UI tabs, it behaves very similarly. 

[Material UI tabs](https://mui.com/material-ui/react-tabs/)

Make a list of buttons. Then, add another element and set the class as follow. We will use this to target and style the element later.

**HTML**
```html
<ul>
  <li> <button> button 1 </button></li>
  <li> <button> button 2 </button></li>
  <li> <button> button 3 </button></li>
  <li> <button> button 4 </button></li>
  <li> <button> button 5 </button></li>
  <li class="follow"><li>
</ul>
```

**CSS**
```css

ul,
li {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
}

ul {
    position: relative;
}

li {
    width: 50px;
    padding: 5px;
}

.follow {
    position: absolute;
    top: 0;
    left: 0;
    transition: left 0.4s ease-in-out;
    height: 2px;
    background-color: red;
}
```

I made a Javascript event handler to add the `active` class to the list item containing the button I clicked.

```html
<ul>
  <li> <button> button 1 </button></li>
  <li class="active"> <button> button 2 </button></li>
  <li> <button> button 3 </button></li>
  <li> <button> button 4 </button></li>
  <li> <button> button 5 </button></li>
  <li class="follow"><li>
</ul>
```

Using the sibling selector(~), we apply the desired styling for .follow element. In this case, I want to position the mentioned element above the second list button.

```css

li:nth-child(2):active ~ .follow {
    left: 60px;
}

```
I added the other left positions to the rest of the `li` items with some trial and error. 

Voila! We get a simple highlight animation, ala Material UI tabs, with a few markup and the magic of CSS transitions.

For my demo, I hardcoded the `left` property to the CSS for each transition state. Add a Javascript function to calculate these coordinates for you. Then you do not need to hardcode these values, especially if you are going to incorporate this into your professional work. 

<!--ad-->

You can make it fancier by animating the width of the follow tab at different speeds. Apply different easing functions. Make many follow elements running at various vectors. I will let you play with that on your own. Let your imagination run free.

I made five tab bar styles. Feel free to use these in your projects.

## Wrapping up

- You can make pretty amazing things with CSS, HTML, and a bit of Javascript.
- Sibling-Follow technique is a simple method you can use to create tab animations.
- CSS transition is your friend if you want to animate a simple change from one state to another.  

All in all, I was happy with the outcome of this exercise. I had so much fun and learned a lot. We could use some accessibility work though. 😜 That is something we can work on for another day.

I will explain the other animation styles I made with this pen later.

**Update**: This pen got showcased in a Codepen Spark newsletter last April 14th (link below). Thanks Codepen!😀🎉

[Tab Bar Styles, AI Games, and Some Good Forking News (April 14)](https://codepen.io/spark/280).

https://codepen.io/chrisbautista/pen/NWXjqLN