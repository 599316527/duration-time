const DurationTime = require('../../index')

console.log(DurationTime.parse)

describe('Duration Time', function () {
    it('Parse', function () {
        expect(DurationTime.parse('04')).toBe(4)
        expect(DurationTime.parse('44')).toBe(44)

        expect(DurationTime.parse('4:44')).toBe(4 * 60 + 44)
        expect(DurationTime.parse('04:44')).toBe(4 * 60 + 44)
        expect(DurationTime.parse('44:44')).toBe(44 * 60 + 44)
        expect(DurationTime.parse('66:66')).toBe(66 * 60 + 66)

        expect(DurationTime.parse('44:44:44')).toBe(44 * 60 * 60 + 44 * 60 + 44)

        expect(DurationTime.parse('01:02:03:04'))
            .toBe(1 * 60 * 60 * 60 + 2 * 60 * 60 + 3 * 60 + 4)

        expect(DurationTime.parse('44:44.12')).toBe(44 * 60 + 44 + .12)

        expect(function () {
            DurationTime.parse({})
        }).toThrowError('Unacceptable time string')

    })

    it('Format', function () {
        expect(DurationTime({colonNumber: 0}).format(111)).toBe('111')
        expect(DurationTime({colonNumber: 1}).format(111)).toBe('01:51')
        expect(DurationTime({colonNumber: 2}).format(111)).toBe('00:01:51')
        expect(DurationTime({colonNumber: 3}).format(111)).toBe('00:00:01:51')

        expect(DurationTime({colonNumber: 1}).format(1111)).toBe('18:31')
        expect(DurationTime().format(1111)).toBe('00:18:31')

        expect(DurationTime({colonNumber: 1}).format(11111)).toBe('185:11')
        expect(DurationTime({hasLeadingZero: false}).format(11111)).toBe('3:5:11')
        expect(DurationTime().format(11111)).toBe('03:05:11')

        expect(DurationTime({keepDecimals: 2}).format(111)).toBe('00:01:51')
        expect(DurationTime({alwaysDisplayDecimals: true}).format(111)).toBe('00:01:51.00')
        expect(DurationTime({keepDecimals: 1}).format(111.11)).toBe('00:01:51.1')
        expect(DurationTime().format(111.11)).toBe('00:01:51.11')
        expect(DurationTime({keepDecimals: 2}).format(111.10)).toBe('00:01:51.10')
        expect(DurationTime({keepDecimals: 0}).format(111.11)).toBe('00:01:51')

        expect(DurationTime().format((3 * 60 + 54) * .2)).toBe('00:00:46.80')
        expect(DurationTime().format((3 * 60 + 54) * .4)).toBe('00:01:33.60')

        expect(function () {
            DurationTime().format(true)
        }).toThrowError('Accept numeric only')

    })
})
