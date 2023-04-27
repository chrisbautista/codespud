---
title: Five Web Accessibility Extensions for Visual Studio Code
author: chris
type: post
date: 2022-12-15 08:07:00+00:00
url: /2022/five_accessibility_vscode_extensions/
redirect_from: 
  - /five_accessibility_vscode_extensions/
featured_image: /blog/kevin-ku-w7ZyuGYNpRQ-unsplash.jpg
featured_image_attribution: photo by <a href="https://unsplash.com/es/@ikukevk">Kevin Ku</a>
tags: [accessibility, tools, productivity, vscode]
draft: false
---
<!--
    Angle:

    Aid in making sure code is acessible
    Find patterns that are against accessibility rules
    Provide sufficient techniques in code
    Avoid accessibility issues in code

    - Webhint https://marketplace.visualstudio.com/items?itemName=webhint.vscode-webhint

    - Axe-Linter https://marketplace.visualstudio.com/items?itemName=deque-systems.vscode-axe-linter

    - Web Accessibility https://marketplace.visualstudio.com/items?itemName=MaxvanderSchee.web-accessibility

    - Eslint with jsx-a11y https://www.npmjs.com/search?ranking=popularity&q=eslint%20a11y

    - SonarLint https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode

    - Bonus: ErrorLens https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens
-->

Developing with accessibility in mind requires knowledge of WCAG rules and good techniques. These techniques boils down to remembering good accessbility patterns in code. Linters are good at discerning less ideal patterns and provide hints on how to fix them. Before I used to think linters are optional for developers. But now I don't think I can work without them. Using a good IDE linter will help making sure your code follows accessibility best practices and in turn make you more productive.

<!--more-->

> Web accessibility involves following certain design principles which ensure that people who experience difficulties or limitations have the same or a similar experience as those who do not. - [Hubspot](https://blog.hubspot.com/website/web-accessibility)

In the example below the linter should be able to recognize that the button tag is missing a visible label.

```html

<button>
  <img src="save.png" class="responsive" alt="" />
</button>

```

The code above is problematic for screenreaders because it does not have any text to describe what action the button is supposed to do.  I have seen a lot of HTML markup that forgets this simple rule. A linter would have caught this before even going into production.

Here is the same code with a linter

<img src="/blog/code-with-linter.png"  alt="Code with linter warning" class="no-margin">

Visual Studio Code have plugins that help coders make their code pass accessibility checks.

Here are the top 5 plugins I use:

## 1. [Axe accessibility linter](https://marketplace.visualstudio.com/items?itemName=deque-systems.vscode-axe-linter)

**Axe** is a leader in accessibility testing and tooling. They built [axe-core](https://github.com/dequelabs/axe-core) which powers axe-linter. It is easy to install and no configuration needed. You can start enjoying the benefits of realtime code accessibility checks.

Its pre-configured to check the following file extensions:

- React (.js, .ts, .jsx, .tsx)
- HTML (.htm, .html)
- Markdown (.md, .markdown)

The great thing about axe-linter is you can click a link in the hint. The linked page will explain the issue, why its relevant and how to fix it.

<img src="/blog/vsce-example.png" alt="Axe linter">



<!--ad-->

## 2. [Webhint](https://webhint.io/docs/user-guide/extensions/vscode-webhint/)

> Webhint helps you improve your site's accessibility, speed, cross-browser compatibility, and more by checking your code for best practices and common errors. - [Webhint](https://webhint.io/)

**Webhint.io** is a tool that looks for a suite of website best practices. These best practices include accessibility, website performance, security, etc. The [command line tool](https://webhint.io/docs/user-guide/) will scan the site provided and return a report. The webhint visual studio extension, on the other hand, analyzes code while you develop.  ([See accessibility hints](https://webhint.io/docs/user-guide/hints/hint-axe/)).

It also uses axe-core to analyze the code.

<img src="/blog/webhint-vscode.gif" alt="Webhint.io">

## 3. [Web Accessibility](https://marketplace.visualstudio.com/items?itemName=MaxvanderSchee.web-accessibility)

**Website accessiblity** is another Vscode plugin geared at checking for accessibility issues in code. Not as extensive as the first two plugins but I think that is a good thing. Its focus is just accessibility issues nothing else. The hints are simple and does not offer any other options. Perfect for coders who love memory efficient IDEs.

<img src="/blog/web-accessibility.gif" alt="Web accessibility">

## 4. [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) with [jsx-a11y](https://www.npmjs.com/search?ranking=popularity&q=eslint%20a11y)

Eslint is a bit more complex to install than the previous plugins. If you've been developing with the Eslint and Eslint plugin then you will have an easier time.  

### Installation

Run these commands in your project root

```bash

npm install --save-dev eslint eslint-plugin-jsx-a11y
./node_modules/.bin/eslint --init

```

You can also do this globally;

```bash

npm install -g eslint eslint-plugin-jsx-a11y 
eslint --init

```

Finally, add jsx-a11y in plugins section of your `.eslintrc`

```json

{

 "plugins": ["jsx-a11y"]

}

```

You might get a popup saying there is an error starting eslint plugin, check the output logs in Vscode for any issues. In most cases, making sure you have the latest nodejs and npm fixes the issue.

## 5. [SonarLint](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode)

Last but not the least, Sonarlint is a code quality checking tool, like Webhint and Eslint. It checks for a suite of issues in your code not just accessibility. It requires Java runtime to work.

The accessibility rules are limited to [HTML](https://rules.sonarsource.com/html/tag/accessibility) portion of your code.  

If you are more interested in accessibility checks, I recommend using the other plugins on this list.

<!--ad-->

## Bonus: [Errorlens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)

Errorlens is not an accessibility plugin but a support plugin that places the warnings and errors from the linters front and center. Its nice to see the issues directly without having to hover over the squiggly lines or opening the "problems" tab.

Once you have chosen your accessibility plugin I recommend installing Errorlens to improve visibility of errors and warning messages.

**Without Errorlens**

<img src="/blog/without-errorlens.png" alt="Vscode without Errorlens" class="no-margin">

**With Errorlens**

<img src="/blog/vscode-with-errorlens.png" alt="Vscode with Errorlens" class="no-margin">

## Wrapping up

You still need to have unit and regression tests in place before pushing anything into production but at least the number accessibility issues that get through would be less than just leaving it to CI/CD testing suites. Using proper tools in development makes your work look more professional. It also helps your team. Use these accessibility plugins so you can bake in accessibility into your workflow will less effort.
