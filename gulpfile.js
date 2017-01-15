var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var target = {
	js_concat_src: ['body-scroll-freezer.js'],
	js_dest: 'docs/js'
};

gulp.task('js-uglify', function() {
	gulp.src(target.js_concat_src)
	.pipe(uglify())
	.pipe(rename(function(dir, base, ext){
		var trunc = base.split('.')[0];
		return trunc + '.min' + ext;
	}))
	.pipe(gulp.dest(target.js_dest));
});


gulp.task('js-lint', function() {
	gulp.src(target.js_concat_src)
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

gulp.task('default', ['js-lint', 'js-uglify']);
