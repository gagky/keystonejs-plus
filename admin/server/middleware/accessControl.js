var _ = require('lodash');

module.exports = function (keystone) {
	return function(accessType){
        return function (req, res, next) {
            if (!req.list || !keystone.accessControl(req.list, accessType, req.user)) {
				if (req.headers.accept === 'application/json') {
					return res.status(404).json({ error: 'invalid list permission' });
				}
				req.flash('error', _.upperCase(accessType) + ' of ' + _.upperCase(req.params.list) + ' is not granted.');
				return res.redirect('/' + keystone.get('admin path'));
			}
			next();
        }
	}
}