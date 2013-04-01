Designer's QuickStart Guide
============================

This is a quick start guide for designers unfamiliar with Git or Designing in Browser to get started using Style Prototypes. This document will guide you in installing and using Style Prototypes, as well as get you set up to version your styles using Git and point you in the direction you need to start learning HTML5/CSS and Sass. This guide will also help you get set up with a modern Front End development stack. If you're a designer, after reading this you'll be well on your way to designing for the web in the web!

## Table of Contents

1. [Basic Requirements](#basic-requirements)
2. [Getting Started](#getting-started)
	* [Learning HTML and CSS](#learning-html-and-css)
	* [Installing Style Prototype Requirements](#installing-style-prototype-requirements)
	* [Text Editor](#text-editor)
3. [Versioned Styles](#versioned-styles)
	* [Client Branches](#client-branches)
	* [ch-ch-ch-ch Changes](#ch-ch-ch-ch-changes)
4. [Working with Style Prototypes](#working-with-style-prototypes)
	* [Working Locally](#working-locally)
	* [Super Powering your Styling with Sass and Bower](#super-powering-your-styling-with-sass-and-bower)

## Basic Requirements

This reference assumes that you are running an Apple computer with OS X 10.7 or higher. If not, you can follow along as best you can, but I haven't tested these instructions on any other platform.

We will be using the free [GitHub for Mac](http://mac.github.com) app and assuming you are as well. If you are using Windows, these instructions should work equally as well for the [GitHub for Windows](http://windows.github.com/) app; however, Windows doesn't come with Ruby, so using the actual Style Sites may be a challenge (it's currently totally untested on Windows). If you would like to work on Windows, the first thing you're going to need to do is download and install [Ruby](http://rubyinstaller.org/downloads) and [Node.js](http://nodejs.org/download/). From there, you should be able to follow along with this tutorial by using the GitHub for Windows app and the Command Line with Ruby application.

## Getting Started

The first thing you need to do is [Sign Up for GitHub](https://github.com/signup/free). Once you've done that, download the [GitHub for Mac](http://mac.github.com) app. When you open it up, sign in to your GitHub account. Once signed up and signed in, navigate to the [Style Prototypes page](https://github.com/Team-Sass/Style-Prototypes). On the right across from the repo's name you'll see three buttons; watch, star, and fork. You're going to fork this repository. Once you've forked it, there will be a button called "Clone in Mac". It will ask you to choose your folder and then clone into that folder. Choose a folder and clone into that folder! You now have everything downloaded! Yes!

### Learning HTML and CSS

One of the biggest changes that Designers have when starting to design in browser is that they don't know the tools of the medium they're designing both in and for. Fortunately, there are two amazing books that can help you learn HTML5 and CSS pretty easily. [HTML5 & CSS3 For Web Designers](http://www.abookapart.com/products/html5-css3-bundle) is a bundle from [A Book Apart](http://www.abookapart.com/). Just about everything they print is gold, so check out all of their books. 

### Installing Style Prototype Requirements

Requirements can be a pain in the ass to manage, but fortunately, installing them is really easy with Style Prototypes. Simple launch the "Install Requirements" application in your Style Prototypes folder. This will open up a Terminal window asking you for your password. Type in your computer's password and hit enter. When typing in your password you won't see and indicator that you're typing anything in; this is normal. This will install all of the gems you need for Style Prototypes to run properly.

If you're not on a Mac, or the application doesn't work for you, please refer to the [Style Prototypes README](https://github.com/Team-Sass/Style-Prototypes#requirements-and-installation)

### Text Editor

You're going to want to have a great text editor to work with the files. Dreamweaver isn't gonna cut it. There are a whole lot of text editors out there, but the following I've either used and liked or a lot of my friends have used and like. All of these suggestions are paid except for one, but the paid ones have free trials. The prices shown here are the prices as of this writing.

* [Sublime Text 2](http://www.sublimetext.com/) - My current favorite text editor. Works across all major platforms. Highly customizable. Unrestricted free trial. **$59**
* [Coda 2](http://www.panic.com/coda/) - A favorite amongst designers. Very Mac like, built by a company with a great heritage. 7 Day free trial. **$75**
* [TextMate](http://macromates.com/) - An old standby, but a little bit old. 30 Day free trial. **$52**
* [TextMate 2](https://github.com/textmate/textmate) - The newest version of TextMate. Still in Alpha, but very powerful. **Free**
* [Chocolat](http://www.chocolatapp.com/) - A new, hot text editor that lots of people seem to enjoy. Haven't used it much, but seems fairly good. Free trial. **$49**

There are many others out there, but these are the ones I've used or heard most about, so I recommend you take a look at them. Either way, you're going to want a Sass syntax highlighting bundle for your code editor. Syntax highlighters allow you code editors to color your code in specific ways to make it easier to read the code you're writing. Coda 2 comes with a Sass syntax highlighter built in, but there are awesome free ones for [Sublime Text](https://github.com/kuroir/SCSS.tmbundle/tree/SublimeText2), [Text Mate](https://github.com/kuroir/SCSS.tmbundle), and [Chocolat](https://github.com/kuroir/SCSS.tmbundle/tree/Chocolat). This is the highlighter I use, I love it.

## Versioned Styles

Working with Style Prototypes is a little bit different than working with traditional Photoshop files. When working with Photoshop files, you tend to have one file for each and every different iteration you make. While you can still do that with Style Prototypes, copying the folder over each time you want a new iteration or new client, it is preferable to use Git branches and Git version control. This allows us to keep track of all of the changes we've made, roll back changes, switch between versions super quick, and reduce the amount of duplicate files we have on our computer making it easier to find exactly what we need.

### Client Branches

One of the best ways of keeping yourself organized with different clients and different versions is through Git branches. Git branches allow us to take a snapshot of the main repository and make changes while keeping the original clean. This allows us to "spin up" multiple clean copies of the basic Style Prototype and change them without interfering with any other version we may have made. Creating a branch is super easy. Inside the GitHub app, go to **My Repositories** and click the right pointing arrow to go into your repository. On the left, you'll see four tabs: History, Changes, Branches, and Settings. Click on **Branches**. This will give you a view of all of your branches. To begin with, you'll only have one branch, *master*. This is the branch that we want to keep clean and don't want to touch. To create a new branch, at the far right of the master branch, you'll see a plus **+** button and an arrow down button **▼**. Click on the plus button and a popup will appear saying "Create a new branch off master". Name the branch something descriptive, such as *NBC Version 1*, and click the Branch button. You will now see that you have a new branch with spaces turned into dashes, so this one would be called *NBC-Version-1* with a checkmark **✓** next to it. That checkmark signifies that you're now on that branch. The first thing you now want to do is click the **Publish** button all the way on the right of your new branch. This will push the branch up to GitHub so it can be versioned by GitHub.

**IT IS IMPORTANT TO KEEP IN MIND** that unless you have paid for a GitHub account, when you push a branch or any changes to GitHub, they will be available for everyone to see. If you do not want this, pay for a private GitHub account and follow their instructions for [duplicating a repo](https://help.github.com/articles/duplicating-a-repo) using Style Prototypes as the old repo.

Whenever you want to create a new branch for a new client or a new version of an existing client, make a new branch using the same instructions off of *master*. When you want to switch to a different branch, you can either hover to the left of the branch name and click the checkmark that comes up, or you can press the arrow down button on the right of the branch and click "Switch to This Branch".

### ch-ch-ch-ch Changes

We're now going to switch over to the **Changes** tab. There are, generally speaking, three type of changes you're going make while working that Git is going to pick up on; modified files, new files, and deleted files. If you **modify** a file, it will show show up in the list as the path to the file you've edited. If you click on the file, you'll see the list of lines removed and lines added. If you **add** a file, it will show up in the list with a green flag that says *NEW* next to it, with a list of the lines added. If you **delete** a file, it will show up in the list with a red flag that says *DELETED* next to it, with a list of the lines deleted. If you **rename** a file, the original name will show up o the list as deleted and the new name will show up as added.

If you decide you've made changes you don't like, you can right click on any file name and click *Discard Changes* and all of the changes you've made will be reverted to your last commit. When you're ready to commit changes you've made, write a summary in the **Commit summary** field on top, with an optional **Extended descriptor** and then press the **Commit** button. If you have commits that you haven't pushed up to GitHub yet, the icon for Changes will have yellow plus and minus signs, and you'll see a box called **Unsynced Commits** underneath the **Uncommitted Changes** box with a list of all of the commits you've made.

When you're ready to sync your changes back up to GitHub to share with others, you click the **Sync Branch** button in the top right corner of the GitHub app.

If you ever decide that you've done something you don't like, you can go into the **History** tab, find the commit that you don't like, and click the **Revert commit** button. Be sure to sync when you've made changes!

## Working with Style Prototypes

The README has great write-ups on how all of the different pieces work, including [Setting Up Your Style Site](https://github.com/Team-Sass/Style-Prototypes#setting-up-your-style-site) and building [Your Style Guide](https://github.com/Team-Sass/Style-Prototypes#your-style-guide). Follow them to build out your Style Site, the only limit is your imagination.

### Working Locally

Style Prototypes are designed to be built locally. Starting your Style Prototype server is drop dead easy. Simply launch the Start Server application! The application will launch the server for you and, once the server is running, open up the site in your default browser! The server is also very smart, and will know when you've saved a change to a file. When it's detected that you have, it will reload your page for you so you can see the change almost immediately!

### Super Powering your Styling with Sass and Bower

Any CSS you can write you can write in the Sass files (.scss) and it'll be just as if you wrote plain CSS. If, however, you want to use all of the power of Sass, after you've learned CSS, take a look at the [Sass Tutorial](http://sass-lang.com/tutorial.html) and [Sass Documentation](http://sass-lang.com/docs.html) as well as the [Compass Reference](http://compass-style.org/reference/compass/).

The Style Guide also comes a bunch of other useful tools to make your life happy. Styling across multiple browsers can be a pain, and as such both [Normalize](http://necolas.github.com/normalize.css/) and [Formalize](http://formalize.me/) are available and in use immediately (the former through a Compass extension, the later through a Bower component). A [Eric Meyer](http://meyerweb.com/eric/tools/css/reset/) reset is also available by uncommenting `compass/reset` in your `_base.scss` file. In addition, [Toolkit](https://github.com/snugug/toolkit), a collection of responsive web design and design in browser tools, [Sassy Buttons](http://jaredhardy.com/sassy-buttons/), which makes fancy CSS3 buttons easy to make, and [Color Schemer](https://github.com/Team-Sass/color-schemer), an advanced color tool, are all available to use out of the box. By uncommenting them, you also get [Breakpoint](https://github.com/canarymason/breakpoint), a tool to make working with Media Queries really easy, [Singularity](https://github.com/Team-Sass/Singularity) to build awesome and advanced grids for the web, and [Modular Scale](https://github.com/Team-Sass/modular-scale) to calculate scales for use in design.

***Happy Coding!***
