const DurationTime = require('./lib/duration-time').default;

function entry(config) {
    return new DurationTime(config)
}

entry.parse = DurationTime.parse

module.exports = entry
