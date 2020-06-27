---
path: "/works/2015/03/boxerjs/"
date: "2015-03-02T23:06:34Z"
title: "BoxerJS"
categories: [project, works]
tags: [javascript, jquery, extension]
excerpt: "Lightweight jQuery Plugin to transform links containing images into quick previews.See project page..."
featured_image: /boxerjs_codespud.png
contentType: works
---

> Lightweight jQuery Plugin to transform links containing images into quick previews.

See project page for examples.

**Install**

1. Download files.
2. Copy boxer.js, boxer.css, and close.png into your project
3. Include boxer.js and boxer.css
4. Enclose target anchors in a container e.g.

```js
<div class="boxer">
  <a href="picture1.png" title="this is a picture">
    <img src="picture1_thumb.jpg" />
  </a>
    
  <a href="picture2.png" title="this is another picture">
    <img src="picture2_thumb.jpg" />
  </a>
</div>
```

5. Run code `$(".boxer").boxer();`

**Supports**

- images
- html snippet via AJAX

**Roadmap**

- Easing
- Better AJAX support
- Presentation Mode
- JSON Processing

**Download Links**

[https://github.com/chrisbautista/boxerjs](https://github.com/chrisbautista/boxerjs "Boxer JS Jquery plugin github repository")
