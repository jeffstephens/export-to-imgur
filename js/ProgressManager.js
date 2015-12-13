/*
 * Manage album conversion progress
 */

function ProgressManager() {

};

ProgressManager.prototype.isInProgress = function(background) {
	return background.TOTAL_IMAGE_COUNT > 0;
};

ProgressManager.prototype.getPercentComplete = function(background) {
	return Math.round(100 * (background.UPLOADED_IMAGE_LIST.length / background.TOTAL_IMAGE_COUNT));
};
