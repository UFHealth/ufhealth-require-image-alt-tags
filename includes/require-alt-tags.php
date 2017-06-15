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

	$site_id = is_multisite() ? get_current_blog_id() : 0;

	/**
	 * Filter the screen IDs in where the script should be displayed
	 *
	 * This filter allows us to limit or expand to multiple content types or other screens based on the the current site.
	 *
	 * @since 1.0
	 *
	 * @param array $screens Array of screen IDs (post, page, etc).
	 * @param int   $site_id The current site ID.
	 */
	$screens = apply_filters( 'ufh_replace_alt_tags_screen_ids', array( 'post', 'page' ), $site_id );

	if ( in_array( get_current_screen()->id, $screens, true ) ) {

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

		wp_localize_script(
			'ufhealth_require_alt_tags',
			'ufhTagsCopy',
			array(
				'txt'     => 'The following image(s) are missing alt text',
				'editTxt' => 'You must enter alt text to the image',
			)
		);

	}
}
