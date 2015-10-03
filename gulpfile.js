(function () {
'use strict';

var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	plugins = gulpLoadPlugins(),
	bower = require('bower'),
	paths = {
		src: 'src'
	};

gulp.task('lint', function () {
	return gulp.src([
		paths.src + '/**/*.js',
		'!' + paths.src + '/lib/**/*.js'
		])
		.pipe(plugins.eslint())
		.pipe(plugins.eslint.format())
		.pipe(plugins.eslint.failAfterError());
});

gulp.task('test', function (cb) {
	var server = require('karma').server;
	server.start({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, cb);
});

gulp.task('install', function () {
	return bower.commands.update()
		.on('log', function(data) {
			plugins.util.log('bower', plugins.util.colors.cyan(data.id), data.message);
		});
});

gulp.task('sass', function () {
	return gulp.src(paths.src + '/styles/main.scss')
		.pipe(plugins.sass())
		.pipe(gulp.dest(paths.src + '/css/'));
});

gulp.task('serve', ['watch'], function() {
	var dir = paths.src;
	return gulp.src(dir)
		.pipe(plugins.webserver({
			host: 'localhost',
			port: 8300,
			livereload: {
				enable: true,
				port: 8180
			},
			directoryListing: false
		}));
});

gulp.task('watch', function() {
	return gulp.watch(paths.src + '/**/*.scss', ['sass']);
});

// generate a todo.md from your javascript files
gulp.task('todo', function() {
	gulp.src([
		paths.src + '/**/*.js',
		'!' + paths.src + '/lib/**/*.js'
		])
		.pipe(plugins.todo())
		.pipe(gulp.dest('./'));
		// -> Will output a TODO.md with your todos
});

gulp.task('default', ['sass', 'serve']);

})();