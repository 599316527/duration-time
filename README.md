Duration Time
====================================


```JavaScript
const DurationTime = require('duration-time')

DurationTime.format(11111) === '03:05:11'
DurationTime.format(11111, 2) === '185:11'

DurationTime.parse('03:05:11') === 11111
DurationTime.parse('185:11') === 11111
```

