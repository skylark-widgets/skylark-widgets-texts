/**
 * skylark-widgets-texts - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-texts/
 * @license MIT
 */
define(["skylark-widgets-base/Widget","skylark-widgets-base/ImagePane","./texts","./TextBox"],function(s,e,t,i){"use strict";var h=s.inherit({klassName:"SearchBox",_construct:function(t){s.prototype._construct.call(this,t,"div"),this.search=new i(this),this.search.setMode(s.TOP_RIGHT),this.searchIcon=new e(this);var h=this.getSkin();this.searchIcon.setImage(h.searchIconUrl)},setOnChange:function(s){this.search.setOnInput(s,100)},updateSize:function(){s.prototype.updateSize.call(this),this.searchIcon.size.set(.6*this.size.y,.6*this.size.y),this.searchIcon.position.set(.2*this.size.y,.2*this.size.y),this.searchIcon.updateInterface(),this.search.size.set(this.size.x-1.4*this.size.y,.8*this.size.y),this.search.position.set(.2*this.size.y,.1*this.size.y),this.search.updateInterface()}});return t.SearchBox=h});
//# sourceMappingURL=sourcemaps/SearchBox.js.map
