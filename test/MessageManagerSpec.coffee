expect = require('chai').expect
MessageManager = require '../js/MessageManager.js'

describe 'MessageManager', ->
	mm = null

	beforeEach ->
		mm = new MessageManager()

	it 'should initially contain an empty array', ->
		expect( mm.messageList ).to.be.empty

	it 'should fail to add a message when no parameters are passed', ->
		attempt = mm.addMessage()
		expect( attempt ).to.be.false
		expect( mm.messageList ).to.be.empty

	it 'should successfuly add a message when three parameters are passed', ->
		attempt = mm.addMessage "info", "title", "some text"
		expect( attempt ).to.be.true
		expect( mm.messageList ).to.not.be.empty

	describe 'Adding two messages, then retrieving them', ->

		beforeEach ->
			mm.addMessage "info", "first", "first message"
			mm.addMessage "info", "second", "second message"

		afterEach ->
			mm.messageList = []

		it 'should return two messages in getMessages() after two messages are added', ->
			expect( mm.messageList.length ).to.equal 2
			expect( mm.getMessages().length ).to.equal 2

		it 'should return one message in getMessages() when one message is too old', ->
			mm.messageList[0].time = 0
			expect( mm.messageList.length ).to.equal 2
			expect( mm.getMessages().length ).to.equal 1
			expect( mm.messageList[0].title ).to.equal "second"
