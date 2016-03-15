'use strict';
const gulp = require('gulp');
const inject = require('gulp-inject');

const injectIndex = files =>
  gulp.src('index.html')
    .pipe(inject(
      gulp.src(files, {read: false}),
      {empty: true}
    ))
    .pipe(gulp.dest('./'));

gulp.task('fill', () => injectIndex(['gulpfile.js', 'index.html']));

gulp.task('empty', () => injectIndex('nada'));
