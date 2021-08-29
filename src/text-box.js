define([
	"skylark-widgets-base/widget",
	"./texts"	
],function(Widget,texts){
	"use strict";

	/**
	 * text input widget.
	 * 
	 * @class TextBox
	 * @extends {Component}
	 * @param {Component} parent Parent widget.
	 */
	var TextBox = Widget.inherit({

		_construct : function (parent) {
			Widget.prototype._construct.call(this, parent, "input");

			var skin = this.getSkin();

			this._elm.type = "text";
			//this._elm.style.backgroundColor = Editor.theme.boxColor;
			this._elm.style.backgroundColor = skin.boxColor;
			this._elm.style.color = skin.textColor;
			this._elm.style.margin = "0";
			this._elm.style.outline = "none";
			this._elm.style.borderStyle = "none";
			this._elm.style.boxSizing = "border-box";
			this._elm.style.textIndent = "4px";
			this._elm.style.borderRadius = "4px";

			var self = this;
			
			/*
			this._elm.oncontextmenu = function(event) {
				var context = new ContextMenu(DocumentBody);
				context.size.set(130, 20);
				context.position.set(event.clientX, event.clientY);
				context.addOption(Locale.copy, function()
				{
					var value = self.element.value;
					Editor.clipboard.set(value.slice(self.element.selectionStart, self.element.selectionEnd), "text");
				});
				context.addOption(Locale.cut, function()
				{
					var value = self.element.value;
					Editor.clipboard.set(value.slice(self.element.selectionStart, self.element.selectionEnd), "text");
					self.element.value = value.slice(0, self.element.selectionStart) + value.slice(self.element.selectionEnd, value.length);
				});
				context.addOption(Locale.paste, function()
				{
					var value = self.element.value;
					var paste = Editor.clipboard.get("text");
					if(paste !== undefined)
					{
						self.element.value = value.slice(0, self.element.selectionStart) + paste + value.slice(self.element.selectionEnd, value.length);
					}
				});
				context.addOption(Locale.selectAll, function()
				{
					console.log(self.element);
					self.element.select();
				});
				context.updateInterface();
			};
			*/
		},


		/**
		 * Set font configuration to use for the text presented in this component.
		 *
		 * May also affect some types of children components. 
		 * 
		 * @method setFont
		 * @param {string} fontFamily Font family.
		 * @param {number} fontWeight Font weigth, sets how thick or thin characters in text should be displayed.
		 * @param {string} fontStyle Font style, specifies the font style for a text.
		 */
		setFont : function(fontFamily, fontWeight, fontStyle) {
			this._elm.style.fontFamily = fontFamily;

			if(fontWeight !== undefined) {
				this._elm.style.fontWeight = fontWeight;
			}

			if(fontStyle !== undefined)	{
				this._elm.style.fontStyle = fontStyle;
			}
		},

		/**
		 * Set the disabled state of the element.
		 *
		 * @method setDisabled
		 * @param {boolean} disabled
		 */
		setDisabled : function(value) {
			this._elm.disabled = value;
		},

		/**
		 * Set oninput callback called after every letter typed into the box.
		 *
		 * Should be used only for immediate input effect, or can be used with a timeout value to prevent high CPU usage.
		 *
		 * @method setOnInput
		 * @param {Function} onInput Callback method called everytime the user types something.
		 * @param {number} timeout Time (ms) after the user stopped typing to activate the callback.
		 */
		setOnInput : function(onInput, timeout) {
			if(timeout !== undefined) {
				var timer = null;
				var self = this;

				this._elm.oninput = function(event) {
					if(timer !== null) {
						clearTimeout(timer);
						timer = null;
					}

					timer = setTimeout(function(){
						onInput();
						timer = null;
					}, timeout)
				};
			} else 	{
				this._elm.oninput = onInput;
			}
		},

		/**
		 * Set onchange callback, called after changes.
		 *
		 * @method setOnChange
		 * @param {Function} onChange
		 */
		setOnChange : function(onChange) {
			this._elm.onchange = onChange;
		},

		/**
		 * Set value stored in the input element.
		 *
		 * @method setText
		 * @param {Object} text
		 */
		setText : function(text) {
			this._elm.value = text;
		},

		/**
		 * Get text stored in the input element.
		 *
		 * @method getText
		 * @return {string} Text stored in the input element.
		 */
		getText : function() {
			return this._elm.value;
		}
	});

	return texts.TextBox = TextBox;
});