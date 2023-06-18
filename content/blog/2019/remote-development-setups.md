---
title: Remote Development Setup
author: chris
type: post
date: 2019-05-19T12:07:00+00:00
featured_image :  /architecture-ssh.png
tags: [tutorial, IDE]
redirect_from: 
  - /remote-development-setups/
  - /2019/05/remote-development-setups/
draft: false
---

Tell me if this sounds familiar. You have a workstation that can not support the technology stack your project requires. Having VMs or Docker installed on your machine is out of the question since it can barely support office software.  You end up building a development machine(perhaps an Linux box) as a  desktop server. This works well for a while until you need to access your development setup remotely. Luckily there's a number of ways you can achieve this. <!--more--> 

## The Options

- **Local editor/IDE via SFTP**. - This entails connecting via SFTP and uploading the code changes manually. Problem with this setup, you need to run a lot of steps to test your code. Upload (manually) then run tests, rinse and repeat. Don't expect to use any IDE functionality here. Not very useful but it works when the need arises. I recommend using [WinSCP](https://winscp.net/eng/download.php) on windows for this.  

- **Local editor/IDE with automatic syncing via an SFTP client.** - Very similar to the first option minus the manual uploads. Some SFTP clients would have a "sync on changes" option. WinSCP has the  ["keep up to date"](https://winscp.net/eng/docs/task_keep_up_to_date) feature which serves this purpose well. 

  For Apple machines, [Panic's](https://panic.com/) Coda/Transmit setup is a great example.  

  Additionally, using a plugin, some editors/IDE's (e.g. SublimeText, VSCode, etc.) would be able to carry out the same use case. In my experience though, managing files via plugin is not very consistent. When it fails, it fails spectacularly with me ending up trying to resolve corrupted files. 

<!--ad-->

- **Local IDE using rsync** - This setup leverages [rsync](https://rsync.samba.org/features.html) to synchronize your changes automatically. Using rsync is similar to using SFTP with automatic syncing. The difference is that rsync by default only upload/download files that changed. The most popular setup is to watch for file changes and then trigger a rsync command to upload only the delta. No manual uploading but not very different from the first one on this list. You can use inotifywait or gulps watch functionality to monitor file changes then manually trigger a function or command based on rsync.

    **Using inotifywait**,

    ```bash
    #watch_and_sync.sh

    #!/bin.ssh
    while inotifywait -r -e modify,create,delete /directory; do
        rsync -avz /directory /target
    done
    ```
    
    Using gulp and [gulp-rsync](https://www.npmjs.com/package/gulp-rsync),

    ```bash
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

- **Local IDE using SSHFS** - SSHFS(Secured SHell File Systems) can mount directories and files from remote machines as if they were local folders. Using this logic you can set up your remotely available codebase into your local IDE. This is very easy to put up since most Linux machines support SSH and it does not need any other libraries to install and configure. Although useful it's not very consistently executed in most clients. 
   For windows, check out [NetDrive](https://www.nsoftware.com/sftp/netdrive/) and [WinSFP](http://www.secfs.net/winfsp/) 

- **Remote editing using vi/vim** - Developing using vim on the development machine is a very powerful setup. This requires opening a terminal and connecting to the remote machine via SSH. Then navigating to your code base and running vim. You use vi's powerful text editing features to edit files. A bit of tweaking and installing some vi/vim plugins would make vim work more like an IDE. The problem most have is the learning curve but once you get around the idea of coding on the terminal, you might end up loving it or not. :) Another minor issue is when you need to upload new files like images and PDFs. If you're used to dragging and dropping your files into your IDE this might be off-putting. You will need a separate SFTP client to do upload these files. 

<!--ad-->

  Here's a link to my [vimrc](https://github.com/chrisbautista/vim-workflow/blob/master/.vimrc). Search through Github there's no shortage of excellent vim configurations that might fit your liking. 

```bash
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
    
    //...

```

  My recommendation to you is to use vim without modifications. Once you get the hang of it, you might NOT even need plugins. 

- **Remote editing using a cloud editor** - This has been quite popular lately. My favorite is [Cloud9 IDE](https://en.wikipedia.org/wiki/Cloud9_IDE). Even [Amazon Web Services(AWS) uses it](https://aws.amazon.com/cloud9/) for its cloud services. 

  Using the [Cloud9 IDE](https://github.com/c9/core) project you can set up any code base and make it available via the browser. It is not as powerful as Eclipse ( or clones e.g. PHPStorm, Netbeans) but it keeps your code and tasks in the same machine -- not yet at least. But it is significantly better than most options in this list as its very similar to how you would develop in a regular IDE. Most would have terminal emulation as well and support for plugins. The problem is you can't really do this for all your projects. Since you will be exposing the editor via the browser you still run the risk having your code hacked easier than without it. Like any internal application, there are ways to secure it.  

    ```bash 

    # Install
    git clone https://github.com/c9/core.git c9sdk
    cd c9sdk
    scripts/install-sdk.sh
    
    # Start Cloud9 and expose /var/www/html
    node server.js -w /var/www/html

    ```

- **VSCode with remote development pack** - To be precise, the [Remote development pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) is only available through [VS Code Insiders edition](https://code.visualstudio.com/insiders/) as of yet. No local code needed locally when using the remote development pack. The best benefit is all your beloved VSCode plugins can run on the code as if it's local. 
 Aside from SSH, the pack also include support for container setups(Docker) and Windows Subsystem for Linux (WSL). 

  To install [Remote development pack: SSH](https://code.visualstudio.com/docs/remote/ssh)

    - Install an [OpenSSH compatible SSH client](https://code.visualstudio.com/docs/remote/troubleshooting#_installing-a-supported-ssh-client) if one is not already present. 
        I recommend installing [Git Bash](https://git-scm.com/downloads) for windows. 

        Note: PuTTY is not supported on Windows since the ssh command must be in the path.
    - Install [Visual Studio Code Insiders](https://code.visualstudio.com/insiders/). 
    - Open **Visual Studio Code Insiders** then open modules
    - Search for [Remote Development](https://code.visualstudio.com/insiders/) extension pack, then hit Install.
    
    From VS Code documentation

    >   [Optional] If your server requires multi-factor authentication, set "remote.SSH.showLoginTerminal":"true" in settings.json 
    >   and enable the [ControlMaster](http://man.openbsd.org/cgi-bin/man.cgi/OpenBSD-current/man5/ssh_config.5?query=ssh%255fconfig%26arch=i386#ControlMaster) SSH feature. See here for details.

## Security

Since your code base needs to be accessed in the cloud, security is very important. Most of these setups use Secured SHell since its more secure than FTP and not to mention a lot of firewalls would have SSH open. There are also some features you might want to keep to secure SSH further. 

- Never let login with root `(PermitRootLogin=no)` and create sudo-users
- Enable key authentication `(PubKeyAuthentication=yes)`
- Limiting the service to a specific host and address instead of listening to all interfaces. 
`(ListenAddress=hostname:port)`
- Create Private keys with passphrases

There are other SSHD configuration options that can further secure your connection. Check some recommendations from [ssh.com](https://www.ssh.com/ssh/)

For Cloud editors like Cloud9 IDE; Enabling SSL(HTTPS), gating(strong password) and limiting access to known networks will keep your risk to a minimum. 

## Recommendation

I still prefer using vim for remote development but having an IDE setup like **VSCode with Remote Development pack** comes with great benefits which a developer like me finds quite appealing. Having to use a graphical UI for engaging my code base not to mention having some great plugins for language support is a major plus. But I digress, this is not an article to compare the benefits of IDEs in development. :) I'll let you decide on that on your own. 

It really depends on what's available for you and how comfortable you are in different environments. 

*Image attributed to **Microsoft VS Code Documentation**.*
