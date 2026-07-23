---
title: Stop Writing Novels in Your Gallery's Alt Text
author: chris
type: post
date: 2026-07-16 08:29:00+00:00
url: /2026/stop-writing-novels-in-gallery-alt-text/
redirect_from:
  - /stop-writing-novels-in-gallery-alt-text/
tags: [accessibility, web development]
draft: false
---

*How to write alt text for image galleries — and when to reach for captions or long descriptions instead.*

A photography portfolio has forty images. Someone decides each one deserves justice, so every thumbnail gets a 60-word description of light and mood. It feels generous. It's a tax.

A screen reader reads a page top to bottom. The user weighs each item, then decides to skip it or not. So forty rich descriptions become forty small essays the user has to sit through before they reach anything they can act on. Sighted visitors scan the grid in two seconds. The assistive-tech user gets the audiobook. That isn't equal access.

The instinct is a good one. You wanted no one left out. But equal access means equal speed, not extra words.

More is not better. Alt text has rules. Galleries have rules. Long descriptions have a home, and it's rarely the `alt` attribute.

## What an image gallery is, and why we reach for one

An image gallery is a set of related images shown together as a group — a grid of thumbnails, a swipeable carousel, a masonry wall, a lightbox you click into. The point isn't any single picture. It's the collection.

Galleries earn their keep when one image can't carry the load — a photographer shows a body of work, not a headshot, a shop shows a product from six angles, a listing shows every room, a recipe shows each step. The images are the content, and browsing them *is* the task: scan the set, compare a few, open the one that matters.

Hold onto that word: task. A gallery exists so people can move through images and choose. Anything that slows that down — a paragraph of alt text on every thumbnail included — fights the reason you built it.

## What alt text is for

Ask why the image is here, not what it looks like. The [W3C alt decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/) runs the same check: does the image carry meaning the page would lose without it, is it a link or button, or is it decoration? [WCAG 1.1.1](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) asks for a text alternative that serves an *equivalent purpose* — not a transcript of pixels.

