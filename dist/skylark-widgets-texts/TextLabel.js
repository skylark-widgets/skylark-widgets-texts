/**
 * skylark-widgets-texts - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-texts/
 * @license MIT
 */
define(["skylark-widgets-base/Widget","skylark-widgets-base/mixins/TextMixin","./texts"],function(t,i,e){"use strict";var T=t.inherit({_construct:function(i){t.prototype._construct.call(this,i,"div"),this._buildTextSpan()},...i});return T.CENTER=i.CENTER,T.LEFT=i.LEFT,T.RIGHT=i.RIGHT,T.TOP=i.TOP,T.BOTTOM=i.BOTTOM,T.CLIP=i.CLIP,T.ELLIPSIS=i.ELLIPSIS,e.TextLabel=T});
//# sourceMappingURL=sourcemaps/TextLabel.js.map
