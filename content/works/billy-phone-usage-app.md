---
path: "/works/2014/08/billy-phone-usage-app/"
date: "2012-08-13T19:15:18Z"
title: "Billy: Proof-of-concept"
categories: []
tags: []
excerpt: "Billy barks so your phone bills don't bite. Download Billy for free and start tracking your mobile ..."
contentType: works
featured_image :  /billy_mobile_usage_app.png
---

> Billy barks so your phone bills don't bite. Download Billy for free and start tracking your mobile usage.

Billy uses your phone's own logs for SMS, talk minutes, and data. It then computes costs according to preset rates, which you can customize. You can also tell Billy when you want to be reminded.

For now, this version of Billy is for postpaid users in the Philippines (Globe, Smart, Sun).

This is a proof-of-concept(POC) work requested by a client.

**My role:**

I built Billy in Cordova(formerly Phonegap) and Jquery Mobile on Android. Aside from the user interface, I built out middleware to collect data like call duration, contact numbers and time of day. There is also some offline data like details from the mobile service provider like name of postpaid plan, cost per sms, and cost of call per minute extracted from an API call to a service provider server.  The calculations are done offline so that user does not have to depend on mobile data. I made the report interface as well. The a report is a simple graph showing cost using the phone plan per day. 

**Download:**

 [ANDROID](https://play.google.com/store/apps/details?id=com.lowe.billypostpaid.pak)

**User Interface:**

Jquery Mobile, Cordova, AJAX

**Server:**

PHP, JSON, MySQL

