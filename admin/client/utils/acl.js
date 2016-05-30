/**
 * Verify access
 */

var _ = require('lodash');

exports.checkAllow = function(acl, right, role){
    var roles = acl ? acl[right] : '*';
	return _.includes(roles, '*') || _.chain(roles).split(/[,|\s]/).includes(role).value();
}