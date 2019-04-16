---
title: How to Write a Backup Shell Script using Tar and Gnu Zip
author: chris
type: post
date: 2009-01-02T23:20:00+00:00
url: /2009/01/how-to-write-a-backup-shell-script-using-tar-and-gnu-zip/
blogger_author:
  - Christopher Bautista
  - Christopher Bautista
  - Christopher Bautista
blogger_blog:
  - potatokorner.blogspot.com
  - potatokorner.blogspot.com
  - potatokorner.blogspot.com
blogger_internal:
  - /feeds/21010737/posts/default/7420765613261022016
  - /feeds/21010737/posts/default/7420765613261022016
  - /feeds/21010737/posts/default/7420765613261022016
blogger_permalink:
  - /2009/01/script-to-make-tar-gzip-archives-of.html
  - /2009/01/script-to-make-tar-gzip-archives-of.html
  - /2009/01/script-to-make-tar-gzip-archives-of.html

---
<div style="clear: both; text-align: center;">
  <a style="margin-left: 1em; margin-right: 1em;" href="http://2.bp.blogspot.com/_BBS5bkzuLXM/SrIVgPdlW3I/AAAAAAAACfM/Ni40JEFfA-I/s1600-h/linux-logo.jpg"><img src="http://2.bp.blogspot.com/_BBS5bkzuLXM/SrIVgPdlW3I/AAAAAAAACfM/Ni40JEFfA-I/s320/linux-logo.jpg" border="0" /></a>
</div>

Happy New Year!

As promised I made a rudimentary Linux shell script utilizing the tar and gzip commands to archive or make backups. If you&#8217;re new to shell scripting you might like to read this articles.

<http://www.dartmouth.edu/~rc/classes/ksh/print_pages.shtml>  
<http://tldp.org/LDP/abs/html/>

If you&#8217;re lazy like I am. Don&#8217;t worry I&#8217;ll explain parts of the code.

<a name="more"></a>

Our goal is to make a shell script to create backups (in tar-gzip versions) of the folders we want unto a safe location on a disk. We want to be able to list all the folders and have the script loop through them. Now that&#8217;s settled, we can proceed to the code.<!--more-->

First, don&#8217;t forget to tell linux what scripting interpreter to use. I usually use <span style="font-style: italic;">sh</span> but there are others like <span style="font-style: italic;">bash and ksh</span>. But many experts suggest to use sh for portability to older systems.

`<br />
#!/bin/sh<br />
` 

Next, we configure the script. The lines below enumerates the folders I want archived ,then stores them in a SHELL VARIABLE named FOLDERS. (duhh!..)

<div style="background-color: darkgrey; color: white; font-size: 8pt; padding: 3px;">
  # &#8212; LIST OF FILES/FOLDERS TO BACKUP<br /> FOLDERS=&#8221;/var/www/html /opt/sandbox&#8221;
</div>

This line saves the folder path I want the archives to be stored in.

<div style="background-color: darkgrey; color: white; font-size: 8pt; padding: 3px;">
  # &#8212; BACKUP HERE<br /> BACKUPFOLDER=&#8221;/opt/backup&#8221;
</div>

_REMINDER_  
Make sure that the backup folder exist. If it doesn&#8217;t run the lines below on the console.

<div style="background-color: green; color: white; font-size: 8pt; padding: 3px;">
  > mkdir /opt/backup<br /> > chown root:root /opt/backup<br /> > chmod 755 /opt/backup
</div>

Here I configure the command string I want to use. Regarding the details of the command I used &#8211; see this [[link]][1].

<div style="background-color: darkgrey; color: white; font-size: 8pt; padding: 3px;">
  # &#8212; ARCHIVE COMMAND<br /> COMPRESSCMD=&#8221;tar czfv &#8220;
</div>

Here we use the <span style="font-style: italic;">for</span> command to loop through all the items we listed in <span style="font-style: italic;">$FOLDERS</span> and store it in another variable, <span style="font-style: italic;">$itm</span>.

<div style="background-color: darkgrey; color: white; font-size: 8pt; padding: 3px;">
  ## loop thru folders<br /> for itm in $FOLDERS; do<br /> # commands here<br /> &#8230;.<br /> done
</div>

These lines configures the commands we&#8217;re going to use inside the loop. The first line generates a formatted file path for my archive, $FARCHIVE.

<div style="background-color: darkgrey; color: white; font-size: 8pt; padding: 3px;">
  FARCHIVE=$BACKUPFOLDER/`basename $itm`_`uname -n`_`date +%F`.tgz<br /> $COMPRESSCMD $FARCHIVE $itm
