var demand = require('must'),
	HtmlByMediumType = require('../HtmlByMediumType');

exports.initList = function(List) {
	List.add({
		htmlbymedium: { type: HtmlByMediumType },
		nested: {
			htmlbymedium: { type: HtmlByMediumType }
		}
	});
};

exports.createData = function(List) {//eslint-disable-line no-unused-vars

};

exports.testFilters = function(List) {//eslint-disable-line no-unused-vars

};

exports.testFieldType = function(List) {
	var testItem = new List.model();

	it('should update top level fields', function() {
		List.fields.htmlbymedium.updateItem(testItem, {
			htmlbymedium: 'foobar'
		});
		demand(testItem.htmlbymedium).be('foobar');
		testItem.htmlbymedium = undefined;
	});
	
	it('should update nested fields', function() {
		List.fields['nested.htmlbymedium'].updateItem(testItem, {
			nested: {
				htmlbymedium: 'foobar'
			}
		});
		demand(testItem.nested.htmlbymedium).be('foobar');
		testItem.nested.htmlbymedium = undefined;
	});
	
	it('should update nested fields with flat paths', function() {
		List.fields['nested.htmlbymedium'].updateItem(testItem, {
			'nested.htmlbymedium': 'foobar'
		});
		demand(testItem.nested.htmlbymedium).be('foobar');
		testItem.nested.htmlbymedium = undefined;
	});
};
