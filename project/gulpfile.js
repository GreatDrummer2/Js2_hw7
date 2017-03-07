var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var gulpConcat = require('gulp-concat'); 
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var jade = require('gulp-jade');

gulp.task('gulp-concat',function(){
  return gulp.src(['./app/js/1.js','./app/js/2.js'])
        .pipe(gulpConcat('all.js'))
        .pipe(gulp.dest('./app/js/'));
});
 
gulp.task('minify-js', function () {
    gulp.src('app/js/all.js')
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/'))
        .pipe(browserSync.stream());
});

gulp.task('js-compile',function(){
  return gulp.src(['./app/js/1.js','./app/js/2.js'])
        .pipe(gulpConcat('all.js'))
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/'));
})

gulp.task('scss-compile',function(){
  return gulp.src('app/scss/**/*.scss')
  .pipe(sass())
  //.pipe(gulp.dest('app/css'))
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

gulp.task('jade-watch', ['compile-jade'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('js-watch', ['js-compile'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('css-watch', ['scss-compile'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('serve', ['js-compile','scss-compile','compile-jade'], function () {
    browserSync.init({
        server: {
            baseDir: "app"
        }
    });

    gulp.watch('app/js/**/*.js', ['js-watch','jade-watch']);
    gulp.watch('app/scss/**/*.scss', ['css-watch','jade-watch']);
    gulp.watch('app/jade/**/*.jade', ['jade-watch']);
});
