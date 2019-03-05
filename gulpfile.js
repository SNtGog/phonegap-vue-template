const gulp = require('gulp');
const parcel = require('gulp-parcel');

gulp.task('build:js', () => {
  gulp.src('source/javascripts/all.js', {read:false})
    .pipe(parcel())
    .pipe(gulp.dest('build/javascripts/'));
});

gulp.task('build', () => {
  gulp.src('build/**/*.html', {read:false})
    .pipe(parcel({outDir: 'dist', publicURL: './'}, {source: 'build'}))
    .pipe(gulp.dest('dist'));
});