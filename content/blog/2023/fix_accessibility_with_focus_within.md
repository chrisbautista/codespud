---
title: Fix accessibility using focus-within
author: chris
type: post
date: 2023-01-08 01:07:00+00:00
url: /2023/fix_accessibility_with_focus_within/
redirect_from: 
  - /fix_accessibility_with_focus_within/
featured_image: /blog/devin-avery-focus-unsplash.jpg
featured_image_attribution: photo by <a href="https://unsplash.com/@devintavery">Devin Avery</a>
tags: [accessibility, css, frontend]
api: [focus-within]
draft: false
---

A few issues I found recently for clients were related to accessibility. A few perfectly working user interfaces were not keyboard accessible. Not because they are custom controls nor because the controls were not tabable. <!--more--> But, because the keyboard experience did not match the mouse-only interactions. These user interfaces are confusing, to say the least. 

I solved these issues by using the `:focus-within` psuedo-selector.

I listed a few of them and the solutions.

## Table row with hidden buttons

Here the developer added an effect that shows the buttons when hovered. The markup is accessible to screen readers but does not look correct for sighted persons that use the keyboard. Accessibility is not just for screenreaders. [Sighted people need to make sense](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-focus-order.html) of the page too. 

<style>
.demo table {
  min-width: 500px;
  border-collapse: collapse;
}

.demo td,
.demo th {
  border: none;
}

.demo td,
.demo th:not(:first-child) {
  padding: 1rem 0.8rem;
  margin: 0;
  text-align: left;
}

thead tr {
  border-bottom: 3px solid #ddd;
}

tbody {
  /**
  * Show buttons on hover and when an element is focused inside the row
  */
    border-bottom: 2px solid #ddd;
}
tbody tr button {
  opacity: 0;
}
tbody tr:hover {
  background-color: #ffd57e;
}
tbody tr:hover button {
  opacity: 100%;
}

button {
  border: none;
  padding: 0;
  margin: 0;
  background: transparent;
  -webkit-appearance: none;
  box-shadow: none;
}

</style>
<div class="demo">
<table tabindex="0">
  <thead>
    <tr>
      <th>
        <div class="sr-only">Checkbox</div>
      </th>
      <th>Name</th>
      <th>Job description</th>
      <th>
        <div class="sr-only">Controls</div>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><input type="checkbox" value="1" name="user"></td>
      <td>John Doe</td>
      <td>rocket scientist</td>
      <td>
        <button class="delete" aria-label="delete">❌</button>
        <button class="save"  aria-label="save">💾</button>
      </td>
    </tr>
    <tr>
      <td><input type="checkbox" value="1" name="user"></td>
      <td>Adam smith</td>
      <td>economist</td>
      <td>
        <button class="delete" aria-label="delete">❌</button>
        <button class="save" aria-label="save">💾</button>
      </td>
    </tr>
    <tr>
      <td><input type="checkbox" value="1" name="user"></td>
      <td>Jose <rizal></rizal>
      </td>
      <td>novelist</td>
      <td>
        <button class="delete" aria-label="delete">❌</button>
        <button class="save" aria-label="save">💾</button>
      </td>
    </tr>
  </tbody>
</table>
</div>

```html

  <table tabindex="0">
    <thead>
      <tr>
        <th>
          <div class="sr-only">Checkbox</div>
        </th>
        <th>Name</th>
        <th>Job description</th>
        <th>
          <div class="sr-only">Controls</div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><input type="checkbox" value="1" name="user"></td>
        <td>John Doe</td>
        <td>rocket scientist</td>
        <td>
          <button class="delete" aria-label="delete">❌</button>
          <button class="save" aria-label="save">💾</button>
        </td>
      </tr>
      ...
    </tbody>
  </table>

```

Using the mouse, the table above works perfectly well. There is color highlighting and the buttons become visible when the mouse is over a table row. 

