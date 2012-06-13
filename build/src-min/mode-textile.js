define("ace/mode/textile",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/textile_highlight_rules","ace/mode/matching_brace_outdent"],function(require,exports,module){var oop=require("../lib/oop"),TextMode=require("./text").Mode,Tokenizer=require("../tokenizer").Tokenizer,TextileHighlightRules=require("./textile_highlight_rules").TextileHighlightRules,MatchingBraceOutdent=require("./matching_brace_outdent").MatchingBraceOutdent,Mode=function(){this.$tokenizer=new Tokenizer((new TextileHighlightRules).getRules()),this.$outdent=new MatchingBraceOutdent};oop.inherits(Mode,TextMode),function(){this.getNextLineIndent=function(state,line,tab){return state=="intag"?tab:""},this.checkOutdent=function(state,line,input){return this.$outdent.checkOutdent(line,input)},this.autoOutdent=function(state,doc,row){this.$outdent.autoOutdent(doc,row)}}.call(Mode.prototype),exports.Mode=Mode}),define("ace/mode/textile_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(require,exports,module){var oop=require("../lib/oop"),TextHighlightRules=require("./text_highlight_rules").TextHighlightRules,TextileHighlightRules=function(){this.$rules={start:[{token:function(value){return value.match(/^h\d$/)?"markup.heading."+value.charAt(1):"markup.heading"},regex:"h1|h2|h3|h4|h5|h6|bq|p|bc|pre",next:"blocktag"},{token:"keyword",regex:"[\\*]+|[#]+"},{token:"text",regex:".+"}],blocktag:[{token:"keyword",regex:"\\. ",next:"start"},{token:"keyword",regex:"\\(",next:"blocktagproperties"}],blocktagproperties:[{token:"keyword",regex:"\\)",next:"blocktag"},{token:"string",regex:"[a-zA-Z0-9\\-_]+"},{token:"keyword",regex:"#"}]}};oop.inherits(TextileHighlightRules,TextHighlightRules),exports.TextileHighlightRules=TextileHighlightRules}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(require,exports,module){var Range=require("../range").Range,MatchingBraceOutdent=function(){};(function(){this.checkOutdent=function(line,input){return/^\s+$/.test(line)?/^\s*\}/.test(input):!1},this.autoOutdent=function(doc,row){var line=doc.getLine(row),match=line.match(/^(\s*\})/);if(!match)return 0;var column=match[1].length,openBracePos=doc.findMatchingBracket({row:row,column:column});if(!openBracePos||openBracePos.row==row)return 0;var indent=this.$getIndent(doc.getLine(openBracePos.row));doc.replace(new Range(row,0,row,column-1),indent)},this.$getIndent=function(line){var match=line.match(/^(\s+)/);return match?match[1]:""}}).call(MatchingBraceOutdent.prototype),exports.MatchingBraceOutdent=MatchingBraceOutdent})