---
title: Working with Date and Time Input
author: chris
type: post
date: 2022-12-09 12:07:00+00:00
url: /2022/working_with_date_tag/
redirect_from: 
  - /working_with_date_tag/
featured_image: /blog/nick-hillier-yD5rv8_WzxA-unsplash.jpg
featured_image_attribution: photo by <a href="https://unsplash.com/@nhillier">Nick Hillier</a>
tags: [web-development, html, best-practice, forms]
---

I remember using JqueryUI's datepicker. It was my go-to calendar widget in the past. It was great.  I just drop an input box give it an "id" and then run a function. 

```javascript

$('#datepicker').datepicker();

```

You get a great-looking calendar picker for your forms. It was a great bit of software engineering. I’ve used it in a lot of my old projects and clients were impressed.  <!--more-->

Some experts strongly advise against adding too many third-party libraries to websites. The extra library requests increase the time your site loads. Now that [site speed has grown increasingly important to users](https://www.browserstack.com/guide/why-website-speed-is-important), developers must be smart when deciding on the modules they add to their projects. Resources like javascript files block the browser from rendering until it's fully loaded. 

One less library to load is a few seconds slashed from your site's loading time. Read [Web.dev](https://web.dev/optimizing-content-efficiency-loading-third-party-javascript/) for more information regarding optimizing content loading with regards to third-party javascript.

## Use native elements

One strategy to optimize a website is to use native elements like the date and time inputs instead of third-party widgets. 

Aside from reducing the fat from your site, using native elements improves accessibility. You don’t need the extra coding necessary to make these elements work with assistive technologies.

## Date input

The date input looks pretty much like any regular input element. Some browsers(e.g. Chrome) will have a placeholder corresponding to the date value and a calendar icon button.

```html

<label for="birthdate">Birth date:</label>
<input type="date" id="birthdate" name="birthdate" />

```

<div class="demo">
<label for="birthdate">Birth date:</label>
<input type="date" id="birthdate" name="birthdate" />
</div>


## Month input

The month input lets a user enter a month and year. The input value returned is of format `YYYY-MMM` where `YYYY` is the four-digit year and `MM` is the month number e.g. January is `01`.

```html

<label>
    <span>Month</span>
    <input type="month" >
</label>

```
<div class="demo">
    <label>
        <span>Month</span>
        <input type="month" >
    </label>
</div>

## Week input

Use the `week` input type when you want to accept the week number of a year in your forms. It lets a user set up a picker for the 52/53 weeks out of a year.  

```html

<label>
    <span>Week</span>
    <input type="week" name="week" >
</label>

```
<div class="demo">
<label>
    <span>Week</span>
    <input type="week" name="week" >
</label>
</div>


## Time input

```html

<label>
    <span>Time: </span>
    <input type="time">
</label>

```
<div class="demo">

<label>
        <span>Time: </span>
        <input type="time">
</label>

</div>

## Date-time local input

The `datetime-local` input type provides a way to input both date and time.

```html

<label>
    <span>Date and time - local: </span>
    <input type="datetime-local">
</label>

```
<div class="demo">

<label>
    <span>Date and time - local: </span>
    <input type="datetime-local">
</label>

</div>

<!--ad-->

## Specifying a range

There will be instances where you want to limit the possible values. For example, your form is about a month-long event. You can prevent your clients from setting up a date that is outside your set event by specifying a range. This is done with the minimum(min) and maximum(max) values.

```html

<label for="event">Event date:</label>
<input type="date" id="eventdate" name="eventdate" min="2023-04-01" max="2023-04-30"/>

```
<div class="demo">
<label for="eventdate">Event date:</label>
<input type="date" id="eventdate" name="eventdate" min="2023-04-01" max="2023-04-30"/>
</div>

Another use case is preventing inputting past dates, for example when scheduling airplane flights. Specifying the minimum value to date before today is what you want to do. 

```html

<div>Today is: 2022-12-01</div>

<label for="flightstartdate">Event date:</label>
<input type="date" id="flightstartdate" name="flightstartdate" />

```
<div class="demo">

<label for="flightstartdate">Event date:</label>
<input type="date" id="flightstartdate" name="flightstartdate" min="2023-12-01" />
</div>

Limit the `week` input to a certain year, e.g. selling monthly tickets for a sports season. 

```html

<label>
    <span>Event Month</span>
    <input type="month" min="2022-01" value="2022-12" >
</label>

```
<div class="demo">
    <label>
        <span>Event Month</span>
        <input type="month" min="2022-01" value="2022-12" >
    </label>
</div>

The format for the `min` and `max` setup for the `week` input type is "year-week number" e.g. `2023-W01` for the first week of 2023.

```html

<label>
    <span>Week</span>
    <input type="week" name="week" min="2023-W01" max="2023-W52">
</label>

```
<div class="demo">
<label>
    <span>Week</span>
    <input type="week" name="week" min="2023-W01" max="2023-W52">
</label>
</div>

## Adding Suggestions

Using [datalist](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist) element we can add hardcoded values as options to a date input. A great use case for this is suggested dates for restaurant reservations in the current week.

### Date input with datalist

```html

<div>
    <label>
    <span>Recommended dates: </span>
    <input type="date" list="recent-dates">
    <datalist id="recent-dates">
        <option value="2022-01-01">
        <option value="2022-02-14">
        <option value="2022-05-01">
    </datalist>
    </label>
</div>


```
<div class="demo">

<div>
    <label>
    <span>Recommended dates: </span>
    <input type="date" list="recent-dates">
    <datalist id="recent-dates">
        <option value="2022-01-01">
        <option value="2022-02-14">
        <option value="2022-05-01">
    </datalist>
    </label>
</div>

</div>



### Time input with datalist

```html

<label>
    <span>Popular hours: </span>
    <input type="time" list="popularHours">
    <datalist id="popularHours">
    <option value="12:00">
    <option value="13:00">
    <option value="14:00">
    </datalist>
</label>

```
<div class="demo">

<label>
    <span>Popular hours: </span>
    <input type="time" list="popularHours">
    <datalist id="popularHours">
    <option value="12:00">
    <option value="13:00">
    <option value="14:00">
    </datalist>
</label>

</div>

## Wrapping up

Support is [limited but getting better](https://caniuse.com/input-datetime). Most modern browsers support these input types. Do be wary and check your audience. I still had clients who stuck with IE until IE11 was decommissioned. For old browsers, the input type will default to a regular input text box. Make sure to provide a fallback in those cases. 

I am glad we have native options for something ubiquitous as requiring a date/time input. Try using these new input types in your next project. 
