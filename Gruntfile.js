module.exports = function(grunt){
    // project config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });
    
    // load grunt tasks
//    grunt.loadNpmTasks(taskName);
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
//    register task (the purpose of this is linking the task one wants 
//    to one specific 'global' task, in this case `default`)
//    grunt.registerTask(taskNameCalledInTerminal, [array of tasks]);
    grunt.registerTask('default', []);
}