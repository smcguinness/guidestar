
index.html: lib/guidestar.js
	dox \
		--title "Guidestar" \
		--desc "NodeJS Wrapper for the [Guidestar](https://data.guidestar.org/) API" \
		--ribbon "http://github.com/Wizehive/guidestar" \
		$< > $@
