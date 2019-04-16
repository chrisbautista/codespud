---
title: Making your AJAX Content SEO Friendly
author: chris
type: post
date: 2016-08-25T21:45:43+00:00
url: /2016/08/experiments-ajax-test/
featured_image :  /assets/2016/08/AJAX_logo_by_gengns.svg_.png
draft: true

---
This is an experiment to see if search engines are crawling **AJAX** sites and find better ways of keeping them SEO friendly.

AJAX or Asynchronous Javascript and XML is a technology born of a need to have better user experience. Before we were used to browsing link after link through a site. Sometimes those pages change so little on the page that it becomes tedious to having to go through the strokes of waiting for the page and all it&#8217;s images render.  
<!--more-->

In comes AJAX, the technique works by requesting the contents of a URL passed via an API call(XMLHTTPRequest) using Javascript. When that URL returns with its contents, the browser does not reload the whole page. Instead, the calling function/scripting decides what to do with it.AJAX can be loading a snippet into a block on the page or filling out a table with a schedule of data returned from an API call. It could be many things but we can agree that AJAX made interacting with the internet more &#8220;user-friendly&#8221;.

For websites, search engine optimization(SEO) is king. Without it, your websites would just be a folder of files and images without anyone to find it. Search engines make our site visible and it&#8217;s &#8220;findability&#8221; ranking is decided by some standards that must be met. In the beginning, you just need your description and keywords to have the right stuff in them to rank. Now search engines have made it their business to point out that it&#8217;s more and content is one of them.

So why did I bring up the topic of SEO, because getting your content after the page has loaded is an SEO problem? For the longest time, search engines like Google do not render Javascript enabled sites that well. So in 2009, Google [proposed a scheme to help AJAX heavy sites][1] get their content crawled. Web developers around the world were ecstatic! Brought on a slur of blog posts, leveraging their newfound power over search engines but it didn&#8217;t last. In 2015 they(Google) [deprecated their crawling framework][2] and announced that their crawlers can read AJAX and JavaScript-heavy sites just as modern browsers do. So there&#8217;s practically no need to add the effort of making sure your AJAX content has an escaped fragment etc.

To see whether this is true, I&#8217;ve devised a simple experiment. Below is a few sections where the content is loaded from AJAX calls, the objective is to publish this pages and see how well, if ever, Google can index the content on this page.

{% raw %}
<div class="test-area-wrapper">
  <h2>
    CodeSpud AJAX Experiments
  </h2>
  
  <p>
    This section is loaded via AJAX. First section is an HTML snippet where I pull the article block into the page. Second section is generated markup based on extracted JSON data.
  </p>
  
  <div class="test-area">
    <div id="load-snippet-html" class="sectioned">
    </div>
    
    <div id="load-json" class="sectioned">
    </div>
    
    <div id="load-links">
    </div></p>
  </div></p>
</div>
<script>

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'http://www.codespud.com/experiments/ajax/snippet.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

function init() {
 loadJSON(function(response) {
    var actual_JSON = JSON.parse(response);
    console.log(response)
 });
}

</script>
{% endraw %}


I will follow up with the results of my experiment in another post. If you have any ideas on how I can improve this experiment or additional items I need to consider, please post your comments below.

Special thanks to [Genesis for the amazing AJAX logo][3] I used for this post.

 [1]: https://webmasters.googleblog.com/2009/10/proposal-for-making-ajax-crawlable.html
 [2]: https://webmasters.googleblog.com/2015/10/deprecating-our-ajax-crawling-scheme.html
 [3]: https://commons.wikimedia.org/wiki/File:AJAX_logo_by_gengns.svg