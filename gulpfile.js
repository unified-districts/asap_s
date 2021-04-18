/*jshint esversion: 6 */

const {
  src,
  dest,
  parallel,
  series,
  watch
} = require('gulp');

const gulp         = require('gulp');
const sass         = require('gulp-sass');
const browserSync  = require('browser-sync');
const rename       = require('gulp-rename');
const imagemin     = require('gulp-imagemin');
const concat       = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const notify       = require('gulp-notify');
const plumber      = require('gulp-plumber');
const sourcemaps   = require('gulp-sourcemaps');
const terser       = require('gulp-terser');

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

function css() {
  return src('assets/styles/scss/style.scss')
    .pipe(sourcemaps.init())
  	.pipe(plumber({errorHandler: onError}))
    .pipe(sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError)) // Using gulp-sass
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./maps'))
    .pipe(dest('dist/styles'))
    .pipe(notify(notifyGeneric));
}

function vendorSass() {
  return src(['assets/styles/vendor/*.scss', 'assets/styles/vendor/*.css'])
  	.pipe(plumber({errorHandler: onError}))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) // Using gulp-sass
    .pipe(concat('vendor.css'))
    .pipe(dest('dist/styles'))
    .pipe(notify(notifyGeneric));
}

function compress(){
  return src('assets/scripts/*.js')
  	.pipe(plumber({errorHandler: onError}))
    .pipe(terser())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(dest('dist/scripts'))
    .pipe(notify(notifyGeneric));
}

function vendorCompress(){
  return src('assets/scripts/vendor/*.js')
  	.pipe(plumber({errorHandler: onError}))
    .pipe(concat('vendor.min.js'))
    .pipe(terser())
    .pipe(dest('dist/scripts'))
    .pipe(notify(notifyGeneric));
}

function images() {
  return src('assets/images/**/*.+(png|jpg|gif|svg)')
  	.pipe(imagemin({
  	  interlaced: true
  	}))
  	.pipe(dest('dist/images'))
  	.pipe(notify(notifyGeneric));
}

function fonts() {
  return src('assets/fonts/*.+(ttf|woff|woff2|eot|svg)')
  	.pipe(dest('dist/fonts'))
  	.pipe(notify(notifyGeneric));
}

function watchFiles(){
    watch('assets/styles/scss/**/*.scss',       series(css));
    watch('assets/styles/vendor/*.scss',        series(vendorSass));
    watch('assets/styles/vendor/*.css',         series(vendorSass));
    watch('assets/scripts/*.js',                parallel(compress));
    watch('assets/fonts/*.+(ttf|woff|woff2|eot|svg)', parallel(fonts));
    watch('assets/scripts/vendor/*.js',         parallel(vendorCompress));
    watch('assets/images/*.+(png|jpg|gif|svg)', parallel(images));
}

exports.default = parallel(css, vendorSass, compress, vendorCompress, watchFiles);
exports.compile = parallel(css, vendorSass, compress, vendorCompress, images);
exports.watch   = parallel(watchFiles);
