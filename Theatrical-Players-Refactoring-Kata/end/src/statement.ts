import {IInvoice, IPlays, IStatementOptions, outputFormats} from './types'
import PerformanceFactory from './performance';
import { currencyFormatter } from './util'
import nunjucks from 'nunjucks';

nunjucks.configure('./src/templates', {trimBlocks: true, lstripBlocks: true});


interface IStatementData {
    customer: string,
    lineItems: string[]
    totalAmount: string
    totalVolumeCredits: number
}
/**
 * render statement in the desired output format
 */
function renderReport(data: IStatementData, outputType: outputFormats): string {
    return nunjucks.render(`report.${outputType}`, data)
}

const defaultOptions: IStatementOptions = { output: 'txt' }

export default function statement (invoice: IInvoice, plays: IPlays, options: Partial<IStatementOptions> = {}) {
    
    const allOptions: IStatementOptions = Object.assign({}, defaultOptions, options)

    const sum = (prev: number, curr: number) => prev + curr // summing function for array of numbers

    const {performances, customer} = invoice;
    const performancesData = performances.map((perf) => {
        const play = plays[perf.playID];
        return PerformanceFactory(play.name, perf.audience, play.type)
    })

    const totalAmount = performancesData.map((perf) => perf.performanceCost()).reduce(sum, 0)
    const totalVolumeCredits = performancesData.map((perf) => perf.volumeCredits()).reduce(sum, 0)
    const lineItems = performancesData.map((perf) => perf.lineItem())

    return renderReport({
        customer,
        lineItems,
        totalAmount: currencyFormatter(totalAmount/100),
        totalVolumeCredits
    }, allOptions.output)
}
