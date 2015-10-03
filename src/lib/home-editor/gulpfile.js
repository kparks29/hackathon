var gulp = require('gulp'),
    inject = require('gulp-inject'),
    shell = require('gulp-shell'),
    webserver = require('gulp-webserver'),
    usemin = require('gulp-usemin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    rename = require('gulp-rename'),
    webserver = require('gulp-webserver');

var path = {
    sources: 'src',
    karma: 'node_modules/.bin/karma',
    docs: './docs',
    jsdoc: 'node_modules/.bin/jsdoc'
};

gulp.task('build', function () {
  var target = gulp.src('./src/index.html');
  var sources = gulp.src(['./src/**/*.js', './src/**/*.css'], {read: false});
 
  return target.pipe(inject(sources), {relative: true})
    .pipe(gulp.dest('./src'));
});

gulp.task('serve', function() {
    gulp.src(path.sources)
        .pipe(webserver({
            host: 'localhost',
            port: 8300,
            livereload: {
                enable: true,
                port: 8380
            },
            directoryListing: false,
            open: true
        }));
});

gulp.task('docs', shell.task(
    path.jsdoc + 
    ' --configure node_modules/angular-jsdoc/conf.json' +
    ' --template node_modules/angular-jsdoc/template' +
    ' --destination ' + path.docs +
    ' --recurse src/app/models'
    ));

gulp.task('serve-docs', ['docs'], function () {
    return gulp.src(path.docs).
        pipe(webserver({
            host: 'localhost',
            port: 8200,
            livereload: {
                enable: true,
                port: 8210
            },
            directoryListing: false,
            open: true
        }));
});

gulp.task('dist', function () {
    gulp.src('./src/index.html').
        pipe(usemin({
            modeljs: [
                ngAnnotate(),
                'concat'
                ]
        })).
        pipe(gulp.dest('./dist'));

    return gulp.src('./src/index.html').
        pipe(usemin({
            modeljs: [
                ngAnnotate(),
                'concat',
                uglify(),
                rename({ suffix: '.min' })
                ]
        })).
        pipe(gulp.dest('./dist'));
});

gulp.task('test', shell.task(path.karma + ' start --single-run'));

gulp.task('default', ['serve']);