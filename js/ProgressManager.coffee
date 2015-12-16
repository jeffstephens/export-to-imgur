#
# Manage album conversion progress
#

class ProgressManager

	isInProgress: (background) =>
		if not background?
			throw new Error "A background page object is required."
		background.TOTAL_IMAGE_COUNT > 0

	getPercentComplete: (background) =>
		if not background?
			throw new Error "A background page object is required."
		fractionComplete = background.UPLOADED_IMAGE_LIST.length / background.TOTAL_IMAGE_COUNT
		Math.round(100 * fractionComplete)

module.exports = ProgressManager
