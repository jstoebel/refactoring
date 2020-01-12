export interface IPerformance {
  playID: string
  audience: number
}

export interface IInvoice {
  customer: string
  performances: IPerformance[]
}

interface IPlay {
  name: string
  type: PerformanceTypes
}

export interface IPlays {
  [playTitle: string]: IPlay
}

export type PerformanceTypes = 'tragedy' | 'comedy'