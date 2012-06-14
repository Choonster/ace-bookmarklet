#!/bin/env bash

# Remove the old build code
rm ./build/*

# Build Ace again
npm install
node Makefile.dryice.js full

# Fix the newline escaping issues in the built code (replace each newline followed by \n with \n)
paths = ( "src/ace.js" "src-noconflict/ace.js" "textarea/src/ace-bookmarklet.js" )
for path in "$paths[@]"
do
	fullpath = "./build/${path}"
	echo "Fixing ${fullpath}"
	sed -e :a -e '$!N;s/\n\\n/\\n/;ta' "${fullpath}"
	# Copy-pasted from the blog below. No idea if it will work.
	# http://unstableme.blogspot.com.au/2008/05/remove-or-replace-newlines-using.html
done