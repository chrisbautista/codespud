---
title: Make Your Bash Prompt Work For You
author: chris
type: post
date: 2016-11-14T04:08:17+00:00
redirect_from:
  - /2016/11/make-bash-prompt-work/
featured_image: /assets/2016/11/mybashpromot_in_action.png
---

If you work with Linux or Unix-like operating systems like Ubuntu or the MacOS, you might be familiar with Bourne-Again Shell or [BASH][1] for short. This article will show you that with a little elbow grease, you can have your BASH prompt work for you and heck maybe have a little fun with it.

<!--more-->

People tell me the invention of the GUI (graphical user interface) is the best thing that ever happened to modern computing. I beg to differ. Not all work is accomplished through the GUI nor is it efficient.

I find myself working on the command line for work more and more &#8212; managing my servers even my Apple computer. So I get to spend much of my time on the command line. Launching commands like a stenographer recording the latest court drama. I realized very early how powerful the command line could be.

But not having a GUI does not mean you should be happy with the default command prompt. Is this familiar?<figure>

<img src="/assets/2016/11/boring.png" alt="boring" width="512" height="224" class="alignnone size-full wp-image-544" srcset="/assets/2016/11/boring.png 512w, /assets/2016/11/boring-300x131.png 300w" sizes="(max-width: 512px) 100vw, 512px" /> <figcaption>Boring command prompt!</figcaption></figure>

Using the table below we can build a BASH prompt that is not only pretty but saves us a few keystrokes as well.

## BASH Special Characters Reference

