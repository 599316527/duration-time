const durationTime = require('../../index')

describe('Duration Time', function () {
    it('Parse', function () {
        expect(durationTime().parse('04')).toBe(4)
        expect(durationTime().parse('44')).toBe(44)

        expect(durationTime().parse('4:44')).toBe(4 * 60 + 44)
        expect(durationTime().parse('04:44')).toBe(4 * 60 + 44)
        expect(durationTime().parse('44:44')).toBe(44 * 60 + 44)
        expect(durationTime().parse('66:66')).toBe(66 * 60 + 66)

        expect(durationTime().parse('44:44:44')).toBe(44 * 60 * 60 + 44 * 60 + 44)

        expect(durationTime().parse('01:02:03:04'))
            .toBe(1 * 60 * 60 * 60 + 2 * 60 * 60 + 3 * 60 + 4)

        expect(durationTime().parse('44:44.12')).toBe(44 * 60 + 44 + .12)

        expect(function () {
            durationTime().parse({})
        }).toThrowError('Unacceptable time string')

    })

    it('Format', function () {
        expect(durationTime({colonNumber: 1}).format(111)).toBe('111')
        expect(durationTime({colonNumber: 2}).format(111)).toBe('01:51')
        expect(durationTime({colonNumber: 3}).format(111)).toBe('00:01:51')
        expect(durationTime({colonNumber: 4}).format(111)).toBe('00:00:01:51')

        expect(durationTime({colonNumber: 2}).format(1111)).toBe('18:31')
        expect(durationTime().format(1111)).toBe('00:18:31')

        expect(durationTime({colonNumber: 2}).format(11111)).toBe('185:11')
        expect(durationTime({hasLeadingZero: false}).format(11111)).toBe('3:5:11')
        expect(durationTime().format(11111)).toBe('03:05:11')

        expect(durationTime({keepDecimals: 2}).format(111)).toBe('00:01:51')
        expect(durationTime({keepDecimals: 2, alwaysDisplayDecimals: true})
            .format(111)).toBe('00:01:51.00')
        expect(durationTime({keepDecimals: 2}).format(111.11)).toBe('00:01:51.11')
        expect(durationTime({keepDecimals: 0}).format(111.11)).toBe('00:01:51')

        expect(function () {
            durationTime().format(true)
        }).toThrowError('Accept numeric only')

    })
})
