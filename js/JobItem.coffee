#
# Describes a user notification message.
#

class JobItem
	constructor: (urlList) ->
		if urlList? and urlList.length > 0
			@urlList = urlList
			@time = Date.now()
		else
			throw new Error "A JobItem requires a urlList."

	isIdenticalTo: (otherItem) ->
		(@urlList.length == otherItem.urlList.length) and @urlList.every (element, index) ->
			return element == otherItem.urlList[index]

module.exports = JobItem
