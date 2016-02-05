'use strict';

// Require
var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var stylish     = require('jshint-stylish');
var path        = require('path');


// Configurable paths
var appConfig = {
  bower: 'bower_components',
  app: 'app',
  dist: 'dist'
};


// Generate CSS from SCSS sheets
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


// Test area
gulp.task('jshint', function () {
  return gulp.src(appConfig.app + '/js/**/*.js')
          .pipe($.jshint()).pipe($.jshint.reporter(stylish));
});

gulp.task('jscs', function () {
  return gulp.src(appConfig.app + '/js/**/*.js')
          .pipe($.jscs()).pipe($.jscs.reporter());
});

gulp.task('test', ['jshint', 'jscs'], function () {
  gulp.watch(appConfig.app + '/js/**/*.js', ['jshint', 'jscs']);
});


// HTML
var htmlEntities = function (input, output) {
  return gulp.src(input)
          .pipe($.useref())
//          .pipe($.if('*.js', $.uglify()))
          .pipe($.if('*.js', $.rev()))
          .pipe($.if('*.css', $.cssmin()))
          .pipe($.if('*.css', $.rev()))
          .pipe($.if('*.html', $.htmlmin({
            removeComments: true,
            collapseWhitespace: true
          })))
          .pipe($.revReplace())
          .pipe(gulp.dest(output));
}

gulp.task('html', ['scss'], function () {
  return htmlEntities(appConfig.app + '/*.html', appConfig.dist);
});

gulp.task('views', ['scss'], function () {
  return htmlEntities(appConfig.app + '/views/*.html', appConfig.dist + '/views');
});


// Images
gulp.task('favicon', function () {
  return gulp.src([appConfig.app + '/favicon.ico'])
          .pipe($.rev())
          .pipe($.tap(function (file, through) {
            gulp.src([appConfig.dist + '/index.html'])
                    .pipe($.replace('"favicon.ico"', '"' + path.basename(file.path) + '"'))
                    .pipe(gulp.dest(appConfig.dist));
          }))
          .pipe(gulp.dest(appConfig.dist));
});

gulp.task('images', function () {
  return gulp.src(appConfig.app + '/img/**/*')
          .pipe(gulp.dest(appConfig.dist + '/img'));
});


// Fonts
gulp.task('fonts', function () {
  // Project Fonts
  var project = gulp.src(appConfig.app + '/fonts/**/*.{eot,svg,ttf,woff,woff2}')
          .pipe(gulp.dest(appConfig.dist + '/fonts'));

  // Bootstrap Fonts
  var bootstrap = gulp.src(appConfig.bower + '/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}')
          .pipe(gulp.dest(appConfig.dist + '/fonts'));
  
  return project && bootstrap;
});


// Delete files and folders
gulp.task('clean', function () {
  return gulp.src([appConfig.dist]).pipe($.rimraf());
});


// Build the application
gulp.task('build', function () {
  runSequence('clean', 'html', 'views', 'images', 'favicon', 'fonts');
});


// Start application
gulp.task('serve', ['scss'], function () {
  browserSync({
    notify: false,
    port: 1337,
    server: {
      baseDir: [appConfig.app],
      routes: {
        '/bower_components': appConfig.bower
      }
    }
  });

  gulp.watch([
    appConfig.app + '/*.html',
    appConfig.app + '/views/*.html',
    appConfig.app + '/js/**/*.js',
    appConfig.app + '/img/**/*',
    appConfig.app + '/fonts/**/*'
  ]).on('change', reload);

  gulp.watch(appConfig.app + '/css/**/*.scss', ['scss']);
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
