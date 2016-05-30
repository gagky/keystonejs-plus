/**
 * Verify access
 */

var _ = require('lodash');

exports.checkAllow = function(acl, right, role){
    var roles = !acl || _.isString(acl) ? acl : acl[right];
	return !roles || _.includes(roles, '*') || _.chain(roles).split(/[,|\s]/).includes(role).value();
}