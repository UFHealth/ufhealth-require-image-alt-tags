module.exports = function ( grunt ) {

	// Start out by loading the grunt modules we'll need
	require( 'load-grunt-tasks' )( grunt );

	// Show elapsed time
	require( 'time-grunt' )( grunt );

	grunt.initConfig(
		{

			/**
			 * Processes and compresses JavaScript.
			 */
			uglify : {

				production : {

					options : {
						beautify         : false,
						preserveComments : false,
						mangle           : {
							reserved : ['jQuery']
						}
					},

					files : {
						'assets/js/ufhealth-require-img-alt-tag.min.js' : [
							'assets/js/src/ufhealth-require-img-alt-tag.js'
						]
					}
				}
			},

			/**
			 * Clean up the JavaScript
			 */
			jshint : {
				options : {
					jshintrc : true
				},
				all     : ['assets/js/src/ufhealth-require-img-alt-tag.js']
			},

			/**
			 * Watch scripts and styles for changes
			 */
			watch : {

				options : {
					livereload : true
				},

				scripts : {

					files : [
						'assets/js/src/ufhealth-require-img-alt-tag.js'
					],

					tasks : ['uglify:production']

				}
			},

			/**
			 * Update translation file.
			 */
			makepot : {

				target : {
					options : {
						type        : 'wp-plugin',
						domainPath  : '/lang',
						mainFile    : 'ufhealth-require-img-alt-tag.php',
						potFilename : 'ufhealth-require-img-alt-tag.pot'
					}
				}
			},

			/**
			 * Make sure PHP unit tests have been completed
			 */
			phpunit : {

				classes : {
					dir : 'tests/'
				},

				options : {

					bin        : './vendor/bin/phpunit',
					testSuffix : 'Tests.php',
					bootstrap  : 'bootstrap.php',
					colors     : true

				}
			}
		}
	);

	// A very basic default task.
	grunt.registerTask( 'default', ['phpunit', 'jshint', 'uglify:production', 'makepot'] );
	grunt.registerTask( 'production', ['uglify:production', 'makepot'] );
	grunt.registerTask( 'dev', ['default', 'watch'] );

};