---
title: Create WordPress Endpoints
author: chris
type: post
date: 2016-01-13T00:15:12+00:00
draft: true
url: /?p=450
redirect_from: 
  - /create-wordpress-endpoints/

---
I was building a wordpress plugin for use with Rand Group&#8217;s website and other clients. One of the features of this plugin is to provide a slug for displaying resources built from Download Monitor( shown below )

`<br />
/[content-type]/[download-slug]</p>
<p>e.g.</p>
<p>/brochure/7-mistakes-in-software-integration</p>
<p>// this should be interpreted by wordpress like</p>
<p>/?brochure=7-mistakes-in-software-integration<br />
` 

WordPress provides functions to do this pretty easily. I list this steps below

  1. Identify your endpoints
  2. Add your endpoint
  3. Register a function to add query variables
  4. Provide a handler