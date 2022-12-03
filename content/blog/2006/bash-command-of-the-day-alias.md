---
title: Bash Command of the Day – alias
author: chris
type: post
date: 2006-05-29T08:52:00+00:00
draft: true
url: /?p=288
redirect_from: 
  - /2006/05/bash-command-of-the-day-alias/
  - /bash-command-of-the-day-alias/

---
<http://www.ss64.com/bash/alias.html>

*alias

<pre><br />> help alias<br />alias: alias [-p] [name[=value] ... ]<br />    `alias' with no arguments or with the <br />    -p option prints the list of aliases in <br />    the form alias NAME=VALUE on standard <br />    output.<br />    Otherwise, an alias is defined for each <br />    NAME whose VALUE is given. A trailing space <br />    in VALUE causes the next word to be checked for<br />    alias substitution when the alias is expanded.  <br />    Alias returns true unless a NAME is given for <br />    which no alias has been defined.<br /></pre>

In non &#8211; technical terms, alias command can create a <span style="font-style:italic;">nickname<span style="font-weight:bold;"></span></span> to a line of words indicated by value. The nickname can either be a shorthand or a descriptive name to a series of literals, for example a common command and some parameters. in some platforms aliased commands are called macros.

how I use alias

<span style="font-weight:bold;">> alias ldir=&#8217;ls -la&#8217;</span>  
&#8211; typing ldir will list all files (including hidden ones) in a long listing format.

<span style="font-weight:bold;">> alias gthome=&#8217;cd ~; ldir&#8217;</span>  
&#8211; An example of squeezing multiple commands. Use semi-colon (;) to separate commands.  
&#8211; Running gthome will change the working directory to the current users home directory then lists all the files in long format(ldir).

<span style="font-weight:bold;">> alias tail_log_php=&#8217;tail -f /var/log/php/full&#8217;</span>  
&#8211; If php logging is enabled and log file is specified as /var/log/php/full, then running tail\_log\_php will run tail t0 show the last lines from the file then follow (-f) it. [* more on tail on later posts]

<span style="font-weight:bold;">> alias beginmysql=&#8217;service mysqld start&#8217;</span>  
&#8211; if mysql is installed and binary exists, running beginmyql will start the mysql service

There are so much more ways you can benefit with this shorthand definition command. Btw, all definitions are temporary, when you boot the system again the aliases you thougthfully constructed will go kapoot! 😉 Luckily you can make it permanent, by defining them in .bash_aliases from your home directory. Next time you boot, the &#8216;macros&#8217; will be within your reach again. 😀