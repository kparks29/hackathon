var gulp = require('gulp'),
	gutil = require('gulp-util'),
	bower = require('bower'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	runSequence = require('run-sequence'),
	ngAnnotate = require('gulp-ng-annotate'),
	clean = require('gulp-clean'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	shell = require('gulp-shell');

var paths = {
	src: 'src',
	dist: 'dist'
};


gulp.task('clean', function () {
	return gulp.src([paths.dist], { read: false })
		.pipe(clean({ force: true }));
});

gulp.task('lint', function () {
	return gulp.src([
		paths.src + '/**/*.js',
		'!' + paths.src + '/**/**.spec.js',
		'!' + paths.src + '/lib/**/*.js'
		])
	    .pipe(jshint('.jshintrc'))
	    .pipe(jshint.reporter(stylish))
	    .pipe(jshint.reporter('fail'));
});

gulp.task('test:unit', shell.task('node_modules/.bin/karma start --single-run'));

gulp.task('install', function () {
	return bower.commands.install()
		.on('log', function(data) {
			gutil.log('bower', gutil.colors.cyan(data.id), data.message);
		});
});

gulp.task('build', function () {
	return gulp.src([
			paths.src + '/*.js',
			'!' + paths.src + '/*.spec.js'
		])
		// dev build
		.pipe(concat('homdna-common.js'))
		.pipe(ngAnnotate())
		.pipe(gulp.dest(paths.dist))
		// distribution build (minified)
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest(paths.dist));
});

gulp.task('default', function () {
	return runSequence(
		'clean',
		'lint',
		'install',
		'test:unit',
		'build'
	);
});