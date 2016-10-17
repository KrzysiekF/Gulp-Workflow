'use strict';

var fs    = require('fs'),
    path  = require('path'),
    chalk = require('chalk'),
    sourcemaps = require('gulp-sourcemaps');

module.exports = function (gulp, $, paths, config, Logger) {

    gulp.task(config.task.appScripts, ' - kompilowanie plików skryptów', function () {
        Logger.msg('');
        Logger.msg('Generuję plik skryptów aplikacji...');
        Logger.msg('');
        Logger.msg('Łączę pliki...');
        Logger.msg('');

        return gulp.src(paths.core.js.files)
            .pipe(sourcemaps.init())
            .pipe($.concat(paths.core.js.fileName))
            .pipe(gulp.dest(paths.core.js.dest))
            .on('data', function () {
                Logger.msg('Pliki połączone:');
            })
            .pipe($.size(config.size.options))
            .on('data', function () {
                Logger.msg('');
                Logger.msg('Minimalizuję plik...');
                Logger.msg('');
            })
            .pipe($.uglify(config.uglify.prodOptions))
            .pipe(gulp.dest(paths.core.js.dest))
            .on('data', function () {
                Logger.msg('Plik gotowy:');
            })
            .pipe(sourcemaps.write('/maps'))
            .pipe(gulp.dest(paths.core.js.dest))
            .pipe($.size(config.size.options))
            .on('data', function () {
                Logger.success('Gotowe!');
                Logger.msg('');
            });
    });

    gulp.task(config.task.libsScripts, ' - kompilowanie plików skryptów biliotek', function () {
        Logger.msg('');
        Logger.msg('Generuję plik bibliotek...');
        Logger.msg('');
        Logger.msg('Łączę pliki...');
        Logger.msg('');

        return gulp.src(paths.libs.js.files)
            .pipe(sourcemaps.init())
            .pipe($.concat(paths.libs.js.fileName))
            .pipe(gulp.dest(paths.libs.js.dest))
            .on('data', function () {
                Logger.msg('Pliki połączone:');
            })
            .pipe($.size(config.size.options))
            .on('data', function () {
                Logger.msg('');
                Logger.msg('Minimalizuję plik...');
                Logger.msg('');
            })
            .pipe($.uglify(config.uglify.prodOptions))
            .pipe(gulp.dest(paths.libs.js.dest))
            .on('data', function () {
                Logger.msg('Plik gotowy:');
            })
            .pipe(sourcemaps.write('/maps'))
            .pipe(gulp.dest(paths.libs.js.dest))
            .pipe($.size(config.size.options))
            .on('data', function () {
                Logger.success('Gotowe!');
                Logger.msg('');
            });
    });

    gulp.task(config.task.libsScriptsCopy, ' - kopiowanie potrzebnych plików skryptów bilbiotek', function () {
        var length = paths.libs.js.copy.files.length;
        var i      = 1;

        Logger.warning('Kopiuje potrzebne pliki bibliotek (ilość plików: ' + length + '):');
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

    gulp.task(config.task.domainsScripts, ' - wygenerowanie plików skryptów dla poszczególnych domen', function () {
        
        fs.readdir(paths.domains.path, function (err, files) {
            files.map(function (file) {
                return path.join(paths.domains.path, file);
            }).filter(function (file) {
                return fs.statSync(file).isDirectory();
            }).forEach(function (dir, index, arr) {
                var domainName = dir.split(/\/|\\/g).slice(-1)[0];

                Logger.warning('Domena: ' + domainName);

                Logger.msg('');
                Logger.msg('Generuję plik skryptów...');
                Logger.msg('');
                Logger.msg('Łączę pliki...');
                Logger.msg('');

                gulp.src([dir + '/**/*.js', dir + '/*.js'])
                    .pipe(sourcemaps.init())
                    .pipe($.concat(domainName + '.min.js'))
                    .pipe(gulp.dest(paths.domains.js.dest))
                    .on('data', function () {
                        Logger.msg('Pliki połączone:');
                    })
                    .pipe($.size(config.size.options))
                    .on('data', function () {
                        Logger.msg('');
                        Logger.msg('Minimalizuję plik...');
                        Logger.msg('');
                    })
                    .pipe($.uglify(config.uglify.devOptions))
                    .pipe(gulp.dest(paths.domains.js.dest))
                    .on('data', function () {
                        Logger.msg('Plik gotowy:');
                    })
                    .pipe(sourcemaps.write('/maps'))
                    .pipe(gulp.dest(paths.core.modals.dest))
                    .pipe($.size(config.size.options))
                    .on('data', function () {
                        Logger.success('Gotowe!');
                        Logger.msg('');
                    });

            });
        });

    });

};