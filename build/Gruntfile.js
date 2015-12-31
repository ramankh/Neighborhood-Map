module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %><%= grunt.template.today("yyyy-mm-dd") %> Author: Raman Khenanisho*/\n'
            },
            build: {
                files: {
                    'build/js/common.js': ['js/common.js'],
                    'build/js/yelp.js': ['js/yelp.js'],
                    'build/models/appModel.js': ['models/appModel.js']
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            build: {
                files: {
                    'build/css/style.css': ['css/style.css'],
                }
            }
        },
        htmlmin: { // Task
            build: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: { // Dictionary of files
                    'build/index.html': 'index.html', // 'destination': 'source'
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'cssmin', 'htmlmin']);

};
