#
# Describes a user notification message.
#

class JobItem
	constructor: (urlList, albumName) ->
		if urlList? and urlList.length > 0 and albumName?
			@urlList = urlList
			@albumName = albumName
			@time = Date.now()
		else
			throw new Error "A JobItem requires a urlList."

	isIdenticalTo: (otherItem) ->
		(@urlList.length == otherItem.urlList.length) and (@albumName == otherItem.albumName) and @urlList.every (element, index) ->
			return element == otherItem.urlList[index]

module.exports = JobItem
