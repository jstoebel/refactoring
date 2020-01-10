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