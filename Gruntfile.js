/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/
'use strict'

var mozjpeg = require('imagemin-mozjpeg');

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


  imagemin: {                          // Task
    static: {                          // Target
      options: {                       // Target options
        optimizationLevel: 3,
        svgoPlugins: [{ removeViewBox: false }],
        use: [mozjpeg()]
      },
      files: {                         // Dictionary of files
        'dist/img.png': 'src/img.png', // 'destination': 'source'
        'dist/img.jpg': 'src/img.jpg',
        'dist/img.gif': 'src/img.gif'
      }
    },
    dynamic: {                         // Another target
      files: [{
        expand: true,                  // Enable dynamic expansion
        cwd: 'src/',                   // Src matches are relative to this path
        src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
        dest: 'dist/'                  // Destination path prefix
      }]
    }
  },

  });

   grunt.loadNpmTasks('grunt-responsive-images');
   grunt.loadNpmTasks('grunt-contrib-imagemin');
   grunt.loadNpmTasks('grunt-contrib-clean'); //COMMENT --> this is out because we can only run 1 file at the time to get 1x pics. also because we dont want to
   grunt.loadNpmTasks('grunt-contrib-copy');  //            delete, make dir, copy AGAIN that is why the tasks are out.
   grunt.loadNpmTasks('grunt-mkdir');
   grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images:dev1', 'responsive_images:dev2', 'imagemin']);
  //grunt.registerTask('default', ['responsive_images:dev1', 'responsive_images:dev2']); // use it whe you want to add pictures to the dir
};
