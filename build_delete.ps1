# Remove the old built code
Remove-Item -Recurse .\build\*

# Build Ace again
npm install
node Makefile.dryice.js full

# Fix the newline escaping issues in the built code (replace each newline followed by \n with \n)
foreach ($path in @("src\ace.js", "src-noconflict\ace.js", "textarea\src\ace-bookmarklet.js"))
{
	$fullpath = ".\build\" + $path
	"Fixing $fullpath"
	$ace = [string]::Join("`n", (get-content $fullpath))
	$ace = $ace -replace "`n\\n", "\n"
	$ace > $fullpath
}