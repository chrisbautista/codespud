---
title: Automating Accessibility Audits With AI
author: chris
type: post
date: 2025-06-28 10:30:00+00:00
url: /2025/ai-accessibility-audits/
redirect_from:
  - /ai-accessibility-audits/
featured_image: /blog/thisisengineering-automated.jpg
featured_image_attribution: Photo by <a href="https://unsplash.com/@thisisengineering?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">ThisisEngineering</a> on Unsplash
      
tags: [accessibility, ai, web development]
api: ['accessibility', 'ai', 'web', 'audit']
draft: false
---

> "Standards evolve, user needs are wildly diverse, and manual audits can feel like searching for a semicolon in a haystack."

Let’s be honest: accessibility is one of those things that everyone agrees is important, but somehow always ends up on the “we’ll get to it later” list. (Right next to “refactor that one function” and “actually read the WCAG guidelines.”) But here’s the thing: the web is for everyone. Or at least, it should be.

## Accessibility: Not Just a Checkbox

If you’re a developer or DevOps engineer, you know the drill. New features, tight deadlines, and somewhere in the mix, a vague hope that your site works for everyone—including folks with disabilities and neurodivergent users. But accessibility isn’t just a legal checkbox or a last-minute scramble. It’s about building digital experiences that don’t leave anyone behind.

And yes, it’s tricky. Standards evolve, user needs are wildly diverse, and manual audits can feel like searching for a semicolon in a haystack. (Spoiler: it’s always missing.)

## Enter AI: Your New Accessibility Sidekick

Manual audits are thorough, but let’s face it—they’re slow, expensive, and often get pushed to the end of the sprint. That means:
- Real user issues slip through the cracks.
- Fixes get more expensive the longer you wait.
- Teams get frustrated, and so do users.

Automating accessibility audits brings some real superpowers:
- **Continuous feedback:** Catch issues early and often, not just before launch.
- **Scalability:** Big sites and frequent updates? No sweat.
- **Empowerment:** Developers, designers, and content creators get actionable insights—no PhD in accessibility required.

## AI: Not Just for Chatbots and Cat Memes

Traditional tools like axe-core or Lighthouse are great at catching the obvious stuff—missing alt text, color contrast fails, or headings that are more lost than your car keys. But nuance? Context? The wild variety of user needs? That’s where generative AI and large language models (LLMs) step in.

By understanding content, intent, and user journeys, AI can:
- Flag ambiguous or misleading link text (like the classic “click here”—about as helpful as a screen door on a submarine)
- Suggest more descriptive alt text for images
- Detect cognitive overload in layouts or copy (because nobody likes a wall of text)
- Simulate diverse user experiences, including those of neurodivergent users

## Tools That Actually Help (And Don’t Just Add More Tabs)

### 1. Microsoft Accessibility Insights + Copilot

