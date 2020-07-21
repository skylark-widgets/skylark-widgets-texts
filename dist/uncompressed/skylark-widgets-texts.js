/**
 * skylark-widgets-texts - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-texts/
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx-ns");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-widgets-texts/texts',[
	"skylark-langx/skylark"
],function(skylark) {
	var texts = {};

	return skylark.attach("widgets.texts",texts);

});


define('skylark-widgets-texts/TextBox',[
	"skylark-widgets-base/Widget",
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
define('skylark-widgets-texts/PasswordBox',[
	"./texts",
	"./TextBox"
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

define('skylark-widgets-texts/StaticText',[
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
define('skylark-widgets-texts/TextArea',[
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
define('skylark-widgets-texts/main',[
	"./texts",
	"./PasswordBox",
	"./StaticText",
	"./TextArea",
	"./TextBox"
],function(texts){
	return texts;
});
define('skylark-widgets-texts', ['skylark-widgets-texts/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-widgets-texts.js.map
