var keystone = require('../../../');
var path = require('path');

module.exports = function (req, res) {
	var appName = keystone.get('name') || 'Keystone';
	var codemirrorPath = keystone.get('codemirror url path')
												? path.join('/', keystone.get('codemirror url path'))
												: path.join('/', keystone.get('admin path'), '/js/lib/codemirror');

	console.log(req.params)
	keystone.render(req, res, 'index', {
		// section: keystone.nav.by.list[req.list.key] || {},
		title: appName,
		list: req.list,
		orphanedLists: keystone.getOrphanedLists(),
		codemirrorPath: codemirrorPath
	});
	/*keystone.render(req, res, 'index', {
		// section: keystone.nav.by.list[req.list.key] || {},
		title: appName + ': ' + req.list.plural,
		list: req.list,
		orphanedLists: keystone.getOrphanedLists(),
		codemirrorPath: codemirrorPath,
		admin_css: req.list.options.uiOptions && req.list.options.uiOptions.list ? req.list.options.uiOptions.list.css : null ,
		admin_js: req.list.options.uiOptions && req.list.options.uiOptions.list ? req.list.options.uiOptions.list.js : null ,
		allowAccessList: keystone.accessControl(req.list, 'accessList', req.user),
		allowAccessItem: keystone.accessControl(req.list, 'accessItem', req.user),
		allowCreateItem: keystone.accessControl(req.list, 'itemCreate', req.user),
		allowDeleteItem: keystone.accessControl(req.list, 'itemDelete', req.user),
		allowSaveItem: keystone.accessControl(req.list, 'itemSave', req.user),
	});*/
};
