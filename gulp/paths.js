'use strict';

module.exports = {

    core: {
        js: {
            files: [
                

                '!app/core/js/**/*.spec.js'
            ],
            dest: 'public/assets/js',
            watch: [
                'app/core/js/**/*.js'
            ],
            fileName: 'app.min.js'
        },

        css: {
            files: 'app/core/css/style.scss',
            dest: 'public/assets/css',
            watch: 'app/core/css/*.scss'
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