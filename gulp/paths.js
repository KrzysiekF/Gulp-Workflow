'use strict';

module.exports = {

    core: {
        js: {
            files: [
                'page/assets/js/*.js',
                '!app/core/js/**/*.spec.js'
            ],
            dest: 'page/assets/js',
            watch: [
                'page/assets/js/**/*.js'
            ],
            fileName: 'app.min.js'
        },

        css: {
            files: 'page/assets/styles/style.scss',
            dest: 'page/assets/styles',
            watch: 'page/assets/styles/*.scss'
        }

    },
    libs: {
        js: {
            files: [
                
            ],
            dest: 'public/assets/js',
            fileName: 'libs.min.js',
            copy: {
                files: [
                    
                ],
                dest: 'public/assets/js/libs'
            }
        },

        css: {
            copy: {
                files: [
                    
                ],
                dest: 'public/assets/css/libs'
            }
        }
    },

    error: function(error) {
        gutil.log(
            gutil.colors.red(
                '\n\------------------------------\n\Error in plugin (' + gutil.colors.green(error.plugin) + '):\n\ ' + gutil.colors.blue(error.message) + '------------------------------'
            )
        );
        this.emit('end');
    }
};