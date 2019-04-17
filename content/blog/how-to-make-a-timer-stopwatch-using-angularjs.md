---
title: How To Make A Timer/Stopwatch Using AngularJS
author: chris
type: post
date: 2014-09-28T18:09:50+00:00
redirect_from: 
  - /2014/09/how-to-make-a-timer-stopwatch-using-angularjs/
featured_image: /assets/2014/09/angular-featured.png

---
I&#8217;ve got some leeway pushing <a title="Khrunus" href="https://github.com/chrisbautista/Khrunus" target="_blank">Khrunus</a> off the ground.  I&#8217;ve always been successful using JavaScript&#8217;s timing functions but since Khrunus would primarily be built-in in AngularJS. I have to research a way to reuse my timing snippets into proper Angular code.  To study, I built a simple angular app:<!--more--> 

## Problem

How to use AngularJS to make a time related app, in this case a timer for logging elapsed time?

## What I need

Before I started this little venture, I need to detail the parameters of the experiment.

Firstly,  I need to layout my application in two sections. The top section will show a digital clock face and a button to toggle(start or stop) the clock. The bottom section will be a table showing start and end times, as well as the total duration. To know that the application is successful, start and end times should be logged. Using those values I can compute for the duration.

We have two modes; an idle state,&#8221;stopped&#8221; and an active mode,&#8221;started&#8221;. We need to consider that when coding the helper functions.

## Solution

Firstly, we start with a basic AngularJS template. Please note I am assuming you have at least some experience working with HTML, Javascript and AngularJS.



I need two sections so I make two main DIVs.



Next in DIV 1,  we add another div to serve as the container for the timer digits and a button.



Next in DIV #2, we format a table with a header and three columns; &#8220;Start&#8221;, &#8220;End&#8221; and &#8220;Duration(secs)&#8221; correspondingly.

What we have now is not very pretty, we&#8217;re going to fix that in a bit. Create a CSS file, call it &#8220;app.css&#8221;. Let&#8217;s style everything as follows,

Looking good! 🙂  Now to add the functionality we need. Let&#8217;s start with some data binding and a basic controller.

#### HTML



### Javascript



Awesome! For the button, we&#8217;re going to use that as a trigger to toggle between modes as well as an indicator to show the user what&#8217;s happening.

Now, we can switch between modes, using the button data {{mode}} as a toggle flag. Now to the meat of the application, as a reference I&#8217;m going to use this basic clock code I use when I need digital clock displays.

The hero of this application is AngularJS&#8217;s <a title="$timeout service" href="https://docs.angularjs.org/api/ng/service/$timeout" target="_blank">$timeout service</a>. The $timeout service gives the user a wrapper for window.setTimeOut. So it still acts like setTimeOut but with the code organization and excellent exception handling that AngularJS provides. Our code should follow this format

We build the clock functionality via a $timeout statement, but first let&#8217;s refactor our controller and add two functions to handle the Start and Stop modes.

Now for the $timeout service,



You can see that we used the timeout service to recursively call the **StartTimer** function. When you call $timeout, just as window.setTimeOut, you create a timing object that we then save to our variable tmPromise. We&#8217;ll get into more of that later just take a note of it. Since we&#8217;re really making a stopwatch and not a clock that tells the current time, let&#8217;s recode. We need the current time so we use date.getTime(). Adding two more variables timeStart and timeEnd. When we button is clicked, we save the time to **timerStart**. Every time the timeout completes and we call StartTimer, the value of **$scope.timeEnd** changes. We then subtract **$scope.timeStart** to get the current elapsed time in milliseconds. We add some normalization code and we end up with this,



Now for the stopTimer function, issuing the cancel method will stop the $timeout service. Remember the variable we made earlier, tmPromise. We will use that as the parameter for our cancel call illustrated below. We then collect the start and end times and push that into the history array.



### Conclusion

Yay, we just made an AngularJS timer widget. Adding a service to insert a line in our table we end up with this.





This is a very simple implementation. One that did not need a unit test but if we wanted to, we can use $timeout.flush() method. More details from the reference links below.

See the app in action <a title="here" href="http://chrisbautista.github.io/experiments/cbTimerDirective/public_html/" target="_blank"><strong>here</strong></a>

> ** UPDATE: I made a directive check it out <a title="here" href="http://chrisbautista.github.io/experiments/cbTimerDirective/public_html/" target="_blank"><strong>here</strong></a>

Download all the source <a title="angular js timer experiment zip file" href="http://chrisbautista.github.io/experiments/cbTimer/angularjs_timer_experiment.zip" target="_blank"><strong>here</strong></a>.

## References

  * https://docs.angularjs.org/api/ng/service/$timeout
  * https://docs.angularjs.org/api/ng/filter/date