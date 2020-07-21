define([
	"skylark-langx-numbers/Vector2",
	"skylark-widgets-base/Widget",
	"./texts"
],function(
	Vector2,
	Widget,
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

	var StaticText = Widget.inherit({

		_construct : function (parent) {
			Widget.prototype._construct.call(this, parent, "div");

			var skin = this.getSkin();

			this._elm.style.pointerEvents = "none";
			//this._elm.style.color = Editor.theme.textColor;
			this._elm.style.color = skin.textColor;
			this._elm.style.display = "flex";

			/** 
			 * Span DOM element used to represent the text.
			 *
			 * @attribute span
			 * @type {DOM}
		 	 */
			this.span = document.createElement("span");
			this.span.style.overflow = "hidden";
			this._elm.appendChild(this.span);

			//Text
			this.text = document.createTextNode("");
			this.span.appendChild(this.text);

			/**
			 * If set to true the text container will automatically fit the text size.
			 *
			 * @attribute fitContent
			 * @type {Boolean}
			 */
			this.fitContent = false;

			this.allowWordBreak(false);
			this.setVerticalAlignment(Text.CENTER);
			this.setAlignment(Text.CENTER);
		},


		/**
		 * Set font to use for the text.
		 * 
		 * @method setFont
		 * @param {String} fontFamily Font family.
		 * @param {Number} fontWeight Font weigth, sets how thick or thin characters in text should be displayed.
		 * @param {String} fontStyle Font style, specifies the font style for a text.
		 */
		setFont : function(fontFamily, fontWeight, fontStyle) {
			this.span.style.fontFamily = fontFamily;

			if(fontWeight !== undefined) {
				this.span.style.fontWeight = fontWeight;
			}

			if(fontStyle !== undefined) {
				this.span.style.fontStyle = fontStyle;
			}
		},

		/**
		 * Enable of disable word breaking.
		 *
		 * @method allowWordBreak
		 * @param {Boolean} line If true words can be breaked.
		 */
		allowWordBreak : function(value) {
			if(value === true) {
				this.span.style.whiteSpace = "normal";
				this.span.style.wordBreak = "break-word";
			} else 	{
				this.span.style.whiteSpace = "pre";
				this.span.style.wordBreak = "normal";
			}
		},

		/**
		 * Set text.
		 *
		 * @method setText
		 * @param {String} text Text. 
		 */
		setText : function(text){
			this.text.data = text;
		},

		/**
		 * Set text border.
		 *
		 * @method setTextBorder
		 * @param {Number} size Border size in pixels.
		 * @param {String} color CSS Color. 
		 */
		setTextBorder : function(size, color) {
			this.span.style.textShadow = "-" + size + "px 0 " + color + ", 0 " + size + "px " + color + ", " + size + "px 0 " + color + ", 0 -" + size + "px " + color;
		},

		/**
		 * Set Text size, in pixels.
		 * 
		 * @method setTextSize
		 * @param {Number} size Size in pixel for this text element.
		 */
		setTextSize : function(size) {
			this._elm.style.fontSize = size + "px";
		},

		/**
		 * Set text color.
		 * 
		 * @method setTextColor
		 * @param {String} color Color code.
		 */
		setTextColor : function(color) {
			this.span.style.color = color;
		},

		/**
		 * Set text overflow handling
		 *
		 * @method setOverflow
		 * @param {Number} overflow
		 */
		setOverflow : function(overflow) {
			if(overflow === Text.ELLIPSIS) {
				this.span.style.whiteSpace = "nowrap";
				this.span.style.textOverflow = "ellipsis";
			} else 	{
				this.span.style.whiteSpace = "pre";
				this.span.style.textOverflow = "clip";
			}
		},

		/**
		 * Set text horizontal alignment.
		 *  - Text.CENTER
		 *  - Text.LEFT
		 *  - Text.RIGHT
		 * 
		 * @method setAlignment
		 * @param {Number} align Alingment mode.
		 */
		setAlignment : function(align) 	{
			if(align === Text.CENTER) {
				this._elm.style.justifyContent = "center";
				this._elm.style.textAlign = "center";
			} else if(align === Text.LEFT) {
				this._elm.style.justifyContent = "flex-start";
				this._elm.style.textAlign = "left";
			} else if(align === Text.RIGHT) {
				this._elm.style.justifyContent = "flex-end";
				this._elm.style.textAlign = "right";
			}
		},

		/**
		 * Set text vertical alignment.
		 *  - Text.CENTER
		 *  - Text.TOP
		 *  - Text.BOTTOM
		 * 
		 * @method setVerticalAlignment
		 * @param {Number} align Alingment mode.
		 */
		setVerticalAlignment : function(align) {
			if(align === Text.CENTER) {
				this._elm.style.alignItems = "center";
			} else if(align === Text.TOP) {
		 		this._elm.style.alignItems = "flex-start";
			} else if(align === Text.BOTTOM) {
				this._elm.style.alignItems = "flex-end";
			}
		},

		/**
		 * Get size of the text inside of this component in px.
		 * 
		 * @method measure
		 * @return {Vector2} A vector with the size of the text. 
		 */
		measure : function() 	{
		 	return new Vector2(this.span.offsetWidth, this.span.offsetHeight);
		},

		/**
		 * Set text internal margin in pixels.
		 * 
		 * @method setMargin
		 * @param {Number} margin Margin size in pixels.
		 */
		setMargin : function(margin) {
			this.span.style.margin = margin + "px";
		},

		_updateVisibility : function() {
			this._elm.style.display = this.visible ? "flex" : "none";
		},

		_updateSize : function() {
			if(this.fitContent) { 
				this.size.x = this.span.clientWidth;
				this.size.y = this.span.clientHeight;
			}
			
			Widget.prototype._updateSize.call(this);
		}

	});

	StaticText.CENTER = 0;
	StaticText.LEFT = 1;
	StaticText.RIGHT = 2;
	StaticText.TOP = 3;
	StaticText.BOTTOM = 4;

	StaticText.CLIP = 10;
	StaticText.ELLIPSIS = 11;

	return texts.StaticText = StaticText;
});