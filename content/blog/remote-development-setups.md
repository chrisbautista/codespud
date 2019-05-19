---
title: Remote Development Setup
author: chris
type: post
date: 2019-05-19T12:07:00+00:00
featured_image :  /architecture-ssh.png

---

Tell me if you have the same situation as I am. You're workstation cannot support the technology stack your project requires. Having VMs or Docker installed on my workstation is out of the question since it barely can support office software. So, in my case I ended up building a development machine(Ubuntu) as a desktop server that I remotely connect to via SSH when developing. When I have access to the machine I can work quite well. Problem happens when I need to access my codebase remotely. Here's a list of options I've tried to facilitate this setup. <!--more-->

## The Options

I have different ways to accommodate this setup:

- **Local editor/IDE via SFTP**. - Connect via SFTP and upload the code changes. I hate this setup cause you have to manually upload your files. Another problem with this setup, you need to run a lot of steps to test your code. Upload (manually) then run tests, rinse and repeat. Don't expect to use any IDE functionality here. Not very useful but it works when the need arises. I recommend using [WinSCP](https://winscp.net/eng/download.php) on windows.  

- **Local editor with automatic syncing via an SFTP client.** - Very similar to the first option minus the manual uploads. Some SFTP clients would have a "sync on changes" option. Winscp has the  ["keep up to date" feature](https://winscp.net/eng/docs/task_keep_up_to_date)

  For Apple machines, [Panic's](https://panic.com/) Coda/Transmit setup is a great example of this.  

  Using a plugin some editor/IDE's (e.g. SublimeText, VSCode etc.) would be able to carry out the same use case. In my experience though, syncing via plugin is not very consistent. When it fails, it fails spectacularly with me ending up trying to resolve corrupted files.  


- **Local IDE using rsync** - Rsync is similar to using SFTP. The most popular setup is to watch for file changes and then trigger an rsync command to upload only the delta. No manual uploading but not very diffent from the first one in this list.  

    **Using inotifywait**,

    ```bash
    #watch_and_sync.sh

    #!/bin.ssh
    while inotifywait -r -e modify,create,delete /directory; do
        rsync -avz /directory /target
    done
    ```
    
    Using gulp and [gulp-rsync](https://www.npmjs.com/package/gulp-rsync),

    ```
    npm install gulp-rsync --save-dev
    ```
    ```js
    //gulpfile.js
    var gulp = require( 'gulp' );
    var rsync = require( 'gulp-rsync' );
    gulp.task( 'watch', function() {
      var watchFiles = [
        './src/**', './templates/**'
      ];
      var watcher = gulp.watch( watchedFiles, ['sync']);
    });
    gulp.task( 'sync', function() {
      return gulp.src( 'js/**' )
        .pipe( rsync({
          hostname: 'remote.server.com',
          destination: '~/project/'
        }));
    });

    ```

- **Local IDE using SSHFS** - SSHFS can mount directories and files from remote machines as if they are local folders. Using this logic you can open your remotely available code base into your local IDE. Since most Linux machines support SSH and it does not need any other libraries to install and configure not to mention setups with firewalls since most would have SSH open. Although useful it's not very consistently executed in most clients. 
   For windows, check out [NetDrive](https://www.nsoftware.com/sftp/netdrive/) and [WinSFP](http://www.secfs.net/winfsp/) 

- **Remote editing using vi/vim** - Developing using vim on the development machine. Setup requires opening a terminal and connecting to the remote machine via SSH. Then navigating to your codebase and opening vim. You are given a powerful text editor with vi's legendary code editing features. Adding a little configuration and some plugins, vim will work a very capable IDE. It's free and it's local to your development machine. Problem is the learning curve and you need to get over the idea that you're using a terminal to code. Another issue is when you need to upload new files like images and pdf's. You will need upload via SFTP or git to add new files. 

  Here's a link to my [vimrc](https://github.com/chrisbautista/vim-workflow/blob/master/.vimrc) that I use to configure my vim editor. Search through github there's no shortage of excellent vim configurations. 

  ```
    "====================
    " vim workflow
    " @chrisbautista "codespud"
    " features:
    " - asynchronous linting
    " - prettier
    " - dark theme
    " - tree file view via NerdTree
    " - fuzzy file search
    " - more info on status and tab lines
    " - keyboard mappings
    " - php debugging
    " - use , as <leader>
    "====================
    ...
    ```
    
- **Remote editing using a cloud editor** - This has been quite popular lately. Using the [Cloud9 IDE](https://github.com/c9/core) project you can set up any codebase and make it available via the browser. IDE is not as powerful as eclipse ( or clones e.g. PHPStorm, netbeans) but it keeps your code and tasks in the same machine. Significantly better as you it provides means to add files and in-editor search. Most would have terminal emulation and support for plugins. Problem is you can't really do this for all your projects. Since you will be exposing the editor via the browser (although there are ways to secure it) you still run the risk having your code hacked easier than without it.

    ```bash 

    # Install
    git clone https://github.com/c9/core.git c9sdk
    cd c9sdk
    scripts/install-sdk.sh
    
    # Start Cloud9 and expose /var/www/html
    node server.js -w /var/www/html

    ```

- **VSCode with remote development pack** - To be precise, the [Remote development pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) is only available through [VS Code Insiders edition](https://code.visualstudio.com/insiders/) as of yet. No local code needed locally when using the remote development pack. Best benefit is all your beloved VSCode plugins can run on the code as if it's local. 
 Aside from SSH, the pack also include support for container setups(Docker) and Windows Subsystem for Linux (WSL). 

  To install [Remote development pack: SSH](https://code.visualstudio.com/docs/remote/ssh)

    - Install an [OpenSSH compatible SSH client](https://code.visualstudio.com/docs/remote/troubleshooting#_installing-a-supported-ssh-client) if one is not already present. 
        I recommend installing [Git Bash](https://git-scm.com/downloads) for windows. 

        Note: PuTTY is not supported on Windows since the ssh command must be in the path.
    - Install [Visual Studio Code Insiders](https://code.visualstudio.com/insiders/). 
    - Open **Visual Studio Code Insiders** then open modules
    - Search for [Remote Development](https://code.visualstudio.com/insiders/) extension pack, then hit Install.
    
    > From VS code documentation

    >   [Optional] If your server requires multi-factor authentication, set "`remote.SSH.showLoginTerminal`":`true` in settings.json 
    >   and enable the [ControlMaster](http://man.openbsd.org/cgi-bin/man.cgi/OpenBSD-current/man5/ssh_config.5?query=ssh%255fconfig%26arch=i386#ControlMaster) SSH feature. See here for details.
    
  To connect is straightforward as well,
    
  

## Recommendation
It really depends on what's available for you and how comfortable you are at different environments. 

I still prefer using vim for remote development but having an IDE setup like **VSCode with Remote Development pack** comes with great benefits which a developer like me finds quite appealing. Having  to use a graphical UI for engaging my codebase not to mention having some great plugins for language support is a major plus. But I digress, this is not an article to compare the benefits of IDEs in development. :) I'll let you decide on that on your own. 



*Image attributed to **Microsoft VS Code Documentation**.*
