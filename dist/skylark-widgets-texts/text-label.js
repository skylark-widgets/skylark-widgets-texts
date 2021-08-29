/**
 * skylark-widgets-texts - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-texts/
 * @license MIT
 */
define(["skylark-widgets-base/widget","skylark-widgets-base/mixins/text-mixin","./texts"],function(t,i,e){"use strict";var s=t.inherit({_construct:function(i){t.prototype._construct.call(this,i,"div"),this._buildTextSpan()},...i});return s.CENTER=i.CENTER,s.LEFT=i.LEFT,s.RIGHT=i.RIGHT,s.TOP=i.TOP,s.BOTTOM=i.BOTTOM,s.CLIP=i.CLIP,s.ELLIPSIS=i.ELLIPSIS,e.TextLabel=s});
//# sourceMappingURL=sourcemaps/text-label.js.map
