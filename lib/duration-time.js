(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.durationTime = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.parse = parse;
  exports.format = format;
  /**
   * Duration Time
   *
   * @author Kyle He (x@hk1229.cn)
   * @date 2016-03-31 15:12:38
   */

  /**
   * Parse Duration Time Stirng
   *
   * parseDurationString('01:02:03') => 3723
   * parseDurationString('62:13') => 3733
   *
   * @param  {String} val Duration Time String
   * @return {Number}     Duration Time in Seconds
   */
  function parse(val) {
    return val.split(':').reverse().reduce(function (previousValue, currentValue, currentIndex) {
      return previousValue + currentValue * Math.pow(60, currentIndex);
    }, 0);
  }

  /**
   * Format Duration String
   *
   * formatDurationString(3723, 2) = '62:03'
   * formatDurationString(3723, 3) = '01:02:03'
   * formatDurationString(3723, 4) = '00:01:02:03'
   *
   * @param  {Number} sec Duration Time in Seconds
   * @param  {Number} n   Number of colon seperators
   * @return {String}     Duration Time String
   */
  function format(sec) {
    var n = arguments.length <= 1 || arguments[1] === undefined ? 3 : arguments[1];

    var s = '';
    var t = void 0;
    for (var i = 1; i <= n; ++i) {
      if (i > 1) {
        s = ':' + s;
      }
      if (i < n) {
        t = sec % Math.pow(60, i);
        sec = sec - t < 0 ? 0 : sec - t;
      } else {
        t = sec;
      }
      s = fixLeadingZero(t / Math.pow(60, i - 1)) + s;
    }
    return s;
  }

  /**
   * Adding leading zeros
   * @param  {Number} i number to be fixed
   * @param  {Number} n expected length
   * @return {String}   fixed number
   */
  function fixLeadingZero(i) {
    var n = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];

    i = i.toString();
    return i.length < n ? '0'.repeat(n - i.length) + i : i;
  }
});