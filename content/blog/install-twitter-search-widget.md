---
title: Install Twitter Search Widget
author: chris
type: post
date: 2009-10-19T04:40:00+00:00
redirect_from: 
  - /2009/10/install-twitter-search-widget/
blogger_blog:
  - potatokorner.blogspot.com
  - potatokorner.blogspot.com
  - potatokorner.blogspot.com
blogger_author:
  - Christopher Bautista
  - Christopher Bautista
  - Christopher Bautista
blogger_permalink:
  - /2009/10/twitter-search-widget.html
  - /2009/10/twitter-search-widget.html
  - /2009/10/twitter-search-widget.html
blogger_internal:
  - /feeds/21010737/posts/default/6325991344956883481
  - /feeds/21010737/posts/default/6325991344956883481
  - /feeds/21010737/posts/default/6325991344956883481

---
When I started blogging again last September, I was delighted to get a template with built-in message polling to twitter. I played with it a bit and settled with the look you see at the right. I am not a prolific &#8216;twitterer&#8217;, but I love the whole concept of [micropublishing][1].

<!--more-->

  
Sometimes when I feel lazy but I want something new in potatokorner; I&#8217;d post a tweet, from quotes to funny videos, just to see the widget change(LOL). Great as it is &#8211; it&#8217;s not perfect. What the widget lacks is interactivity. One day, I started planning (with frameworks like [Jquery][2] and [Mootools][3] in mind), to make a custom widget that can access [twitter API][4] with features like searching for a user&#8217;s tweets or scrolling through a [Trending Topic][5] . Also thought adding some nice animation and CSS styles. Luckily, I don&#8217;t have to; the nice peeps from Twitter beat me to the punch and released a widget &#8211; packing almost all the things I wanted. I experimented with this along with some feed scripts from Google a days back ([Updates on Pepeng][6]).

#### What is a Twitter Search Widget!?

The widget&#8217;s concept is to supply the it with a search term (or phrase), like &#8216;potatokorner&#8217; and it will periodically check twitter.com for tweets with the word potatokorner &#8211; but not just tweets by yours truly &#8211; every single tweet which it appears. Unlike a regular search the widget periodically pulls messages from the site(twitter) and displays it in a marquee. Twitter.com describes it,

> &#8220;Displays search results in real time! Ideal for live events, broadcastings, conferences, TV Shows, or even just keeping up with the news.&#8221;

#### Get the widget

