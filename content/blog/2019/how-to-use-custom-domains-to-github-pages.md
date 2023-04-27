---
title: How to Use Custom Domains with Github Pages
author: Chris
type: post
date: 2019-04-22T14:20:00+00:00
featured_image: /godaddy-domain-admin_1.png
tags: [ website, blogging ]
redirect_from: 
    - /how-to-use-custom-domains-to-github-pages/
    - /2019/04/how-to-use-custom-domains-to-github-pages/

---

Hosting a project wiki or a personal blog on Github is very easy with github-pages and static site generators like Jekyll.  You will end up with a site hosted on `<Project/Repository Name>.github.io`, if you're happy with that then skip the rest of this article. If you want more or just curious about the steps then keep reading. <!--more-->

## What you'll need

- Domain hosting 
- Github hosted static site (gh-pages branch)

## Steps 

1. Setup your domain hosting

    As an example, I am using Godaddy's admin panel. Your mileage might be different but most domain providers will have similar tools for you to use. 

    ![alt text][1]

    1. Add a __A__ entry to __185.199.108.153__ with the following details. 

        - Host: @
        - Points to: 185.199.109.153
        - TTL: 600 seconds

    ![alt text][2]

    2. Do the same for **185.199.109.153**, **185.199.110.153** and **185.199.111.153**.
    3. Add a CNAME with the following details:

        - Host: www
        - Points to: -----.github.io
        - TTL: 1 hour

    4. Save your settings.

    > Update: It seems Godaddy has upgraded their interface you need to add those entries and the settings are automatically saved for you. 


2. <a name="setup-gh">Setup Github Pages</a>

    1. Switch to your gh-pages branch and create a text file with your domain (e.g.  www.codespud.com)Save it in the root of your static site.  

    ![alt text][3]

    1. Navigate to __Settings > Options > GitHub Pages__

    ![alt text][4]

    1. Point branch to __gh-pages branch__
    2. Fill in your domain. In my case, it's _www.codespud.com_.
    3. Enable __'Enforce HTTPS'__, if the option is enabled. Sometimes it will indicate you need to wait for 24 hours. Just check again later and enable it if you're allowed to. If you have a different issue checkout [Github article](https://help.github.com/en/articles/troubleshooting-custom-domains) on troubleshooting custom domains. 

---

<!--ad-->

### NPM package

If you're familiar with npm, you can use [gh-pages cli](https://www.npmjs.com/package/gh-pages-cli) to setup this for you. 

```bash
npm i -g gh-pages
```

Before you can deploy to gh-pages. Remember to create the CNAME text file I mentioned earlier in step 1 of [Setup Github Pages](#setup-gh).

Point it to your static site code, e.g. (_dist_ folder)

```bash
gh-pages -d dist 
```

This will set up your Github pages with the content of your _dist_ folder and point it to whatever domain you specified in CNAME. 

## Conclusion

If everything went well. You should have your Github hosted site using your shiny new custom domain. :)




[1]: /godaddy-domain-admin_1.png "Godaddy domain admin panel"
[2]: /godaddy-domain-manager.png "Godaddy domain manager"
[3]: /godaddy-cname-file.png "Github pages CNAME file"
[4]: /godaddy-github-pages.png "Github pages settings"




