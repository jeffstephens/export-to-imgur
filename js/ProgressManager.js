/*
 * Manage album conversion progress
 */

// progress state is stored in the background page
var background = chrome.extension.getBackgroundPage();

function ProgressManager() {

};

ProgressManager.prototype.isInProgress = function() {
	if (background === null) {
		return false;
	}
	return background.TOTAL_IMAGE_COUNT > 0;
};

ProgressManager.prototype.getPercentComplete = function() {
	if (background == null) {
		return 0;
	}

	return Math.round(100 * (background.UPLOADED_IMAGE_LIST.length / background.TOTAL_IMAGE_COUNT));
};
