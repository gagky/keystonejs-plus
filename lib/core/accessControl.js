/**
 * Verify access
 */

var _ = require('lodash');

module.exports = function(list, type, user){
    var keystone = this;
    if (!keystone.get('admin access control') || !list.options.acl) return true;
    else{
        var roles = _.isString(list) ? list: list.options.acl[type];
        var role = _.isString(user) ? user: user[keystone.get('admin access control')];
    	return _.includes(roles, '*') || _.chain(roles).split(/[,|\s]/).includes(role).value();
    }
}