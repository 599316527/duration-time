
const DurationTime = require('./lib/duration-time').default;

module.exports = function (config) {
    return new DurationTime(config)
}
