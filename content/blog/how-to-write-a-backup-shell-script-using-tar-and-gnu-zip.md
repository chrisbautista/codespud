---
title: How to Write a Backup Shell Script using Tar and Gnu Zip
author: chris
type: post
date: 2009-01-02T23:20:00+00:00
redirect_from:
  - /2009/01/how-to-write-a-backup-shell-script-using-tar-and-gnu-zip/
tags: [bash, linux, script]
---

Happy New Year!

As promised I made a rudimentary Linux shell script utilizing the tar and gzip commands to archive or make backups. If you&#8217;re new to shell scripting you might like to read this articles.

<http://www.dartmouth.edu/~rc/classes/ksh/print_pages.shtml>  
<http://tldp.org/LDP/abs/html/>

If you&#8217;re lazy like I am. Don&#8217;t worry I&#8217;ll explain parts of the code.

<!--more-->

Our goal is to make a shell script to create backups (in tar-gzip versions) of the folders we want unto a safe location on a disk. We want to be able to list all the folders and have the script loop through them. Now that&#8217;s settled, we can proceed to the code.<!--more-->

First, don&#8217;t forget to tell linux what scripting interpreter to use. I usually use <span style="font-style: italic;">sh</span> but there are others like <span style="font-style: italic;">bash and ksh</span>. But many experts suggest to use sh for portability to older systems.

```bash
#!/bin/sh
```

Next, we configure the script. The lines below enumerates the folders I want archived ,then stores them in a SHELL VARIABLE named FOLDERS. (duhh!..)

```bash
# — LIST OF FILES/FOLDERS TO BACKUP
FOLDERS=”/var/www/html /opt/sandbox”
```

This line saves the folder path I want the archives to be stored in.

```bash
# — BACKUP HERE
BACKUPFOLDER=”/opt/backup”
```

_REMINDER_  
Make sure that the backup folder exist. If it doesn&#8217;t run the lines below on the console.

<div style="background-color: green; color: white; padding: 10px;">
  > mkdir /opt/backup<br /> > chown root:root /opt/backup<br /> > chmod 755 /opt/backup
</div>

Here I configure the command string I want to use. Regarding the details of the command I used &#8211; see this [[link]][1].

```bash
# — ARCHIVE COMMAND
COMPRESSCMD=”tar czfv “
```

Here we use the <span style="font-style: italic;">for</span> command to loop through all the items we listed in <span style="font-style: italic;">$FOLDERS</span> and store it in another variable, <span style="font-style: italic;">$itm</span>.

```bash
## loop thru folders
for itm in $FOLDERS; do
# commands here
….
done
```

These lines configures the commands we&#8217;re going to use inside the loop. The first line generates a formatted file path for my archive, \$FARCHIVE.

```bash
FARCHIVE=$BACKUPFOLDER/`basename $itm`_`uname -n`_`date +%F`.tgz
$COMPRESSCMD $FARCHIVE $itm
```

If you&#8217;ve noticed I used the tilde symbol(\`). Yes they are not single quotation marks. In linux console, any commands enclosed within tildes are ran first and the result is returned as a string. So for example <span style="font-style: italic;">\$itm</span> is equal to <span style="font-style: italic;">/var/www/html</span>. The resulting FARCHIVE value will be:

<div style="background-color: green; color: white; padding: 10px;">
  > echo $FARCHIVE<br /> /opt/backup/html_potato_2009-01-02.tgz
</div>

The second line uses \$FARCHIVE as well as the command we configured earlier and runs it.

For a breakdown of the enclosed commands we used.

echo the last(base) name in a path string.

<div style="background-color: green; color: white; padding: 10px;">
  > basename /var/www/html<br /> html
</div>

echo the system&#8217;s computer name.

<div style="background-color: green; color: white; padding: 10px;">
  > uname -n<br /> potato
</div>

echo the current date in this format (YYYY-MM-DD)

<div style="background-color: green; color: white; padding: 10px;">
  > date +%F<br /> 2009-01-02
</div>

Here is the full script.

```bash
#!/bin/sh
#set -x
#——————————————–
# ID: cabBackup.sh – BACKUP items to folder
# USAGE: ./cabBackup.sh
#——————————————–
# AUTHOR: codespud 2008-2009
# VERSION: 0.01

# TODO: arguments
# TODO: config file
# TODO: functions
# TODO: filtering

# Sources
# http://www.hsrl.rutgers.edu/ug/shell_help.html

# PATH
PATH=/opt/bin:/usr/bin:/bin; export PATH

# CONFIG

# — LIST OF FILES/FOLDERS TO BACKUP if not specified via console

FOLDERS=”/var/www/html /opt/sandbox”
#FOLDERS=””

# — BACKUP HERE
BACKUPFOLDER=”/opt/backup”

# — ARCHIVE COMMAND
COMPRESSCMD=”tar czfv ”

# — DO NOT EDIT BEYOND THIS LINE (unless if you knw what ur doing ;] ) —

# Check if the folder exists if not make it
[ ! -d $BACKUPFOLDER ] && mkdir -p $BACKUPFOLDER || :

chown root:root $BACKUPFOLDER
chmod 755 $BACKUPFOLDER

# clean the screen
clear

echo lets start

## loop thru folders
for itm in $FOLDERS; do

FARCHIVE=$BACKUPFOLDER/`basename $itm`_`uname -n`_`date +%F`.tgz
$COMPRESSCMD $FARCHIVE $itm

done

echo .. done

```

Now name and save the file. I named mine <span style="font-weight: bold;"><span style="font-style: italic;">cabBackup.sh</span></span>.

You need to make the script executable.

<div style="background-color: green; color: white; padding: 10px;">
  > chmod 755 ./cabBackup.sh
</div>

There you have it just run it from the console.

<div style="background-color: green; color: white; padding: 10px;">
  > ./cabBackup.sh
</div>

There are still some things we need to do to make it a fully fledged automation script like configuration files, some pre-process commands and error trapping. But what we have now serves our purpose very well. I&#8217;ll post revisions of this script so watch for that.

Links  
<http://www.dartmouth.edu/~rc/classes/ksh/print_pages.shtml>  
<http://tldp.org/LDP/abs/html/>  
[Linux: Snippet &#8211; Backup using Tar and gzip][1]

[1]: http://potatokorner.blogspot.com/2008/12/linux-snippet-backup-using-tar-and-gzip.html
