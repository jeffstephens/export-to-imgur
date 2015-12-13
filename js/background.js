var EXTENSION_VERSION = 0.2;
var FIRSTRUN_FLAG_KEY = "firstrun_" + EXTENSION_VERSION;
if (null == localStorage.getItem(FIRSTRUN_FLAG_KEY)) {
	localStorage.setItem(FIRSTRUN_FLAG_KEY, true);
	alert("Thanks for trying out the 4chan image archiver!\n\n"
		+ "To use it, navigate to a thread on 4chan.org and click the rectangle icon in the toolbar.\n\n"
		+ "Soon, either a new tab will open or an alert dialog like this one will tell you if something went wrong.\n\n"
		+ "In a future version, the user interface will suck a lot less. Progress bars, album history - the sky\'s the limit.\n\n"
		+ "Happy /b/rowsing! [V" + EXTENSION_VERSION + "]");
}

var CLIENT_ID = '9c23ab96912dc40';
var TAB_ID = null;

var UPLOADED_IMAGE_LIST = TOTAL_IMAGE_COUNT = PAGE_TITLE = REMAINING_UPLOADS = null;
cleanUp();

var imgur = {};

imgur.createAlbum = function(albumName, imageList) {
	if (REMAINING_UPLOADS < 1) {
		sendError("imgur upload quota reached for the day :/", "Bummer. Try again tomorrow (or from a differnet IP address).");
		return;
	}

	if (typeof albumName == "undefined") {
		albumName = "4chan dump";
	}

	if (imageList.length <= 0) {
		console.log("not creating empty album.");
		cleanUp();
		return;
	}

	console.log("creating album " + albumName);

	imageListString = imageList.join(",");

	console.log("images:", imageListString);

	$.ajax({
			url: 'https://api.imgur.com/3/album',
			type: 'POST',
			headers: {
				Authorization: "Client-ID " + CLIENT_ID,
				Accept: 'application/json'
			},
			data: {
				title: albumName,
				privacy: "hidden",
				ids: imageListString
			},
			success: function(result) {
				var id = result.data.id;
				console.log("created album " + id, result);
				imgur.openAlbumIfExists(id);
			},
			error: function(result) {
				console.log("failed to create album: ", result);
			},
			complete: function(result) {
				cleanUp();
			}
		});
}

imgur.uploadImageFromURL = function(imageURL) {
	if (REMAINING_UPLOADS < 1) {
		sendError("imgur upload quota reached for the day :/", "imgur is really restrictive. Try again tomorrow...");
		return;
	}

	var requestData = {};
	requestData.image = imageURL;
	requestData.type = 'URL';

	$.ajax({
			url: 'https://api.imgur.com/3/image',
			type: 'POST',
			headers: {
				Authorization: "Client-ID " + CLIENT_ID,
				Accept: 'application/json'
			},
			data: requestData,
			success: function(result, textStatus, request) {
				var id = result.data.id;
				console.log("successfully uploaded " + id, result);
				UPLOADED_IMAGE_LIST.push(id);

				updateQuotaLimits(request);

				console.log("uploaded images: " + UPLOADED_IMAGE_LIST.length);
				console.log("batch total: " + TOTAL_IMAGE_COUNT);
			},
			error: function(result) {
				console.log("upload failed: ", result);
				TOTAL_IMAGE_COUNT -= 1;
			},
			complete: function(result) {
				if (UPLOADED_IMAGE_LIST.length == TOTAL_IMAGE_COUNT) {
					imgur.createAlbum(PAGE_TITLE, UPLOADED_IMAGE_LIST);
				}
			}
		});
}

imgur.openAlbumIfExists = function(albumID) {
	$.ajax({
			url: 'https://api.imgur.com/3/album/' + albumID,
			type: 'GET',
			headers: {
				Authorization: "Client-ID " + CLIENT_ID,
				Accept: 'application/json'
			},
			success: function(result, textStatus, request) {
				if ("data" in result && "link" in result.data) {
					window.open(result.data.link);
				} else {
					sendError("Bummer...", "We couldn't create the album. Please try again. Sorry. It just happens sometimes... blame imgur.");
				}
			},
			error: function(result) {
				sendError("Bummer...", "We couldn't create the album. Please try again. Sorry. It just happens sometimes... blame imgur.");
			}
		});
}

function updateQuotaLimits(request) {
		var userRemaining = Math.floor(parseInt(request.getResponseHeader("X-RateLimit-UserRemaining"), 10));
		var appRemaining = Math.floor(parseInt(request.getResponseHeader("X-RateLimit-ClientRemaining"), 10) / 10);

	REMAINING_UPLOADS = Math.min(userRemaining, appRemaining);
	console.log("REMAINING_UPLOADS = " + REMAINING_UPLOADS);
}

function cleanUp() {
	UPLOADED_IMAGE_LIST = [];
	TOTAL_IMAGE_COUNT = 0;
	PAGE_TITLE = "";
	REMAINING_UPLOADS = 100000;
}

function createAlbum(tab) {
	TAB_ID = tab.id;

	var urlRegex = /^https?:\/\/(?:[^\.]+\.)?4chan\.org.+\/thread\//;
	if (urlRegex.test(tab.url)) {
		console.log("querying for tab " + tab.id);
		chrome.tabs.sendMessage(tab.id, {type: 'scrape_request'}, processImages);
			// return {
			// 	"success" : true
			// };
	} else {
		return {
			"success" : false,
			"message" : "This extension only works on 4chan.org threads."
		};
	}
}

function processImages(response) {
	if (typeof response === "undefined") {
		sendError("Whoops!", "Failed to fetch page contents. Please try again. Refreshing the page might help.");
		return;
	}

	if ("title" in response && response.title.split("-").length > 1) {
		PAGE_TITLE = response.title.split("-")[1].trim();
	} else {
		PAGE_TITLE = "4chan thread";
	}

	var imageList = response.urls;
	TOTAL_IMAGE_COUNT = imageList.length;

	if (TOTAL_IMAGE_COUNT > 50) {
		sendError("Too many images :/", "The limit is 50, but this thread has " + TOTAL_IMAGE_COUNT + ".");
		cleanUp();
		return;
	}

	console.log("uploading " + TOTAL_IMAGE_COUNT + " images to album " + PAGE_TITLE);

	for (var i = 0; i < imageList.length; i++) {
		if ("url" in imageList[i]) {
			imgur.uploadImageFromURL("http:" + imageList[i].url);
		} else {
			console.log("no url in this image", imageList[i]);
		}
	}
}

function sendError(title, text) {
	var messagePayload = {
		type: 'background_error',
		title: title,
		text: text
	};

	chrome.runtime.sendMessage(messagePayload, cleanUp);
}
