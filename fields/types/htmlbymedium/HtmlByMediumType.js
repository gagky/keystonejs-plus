var FieldType = require('../Type');
var TextType = require('../text/TextType');
var util = require('util');

/**
 * HTML FieldType Constructor
 * @extends Field
 * @api public
 */
function htmlbymedium(list, path, options) {
	this._nativeType = String;
	this._defaultSize = 'full';
	this.wysiwyg = options.wysiwyg || false;
	this.height = options.height || 180;
	this._properties = ['wysiwyg', 'height'];
	htmlbymedium.super_.call(this, list, path, options);
}
util.inherits(htmlbymedium, FieldType);

/* Inherit from TextType prototype */
htmlbymedium.prototype.addFilterToQuery = TextType.prototype.addFilterToQuery;

/* Export Field Type */
module.exports = htmlbymedium;
