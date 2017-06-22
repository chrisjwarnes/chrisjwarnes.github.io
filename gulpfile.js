/* Config
 /* ------------------------ */
var config = require('./_assets/gulp.config.json');


var gulp = require('gulp');
var connect = require('gulp-connect');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var glob = require('glob');
var es = require('event-stream');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('serve', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('scss', function() {
  gulp.src('_assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ["last 6 versions"],
            cascade: false
    }))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(connect.reload());
});

gulp.task('js', (done) => {
    return gulp.src("./_assets/js/**/*.js")
        .pipe(concat("main.js"))
        .pipe(gulp.dest(config.js.destination));
});

gulp.task('watch', function() {
    gulp.watch('_assets/**/*.scss', ['scss']);
    gulp.watch('_assets/**/*.js', ['js']);
})

gulp.task('default', ['scss', 'js', 'serve', 'watch']);