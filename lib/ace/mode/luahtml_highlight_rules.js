define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var HtmlHighlightRules = require("./html_highlight_rules").HtmlHighlightRules;
var LuaHighlightRules = require("./lua_highlight_rules").LuaHighlightRules;

var LuaHtmlHighlightRules = function() {
    this.$rules = new HtmlHighlightRules().getRules();
    
    for (var i in this.$rules){
        this.$rules[i].unshift({
            token: "luatag-percent",
            regex: "<\\%\\=?",
            next: "lua-start"
        }, {
            token: "luatag-lua",
            regex: "<\\?lua\\=?",
            next: "lua-start"
        });
    }
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