/**
 * Duration Time
 *
 * @author Kyle He (x@hk1229.cn)
 * @date 2016-03-31 15:12:38
 */

const defaultConfig = {
  colonNumber: 3,
  keepDecimals: 2,
  alwaysDisplayDecimals: false,
  hasLeadingZero: true
}

class DurationTime {
  constructor (config = {}) {
    // console.log(this);
    extendObject(this, defaultConfig, config)
  }

  format(sec) {
    if (!isNumeric(sec)) {
      throw new Error('Accept numeric only')
    }

    let s = ''
    let t

    if (this.keepDecimals) {
      t = sec - Math.floor(sec)
      if (t) {
        s += t.toFixed(this.keepDecimals).substring(1)
      } else if (this.alwaysDisplayDecimals) {
        s += '.' + '0'.repeat(this.keepDecimals)
      }
    }

    sec = Math.floor(sec)
    let n = this.colonNumber
    for (let i = 1; i <= n; ++i) {
      if (i > 1) {
        s = ':' + s
      }
      if (i < n) {
        t = sec % Math.pow(60, i)
        sec = sec - t < 0 ? 0 : sec - t
      } else {
        t = sec
      }
      t = t / Math.pow(60, i - 1)
      s = (this.hasLeadingZero ? fixLeadingZero(t) : t) + s
    }

    return s
  }

  static parse(val) {
    if (!val || !/^(\d+\:)*\d+(\.\d+)?$/.test(val)) {
      throw new Error('Unacceptable time string')
    }

    return val.split(':').reverse().reduce(function (previousValue, currentValue, currentIndex) {
      return previousValue + (currentValue * Math.pow(60, currentIndex))
    }, 0)
  }

}

export default DurationTime



function extendObject(target, ...sources) {
  sources.forEach(function (source) {
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        target[key] = source[key]
      }
    }
  })
  return target
}

/**
 * Adding leading zeros
 * @param  {Number} i number to be fixed
 * @param  {Number} n expected length
 * @return {String}   fixed number
 */
function fixLeadingZero(i, n = 2) {
  i = i.toString()
  return i.length < n ? '0'.repeat(n - i.length) + i : i
}

function isNumeric(val) {
  return Object.prototype.toString.call(val) === '[object Number]'
}

