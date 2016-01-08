danne.stayskal.com
=================

This is the codebase that runs [Danne Stayskal's site](http://danne.stayskal.com/).  It is developed using [nanoc](http://nanoc.stoneship.org/) and rsynced in static form to the server.

Installation
------------

Prerequisites: [OpenSSH](http://www.openssh.com/), [Rsync](http://rsync.samba.org/), [Ruby](http://www.ruby-lang.org/), [RubyGems](http://rubygems.org/pages/download), [Ruby Version Manager](https://rvm.beginrescueend.com/), and [Bundler](http://gembundler.com/).

First, clone this codebase

	$ git clone git@github.com/linenoise/portfolio

Second, accept the RVM version and gemset, building Ruby 1.9.2 if you need

	$ rvm install ruby-1.9.2-p180

Finally, install Bundler and the rest of the gemset

	$ gem install bundler
	$ bundle install

At this point, you're ready to make changes.

Maintenance
-----------

This codebase uses nanoc to build a tree of static HTML, CSS, and JavaScript resources to be uploaded to the server.  Assets (such as images and recordings) are included in this final build.  Once Bundler has nanoc and friends installed, running a maintenance server is straightforward:

	$ nanoc autocompile

This will automatically compile any changes made to the build and make them available through a lightweight webserver running at http://localhost:3000/.

Deployment
----------

To deploy, make sure you've got your deploy keys in place, then run:

	$ ./push

Easy as pie.

Credits
-------

![Danne Stayksal](http://danne.stayskal.com/images/logo.png)

Unless otherwise noted, all content on this site is copyright © 1998-2016 Danne Stayskal and available to you under the [Creative Commons BY-NC-SA 3.0](http://creativecommons.org/licenses/by-nc-sa/3.0/us/) license. All exceptions to this license are noted in [the colophon for this site](https://github.com/linenoise/portfolio/blob/master/content/colophon.html).
