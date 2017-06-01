<?php
/**
 * UFHealth Require Image Alt Tags Uninstaller
 *
 * Used when clicking "Delete" from inside of WordPress's plugins page.
 *
 * @package ufhealth-require-img-alt-tag
 *
 * @since   1.0
 *
 * @author  Chris Wiegman <cwiegman@ufl.edu>
 */

/**
 * Class UFHealth_Require_Image_Alt_Tag_Uninstaller
 */
class UFHealth_Require_Image_Alt_Tag_Uninstaller {

	/**
	 * Initialize uninstaller
	 *
	 * Perform some checks to make sure plugin can/should be uninstalled
	 *
	 * @since 2.0
	 */
	public function __construct() {

		// Exit if accessed directly.
		if ( ! defined( 'ABSPATH' ) ) {
			$this->exit_uninstaller();
		}

		// Not uninstalling.
		if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
			$this->exit_uninstaller();
		}

		// Not uninstalling.
		if ( ! WP_UNINSTALL_PLUGIN ) {
			$this->exit_uninstaller();
		}

		// Not uninstalling this plugin.
		if ( dirname( WP_UNINSTALL_PLUGIN ) !== dirname( plugin_basename( __FILE__ ) ) ) {
			$this->exit_uninstaller();
		}

		// Uninstall Bridge Profile Widget.
		self::clean_data();

	}

	/**
	 * Cleanup options
	 *
	 * Deletes plugin options and other data.
	 *
	 * @since 1.0
	 *
	 * @return void
	 */
	protected static function clean_data() {

	}

	/**
	 * Exit uninstaller
	 *
	 * Gracefully exit the uninstaller if we should not be here
	 *
	 * @since 1.0
	 *
	 * @return void
	 */
	protected function exit_uninstaller() {

		status_header( 404 );
		exit;

	}
}

new UFHealth_Require_Image_Alt_Tag_Uninstaller();
