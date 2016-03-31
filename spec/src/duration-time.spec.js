const durationTime = require('../../index')

describe('Duration Time', function () {
    it('Parse', function () {
        expect(durationTime.parse('04')).toBe(4)
        expect(durationTime.parse('44')).toBe(44)

        expect(durationTime.parse('4:44')).toBe(4 * 60 + 44)
        expect(durationTime.parse('04:44')).toBe(4 * 60 + 44)
        expect(durationTime.parse('44:44')).toBe(44 * 60 + 44)
        expect(durationTime.parse('66:66')).toBe(66 * 60 + 66)

        expect(durationTime.parse('44:44:44')).toBe(44 * 60 * 60 + 44 * 60 + 44)

        expect(durationTime.parse('01:02:03:04'))
            .toBe(1 * 60 * 60 * 60 + 2 * 60 * 60 + 3 * 60 + 4)
    })

    it('Format', function () {
        expect(durationTime.format(1, 1)).toBe('01')
        expect(durationTime.format(1, 2)).toBe('00:01')
        expect(durationTime.format(1, 3)).toBe('00:00:01')
        expect(durationTime.format(1, 4)).toBe('00:00:00:01')

        expect(durationTime.format(111, 1)).toBe('111')
        expect(durationTime.format(111, 2)).toBe('01:51')
        expect(durationTime.format(111, 3)).toBe('00:01:51')
        expect(durationTime.format(111, 4)).toBe('00:00:01:51')

        expect(durationTime.format(1111, 2)).toBe('18:31')
        expect(durationTime.format(1111)).toBe('00:18:31')

        expect(durationTime.format(11111, 2)).toBe('185:11')
        expect(durationTime.format(11111)).toBe('03:05:11')
    })
})
