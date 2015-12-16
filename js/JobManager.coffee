#
# Broker all export requests and maintain a queue of pending jobs.
# Persist queue in localStorage because the extension is potentially
# created and destroyed all the time.
#

class JobManager
	@LOCALSTORAGE_KEY_NAME = "exportList"
	@jobQueue = null

	constructor: ->
		if not localStorage?
			@jobQueue = []
		else if @LOCALSTORAGE_KEY_NAME not in localStorage
			@jobQueue = []
			@saveQueue()
		else
			@loadQueue()

	saveQueue: ->
		if localStorage?
			compactedQueue = JSON.stringify @jobQueue
			localStorage.setItem @LOCALSTORAGE_KEY_NAME, compactedQueue

	loadQueue: ->
		if localStorage?
			compactedQueue = localStorage.getItem @LOCALSTORAGE_KEY_NAME
			@jobQueue = JSON.parse compactedQueue
		else
			@jobQueue = []

	addItem: (newItem) ->
		for item in @jobQueue
			if item.isIdenticalTo newItem
				return

		@jobQueue.push newItem
		@saveQueue

	getNext: ->
		if @jobQueue.length == 0
			firstItem = null
		else
			firstItemArray = @jobQueue.splice 0, 1
			firstItem = firstItemArray[0]
			@saveQueue
		firstItem

module.exports = JobManager
