---
path: "/works/morsecode-potato/"
date: "2018-08-28T19:21:31Z"
title: Morsecode-Potato
categories: [projects, works]
tags: [reactjs, tailwind]
excerpt: 
contentType: works
featured_image: /morsecode-potato-header.png
draft: false
---

Morsecode-potato is a fun experiment to understand how to use react hooks to package functionality.

In this experiment, I created:

- Custom hooks to translate and execute morsecode. 

    - useMorse - Translates text to international morse (ITU-R M.1677-1) returns a "morse" string
    - useMorsePlayer - Plays a morse string as audio, as a silent visual signal, or both in sync — one clock drives everything, so sound and light can't drift.

- Demo page 

  - A tailwind styled react app
  - Color scheme (shift) is old timey telegraph station. 
  - Sections are:
    - The input text area
    - Playback buttons 
    - Abbreviation reference table

<figure>
<img src="/morsecode-potato-app.png" height="50%" width="50%" />
<figcaption>Morsecode potato demo page in light theme</figcaption>
</figure>

<figure>
<img src="/morsecode-potato-dark.png" height="50%" width="50%" />
<figcaption>Morsecode potato demo page in dark theme</figcaption>
</figure>

Demo: [chrisbautista.github.io/morsecode-potato/](https://chrisbautista.github.io/morsecode-potato/)

Code: [chrisbautista/morsecode-potato](https://github.com/chrisbautista/morsecode-potato)