Making your widget is easy. Log in to twitter.com. Open the Settings page, then click [&#8220;You can add twitter to your site here&#8221;][7].

<div>
  <a style="margin-left: 1em; margin-right: 1em;" href="http://4.bp.blogspot.com/_BBS5bkzuLXM/Stvr3MiCQ0I/AAAAAAAADK0/PAJxPF4FpjA/s1600-h/potatokorner-twitter-search-widget.PNG"><img src="http://4.bp.blogspot.com/_BBS5bkzuLXM/Stvr3MiCQ0I/AAAAAAAADK0/PAJxPF4FpjA/s320/potatokorner-twitter-search-widget.PNG" alt="" border="0" /></a>
</div>

You are asked where you want to place your widget, click &#8220;My Website&#8221;.

<div>
  <a style="margin-left: 1em; margin-right: 1em;" href="http://3.bp.blogspot.com/_BBS5bkzuLXM/StvssWMQRVI/AAAAAAAADLE/0h7qv6ggYV4/s1600-h/potatokorner-twitter-search-widget-step2.PNG"><img src="http://3.bp.blogspot.com/_BBS5bkzuLXM/StvssWMQRVI/AAAAAAAADLE/0h7qv6ggYV4/s320/potatokorner-twitter-search-widget-step2.PNG" alt="" border="0" /></a>
</div>

Then, you are presented three widgets, choose the &#8220;Search Widget&#8221;.

<div>
  <a style="margin-left: 1em; margin-right: 1em;" href="http://3.bp.blogspot.com/_BBS5bkzuLXM/StvsyHJVE6I/AAAAAAAADLM/tFwZeVyrcxI/s1600-h/potatokorner-twitter-search-widget-step3.PNG"><img src="http://3.bp.blogspot.com/_BBS5bkzuLXM/StvsyHJVE6I/AAAAAAAADLM/tFwZeVyrcxI/s320/potatokorner-twitter-search-widget-step3.PNG" alt="" border="0" /></a>
</div>

Now what you have before you is the heart of the &#8220;search widget&#8221; configuration.

<div>
  <a style="margin-left: 1em; margin-right: 1em;" href="http://1.bp.blogspot.com/_BBS5bkzuLXM/StvtGGtbBOI/AAAAAAAADLU/aaM8noAbmZU/s1600-h/potatokorner-twitter-search-config.PNG"><img src="http://1.bp.blogspot.com/_BBS5bkzuLXM/StvtGGtbBOI/AAAAAAAADLU/aaM8noAbmZU/s320/potatokorner-twitter-search-config.PNG" alt="" border="0" /></a>
</div>

You&#8217;ll learn when you&#8217;ve finally playing with your new widget that it&#8217;s a parsing nightmare when people add tags even if their topics are not related, especially when it&#8217;s a &#8220;trending topic&#8221;. Fortunately, Twitter.com provided quite a collection of filters to narrow down your search. You can limit tweets to a certain vicinity( near:{location}) or screen out certain words ( -{word}), you can even limit them to happy ones ( 🙂 ). See [Advance operators][8] to build your strings. I won&#8217;t touch this much, but I&#8217;ll explain what I&#8217;m going to use.

For our example, I want to add a twitter search widget to find tweets with the word &#8220;party&#8221;, but I only want positive or happy tweets! , thus the smiley, &#8221; 🙂 &#8220;. The smiley is a generic one, but twitter is smart enough to find all the variations (e.g. &#8220;:D&#8221;,&#8221;=)&#8221; etc. ). Now lets test it.

<div>
  <a style="margin-left: 1em; margin-right: 1em;" href="http://3.bp.blogspot.com/_BBS5bkzuLXM/StvtQSnAXbI/AAAAAAAADLc/OW3As3VfJpY/s1600-h/potatokorner-twitter-search-test.PNG"><img src="http://3.bp.blogspot.com/_BBS5bkzuLXM/StvtQSnAXbI/AAAAAAAADLc/OW3As3VfJpY/s320/potatokorner-twitter-search-test.PNG" alt="" border="0" /></a>
</div>

Great! It&#8217;s working. As you can see, there are only a few tweets shown. It gives it an air of history unfolding. If you like it to show all the tweets in history at once, we&#8217;ll move to that later. Now that our search string is tested and working. You have the option of changing the &#8220;Title&#8221; and &#8220;Caption&#8221;. Lets leave the title alone and match our search string to the Caption.

<div>
  <a style="margin-left: 1em; margin-right: 1em;" href="http://4.bp.blogspot.com/_BBS5bkzuLXM/StvtXiBgOxI/AAAAAAAADLk/ObOyPgSCPs0/s1600-h/potatokorner-twitter-search-config-2-1.PNG"><img src="http://4.bp.blogspot.com/_BBS5bkzuLXM/StvtXiBgOxI/AAAAAAAADLk/ObOyPgSCPs0/s320/potatokorner-twitter-search-config-2-1.PNG" alt="" border="0" /></a>
</div>

So far so good, let&#8217;s see how we can configure tweets. Choose preferences. This tab controls how your tweets will look and behave.

<div>
  <a style="margin-left: 1em; margin-right: 1em;" href="http://2.bp.blogspot.com/_BBS5bkzuLXM/Stvt9WNTcpI/AAAAAAAADLs/Nk4bRBgcKTI/s1600-h/potatokorner-twitter-search-config-2.PNG"><img src="http://2.bp.blogspot.com/_BBS5bkzuLXM/Stvt9WNTcpI/AAAAAAAADLs/Nk4bRBgcKTI/s320/potatokorner-twitter-search-config-2.PNG" alt="" border="0" /></a>
</div>

Enable &#8220;Poll New Results?&#8221;, if you want the widget to continue checking the public timeline of relevant tweets to your search. (Default: Checked)

<div>
  <a style="margin-left: 1em; margin-right: 1em;" href="http://3.bp.blogspot.com/_BBS5bkzuLXM/StzbFlGO71I/AAAAAAAADL0/C_W70lovF7o/s1600-h/potatokorner-twitter-search-config-3+-poll.PNG"><img src="http://3.bp.blogspot.com/_BBS5bkzuLXM/StzbFlGO71I/AAAAAAAADL0/C_W70lovF7o/s320/potatokorner-twitter-search-config-3+-poll.PNG" alt="" border="0" /></a>
</div>

Enable &#8220;Enable Scrollbars&#8221;, if you need to be able to review the rest of the resulting tweets without waiting for it to [loop][9]. (Default: Checked)

<div>
  <a style="margin-left: 1em; margin-right: 1em;" href="http://4.bp.blogspot.com/_BBS5bkzuLXM/StzbK9XmG0I/AAAAAAAADL8/mTLPB6ox8dg/s1600-h/potatokorner-twitter-search-config-3+-loop.PNG"><img src="http://4.bp.blogspot.com/_BBS5bkzuLXM/StzbK9XmG0I/AAAAAAAADL8/mTLPB6ox8dg/s320/potatokorner-twitter-search-config-3+-loop.PNG" alt="" border="0" /></a>
</div>

Behavior has two values, its either &#8220;timed interval&#8221; or &#8220;load all tweets.&#8221; Default behavior is timed interval &#8211; tweets are shown one at a time, kind of like a news marquee. When set as timed interval, you have an option to set how much time it takes before showing more results(Interval). You can also set if you want it to repeat the results when all the tweets have been shown(Loop Results).

<div>
  <a style="margin-left: 1em; margin-right: 1em;" href="http://1.bp.blogspot.com/_BBS5bkzuLXM/StzeVgDk71I/AAAAAAAADMU/Ka7ak5kgIig/s1600-h/potatokorner-twitter-search-config-3+-timed.PNG"><img src="http://1.bp.blogspot.com/_BBS5bkzuLXM/StzeVgDk71I/AAAAAAAADMU/Ka7ak5kgIig/s320/potatokorner-twitter-search-config-3+-timed.PNG" alt="" border="0" /></a>
</div>

&#8220;Load all tweets&#8221; on the other hand, set&#8217;s the widget to show all the tweets related to your search &#8211; all in one go. No fancy animation. Kind of boring to me, but someone out there might have a use for it.

<div>
  <a style="margin-left: 1em; margin-right: 1em;" href="http://3.bp.blogspot.com/_BBS5bkzuLXM/Stzedu-uzpI/AAAAAAAADMc/pQH-SJoS6ds/s1600-h/potatokorner-twitter-search-config-3-alltweets.PNG"><img src="http://3.bp.blogspot.com/_BBS5bkzuLXM/Stzedu-uzpI/AAAAAAAADMc/pQH-SJoS6ds/s320/potatokorner-twitter-search-config-3-alltweets.PNG" alt="" border="0" /></a>
</div>

For our example, let&#8217;s leave it as is.

For really large results, you can increase or decrease the number of tweets to show.

<div>
  <a style="margin-left: 1em; margin-right: 1em;" href="http://1.bp.blogspot.com/_BBS5bkzuLXM/StzlVklMMmI/AAAAAAAADMs/x4oFwD1pp8g/s1600-h/potatokorner-twitter-search-config-3+-tweets.PNG"><img src="http://1.bp.blogspot.com/_BBS5bkzuLXM/StzlVklMMmI/AAAAAAAADMs/x4oFwD1pp8g/s320/potatokorner-twitter-search-config-3+-tweets.PNG" alt="" border="0" /></a>
</div>

Finally, you also have control over how your tweets will look like. If you only need the messages without people&#8217;s faces polluting the content area, unset &#8220;Show Avatar&#8221;.

<div>
  <a style="margin-left: 1em; margin-right: 1em;" href="http://3.bp.blogspot.com/_BBS5bkzuLXM/StzlcscW53I/AAAAAAAADM0/tKoKQpfPuZE/s1600-h/potatokorner-twitter-search-config-3-noavatar.PNG"><img src="http://3.bp.blogspot.com/_BBS5bkzuLXM/StzlcscW53I/AAAAAAAADM0/tKoKQpfPuZE/s320/potatokorner-twitter-search-config-3-noavatar.PNG" alt="" border="0" /></a>
</div>

If the time the message was sent doesn&#8217;t interest you, you can remove it by unchecking &#8220;Show Timestamps&#8221;.

<div>
  <a style="margin-left: 1em; margin-right: 1em;" href="http://2.bp.blogspot.com/_BBS5bkzuLXM/StzlidwW-cI/AAAAAAAADM8/E9NC69-DdbA/s1600-h/potatokorner-twitter-search-config-3-notime.PNG"><img src="http://2.bp.blogspot.com/_BBS5bkzuLXM/StzlidwW-cI/AAAAAAAADM8/E9NC69-DdbA/s320/potatokorner-twitter-search-config-3-notime.PNG" alt="" border="0" /></a>
</div>

Finally, if seeing [hashtags][10] so many times is starting to strain your eyes, hide it by unchecking &#8220;Show hashtags&#8221;. I find helpful when my search word is a hashtag.

<div>
  <a style="margin-left: 1em; margin-right: 1em;" href="http://4.bp.blogspot.com/_BBS5bkzuLXM/StzlnQIgVPI/AAAAAAAADNE/rLZSZLA6-l4/s1600-h/potatokorner-twitter-search-config-3-nohashtags.PNG"><img src="http://4.bp.blogspot.com/_BBS5bkzuLXM/StzlnQIgVPI/AAAAAAAADNE/rLZSZLA6-l4/s320/potatokorner-twitter-search-config-3-nohashtags.PNG" alt="" border="0" /></a>
</div>

Now for aesthetics, lets change colors to match my site.

<div>
  <a style="margin-left: 1em; margin-right: 1em;" href="http://1.bp.blogspot.com/_BBS5bkzuLXM/StzelmVUs3I/AAAAAAAADMk/80RqxBQMEzg/s1600-h/potatokorner-twitter-search-config-4.PNG"><img src="http://1.bp.blogspot.com/_BBS5bkzuLXM/StzelmVUs3I/AAAAAAAADMk/80RqxBQMEzg/s320/potatokorner-twitter-search-config-4.PNG" alt="" border="0" /></a>
</div>

I&#8217;ll leave the dimensions as is. Unfortunately, you can not test the numbers you have set for the widget. You just have to see how it looks in your page &#8211; and decide if you need to adjust. Note you can let the widget grow into the container you want to place it, or if you&#8217;re just not sure how to adjust it to fit your site &#8211; you can try setting &#8220;auto-width&#8221;.

<div>
  <a style="margin-left: 1em; margin-right: 1em;" href="http://2.bp.blogspot.com/_BBS5bkzuLXM/StzlugcxuiI/AAAAAAAADNM/Qe2LsIwoGfw/s1600-h/potatokorner-twitter-search-config-5.PNG"><img src="http://2.bp.blogspot.com/_BBS5bkzuLXM/StzlugcxuiI/AAAAAAAADNM/Qe2LsIwoGfw/s320/potatokorner-twitter-search-config-5.PNG" alt="" border="0" /></a>
</div>

I&#8217;m happy with the results, click &#8220;Finish and Grab Code&#8221; button to get the code. See our results below.

<div>
  <a style="margin-left: 1em; margin-right: 1em;" href="http://2.bp.blogspot.com/_BBS5bkzuLXM/Stzmzg7JsII/AAAAAAAADNU/4MuMeU_2viE/s1600-h/potatokorner-twitter-search-config-getcode.PNG"><img src="http://2.bp.blogspot.com/_BBS5bkzuLXM/Stzmzg7JsII/AAAAAAAADNU/4MuMeU_2viE/s320/potatokorner-twitter-search-config-getcode.PNG" alt="" border="0" /></a>
</div>

Simply insert the code into your page&#8217;s html and you&#8217;re done. see results here

There you have it, shown you how to get the widget. Now go play with your new toy! If you have a problem installing, just leave a comment or email me at <a href="http://scr.im/chrisbautista" target="_blank">http://scr.im/chrisbautista</a>.

#### Some closing tips

1) If you&#8217;re using a fluid-width layout, you might find auto-width useful.  
2) Use the minus operator(-) plus word (you want to leave out) in the search parameter to narrow your search.  
3) If you&#8217;ll remove the scrollbar, enable &#8220;Loop results&#8221; so you&#8217;ll be able to see all the results.  
4) I found the optimum interval for showing tweets is 5 secs, but of course it depends on what you intend to use it for.  
5) Sometimes, you can clean your results by showing hashtags and filtering unwanted tags out with minus(-).  
6) Enable scrollbars if you chose to load all results.

 [1]: http://en.wikipedia.org/wiki/Micropublishing
 [2]: http://jquery.com/
 [3]: http://mootools.net/
 [4]: http://apiwiki.twitter.com/
 [5]: https://twitter.com/twitter101/learning
 [6]: http://potatokorner.blogspot.com/2009/10/updates-on-pepeng.html#main
 [7]: http://twitter.com/goodies/widgets
 [8]: http://search.twitter.com/operators
 [9]: http://www.blogger.com/post-edit.g?blogID=21010737&postID=6325991344956883481#twitter-loop
 [10]: http://twitter.pbworks.com/Hashtags