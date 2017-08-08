Base Install
===

[![WPGulp](https://img.shields.io/badge/Built%20For%20WordPress-%E2%93%A6-lightgrey.svg?style=flat-square)](https://github.com/mikejandreau/Base-Install-Four) [![Build Status](https://travis-ci.org/Automattic/_s.svg?branch=master)](https://travis-ci.org/Automattic/_s)

Base Install is a responsive starter theme for WordPress development built on Underscores as a starting point. It features a [theme wrapper](http://scribu.net/wordpress/theme-wrappers.html) inspired by Scribu, a responsive grid based on [Skeleton](http://getskeleton.com/) by Dave Gamache, and a workflow built on the fantastic [WPGulp](https://labs.ahmadawais.com/WPGulp/) by Ahmad Awais. 

As an added bonus it also features a customizable theme options page, a mobile menu with sub-menu toggles, and no external library/framework dependencies such as jQuery, Bootstrap, or Foundation. The minified CSS/JS files weigh in at 77kb combined.

This theme is currently under active development and will see some changes, but the demo as it is now can be viewed here: [Base Install Demo](http://losaidos.com/dev/baseinstall).



Quick Start Guide
---

This quick-start guide assumes you already have a local development environment with WordPress already installed and running. More detailed documentation is in the works, but if you've done this type of thing before it should be easy to get going.

First, either download the files from this repo on GitHub or run the following commands in your terminal:

```shell
$ cd your-wp-directory/wp-content/themes
$ git clone https://github.com/mikejandreau/Base-Install
```

Once the theme files are in <code>wp-content/themes</code>, open <code>gulpfile.js</code> in your code editor and look for this:

```javascript
var projectURL = 'dev8'; // Project URL. Could be something like localhost:8888.
```

When developing this theme the folder where WordPress was installed happened to be <code>dev8</code> on my machine. You'll need to update that line above to reflect your local development settings for BrowserSync to work properly.

You also might want to run a search-and-replace to change the theme name from “Base Install” to something else, like “Client Name” or “My Awesome Theme.” Once you’ve done that, CD into your theme folder and run <code>npm install</code> to install your dependencies.

```shell
$ cd Base-Install
$ npm install
```

After a few seconds (maybe longer, depending on your computer), run <code>gulp</code> and your default browser should pop up with your site, ready to get to work.

```shell
$ gulp
```

Any time you save a .scss, .js, or .php file, Gulp will re-compile your code and reload your browser.

Happy coding!

***

Base Install is licensed under the [GPL](https://en.wikipedia.org/wiki/GNU_General_Public_License). Use it to make something cool, have fun, and share what you've learned with others.