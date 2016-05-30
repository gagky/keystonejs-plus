
This is a fork of KeystoneJS

Things added / updated
1. Integrated medium-editor
    1. Declare by `extended: { type: Types.HtmlByMedium, height: 400 }`
    2. For S3 / Cloudinary image upload `extended: { type: Types.HtmlByMedium, height: 400, extra: 'mediumInsert' }`
2. Add interface for append CSS & JS to admin UI
    ```
keystone.set('admin css', '/styles/admin.min.css');
keystone.set('admin js', '/js/admin.min.js');
    ```
3. Add interface for admin UI nav bar render
    ```
keystone.set('admin nav', function(nav, user){
	console.log(nav);
	console.log(user);
	return nav;
    ```
4. Add interface for admin UI - item, footer render
    ```
Article.add({
	__footers: { type: Types.TextArray, hidden: true }
});
Article.schema.post('init', function (doc) {
    this.__footers = [JSON.stringify({
    	ui: 'Button',
    	key: 'edit-in-medium',
    	cls: 'success',
    	href: '/edit/article/' + this.slug,
    	text: 'Edit content in Medium now!'
    })];
});
    ```
    
    
    
![KeystoneJS](http://keystonejs.com/images/logo.svg)
===================================

[![Build Status](https://travis-ci.org/keystonejs/keystone.svg?branch=master)](https://travis-ci.org/keystonejs/keystone)

[KeystoneJS](http://keystonejs.com) is a powerful Node.js content management system and web app framework built on [express](http://expressjs.com) and [mongoose](http://mongoosejs.com). Keystone makes it easy to create sophisticated web sites and apps, and comes with a beautiful auto-generated Admin UI.

Check out [keystonejs.com](http://keystonejs.com) for documentation and guides.

You can also deploy a starter project to [Heroku](https://www.heroku.com/) for free to try it out:

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/JedWatson/keystone-starter)


## v0.4.0 React Rebuild coming soon

We've been working on a major update to Keystone for several months now, rewriting the Admin UI as a ReactJS App.

Work on this has now been merged into our `master` branch, which is currently not stable (but which we encourage you to try out and give us feedback on!). Stable `0.3.x` releases will continue to be published from the `0.3.x` branch.

Our [demo site](http://demo.keystonejs.com/) has been updated to the new version - check it out and let us know what you think!

For more information on the upcoming version, including how to try it out and get involved, check out [issue #1612](https://github.com/keystonejs/keystone/issues/1612)


## About

Keystone gives you:
*	A simple way to create a dynamic web site or app with well-structured routes, templates and models
*	A beautiful Admin UI based on the database models you define
*	Enhanced `models` with additional field types and functionality, building on those natively supported by Mongoose
*	Out of the box session management and authentication
*	An updates framework for managing data updates or initialisation
*	Integration with Cloudinary for image uploading, storage and resizing
*	Integration with Mandrill for sending emails easily
*	Integration with Google Places for clever location fields
*	Integration with Embedly for powerful video and rich media embedding tools

... plus a lot of other tools and utilities to make creating complex web apps easier.

Use our [Yeoman Generator](https://github.com/keystonejs/generator-keystone) to get up and running with KeystoneJS quickly, then check out our getting started guide &amp; docs at [keystonejs.com/docs/getting-started](http://keystonejs.com/docs/getting-started).

We have a demo website at [demo.keystonejs.com](http://demo.keystonejs.com/) where you can play with the Keystone Admin UI, and you can [read the source](https://github.com/keystonejs/keystone-demo) to see how it was built.

### Community

We have a friendly, growing community and welcome everyone to get involved.

Here are some ways:

* Follow [@KeystoneJS](https://twitter.com/KeystoneJS) on twitter for news and announcements
* Vote on the next features on [ProductPains](https://productpains.com/product/keystonejs)
* Chat with us [![Join the chat at https://gitter.im/keystonejs/keystone](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/keystonejs/keystone?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
* If you've got ideas, questions or need some advice, check out the [KeystoneJS Google Group](https://groups.google.com/d/forum/keystonejs)
* Ask technical questions on [Stack Overflow](http://stackoverflow.com/questions/tagged/keystone.js) and tag them `keystonejs`
* Report bugs and issues on our [issue tracker](https://github.com/keystonejs/keystone/issues)
* ... or preferably, submit pull request with patches and / or new features

We love to hear feedback about Keystone and the projects you're using it for. Ping us at [@KeystoneJS](https://twitter.com/KeystoneJS) on twitter.

#### Related Projects
If you are using KeystoneJS in any projects we encourage you to add it to our [Related Projects Page](https://github.com/keystonejs/keystone/wiki/Related-Projects). This is also the place to find generators and such that bundle KeystoneJS.


### Contributing

If you can, please contribute by reporting issues, discussing ideas, or submitting pull requests with patches and new features. We do our best to respond to all issues and pull requests within a day or two, and make patch releases to npm regularly.

If you're going to contribute code, please follow our [coding standards](https://github.com/keystonejs/keystone/wiki/Coding-Standards) and read our [CONTRIBUTING.md](https://github.com/keystonejs/keystone/blob/master/CONTRIBUTING.md).


## Usage

**Check out the [KeystoneJS Getting Started Guide](http://keystonejs.com/getting-started) to start using KeystoneJS.**

### Installation

The easiest way to get started with Keystone is to use the Yeoman generator:

```bash
$ npm install -g generator-keystone
$ yo keystone
```

Answer the questions, and the generator will create a new project based on the options you select, and install the required packages from **npm**.

Alternatively, to include Keystone in an existing project or start from scratch (without Yeoman), specify `keystone: "^0.3.9"` in the `dependencies` array of your `package.json` file, and run `npm install` from your terminal.

Then read through the [Documentation](http://keystonejs.com/docs) and the [Example Projects](http://keystonejs.com/examples) to understand how to use it.


### Example application script (keystone.js)

Running in default mode, Keystone takes care of everything required to configure your application with Express, connect to your MongoDB database, and start the web server.

Here is an example of what your `keystone.js` (or `app.js`, etc) file may look like:

```js
var keystone = require('keystone');

keystone.init({

	'name': 'My Project',
	'brand': 'Project',

	'less': 'public',
	'static': 'public',

	'views': 'templates/views',
	'view engine': 'jade',

	'auth': true,
	'user model': 'User',
	'cookie secret': '--- your secret ---',

	'auto update': true

});
```