'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var stylish = require('jshint-stylish');


// Configurable paths for the application
var appConfig = {
  app: 'app',
  dist: 'dist'
};


// Command lines
// -------------
// Build SCSS Documents
gulp.task('scss', function () {
  return gulp.src(appConfig.app + '/css/*.scss')
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      includePaths: ['.'],
      precision: 10
    }).on('error', $.sass.logError))
    .pipe(gulp.dest(appConfig.app + '/css'))
    .pipe(reload({stream: true}));
});


// Test
gulp.task('jshint', function () {
  return gulp.src(appConfig.app + '/scripts/**/*.js')
      .pipe($.jshint()).pipe($.jshint.reporter(stylish));
});

gulp.task('jscs', function () {
  return gulp.src(appConfig.app + '/scripts/**/*.js')
      .pipe($.jscs()).pipe($.jscs.reporter());
});

gulp.task('test', ['jshint', 'jscs'], function() {
//  gulp.watch(['app/scripts/**/*.js', 'test/**/*.js'], ['jshint', 'jscs']);
  gulp.watch(appConfig.app + '/scripts/**/*.js', ['jshint', 'jscs']);
});


// Fonts
gulp.task('fonts', function () {
  return gulp.src(appConfig.app + '/fonts/**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(gulp.dest(appConfig.dist + '/fonts'));
});


// HTML
var htmlEntities = function(input, output) {
  return gulp.src(input)
    .pipe($.useref())
//    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.js', $.rev()))
    .pipe($.if('*.css', $.cssmin()))
    .pipe($.if('*.css', $.rev()))
//    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe($.revReplace())
    .pipe(gulp.dest(output));
}

gulp.task('html', ['scss'], function() {
  return htmlEntities(appConfig.app + '/*.html', appConfig.dist);
});

gulp.task('views', ['scss'], function() {
  return htmlEntities(appConfig.app + '/views/*.html', appConfig.dist + '/views');
});


// Images
gulp.task('favicon', function() {
  return gulp.src(appConfig.app + '/*.ico')
    .pipe($.rev())
        .pipe($.revReplace())

    .pipe(gulp.dest(appConfig.dist));
});

gulp.task('images', function() {
  return gulp.src(appConfig.app + '/img/**/*')
    .pipe(gulp.dest(appConfig.dist + '/img'));
});


// Delete files and folders
gulp.task('clean', function () {
  return gulp.src([appConfig.dist]).pipe($.rimraf());
});


// Build the application
gulp.task('build', function () {
  runSequence(
    'clean',
    'html',
    'views',
    'images',
    'favicon'
    );
});


// Start application
gulp.task('serve', ['scss'], function() {
  browserSync({
    notify: false,
    port: 1337,
    server: {
      baseDir: [appConfig.app],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    appConfig.app + '/*.html',
    appConfig.app + '/views/*.html',
    appConfig.app + '/scripts/**/*.js',
    appConfig.app + '/img/**/*',
    appConfig.app + '/fonts/**/*'
  ]).on('change', reload);

  gulp.watch(appConfig.app + '/css/**/*.scss', ['scss']);
//  gulp.watch('bower.json', ['wiredep', 'fonts']);
});


gulp.task('serve:dist', function () {
  runSequence('build');
  browserSync({
    notify: false,
    port: 1337,
    server: {
      baseDir: [appConfig.dist]
    }
  });
});


// Default gulp task
gulp.task('default', ['serve']);



//gulp.task("qsd", function() {
//
//  return gulp.src(appConfig.app +  '/index.html')
//    .pipe($.useref())
////    .pipe($.if('*.js', $.uglify()))
//    .pipe($.if('*.css', $.cssmin()))
//    .pipe($.if('*.css', $.rev()))
////    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
//    .pipe($.revReplace())
//    .pipe(gulp.dest('public'));
//
//});


//gulp.task('aze', function () {
//  return gulp.src(appConfig.app + '/css/*.css')
//          .pipe($.rev())
//          .pipe(gulp.dest(appConfig.dist));
//});



