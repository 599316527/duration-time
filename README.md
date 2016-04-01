Duration Time
====================================

## Usage

```JavaScript
const DurationTime = require('duration-time')

// Format a duration time into h:m:s
DurationTime().format(11111) === '03:05:11'

// Specify colon number
DurationTime({
    colonNumber: 2
}).format(11111) === '185:11'

// Without leading zeros
DurationTime({
    hasLeadingZero: false
}).format(11111) === '3:5:11'

// Always display decimals
DurationTime({
    alwaysDisplayDecimals: true
}).format(11111) === '03:05:11.00'

// Specify decimals width
DurationTime({
    keepDecimals: 2
}).format(11111.1) === '185:11.10'

// Pasre formatted string back
DurationTime.parse('03:05:11.10') === 11111.1
DurationTime.parse('185:11') === 11111
```

