
/** @jest-environment jsdom */
//import React from 'react'
//import { render } from '@testing-library/react'

//import Button from '.'

//describe('Button', () => {
//    it('renders button without crashing', () => {
//        const label = 'test'

//        render(<Button label={label} />)
//    })
//})


const calculator = require('./script');
const x = '13';
const y = '5';

test('Add numbers using the add method', () => {
    calculator.nResult = x;
    calculator.sCurValue = y;
    calculator.sMark = '+';
  
    calculator.fnCountResult();
    expect(calculator.fnShowResult()).toBe(eNumCur.innerHTML == '18')
});

test('Add numbers using the add method', () => {
    calculator.nResult = x;
    calculator.sCurValue = y;
    calculator.sMark = '-';

    calculator.fnCountResult();
    expect(calculator.fnShowResult()).toBe(eNumCur.innerHTML == '8')
});

test('Add numbers using the add method', () => {
    calculator.nResult = x;
    calculator.sCurValue = y;
    calculator.sMark = '*';

    calculator.fnCountResult();
    expect(calculator.fnShowResult()).toBe(eNumCur.innerHTML == '65')
});

test('Add numbers using the add method', () => {
    calculator.nResult = x;
    calculator.sCurValue = y;
    calculator.sMark = '*';

    calculator.fnCountResult();
    expect(calculator.fnShowResult()).toBe(eNumCur.innerHTML == '2.6')
});

test('Add numbers using the add method', () => {
    calculator.nResult = '123456789';
    calculator.sCurValue = '2';
    calculator.sMark = '*';

    calculator.fnCountResult();
    expect(calculator.fnShowResult()).toBe(eNumCur.innerHTML == '246913578' )
});

test('Add numbers using the add method', () => {
    calculator.nResult = '12345678901234567';
    calculator.sCurValue = '1';
    calculator.sMark = '*';

    calculator.fnCountResult();
    expect(calculator.fnShowResult()).toBe(eNumCur.innerHTML == '12345678901234568')
});

test('Add numbers using the add method', () => {
    calculator.nResult = '9';
    calculator.sCurValue = '0';
    calculator.sMark = '/';

    calculator.fnCountResult();
    expect(calculator.fnShowResult()).toBe(eNumCur.innerHTML == 'Infinity')
});

test('Add numbers using the add method', () => {
    calculator.nResult = '9';
    calculator.sCurValue = '12345678901234568';
    calculator.sMark = '/';

    calculator.fnCountResult();
    expect(calculator.fnShowResult()).toBe(eNumCur.innerHTML == '')
});

test('Add numbers using the add method', () => {
    calculator.nResult = '9';
    calculator.sCurValue = '12345678901234568';
    calculator.sMark = '/';

    calculator.fnCountResult();
    expect(calculator.fnShowResult()).toBe(eNumCur.innerHTML == '')
});

test('Add numbers using the add method', () => {
    calculator.nResult = '9';
   /* calculator.sCurValue = 12 345 678 901 234 568;*/
    calculator.sMark = '/';

    calculator.fnCountResult();
    expect(calculator.fnShowResult()).toBe(eNumCur.innerHTML == '')
});

test('Add numbers using the add method', () => {
    calculator.nResult = ')';
    /* calculator.sCurValue = 12 345 678 901 234 568;*/
    calculator.sMark = '/';

    calculator.fnCountResult();
    expect(calculator.fnShowResult()).toBe(eNumCur.innerHTML == '')
});

test('Add numbers using the add method', () => {
    calculator.nResult = '9';
    /* calculator.sCurValue = 12 345 678 901 234 568;*/
    /*calculator.sMark = '/';*/

    calculator.fnCountResult();
    expect(calculator.fnShowResult()).toBe(eNumCur.innerHTML == 'Infinity')
});

test('Add numbers using the add method', () => {
    calculator.sStep = '9 + (4+6)*2 - 4/2';
    /* calculator.sCurValue = 12 345 678 901 234 568;*/
    /*calculator.sMark = '/';*/

    calculator.fnCountResult();
    expect(calculator.fnShowResult()).toBe(eNumCur.innerHTML == 'Infinity')
});

test('Add numbers using the add method', () => {
    calculator.sStep = '(4+6)';
    /* calculator.sCurValue = 12 345 678 901 234 568;*/
    /*calculator.sMark = '/';*/

    calculator.fnCountResult();
    expect(calculator.fnShowResult()).toBe(eNumCur.innerHTML == 'Infinity')
});

test('Add numbers using the add method', () => {
    calculator.sStep = '4+6*2';
    /* calculator.sCurValue = 12 345 678 901 234 568;*/
    /*calculator.sMark = '/';*/

    calculator.fnCountResult();
    expect(calculator.fnShowResult()).toBe(eNumCur.innerHTML == 'Infinity')
});

test('Add numbers using the add method', () => {
    calculator.sStep = '5555555555555';
    /* calculator.sCurValue = 12 345 678 901 234 568;*/
    /*calculator.sMark = '/';*/

    calculator.fnCountResult();
    expect(calculator.fnShowResult()).toBe(eNumCur.innerHTML == 'Infinity')
});

test('Add numbers using the add method', () => {
    calculator.sStep = '555555555555.5555555';
    /* calculator.sCurValue = 12 345 678 901 234 568;*/
    /*calculator.sMark = '/';*/

    calculator.fnCountResult();
    expect(calculator.fnShowResult()).toBe(eNumCur.innerHTML == 'Infinity')
});

test('Add numbers using the add method', () => {
    calculator.sStep = '0.55599999999';
    /* calculator.sCurValue = 12 345 678 901 234 568;*/
    /*calculator.sMark = '/';*/

    calculator.fnCountResult();
    expect(calculator.fnShowResult()).toBe(eNumCur.innerHTML == 'Infinity')
});

test('Add numbers using the add method', () => {
    calculator.sStep = '555555555555.5559999';
    /* calculator.sCurValue = 12 345 678 901 234 568;*/
    /*calculator.sMark = '/';*/

    calculator.fnCountResult();
    expect(calculator.fnShowResult()).toBe(eNumCur.innerHTML == 'Infinity')
});
//test('Subtract numbers using the subtract method', () => {
//    expect(script.fnCountResult()).toBe(8)
//});
//test('Multiply numbers using the multiply method', () => {
//    expect(script.fnCountResult()).toBe(65)
//});
//test('Divide numbers using the divide method', () => {
//    expect(script.fnCountResult()).toBe(2.6)
//});
//test('Find the remainder of dividing numbers using the modulo method', () => {
//    expect(script.fnCountResult()).toBe(3)
//});

//function add(a, b) {
//    return a + b;
//}
//function subtract(a, b) {
//    return a - b;
//}
//function multiply(a, b) {
//    return a * b;
//}
//function divide(a, b) {
//    return a / b;
//}
//function modulo(a, b) {
//    return a % b;
//}
//module.exports.add = add;
//module.exports.subtract = subtract;
//module.exports.multiply = multiply;
//module.exports.divide = divide;
//module.exports.modulo = modulo;