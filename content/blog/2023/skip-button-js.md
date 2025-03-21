---
title: Automatically generate skip buttons to improve accessibility
author: chris
type: post
date: 2023-02-17 12:07:00+00:00
url: /2023/skip-button-js/
redirect_from: 
  - /skip-button-js/
featured_image: /blog/sammie-skip.jpg
featured_image_attribution: photo by <a href="https://unsplash.com/@sammiechaffin">Sammie Chaffin</a>
tags: [accessibility, javascript, frontend]
api: [querySelectorAll]
draft: false
---
  

Another common accessibility tool is the skip button. It comes in different forms. It would sometimes be smartly included in the design or hidden until needed. <!--more-->  Whatever form skip buttons allow users to bypass sections of content to make it easier to navigate websites. Adding ways to bypass content is part of the [WCAG accessibility guidelines: Bypass blocks](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0#qr-navigation-mechanisms-skip). 

## Problem 
I recently got a complaint from a screen reader user that some UI/widget on a client site was terrible to navigate through. Widely used screen readers like JAWS, NVDA or Voiceover have a feature to navigate based on common semantic tags like headings (h1, h2, h3, etc.) or links. In the case of the broken UI control, it has quite a lot of headings and links in the content. So when the screen reader tried to use the navigation shortcut for headings. It still included the headings in the UI control. 

## Solution  
To fix the issue we had two options. One(1) is to re-work the widget to remove the headings and use links instead. This required quite a bit of refactoring and testing. The effort is not worth the benefit. The second(2) option is to add skip buttons. We opted for the second option. 

Now when the screen reader or keyboard user navigates through the widget they will first encounter the skip button which they can activate to jump to the next section or ignore to continue through the widget. For the previous solution, we hard-coded the skip buttons as part of the design. 

The demo below shows code to generate skip buttons. The way it works is the developer provides a list of tags and selectors you want to skip. These can be blocks of content or sections that are quite difficult to navigate through like navigation, forms, etc. 

```javascript 
let nodesToSkip = document.querySelectorAll( " header .demo-header, aside .links, section" ); 
``` 

Next, the code loops thru these sections and adds skip buttons. When the button is focused and activated( using the <key>Enter</key> key ), the focus jumps to the next section or focusable element. When you navigate to the last section there is no skip button cause there is no section to jump to next. 

https://codepen.io/chrisbautista/pen/zYJLQRp 

In this demo, I opted to focus on sections but it is easy to tweak the code to focus on the next focusable element like a button or input control instead. As a bonus, whenever a section has a heading(h2) or title, the generated button text will use the heading/title text to further improve recognition. 

## Wrapping up 
Skip buttons are a powerful tool for improving accessibility. They provide greater control over users' experience navigating through websites. Feel free to reuse the code provided to generate skip buttons in your projects. Your users and customers will thank you. 