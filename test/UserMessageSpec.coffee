expect = require('chai').expect
UserMessage = require '../js/UserMessage.js'

describe 'UserMessage', ->
	um = null

	beforeEach ->
		um = new UserMessage()

	it 'should initially have everything null except a timestamp', ->
		expect( um.level ).to.be.null
		expect( um.title ).to.be.null
		expect( um.text ).to.be.null
		expect( um.time ).to.not.be.null
		expect( um.time ).to.be.above 0

	describe 'When changing the message level', ->
		it 'should be able to change the message level to a valid value', ->
			um.setLevel "info"
			expect( um.level ).to.not.be.null
			expect( um.level ).to.equal "info"

		it 'should not change the message level to undefined', ->
			um.setLevel "info"
			expect( -> um.setLevel() ).to.throw Error, /UserMessage.setLevel requires a level string as a parameter./
			expect( um.level ).to.equal "info"

		it 'should not be able to change the message level to an invalid value, and should throw an error', ->
			expect( -> um.setLevel("lolwhat") ).to.throw Error, /lolwhat is not a valid message level./
			expect( um.level ).to.be.null

	describe 'When changing the message title', ->
		it 'should be able to change the message title', ->
			um.setTitle "new title"
			expect( um.title ).to.not.be.null
			expect( um.title ).to.equal "new title"

		it 'should not change the message title to an undefined value', ->
			um.setTitle "new title"
			expect( -> um.setTitle() ).to.throw Error, /UserMessage.setTitle requires a text string as a parameter./
			expect( um.title ).to.equal "new title"

		it 'should not change the message title to a blank value', ->
			um.setTitle "new title"
			expect( -> um.setTitle("") ).to.throw Error, /Tried to update message title to a blank string./
			expect( um.title ).to.equal "new title"

	describe 'When changing the message text', ->
		it 'should be able to change the message text', ->
			um.setText "new text"
			expect( um.text ).to.not.be.null
			expect( um.text ).to.equal "new text"

		it 'should not change the message text to an undefined value', ->
			um.setText "new text"
			expect( -> um.setText() ).to.throw Error, /UserMessage.setText requires a text string as a parameter./
			expect( um.text ).to.equal "new text"

		it 'should not change the message text to a blank value', ->
			um.setText "new text"
			expect( -> um.setText("") ).to.throw Error, /Tried to update message text to a blank string./
			expect( um.text ).to.equal "new text"
