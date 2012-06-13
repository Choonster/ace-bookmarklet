define("ace/mode/diff",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/diff_highlight_rules","ace/mode/folding/diff"],function(require,exports,module){var oop=require("../lib/oop"),TextMode=require("./text").Mode,Tokenizer=require("../tokenizer").Tokenizer,HighlightRules=require("./diff_highlight_rules").DiffHighlightRules,FoldMode=require("./folding/diff").FoldMode,Mode=function(){this.$tokenizer=new Tokenizer((new HighlightRules).getRules(),"i"),this.foldingRules=new FoldMode(["diff","index","\\+{3}","@@|\\*{5}"],"i")};oop.inherits(Mode,TextMode),function(){}.call(Mode.prototype),exports.Mode=Mode}),define("ace/mode/diff_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(require,exports,module){var oop=require("../lib/oop"),TextHighlightRules=require("./text_highlight_rules").TextHighlightRules,DiffHighlightRules=function(){this.$rules={start:[{regex:"^(?:\\*{15}|={67}|-{3}|\\+{3})$",token:"punctuation.definition.separator.diff",name:"keyword"},{regex:"^(@@)(\\s*.+?\\s*)(@@)(.*)$",token:["constant","constant.numeric","constant","comment.doc.tag"]},{regex:"^(\\d+)([,\\d]+)(a|d|c)(\\d+)([,\\d]+)(.*)$",token:["constant.numeric","punctuation.definition.range.diff","constant.function","constant.numeric","punctuation.definition.range.diff","invalid"],name:"meta."},{regex:"^(?:(\\-{3}|\\+{3}|\\*{3})( .+))$",token:["constant.numeric","meta.tag"]},{regex:"^([!+>])(.*?)(\\s*)$",token:["support.constant","text","invalid"]},{regex:"^([<\\-])(.*?)(\\s*)$",token:["support.function","string","invalid"]},{regex:"^(diff)(\\s+--\\w+)?(.+?)( .+)?$",token:["variable","variable","keyword","variable"]},{regex:"^Index.+$",token:"variable"},{regex:"^(.*?)(\\s*)$",token:["invisible","invalid"]}]}};oop.inherits(DiffHighlightRules,TextHighlightRules),exports.DiffHighlightRules=DiffHighlightRules}),define("ace/mode/folding/diff",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],function(require,exports,module){var oop=require("../../lib/oop"),BaseFoldMode=require("./fold_mode").FoldMode,Range=require("../../range").Range,FoldMode=exports.FoldMode=function(levels,flag){this.regExpList=levels,this.flag=flag,this.foldingStartMarker=RegExp("^("+levels.join("|")+")",this.flag)};oop.inherits(FoldMode,BaseFoldMode),function(){this.getFoldWidgetRange=function(session,foldStyle,row){var line=session.getLine(row),start={row:row,column:line.length},regList=this.regExpList;for(var i=1;i<=regList.length;i++){var re=RegExp("^("+regList.slice(0,i).join("|")+")",this.flag);if(re.test(line))break}for(var l=session.getLength();++row<l;){line=session.getLine(row);if(re.test(line))break}if(row==start.row+1)return;return Range.fromPoints(start,{row:row-1,column:line.length})}}.call(FoldMode.prototype)}),define("ace/mode/folding/fold_mode",["require","exports","module","ace/range"],function(require,exports,module){var Range=require("../../range").Range,FoldMode=exports.FoldMode=function(){};(function(){this.foldingStartMarker=null,this.foldingStopMarker=null,this.getFoldWidget=function(session,foldStyle,row){var line=session.getLine(row);return this.foldingStartMarker.test(line)?"start":foldStyle=="markbeginend"&&this.foldingStopMarker&&this.foldingStopMarker.test(line)?"end":""},this.getFoldWidgetRange=function(session,foldStyle,row){return null},this.indentationBlock=function(session,row,column){var re=/^\s*/,startRow=row,endRow=row,line=session.getLine(row),startColumn=column||line.length,startLevel=line.match(re)[0].length,maxRow=session.getLength();while(++row<maxRow){line=session.getLine(row);var level=line.match(re)[0].length;if(level==line.length)continue;if(level<=startLevel)break;endRow=row}if(endRow>startRow){var endColumn=session.getLine(endRow).length;return new Range(startRow,startColumn,endRow,endColumn)}},this.openingBracketBlock=function(session,bracket,row,column,typeRe,allowBlankLine){var start={row:row,column:column+1},end=session.$findClosingBracket(bracket,start,typeRe,allowBlankLine);if(!end)return;var fw=session.foldWidgets[end.row];return fw==null&&(fw=this.getFoldWidget(session,end.row)),fw=="start"&&(end.row--,end.column=session.getLine(end.row).length),Range.fromPoints(start,end)}}).call(FoldMode.prototype)})