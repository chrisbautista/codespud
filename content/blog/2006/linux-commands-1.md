---
title: 'Linux Commands #1'
author: chris
type: post
date: 2006-05-28T11:29:00+00:00
draft: true
url: /?p=289
blogger_permalink:
  - /2006/05/linux-commands-1.html
blogger_author:
  - \@codespud
blogger_blog:
  - potatokorner.blogspot.com
blogger_internal:
  - /feeds/21010737/posts/default/2296391083094043883
redirect-from:
  - /2006/05/linux-commands-1/
  - /linux-commands-1/

---
[www.oracle .com articles][1]

According to the linux Howto, below is the basic format for linux commands.

<span style="font-style:italic;">command [option] [source file(s)] [target file]</span>

To get some inline help while on console mode. try any of the ff:

1) <span style="font-weight:bold;">man</span> &#8220;command&#8221;

<pre><br />> man echo <br />ECHO(1)           User Commands                  ECHO(1)<br /><br />NAME<br />       echo - display a line of text<br /><br />SYNOPSIS<br />       echo [OPTION]... [STRING]...<br /><br />DESCRIPTION<br />       NOTE:  your shell may have its own version <br />       of echo which will supercede the version <br />       described here. Please refer to your shells<br />       documentation for details about the options <br />       it supports.<br /><br />       Echo the STRING(s) to standard output.<br /><br />       -n     do not output the trailing newline<br /><br />       -e     enable interpretation of the backslash-<br />              escaped characters listed below<br /><br />       -E     disable interpretation of those sequences <br />              in STRINGs<br /><br />       --help display this help and exit<br />...<br /><br /></pre>

2) <span style="font-weight:bold;">whatis</span> &#8220;command&#8221;

<pre><br />>whatis echo<br /><br />echo                 (1)  - display a line of text<br />echo                 (1p) - write arguments to <br />                             standard output<br />echo [builtins]      (1)  - bash built-in commands, <br />                             see bash(1)<br />echo [curs_inopts]   (3x) - curses input options<br /></pre>

3) <span style="font-weight:bold;">help</span> &#8220;command&#8221;

<pre><br />>help echo<br /><br />echo: echo [-neE] [arg ...]<br />    Output the ARGs.  If -n is specified, the <br />    trailing newline is suppressed.  If the -e <br />    option is given, interpretation of the following <br />    backslash-escaped characters is turned on:<br />        a      alert (bell)<br />        b      backspace<br />        c      suppress trailing newline<br />        E      escape character<br />        f      form feed<br />        n      new line<br />        r      carriage return<br />        t      horizontal tab<br />        v      vertical tab<br />              backslash<br />        num    the character whose ASCII code is <br />                NUM (octal).<br /><br />    You can explicitly turn off the interpretation <br />    of the above characters with the -E option.<br /></pre>

Each command displays different degrees of information regarding the command providing flexibility in mastering the console shell. In the next posts of this series, a &#8220;help&#8221; sheet of the command of the day will be provided. I&#8217;ll also try to provide usage samples.

 [1]: http://www.oracle.com/technology/pub/articles/calish_file_commands.html