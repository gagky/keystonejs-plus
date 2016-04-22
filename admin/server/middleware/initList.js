module.exports = function (keystone) {
	return function (respectHiddenOption) {
		return function (req, res, next) {
			try{
				req.list = keystone.list(req.params.list);
			}catch(e){
				console.log(e)
			}
			if (!req.list || (respectHiddenOption && req.list.get('hidden')) || 
				(keystone.get('admin access control') && !req.user[req.list.options.allowRead])) {
				if (req.headers.accept === 'application/json') {
					return res.status(404).json({ error: 'invalid list path' });
				}
				req.flash('error', 'List ' + req.params.list + ' could not be found.');
				return res.redirect('/' + keystone.get('admin path'));
			}
			next();
		};
	};
};
