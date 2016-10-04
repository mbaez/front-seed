/**
 *Minimize del frontend
 * 1) connect
 * 2) open
 * 3) sass
 * 4) copy
 * 5) uglify
 * 6) concat
 * 7) remove
 * 8) string-replace
 * 9) usebanner
 * 10) watch
 */

module.exports = function (grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    hostname: '0.0.0.0',
                    port: 8888,
                    base: "dist",
                    livereload: true,
                    middleware: function (connect, options, defaultMiddleware) {
                        var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                        return [proxy].concat(defaultMiddleware);
                    }
                },
                proxies: [{
                    context: '/app/rest',
                    host: "192.168.10.1",
                    port: 8080,
                }]
            }
        },
        open: {
            all: {
                path: 'http://localhost:8888'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: false
                },
                files: {
                    'dist/css/main.css': 'src/scss/main.scss'
                }
            }
        },
        copy: {
            main: {
                files: [{
                        cwd: 'src/vendors/bootstrap-sass/assets/fonts',
                        src: '**/*',
                        dest: 'dist/fonts',
                        expand: true
                    }, {
                        cwd: 'src/vendors/fontawesome/fonts',
                        src: '**/*',
                        dest: 'dist/fonts',
                        expand: true
                    }, {
                        cwd: 'src/images',
                        src: '**/*',
                        dest: 'dist/images',
                        expand: true
                    }, {
                        cwd: 'src/',
                        src: '*.html',
                        dest: 'dist/',
                        expand: true
                    }
                ]
            }
        },
        uglify: {
            options: {
                mangle: false,
                sourceMap: false
            },
            build: {
                files: [{
                    expand: true,
                    cwd: 'src/js',
                    src: '**/*js',
                    dest: 'dist/js',
                    ext: '.js',
                    extDot: 'last'
                }]
            }
        },
        concat: {
            options: {
                separator: '\n'
            },
            libs: {
                src: [
                'src/vendors/jquery/dist/jquery.min.js',
                'src/vendors/jquery-ui/jquery-ui.min.js',
                'src/vendors/bootstrap-sass/assets/javascripts/bootstrap.min.js',
                'dist/js/app.js'
                ],
                dest: 'dist/libs/app.min.js'
            }
        },
        remove: {
            default_options: {
                trace: true,
                dirList: ['dist/js']
            }
        },

        'string-replace': {
            inline: {
                files: {
                    'dist/': ['dist/*.html', 'dist/libs/*.js', 'dist/css/*.css'],
                },
                options: {
                    replacements: [{
                        pattern: /{{VERSION}}/g,
                        replacement: '<%= pkg.version %>'
                    }]
                }
            }
        },
        usebanner: {
            taskName: {
                options: {
                    position: 'top',
                    banner: '/*!\n' +
                        '  * <%= pkg.name %> : <%= pkg.description %>\n' +
                        '  * @version <%= pkg.version %>\n' +
                        '  * @author <%= pkg.author %>\n' +
                        '  * @date <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                        '  */\n',
                    linebreak: true
                },
                files: {
                    src: ['dist/**/*.js']
                }
            }
        },
        watch: {
            img: {
                options: {
                    livereload: true
                },
                files: ['src/**/*.png',
                        'src/**/*.jpg',
                        'src/**/*.gif',
                        'src/**/*.eot',
                        'src/**/*.svg',
                        'src/**/*.ttf',
                        'src/**/*.woff',
                        'src/**/*.woff2'
                    ],
                tasks: ['copy']
            },
            html: {
                options: {
                    livereload: true
                },
                files: ['src/*.html', 'src/**/*.html'],
                tasks: ['copy']
            },
            js: {
                options: {
                    livereload: true
                },
                files: ['src/**/*.js'],
                tasks: ['uglify', 'string-replace', 'concat']
            },
            sass: {
                options: {
                    livereload: true
                },
                files: ['src/**/*.scss'],
                tasks: ['copy', 'sass']
            }
        }
    });

    grunt.registerTask('default', ['uglify', 'sass', "copy", 'string-replace', 'concat', 'remove', 'usebanner']);
    grunt.registerTask('server', ['default', 'configureProxies:server', "open", 'connect:server', 'watch']);
    grunt.registerTask('serve', ['server']);
};
