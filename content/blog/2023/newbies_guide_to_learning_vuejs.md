---
title: "Newbie's Guide to Learning Vue.js"
author: chris
type: post
date: 2023-01-14 07:07:00+00:00
url: /2023/newbies_guide_to_learning_vuejs/
redirect_from: 
  - /newbies_guide_to_learning_vuejs/
featured_image: /blog/viewfinder-unsplash.jpg
featured_image_attribution: photo by <a href="https://unsplash.com/@helloimnik">Hello I'm Nik</a>
tags: [vue, frontend, web-development]
draft: false
---
Part of my [new year resolution for 2023](/2022/programmers_resolution_2023/) is to learn at least 3 new front-end frameworks. One of these frameworks I intend to dive deeper into is Vue.js. 

Every time I want to learn something new I try to plan first. A very quick to-do list related to the subject. I know there's a lot of great guides out there about Vue.js. <!--more--> But I still like making my little todo list. It keeps me focused. 

To start, I went to [Vue.js' documentation page](https://vuejs.org/guide/introduction.html). I scanned all the topics provided. I looked for the least amount of concepts to get a sense of Vue.js - enough to start a simple application. Then, I grew my knowledge gradually. I've outlined these initial concepts in this post. 

If you're like me, one that is practically new to Vue.js, or if you worked on Vue.js before but interested in a refresher, or are just interested in reading on the topic, continue to read on.

## Vue.js learning plan

To be honest I got lost quite early because of topics I am not familiar with. Topics like the difference between Options API and Composition API. If you don't know what that is either, then you were me at the beginning. [Vue.js documentation on API Preference](https://vuejs.org/guide/introduction.html#api-styles) should explain the difference between API styles. 

To simplify, I restricted my study to just using the [Options API](https://vuejs.org/guide/introduction.html#options-api). Feel free to try whichever API style you prefer. I found I readily applied the same concepts using Composition API once I understood it. So don't worry about having to learn both in the beginning. 

1. [How to create a Vue application](/2023/newbies_guide_to_learning_vuejs/#create)
2. [Working with Templates](/2023/newbies_guide_to_learning_vuejs/#templates) 
3. [Vue.js Directives](/2023/newbies_guide_to_learning_vuejs/#directives) 
4. [Data handling and methods](/2023/newbies_guide_to_learning_vuejs/#data)
5. [Computed properties](/2023/newbies_guide_to_learning_vuejs/#computed)
6. [Handling events](/2023/newbies_guide_to_learning_vuejs/#event-handling)

<!--ad-->

<h3 id="create">1. How to create a Vue Application</h3>

To start off, the first thing any developer wants to learn is how to make a simple application. Like most front-end frameworks nowadays, there are two ways to start creating an application. The first option is hosting an HTML page with the library CDN loaded and one is to build an application using build setup. Choose whichever way you want to start with. What's important is you get started early to practice.

**HTML page loading Vue CDN**

   - [Vuejs.org: Using a CDN](https://vuejs.org/guide/quick-start.html#using-vue-from-cdn)
   - [Vue School: Getting started with VueJS](https://vueschool.io/lessons/getting-started-with-vuejs)

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

**Build setup with NodeJS**

   - [Vuejs.org: Using NodeJS Setup](https://vuejs.org/guide/quick-start.html#creating-a-vue-application)
   - [MDN: Vue.js - Installation](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_getting_started#installation)

```bash
> npm init vue@latest
```
<h3 id="templates">2. Working with Templates</h3>

Vue.js has templates to define the structure of a simple application. Templates are written in HTML(or HTML-like syntax) and can include special library-specific directives and expressions to render data. 

```html
<span>Message: {{ msg }}</span>
<p>{{ rawHtml }}</p>
```

- [Vuejs.org: Template Syntax](https://vuejs.org/guide/essentials/template-syntax.html)
- [Vue School: Vue.js Template Syntax and Expressions](https://vueschool.io/lessons/vuejs-template-syntax-and-expressions)

<h3 id="directives">3. Vue.js Directives</h3>

While working with templates, you will come across directives. Directives appear as element attributes specific to Vue.js. They are prefixed with `v-` syntax like the example below. Directives extend templates with logic and additional functionality. The example below the directive `v-for` loops thru the items and render the text for each item inside the div.

```html
<div v-for="item in items">
  {{ item.text }}
</div>
```

- [VueJS.org: Directives](https://vuejs.org/api/built-in-directives.html)
- [CodeAcademy: Directives 💵](https://www.codecademy.com/courses/learn-vue-js/lessons/vue-introduction/exercises/directives)
- [Vuejsdevelopers.com: Understanding Directives](https://vuejsdevelopers.com/lessons/understanding-directives-1/1/)

<h3 id="data">4. Data handling and methods</h3>

Vue.js components have a data object that holds the component's state, and methods that can be used to manipulate the state. In my opinion, the ability to manage and manipulate data is what makes front-end frameworks interesting. It's the difference between a simple HTML page and a dynamic site. 

- [VueJS.org: Data](https://vuejs.org/api/options-state.html#data)
- [Vue School: Fundamentals - Vue methods](https://vueschool.io/lessons/vue-methods)

### State management

State management is an advance topic related to data and how it drives your application. You can use the data object and other techniques to manage the state of the application. For simple cases that is enough. For more complex applications we should be using state management libraries. These libraries are Vue.js' answer to the flux pattern libraries ubiquitous to React.js projects.

- [Pinia](https://pinia.vuejs.org/introduction.html)
- [Vuex](https://vuex.vuejs.org/)

Some articles I've read - recommends using **Pinia** over **Vuex**. 

<h3 id="computed">5. Computed Properties</h3>

Computed properties are calculated based on other data or properties on a page. The contrived example below illustrates what computed properties are used for. The values are automatically "calculated" from the source property, `store.fruits`. When the source property changes the computed value also changes without additional code. 

```javascript

export default {
  data() {
    return {
      store: {
        fruits: [
          'apple',
          'mango',
          'banana',
          //...
        ]
      }
    }
  },
  computed: {
    hasMangoToSell() {
      return this.store.fruits.indexOf('mango') !== -1 ? 'Yes' : 'No'
    }
    //...
  }
}

```

```html

<dl>
  <dt>Has mango to sell?</dt>
  <dd>{{ hasMangoToSell }}</dd>
  ...
</dl>

```

The `hasMangoToSell` computed property above is "computed" from the data object property `store`. 

<!--ad-->

- [VueJs.org: Computed properties](https://vuejs.org/guide/essentials/computed.html)
- [Vue School: Computed properties](https://vueschool.io/lessons/vuejs-computed-properties)
- [MDN: Using Vue computed properties](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_computed_properties)

<h3 id="event-handling">6. Handling events</h3>

Event handling is the essence of front-end interactivity. Vue.js allows you to handle events, such as button clicks, form inputs, and more. These events could either be inline or method handlers. 

Inline handlers executed code is defined inside a `@<event name here>=""` attribute. Like so: 

```javascript
data() {
  return {
    count: 0
  }
}
```
```html
<button @click="counter++">Increment</button>
<p>There are {{ counter }} sheep jumping over the fence</p>
```
Method handlers on the other hand are defined from the application object itself under the `methods` prop. 

```javascript

data() {
  return {
    counter: 0
  }
},
methods: {
  increment() {
    this.counter++;
  }
}
```
```html
<button @click="increment">Increment</button>
<p>There are {{ counter }} sheep jumping over the fence</p>
```

- [VueJS.org: Event Handling](https://vuejs.org/guide/essentials/event-handling.html)
- [VueJS.org: Form Input Bindings](https://vuejs.org/guide/essentials/forms.html)
- [Vue School: User events](https://vueschool.io/lessons/vuejs-user-events)

## Wrapping up

There are other concepts a Vue.js developer needs to learn of course. I think you will encounter those topics while running through the topics in this list. Advanced topics like components, watchers, and hooks. Feel free to add that to your own learning plan. I am thinking to cover those topics when I start building more complex applications.

After the list above I plan to explore more advanced topics and start building a project. It is important to practice by building small projects, experimenting with different features, and following tutorials. I think that is still the best way to learn. 

## Bonus

Aside from the excellent documentation on Vue.js' website. I found their [tutorial](https://vuejs.org/tutorial/#step-1) page really helpful too. If you like learning ala-FreecodeCamp-style, you can appreciate a similar experience. Same with FreecodeCamp, you are presented with topics on the language accompanied with code problems to solve. I recommend checking it out.

## My progress so far

Below is my where I am in terms of my efforts learning Vue.js.  

1. <span>Learn Vue.js essential concepts</span> (partial)
2. Debugging a VueJS application
3. Create a blog application using Vue.js
4. Learn Vue-Router
5. Build for Production


