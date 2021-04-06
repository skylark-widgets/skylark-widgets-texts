define([
	"skylark-widgets-base/Widget",
	"skylark-widgets-base/panels/Panel",
	"skylark-widgets-base/ImagePane",
	"./texts",
	"./TextBox"
],function(
	Widget,
	Panel,
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
	var SearchBox = Panel.inherit({
		"klassName" : "SearchBox",
		"_construct" : function(parent)	{
			Panel.prototype._construct.call(this, parent, "div");

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
			this.searchIcon.setImage(skin.searchIconUrl);
		},

		setOnChange : function(callback) {
			this.search.setOnInput(callback, 100);
		},

		updateSize : function() {
			Panel.prototype.updateSize.call(this);

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