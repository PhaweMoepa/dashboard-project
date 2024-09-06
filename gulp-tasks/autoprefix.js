const autoprefixer = require('gulp-autoprefixer');

module.exports = function (gulp) {
  const autoPrefixCssRtlTask = function () {
    return gulp
      .src(['**/*.css', '!**/*.min.css'], { cwd: global.config.destination.css_rtl })
      .pipe(
        autoprefixer({
          overrideBrowserslist: global.config.autoprefixerBrowsers,
          cascade: false
        })
      )
      .pipe(gulp.dest(global.config.destination.css_rtl));
  };

  const autoPrefixCssTask = function () {
    return gulp
      .src(['**/*.css', '!**/*.min.css'], { cwd: global.config.destination.css })
      .pipe(
        autoprefixer({
          overrideBrowserslist: global.config.autoprefixerBrowsers,
          cascade: false
        })
      )
      .pipe(gulp.dest(global.config.destination.css));
  };

  return {
    css: autoPrefixCssTask,
    css_rtl: autoPrefixCssRtlTask
  };
};
