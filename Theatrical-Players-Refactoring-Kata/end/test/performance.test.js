import {TragedyPerformance, ComedyPerformance} from '../src/performance'

describe('TragedyPerformance', () => {
  describe('.performanceCost', () => {
    test('> 30 audience', () => {
      const tragedy = new TragedyPerformance(100)
  
      expect(tragedy.performanceCost()).toEqual(110000)
    })

    test('<30 audience', () => {
      const tragedy = new TragedyPerformance(29)
      expect(tragedy.performanceCost()).toEqual(40000)
    })
  })

  describe('.volumeCredits', () => {
    test('> 30 audience', () => {
      const tragedy = new TragedyPerformance(100)

      expect(tragedy.volumeCredits()).toEqual(70)
    })

    test('< 30 audience', () => {
      const tragedy = new TragedyPerformance(29)

      expect(tragedy.volumeCredits()).toEqual(0)
    })
  })
})

describe('ComedyPerformance', () => {
  describe('.performanceCost', () => {
    test('> 20 audience', () => {
      const tragedy = new ComedyPerformance(100)
  
      expect(tragedy.performanceCost()).toEqual(110000)
    })

    test('<20 audience', () => {
      const tragedy = new ComedyPerformance(19)
      expect(tragedy.performanceCost()).toEqual(35700)
    })
  })

  describe('.volumeCredits', () => {
    test('> 30 audience', () => {
      const tragedy = new ComedyPerformance(100)

      expect(tragedy.volumeCredits()).toEqual(90)
    })

    test('< 30 audience', () => {
      const tragedy = new ComedyPerformance(29)

      expect(tragedy.volumeCredits()).toEqual(5)
    })
  })
})
