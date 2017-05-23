/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/
'use strict'



module.exports = function(grunt) {
var mozjpeg = require('imagemin-mozjpeg');

  grunt.initConfig({
    responsive_images: {
      dev1: {
        options: {
          engine: 'im',
          sizes: [{
            width:600,
            suffix:'_large_2x',
            quality:30
          }, {
            width:300,
            suffix:'_large_1x', // ---> Use when you need this size -- it is one si
            quality:50
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
      logo: {
        options: {
          engine: 'im',
          sizes: [{
            width:120,
            suffix:'_large_2x',
            quality:50
          }, {
            width:100,
            suffix:'_large_1x', // ---> Use when you need this size -- it is one si
            quality:50
          }]
        }, files: [{
                  expand: true,
                  src: ['*.{gif,jpg,png}'],
                  cwd: 'images_src/logo/',
                  dest:'images/'
          }]
      },
      banner: {
        options: {
          engine: 'im',
          sizes: [{
            width:1000,
            suffix:'_large_2x',
            quality:80
          }, {
            width:600,
            suffix:'_large_1x', // ---> Use when you need this size -- it is one si
            quality:50
          }]
        }, files: [{
                  expand: true,
                  src: ['*.{gif,jpg,png}'],
                  cwd: 'images_src/banner/',
                  dest:'images/'
          }]
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

  "imagemagick-convert" : {
    dev1:{
      args:['images/w_media-800_large_2x.jpg', '-strip','-quality','92','-interlace','JPEG','-colorspace','RGB','images/w_media-800_large_2x.jpg']
    },
    dev2:{
      args:['images/w_pictures-800_large_2x.jpg', '-strip','-quality','92','-interlace','JPEG','-colorspace','RGB','images/w_pictures-800_large_2x.jpg']
    },
    dev3:{
      args:['images/w_text-800_large_2x.jpg', '-strip','-quality','92','-interlace','JPEG','-colorspace','RGB','images/w_text-800_large_2x.jpg']
    },
    dev4:{
      args:['images/w_final-800_large_2x.jpg', '-strip','-quality','92','-interlace','JPEG','-colorspace','RGB','images/w_final-800_large_2x.jpg']
    },
    dev5:{
      args:['images/w_tables-800_large_2x.jpg', '-strip','-quality','92','-interlace','JPEG','-colorspace','RGB','images/w_tables-800_large_2x.jpg']
    },
    dev6:{
      args:['images/w_forms-800_large_2x.jpg', '-strip','-quality','92','-interlace','JPEG','-colorspace','RGB','images/w_forms-800_large_2x.jpg']
    },
    dev7:{
      args:['images/w_banner-800_large_2x.jpg', '-strip','-quality','92','-interlace','JPEG','-colorspace','RGB','images/w_banner-800_large_2x.jpg']
    },
    dev8:{
      args:['images/logo_00-800_large_2x.jpg', '-strip','-quality','92','-interlace','JPEG','-colorspace','RGB','images/logo_00-800_large_2x.jpg']
    },
  },

  imagemin: {                          // Task
    static: {                          // Target
      options: {                       // Target options
        optimizationLevel: 7,
        svgoPlugins: [{ removeViewBox: false }],
        use: [mozjpeg()]
      },
      files: {                         // Dictionary of files
        'images/img.png': 'images_src/img.png', // 'destination': 'source'
        'images/img.jpg': 'images_src/img.jpg',
        'images/img.gif': 'images_src/img.gif'
      }
    },
    dynamic: {                         // Another target
      options: {                       // Target options
        optimizationLevel: 7,
      },
      files: [{
        expand: true,                  // Enable dynamic expansion
        cwd: 'images/',                   // Src matches are relative to this path
        src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
        dest: 'images/'                  // Destination path prefix
      }]
    }
  }

  });

   grunt.loadNpmTasks('grunt-responsive-images');
   grunt.loadNpmTasks('grunt-imagemagick');
   grunt.loadNpmTasks('grunt-contrib-imagemin');
   grunt.loadNpmTasks('grunt-contrib-clean'); //COMMENT --> this is out because we can only run 1 file at the time to get 1x pics. also because we dont want to
   grunt.loadNpmTasks('grunt-contrib-copy');  //            delete, make dir, copy AGAIN that is why the tasks are out. 'imagemin:dynamic', 'imagemin:dynamic',
   grunt.loadNpmTasks('grunt-mkdir');
   grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images:dev1',
         'responsive_images:logo', 'responsive_images:banner']);

};
