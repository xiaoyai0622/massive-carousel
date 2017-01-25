/**
 * Created by xiaoY on 24/1/17.
 */
module.exports = function(grunt) { // the general grunt function that is run

    grunt.initConfig({ // here we setup our config object with package.json and all the tasks

        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                files: {
                    'css/app.css': 'sass/main.scss'
                }
            }
        },

        cssmin: { // minifying css task
            dist: {
                options: {
                    compass: true, // enable the combass lib, more on this later
                    style: 'expanded' // we don't want to compress it
                },
                files: {
                    'css/app.min.css': 'css/app.css'
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'js/index.js']
        },
        watch: { // watch task for general work
            // sass: {
            //     files: ['sass/**/*.scss','js/**/*.js'],
            //     tasks: ['sass']
            // },
            styles: {
                files: ['css/app.css'],
                tasks: ['cssmin']
            },
            js:{
                files: ['js/index.js'],
                tasks: ['uglify']
            }
        },
        uglify: {
            my_target: {
                files: {
                    'js/output.min.js': 'js/index.js'
                }
            }
        }
    });

    // all the plugins that is needed for above tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // registering the default task that we're going to use along with watch
    grunt.registerTask('default', ['sass', 'cssmin','jshint','uglify']);
};