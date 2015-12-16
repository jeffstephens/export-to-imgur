#
# Describes a user notification message.
#

class UserMessage
	constructor: ->
		@level = @title = @text = null
		@time = Date.now();

	setLevel: (newLevel) =>
		if not newLevel?
			throw new Error "UserMessage.setLevel requires a level string as a parameter."

		newLevel = newLevel.trim().toLowerCase()
		allowedLevels = ["error", "warning", "info", "success"]

		if allowedLevels.indexOf newLevel > -1
			@level = newLevel
		else
			throw new Error "#{newLevel} is not a valid message level."

	setTitle: (newTitle) =>
		if not newTitle?
			throw new Error "UserMessage.setTitle requires a text string as a parameter."

		newTitle = newTitle.trim()
		if newTitle.length > 0
			@title = newTitle
		else
			throw new Error "Tried to update message text to a blank string."

	setText: (newText) =>
		if not newText?
			throw new Error "UserMessage.setText requires a text string as a parameter."

		newText = newText.trim()
		if newText.length > 0
			@text = newText
		else
			throw new Error "Tried to update message text to a blank string."

module.exports = UserMessage
