var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('hello',function(){
  return gulp.src('app/scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({
    stream:true
  }));
});

gulp.task('browser-sync',function(){
  browserSync({
    server:{
      baseDir:'app'
    }
  })
})

gulp.task('watch',['browser-sync','hello'],function(){
  gulp.watch('app/scss/**/*.scss',['hello']);
  gulp.watch('app/**/*.html',browserSync.reload);
})
