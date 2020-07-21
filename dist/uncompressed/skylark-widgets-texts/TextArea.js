define([
	"skylark-widgets-base/Widget",
	"./texts"	
],function(Widget,texts){
	"use strict";

	/**
	 * Text area input is used to handle multi line string values.
	 *
	 * @class TextArea
	 * @extends {Component}
	 */
	var TextArea = Widget.inherit({

		_construct : function (parent) {
			Widget.prototype._construct.call(this, parent, "textarea");

			var skin = this.getSkin();

			this._elm.style.overflow = "auto";
			this._elm.style.resize = "none";
			//this._elm.style.backgroundColor = Editor.theme.boxColor;
			//this._elm.style.fontFamily = Editor.theme.font;
			//this._elm.style.color = Editor.theme.textColor;
			this._elm.style.backgroundColor = skin.boxColor;
			this._elm.style.fontFamily = skin.font;
			this._elm.style.color = skin.textColor;
			this._elm.style.outline = "none";
			this._elm.style.borderStyle = "none";
			this._elm.style.boxSizing = "border-box";
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
				context.addOption(Locale.cut, function(){
					var value = self.element.value;
					Editor.clipboard.set(value.slice(self.element.selectionStart, self.element.selectionEnd), "text");
					self.element.value = value.slice(0, self.element.selectionStart) + value.slice(self.element.selectionEnd, value.length);
				});
				context.addOption(Locale.paste, function() {
					var value = self.element.value;
					var paste = Editor.clipboard.get("text");
					if(paste !== undefined)
					{
						self.element.value = value.slice(0, self.element.selectionStart) + paste + value.slice(self.element.selectionEnd, value.length);
					}
				});
				context.addOption(Locale.selectAll, function() {
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
		setFont : function(fontFamily, fontWeight, fontStyle){
			this._elm.style.fontFamily = fontFamily;

			if(fontWeight !== undefined) {
				this._elm.style.fontWeight = fontWeight;
			}

			if(fontStyle !== undefined) {
				this._elm.style.fontStyle = fontStyle;
			}
		},

		/**
		 * Set the wrap mode used for this text area.
		 *
		 * Only affects the value on form submission.
		 *
		 * @method setWrap
		 * @param {string} mode The wrap mode to use.
		 */
		setWrap : function(mode) {
			this._elm.wrap = mode;
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

					timer = setTimeout(function() {
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

	/**
	 * Set value stored in the input element. Same as setText().
	 *
	 * @method setValue
	 * @param {Object} text
	 */
	TextArea.prototype.setValue = TextArea.prototype.setText;

	/**
	 * Get text stored in the input element. Same as getText().
	 *
	 * @method getValue
	 * @return {string} Text stored in the input element.
	 */
	TextArea.prototype.getValue = TextArea.prototype.getText;


	/**
	 * The text in the textarea is not wrapped. This is default.
	 *
	 * @static
	 * @attribute SOFT
	 * @type {string}
	 */
	TextArea.SOFT = "soft";

	/**
	 * The text in the textarea is wrapped (contains newlines).
	 *
	 * When "hard" is used, the cols attribute must be specified.
	 *
	 * @static
	 * @attribute HARD
	 * @type {string}
	 */
	TextArea.HARD = "hard";

	return texts.TextArea = TextArea;
});