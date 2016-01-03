var keystone = require('../../../');

module.exports = function(req, res) {

	keystone.render(req, res, 'home', {
		section: 'home',
		page: 'home',
		title: keystone.get('name') || 'Keystone',
		orphanedLists: keystone.getOrphanedLists(),
		brand: keystone.get('name'),
		cus_css: keystone.get('cus_css') ? keystone.get('cus_css').home : null,
		cus_js: keystone.get('cus_js') ? keystone.get('cus_js').home : null
	});

};