</div>

If you&#8217;ve noticed I used the tilde symbol(\`). Yes they are not single quotation marks. In linux console, any commands enclosed within tildes are ran first and the result is returned as a string. So for example <span style="font-style: italic;">$itm</span> is equal to <span style="font-style: italic;">/var/www/html</span>. The resulting FARCHIVE value will be:

<div style="background-color: green; color: white; font-size: 8pt; padding: 3px;">
  > echo $FARCHIVE<br /> /opt/backup/html_potato_2009-01-02.tgz
</div>

The second line uses $FARCHIVE as well as the command we configured earlier and runs it.

For a breakdown of the enclosed commands we used.

echo the last(base) name in a path string.

<div style="background-color: green; color: white; font-size: 8pt; padding: 3px;">
  > basename /var/www/html<br /> html
</div>

echo the system&#8217;s computer name.

<div style="background-color: green; color: white; font-size: 8pt; padding: 3px;">
  > uname -n<br /> potato
</div>

echo the current date in this format (YYYY-MM-DD)

<div style="background-color: green; color: white; font-size: 8pt; padding: 3px;">
  > date +%F<br /> 2009-01-02
</div>

Here is the full script.

<div style="background-color: black; color: white; font-size: 8pt; padding: 3px;">
  <p>
    #!/bin/sh<br /> #set -x<br /> #&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8211;<br /> # ID: cabBackup.sh &#8211; BACKUP items to folder<br /> # USAGE: ./cabBackup.sh<br /> #&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8211;<br /> # AUTHOR: codespud 2008-2009<br /> # VERSION: 0.01
  </p>
  
  <p>
    # TODO: arguments<br /> # TODO: config file<br /> # TODO: functions<br /> # TODO: filtering
  </p>
  
  <p>
    # Sources<br /> # http://www.hsrl.rutgers.edu/ug/shell_help.html
  </p>
  
  <p>
    # PATH<br /> PATH=/opt/bin:/usr/bin:/bin; export PATH
  </p>
  
  <p>
    # CONFIG
  </p>
  
  <p>
    # &#8212; LIST OF FILES/FOLDERS TO BACKUP if not specified via console
  </p>
  
  <p>
    FOLDERS=&#8221;/var/www/html /opt/sandbox&#8221;<br /> #FOLDERS=&#8221;&#8221;
  </p>
  
  <p>
    # &#8212; BACKUP HERE<br /> BACKUPFOLDER=&#8221;/opt/backup&#8221;
  </p>
  
  <p>
    # &#8212; ARCHIVE COMMAND<br /> COMPRESSCMD=&#8221;tar czfv &#8221;
  </p>
  
  <p>
    # &#8212; DO NOT EDIT BEYOND THIS LINE (unless if you knw what ur doing ;] ) &#8212;
  </p>
  
  <p>
    # Check if the folder exists if not make it<br /> [ ! -d $BACKUPFOLDER ] && mkdir -p $BACKUPFOLDER || :
  </p>
  
  <p>
    chown root:root $BACKUPFOLDER<br /> chmod 755 $BACKUPFOLDER
  </p>
  
  <p>
    # clean the screen<br /> clear
  </p>
  
  <p>
    echo lets start
  </p>
  
  <p>
    ## loop thru folders<br /> for itm in $FOLDERS; do
  </p>
  
  <p>
    FARCHIVE=$BACKUPFOLDER/`basename $itm`_`uname -n`_`date +%F`.tgz<br /> $COMPRESSCMD $FARCHIVE $itm
  </p>
  
  <p>
    done
  </p>
  
  <p>
    echo .. done
  </p>
</div>

Now name and save the file. I named mine <span style="font-weight: bold;"><span style="font-style: italic;">cabBackup.sh</span></span>.

You need to make the script executable.

<div style="background-color: green; color: white; font-size: 8pt; padding: 3px;">
  > chmod 755 ./cabBackup.sh
</div>

There you have it just run it from the console.

<div style="background-color: green; color: white; font-size: 8pt; padding: 3px;">
  > ./cabBackup.sh
</div>

There are still some things we need to do to make it a fully fledged automation script like configuration files, some pre-process commands and error trapping. But what we have now serves our purpose very well. I&#8217;ll post revisions of this script so watch for that.

Links  
<http://www.dartmouth.edu/~rc/classes/ksh/print_pages.shtml>  
<http://tldp.org/LDP/abs/html/>  
[Linux: Snippet &#8211; Backup using Tar and gzip][1]

 [1]: http://potatokorner.blogspot.com/2008/12/linux-snippet-backup-using-tar-and-gzip.html