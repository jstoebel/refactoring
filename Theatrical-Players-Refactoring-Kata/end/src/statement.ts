import {IInvoice, IPlays} from './types'
import PerformanceFactory from './performance';
import { currencyFormatter } from './util'
import nunjucks from 'nunjucks';

nunjucks.configure('./src', {trimBlocks: true});

export default function statement (invoice: IInvoice, plays: IPlays) { // long function
    
    const sum = (prev: number, curr: number) => prev + curr // summing function for array of numbers

    const {performances, customer} = invoice;
    const performancesData = performances.map((perf) => {
        const play = plays[perf.playID];
        return PerformanceFactory(play.name, perf.audience, play.type)
    })

    const totalAmount = performancesData.map((perf) => perf.performanceCost()).reduce(sum, 0)
    const totalVolumeCredits = performancesData.map((perf) => perf.volumeCredits()).reduce(sum, 0)
    const lineItems = performancesData.map((perf) => perf.lineItem())

    return nunjucks.render('report.txt', {
        customer: customer,
        lineItems,
        totalAmount: currencyFormatter(totalAmount/100),
        totalVolumeCredits
    })
}
