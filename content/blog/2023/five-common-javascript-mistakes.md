---
title: Five common Javascript mistakes I am guilty of
author: chris
type: post
date: 2023-02-02 07:07:00+00:00
url: /2023/five-common-javascript-mistakes/
redirect_from: 
  - /five-common-javascript-mistakes/
featured_image: /blog/brett-jordan-error-unsplash.jpg
featured_image_attribution: photo by <a href="https://unsplash.com/fr/@brett_jordan">Brett Jordan</a>
tags: [javascript, error, web-development, list]
api: ['===', '==', 'const', 'for..of', 'for..in', 'this' ]
draft: false
---

<!--

problem: Javascript errors that trip most programmers

1. For in vs For out
2. Equality in array function
3. == vs ===
4. scope
5. Events and this

-->

Errors in code are normal. That is why we have a whole branch of the IT industry dedicated to quality assurance and testing. Javascript is the easiest programming language to learn, but it is also the easiest to get wrong. Javascript is a very forgiving programming language. As a result, Javascript code can be prone to errors. <!--more-->

In this post, I will list some of the mistakes I've encountered coding in Javascript.

- [Misunderstanding "const"](./#equality)
- [Strict vs Loose Equality](./#equality)
- [Assignment vs Equality](./#assignment)
- [For...of vs For...in](./#forof)
- [Event handlers and proper use of "this"](./#this)

<h2 id="const">Misunderstanding "const"</h2>

> The const declaration creates a read-only reference to a value. It does not mean the value it holds is immutable—just that the variable identifier cannot be reassigned. 
> - [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

One mistake I keep repeating is forgetting that defining an object with `const` does not prevent the contents from mutation. `Const` only prevents the variable from being reassigned. 

```js
  const i = 1
  const myObject = {a: 1, b: 2}
  const myArray = [0, 1, 2, 3]

  i = i + 1 // TypeError: Assignment to constant variable 

  myObject.a = myObject.a + 1 // {a: 2, b: 2};
  myObject = {a: 2} // TypeError: Assignment to constant variable

  myArray[0] = 2 // [2, 1, 2, 3]
  myArray = [2,3] // TypeError: Assignment to constant variable

```

This means you can update the contents of an object or array. This is legal because we are not acting on the reference. This is more confusing than problematic. As you can just change the declaration with `let`. 

Rather than keep making this mistake and avoid confusion, I use `let` to define variables all the time even for magic values. I think `const` is not worth the confusion it causes.

<h2 id="equality">Strict vs Loose Equality</h2>

As a javascript developer, I have learned to always use strict equality (`===`). Most javascript programmers will tell you to follow that rule. If you come from a C-based language like C# or C++, you are probably more familiar with double equals(`==`) than strict equality. I am guilty of this mistake, especially when switching the coding context between the frontend(`Javascript`) and the backend(`C#`). The mistake is easily remedied but hard to trace especially in a massive codebase. The difference is that (loose) equality (== and !=) will try to force type conversion when comparing two values. Sometimes this is not what we want. 

```javascript

let foo = 1;
let bar = '1';

foo == bar // true
foo != bar // false

```
This is not the case for strict equality(=== and !==). Strict equality checks will never apply type conversion and test the two values directly. If two values are not of the same data type the test fails. 

```javascript

let foo = 1;
let bar = '1';
let der = 1;

foo === bar // false
foo !== bar // true

foo === der // true
foo !== der // false

```

As I mentioned in the beginning always use strict equality, unless you have a good reason to use loose equality. An example of that is if you are pulling data from some source and just want to know that a value exists without testing the data type. You can use loose equality in those cases, but be careful and make sure you know what you're doing. 

### Example

Here's an example component I made in React where I had an issue with equality. 

```jsx

function AwesomeComponent(props) {
  const [buyOption, setBuyOption] = React.useState(0);

  function onChange(e) {
    setBuyOption(e.target.value);
  }

  return <React.Fragment>
  <label>
    <input name="buyJeansStyle" type="radio" value={0} checked={buyOption === 0} onChange={onChange}> Style 1
  </label>
  <label>
    <input name="buyJeansStyle" type="radio" value={1} checked={buyOption === 1} onChange={onChange}> Style 2
  </label>
  </React.Fragment>
}

```

At first glance, everything works fine. Then I tested the result, I found I can't change my choice. Clicking on a radio button did not set the button. I tried everything I can think of to fix the component. I refactored a few times but to no avail. It took me forever to find the issue. I finally realized that the issue is the equality test for the `checked` prop on the radio buttons. I was acting on the assumption that the values assigned, `value=0` and `value=1`, are integers when the state is set, but I was mistaken. The event handler was setting the string version of the values. Meaning `e.target.value` where strings, '0' and '1', and not the integer equivalents. So strict equality was always false for both checks causing the bug. Here is where the loose equality check is a better option.

```jsx
  <label>
    <input name="buyJeansStyle" type="radio" value={0} checked={buyOption == 0} onChange={onChange}> Style 1
  </label>
  <label>
    <input name="buyJeansStyle" type="radio" value={1} checked={buyOption == 1} onChange={onChange}> Style 2
  </label>
```

Now the component works but to follow the "always use strict equality" rule I refactored again by casting the event value into an `integer` value. 

```jsx

  function onChange(e) {
    setBuyOption(parseInt(e.target.value));
  }

```

Both fixes accomplish the same thing. Your choice will depend if you need to keep the resulting value in a specific data type or not. 
<!--ad-->
<h2 id="assignment">Assignment vs Equality</h2>

I feel foolish whenever I commit this next error. 

Like the difference between loose equality and strict equality operators, the difference between assignment and equality is a single equal (`=`) sign. Thus it is easy to mistake using the former when you meant to use the latter.  Take for example the following code. 

```js


  let results = [
    { loanAmount: 1000, interest: 0.02 ... }
    { loanAmount: 40000, interest: 0.05 ... }
    { loanAmount: 1000, interest: 0.03 ... }
    { loanAmount: 10300, interest: 0.09 ... }
    //...
  ];

  let loansBelowAThousandCount = results.filter( item => item.loanAmount = 1000 ).length;

```

Without knowing all the contents in `results`, you can guess what the code wants to accomplish. I wanted to get the number of loans with `loanAmount` equal to 1000. I assume I would get a number less than the results count but instead got the same number as the results array every time. Looking at this simple code there will be some who would immediately find the issue. Do you see my error? 

I mistakenly use the assignment operator instead of the equality test. Inspecting the array from `results.filter( item => item.loanAmount = 1000 )`, I get the same items but with the `loanAmount` equal to 1000. 

```js

results.filter( item => item.loanAmount = 1000 ) 
/*
[
    { loanAmount: 1000, interest: 0.02  ... }
    { loanAmount: 1000, interest: 0.05 ... }
    { loanAmount: 1000, interest: 0.03  ... }
    { loanAmount: 1000, interest: 0.09 ... }
    //...
  ];
*/

```

Once I've verified the issue I corrected the code below.

```js

let newArray = myArray.filter( item => item.a == 1 ); // or better yet `===`

```

Since I know the `loanAmount` is always a number I can get away with the loose equality check. 

It is a very simple mistake to recognize but if it is in a big codebase with a lot of moving parts, it is quite difficult to see. 

<h2 id="forof">For ... in vs For ... of</h2>

If you want to loop through an array you may be familiar with this pattern.

```js
let myArray = [0, 10, 31, 20];

for(let i=0; i < myArray.length; i++) {
  let item = myArray[i];
  console.log(item);
}

// 0 
// 10 
// 31
// 20

```

What I hate about the structure above is that `i` is only used to get the array value. If variable `i` has some other purpose on the loop it would have been fine but with this pattern it's overkill. There are better ways to loop through an array like `Array.forEach` etc.

`For...of` is the fairly new iterator control structure we can use to replace the `for(;;)` loop. Using `for...of` we can refactor the code above. 

```js

for(let item of myArray) {
  console.log(item);
}

// 0 
// 10 
// 31
// 20

```

I like this structure because it's more readable. I can automatically read that in every iteration of the loop, I get a new "item" until the loop gets to the end of the array. It's a great pattern. Eslint has a rule that recommends it over the old `for(;;)` pattern. 

Sometimes I make a mistake and confuse the `for...in` loop instead of `for..of`. `For..in` is similar `for..of` but instead of the values of an array it returns the keys or index of an array item. 

```js

for(let item in myArray) {
  console.log(item);
}

// 0 
// 1 
// 2
// 3

```

I have made this mistake a few times so I made myself a mnemonic so I don't forget. 

Remember **'Key IN the value OF'**. 

`for..IN` returns "key"/index of an array item and `for..OF` returns the value.  


<h2 id="this">Event handlers and proper use of "this"</h2>


Here's another error I keep committing when working on Javascript. The `this` keyword like many programming languages hold special meaning. It represents the current context the code is acting on. In Javascript, most values are objects even functions.

```js

class MessageClicker {
  constructor(elem, message) {
    this.message = message;

    elem.addEventListener('click', this.onClick);
  }
  onClick() {
    alert(this.message);
  }
}

let fragment = document.createDocumentFragment();
let button = fragment.appendChild(document.createElement('button'));
button.textContent = 'click me';

let messageMe = new MessageClicker(button, 'This is an awesome class');

document.body.appendChild(button);

```
 
In the example above, I have a class `MessageClicker` that accepts a DOM element and a string `message`. An alert opens up with the provided string. When I tested I get the alert but with an `undefined` message. The issue is in the `onClick` event handler. 

```js

  onClick() {
    alert(this.message);
  }

```

The `this` keyword refers to the object but not all the time. Like our example, when contained in a callback function `this` is actually `undefined`. We can fix this in a few ways. One way is to bind the function when we attach it to the element. 

```js
  constructor(elem, message) {
    this.message = message;
    elem.addEventListener('click', this.onClick.bind(this));
  }
  onClick(){ /* ... */ }
```

The other way is to use arrow functions.  In arrow functions, `this` keeps the value of the enclosing context. In our example it's the class `MessageClicker`. 

```js
class MessageClicker {
  constructor(elem, message) {
    this.message = message;

    elem.addEventListener('click', this.onClick);
  }
  onClick = () => {
    alert(this.message);
  }
}
/* ... */
```

## Wrapping up

These are just some of the errors I come across with when working with Javascript. Mostly the mistakes are caused by confusion around certain concepts like the `this` context and the meaning of `const`. Most of these are easy to fix. My take is avoid the confusion and use more familiar syntax. If you think its worth using then I recommend trying to dig deeper before introducing any new keyword or convention in to your code. Cheers!