'use strict';

var fs    = require('fs'),
    path  = require('path'),
    chalk = require('chalk'),
    cleanCSS = require('gulp-clean-css'),
    urlAdjuster = require('gulp-css-url-adjuster'),
    sourcemaps = require('gulp-sourcemaps');

module.exports = function (gulp, $, paths, config, Logger) {

    gulp.task(config.task.appStyles, ' - pliki styli koszyka', function () {
        Logger.msg('');
        Logger.msg('Generuję plik styli...');
        Logger.msg('');

        return gulp.src(paths.core.css.files)
            .pipe(sourcemaps.init())
            .pipe($.sass(config.sass.options).on('error', $.sass.logError))
            .pipe($.autoprefixer(config.autoprefixer.options))
            .pipe(gulp.dest(paths.core.css.dest))
            .on('data', function () {
                Logger.msg('Plik gotowy:');
            })
            .pipe($.size(config.size.options))
            .on('data', function () {
                Logger.msg('');
                Logger.msg('Minimalizuję plik...');
                Logger.msg('');
            })
            .pipe(cleanCSS(config.cleanCSS.options))
            .pipe(gulp.dest(paths.core.css.dest))
            .on('data', function () {
                Logger.msg('Plik gotowy:');
            })
            .pipe(sourcemaps.write('/maps'))
            .pipe(gulp.dest(paths.core.css.dest))
            .pipe($.size(config.size.options))
            .on('data', function () {
                Logger.success('Gotowe!');
                Logger.msg('');
            });
    });

    gulp.task(config.task.appModalStyles, ' - pliki styli modali koszyka', function () {
        Logger.msg('');
        Logger.msg('Generuję plik styli...');
        Logger.msg('');

        return gulp.src(paths.core.modals.files)
            .pipe(sourcemaps.init())
            .pipe($.sass(config.sass.options).on('error', $.sass.logError))
            .pipe($.autoprefixer(config.autoprefixer.options))
            .pipe(gulp.dest(paths.core.modals.dest))
            .on('data', function () {
                Logger.msg('Plik gotowy:');
            })
            .pipe($.size(config.size.options))
            .on('data', function () {
                Logger.msg('');
                Logger.msg('Minimalizuję plik...');
                Logger.msg('');
            })
            .pipe(cleanCSS(config.cleanCSS.options))
            .pipe(gulp.dest(paths.core.modals.dest))
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

    gulp.task(config.task.libsStylesCopy, ' - kopiowanie potrzebnych plików styli bibliotek', function () {
        var length = paths.libs.css.copy.files.length;
        var i      = 1;

        Logger.warning('Kopiuje potrzebne pliki bibliotek (ilość plików: ' + length + '):');
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

    gulp.task(config.task.domainsStyles, ' - wygenerowanie plików styli dla poszczególnych domen', function () {

        Logger.msg('');
        Logger.msg('Przepisuję pliki styli...');
        Logger.msg('');

        fs.readdir(paths.domains.path, function (err, files) {
            files.map(function (file) {
                return path.join(paths.domains.path, file);
            }).filter(function (file) {
                return fs.statSync(file).isDirectory();
            }).forEach(function (dir, index, arr) {
                var domainName = dir.split('/').slice(-1)[0];

                fs.exists(dir + '/css', function (exist) {
                    if (exist) {
                        gulp.src(dir + '/css/style.scss')
                            .pipe(sourcemaps.init())
                            .pipe($.sass(config.sass.options).on('error', $.sass.logError))
                            .pipe($.autoprefixer(config.autoprefixer.options))
                            .pipe(gulp.dest(paths.domains.css.dest))
                            .pipe(urlAdjuster(config.urlAdjuster.options))
                            .pipe(gulp.dest(paths.domains.css.dest))
                            .pipe($.rename(domainName + '.css'))
                            .pipe(gulp.dest(paths.domains.css.dest))
                            .on('data', function () {
                                Logger.msg('');
                                Logger.msg('Plik gotowy:');
                            })
                            .pipe($.size(config.size.options))
                            .on('data', function () {
                                Logger.msg('');
                                Logger.msg('Minimalizuję plik...');
                                Logger.msg('');
                            })
                            .pipe(cleanCSS(config.cleanCSS.options))
                            .pipe(gulp.dest(paths.core.css.dest))
                            .on('data', function () {
                                Logger.msg('Plik gotowy:');
                            })
                            .pipe(sourcemaps.write())
                            .pipe(gulp.dest(paths.core.modals.dest))
                            .pipe($.size(config.size.options))
                            .on('data', function () {
                                if (parseInt(index) === (arr.length - 1)) {
                                    Logger.success('Wszystkie domeny wygenerowane!');
                                    Logger.msg('');
                                }
                            });
                    } else {
                        Logger.warning('Dla domeny ' + domainName + ' nie ma dodatkowych plików styli.');
                        Logger.msg('');
                    }

                });

            });
        });

    });

};