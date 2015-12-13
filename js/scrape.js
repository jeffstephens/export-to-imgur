// scrape a given 4chan.org tab when requested by the background page
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    if (msg.type === 'scrape_request') {
        if (typeof document == "undefined") {
            alert("Uh oh. Couldn't read the webpage. Refresh and try again.");
            return;
        }

        // Call the specified callback, passing
        // the web-pages DOM content as argument
        var images = document.querySelectorAll("div.fileText a");
        var imageURLs = [];
        for (var i = 0; i < images.length; i++) {
        	imageURLs.push({
        		"url" : images[i].getAttribute("href")
        	});
        }

        var pageTitle = "4chan thread";
        if ("title" in document) {
            pageTitle = document.title;
        }

        sendResponse({
            title: pageTitle,
            urls: imageURLs
        });
    }
});
