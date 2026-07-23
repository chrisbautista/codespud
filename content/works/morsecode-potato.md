---
path: "/works/morsecode-potato/"
date: "2018-08-28T19:21:31Z"
title: "Morsecode-Potato"
categories: [project, works]
tags: [reactjs, tailwind]
excerpt: "A React experiment that packages Morse code translation and playback into reusable hooks, with a telegraph-themed demo app."
contentType: works
featured_image: /morsecode-potato-header.png
draft: false
---

Morsecode-Potato is an experiment in packaging functionality into reusable React hooks. It translates text to Morse code and plays it back as sound, light, or both.

**Role**

Sole author. I built the hooks and the demo app:

- `useMorse` — translates text to international Morse code (ITU-R M.1677-1) and returns a Morse string.
- `useMorsePlayer` — plays a Morse string as audio, as a silent visual signal, or both in sync. One clock drives everything, so sound and light can't drift.
- Demo page — a Tailwind-styled React app themed after an old-time telegraph station, with an input text area, playback controls, and an abbreviation reference table.

<figure>
<img src="/morsecode-potato-app.png" width="50%" alt="Morsecode-Potato demo page in light theme" />
<figcaption>Demo page in light theme</figcaption>
</figure>

<figure>
<img src="/morsecode-potato-dark.png" width="50%" alt="Morsecode-Potato demo page in dark theme" />
<figcaption>Demo page in dark theme</figcaption>
</figure>

**Links**

- [Live demo](https://chrisbautista.github.io/morsecode-potato/?202607)
- [Source on GitHub](https://github.com/chrisbautista/morsecode-potato)
