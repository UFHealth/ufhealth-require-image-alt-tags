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

		var notice           = ('undefined' !== typeof showNotice) ? showNotice : false,
		    $parent          = $('.media-frame-toolbar .media-toolbar-primary'),
		    secondaryToolbar = $('.media-frame-toolbar .media-toolbar-secondary').children().length,
		    selectedImages   = $('.selection-view ul.attachments li'),
		    canProceed       = true,
		    badImages        = [];

		if (0 === selectedImages.length) {

			var altText;

			if (0 < secondaryToolbar) {

				altText = $('.media-frame-content input[data-setting="alt"]').val();

			} else {

				altText = $('.media-frame-content label[data-setting="alt"] input').val();

			}

			if (altText.length && 0 < altText.length) {

				$parent.addClass('ufh-has-alt-text');

				return true;

			}

			if (notice) {
				alert(ufhTagsCopy.editTxt);
			}

			return false;

		} else {

			selectedImages.each(function (idx, li) {

				var $image  = $(li),
				    imageId = $image.attr('data-id'),
				    image   = wp.media.model.Attachment.get(imageId),
				    altText = image.get('alt');

				if (altText.length) {

					$parent.addClass('ufh-has-alt-text');
					$image.removeClass('ufh-needs-alt-text');

				} else {

					$image.addClass('ufh-needs-alt-text');

					badImages.push(image.get('title'));

					canProceed = false;

				}

			});

			if (false === canProceed) {

				$parent.removeClass('ufh-has-alt-text');

				if (notice) {

					var imageList = '\n\n';

					for (var i = 0, l = badImages.length; i < l; i++) {
						imageList = imageList + badImages[i] + '\n\n';
					}

					alert(ufhTagsCopy.disclaimer + '\n\n' + ufhTagsCopy.txt + ':' + imageList);
				}

				return false;

			}

			return true;

		}
	};

	var body = $('body');

	// Bind to keyup.
	body.on('keyup', '.media-modal-content label[data-setting="alt"] input, .media-frame-content input[data-setting="alt"]', function () {
		checkForAlt();
	});

	// Bind to the 'Insert into post' button.
	body.on('mouseenter mouseleave click', '.media-frame-toolbar .media-toolbar-primary', function (e) {
		checkForAlt(e.type === 'click');
	});
});