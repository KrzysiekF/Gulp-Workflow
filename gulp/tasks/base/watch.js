'use strict';

module.exports = function(gulp, $, paths, config, Logger) {

    gulp.task(config.task.watch, ' - watchers for app files', function () {
        gulp.watch(paths.core.css.watch, [config.task.appStyles]);
        gulp.watch(paths.core.js.watch, [config.task.appScripts]);
    });
    
};