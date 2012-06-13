ace.define("ace/mode/jsx",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/jsx_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(require,exports,module){function Mode(){this.$tokenizer=new Tokenizer((new JsxHighlightRules).getRules()),this.$outdent=new MatchingBraceOutdent,this.$behaviour=new CstyleBehaviour,this.foldingRules=new CStyleFoldMode}var oop=require("../lib/oop"),TextMode=require("./text").Mode,Tokenizer=require("../tokenizer").Tokenizer,JsxHighlightRules=require("./jsx_highlight_rules").JsxHighlightRules,MatchingBraceOutdent=require("./matching_brace_outdent").MatchingBraceOutdent,CstyleBehaviour=require("./behaviour/cstyle").CstyleBehaviour,CStyleFoldMode=require("./folding/cstyle").FoldMode;oop.inherits(Mode,TextMode),function(){this.getNextLineIndent=function(state,line,tab){var indent=this.$getIndent(line),tokenizedLine=this.$tokenizer.getLineTokens(line,state),tokens=tokenizedLine.tokens;if(tokens.length&&tokens[tokens.length-1].type=="comment")return indent;if(state=="start"){var match=line.match(/^.*[\{\(\[]\s*$/);match&&(indent+=tab)}return indent},this.checkOutdent=function(state,line,input){return this.$outdent.checkOutdent(line,input)},this.autoOutdent=function(state,doc,row){this.$outdent.autoOutdent(doc,row)}}.call(Mode.prototype),exports.Mode=Mode}),ace.define("ace/mode/jsx_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(require,exports,module){var oop=require("../lib/oop"),lang=require("../lib/lang"),DocCommentHighlightRules=require("./doc_comment_highlight_rules").DocCommentHighlightRules,TextHighlightRules=require("./text_highlight_rules").TextHighlightRules,JsxHighlightRules=function(){var keywords=lang.arrayToMap("break|do|instanceof|typeof|case|else|new|var|catch|finally|return|void|continue|for|switch|default|while|function|this|if|throw|delete|in|try|class|extends|super|import|from|into|implements|interface|static|mixin|override|abstract|final|number|int|string|boolean|variant|log|assert".split("|")),buildinConstants=lang.arrayToMap("null|true|false|NaN|Infinity|__FILE__|__LINE__|undefined".split("|")),reserved=lang.arrayToMap("debugger|with|const|export|let|private|public|yield|protected|extern|native|as|operator|__fake__|__readonly__".split("|")),identifierRe="[a-zA-Z_][a-zA-Z0-9_]*\\b";this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},DocCommentHighlightRules.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",merge:!0,next:"comment"},{token:"string.regexp",regex:"[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:["storage.type","text","entity.name.function"],regex:"(function)(\\s+)("+identifierRe+")"},{token:function(value){return value=="this"?"variable.language":value=="function"?"storage.type":keywords.hasOwnProperty(value)||reserved.hasOwnProperty(value)?"keyword":buildinConstants.hasOwnProperty(value)?"constant.language":/^_?[A-Z][a-zA-Z0-9_]*$/.test(value)?"language.support.class":"identifier"},regex:identifierRe},{token:"keyword.operator",regex:"!|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|==|=|!=|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[({<]"},{token:"paren.rparen",regex:"[\\])}>]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:".*?\\*\\/",next:"start"},{token:"comment",merge:!0,regex:".+"}]},this.embedRules(DocCommentHighlightRules,"doc-",[DocCommentHighlightRules.getEndRule("start")])};oop.inherits(JsxHighlightRules,TextHighlightRules),exports.JsxHighlightRules=JsxHighlightRules}),ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(require,exports,module){var oop=require("../lib/oop"),TextHighlightRules=require("./text_highlight_rules").TextHighlightRules,DocCommentHighlightRules=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},{token:"comment.doc",merge:!0,regex:"\\s+"},{token:"comment.doc",merge:!0,regex:"TODO"},{token:"comment.doc",merge:!0,regex:"[^@\\*]+"},{token:"comment.doc",merge:!0,regex:"."}]}};oop.inherits(DocCommentHighlightRules,TextHighlightRules),DocCommentHighlightRules.getStartRule=function(start){return{token:"comment.doc",merge:!0,regex:"\\/\\*(?=\\*)",next:start}},DocCommentHighlightRules.getEndRule=function(start){return{token:"comment.doc",merge:!0,regex:"\\*\\/",next:start}},exports.DocCommentHighlightRules=DocCommentHighlightRules}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(require,exports,module){var Range=require("../range").Range,MatchingBraceOutdent=function(){};(function(){this.checkOutdent=function(line,input){return/^\s+$/.test(line)?/^\s*\}/.test(input):!1},this.autoOutdent=function(doc,row){var line=doc.getLine(row),match=line.match(/^(\s*\})/);if(!match)return 0;var column=match[1].length,openBracePos=doc.findMatchingBracket({row:row,column:column});if(!openBracePos||openBracePos.row==row)return 0;var indent=this.$getIndent(doc.getLine(openBracePos.row));doc.replace(new Range(row,0,row,column-1),indent)},this.$getIndent=function(line){var match=line.match(/^(\s+)/);return match?match[1]:""}}).call(MatchingBraceOutdent.prototype),exports.MatchingBraceOutdent=MatchingBraceOutdent}),ace.define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour"],function(require,exports,module){var oop=require("../../lib/oop"),Behaviour=require("../behaviour").Behaviour,CstyleBehaviour=function(){this.add("braces","insertion",function(state,action,editor,session,text){if(text=="{"){var selection=editor.getSelectionRange(),selected=session.doc.getTextRange(selection);return selected!==""?{text:"{"+selected+"}",selection:!1}:{text:"{}",selection:[1,1]}}if(text=="}"){var cursor=editor.getCursorPosition(),line=session.doc.getLine(cursor.row),rightChar=line.substring(cursor.column,cursor.column+1);if(rightChar=="}"){var matching=session.$findOpeningBracket("}",{column:cursor.column+1,row:cursor.row});if(matching!==null)return{text:"",selection:[1,1]}}}else if(text=="\n"){var cursor=editor.getCursorPosition(),line=session.doc.getLine(cursor.row),rightChar=line.substring(cursor.column,cursor.column+1);if(rightChar=="}"){var openBracePos=session.findMatchingBracket({row:cursor.row,column:cursor.column+1});if(!openBracePos)return null;var indent=this.getNextLineIndent(state,line.substring(0,line.length-1),session.getTabString()),next_indent=this.$getIndent(session.doc.getLine(openBracePos.row));return{text:"\n"+indent+"\n"+next_indent,selection:[1,indent.length,1,indent.length]}}}}),this.add("braces","deletion",function(state,action,editor,session,range){var selected=session.doc.getTextRange(range);if(!range.isMultiLine()&&selected=="{"){var line=session.doc.getLine(range.start.row),rightChar=line.substring(range.end.column,range.end.column+1);if(rightChar=="}")return range.end.column++,range}}),this.add("parens","insertion",function(state,action,editor,session,text){if(text=="("){var selection=editor.getSelectionRange(),selected=session.doc.getTextRange(selection);return selected!==""?{text:"("+selected+")",selection:!1}:{text:"()",selection:[1,1]}}if(text==")"){var cursor=editor.getCursorPosition(),line=session.doc.getLine(cursor.row),rightChar=line.substring(cursor.column,cursor.column+1);if(rightChar==")"){var matching=session.$findOpeningBracket(")",{column:cursor.column+1,row:cursor.row});if(matching!==null)return{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(state,action,editor,session,range){var selected=session.doc.getTextRange(range);if(!range.isMultiLine()&&selected=="("){var line=session.doc.getLine(range.start.row),rightChar=line.substring(range.start.column+1,range.start.column+2);if(rightChar==")")return range.end.column++,range}}),this.add("string_dquotes","insertion",function(state,action,editor,session,text){if(text=='"'||text=="'"){var quote=text,selection=editor.getSelectionRange(),selected=session.doc.getTextRange(selection);if(selected!=="")return{text:quote+selected+quote,selection:!1};var cursor=editor.getCursorPosition(),line=session.doc.getLine(cursor.row),leftChar=line.substring(cursor.column-1,cursor.column);if(leftChar=="\\")return null;var tokens=session.getTokens(selection.start.row),col=0,token,quotepos=-1;for(var x=0;x<tokens.length;x++){token=tokens[x],token.type=="string"?quotepos=-1:quotepos<0&&(quotepos=token.value.indexOf(quote));if(token.value.length+col>selection.start.column)break;col+=tokens[x].value.length}if(!token||quotepos<0&&token.type!=="comment"&&(token.type!=="string"||selection.start.column!==token.value.length+col-1&&token.value.lastIndexOf(quote)===token.value.length-1))return{text:quote+quote,selection:[1,1]};if(token&&token.type==="string"){var rightChar=line.substring(cursor.column,cursor.column+1);if(rightChar==quote)return{text:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(state,action,editor,session,range){var selected=session.doc.getTextRange(range);if(!range.isMultiLine()&&(selected=='"'||selected=="'")){var line=session.doc.getLine(range.start.row),rightChar=line.substring(range.start.column+1,range.start.column+2);if(rightChar=='"')return range.end.column++,range}})};oop.inherits(CstyleBehaviour,Behaviour),exports.CstyleBehaviour=CstyleBehaviour}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(require,exports,module){var oop=require("../../lib/oop"),Range=require("../../range").Range,BaseFoldMode=require("./fold_mode").FoldMode,FoldMode=exports.FoldMode=function(){};oop.inherits(FoldMode,BaseFoldMode),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(session,foldStyle,row){var line=session.getLine(row),match=line.match(this.foldingStartMarker);if(match){var i=match.index;if(match[1])return this.openingBracketBlock(session,match[1],row,i);var range=session.getCommentFoldRange(row,i+match[0].length);return range.end.column-=2,range}if(foldStyle!=="markbeginend")return;var match=line.match(this.foldingStopMarker);if(match){var i=match.index+match[0].length;if(match[2]){var range=session.getCommentFoldRange(row,i);return range.end.column-=2,range}var end={row:row,column:i},start=session.$findOpeningBracket(match[1],end);if(!start)return;return start.column++,end.column--,Range.fromPoints(start,end)}}}.call(FoldMode.prototype)}),ace.define("ace/mode/folding/fold_mode",["require","exports","module","ace/range"],function(require,exports,module){var Range=require("../../range").Range,FoldMode=exports.FoldMode=function(){};(function(){this.foldingStartMarker=null,this.foldingStopMarker=null,this.getFoldWidget=function(session,foldStyle,row){var line=session.getLine(row);return this.foldingStartMarker.test(line)?"start":foldStyle=="markbeginend"&&this.foldingStopMarker&&this.foldingStopMarker.test(line)?"end":""},this.getFoldWidgetRange=function(session,foldStyle,row){return null},this.indentationBlock=function(session,row,column){var re=/^\s*/,startRow=row,endRow=row,line=session.getLine(row),startColumn=column||line.length,startLevel=line.match(re)[0].length,maxRow=session.getLength();while(++row<maxRow){line=session.getLine(row);var level=line.match(re)[0].length;if(level==line.length)continue;if(level<=startLevel)break;endRow=row}if(endRow>startRow){var endColumn=session.getLine(endRow).length;return new Range(startRow,startColumn,endRow,endColumn)}},this.openingBracketBlock=function(session,bracket,row,column,typeRe,allowBlankLine){var start={row:row,column:column+1},end=session.$findClosingBracket(bracket,start,typeRe,allowBlankLine);if(!end)return;var fw=session.foldWidgets[end.row];return fw==null&&(fw=this.getFoldWidget(session,end.row)),fw=="start"&&(end.row--,end.column=session.getLine(end.row).length),Range.fromPoints(start,end)}}).call(FoldMode.prototype)})