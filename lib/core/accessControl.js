/**
 * Verify access
 */

var _ = require('lodash');

module.exports = function(list, type, user){
    var keystone = this;
    if (!keystone.get('admin access control') || !list.options.acl) return true;
    else{
        var roles = list.options.acl[type];
        var role = user[keystone.get('admin access control')];
    	return _.includes(roles, '*') || _.chain(roles).split(' ').includes(role).value();
    }
}