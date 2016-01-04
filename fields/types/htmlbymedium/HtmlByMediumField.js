import _ from 'underscore';
import Field from '../Field';
import React from 'react';
import { FormInput } from 'elemental';

/**
 * TODO:
 * - Remove dependency on underscore
 */

var lastId = 0;

function getId() {
	return 'keystone-htmlmedium-' + lastId++;
}

module.exports = Field.create({

	displayName: 'HtmlMediumField',

	getInitialState () {
		return {
			id: getId(),
			isFocused: false
		};
	},

	initWysiwyg () {
		if (!this.props.wysiwyg) return;

		this._currentValue = this.props.value;
		this.editor = new MediumEditor("#"+this.state.id, this.getMediumEditorOptions());
		var self = this;
		if (this.props.extra == 'mediumInsert'){
			$(function () {
				var opt_mediumInsert = self.getMediumInsertOptions();
				opt_mediumInsert.editor = self.editor;
				$("#"+self.state.id).mediumInsert(opt_mediumInsert);
			});
		}
	},

	componentDidUpdate (prevProps, prevState) {
		if (prevState.isCollapsed && !this.state.isCollapsed) {
			this.initWysiwyg();
		}

		if (_.isEqual(this.props.dependsOn, this.props.currentDependencies)
			&& !_.isEqual(this.props.currentDependencies, prevProps.currentDependencies)) {
			this.initWysiwyg();
		}
	},

	componentDidMount () {
		this.initWysiwyg();
	},

	componentWillReceiveProps (nextProps) {
		if (this.editor && this._currentValue !== nextProps.value) {
			this.editor.innerHTML = nextProps.value;
		}
	},

	focusChanged (focused) {
		this.setState({
			isFocused: focused
		});
	},

	valueChanged  () {
		var content;
		console.log("valueChanged");
		if (this.editor) {
			content = this.editor.innerHTML;
		} else if (this.refs.editor) {
			content = this.refs.editor.getDOMNode().value;
		} else {
			return;
		}

		this._currentValue = content;
		this.props.onChange({
			path: this.props.path,
			value: content
		});
	},
	
	getMediumInsertOptions () {
		var options = Object.assign(
				{},
				Keystone.wysiwyg.options,
				this.props.wysiwyg
			);
		var opts = {
			addons: {
				images: {
                    uploadScript: null,
                    deleteScript: null,
                    actions: null,
                    fileUploadOptions: {}
				}
			}
	        
		};
		opts.addons.images.fileUploadOptions.url = options.enableS3Uploads ?
			Keystone.adminPath + '/api/s3/uploadjquery' :
			Keystone.adminPath + '/api/cloudinary/uploadjquery';
		
		return opts;
	},
	
	getMediumEditorOptions () {
		var opts = {
            buttonLabels: 'fontawesome',
		    toolbar: {
		        /* These are the default options for the toolbar,
		           if nothing is passed this is what is used */
		        allowMultiParagraphSelection: true,
		        buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote', 
		        'orderedlist', 'unorderedlist', 'indent', 'outdent', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
		        diffLeft: 0,
		        diffTop: -10,
		        firstButtonClass: 'medium-editor-button-first',
		        lastButtonClass: 'medium-editor-button-last',
		        standardizeSelectionStart: false,
		        static: false,
		        relativeContainer: null,
		        /* options which only apply when static is true */
		        align: 'center',
		        sticky: false,
		        updateOnEmptySelection: false
		    }
		};
		
		return opts;
	},

	getFieldClassName () {
		var className = this.props.wysiwyg ? 'wysiwyg' : 'code';
		return className;
	},

	renderField () {
		var className = this.state.isFocused ? 'is-focused' : '';
		var style = {
			height: '1%',
			overflow: 'hidden',
			minHeight: this.props.height
		};
		return (
			<div className={className}>
				<FormInput multiline ref="editor" style={style} onChange={this.valueChanged} id={this.state.id} className={this.getFieldClassName()} name={this.props.path} value={this.props.value} />
			</div>
		);
	},

	renderValue () {
		return <FormInput multiline noedit value={this.props.value} />;
	}

});
