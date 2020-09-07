/**
 * skylark-widgets-texts - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-texts/
 * @license MIT
 */
define(["skylark-widgets-base/Widget","./texts"],function(t,e){"use strict";var n=t.inherit({_construct:function(e){t.prototype._construct.call(this,e,"input");var n=this.getSkin();this._elm.type="text",this._elm.style.backgroundColor=n.boxColor,this._elm.style.color=n.textColor,this._elm.style.margin="0",this._elm.style.outline="none",this._elm.style.borderStyle="none",this._elm.style.boxSizing="border-box",this._elm.style.textIndent="4px",this._elm.style.borderRadius="4px"},setFont:function(t,e,n){this._elm.style.fontFamily=t,void 0!==e&&(this._elm.style.fontWeight=e),void 0!==n&&(this._elm.style.fontStyle=n)},setDisabled:function(t){this._elm.disabled=t},setOnInput:function(t,e){if(void 0!==e){var n=null;this._elm.oninput=function(i){null!==n&&(clearTimeout(n),n=null),n=setTimeout(function(){t(),n=null},e)}}else this._elm.oninput=t},setOnChange:function(t){this._elm.onchange=t},setText:function(t){this._elm.value=t},getText:function(){return this._elm.value}});return e.TextBox=n});
//# sourceMappingURL=sourcemaps/TextBox.js.map
