module.exports = function(grunt){
    // project config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint:{
            all: ['Gruntfile.js', 'src/js/**/*.js']
        },
        uglify: {
            my_target: {
                files: {
                    'dist/js/output.js': ['src/js/**/*.js']
                }
            }
        },
        cssmin:{
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
//                files: {
//                  'dist/css/main.css': ['src/css/main.css']
//                }
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        }
    });
    
    // load grunt tasks
//    grunt.loadNpmTasks(taskName);
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    
//    register task (the purpose of this is linking the task one wants 
//    to one specific 'global' task, in this case `default`)
//    grunt.registerTask(taskNameCalledInTerminal, [array of tasks]);
    grunt.registerTask('default', ['grunt-contrib-uglify', 'grunt-contrib-cssmin']);
};