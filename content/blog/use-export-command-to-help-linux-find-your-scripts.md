---
title: Use Export Command To Help Linux Find Your Scripts
author: chris
type: post
date: 2009-09-25T03:37:00+00:00
redirect_from:
  - /2009/09/use-export-command-to-help-linux-find-your-scripts/
---

You compiled and installed a linux binary or made a nifty script but you don&#8217;t want to mess the server bin tree. So you placed it in an isolated folder like so:

<!--more-->

###### Level: Beginner, Intermediate

<div style="margin-left: 1em; margin-right: 1em; text-align: center;">
  <img src="//1.bp.blogspot.com/_BBS5bkzuLXM/Srw5tM3OeRI/AAAAAAAACjE/qLCjLDvRLHo/s200/punk+penguin.png" /><br />Yeah your a rockstar!
</div>

```bash
  /usr/local/myscripts/really/great/work/bin/myutility
```

You go on with business as usual. But soon you got tired of typing the whole path or changing folders every time you need the app. You could simplify your life by making a symbolic link(shortcut) or a wrapper script and place it on a more convenient path like /bin or /usr/bin. But you realize that would be defeating your original intent. what do you do? <!--more-->

<a name='more'></a>  
Simple. Do what experts do. Use &#8220;export&#8221; to modify the PATH environment variable.

<div>
  > help export </p> 
  
  <p>
    export: export [-nf] [name[=value] &#8230;] or export -p <br />NAMEs are marked for automatic export to the environment of subsequently executed commands. If the -f option is given, the NAMEs refer to functions. If no NAMEs are given, or if `-p&#8217; is given, a list of all names that are exported in this shell is printed. An argument of `-n&#8217; says to remove the export property from subsequent NAMEs. An argument of `&#8211;&#8216; disables further option processing.</div> 
    
    <p>
      To get an idea, try this command on the console:
    </p>
    
    <div>
      > echo $PATH</p> 
      
      <p>
        /usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin</div> 
        
        <p>
        </p>
        
        <p>
          The above value is a typical &#8220;root&#8221; PATH for a fresh text-only CentOS installation &#8211; so don&#8217;t fret if you got something different. This will grow in time the more you install applications. Anyway, back to business, now you want to add your &#8220;incredible&#8221; scripts. Run the ff:
        </p>
        
        <div>
          > export PATH=$PATH:/usr/local/myscripts/really/great/work/bin
        </div>
        
        <p>
          Done, now see if Linux can find your script or binary.
        </p>
        
        <div>
          > which myutility</p> 
          
          <p>
            /usr/local/myscripts/really/great/work/bin/myutility</div> 
            
            <p>
              Success! Now test your script.
            </p>
            
            <div>
              > myutility
            </div>
            
            <p>
            </p>
            
            <blockquote>
              <p>
                If your script throws an error, you may need to work on it. It may be using hard coded relative paths. Sometimes using absolute paths can do the trick.
              </p>
            </blockquote>
            
            <p>
              Yahoo! It works! Now lets take it a bit further, lets configure your system so you don&#8217;t need to keep typing the export-PATH command. Open the ~/.bash_profile file in your favorite text editor.
            </p>
            
            <div>
              > vi ~/.bash_profile</p> 
              
              <p>
                # .bash_profile
              </p>
              
              <p>
                # Get the aliases and functions<br />if [ -f ~/.bashrc ]; then<br />. ~/.bashrc<br />fi
              </p>
              
              <p>
                # User specific environment and startup programs
              </p>
              
              <p>
                PATH=$PATH:$HOME/bin
              </p>
              
              <p>
                export PATH<br />unset USERNAME</div> 
                
                <p>
                </p>
                
                <blockquote>
                  <p>
                    Note the tilde(~) symbol, this is just shorthand for your home folder. Lets say your username is iamgenius, that should translate to /home/iamgenius/.bash_profile
                  </p>
                </blockquote>
                
                <p>
                  Same as what you did earlier, append your script folder to the PATH construct, as shown below
                </p>
                
                <div>
                  PATH=$PATH:$HOME/bin:/usr/local/myscripts/really/great/work/bin
                </div>
                
                <p>
                  Now your done, the next time you login, the new &#8220;PATH&#8221; should kick in.
                </p>
                
                <p>
                  Congratulations! Now go play with your scripts!
                </p>
                
                <p>
                  <a href="//dl.getdropbox.com/u/1510515/potatokorner/potatokorner-tutorial-export-command.pdf" target="_blank">Download a PDF copy</a>
                </p>
