'use strict';

var gulp     = require('gulp-help')(require('gulp')),
    paths    = require('./gulp/paths'),
    config   = require('./gulp/config'),
    logger   = require('./gulp/logger'),
    sequence = require('run-sequence'),
    $        = require('gulp-load-plugins')({
        pattern: '*',
        rename : {
            'lodash.assign': 'assign'
        }
    });

var Server = require('karma').Server;

// require all tasks : gulp-load-subtasks
$.loadSubtasks('gulp/tasks/**/*.js', $, paths, config, logger);

gulp.task('test', ' - uruchomienie testów jednostkowych', function(done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done).start();
});

gulp.task(config.task.libs, [config.task.libsScripts, config.task.libsScriptsCopy, config.task.libsStylesCopy]);