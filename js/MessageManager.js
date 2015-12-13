/*
 * Manage and standardize user notification messages.
 */

function MessageManager() {
	this.messageList = [];
};

MessageManager.prototype.addMessage = function (level, title, text) {
	if (typeof level !== "undefined" && typeof title !== "undefined" && typeof text !== "undefined") {
		var newMessage = new UserMessage();
		newMessage.setLevel(level);
		newMessage.setTitle(title);
		newMessage.setText(text);
		this.messageList.push(newMessage);
		return true;
	} else {
		console.error("Messages require a level, a title, and some text.");
		return false;
	}
};

// clear messages that are older than 2 minutes
MessageManager.prototype.pruneMessages = function() {
	var MESSAGE_LIFETIME = 15 * 1000;
	var NOW = Date.now();
	for (var i = 0; i < this.messageList.length; i++) {
		if (NOW - this.messageList[i].time > MESSAGE_LIFETIME) {
			this.messageList.splice(i, 1);
		}
	}
};

MessageManager.prototype.getMessages = function() {
	this.pruneMessages();
	return this.messageList;
};