If you navigate the table using the keyboard, the experience is not what you will expect. Firstly, you don't see the highlight color when focused on a row. The worst of it is you will be able to go through all the focusable elements using the keyboard - including the invisible buttons. This is confusing for sighted people using the keyboard. 

<!--ad-->

Let's check the style code below. The buttons are invisible by default(`opacity: 0`). When the mouse is over the row (`:hover`), it gets a background color and buttons become visible(`opacity: 100%`).

```scss
// SCSS

tbody tr {
  button {
    opacity: 0;
  }

  /**
  * Show buttons on hover
  */
  &:hover {
    background-color: #ffd57e;
    button {
      opacity: 100%;
    }
  }
}


```

### Solution

We can use javascript and add an event handler on the focusable elements that gets triggered whenever any element on the row is focused. With that we can set a class (`.has-focused-element`) that applies the same style above.

```javascript

const els = document.querySelectorAll('tr input[type=checkbox], tr button');

els.forEach(el => document.addEventListener('focus', onFocus));

// etc...

```

```scss
// SCSS

tbody tr {
  // ...

  /**
  * Show buttons on hover
  */
  &:hover,
  &.has-focused-element {
    background-color: #ffd57e;
    button {
      opacity: 100%;
    }
  }
}

```

The changes above will work but uneccessary. We should try to solve any style problems inside the CSS first before reaching for Javascript.

Another solution is to use `:focus-within` where the `:hover` psuedo-selector is defined. 

> The :focus-within CSS pseudo-class matches an element if the element or any of its descendants are focused. In other words, it represents an element that is itself matched by the :focus pseudo-class or has a descendant that is matched by :focus. (This includes descendants in shadow trees.) - [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within)

"Focus-within" psuedo selector can match elements that has elements that gets focused. In this case, we have the `checkbox` and `button` elements. When these elements gets focus, we can apply the same style as if we hovered the pointer on the table row. This will work without adding a line of javascript. 

```scss
// SCSS

tbody tr {
  button {
    opacity: 0;
  }

  /**
  * Show buttons on hover and when an element is focused inside the row
  */
  &:hover,
  &:focus-within {
    background-color: #ffd57e;
    button {
      opacity: 100%;
    }
  }
}

```

### Solution in action

Here's the same table using `:focus-within`,

<style>

.fix tbody tr:hover, .fix tbody tr:focus-within {
  background-color: #ffd57e;
}
.fix tbody tr:hover button, .fix tbody tr:focus-within button {
  opacity: 100%;
}

</style>
<div class="demo fix">
<table tabindex="0">
        <thead>
          <tr>
            <th>
              <div class="sr-only">Checkbox</div>
            </th>
            <th>Name</th>
            <th>Job description</th>
            <th>
              <div class="sr-only">Controls</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="checkbox" value="1" name="user"></td>
            <td>John Doe</td>
            <td>rocket scientist</td>
            <td>
              <button class="delete">❌</button>
              <button class="save">💾</button>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox" value="1" name="user"></td>
            <td>Adam smith</td>
            <td>economist</td>
            <td>
              <button class="delete">❌</button>
              <button class="save">💾</button>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox" value="1" name="user"></td>
            <td>Jose <rizal></rizal>
            </td>
            <td>novelist</td>
            <td>
              <button class="delete">❌</button>
              <button class="save">💾</button>
            </td>
          </tr>
        </tbody>
      </table>
</div>

A user can navigate through the focusable elements in the row and see the "hover" effect. 

<!--ad-->

## Card with like(♥) button

Here's another user interface with a hover effect but no keyboard focus effect. Hovering over any part of the card applies a heart icon on top of the image indicating to the user that they can make the image their favorite. This card UI is part of an image gallery.


<style>

