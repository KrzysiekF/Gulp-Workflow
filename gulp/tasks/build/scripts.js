'use strict';

var fs    = require('fs'),
    path  = require('path'),
    chalk = require('chalk'),
    sourcemaps = require('gulp-sourcemaps');

module.exports = function (gulp, $, paths, config, Logger) {

    gulp.task(config.task.appScripts, ' - app scripts', function () {
        Logger.msg('');
        Logger.msg('Generating your application scripts...');
        Logger.msg('');
        Logger.msg('I combine files...');
        Logger.msg('');

        return gulp.src(paths.core.js.files)
            .pipe(sourcemaps.init())
            .pipe($.concat(paths.core.js.fileName))
            .pipe(gulp.dest(paths.core.js.dest))
            .on('data', function () {
                Logger.msg('Combined file ready:');
            })
            .pipe($.size(config.size.options))
            .on('data', function () {
                Logger.msg('');
                Logger.msg('I minimize files...');
                Logger.msg('');
            })
            .pipe($.uglify(config.uglify.prodOptions))
            .pipe(gulp.dest(paths.core.js.dest))
            .on('data', function () {
                Logger.msg('File ready:');
            })
            .pipe(sourcemaps.write('/maps'))
            .pipe(gulp.dest(paths.core.js.dest))
            .pipe($.size(config.size.options))
            .on('data', function () {
                Logger.success('Done!');
                Logger.msg('');
            });
    });

    gulp.task(config.task.libsScripts, ' - compiling script files libraries', function () {
        Logger.msg('');
        Logger.msg('Generating your libraries file...');
        Logger.msg('');
        Logger.msg('I combine files...');
        Logger.msg('');

        return gulp.src(paths.libs.js.files)
            .pipe(sourcemaps.init())
            .pipe($.concat(paths.libs.js.fileName))
            .pipe(gulp.dest(paths.libs.js.dest))
            .on('data', function () {
                Logger.msg('Combined file ready:');
            })
            .pipe($.size(config.size.options))
            .on('data', function () {
                Logger.msg('');
                Logger.msg('I minimize files...');
                Logger.msg('');
            })
            .pipe($.uglify(config.uglify.prodOptions))
            .pipe(gulp.dest(paths.libs.js.dest))
            .on('data', function () {
                Logger.msg('File ready:');
            })
            .pipe(sourcemaps.write('/maps'))
            .pipe(gulp.dest(paths.libs.js.dest))
            .pipe($.size(config.size.options))
            .on('data', function () {
                Logger.success('Done!');
                Logger.msg('');
            });
    });

    gulp.task(config.task.libsScriptsCopy, ' - copy the necessary library files (scripts)', function () {
        var length = paths.libs.js.copy.files.length;
        var i      = 1;

        Logger.warning('Copies library files (files: ' + length + '):');
        Logger.msg('');

        return gulp
            .src(paths.libs.js.copy.files)
            .pipe(gulp.dest(paths.libs.js.copy.dest))
            .on('data', function (file) {
                $.util.log(chalk.black.bgGreen(' COPY: ') + ' ' + path.basename(file.path));

                if (i >= length) {
                    Logger.msg('');
                }

                i++;
            });
    });

};