That sorts images into roles. Decorative images get an empty alt so assistive tech skips them; the [W3C says so plainly](https://www.w3.org/WAI/tutorials/images/decorative/) — use `alt=""`. A clickable thumbnail is functional, so its alt names the action. An informative image gets one line for the fact it adds.

Keep that line short. WCAG sets no character limit, but NN/g's [guide to writing alt text](https://www.nngroup.com/articles/write-alt-text/) says hold it to about a sentence, put the key words first, and cut the rest. Need a paragraph? The `alt` attribute is the wrong box.

## Why galleries make it worse

A mouse gives random access — you point at the one image you want. A screen reader is sequential. NN/g makes the point in ["Alt Text: Not Always Needed"](https://www.nngroup.com/articles/alt-text-usability/): when alt text is useless for common tasks, "images bring confusion, not clarity." Multiply that by forty and you get a novel no one chose to open.

Most sites err the other way. The [WebAIM Million 2025 report](https://webaim.org/projects/million/2025/) found 18.5% of home-page images had no alt text, and about a third had missing, questionable, or repeated alternatives. So both sins are common: nothing, or far too much. Galleries pull you toward too much.

## Rules for an accessible gallery

A gallery is a structure, not a pile of `<img>` tags. Structure is where most galleries fail.

**Group the images.** The [W3C Groups of Images tutorial](https://www.w3.org/WAI/tutorials/images/groups/) shows the pattern: wrap the set in a `<figure>`, caption the whole group, and give each item its own short alt and caption.

```html
<figure role="group" aria-labelledby="gallery-cap">
  <figcaption id="gallery-cap">Baler, three mornings in the rainy season.</figcaption>

  <figure>
    <img src="day1.jpg" alt="Grey surf under a low, flat sky.">
    <figcaption>Day one. Overcast.</figcaption>
  </figure>

  <figure>
    <img src="day2.jpg" alt="Sun breaking through cloud onto the break.">
    <figcaption>Day two. Clearing.</figcaption>
  </figure>
</figure>
```

The alt stays short and carries the one visual fact. Mood and date live in the visible `<figcaption>`, where everyone reads them.

**Treat clickable thumbnails as controls.** A thumbnail that opens a lightbox is functional, so its alt names the destination — the [W3C's Functional Images guidance](https://www.w3.org/WAI/tutorials/images/functional/) is clear on this. The full image gets the description, because that's what the user is about to open.

```html
<a href="sunrise-full.jpg" class="thumb">
  <img src="sunrise-thumb.jpg" alt="View full image: Sunrise over Baler">
</a>
```

**Make it work without a mouse.** Every thumbnail link must take keyboard focus, the focus ring must stay visible, and a lightbox must trap focus while open, return it on close, and close on `Escape` — the [ARIA dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) spells this out. A lightbox built from non-focusable `<div>`s locks keyboard and screen reader users out.

**Don't repeat yourself.** If the caption already says "Sunrise over Baler," empty the alt. Saying it twice just makes the user hear it twice.

## Alternatives to alt text

The `alt` attribute is one tool. For anything past a sentence, reach for these instead.

### Visible captions

`<figcaption>` is read by assistive tech *and* seen by everyone, yet most teams still default to a hidden `alt`. Let the caption carry the description and it does what an overstuffed `alt` can't: it shows that description to sighted users too. When the caption covers the image, empty the alt. One source of truth.

### Page copy

Often the strongest move is to write the thing in the body. The [W3C Complex Images tutorial](https://www.w3.org/WAI/tutorials/images/complex/) notes that long descriptions also help people with low vision, cognitive differences, and limited subject knowledge — none of whom reach text trapped in an attribute.

### A linked long description

When an image really needs a paragraph — a detailed diagram, an annotated map — give it a short alt that names it, then put the full description on the page and tie the two together with `<figure>`/`<figcaption>`.

### `aria-describedby` for prose

For a plain-text description, link it by `id`:

```html
<img src="peacock.jpg"
     alt="Male peacock head"
     aria-describedby="peacock-desc">
<p id="peacock-desc">
  The male is metallic blue on the crown, with a fan-shaped crest of
  bare-shafted feathers tipped in blue-green. A white stripe sits above
  the eye and a white crescent below it.
</p>
```

One catch the [W3C flags](https://www.w3.org/WAI/tutorials/images/complex/): `aria-describedby` flattens its target into one run of text. Screen readers drop the headings, lists, and tables inside it. Use it for prose, not structured content.

### Skip autopilot AI alt text

Now for AI auto describers - it has its place but think long hard before you reach for it. Auto-describers drop a paragraph on every image — the pile-up this whole post is trying to prevent. They describe pixels, not purpose, and they can't know why you chose the image. Accessibility vendor Silktide reports that in its own testing, [screen reader users can spot AI-written alt text](https://silktide.com/blog/the-downsides-of-ai-alt-text/) — technically accurate and practically useless. Draft with these tools if you must, then edit hard.

## The checklist

Here is a checklist that summarizes what I was trying to say: 

- If image is a decorative filler: Use empty alt `alt=""`.
- For clickable thumbnails, use the alt text to describe action. Opening the image is a better place to describe it. 
- Informative images: one short, front-loaded sentence — or empty alt if a caption already says it.
- If you want to describe is longer than a sentence: move it to a caption, page copy, or a linked description.
- Wrap the set in `<figure>`, caption the group, let each item caption itself.
- [Unplug the mouse](/2026/one-year-of-the-accessibility-act-unplug-your-mouse-and-see-what-breaks/) and tab through. Focus stays visible. The lightbox opens, traps focus, and closes on `Escape`.

Accessibility isn't counted in words written. It's counted in <u>tasks</u> finished. Write less in the alt attribute. Build more into the page.

## Sources

- [An alt Decision Tree — W3C WAI](https://www.w3.org/WAI/tutorials/images/decision-tree/)
- [Groups of Images — W3C WAI](https://www.w3.org/WAI/tutorials/images/groups/)
- [Understanding SC 1.1.1 Non-text Content — W3C WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html)
- [Alt Text: Not Always Needed — Nielsen Norman Group](https://www.nngroup.com/articles/alt-text-usability/)
- [How to Write Good Alt Text — Nielsen Norman Group](https://www.nngroup.com/articles/write-alt-text/)
- [The Downsides of AI Alt Text — Silktide](https://silktide.com/blog/the-downsides-of-ai-alt-text/)
