expect = require('chai').expect
JobItem = require '../js/JobItem.js'

describe 'JobItem', ->
	it 'should initially have a valid timestamp', ->
		ji = new JobItem ["http://www.example.com/"]
		expect( ji.time ).to.not.be.null
		expect( ji.time ).to.be.above 0

	it 'should fail to be constructed with an undefined or empty argument', ->
		expect( -> new JobItem() ).to.throw Error, /A JobItem requires a urlList./
		expect( -> new JobItem([]) ).to.throw Error, /A JobItem requires a urlList./

	it 'should be able to tell when it is functionally identical (same urlList) to another JobItem', ->
		urlList = ["http://www.example.com/", "http://www.google.com/"]
		firstItem = new JobItem urlList
		secondItem = new JobItem urlList
		secondItem.time = 100
		expect( firstItem.isIdenticalTo(secondItem) ).to.be.true
		expect( secondItem.isIdenticalTo(firstItem) ).to.be.true

	it 'should be able to tell when it is not functionally identical (same urlList) to another JobItem', ->
		firstItem = new JobItem ["http://www.example.com/"]
		secondItem = new JobItem ["http://www.google.com/"]
		expect( firstItem.isIdenticalTo(secondItem) ).to.be.false
		expect( secondItem.isIdenticalTo(firstItem) ).to.be.false
