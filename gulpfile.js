var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var header = require('gulp-header');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var target = {
	js_concat_src: ['src/body-scroll-freezer.js'],
	js_dest: 'docs/js'
};

gulp.task('js-uglify', function() {
	var pkg = require('./package.json');
	var banner = [
	  '/**',
	  ' * <%= pkg.name %> - <%= pkg.description %>',
	  ' *',
	  ' * @version v<%= pkg.version %>',
	  ' * @link <%= pkg.homepage %>',
	  ' * @author <%= pkg.author %>',
	  ' * @license <%= pkg.license %>',
	  ' */',
	  ''].join('\n');

	gulp.src(target.js_concat_src)
		.pipe(uglify())
		.pipe(header(banner, {pkg: pkg}))
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
