'use strict';

var fs    = require('fs'),
    path  = require('path'),
    chalk = require('chalk'),
    cleanCSS = require('gulp-clean-css'),
    urlAdjuster = require('gulp-css-url-adjuster'),
    sourcemaps = require('gulp-sourcemaps');

module.exports = function (gulp, $, paths, config, Logger) {

    gulp.task(config.task.appStyles, ' - styles file', function () {
        Logger.msg('');
        Logger.msg('Generating your application styles...');
        Logger.msg('');

        return gulp.src(paths.core.css.files)
            .pipe(sourcemaps.init())
            .pipe($.sass(config.sass.options).on('error', $.sass.logError))
            .pipe($.autoprefixer(config.autoprefixer.options))
            .pipe(gulp.dest(paths.core.css.dest))
            .on('data', function () {
                Logger.msg('Combined file ready:');
            })
            .pipe($.size(config.size.options))
            .on('data', function () {
                Logger.msg('');
                Logger.msg('I minimize files...');
                Logger.msg('');
            })
            .pipe(cleanCSS(config.cleanCSS.options))
            .pipe(gulp.dest(paths.core.css.dest))
            .on('data', function () {
                Logger.msg('File ready:');
            })
            .pipe(sourcemaps.write('/maps'))
            .pipe(gulp.dest(paths.core.css.dest))
            .pipe($.size(config.size.options))
            .on('data', function () {
                Logger.success('Done!');
                Logger.msg('');
            });
    });

    gulp.task(config.task.libsStylesCopy, ' - copy the necessary library files (styles)', function () {
        var length = paths.libs.css.copy.files.length;
        var i      = 1;

        Logger.warning('Copies library files (files: ' + length + '):');
        Logger.msg('');

        return gulp
            .src(paths.libs.css.copy.files)
            .pipe(gulp.dest(paths.libs.css.copy.dest))
            .on('data', function (file) {

                $.util.log(chalk.black.bgGreen(' COPY: ') + ' ' + path.basename(file.path));

                if (i >= length) {
                    Logger.msg('');
                }

                i++;
            });
    });

};