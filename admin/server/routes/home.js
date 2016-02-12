var keystone = require('../../../');

module.exports = function (req, res) {

	keystone.render(req, res, 'home', {
		section: 'home',
		page: 'home',
		title: keystone.get('name') || 'Keystone',
		orphanedLists: keystone.getOrphanedLists(),
		brand: keystone.get('name'),
		admin_css: keystone.get('admin css') ? keystone.get('admin css')(req) : null,
		admin_js: keystone.get('admin js') ? keystone.get('admin js')(req) : null
	});

};
