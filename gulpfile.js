var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var notify = require("gulp-notify");
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');

var notifyGeneric = {
    title: function () {
        return '<%= file.relative %>';
    },
    onLast: true,
    subtitle: "Successfully Compiled",
    message: "@ Time: <%= options.hour %>:<%= options.minute %>:<%= options.second %> ",
    templateOptions: {
        hour: new Date().getHours(),
        minute: new Date().getMinutes(),
        second: new Date().getSeconds()
    }
};

var onError = function(err) {
    notify.onError({
                title:    "Gulp",
                subtitle: "Failure!",
                message:  "Error: <%= error.message %>",
                sound:    "Sosumi"
            })(err);

    this.emit('end');
};

gulp.task('default', ['sass', 'vendor-sass', 'compress', 'vendor-compress', 'watch'])

gulp.task('compile', ['sass', 'vendor-sass', 'compress', 'vendor-compress', 'images']);

gulp.task('sass', function(){
  return gulp.src('assets/styles/scss/style.scss')
    .pipe(sourcemaps.init())
  	.pipe(plumber({errorHandler: onError}))
    .pipe(sass().on('error', sass.logError)) // Using gulp-sass
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(notify(notifyGeneric))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('vendor-sass', function(){
  return gulp.src(['assets/styles/vendor/*.scss', 'assets/styles/vendor/*.css'])
  	.pipe(plumber({errorHandler: onError}))
    .pipe(sass().on('error', sass.logError)) // Using gulp-sass
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(notify(notifyGeneric))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
      proxy: "local.wordpress.com"
  })
});

gulp.task('compress', function() {
  return gulp.src('assets/scripts/*.js')
  	.pipe(plumber({errorHandler: onError}))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify(notifyGeneric));
});

gulp.task('vendor-compress', function() {
  return gulp.src('assets/scripts/vendor/*.js')
  	.pipe(plumber({errorHandler: onError}))
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify(notifyGeneric));
});

gulp.task('images', function(){
  return gulp.src('assets/images/**/*.+(png|jpg|gif|svg)')
	.pipe(imagemin({
	  // Setting interlaced to true
	  interlaced: true
	}))
	.pipe(gulp.dest('dist/images'))
	.pipe(notify(notifyGeneric));
});



gulp.task('watch', ['browserSync'], function () {
    gulp.watch('assets/styles/scss/**/*.scss', ['sass']);
    gulp.watch(['assets/styles/vendor/*.scss', 'assets/styles/vendor/*.css'], ['vendor-sass']);
    gulp.watch('assets/scripts/*.js', ['compress']);
    gulp.watch('assets/scripts/vendor/*.js', ['vendor-compress']);
    gulp.watch('assets/images/*.+(png|jpg|gif|svg)', ['images']);
    //gulp.watch('*.html', browserSync.reload); 
    gulp.watch('dist/scripts/*.min.js', browserSync.reload); 
});
