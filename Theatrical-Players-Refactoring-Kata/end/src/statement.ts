import {IInvoice, IPlays} from './types'

export default function statement (invoice: IInvoice, plays: IPlays) { // long function
    let totalAmount = 0; // mutable
    let volumeCredits = 0; // mutable
    let result = `Statement for ${invoice.customer}\n`; // mutable, myterious name
    const currencyFormatter = new Intl.NumberFormat("en-US",
        { style: "currency", currency: "USD",
            minimumFractionDigits: 2 }).format; // myterious name

    for (let perf of invoice.performances) { // loop
        const play = plays[perf.playID];
        let thisAmount = 0; // mutable, mysterious. the cost for a single performance
        switch (play.type) { // switch!
            case "tragedy":
                thisAmount = 40000;
                if (perf.audience > 30) {
                    thisAmount += 1000 * (perf.audience - 30);
                }
                break;
            case "comedy":
                thisAmount = 30000;
                if (perf.audience > 20) {
                    thisAmount += 10000 + 500 * (perf.audience - 20);
                }
                thisAmount += 300 * perf.audience;
                break;
            default:
                throw new Error(`unknown type: ${play.type}`);
        }
        // add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0);
        // add extra credit for every ten comedy attendees
        if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5); // random business logic
        // print line for this order
        result += ` ${play.name}: ${currencyFormatter(thisAmount/100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }
    result += `Amount owed is ${currencyFormatter(totalAmount/100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
}
