---
path: "/works/2015/03/boxerjs/"
date: "2015-03-02T23:06:34Z"
title: "BoxerJS"
categories: [project, works]
tags: [javascript, jquery, extension]
excerpt: "A lightweight jQuery plugin that turns links to images into quick inline previews."
featured_image: /boxerjs_codespud.png
contentType: works
draft: false
---

> A lightweight jQuery plugin that turns links to images into quick inline previews.

BoxerJS wraps image links so they open as fast previews instead of full page loads. It supports images and HTML snippets loaded over AJAX. See the demo for live examples.

**Install**

1. Download the files.
2. Copy `boxer.js`, `boxer.css`, and `close.png` into your project.
3. Include `boxer.js` and `boxer.css`.
4. Wrap your target anchors in a container:

   ```html
   <div class="boxer">
     <a href="picture1.png" title="this is a picture">
       <img src="picture1_thumb.jpg" />
     </a>
     <a href="picture2.png" title="this is another picture">
       <img src="picture2_thumb.jpg" />
     </a>
   </div>
   ```

5. Initialize it: `$(".boxer").boxer();`

**Role**

Sole author. I designed and built the plugin, its preview/overlay behavior, and the AJAX snippet support.

**Links**

- [Source on GitHub](https://github.com/chrisbautista/boxerjs)
- [Live demo](https://chrisbautista.github.io/boxerjs/)
