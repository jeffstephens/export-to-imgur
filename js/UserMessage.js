/*
 * Describes a user notification message.
 */

function UserMessage() {
	this.level = this.title = this.text = null;
	this.time = Date.now();
};

UserMessage.prototype.setLevel = function(newLevel) {
	if (typeof newLevel === "undefined") {
		console.error("UserMessage.setLevel requires a level string as a parameter.");
		return;
	}

	newLevel = newLevel.trim().toLowerCase();
	var allowedLevels = ["error", "warning", "info", "success"];

	if (allowedLevels.indexOf(newLevel) > -1) {
		this.level = newLevel;
	} else {
		console.warn(newLevel + " is not a valid message level.");
	}
};

UserMessage.prototype.setTitle = function(newTitle) {
	if (typeof newTitle === "undefined") {
		console.error("UserMessage.setTitle requires a text string as a parameter.");
		return;
	}

	newTitle = newTitle.trim();
	if (newTitle.length > 0) {
		this.title = newTitle;
	} else {
		console.warn("Tried to update message text to a blank string.");
	}
};

UserMessage.prototype.setText = function(newText) {
	if (typeof newText === "undefined") {
		console.error("UserMessage.setText requires a text string as a parameter.");
		return;
	}

	newText = newText.trim();
	if (newText.length > 0) {
		this.text = newText;
	} else {
		console.warn("Tried to update message text to a blank string.");
	}
};
