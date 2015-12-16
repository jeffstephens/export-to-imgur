// Generated by CoffeeScript 1.7.1
(function() {
  var JobManager,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  JobManager = (function() {
    JobManager.LOCALSTORAGE_KEY_NAME = "exportList";

    JobManager.jobQueue = null;

    function JobManager() {
      var _ref;
      if (typeof localStorage === "undefined" || localStorage === null) {
        this.jobQueue = [];
      } else if (_ref = this.LOCALSTORAGE_KEY_NAME, __indexOf.call(localStorage, _ref) < 0) {
        this.jobQueue = [];
        this.saveQueue();
      } else {
        this.loadQueue();
      }
    }

    JobManager.prototype.saveQueue = function() {
      var compactedQueue;
      if (typeof localStorage !== "undefined" && localStorage !== null) {
        compactedQueue = JSON.stringify(this.jobQueue);
        return localStorage.setItem(this.LOCALSTORAGE_KEY_NAME, compactedQueue);
      }
    };

    JobManager.prototype.loadQueue = function() {
      var compactedQueue;
      if (typeof localStorage !== "undefined" && localStorage !== null) {
        compactedQueue = localStorage.getItem(this.LOCALSTORAGE_KEY_NAME);
        return this.jobQueue = JSON.parse(compactedQueue);
      } else {
        return this.jobQueue = [];
      }
    };

    JobManager.prototype.addItem = function(newItem) {
      var item, _i, _len, _ref;
      _ref = this.jobQueue;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if (item.isIdenticalTo(newItem)) {
          return;
        }
      }
      this.jobQueue.push(newItem);
      return this.saveQueue;
    };

    JobManager.prototype.getNext = function() {
      var firstItem, firstItemArray;
      if (this.jobQueue.length === 0) {
        firstItem = null;
      } else {
        firstItemArray = this.jobQueue.splice(0, 1);
        firstItem = firstItemArray[0];
        this.saveQueue;
      }
      return firstItem;
    };

    return JobManager;

  })();

  module.exports = JobManager;

}).call(this);
