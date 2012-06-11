define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var HtmlMode = require("./html").Mode;
var LuaMode = require("./lua").Mode;
var Tokenizer = require("../tokenizer").Tokenizer;
var LuaHtmlHighlightRules = require("./luahtml_highlight_rules").LuaHtmlHighlightRules;

var Mode = function() {
    var highlighter = new LuaHtmlHighlightRules();
    
    this.$tokenizer = new Tokenizer(new LuaHtmlHighlightRules().getRules());
    this.$embeds = highlighter.getEmbeds();
    this.createModeDelegates({
        "lua-": LuaMode
    });
};
oop.inherits(Mode, HtmlMode);

/*(function() {
    // Extra logic goes here. (see below)
}).call(Mode.prototype);
*/

exports.Mode = Mode;
});