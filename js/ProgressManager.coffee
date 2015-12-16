#
# Manage album conversion progress
#

class ProgressManager

	isInProgress: (background) =>
		background.TOTAL_IMAGE_COUNT > 0

	getPercentComplete: (background) =>
		fractionComplete = background.UPLOADED_IMAGE_LIST.length / background.TOTAL_IMAGE_COUNT
		Math.round(100 * fractionComplete)

module.exports = ProgressManager
