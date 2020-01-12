import {IPerformance as IPerformanceData, PerformanceTypes} from './types'

import {currencyFormatter} from './util'

interface IPerformance {
  readonly audienceUnitCost: number
  readonly baselineCost: number
  audienceCount: number
  performanceCost(): number
  volumeCredits(): number
  lineItem(): string
}

class Performance {
  audienceCount: number
  readonly playName: string
  constructor(playName: string, audienceCount: number) {
    this.audienceCount = audienceCount
    this.playName = playName
  }

  volumeCredits() {
    return Math.max(this.audienceCount - 30, 0)
  }

  lineItem() {
    return `${this.playName}: ${currencyFormatter(this.performanceCost()/100)} (${this.audienceCount} seats)` 
  }

  performanceCost() {
    console.warn('performanceCost was called from abstract method Performance')
    return 0
  }
}

class TragedyPerformance extends Performance implements IPerformance {


  readonly audienceUnitCost = 1000;
  readonly baselineCost     = 40000;
  constructor(playName: string, audienceCount: number) {
    super(playName, audienceCount)
  }
  performanceCost() {
    if (this.audienceCount <= 30) return this.baselineCost

    const audienceCost = (this.audienceCount - 30) * this.audienceUnitCost

    return audienceCost + this.baselineCost
  }
}

class ComedyPerformance extends Performance implements IPerformance {
  readonly audienceUnitCost         = 500;
  readonly baselineCost             = 30000;
  readonly audienceBonusUnitCost    = 300
  constructor(playName: string, audienceCount: number) {
    super(playName, audienceCount)
  }

  performanceCost() {
    const audienceBonus = this.audienceBonusUnitCost * this.audienceCount;
    
    const baseCost = this.baselineCost + audienceBonus;
    if (this.audienceCount < 20) return baseCost;
    return baseCost + 10000 + this.audienceUnitCost * (this.audienceCount - 20)
  }

  volumeCredits() {
    return Math.max(this.audienceCount - 30, 0) + Math.floor(this.audienceCount / 5)
  }
}

export default function PerformanceFactory(name: string, audience: number, type: PerformanceTypes): IPerformance {
  switch(type) {
    case 'tragedy':
      return new TragedyPerformance(name, audience)
    case 'comedy':
      return new ComedyPerformance(name, audience)
    default:
      throw '/unknown type/'
  }
}