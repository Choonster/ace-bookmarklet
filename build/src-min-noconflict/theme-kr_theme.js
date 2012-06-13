ace.define("ace/theme/kr_theme",["require","exports","module","ace/lib/dom"],function(require,exports,module){exports.isDark=!0,exports.cssClass="ace-kr-theme",exports.cssText="\n.ace-kr-theme .ace_editor {\n  border: 2px solid rgb(159, 159, 159);\n}\n\n.ace-kr-theme .ace_editor.ace_focus {\n  border: 2px solid #327fbd;\n}\n\n.ace-kr-theme .ace_gutter {\n  background: #e8e8e8;\n  color: #333;\n}\n\n.ace-kr-theme .ace_print_margin {\n  width: 1px;\n  background: #e8e8e8;\n}\n\n.ace-kr-theme .ace_scroller {\n  background-color: #0B0A09;\n}\n\n.ace-kr-theme .ace_text-layer {\n  cursor: text;\n  color: #FCFFE0;\n}\n\n.ace-kr-theme .ace_cursor {\n  border-left: 2px solid #FF9900;\n}\n\n.ace-kr-theme .ace_cursor.ace_overwrite {\n  border-left: 0px;\n  border-bottom: 1px solid #FF9900;\n}\n\n.ace-kr-theme .ace_marker-layer .ace_selection {\n  background: rgba(170, 0, 255, 0.45);\n}\n\n.ace-kr-theme.multiselect .ace_selection.start {\n  box-shadow: 0 0 3px 0px #0B0A09;\n  border-radius: 2px;\n}\n\n.ace-kr-theme .ace_marker-layer .ace_step {\n  background: rgb(102, 82, 0);\n}\n\n.ace-kr-theme .ace_marker-layer .ace_bracket {\n  margin: -1px 0 0 -1px;\n  border: 1px solid rgba(255, 177, 111, 0.32);\n}\n\n.ace-kr-theme .ace_marker-layer .ace_active_line {\n  background: #38403D;\n}\n\n.ace-kr-theme .ace_gutter_active_line {\n  background-color : #dcdcdc;\n}\n\n.ace-kr-theme .ace_marker-layer .ace_selected_word {\n  border: 1px solid rgba(170, 0, 255, 0.45);\n}\n\n.ace-kr-theme .ace_invisible {\n  color: rgba(255, 177, 111, 0.32);\n}\n\n.ace-kr-theme .ace_keyword, .ace-kr-theme .ace_meta {\n  color:#949C8B;\n}\n\n.ace-kr-theme .ace_constant, .ace-kr-theme .ace_constant.ace_other {\n  color:rgba(210, 117, 24, 0.76);\n}\n\n.ace-kr-theme .ace_constant.ace_character,  {\n  color:rgba(210, 117, 24, 0.76);\n}\n\n.ace-kr-theme .ace_constant.ace_character.ace_escape,  {\n  color:rgba(210, 117, 24, 0.76);\n}\n\n.ace-kr-theme .ace_invalid {\n  color:#F8F8F8;\nbackground-color:#A41300;\n}\n\n.ace-kr-theme .ace_support {\n  color:#9FC28A;\n}\n\n.ace-kr-theme .ace_support.ace_constant {\n  color:#C27E66;\n}\n\n.ace-kr-theme .ace_fold {\n    background-color: #949C8B;\n    border-color: #FCFFE0;\n}\n\n.ace-kr-theme .ace_support.ace_function {\n  color:#85873A;\n}\n\n.ace-kr-theme .ace_storage {\n  color:#FFEE80;\n}\n\n.ace-kr-theme .ace_string.ace_regexp {\n  color:rgba(125, 255, 192, 0.65);\n}\n\n.ace-kr-theme .ace_comment {\n  font-style:italic;\ncolor:#706D5B;\n}\n\n.ace-kr-theme .ace_variable {\n  color:#D1A796;\n}\n\n.ace-kr-theme .ace_variable.ace_language {\n  color:#FF80E1;\n}\n\n.ace-kr-theme .ace_meta.ace_tag {\n  color:#BABD9C;\n}\n\n.ace-kr-theme .ace_markup.ace_underline {\n    text-decoration:underline;\n}\n\n.ace-kr-theme .ace_markup.ace_list {\n  background-color:#0F0040;\n}";var dom=require("../lib/dom");dom.importCssString(exports.cssText,exports.cssClass)})