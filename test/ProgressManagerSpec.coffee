expect = require('chai').expect
ProgressManager = require '../js/ProgressManager.js'

describe 'ProgressManager', ->
	pm = null

	beforeEach ->
		pm = new ProgressManager()

	it 'should throw an error if either function is not passed a background object', ->
		expect( -> pm.isInProgress() ).to.throw(Error, /A background page object is required./)
		expect( -> pm.getPercentComplete() ).to.throw(Error, /A background page object is required./)

	it 'should correctly determine whether an operation is in progress', ->
		background =
			TOTAL_IMAGE_COUNT: 0

		expect( pm.isInProgress(background) ).to.be.false

		background.TOTAL_IMAGE_COUNT = 1
		expect( pm.isInProgress(background) ).to.be.true

	it 'should correctly calculate percentage complete', ->
		background =
			TOTAL_IMAGE_COUNT: 10
			UPLOADED_IMAGE_LIST: [0, 0, 0]

		expect( pm.getPercentComplete(background) ).to.equal 30

		background.UPLOADED_IMAGE_LIST.push(0)
		expect( pm.getPercentComplete(background) ).to.equal 40