[Accessibility Insights for Web](https://accessibilityinsights.io/docs/web/overview/) is a browser extension for Chrome and Edge that helps you test and fix accessibility issues in web applications. It now teams up with [GitHub Copilot](https://docs.github.com/en/copilot), so you get AI-powered suggestions for fixing accessibility issues right in your codebase.

**What it’s used for:**
- Automated and guided accessibility testing: Run quick or comprehensive checks and get step-by-step guidance to resolve issues.
- Visualizing and fixing issues in real time: Instantly see accessibility problems highlighted on your site and learn how to fix them.
- Getting AI-powered code suggestions for accessibility: Use Copilot to receive smart recommendations and code fixes as you develop.

**How to integrate Accessibility Insights and Copilot in your workflow:**
1. **Install Accessibility Insights for Web** as a browser extension in Chrome or Edge. [Get it here.](https://accessibilityinsights.io/downloads) [Docs.](https://accessibilityinsights.io/docs/web/overview/)
2. **Review the issues found** by Accessibility Insights. Each issue comes with detailed guidance and links to relevant documentation. [How to interpret results.](https://accessibilityinsights.io/docs/web/getstarted/)
3. **Open your code editor (e.g., VS Code) with GitHub Copilot enabled.** [Install Copilot.](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) As you address flagged issues, Copilot can suggest code changes—such as adding ARIA attributes, improving semantic HTML, or fixing color contrast. [Copilot guides.](https://docs.github.com/en/copilot)
4. **Use Copilot’s inline suggestions** to quickly implement recommended fixes. You can ask Copilot for accessibility-specific help (e.g., “Add accessible label to this button”) or let it auto-complete as you code. For example, in TypeScript/React:

```tsx
// Before
<button>Submit</button>

// Copilot suggestion for accessibility
<button aria-label="Submit form">Submit</button>
```

5. **Re-run Accessibility Insights** in your browser to verify that the issues are resolved. Repeat the process for continuous improvement.
6. **Integrate both tools into your CI/CD pipeline** by using [Accessibility Insights CLI](https://github.com/microsoft/accessibility-insights-cli) and Copilot’s code review features, ensuring accessibility checks and fixes are part of every pull request. [See CLI usage.](https://github.com/microsoft/accessibility-insights-cli#usage)

This workflow helps you catch, fix, and prevent accessibility issues early—making accessibility a seamless part of your development process.

### 2. Google Lighthouse + Gemini

[Google Lighthouse](https://developer.chrome.com/docs/lighthouse/accessibility/) is an open-source tool for auditing web page quality, including accessibility. When paired with [Gemini](https://deepmind.google/technologies/gemini), Google’s large language model, it can:
- Summarize accessibility issues in plain English
- Suggest improvements tailored to your site’s content and audience
- Predict the impact of changes on real users

**What it’s used for:**
- Quickly assess your site’s accessibility with automated reports and scoring, helping you spot and prioritize issues. (Adapted from [Lighthouse docs](https://developer.chrome.com/docs/lighthouse/overview/))
- Get plain-language explanations and actionable recommendations for each issue, powered by AI.
- Integrate with Chrome DevTools or your CI/CD pipeline for seamless, repeatable checks.

**How to integrate Google Lighthouse and Gemini in your workflow:**
1. **Install Google Lighthouse** as a [browser extension](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk) or use it directly in [Chrome DevTools](https://developer.chrome.com/docs/devtools/accessibility/reference/). For more, see the [official docs](https://developer.chrome.com/docs/lighthouse/overview/).
2. **Run an audit and review the Lighthouse report.** Each finding comes with explanations and links to best practices. [Accessibility audits with Lighthouse.](https://developer.chrome.com/docs/lighthouse/accessibility/)
3. **Bring in Gemini (or your favorite LLM) for deeper insights:** Copy the Lighthouse report or specific issues and ask Gemini to break them down, explain, or suggest improvements tailored to your site’s content and audience. [Gemini overview.](https://deepmind.google/technologies/gemini)
4. **Put the AI’s advice into action.** For instance, Gemini might spot a vague button label and suggest something more descriptive in your React code:

```tsx
// Before
<button>Click here</button>

// Gemini’s suggestion for clarity (adapted from accessibility best practices)
<button aria-label="Download report">Download</button>
```

5. **Run Lighthouse again** to see if your fixes did the trick and if your accessibility score is climbing. Keep iterating for steady progress.
6. **Level up your workflow by automating audits in CI/CD.** Use [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) to run checks on every deployment or pull request, and let Gemini help you interpret the results. [Lighthouse CI docs.](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/getting-started.md)

_Feature descriptions and workflow steps paraphrased and adapted from [Lighthouse documentation](https://developer.chrome.com/docs/lighthouse/overview/), [Lighthouse CI docs](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/getting-started.md), and [Gemini overview](https://deepmind.google/technologies/gemini)._

This workflow lets you combine automated audits with AI-powered explanations, making accessibility improvements more practical and less mysterious.

### 3. Axe by Deque

[Axe](https://www.deque.com/axe/) is a suite of accessibility testing tools built on the open-source [axe-core](https://github.com/dequelabs/axe-core) library. Here’s what’s in the toolbox:
- [Axe DevTools](https://www.deque.com/axe/devtools/): Browser extensions for automated and guided accessibility testing
- [Axe Auditor](https://www.deque.com/axe/auditor/): Manual testing for full WCAG coverage
- [Axe Monitor](https://www.deque.com/axe/monitor/): Continuous monitoring and reporting
- [Axe-core API](https://github.com/dequelabs/axe-core): Integrate accessibility checks into your automated test suites

**What it’s used for:**
- Run quick automated scans or deep-dive manual audits, so you’re covered for both fast checks and full compliance reviews.
- Keep tabs on your site’s accessibility over time and make sure you’re always in line with the latest standards.
- Build accessibility checks right into your development and deployment pipelines for peace of mind.

_Feature list and descriptions paraphrased and adapted from [Axe documentation](https://www.deque.com/axe/) and [axe-core GitHub](https://github.com/dequelabs/axe-core)._

---

## Workflow: AI-Driven Accessibility in Action

Curious how all these tools and AI-powered features come together in practice? Here’s a quick overview of what a modern, automated accessibility workflow can look like. The following steps show how you can integrate accessibility checks, AI review, and team collaboration into your development process—making accessibility a seamless part of building and shipping great web experiences:

1. **Continuous Integration:** Set up your CI pipeline to run automated accessibility checks on every pull request using tools like [axe-core](https://github.com/dequelabs/axe-core), [Accessibility Insights](https://accessibilityinsights.io/docs/web/overview/), or [Lighthouse](https://developer.chrome.com/docs/lighthouse/accessibility/).
2. **AI Review:** Use Copilot or Gemini to review flagged issues, generate code suggestions, and explain the impact. See [Copilot coding agent with MCP](https://docs.github.com/en/copilot/using-github-copilot/coding-agent/extending-copilot-coding-agent-with-mcp).
3. **Team Collaboration:** Share AI-generated reports with designers, developers, and content creators for holistic improvements.
4. **User Testing:** Simulate diverse user journeys with AI to uncover edge cases and cognitive barriers (because everyone deserves a smooth ride).

---

## Looking Ahead: The Human + AI Partnership

AI is not a silver bullet (if only!). Some issues—like the emotional tone of content or the lived experience of neurodivergent users—still need a human touch. But by automating the repetitive and technical parts of accessibility, AI frees up your team to focus on what matters most: creating delightful, inclusive experiences for everyone.

## Wrap-Up

The future of web accessibility is bright—and a little more automated. By embracing AI-powered audits, we can build a web that’s not just compliant, but truly welcoming to all. As you explore these tools, remember: accessibility is a journey, not a checkbox. Let AI handle the heavy lifting, and let your team’s creativity and empathy shine.

Happy coding, and happy (inclusive) building!

---


> "Accessibility allows us to tap into everyone’s potential."  
— [Debra Ruh](https://www.debraruh.com/)


