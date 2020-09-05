/**
 * skylark-widgets-texts - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-texts/
 * @license MIT
 */
define(["skylark-widgets-base/Widget","./texts"],function(t,e){"use strict";var l=t.inherit({_construct:function(e){t.prototype._construct.call(this,e,"textarea");var l=this.getSkin();this._elm.style.overflow="auto",this._elm.style.resize="none",this._elm.style.backgroundColor=l.boxColor,this._elm.style.fontFamily=l.font,this._elm.style.color=l.textColor,this._elm.style.outline="none",this._elm.style.borderStyle="none",this._elm.style.boxSizing="border-box",this._elm.style.borderRadius="4px"},setFont:function(t,e,l){this._elm.style.fontFamily=t,void 0!==e&&(this._elm.style.fontWeight=e),void 0!==l&&(this._elm.style.fontStyle=l)},setWrap:function(t){this._elm.wrap=t},setDisabled:function(t){this._elm.disabled=t},setOnInput:function(t,e){if(void 0!==e){var l=null;this._elm.oninput=function(o){null!==l&&(clearTimeout(l),l=null),l=setTimeout(function(){t(),l=null},e)}}else this._elm.oninput=t},setOnChange:function(t){this._elm.onchange=t},setText:function(t){this._elm.value=t},getText:function(){return this._elm.value}});return l.prototype.setValue=l.prototype.setText,l.prototype.getValue=l.prototype.getText,l.SOFT="soft",l.HARD="hard",e.TextArea=l});
//# sourceMappingURL=sourcemaps/TextArea.js.map
