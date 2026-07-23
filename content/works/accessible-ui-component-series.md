---
path: "/works/accessible-ui-component-series/"
date: "2022-05-19T21:24:33Z"
title: "Accessible UI Component Series"
categories: [project, works]
tags: [accessibility, aria, css, design-system]
excerpt: "A small connected set of accessible UI components — accordion, buttons, and shared design tokens — built to test ARIA Authoring Practices patterns firsthand."
contentType: works
draft: false
---

A short series of accessible UI components built on one shared "Codespud" design-token file, so I could test [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) patterns myself instead of trusting a component library blindly.

Two more pieces from the same series already have full write-ups: the [accessible tab container](/accessible-tab-container/) and the [focus-within fixes](/fix_accessibility_with_focus_within/) for common hover-only UI patterns.

## Accordion

Disclosure pattern using `aria-expanded`, `aria-controls`, and `role="region"` per the [ARIA APG accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/), with animated expand/collapse and visible focus states.

https://codepen.io/chrisbautista/pen/zYRzOPM

## Accessible buttons in claymorphic styling

Proof that an on-trend visual style (claymorphic / soft-UI) doesn't have to come at the cost of accessible markup — real `<button>` elements, visible focus rings, and sufficient contrast underneath the styling.

https://codepen.io/chrisbautista/pen/PoQjYJz

## Shared design tokens

Both components above (and the tab container/accordion pair) pull from one [typography and color token file](https://codepen.io/chrisbautista/pen/ZEryzKx) — a small design system built with accessible contrast ratios in mind from the start.

**More CodePen experiments:** [codepen.io/chrisbautista](https://codepen.io/chrisbautista)
