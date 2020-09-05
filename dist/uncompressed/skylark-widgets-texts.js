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

define('skylark-widgets-texts/SearchBox',[
	"skylark-widgets-base/Widget",
	"skylark-widgets-base/ImagePane",
	"./texts",
	"./TextBox"
],function(
	Widget,
	ImagePane,
	texts,
	TextBox
){
	"use strict";

	/**
	 * Search box input element.
	 * 
	 * @class SearchBox
	 * @extends {Widget}
	 * @param {Widget} parent Parent element.
	 */
	var SearchBox = Widget.inherit({
		"klassName" : "SearchBox",
		"_construct" : function(parent)	{
			Widget.prototype._construct.call(this, parent, "div");

			/**
			 * Input text box of the search box.
			 *
			 * @property search
			 * @type {TextBox}
			 */
			this.search = new TextBox(this);
			this.search.setMode(Widget.TOP_RIGHT);


			//this.search.element.placeholder = Locale.search;

			/**
			 * Search icon.
			 *
			 * @property searchIcon
			 * @type {DOM}
			 */
			this.searchIcon = new ImagePane(this);
			var skin = this.getSkin();
			//this.searchIcon.setImage(Global.FILE_PATH + "icons/misc/search.png");
			this.searchIcon.setImage(skin.searchIconUrl);
		},

		setOnChange : function(callback) {
			this.search.setOnInput(callback, 100);
		},

		updateSize : function() {
			Widget.prototype.updateSize.call(this);

			this.searchIcon.size.set(this.size.y * 0.6, this.size.y * 0.6);
			this.searchIcon.position.set(this.size.y * 0.2, this.size.y * 0.2);
			this.searchIcon.updateInterface();

			this.search.size.set(this.size.x - this.size.y * 1.4, this.size.y * 0.8);
			this.search.position.set(this.size.y * 0.2, this.size.y * 0.1);
			this.search.updateInterface();
		}
	});

	return texts.SearchBox = SearchBox;
});
define('skylark-widgets-texts/TextLabel',[
	"skylark-widgets-base/Widget",
	"skylark-widgets-base/mixins/TextMixin",
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
	"./SearchBox",
	"./TextLabel",
	"./TextArea",
	"./TextBox"
],function(texts){
	return texts;
});
define('skylark-widgets-texts', ['skylark-widgets-texts/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-widgets-texts.js.map
