var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var gulpConcat = require('gulp-concat'); 
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var jade = require('gulp-jade');

gulp.task('scss-compile',function(){
  return gulp.src('app/scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync',function(){
  browserSync({
    server:{
      baseDir:'app'
    }
  })
})

gulp.task('gulp-concat',function(){
  return gulp.src(['./app/js/1.js','./app/js/2.js'])
        .pipe(gulpConcat('all.js'))
        .pipe(gulp.dest('./app/js/'));
});
 
gulp.task('minify-js', function () {
    gulp.src('app/js/all.js')
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/'));
});

gulp.task('minify-css', function() {
  return gulp.src('app/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('app/'));
});

gulp.task('compile-jade', function() {
  var YOUR_LOCALS = {};
 
  gulp.src('./app/jade/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./app/'))
});

gulp.task('watch',['browser-sync','minify-css','scss-compile','gulp-concat','minify-js'],function(){
  gulp.watch('app/scss/**/*.scss',['scss-compile','minify-css'],browserSync.reload);
  gulp.watch('app/js/**/*.js',['gulp-concat','minify-js']);
  gulp.watch('app/**/*.html',browserSync.reload);
})
