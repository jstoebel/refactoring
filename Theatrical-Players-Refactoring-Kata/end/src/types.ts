interface IPerformance {
  playID: string
  audience: number
}

export interface IInvoice {
  customer: string
  performances: IPerformance[]
}

interface IPlay {
  name: string
  type: 'tragedy' | 'comedy'
}

export interface IPlays {
  [playTitle: string]: IPlay
}
