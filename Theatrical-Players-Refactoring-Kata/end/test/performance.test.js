import {TragedyPerformance} from '../src/performance'

describe('TragedyPerformance', () => {
  describe('.performanceCost', () => {
    test('> 30 audience', () => {
      const tragedy = new TragedyPerformance({playID: 'hamlet', audience: 100})
  
      expect(tragedy.performanceCost()).toEqual(47000)
    })

    test('<30 audience', () => {
      const tragedy = new TragedyPerformance({playID: 'hamlet', audience: 29})
      expect(tragedy.performanceCost()).toEqual(40000)
    })
  })

  describe('.volumeCredits', () => {
    test('> 30 audience', () => {
      const tragedy = new TragedyPerformance({playID: 'hamlet', audience: 100})

      expect(tragedy.volumeCredits()).toEqual(70)
    })

    test('< 30 audience', () => {
      const tragedy = new TragedyPerformance({playID: 'hamlet', audience: 29})

      expect(tragedy.volumeCredits()).toEqual(0)
    })
  })
})