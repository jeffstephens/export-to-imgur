// Generated by CoffeeScript 1.7.1
(function() {
  var JobItem, expect;

  expect = require('chai').expect;

  JobItem = require('../js/JobItem.js');

  describe('JobItem', function() {
    it('should initially have a valid timestamp', function() {
      var ji;
      ji = new JobItem(["http://www.example.com/"]);
      expect(ji.time).to.not.be["null"];
      return expect(ji.time).to.be.above(0);
    });
    it('should fail to be constructed with an undefined or empty argument', function() {
      expect(function() {
        return new JobItem();
      }).to["throw"](Error, /A JobItem requires a urlList./);
      return expect(function() {
        return new JobItem([]);
      }).to["throw"](Error, /A JobItem requires a urlList./);
    });
    it('should be able to tell when it is functionally identical (same urlList) to another JobItem', function() {
      var firstItem, secondItem, urlList;
      urlList = ["http://www.example.com/", "http://www.google.com/"];
      firstItem = new JobItem(urlList);
      secondItem = new JobItem(urlList);
      secondItem.time = 100;
      expect(firstItem.isIdenticalTo(secondItem)).to.be["true"];
      return expect(secondItem.isIdenticalTo(firstItem)).to.be["true"];
    });
    return it('should be able to tell when it is not functionally identical (same urlList) to another JobItem', function() {
      var firstItem, secondItem;
      firstItem = new JobItem(["http://www.example.com/"]);
      secondItem = new JobItem(["http://www.google.com/"]);
      expect(firstItem.isIdenticalTo(secondItem)).to.be["false"];
      return expect(secondItem.isIdenticalTo(firstItem)).to.be["false"];
    });
  });

}).call(this);