<table >
  <tr>
    <th>
      Special character
    </th>
    
    <th align="left">
      Description
    </th>
    
    <th>
      Special character
    </th>
    
    <th align="left">
      Description
    </th>
  </tr>
  
  <tr>
    <td align="center">
      \a
    </td>
    
    <td>
      an ASCII bell character (07)
    </td>
    
    <td align="center">
      \d
    </td>
    
    <td>
      the date in &#8220;Weekday Month Date&#8221; format (e.g., &#8220;Tue May 26&#8221;)
    </td>
  </tr>
  
  <tr>
    <td align="center">
      \]
    </td>
    
    <td>
      end a sequence of non-printing characters
    </td>
    
    <td align="center">
      \e
    </td>
    
    <td>
      an ASCII escape character (033)
    </td>
  </tr>
  
  <tr>
    <td align="center">
      \h
    </td>
    
    <td>
      the hostname up to the first `.&#8217;
    </td>
    
    <td align="center">
      \H
    </td>
    
    <td>
      the hostname
    </td>
  </tr>
  
  <tr>
    <td align="center">
      \j
    </td>
    
    <td>
      the number of jobs currently managed by the shell
    </td>
    
    <td align="center">
      \l
    </td>
    
    <td>
      the basename of the shell&#8217;s terminal device name
    </td>
  </tr>
  
  <tr>
    <td align="center">
      \n
    </td>
    
    <td>
      newline
    </td>
    
    <td align="center">
      \r
    </td>
    
    <td>
      carriage return
    </td>
  </tr>
  
  <tr>
    <td align="center">
      \s
    </td>
    
    <td>
      the name of the shell, the basename of $0 (the portion following the final slash)
    </td>
    
    <td align="center">
      \t
    </td>
    
    <td>
      the current time in 24-hour HH:MM:SS format
    </td>
  </tr>
  
  <tr>
    <td align="center">
      \T
    </td>
    
    <td>
      the current time in 12-hour HH:MM:SS format
    </td>
    
    <td align="center">
      \@
    </td>
    
    <td>
      the current time in 12-hour am/pm format
    </td>
  </tr>
  
  <tr>
    <td align="center">
      \A
    </td>
    
    <td>
      the current time in 24-hour HH:MM format
    </td>
    
    <td align="center">
      \u
    </td>
    
    <td>
      the username of the current user
    </td>
  </tr>
  
  <tr>
    <td align="center">
      \v
    </td>
    
    <td>
      the version of bash (e.g., 2.00)
    </td>
    
    <td align="center">
      \V
    </td>
    
    <td>
      the release of bash, version + patchelvel (e.g., 2.00.0)
    </td>
  </tr>
  
  <tr>
    <td align="center">
      \w
    </td>
    
    <td>
      the current working directory
    </td>
    
    <td align="center">
      \W
    </td>
    
    <td>
      the basename of the current working directory
    </td>
  </tr>
  
  <tr>
    <td align="center">
      \!
    </td>
    
    <td>
      the history number of this command
    </td>
    
    <td align="center">
      \#
    </td>
    
    <td>
      the command number of this command
    </td>
  </tr>
  
  <tr>
    <td align="center">
      \$
    </td>
    
    <td>
      if the effective UID is 0, a #, otherwise a $
    </td>
    
    <td align="center">
      \nnn
    </td>
    
    <td>
      the character corresponding to the octal number nnn
    </td>
  </tr>
  
  <tr>
    <td align="center">
      \\
    </td>
    
    <td>
      a backslash
    </td>
    
    <td align="center">
      \[
    </td>
    
    <td>
      begin a sequence of non-printing characters, which could be used to embed a terminal control sequence into the prompt
    </td>
  </tr>
  
  <tr>
    <td align="center">
      \D{format}
    </td>
    
    <td colspan="3">
      the format is passed to strftime(3) and the result is inserted into the prompt string; an empty format results in a locale-specific time representation. The braces are required
    </td>
  </tr>
</table>

## Change the Bash Prompt

The environment variable we want to modify is **PS1**.<figure>

<img src="/assets/2016/11/editPS1.png" alt="editps1" width="376" height="90" class="alignnone size-full wp-image-535" srcset="/assets/2016/11/editPS1.png 376w, /assets/2016/11/editPS1-300x72.png 300w" sizes="(max-width: 376px) 100vw, 376px" /> </figure>

Using the reference table above we can break down the current prompt as

- _\u_ &#8211; the current user
- _\h_ &#8211; the computer&#8217;s hostname
- _\w_ &#8211; the current working directory

Not very useful is it? Let&#8217;s change that.

By modifying the PS1 variable and exporting it with the command below we can manipulate the prompt to output anything we want.<figure>

<img src="/assets/2016/11/bash_prompt_smiley.png" alt="bash_prompt_smiley" width="476" height="131" class="alignnone size-full wp-image-538" srcset="/assets/2016/11/bash_prompt_smiley.png 476w, /assets/2016/11/bash_prompt_smiley-300x83.png 300w" sizes="(max-width: 476px) 100vw, 476px" /> <figcaption>Add a smiley</figcaption></figure>

Below is my favorite bash prompt which I install for all my servers and even my workstation. I can easily see important details like the hostname &#8211; very important if you find yourself managing multiple terminal windows and you can distinguish between windows. This configuration also shows the load averages, the current date and time and the working directory. The color helps to give it contrast to the monotonous black on white default of most terminal windows.<figure>

<img src="/assets/2016/11/mybashpromot_in_action.png" alt="mybashpromot_in_action" width="719" height="370" class="alignnone size-full wp-image-536" srcset="/assets/2016/11/mybashpromot_in_action.png 719w, /assets/2016/11/mybashpromot_in_action-300x154.png 300w" sizes="(max-width: 719px) 100vw, 719px" /> </figure>

## Make it Permanent

To make your BASH prompt permanent, just edit ~/.bash_profile or ~/.bashrc or ~/.profile or run the command<figure>

<img src="/assets/2016/11/make_bashprompt_permanent.png" alt="Make your bash prompt permanent" width="722" height="183" class="alignnone size-full wp-image-541" srcset="/assets/2016/11/make_bashprompt_permanent.png 722w, /assets/2016/11/make_bashprompt_permanent-300x76.png 300w" sizes="(max-width: 722px) 100vw, 722px" />  
</figure>

## Ideas

1. Count the files in the current directory
2. Display in blinking colors the last line of a todo list
3. Display CPU/Memory/Disk usage
4. Display command to pull up a help screen
5. Echo a smiley if the system is working in top condition

There you have it, you can now work on the command line with a little bit more help. The key here is to be creative and think of what you want your bash prompt to have. Enjoy!

[1]: https://www.gnu.org/software/bash/bash.html
