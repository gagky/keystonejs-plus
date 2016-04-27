/**
 * Initialises Keystone's internal nav config
 *
 * @param {Object} nav
 * @api private
 */

var _ = require('lodash');
var utils = require('keystone-utils');
var debug = require('debug')('knav:debug');
var i18n = require('i18n');

module.exports = function initNav (sections) {
	var keystone = this;

	var nav = {
		sections: [],
		by: {
			list: {},
			section: {},
		},
	};

	if (!sections) {
		sections = {};
		nav.flat = true;
		_.forEach(this.lists, function (list) {
			if (list.get('hidden')) return;
			sections[list.path] = [list.path];
		});
	}

	_.forEach(sections, function (section, key) {
		if (typeof section === 'string') {
			section = [section];
		}
		section = {
			lists: section,
			label: nav.flat ? keystone.list(section[0]).label : utils.keyToLabel(key),
		};
		section.key = key;
		section.lists = _.map(section.lists, function (i) {
			if (_.isString(i)) {
				var list = keystone.list(i);
				if (!list) {
					throw new Error('Invalid Keystone Option (nav): list ' + i + ' has not been defined.\n');
				}
				if (list.get('hidden')) {
					throw new Error('Invalid Keystone Option (nav): list ' + i + ' is hidden.\n');
				}
				nav.by.list[list.key] = section;
				return {
					key: list.key,
					label: list.label,
					path: list.path,
					acl: list.options.acl
				};
			} else if (_.isObject(i)) {
				if (!_.has(i, 'key')) {
					throw new Error('Invalid Keystone Option (nav): object ' + i + ' requires a "key" property.\n');
				}
				i.label = i.label || utils.keyToLabel(key);
				i.path = i.path || utils.keyToPath(key);
				i.external = true;
				nav.by.list[i.key] = section;
				return i;
			}
			throw new Error('Invalid Keystone Option (nav): ' + i + ' is in an unrecognized format.\n');
		});
		if (section.lists.length) {
			nav.sections.push(section);
			nav.by.section[section.key] = section;
		}
	});
	
	if (!!keystone.get('admin access control')){
		var roles = keystone.list(keystone.get('user model')).schema.paths[keystone.get('admin access control')].options.enum;
		nav.by.role = {};
		_.forEach(roles, function(role){
			debug('=='+role+'==')
			var sections = _.cloneDeep(nav.sections);
			sections = _.chain(sections).filter(function(value, key, object){
		    	value.label = i18n.__(_.template("admin.nav.${ key }")({key: value.key}));
		    	value.lists = _.chain(value.lists).filter(function(list, k){
		    		return !list.acl || 
		    			!list.acl.accessList || 
		    			_.includes(list.acl.accessList, '*') || 
		    			_.chain(list.acl.accessList).split(/[,|\s]/).includes(role).value();
		    	}).value();
		    	if (value.lists.length > 0){
					debug('> '+value.label)
					_.forEach(value.lists, function(list){
						debug('>> '+list.key)
					})
		    	}
		    	return value.lists.length > 0;
		    }).value();
			nav.by.role[role] = sections;
		})
	}

	return nav;
};
