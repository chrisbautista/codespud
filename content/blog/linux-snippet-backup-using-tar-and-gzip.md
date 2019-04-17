---
title: "Linux: Snippet – Backup using Tar and gzip"
author: chris
type: post
date: 2008-12-07T08:51:00+00:00
redirect_from:
  - /2008/12/linux-snippet-backup-using-tar-and-gzip/
featured_image: linux-logo.jpg
---

As a programmer i have to make multiple revisions of a project on a remote site. Getting things wrong and messing up the files tend to happen more often than I am comfortable with. Fortunately, making quick backups in linux is a breeze. You can either make a folder and just copy your existing files via recursive <a href="http://www.blogger.com/post-edit.g?blogID=21010737&postID=4758938169519074006">cp</a>command or; archive it using tar and gzip. Personally, I prefer archives since they tend to be smaller and easy to manage. <!--more-->

 <div>
<span style="font-weight: bold;"><span ><span>Install tar and gzip</span></span></span>
</div>
  
 <div>
<span ><span> You can be hardcore and download the source for tar and gzip and recompile them.</span></span>
</div>
  
 <div>
<span style="font-size: 13px;"> </span>
</div>
  
 <div>
<a href="http://www.gnu.org/software/tar"><span>http://www.gnu.org/software/tar/</span></a>
</div>
  
 <div>
<a href="http://www.gzip.org/"><span>http://www.gzip.org/</span></a>
</div>
  
 
  
 <div>
<span> Or you can use apt-get or yum(Yellow dog Updater, Modified ? &#8212; weird name ) to do it for you.</span>
</div>
  
 
  
 <div>
<span> yum install tar</span>
</div>
  
 <div>
<span> yum install gzip</span>
</div>
  
 
  
 <div>
<span style="font-weight: bold;">Sample commands</span>
</div>
  
 
  
 <div>
<span style="font-weight: bold;">Archive a folder ( -c means create )</span>
</div>
  
 <pre><span style="color: #009900;">tar cvf - folder | gzip &gt; archive.tar.gz</span></pre>
  
 <div>
<span style="font-family: 'courier new';">Archive a file</span>
</div>
  
 <pre><span style="font-style: italic;"><span style="color: #009900;">tar cvf - filename | gzip &gt; archive.tar.gz</span></pre>
  
 <div>
<span style="font-weight: bold;">Archive files</span></span></span>
</div>
  
 <pre><span style="font-style: italic;"><span style="color: #009900;">tar cvf - filename1 filename2 | gzip &gt; archive.tar.g</span></pre>
  
 <div>
<span style="font-weight: bold;">Alternative format (-z means use gzip to compress)</span></span></span>
</div>
  
 <pre><span style="font-style: italic;"><span style="color: #009900;">tar cvzf /path/to/dir/archive.tar.gz filename</span></pre>
  
 <pre><span style="font-style: italic;"><span style="color: #009900;">tar cvzf /path/to/dir/archive.tar.gz filename1 filename</span></pre>
  
 <div>
<span style="font-weight: bold;">Extracting (-x means extract )</span></span></span>
</div>
  
 <pre><span style="font-style: italic;"><span style="color: #009900;">tar xvzf /path/to/dir/archive.tar.gz</span></pre>
  
 
  
 <div>
<span> There are other ways and tools to make your archives. But we&#8217;ll continue with that some other time. For the really lazy, I&#8217;ll make a bash script that uses tar and gzip in a later post so watch for that.</span></span>
</div>
  
 
  
 <div>
<span ><span> I hope my article helped some newbies out there. Mabuhay!</span></span>
</div>
