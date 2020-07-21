/**
 * skylark-widgets-texts - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-texts/
 * @license MIT
 */
define(["skylark-langx-numbers/Vector2","skylark-widgets-base/Widget","./texts"],function(t,e,s){"use strict";var i=e.inherit({_construct:function(t){e.prototype._construct.call(this,t,"div");var s=this.getSkin();this._elm.style.pointerEvents="none",this._elm.style.color=s.textColor,this._elm.style.display="flex",this.span=document.createElement("span"),this.span.style.overflow="hidden",this._elm.appendChild(this.span),this.text=document.createTextNode(""),this.span.appendChild(this.text),this.fitContent=!1,this.allowWordBreak(!1),this.setVerticalAlignment(Text.CENTER),this.setAlignment(Text.CENTER)},setFont:function(t,e,s){this.span.style.fontFamily=t,void 0!==e&&(this.span.style.fontWeight=e),void 0!==s&&(this.span.style.fontStyle=s)},allowWordBreak:function(t){!0===t?(this.span.style.whiteSpace="normal",this.span.style.wordBreak="break-word"):(this.span.style.whiteSpace="pre",this.span.style.wordBreak="normal")},setText:function(t){this.text.data=t},setTextBorder:function(t,e){this.span.style.textShadow="-"+t+"px 0 "+e+", 0 "+t+"px "+e+", "+t+"px 0 "+e+", 0 -"+t+"px "+e},setTextSize:function(t){this._elm.style.fontSize=t+"px"},setTextColor:function(t){this.span.style.color=t},setOverflow:function(t){t===Text.ELLIPSIS?(this.span.style.whiteSpace="nowrap",this.span.style.textOverflow="ellipsis"):(this.span.style.whiteSpace="pre",this.span.style.textOverflow="clip")},setAlignment:function(t){t===Text.CENTER?(this._elm.style.justifyContent="center",this._elm.style.textAlign="center"):t===Text.LEFT?(this._elm.style.justifyContent="flex-start",this._elm.style.textAlign="left"):t===Text.RIGHT&&(this._elm.style.justifyContent="flex-end",this._elm.style.textAlign="right")},setVerticalAlignment:function(t){t===Text.CENTER?this._elm.style.alignItems="center":t===Text.TOP?this._elm.style.alignItems="flex-start":t===Text.BOTTOM&&(this._elm.style.alignItems="flex-end")},measure:function(){return new t(this.span.offsetWidth,this.span.offsetHeight)},setMargin:function(t){this.span.style.margin=t+"px"},_updateVisibility:function(){this._elm.style.display=this.visible?"flex":"none"},_updateSize:function(){this.fitContent&&(this.size.x=this.span.clientWidth,this.size.y=this.span.clientHeight),e.prototype._updateSize.call(this)}});return i.CENTER=0,i.LEFT=1,i.RIGHT=2,i.TOP=3,i.BOTTOM=4,i.CLIP=10,i.ELLIPSIS=11,s.StaticText=i});
//# sourceMappingURL=sourcemaps/StaticText.js.map