const { convertToInt, formatResponse, mean, median, mode } = require('./mathOps');
const { CustomError } = require('./customErrors');

describe("convertToInt function", function(){
    test("converts string of csv to int", function(){
        let testString = '1, 2, 3';
        let test = convertToInt(testString);

        expect(test).toEqual([1,2,3]);
    })
    test("sorts numbers in ascending order", function(){
        let testString = '3, 2, 1';
        let test = convertToInt(testString);

        expect(test).toEqual([1,2,3]);
    })
    test("throws error when nums is empty string", function(){
        let testString = '';

        expect.assertions(1);
        try{
            let test = convertToInt(testString);
        } catch(err){
            expect(test).toThrow();
        }
    })
    test("throws error when nums is undefined", function(){
        let testString;

        expect.assertions(1);
        try{
            convertToInt(testString);
        } catch(err){
            expect(test).toThrow();
        }
    })
})

describe("formatResponse function", function(){
    test("formats the response for routes", function(){
        let testFormatted = formatResponse('test', 'testVal');

        expect(testFormatted).toEqual({
            operation: "test", 
            value: "testVal"
        })
    })
})

describe("mean function", function() {
    test("mean returns average of an array of numbers", function(){
        let testMean = mean('2,4,6,8');
        expect(testMean).toEqual(5);
    })
    test("returns average regardless of order of num array", function(){
        let testMean = mean('8, 4, 2, 6');
        expect(testMean).toEqual(5);
    })
})

describe("median function", function(){
    test("Median returns the middle value if array length is odd", function(){
        let test = median('1,2,3');

        expect(test).toEqual(2);
    })
    
    test("Median returns the middle two values if array length is even", function(){
        let test = median('1,2,3,4');

        expect(test).toEqual([2,3]);
    })
})

describe("mode function", function(){
    test("Mode returns the most frequent number", function(){
        let test = mode("1, 3, 3, 3, 4");
        expect(test).toEqual(3);
    })
})