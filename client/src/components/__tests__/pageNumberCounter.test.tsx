import React from 'react';
import { render} from '@testing-library/react';
import { isDecPageNumberLegal, isIncPageNumberLegal, legalInput } from '../PageNumberCounter';

describe("testing pageNumberCounter helper functions", () => {
    //  Testing legalInput to check if input from TextField is in
    // the intervall 1-24
    test("legalInput with too correct input", ()=>{
        const inputNumber = 5;
        const isLegal =  legalInput(inputNumber);
        expect(isLegal).toBe(true)
    })
    test("legalInput with too low input", ()=>{
        const inputNumber = -1;
        const isLegal =  legalInput(inputNumber);
        expect(isLegal).toBe(false)
    })
    test("legalInput with too high input", ()=>{
        const inputNumber = 25;
        const isLegal =  legalInput(inputNumber);
        expect(isLegal).toBe(false)
    })
    
    // testing isDecPageNumberLegal, which should return true if 
    // decremented number is bigger than 0
    test("isDecPageNumberLegal with legal input", ()=> {
        const inputNumber = 2;
        const isLegal = isDecPageNumberLegal(inputNumber);
        expect(isLegal).toBe(true);
    })
    test("isDecPageNumberLegal with bad input", ()=> {
        const inputNumber = 1;
        const isLegal = isDecPageNumberLegal(inputNumber);
        expect(isLegal).toBe(false);
    })

    // testing isIncPageNumberLegal, which should return true if 
    // incremented number is smaller than 25
    test("isIncPageNumberLegal with legal input", ()=> {
        const inputNumber = 23;
        const isLegal = isIncPageNumberLegal(inputNumber);
        console.log(isLegal)
        expect(isLegal).toBe(true);
    })
    test("isIncPageNumberLegal with bad input", ()=> {
        const inputNumber = 24;
        const isLegal = isIncPageNumberLegal(inputNumber);
        expect(isLegal).toBe(false);
    })

})