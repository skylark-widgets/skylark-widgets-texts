/**
 * skylark-widgets-texts - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-texts/
 * @license MIT
 */
define(["skylark-widgets-base/widget","skylark-widgets-base/panels/panel","skylark-widgets-base/image-pane","./texts","./text-box"],function(s,e,t,i,h){"use strict";var a=e.inherit({klassName:"SearchBox",_construct:function(i){e.prototype._construct.call(this,i,"div"),this.search=new h(this),this.search.setMode(s.TOP_RIGHT),this.searchIcon=new t(this);var a=this.getSkin();this.searchIcon.setImage(a.searchIconUrl),this.searchIcon.setImage(a.searchIconUrl)},setOnChange:function(s){this.search.setOnInput(s,100)},updateSize:function(){e.prototype.updateSize.call(this),this.searchIcon.size.set(.6*this.size.y,.6*this.size.y),this.searchIcon.position.set(.2*this.size.y,.2*this.size.y),this.searchIcon.updateInterface(),this.search.size.set(this.size.x-1.4*this.size.y,.8*this.size.y),this.search.position.set(.2*this.size.y,.1*this.size.y),this.search.updateInterface()}});return i.SearchBox=a});
//# sourceMappingURL=sourcemaps/search-box.js.map
