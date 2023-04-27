---
title: "React Custom button: a study on accessibility"
author: chris
type: post
date: 2022-12-19 01:07:00+00:00
url: /2022/custom_button-a_study_on_react_accessibility/
redirect_from: 
  - /custom_button-a_study_on_react_accessibility/

featured_image: /blog/daniel-ali-ju1yFZkrxVg-unsplash.jpg
featured_image_attribution: photo by <a href="https://unsplash.com/@untodesign_">Daniel Ali</a>
tags: [web-development, reactjs, accessibility]
draft: false
---

## React and accessibility

I love ReactJs. I learned late in my career as there were not a lot of opportunities to do so. When I finally found a suitable situation to explore ReactJs for a previous employer. I jumped on it and picked it up quickly. It was weird in the beginning but it became quite natural in the end. Now I mainly work with ReactJS in most of my projects. <!--more-->

One of the great things about working with ReactJs is working with JSX. ReactJS does not understand JSX - we achieve this with Babel. Babel transpile JSX to something ReactJS can understand. Anyhow, JSX is almost like HTML with some differences. And because it looks like HTML markup it becomes really easy to learn. But, and it's a big but, making it easy to learn does not save developers from issues related to accessibility. Some patterns that are perfectly valid and working in a way in ReactJS does not necessarily accessible.

For example, when using labels in forms 

```jsx

return (<>
  <label htmlFor="firstName">First Name </label>
  {
    isEditing  
    ? <input type="text" id="firstName" name="firstName">
    : data.FirstName
  }
</>);

```
When not editing, the input element identified `id=firstName` is not available. So the browser will ignore the label and but still render it. This is confusing to screenreaders. The markup above looks contrived but you will be suprised how often I see this. We can easily fix this by keeping the input element available to the browser but hidden to the user when not editing. 

```jsx

return (<>
  <label htmlFor="firstName">First Name </label>
  <input type="text" id="firstName" name="firstName" value={data.firstName} disabled={!isEditing}>
</>);

```

The outcome is similar to the former but the current markup is more accessible. Screenreader-friendly, in short.

I wanted to understand how best to tackle accessibility for custom components in React. With some rudimentary understanding of ReactJS. I proceeded with my education with a custom button. I know I’ve always said to always use semantic tags when possible. That is still true. But to understand what a button should have to make it accessible. Learning to make a custom button seems a good exercise to learn. Not just what ARIA attributes to put in but what I should be looking for when working react and keeping it accessible. Things like styling and visual feedback when buttons are activated etc.

## Custom Button

I started with a simple ReactJS component. A `span` wrapper element with an onclick event.

```jsx

  function CustomButton ({ onClick, children, ...restProps }) {
    return <span onClick={onClick} {...restProps}>{children}</span>;
  }

  // usage

  const onClick = () => alert('button clicked');
  return <CustomButton onClick={onClick}>Click me</CustomButton>;

```

To simplify, we will assume that the button will always have text, passed as a `children` prop. 

The markup for the component above has issues. Firstly, since it's a span it needs some styling to make it look like a button. It really depends on how you want to render a button but for our purpose, I will stick to a classic raised button style. 

### Button styling

We add some css to handle hover and clicked event styling.

```scss
/* SCSS */

.custom-button {
  display: inline-flex;
  justify-content: center;
  background-color: #f1f2f3;
  min-width: 140px;
  box-shadow: inset -3px -3px 6px 0 rgba(#000, 0.15),
    1px 1px 2px 0 rgba(#000, 0.15), 2px 2px 4px 0 rgba(#000, 0.15);
  padding: 0.35rem 0.5rem;
  border-radius: 10px;

  &:active {
    box-shadow: inset 3px 3px 6px 0 rgba(#000, 0.15),
      -1px -1px 2px 0 rgba(#000, 0.15), -2px -2px 4px 0 rgba(#000, 0.15);
  }

  &:focus-visible, &:hover {
    outline: 4px dashed orange;
  }
}


```

<!--ad-->

#### Selectors