.card {
  min-width: 250px;
  max-width: 250px;
  overflow: hidden;
  position: relative;
  box-shadow: 1px 1px 4px 0 rgba(0 0 0 / 0.2), 2px 2px 8px 1px rgba(0 0 0 / 0.2);
  padding: 15px 15px 10px 15px;
  border-radius: 6px;
}
.card img {
  width: 100%;
  transition: opacity 0.35s ease-in-out;
  margin: 0;
}
.card span {
  font-size: 9rem;
  position: absolute;
  left: 50%;
  top: 50%;
  color: #ddd;
  transform: translate(-50%, -50%);
  text-decoration: none;
  opacity: 0;
}
.card:hover img, .fix .card:focus-within img {
  opacity: 70%;
  background-color: #000;
}
.card:hover span, .fix .card:focus-within span {
  opacity: 100%;
}
.card:hover button, .fix .card:focus-within button {
  opacity: 0;
}
.fix .card:focus-within {
  outline: 4px dashed #555;
  outline-offset: -5px;
}
.card button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  color: #ddd;
  font-size: 1.5rem;
  padding: 2px 4px;
}

</style>

<div class='demo' tabindex="0">

  <div class="card">
    <img src="https://images.unsplash.com/photo-1671026423293-7adf6a6abd13?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzMwNTEwNzE&ixlib=rb-4.0.3&q=80" alt="">
    <span>♥</span>
    <button class="like">♥</button>
  </div>

</div>

Works when using the mouse but when navigating using the keyboard - again the user experience fails. It lacks a good keyboard experience. When you tab through the card, the button gets focused - which is fine - but it's not the effect we wanted.

```html

<div class="card">
    <img src="https://images.unsplash.com/photo-1671026423293-7adf6a6abd13?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzMwNTEwNzE&ixlib=rb-4.0.3&q=80" alt="">
    <span>♥</span>
    <div class="button-group">
      <button class="like">♥</button>
    </div>
  </div>
</div>

```

```scss
// scss

.card {
  
  // ...
  
  &:hover {
    img {
      opacity: 70%;
      background-color: #000;
    }

    span {
      opacity: 100%;
    }

    button {
      opacity: 0;
    }
  }

  // ...
}

```

I know some will ask why can we not just add `tabindex=0` on the card and add a `:focus` style. Yeah that could work. But, we would end up with two focus steps(one for the card and the heart (♥) button) instead of just the button. We don't want that.

### Solution

Again `:focus-within` to the rescue. We go back to the style code and look for `:hover` styling. 

```scss
// scss
/**
  * Make heart cover image visible when button is focused
  */
  &:hover,
  &:focus-within {
    img {
      opacity: 70%;
      background-color: #000;
    }

    span {
      opacity: 100%;
    }

    button {
      opacity: 0;
    }
  }

```

The changes above should apply the same experience for both mouse and keyboard users. 

As a rule, we also want to add an outline when the card is focused using the keyboard. Similar to what we get when we focus any interactive control with the keyboard.

```scss
// scss
.card {
  // ...
  
  &:focus-within {
    outline: 4px dashed #333;
    outline-offset: 2px;
  }

  //...
}

```

### Solution in action

Use the <kbd>Tab</kbd> key to navigate through the card. When the button gets focused the card activates the hover effect we defined earlier. Now both hover and focus events show the same effect.

<div class='demo fix' tabindex="0">

  <div class="card">
    <img src="https://images.unsplash.com/photo-1671026423293-7adf6a6abd13?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzMwNTEwNzE&ixlib=rb-4.0.3&q=80" alt="">
    <span>♥</span>
    <button class="like">♥</button>
  </div>

</div>

<!--ad-->

## Apply effects when buttons are hovered

In this example we have an image with a color swatch control. When you hover over any of the colors, the corresponding color value is blended with the image. This works correctly with the mouse but with the keyboard. We want to be able to get the same effect on the image when any of the buttons gets focused using the keyboard.

```html
  <div class="picker">
    <div class="picker-group">
      <button class="picker-item" style="--selected-color: #912424"><span class="sr-only">red</span></button>
      <button class="picker-item" style="--selected-color: #3566b2"><span class="sr-only">blue</span></button>
      <button class="picker-item" style="--selected-color: #226642"><span class="sr-only">green</span></button>
    </div>
  </div>
```

