/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/
'use strict'

module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev1: {
        options: {
          engine: 'im',
          sizes: [{
            width:1600,
            suffix:'_large_2x',
            quality:30,

            // width:800,
            // suffix:'_large_1x', ---> Use when you need this size -- it is one si
            // quality:50,
          }]
        }, files: [{
                  expand: true,
                  src: ['*.{gif,jpg,png}'],
                  cwd: 'images_src/',
                  dest:'images/'
          }]

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */

      },
      dev2: {
        options: {
          engine: 'im',
          sizes: [{
            // width:1600,
            // suffix:'_large_2x',
            // quality:30,

            width:800,
            suffix:'_large_1x', // ---> Use when you need this size -- it is one si
            quality:50,
          }]
        }, files: [{
                  expand: true,
                  src: ['*.{gif,jpg,png}'],
                  cwd: 'images_src/',
                  dest:'images/'
          }]

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */

      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['images'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['images']
        },
      },
    },

    /* Copy the "fixed" images that don't go through processing into the images/directory */
    copy: {
      dev: {
        files: [{
          expand: true,
          src: 'images_src/fixed/*.{gif,jpg,png}',
          dest: 'images/'
        }]
      },
    },
  });

   grunt.loadNpmTasks('grunt-responsive-images');
   grunt.loadNpmTasks('grunt-contrib-clean'); //COMMENT --> this is out because we can only run 1 file at the time to get 1x pics. also because we dont want to
   grunt.loadNpmTasks('grunt-contrib-copy');  //            delete, make dir, copy AGAIN that is why the tasks are out.
   grunt.loadNpmTasks('grunt-mkdir');
   grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images:dev1', 'responsive_images:dev2']);
  //grunt.registerTask('default', ['responsive_images:dev1', 'responsive_images:dev2']); // use it whe you want to add pictures to the dir
};
