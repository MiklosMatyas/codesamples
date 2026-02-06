'use strict';

const gulp            = require('gulp'),
      sass            = require('gulp-dart-sass'),
      sourcemaps      = require('gulp-sourcemaps');

// sass.compiler = require('node-sass');

gulp.task('sass', function () {   
    return gulp
        .src('./sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css/'));});

gulp.task('watch', function () {
    gulp.watch('./sass/**/*.scss', gulp.series('sass'));
});   

