<?php
/**
 * Plugin Name: UFHealth Require Image Alt Tags
 * Plugin URI: https://sites.medinfo.ufl.edu/
 * Description: Require ALT tags for images inserted into content.
 * Version: 1.0
 * Text Domain: ufhealth-require-img-alt-tag
 * Domain Path: /lang
 * Author: UF Health
 * Author URI: https://ufhealth.org/
 * Copyright 2017 UF Health
 */

define( 'UFHEALTH_REQUIRE_IMG_ALT_TAG_VERSION', '1.0' );
define( 'UFHEALTH_REQUIRE_IMG_ALT_TAG_URL', plugin_dir_url( __FILE__ ) );
define( 'UFHEALTH_REQUIRE_IMG_ALT_TAG_INCLUDES', trailingslashit( plugin_dir_path( __FILE__ ) ) . 'includes/' );

add_action( 'plugins_loaded', 'ufhealth_require_img_alt_tag_loader' );

/**
 * Bootstrap UFHealth Require Image Alt Tags functionality.
 */
function ufhealth_require_img_alt_tag_loader() {

	// Remember the text domain.
	load_plugin_textdomain( 'ufhealth-require-img-alt-tag', false, dirname( dirname( __FILE__ ) ) . '/lang' );

}
