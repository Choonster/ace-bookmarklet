define(function(require, exports, module) {
"use strict";

var oop = require("../oop");
var HtmlHighlightRules = require("./html_highlight_rules").HtmlHighlightRules;
var LuaHighlightRules = require("./lua_highlight_rules").LuaHighlightRules;

var LuaHtmlHighlightRules = function() {
    this.$rules = HtmlHighlightRules().getRules();
    
    var customRules = {
        start: [ {
            token: "luatag-percent",
            regex: "<\\%",
            next: "lua-start"
        },
		{
			token: "luatag-lua",
			regex: "<\\?lua",
			next: "lua-start"
		} ]
    };
    
    this.addRules(customRules, "lua-");
    this.embedRules(LuaHighlightRules, "lua-", [
		{
			token: "keyword1",
			regex: "\\%>",
			next: "start"
		},
		{
			token: "keyword2",
			regex: "\\?>",
			next: "start"
		}
	]);
};

oop.inherits(LuaHtmlHighlightRules, HtmlHighlightRules);

exports.LuaHtmlHighlightRules = LuaHtmlHighlightRules;

});