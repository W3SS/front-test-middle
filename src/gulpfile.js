var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// watch files for changes and reload
gulp.task('serve', function() {
  browserSync({
    port: 4000,
    server: {
      baseDir: '.',
    }
  });

  gulp.watch(['*.html', 'app/**/*.html', 'app/**/*.js'], {cwd: '.'}, reload);
});