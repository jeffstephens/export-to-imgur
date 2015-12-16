expect = require('chai').expect
JobManager = require '../js/JobManager.js'
JobItem = require '../js/JobItem.js'

describe 'JobManager', ->
	jm = jiOne = jiTwo = jiThree = null

	beforeEach ->
		jm = new JobManager()
		jiOne = new JobItem ["http://www.example.com/"]
		jiTwo = new JobItem ["http://www.google.com/"]
		jiThree = new JobItem ["http://www.yahoo.com/"]

	it 'should initially have an empty queue', ->
		expect( jm.jobQueue ).to.be.empty

	it 'should be able to add an item to the queue', ->
		jm.addItem jiOne
		expect( jm.jobQueue.length ).to.equal 1
		jm.addItem jiTwo
		jm.addItem jiThree
		expect( jm.jobQueue.length ).to.equal 3

	it 'should not add an item identical to an existing one to the queue', ->
		jm.addItem jiOne
		jm.addItem jiTwo
		jm.addItem jiOne
		expect( jm.jobQueue.length ).to.equal 2

	it 'should be able to pop an item off the queue in FIFO fashion', ->
		jm.addItem jiOne
		jm.addItem jiTwo
		jm.addItem jiThree
		nextItem = jm.getNext()
		expect( jm.jobQueue.length ).to.equal 2
		expect( nextItem ).to.equal jiOne

	it 'should return null when popping an item off an empty queue', ->
		nextItem = jm.getNext()
		expect( nextItem ).to.be.null
