define([
	"./texts",
	"./text-box"
],function(TextBox){
	"use strict";

	/**
	 * password text input widget.
	 * 
	 * @class PasswordBox
	 * @extends {TextBox}
	 * @param {Widget} parent Parent widget.
	 */
	var PasswordBox = Widget.inherit({

		_construct : function (parent) {
			TextBox.prototype._construct.call(this, parent);

			this._elm.type = "password";
		}
	});

	return texts.PasswordBox = PasswordBox;
});
