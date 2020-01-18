Refactors:

The first thing that stood out to me straight away was the use of a loop.

```typescript
for (let perf of invoice.performances) {
```

When you see a for loop, its a safe bet its going to have side effects. Sometimes this can't be avoided, but most of the time you can avoid side effects by refactoring to use `map` `reduce` `filter` or a combination of the three. I prefer a functional style because it makes the authors intention much clearer. See a `map`? The author wants to take an array and get a new array of the same length. `filter` a new array but possibly of smaller length. `reduce` an array will be transformed into a primitive value like a string or number. When our intention is clear, finding bugs is also easier.


This is slightly more complex in that I need to emit two values for each item in the performances array: a print out of the performance line item, and the total cost. To handle this I am returning an object of both values:

```typescript
return {
    text: `${play.name}: ${currencyFormatter(thisAmount/100)} (${perf.audience} seats)`,
    performanceCost: thisAmount
}
```

and then, later on I can do what they like with that data:

```typescript
totalAmount = performancesData.map((perf) => perf.performanceCost).reduce((prev, curr) => prev + curr, 0)
result += performancesData.map((perf) => ` ${perf.text}`).join('\n')
```

Next I wanted to clean up that switch statement, I'm going to create two classes. `TragedyPerformace` and `ComedyPerformance` which take an audience count and implement `performanceCost` and `volumeCount` based on their specific business logic.

I'm going to create an interface 

```typescript
interface IPerformance {
  readonly audienceUnitCost: number
  readonly baselineCost: number
  audienceCount: number
  performanceCost(): number
  volumeCredits(): number
}
```

and a base class

```typescript
class Performance {
  audienceCount: number
  constructor(audienceCount: number) {
    this.audienceCount = audienceCount
  }

  volumeCredits() {
    return Math.max(this.audienceCount - 30, 0)
  }
}
```

and then implement the two sub classes

```typescript
export class TragedyPerformance extends Performance implements IPerformance {

  readonly audienceUnitCost = 1000;
  readonly baselineCost     = 40000;
  constructor(audienceCount: number) {
    super(audienceCount)
  }
  performanceCost() {
    if (this.audienceCount <= 30) return this.baselineCost

    const audienceCost = (this.audienceCount - 30) * this.audienceUnitCost

    return audienceCost + this.baselineCost
  }
}

export class ComedyPerformance extends Performance implements IPerformance {
  readonly audienceUnitCost         = 500;
  readonly baselineCost             = 30000;
  readonly audienceBonusUnitCost    = 300
  constructor(audienceCount: number) {
    super(audienceCount)
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
```

There's one problem though, which is that I don't want statement.ts to be responsible to checking the type of the performance to determine which class to instantate. Instead I am going to make a PerformanceFactory which handles this switcing and returns the right object

```typescript
export default function PerformanceFactory(audience: number, type: PerformanceTypes): IPerformance {
  switch(type) {
    case 'tragedy':
      return new TragedyPerformance(audience)
    case 'comedy':
      return new ComedyPerformance(audience)
    default:
      throw '/unknown type/'
  }
}
```

Now when I need to add new performance types, `statement.ts` doesn't need to change at all. We simply implement the new class and add it to the factory. SRP for the win!

Next, generating the output as a string seems a little clunky to me. Instead, I am going to use a nunjucks template

```typescript

nunjucks.configure('./src', {trimBlocks: true});

return nunjucks.render('report.txt', {
    customer: customer,
    lineItems,
    totalAmount: currencyFormatter(totalAmount/100),
    totalVolumeCredits
})
```

That way it'll be easier to edit the output if we need to.

## Adding new features

Now comes the fun part, adding the new features is a breeze!

### html output

We want to be able to generate either txt or html output. Nunjucks helps us here! I'm going to update the statement function signature to accept an output type (with txt being the default for backwards compatability)

```typescript
const defaultOptions: IStatementOptions = { output: 'txt' }

export default function statement (invoice: IInvoice, plays: IPlays, options: Partial<IStatementOptions> = {}) {
    
    const allOptions: IStatementOptions = Object.assign({}, defaultOptions, options)
```

and I'm also going to create a function that wraps nunjucks and renders the correct template

```typescript
/**
 * render statement in the desired output format
 */
function renderReport(data: IStatementData, outputType: outputFormats): string {
    return nunjucks.render(`report.${outputType}`, data)
}
```

If we later need to be able to add even more types (json? xml? yaml?). No sweat! Create a new template, update the types and you're good to go!

# adding history and pastoral

 - history: like tragedy except audience unit cost is 1200
 - pastoral: like comedy except volume credit is calculated by dividing by 7

Again, this is where our refactoring really pays off! To implement this we need to:

 - implement two new classes `HistoryPerformance` and `PastoralPerformance`. They will be similar to the existing performance classes just with some different business rules.
 - Update the `PerformanceFactory` accordingly.

That's it! Not sphgetti code or confusion about how to add this feature without breaking something else. Everything is neatly tucked away in its own place. It only needs to change for its own sake and not for anyone elses.