var keystone = require('../../../');

module.exports = function (req, res) {
	keystone.render(req, res, 'signin', {
		submitted: req.body,
		from: req.query.from,
		redirect: keystone.get('signin redirect'),
		logo: keystone.get('signin logo'),
		admin_css: keystone.get('admin css') ? keystone.get('admin css')(req) : null,
		admin_js: keystone.get('admin js') ? keystone.get('admin js')(req) : null
	});

};
