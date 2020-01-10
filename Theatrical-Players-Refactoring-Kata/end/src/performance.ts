import {IPerformance} from './types'

// class PlayPerformance {
  
//   playID: string
//   auidence: number
//   constructor(performanceData: IPerformance) {
//     this.playID = performanceData.playID
//     this.auidence = performanceData.audience
//   }
// }

export class TragedyPerformance {
  playID: string;
  audienceCount: number;

  readonly audienceUnitCost = 100;
  readonly baselineCost     = 40000;
  constructor(performanceData: IPerformance) {
    this.playID = performanceData.playID
    this.audienceCount = performanceData.audience
  }
  performanceCost() {
    if (this.audienceCount <= 30) return this.baselineCost
    const audienceCost = (this.audienceCount - 30) * this.audienceUnitCost
    return audienceCost + this.baselineCost
  }

  volumeCredits() {
    return Math.max(this.audienceCount - 30, 0)
  }
}