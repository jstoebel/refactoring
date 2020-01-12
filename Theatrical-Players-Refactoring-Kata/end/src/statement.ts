import {IInvoice, IPlays} from './types'
import PerformanceFactory from './performance';

export default function statement (invoice: IInvoice, plays: IPlays) { // long function
    
    let result = `Statement for ${invoice.customer}\n`; // mutable, myterious name
    const currencyFormatter = new Intl.NumberFormat("en-US",
        { style: "currency", currency: "USD",
            minimumFractionDigits: 2 }).format; // myterious name

    const performancesData = invoice.performances.map((perf) => {

        const play = plays[perf.playID];
        const perfObj = PerformanceFactory(perf.audience, play.type)

        return {
            text: `${play.name}: ${currencyFormatter(perfObj.performanceCost()/100)} (${perf.audience} seats)`,
            performanceCost: perfObj.performanceCost(),
            volumeCredits: perfObj.volumeCredits()
        }
    })

    const totalAmount = performancesData.map((perf) => perf.performanceCost).reduce((prev, curr) => prev + curr, 0)
    const totalVolumeCredits = performancesData.map((perf) => perf.volumeCredits).reduce((prev, curr) => prev + curr, 0)

    result += performancesData.map((perf) => ` ${perf.text}`).join('\n')
    result += '\n'
    result += `Amount owed is ${currencyFormatter(totalAmount/100)}\n`;
    result += `You earned ${totalVolumeCredits} credits\n`;
    return result;
}
