/**
 * UF Health Require Image Alt Tags
 * https://ufhealth.org/
 *
 * Copyright (c) 2017 UF Health
 * Licensed under the GPLv2+ license.
 */
jQuery(document).ready(function ($) {
	'use strict';

	var checkForAlt = function (showNotice) {

		var notice = ('undefined' !== typeof showNotice) ? showNotice : false;
		var $altText   = $('.media-modal-content label[data-setting="alt"] input');
		var $parent    = $('.media-frame-toolbar .media-toolbar-primary');

		if (!$altText.length) {
			// No image selected in the first place; bail out.
			return;
		}

		if ($altText.val().length) {
			$parent.addClass('my-has-alt-text');
			return true;
		} else {
			$parent.removeClass('my-has-alt-text');
			if (notice) {
				alert('Missing Alt Text!');
			}
			return false;
		}
	};

	// Bind to keyup.
	$('body').on('keyup', '.media-modal-content label[data-setting="alt"] input', function () {
		checkForAlt();
	});

	// Bind to the 'Inesert into post' button.
	$('body').on('mouseenter mouseleave click', '.media-frame-toolbar .media-toolbar-primary', function (e) {
		checkForAlt(e.type === 'click');
	});
});
