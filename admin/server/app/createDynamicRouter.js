var bodyParser = require('body-parser');
var express = require('express');
var multer = require('multer');

module.exports = function createDynamicRouter (keystone) {

	// ensure keystone nav has been initialised
	// TODO: move this elsewhere (on demand generation, or client-side?)
	if (!keystone.nav) {
		keystone.nav = keystone.initNav();
	}

	var router = express.Router();

	// Use bodyParser and multer to parse request bodies and file uploads
	router.use(bodyParser.json({}));
	router.use(bodyParser.urlencoded({ extended: true }));
	router.use(multer({ includeEmptyFields: true }));

	// #1: Session API
	// TODO: this should respect keystone auth options
	router.get('/api/session', require('../api/session/get'));
	router.post('/api/session/signin', require('../api/session/signin'));
	router.post('/api/session/signout', require('../api/session/signout'));

	// #2: Session Routes
	// Bind auth middleware (generic or custom) to * routes, allowing
	// access to the generic signin page if generic auth is used
	if (keystone.get('auth') === true) {
		// TODO: poor separation of concerns; settings should be defaulted elsewhere
		if (!keystone.get('signout url')) {
			keystone.set('signout url', '/' + keystone.get('admin path') + '/signout');
		}
		if (!keystone.get('signin url')) {
			keystone.set('signin url', '/' + keystone.get('admin path') + '/signin');
		}
		if (!keystone.nativeApp || !keystone.get('session')) {
			router.all('*', keystone.session.persist);
		}
		router.all('/signin', require('../routes/signin'));
		router.all('/signout', require('../routes/signout'));
		router.use(keystone.session.keystoneAuth);
	} else if (typeof keystone.get('auth') === 'function') {
		router.use(keystone.get('auth'));
	}

	// #3: Home route
	router.get('/', require('../routes/index'));

	// #4: Cloudinary and S3 specific APIs
	// TODO: poor separation of concerns; should / could this happen elsewhere?
	if (keystone.get('cloudinary config')) {
		router.get('/api/cloudinary/get', require('../api/cloudinary').get);
		router.get('/api/cloudinary/autocomplete', require('../api/cloudinary').autocomplete);
		router.post('/api/cloudinary/upload', require('../api/cloudinary').upload);
		router.post('/api/cloudinary/uploadjquery', require('../api/cloudinary').uploadjquery);
	}
	if (keystone.get('s3 config')) {
		router.post('/api/s3/upload', require('../api/s3').upload);
		router.post('/api/s3/uploadjquery', require('../api/s3').uploadjquery);
	}

	// #5: Core Lists API
	var initList = require('../middleware/initList')(keystone);

	// Init API request helpers
	router.use('/api', require('../middleware/apiError'));
	router.use('/api', require('../middleware/logError'));
 
	// Init req with list
	var initList = require('../middleware/initList')(keystone);
	var accessControl = require('../middleware/accessControl')(keystone);

	// Legacy API endpoints
	router.post('/api/legacy/:list/create', initList(), require('../api/list/legacyCreate'));
	router.post('/api/legacy/:list/:id', initList(), require('../api/item/legacyUpdate'));
	
	// lists
	router.all('/api/counts', require('../api/counts'));
	router.get('/api/:list', initList(), require('../api/list/get'));
	router.get('/api/:list/:format(export.csv|export.json)', initList(), require('../api/list/download'));
	router.post('/api/:list/create', initList(), accessControl('itemCreate'), require('../api/list/create'));
	router.post('/api/:list/update', initList(), accessControl('itemSave'), require('../api/list/update'));
	router.post('/api/:list/delete', initList(), accessControl('itemDelete'), require('../api/list/delete'));
	// items
	router.get('/api/:list/:id', initList(), require('../api/item/get'));
	router.post('/api/:list/:id', initList(), accessControl('itemSave'), require('../api/item/update'));
	router.post('/api/:list/:id/delete', initList(), accessControl('itemDelete'), require('../api/list/delete'));
	router.post('/api/:list/:id/sortOrder/:sortOrder/:newOrder', initList(), require('../api/item/sortOrder'));

	// #6: List Routes
	router.all('/:list/:page([0-9]{1,5})?', initList(true), accessControl('accessList'), require('../routes/index'));
	router.all('/:list/:item', initList(true), accessControl('accessItem'), require('../routes/index'));

	// TODO: catch 404s and errors with Admin-UI specific handlers

	return router;
};
