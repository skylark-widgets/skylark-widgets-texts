define([
	"skylark-widgets-base/widget",
	"skylark-widgets-base/mixins/text-mixin",
	"./texts"
],function(
	Widget,
	TextMixin,
	texts
){
	"use strict";

	/**
	 * Text element without background.
	 * 
	 * @class Text
	 * @extends {Widget}
	 * @param {Widget} parent Parent widget.
	 */

	var TextLabel = Widget.inherit({

		_construct : function (parent) {
			Widget.prototype._construct.call(this, parent, "div");

			this._buildTextSpan();
		},


		...TextMixin

	});

	TextLabel.CENTER = TextMixin.CENTER; // 0;
	TextLabel.LEFT = TextMixin.LEFT; // 1;
	TextLabel.RIGHT = TextMixin.RIGHT; // 2;
	TextLabel.TOP = TextMixin.TOP; // 3;
	TextLabel.BOTTOM = TextMixin.BOTTOM; // 4;

	TextLabel.CLIP = TextMixin.CLIP; // 10;
	TextLabel.ELLIPSIS = TextMixin.ELLIPSIS; //11;

	return texts.TextLabel = TextLabel;
});