The `:active` selector is applied when the button is clicked. `:hover` is applied when the mouse is over the button. Finally, `:focus-visible` will ensure that the button gets a visible outline when the button is navigated to using the keyboard. 

---

Our custom button looks like a proper button now with drop shadow and on press styling. When I click the button it writes "button clicked". For a button to be accessible it should be keyboard accessible. Let's try navigating to the button using <kbd>Tab</kbd> (and <kbd>Shift</kbd> + <kbd>Tab</kbd>) key in the Codepen demo below. 

https://codepen.io/chrisbautista/pen/ExpaJMP

As you can see, we are unable to focus the button. Next problem in our custom button we need to tackle is making it operable using the keyboard.

### Keyboard accessible

The [WCAG guideline 2.1: Keyboard](https://www.w3.org/TR/UNDERSTANDING-WCAG20/keyboard-operation-keyboard-operable.html) criterion requires interactive content(such as a button) to be operable using the keyboard. This is for users that can not use a mouse like people who are blind or with issues that make them prefer the keyboard. Simply, anything you can operate with a mouse should be available for a keyboard user too.

#### Tabindex

We need to be able to navigate to the button. What we need is to add tabindex so that it becomes focusable. 

```jsx

function CustomButton({ onClick, children, ...restProps }) {
  return (
    <span 
      className="custom-button" 
      tabIndex={0} 
      onClick={onClick} 
      {...restProps}>
        {children}
    </span>
  );
}

```

Cool!😎. Now it iss focusable. Next, press <kbd>Enter</kbd> key to trigger the button. If you notice nothing happened, that is because we lack a keyboard event handler! 

#### Keydown handler

We need a `KeyDown` handler that runs the same operation as if it was clicked like a native button. And like how a native button works we trigger the designated action with <kbd>Enter</kbd> and <kbd>Spacebar</kbd> keys.

```jsx

function CustomButton({ onClick, children, ...restProps }) {
  const onKeyDown = (e) => {
    if (e.key === 'Enter' or e.key === ' ') {
      onClick(e);
    }
  }

  return (
    <span 
      className="custom-button" 
      tabIndex={0} 
      onClick={onClick} 
      onKeyDown={onKeyDown} 
      {...restProps}>
        {children}
    </span>
  );
}

```

Let's see how it works so far, Use the <kbd>Tab</kbd> key to navigate and activate the button,

https://codepen.io/chrisbautista/pen/gOjbJLB


##### Keydown styling

Nice, the action is activated with either the <kbd>Enter</kbd> or <kbd>Spacebar</kbd> key works. There is another issue. None of the previous styles we added earlier will apply when we activate the custom button using the keyboard. We don’t have a selector for that so we need to use class selectors.

Since this is a state of the button, we need to provide code so that the component can track it internally.

```jsx

function CustomButton({ onClick, children, ...restProps }) {
  const [isPressed, setIsPressed] = React.useState(false);

    const onKeyDown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        onClick(e);
        setIsPressed(true); // when pressed
      }
    };

    const onKeyUp = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        setIsPressed(false); // when keyboard released a key
      }
    };

    // ...
}

```

We need to tell the button when to apply the "button pressed" styling. We accomplish that by setting a className, `custom-button-pressed`. We can recyle the `:active` styling defined earlier. 

```scss
.custom-button {
  
  //...*

  &:active,
  &-pressed {
    box-shadow: inset 3px 3px 6px 0 rgba(#000, 0.15),
      -1px -1px 2px 0 rgba(#000, 0.15), -2px -2px 4px 0 rgba(#000, 0.15);
  }

}


```

Next, we apply/remove the class name whenever the state changes.

```jsx

  // ...

  let classNames = "custom-button";
  if (isPressed) {
    classNames += " custom-button-pressed";
  }

  return (
    <span
      className={classNames}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      {...restProps}
    >
      {children}
    </span>
  );


```

Voila, the button style when activated with the keyboard works. 


https://codepen.io/chrisbautista/pen/WNKQWxj


### Screen reader

Our custom button is looking great! To recap, we styled the button and made it operable with both the mouse and the keyboard. It looks shipable, right? 

Not yet.

If you use a screen reader now, you will notice that the custom button is treated as a clickable div - NOT a button. Since we only made the span look and act like a button. The browser does not tell the screen reader that we’ve made a button. It still thinks this is a clickable div. We add markup to tell the browser what to expect.

#### Role=button

To tell the browser that we have a button we assign it a `role` of `button`; Simple enough, right?

> ARIA roles provide semantic meaning to content, allowing screen readers and other tools to present and support interaction with object in a way that is consistent with user expectations of that type of object. 

I mentioned before we should be using [semantic tags](/2022/five_steps_to_improve_accessibility/). The browser readily understands the behavior and information about semantic elements telling assistive technologies(like a screenreader) what to expect. This is already baked into the semantic element. We can just use it straight away. On the other hand, our custom button needs our help providing that information to the browser. Setting the role turns our custom button into a semantic button element.

Test the next demo with a screen reader.

https://codepen.io/chrisbautista/pen/BaPoEbw

> Install a screenreader
> - [NVDA](https://www.nvaccess.org/) for windows 
> - [VoiceOver](https://www.apple.com/voiceover/info/guide/_1121.html) for Macs
> - [ORCA](https://wiki.gnome.org/Projects/Orca)

## React hook: useButton

I like React hooks. It is great for reusing functionality. Our custom button is great but we are stuck with a span element. We can change this in several ways. My favorite is moving the component behavior and state in a React hook. Once we’ve moved the behavior out of the custom button. We don’t need the custom component anymore. We can directly apply the props to any element we want to make into a button.

```jsx

const KEY = {
  Enter: 'Enter',
  Spacebar: ' ',
}

function useButton({ onClick, className }) {
  const [isPressed, setIsPressed] = React.useState(false);

  const onKeyDown = (e) => {
    if (e.key === KEY.Enter || e.key === KEY.Spacebar) {
      onClick(e);
      setIsPressed(true);
    }
  };

  const onKeyUp = (e) => {
    if (e.key === KEY.Enter || e.key === KEY.Spacebar) {
      setIsPressed(false);
    }
  };

  return {
    isPressed, // tells if the button is pressed
    a11yProps: { // props that tell the browser this is a button 
      tabIndex: 0,
      role: "button"
    },
    eventProps: { // event handlers 
      onClick,
      onKeyDown,
      onKeyUp
    }
  };
}

// usage

  const { isPressed, a11yProps, eventProps } = useButton({ onClick });

  let className = "custom-button";
  if (isPressed) {
    className += " custom-button-pressed";
  }

  //...
  
  <span className={className} {...a11yProps} {...eventProps}>
    Click Me
  </span>


  //...

```

https://codepen.io/chrisbautista/pen/poZjmNG

For the `a11yProps`, we only needed `tabIndex` and `role=button`.

### Extending the hook

We can extend useButton with other ARIA props for various use cases e.g. a toggle button. A toggle button keeps its `isPressed` state until triggered again. Using `aria-pressed`, we can keep the state set for the browser's benefit. 

```jsx

// usage

  const { isPressed, a11yProps, eventProps } = useButton({ onClick });

  let className = "custom-button";
  if (isPressed) {
    className += " custom-button-pressed";
  }

  const newA11yProps = _.extend(a11Props, {
    'aria-pressed': isPressed,
    'aria-label': 'Toggle'
  });

  //...
  
  <span className={className} {...newA11yProps} {...eventProps}>
    <span className="toggle-notch" />
  </span>


  //...


```

Also, thrown in `aria-label` to the previous code to fix the lack of visible text.


## Wrapping up

To make an accessible custom button component we need a few things;

- CSS to simulate a button state from unpressed, focused, and when activated.
- Event handlers not just for the mouse but for the keyboard as well.
- ARIA to change the semantic meaning of an element to a button.

With the `useButton` hook we can extract the learnings from this exercise into a reusable function and apply it anywhere we need a custom button element. 
