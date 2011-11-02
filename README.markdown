Syntax-Chat *(or Chattr, or whatever we want to call it)*
=========================================================

Installation:
-------------
Currently the project requires MongoDB and the PECL Mongo extension for PHP.
Clone the repo, set up a local vhost, and you're good to go.
There must be an active MongoDB instance running at localhost.

Development:
------------
1. Run `gem install bundler`, if you have not already have bundler installed on your system.
2. Run `bundle install` from the command line to make sure you have the list of required gems installed
3. Run `guard start`, and Compass will auto-compile your stylesheets
