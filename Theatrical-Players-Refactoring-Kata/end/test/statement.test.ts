import statement from '../src/statement';
import fs from 'fs'

test('example statement', () => {
    const invoice = JSON.parse(fs.readFileSync('test/invoice.json', 'utf8'));
    const plays = JSON.parse(fs.readFileSync('test/plays.json', 'utf8'));
    expect(statement(invoice, plays)).toMatchSnapshot();
});

test('statement with new play types', () => {
    const invoice = JSON.parse(fs.readFileSync('test/invoice_new_plays.json', 'utf8'));
    const plays = JSON.parse(fs.readFileSync('test/new_plays.json', 'utf8'));

    // TODO: change to snap shot when it passes the first time
    const newPlaysExpected = fs.readFileSync('test/new_plays_output.txt', 'utf8')
    // expect(statement(invoice, plays)).toEqual(newPlaysExpected)
    expect(statement(invoice, plays)).toMatchSnapshot();
});

test('html output', () => {
    const invoice = JSON.parse(fs.readFileSync('test/invoice.json', 'utf8'));
    const plays = JSON.parse(fs.readFileSync('test/plays.json', 'utf8'));
    expect(statement(invoice, plays, {output: 'html'})).toMatchSnapshot()
})
