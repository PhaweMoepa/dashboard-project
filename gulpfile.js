const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const log = require('fancy-log');
const minimist = require('minimist');
const config = require('./config.json');

// Parse command-line arguments
const options = minimist(process.argv.slice(2));

// Set global config
global.config = config;

// Log start message
log.info('Starting Gulp!!');

// Import tasks from gulp-tasks directory
const autoPrefixTasks = require('./gulp-tasks/autoprefix')(gulp);
const cleanTasks = require('./gulp-tasks/clean')(gulp);
const copyTask = require('./gulp-tasks/copy')(gulp);
const cssTasks = require('./gulp-tasks/css')(gulp);
const fileWriteTasks = require('./gulp-tasks/file-write')(gulp);
const replaceTasks = require('./gulp-tasks/replace')(gulp);
const scssTasks = require('./gulp-tasks/scss')(gulp, sass);
const uglifyTasks = require('./gulp-tasks/uglify')(gulp);
const notifyTasks = require('./gulp-tasks/notify')(gulp);
const vendorsTasks = require('./gulp-tasks/vendors')(gulp);

// Define Gulp tasks with correct names
gulp.task('scss-core', scssTasks.core);
gulp.task('scss-main', scssTasks.main);
gulp.task('scss-pages', scssTasks.pages);
gulp.task('scss-plugins', scssTasks.plugins);
gulp.task('scss-themes', scssTasks.themes);
gulp.task('scss-style', scssTasks.style);
gulp.task('scss-rtl', scssTasks.rtl);
gulp.task('scss-watch', scssTasks.watch);

// Monitoring changes
gulp.task('monitor', function() {
  log.info('Watching for changes...');
  gulp.watch(
    [config.source.sass + '/**/*.scss', config.assets + '/scss/**/*.scss'],
    gulp.series(
      'scss-core',
      'scss-main',
      'scss-pages',
      'scss-plugins',
      'scss-themes',
      'scss-style'
    )
  ).on('change', function(path, stats) {
    log.info(`File ${path} was changed`);
  });
});

// Other tasks
gulp.task('dist-js', gulp.series(cleanTasks.js, copyTask.js, uglifyTasks.js, notifyTasks.js));
gulp.task(
  'sass-compile',
  gulp.parallel(
    'scss-main',
    'scss-core',
    'scss-pages',
    'scss-plugins',
    'scss-themes',
    'scss-style'
  )
);
gulp.task('sass-compile-rtl', scssTasks.rtl);
gulp.task(
  'dist-css',
  gulp.series(
    cleanTasks.css,
    'sass-compile',
    autoPrefixTasks.css,
    cssTasks.css_comb,
    cssTasks.css_min,
    gulp.parallel(notifyTasks.css)
  )
);
gulp.task(
  'dist-css-rtl',
  gulp.series(
    cleanTasks.css_rtl,
    'sass-compile',
    'sass-compile-rtl',
    cssTasks.css_rtl,
    autoPrefixTasks.css_rtl,
    cssTasks.css_rtl_comb,
    cssTasks.css_rtl_min
  )
);
gulp.task('dist', gulp.series('dist-css', 'dist-js'));
gulp.task('default', gulp.series('dist'));
