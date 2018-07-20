module.exports = function (grunt) {

	const sass = require('node-sass');
  
	  // Start out by loading the grunt modules we'll need
	  require('load-grunt-tasks')(grunt);
  
	  // Show elapsed time
	  require('time-grunt')(grunt);
  
	  grunt.initConfig(
		  {
  
	  
  
		/**
		 * Auto-prefix CSS Elements after SASS is processed.
		 */
		autoprefixer: {
  
		  options: {
			browsers: ['last 5 versions'],
			  map:      true
		  },
  
		  files: {
			expand:  true,
			  flatten: true,
			  src:     ['assets/css/ufhealth-require-image-alt-tags.css'],
			  dest:    'assets/css'
		  }
		},
  
		/**
		 * Minify CSS after prefixes are added
		 */
		cssmin: {
  
		  target: {
  
			files: [{
			  expand: true,
			  cwd:    'assets/css',
			  src:    ['ufhealth-require-image-alt-tags.css'],
			  dest:   'assets/css',
			  ext:    '.min.css'
			}]
  
		  }
		},
  
		/**
		 * Process SASS
		 */
		sass: {
  
		  dist: {
  
			options: {
			  style:     'expanded',
			  sourceMap: true,
			  implementation: sass
			},
  
			files: {
			  'assets/css/ufhealth-require-image-alt-tags.css': 'assets/css/scss/ufhealth-require-image-alt-tags.scss'
			}
		  }
		},
  
			  /**
			   * Clean existing files
			   */
			  clean: {
				  styles:  {
					  src: [
						  'assets/css/*.css',
						  'assets/css/*.map'
					  ]
				  },
				  scripts: {
					  src: [
						  'assets/js/*.js',
						  'assets/js/*.map'
					  ]
				  }
			  },
  
	  
  
	  
  
			  /**
			   * Processes and compresses JavaScript.
			   */
			  uglify: {
  
				  production: {
  
					  options: {
						  beautify:         false,
						  preserveComments: false,
						  sourceMap:        false,
						  mangle:           {
							  reserved: ['jQuery']
						  }
					  },
  
					  files: {
						  'assets/js/ufhealth-require-image-alt-tags.min.js': [
							  'assets/js/src/ufhealth-require-image-alt-tags.js'
						  ]
					  }
				  },
  
				  dev: {
  
					  options: {
						  beautify:         true,
						  preserveComments: true,
						  sourceMap:        true,
						  mangle:           {
							  reserved: ['jQuery']
						  }
					  },
  
					  files: {
						  'assets/js/ufhealth-require-image-alt-tags.js': [
							  'assets/js/src/ufhealth-require-image-alt-tags.js'
						  ]
					  }
				  }
			  },
  
		/**
		 * Clean up the JavaScript
		 */
		jshint: {
		  options: {
			jshintrc: true
		  },
		  all:     ['assets/js/src/ufhealth-require-image-alt-tags.js']
		},
  
		/**
		 * Watch scripts and styles for changes
		 */
		watch: {
  
		  options: {
			livereload: true
		  },
		  scripts: {
  
			files: [
			  'assets/js/src/*'
			],
  
			  tasks: ['uglify:production']
  
		  },
		  styles: {
  
			files: [
			  'assets/css/scss/*'
			],
  
			  tasks: ['sass', 'autoprefixer', 'cssmin']
  
		  }
  
		
		},
	  
  
			  /**
			   * Update translation file.
			   */
			  makepot: {
  
				  target: {
					  options: {
						  type:        'wp-plugin',
						  domainPath:  '/languages',
						  mainFile:    'ufhealth-require-image-alt-tags.php',
						  potFilename: 'ufhealth-require-image-alt-tags.pot',
						  exclude: ['vendor']
					  }
				  }
			  }
		  }
	  );
  
	  // A very basic default task.
	grunt.registerTask('default', ['jshint', 'uglify:production', 'uglify:dev', 'sass', 'autoprefixer', 'cssmin', 'makepot']);
	
	grunt.registerTask('dev', ['default', 'watch']);
	
  
  };
  