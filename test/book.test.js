
//import { sum } from "../controller/sum";

const sum = require("../controller/sum")


test('should first', () => { 
    expect(sum(2 + 3)).toBe(5)
 })