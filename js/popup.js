var background = chrome.extension.getBackgroundPage();
var messageManager = new MessageManager();
var progressManager = new ProgressManager();
// TODO var historyManager = new HistoryManager();

var updateProgressInterval = null;
// refresh UI (new messages, etc.)
setInterval(refreshUI, 500);
setInterval(checkInProgress, 1000);

// check if an album export is in progress. if so, monitor it.
function checkInProgress() {
	if (progressManager.isInProgress()) {
		updateProgressInterval = setInterval(updateProgress, 200);
	} else {
		clearInterval(updateProgressInterval);
	}
}

// check current progress and update the UI
function updateProgress() {
	var progressHTML = Handlebars.templates.inProgress({
		"conversionInProgress" : progressManager.isInProgress(),
		"percentComplete" : progressManager.getPercentComplete()
	});
	$("#jobsContainer").html(progressHTML);
}

// get current tab URL and pass it to the specified callback function
function getCurrentTabUrl(callback) {
  var queryInfo = {
	active: true,
	currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
	var tab = tabs[0];
	var url = tab.url;
	console.assert(typeof url == 'string', 'tab.url should be a string');
	callback(tab);
  });
}

// refresh UI to reflect current app state
function refreshUI() {
	// show user messages
	var messagesHTML = Handlebars.templates.messageList({"messageList" : messageManager.getMessages()});
	$("#messagesContainer").html(messagesHTML);
}

function attemptCreateAlbum(tab) {
	console.log(tab);
	var attempt = background.createAlbum(tab);

	if ("success" in attempt) {
		if (attempt.success) {
			messageManager.addMessage("success", "Album export started.", "A new tab will automatically open when it's ready.");
		}
		else {
			if ("message" in attempt) {
				messageManager.addMessage("warning", "Whoops!", attempt.message);
			} else {
				messageManager.addMessage("error", "Whoops!", "Something weird happened.");
			}
		}
	}

	refreshUI();
}

document.addEventListener('DOMContentLoaded', function() {
	getCurrentTabUrl(attemptCreateAlbum);
});

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
	if (msg.type === 'background_error') {
		messageManager.addMessage("warning", msg.title, msg.text);
	}
});
