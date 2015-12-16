#
# Manage and standardize user notification messages.
#

UserMessage = require './UserMessage.js'

class MessageManager
	constructor: ->
		@messageList = []

	addMessage: (level, title, text) =>
		if level? && title? && text?
			newMessage = new UserMessage()
			newMessage.setLevel level
			newMessage.setTitle title
			newMessage.setText text
			@messageList.push newMessage
			return true;
		else
			return false;

	# clear messages that are older than 15 seconds
	pruneMessages: =>
		MESSAGE_LIFETIME = 15 * 1000
		NOW = Date.now()
		deleteTargets = []

		for i in [@messageList.length - 1..0]
			if NOW - @messageList[i].time > MESSAGE_LIFETIME
				deleteTargets.push i

		for index in deleteTargets
			@messageList.splice index, 1

	getMessages: =>
		@pruneMessages()
		@messageList

module.exports = MessageManager
