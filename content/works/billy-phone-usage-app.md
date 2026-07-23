---
path: "/works/2010/05/billy-phone-usage-app/"
date: "2010-05-11T19:15:18Z"
title: "Billy: Phone Usage Tracker"
categories: [project, works]
tags: [cordova, jquery-mobile, javascript, android]
excerpt: "A proof-of-concept Android app that tracks mobile usage and estimates your bill from your phone's own call, SMS, and data logs."
contentType: works
featured_image: /billy_mobile_usage_app.png
draft: false
---

> Billy barks so your phone bills don't bite. Track your mobile usage and know what you owe before the bill arrives.

Billy reads your phone's own logs for SMS, talk minutes, and data, then estimates your costs against preset rates you can customize. You can also set reminders for when to check in. All calculations run offline, so you don't need a data connection to see where you stand. This proof-of-concept was built for a client and targets postpaid users in the Philippines (Globe, Smart, Sun).

**Role**

I built Billy in Cordova (formerly PhoneGap) and jQuery Mobile on Android. Beyond the interface, I wrote the middleware that collects usage data — call duration, contact numbers, and time of day — and cached provider details (plan name, cost per SMS, cost per minute) pulled from a service-provider API so the cost calculations could run entirely offline. I also built the reporting view: a simple graph of daily plan cost.

**Links**

- The Google Play listing is no longer available (app defunct).
