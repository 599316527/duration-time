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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  /**
   * Duration Time
   *
   * @author Kyle He (x@hk1229.cn)
   * @date 2016-03-31 15:12:38
   */

  var defaultConfig = {
    colonNumber: 3,
    keepDecimals: 2,
    alwaysDisplayDecimals: false,
    hasLeadingZero: true
  };

  var DurationTime = function () {
    function DurationTime() {
      var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      _classCallCheck(this, DurationTime);

      // console.log(this);
      extendObject(this, defaultConfig, config);
    }

    _createClass(DurationTime, [{
      key: 'format',
      value: function format(sec) {
        if (!isNumeric(sec)) {
          throw new Error('Accept numeric only');
        }

        var s = '';
        var t = void 0;

        if (this.keepDecimals) {
          t = sec - Math.floor(sec);
          if (t) {
            s += t.toFixed(this.keepDecimals).substring(1);
          } else if (this.alwaysDisplayDecimals) {
            s += '.' + '0'.repeat(this.keepDecimals);
          }
        }

        sec = Math.floor(sec);
        var n = this.colonNumber;
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
          t = t / Math.pow(60, i - 1);
          s = (this.hasLeadingZero ? fixLeadingZero(t) : t) + s;
        }

        return s;
      }
    }], [{
      key: 'parse',
      value: function parse(val) {
        if (!val || !/^(\d+\:)*\d+(\.\d+)?$/.test(val)) {
          throw new Error('Unacceptable time string');
        }

        return val.split(':').reverse().reduce(function (previousValue, currentValue, currentIndex) {
          return previousValue + currentValue * Math.pow(60, currentIndex);
        }, 0);
      }
    }]);

    return DurationTime;
  }();

  exports.default = DurationTime;


  function extendObject(target) {
    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }

    sources.forEach(function (source) {
      for (var key in source) {
        if (source.hasOwnProperty(key)) {
          target[key] = source[key];
        }
      }
    });
    return target;
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

  function isNumeric(val) {
    return Object.prototype.toString.call(val) === '[object Number]';
  }
});