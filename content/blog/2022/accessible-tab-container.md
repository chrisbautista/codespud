---
title: Build an Accessible Tab Container
author: chris
type: post
date: 2022-10-10 01:07:00+00:00
url: /2022/10/accessible-tab-container/
redirect_from: 
  - /2022/10/accessible-tab-container/
  - /accessible-tab-container/
featured_image: /blog/chiara-f-MI8He1NWPWg-unsplash.jpg
featured_image_attribution: photo by <a href="https://unsplash.com/@quasichiara">Chiara F</a>
tags: [web-development, accessibility, best-practice]
draft: false
---

As part of the work I do for my employer, I analyze UI elements on our product to check if we need to re-engineer the component to improve accessibility. One of the accessibility challenges I have reworked for our company site is the tabbed container.

Imagine a folder with pages you can flip through using tabs at the edges. That is the closest I can imagine when I think of tabbed containers. This concept is very straightforward, tabs on top of the container  serves as buttons to access the corresponding grouped content. Only one grouped content is shown at any time. I love tabbed containers because they are very good at cleaning up the interface when you have so much content but have the same level of importance.

For the new component, I based it on the [tab panel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/) suggested in the WAI(*Web Accessibility Initiative*) site.


## Focus Order

Using the keyboard with the old tabbed container, the focus goes from the first tab, 2nd tab, 3rd tab, and so on. Then the tab content 1, etc. One would need to finish traversing the tabs before you can access the first tab's content. Its confusing to screenreader users as you would assume when you focus on the tab you can read the content.

<figure>
  <img src="/blog/build_an_accessible_tab_container___focus_order.png" alt="incorrect focus order">

  <figcaption>
    <p>The navigation sequence does not follow the natural way of content consumption.</p>
  </figcaption>
</figure>


To improve the focus/read order, we should make the first tab active and prevent the inactive tabs from getting the focus sequence. Navigation will go directly to the content when tabbing from the tab button. Another rule some UI developers forget is to make sure hidden elements do not get focus. So for the previous example, the "Services" and "Products" content panels and its content must not receive focus.

<figure>
  <img src="/blog/build_an_accessible_tab_container___correct_focus_order.png" alt="corrected focus order">

  <figcaption>
    <p> Now the user is only able to access the currently active tab and tab content</p>.
  </figcaption>
</figure>

<!--ad-->

## Keyboard controls 

The old tab container component only supported the <kbd>Tab</kbd> key to navigate which only follows the DOM sequence. A few tabs are tolerable but once you get more than five(5) tabs it can be annoying for the user to use.

To make the component keyboard accessible, we add behavior that follows the WAI tab panel pattern. The tab navigation activates once the focus goes to the active tab (button). Using the <kbd>Arrow Left</kbd> and <kbd>Arrow Right</kbd>, the user can navigate to the previous and next tabs correspondingly.

Additionally, you have two types of tab container behavior. *Automatic* tab containers will switch to a new tab when focus changes. While, *Manual* tabbed containers use <kbd>Enter</kbd> or <kbd>Spacebar</kbd> key to confirm the switch. I will use the “automatic” behavior for our demo.

<figure>
  <img src="/blog/build_an_accessible_tab_container___active_tab_focused.png" alt="active tab is focused">

  <figcaption>
    <p>The active tab shows focused styling when navigating with the keyboard. Using the arrow keys we can navigate to other tabs.</p>  
  </figcaption>
</figure>


## ARIA attributes

<figure>
  <blockquote> Accessible Rich Internet Applications (ARIA) is a set of roles and attributes that define ways to make web content and web applications (especially those developed with JavaScript) more accessible to people with disabilities.
  </blockquote>

  <figcaption>
    <cite>- MDN</cite>  
  </figcaption>
</figure>

It would have been nice if there was a tab panel semantic tag. There is none so we use ARIA attributes. On their own ARIA attributes do not do much. It does not add styling or extra behavior. But for screen readers or tools that aid people with impairments, ARIA attributes paint a picture that a browser can interpret.

For the tabbed container, we set the following ARIA attributes. 

<table>
  <thead>
  <tr>
    <th style="min-width: 200px;">ARIA attribute/role</th>
    <th>Description</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>role=tablist</td>
    <td>Container for tab buttons</td>
  </tr>
  <tr>
    <td>role=tab</td>
    <td>Tab button element. Contains the label for the currently active content.</td>
  </tr>
  <tr>
    <td>role=tabpanel</td>
    <td>Container for the currently active tab content</td>
  </tr>
  <tr>
    <td>aria-selected=true</td>
    <td>Tab button is selected and content is visible</td>
  </tr>
  <tr>
    <td>aria-selected=false</td>
    <td>Tab button is inactive and content is hidden</td>
  </tr>
  <tr>
    <td>tabindex=-1</td>
    <td>Removes the element from tab order sequence. We use this for the inactive tabs and hidden tab content. Aids in focus management.</td>
  </tr>
  <tr>
    <td>aria-controls=ID</td>
    <td>Set on the tab button. ID refers to the associated tab content</td>
  </tr>
  <tr>
    <td>aria-labelledby=ID</td>
    <td>Set on the tab content container. Refers to the tab button serving as a label for the content.</td>
  </tr>
  <tr>
    <td>tabindex=0</td>
    <td>Set on the tab content container. Puts the container back to tab sequence</td>
  </tr>
  </tbody>
</table>



## Our tabbed container in action

https://codepen.io/chrisbautista/pen/XWZgrVx