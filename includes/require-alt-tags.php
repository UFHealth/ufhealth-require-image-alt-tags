<?php
/**
 * Add plugin functionality for requiring alt tags.
 *
 * @since 1.0
 *
 * @package UFHealth\require_image_alt_tags
 */

namespace UFHealth\require_image_alt_tags;

add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\action_admin_enqueue_scripts' );

/**
 * Enqueue necessary admin scripts.
 *
 * @since 1.0
 */
function action_admin_enqueue_scripts() {

	if ( 'post' === get_current_screen()->id ) {

		$min = '.min';
		$src = '';

		if ( defined( 'SCRIPT_DEBUG' ) && true === SCRIPT_DEBUG ) {

			$min = '';
			$src = 'src/';

		}

		wp_register_script( 'ufhealth_require_alt_tags', UFHEALTH_REQUIRE_IMAGE_ALT_TAGS_URL . 'assets/js/' . $src . 'ufhealth-require-image-alt-tags' . $min . '.js', array( 'jquery' ), UFHEALTH_REQUIRE_IMAGE_ALT_TAGS_VERSION, true );
		wp_register_style( 'ufhealth_require_alt_tags', UFHEALTH_REQUIRE_IMAGE_ALT_TAGS_URL . 'assets/css/ufhealth-require-image-alt-tags' . $min . '.css', array(), UFHEALTH_REQUIRE_IMAGE_ALT_TAGS_VERSION );

		wp_enqueue_script( 'ufhealth_require_alt_tags' );
		wp_enqueue_style( 'ufhealth_require_alt_tags' );

	}
}