```scss
// scss
.picker {

  // ...
  
  background-image: url(https://images.unsplash.com/photo-1552944150-6dd1180e5999?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzMwNTkzNzg&ixlib=rb-4.0.3&q=80);
  background-color: var(--selected-color);

  // ...

  &:hover {
    // blend image with color when button is hovered or focused
    background-blend-mode: hard-light;
  }

  // ...
}

```

For this one we have some scripting to setup the hover(mouseover) effect. We try set the CSS variable `--selected-color` as the picker background color. 

```javascript

const picker = document.querySelector(".picker");
const buttons = document.querySelectorAll(".picker-item");

function onHighlight(e) {
  const target = e.currentTarget;
  picker.style = target.style.cssText;
}

function onRemoveColor() {
  picker.style = "";
}

buttons.forEach((button) => {
  button.addEventListener("mouseover", onHighlight);
});

picker.addEventListener("mouseout", onRemoveColor);

```

<style>
.picker {
  position: relative;
  display: flex;
  width: 300px;
  height: 300px;
  overflow: hidden;
  background-image: url(https://images.unsplash.com/photo-1552944150-6dd1180e5999?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzMwNTkzNzg&ixlib=rb-4.0.3&q=80);
  background-size: cover;
  background-position: 20%;
  border-radius: 4px;
  background-color: var(--selected-color);
  transition: background-color 0.35s ease-in-out;
  flex: 1;
}
.picker:hover, .picker:focus-within {
  background-blend-mode: hard-light;
}
.picker-item {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #ededed;
  background-color: var(--selected-color);
  cursor: pointer;
}
.picker-group {
  position: absolute;
  bottom: 8px;
  left: 8px;
}
</style>

This is how it looks. My blog software does not run javascript so the UI below only shows a snapshot of one of the button focused. I will include a Codepen demo later in this page so you can interact with it. 

<div class='demo'>
  <div class="picker" style="--selected-color: #912424; background-blend-mode: hard-light;">
    <div class="picker-group" >
      <button class="picker-item" style="--selected-color: #912424; outline: 2px dashed #fff;"><span class="sr-only">red</span></button>
      <button class="picker-item" style="--selected-color: #3566b2"><span class="sr-only">blue</span></button>
      <button class="picker-item" style="--selected-color: #226642"><span class="sr-only">green</span></button>
    </div>
  </div>
</div>

Again the issue here is that the interface does not work well with the keyboard for sighted people. It's screen reader friendly but the experience is lacking when not using the mouse. 

This is a bit more complicated so we leverage `:focus-within` in conjunction with a `focus` event handler to set the color and blend style when using the keyboard. 

```scss
// SCSS

.picker {
  // ...

  &:hover,
  &:focus-within {
    // blend image with color when button is hovered or focused
    background-blend-mode: hard-light;
  }
}

```

```javascript
// ...

buttons.forEach((button) => {
  button.addEventListener("mouseover", onHighlight);
  button.addEventListener("focus", onHighlight); // trigger highlight script when buttons are focused
});

//...
```

Using the solution above, we get a better experience without a lot of extra code. See the solution in action in the Codepen below. 

## Full solution

Here are all three solutions in action. Check out the final code to understand the solutions in their entirety. 

https://codepen.io/chrisbautista/pen/bGjBZzM


## Wrapping up

Sometimes as web developers, it is great to work on problems that improve the user experience for a variety of people. For all the tools in our disposal its really great to know that adding a single psuedo-selector like `:focus-within` could be so useful. Without it, we might have ended up with some complicated solutions or worst case have to start from scratch. 


## Reference

- [MDN: focus-within](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within)
- [WCAG: Focus order](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-focus-order.html)
- [WCAG: Focus visible](https://www.w3.org/TR/2012/NOTE-UNDERSTANDING-WCAG20-20120103/navigation-mechanisms-focus-visible.html)