const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const path = 'Shelter';

gulp.task('server', function () {
  browserSync({
    server: {
      baseDir: path,
    },
  });

  gulp.watch(path + '/index.html').on('change', browserSync.reload);
  gulp.watch(path + '/pets.html').on('change', browserSync.reload);
});

gulp.task('styles', function () {
  return gulp
    .src('src/sass/**/*.+(scss|sass)')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path + '/css'))
    .pipe(browserSync.stream());
});

gulp.task('html', function () {
  return gulp
    .src('src/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: false }))
    .pipe(gulp.dest(path));
});

gulp.task('scripts', function () {
  return gulp
    .src('src/js/**/*')
    .pipe(gulp.dest(path + '/js'))
    .pipe(browserSync.stream());
});

gulp.task('icons', function () {
  return gulp
    .src('src/assets/icons/**/*')
    .pipe(gulp.dest(path + '/assets/icons'))
    .pipe(browserSync.stream());
});

gulp.task('images', function () {
  return gulp
    .src('src/assets/images/**/*')
    .pipe(newer('src/assets/images/**/*'))
    .pipe(imagemin())
    .pipe(gulp.dest(path + '/assets/images'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {
  gulp.watch('src/sass/**/*.+(scss|sass|css)', gulp.parallel('styles'));
  gulp.watch('src/**/*.html').on('change', gulp.parallel('html'));
  gulp.watch('src/js/**/*.js').on('change', gulp.parallel('scripts'));
  gulp.watch('src/assets/**/*.jpg|png|svg').on('change', gulp.parallel('images'));
});

gulp.task(
  'default',
  gulp.parallel('watch', 'server', 'styles', 'html', 'scripts', 'icons', 'images'),
);
