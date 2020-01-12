import PerformanceFactory from '../src/performance'

describe('TragedyPerformance', () => {
  describe('.performanceCost', () => {
    test('> 30 audience', () => {
      const tragedy = PerformanceFactory('hamlet', 100, 'tragedy')
  
      expect(tragedy.performanceCost()).toEqual(110000)
    })

    test('<30 audience', () => {
      const tragedy = PerformanceFactory('hamlet', 29, 'tragedy')
      expect(tragedy.performanceCost()).toEqual(40000)
    })
  })

  describe('.volumeCredits', () => {
    test('> 30 audience', () => {
      const tragedy = PerformanceFactory('hamlet', 100, 'tragedy')

      expect(tragedy.volumeCredits()).toEqual(70)
    })

    test('< 30 audience', () => {
      const tragedy = PerformanceFactory('hamlet', 29, 'tragedy')

      expect(tragedy.volumeCredits()).toEqual(0)
    })
  })
})

describe('ComedyPerformance', () => {
  describe('.performanceCost', () => {
    test('> 20 audience', () => {
      const tragedy = PerformanceFactory('as-like', 100, 'comedy')
  
      expect(tragedy.performanceCost()).toEqual(110000)
    })

    test('<20 audience', () => {
      const tragedy = PerformanceFactory('as-like', 19, 'comedy')
      expect(tragedy.performanceCost()).toEqual(35700)
    })
  })

  describe('.volumeCredits', () => {
    test('> 30 audience', () => {
      const tragedy = PerformanceFactory('as-like', 100, 'comedy')

      expect(tragedy.volumeCredits()).toEqual(90)
    })

    test('< 30 audience', () => {
      const tragedy = PerformanceFactory('as-like', 29, 'comedy')

      expect(tragedy.volumeCredits()).toEqual(5)
    })
  })
})
