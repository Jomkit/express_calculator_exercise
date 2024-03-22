const { CustomError } = require('./customErrors')

function checkNaN(numArr){
    for(let num of numArr){
        if(isNaN(num)){
            throw new CustomError(`${num} is not a number`, 400);
        }
    }
    return;
}

function convertToInt(nums) {
    // Convert string nums to an array numbers
    if(nums == false || nums == undefined){
        throw new CustomError('nums are required', 400);
    }
    
    let numbers = nums.split(",");
    checkNaN(numbers);
    numbers = numbers.map((x) => parseInt(x));

    return numbers.sort((a, b) => a - b);
}

function formatResponse(op, value){
    return {
        operation: op,
        value: value
    }
}

function mean(nums){
    let numArr = convertToInt(nums);
    let sum = 0;
    for(let n of numArr){
        sum += n;
    }
    
    let mean = sum/numArr.length;
    
    return mean;
}

function median(nums){
    let numArr = convertToInt(nums);
    let mid = Math.floor(numArr.length/2);
    let median;
    
    // If numArr length even (i.e., numArr.length%2 == 0 (false)),
    // return mid & mid+1 values, else return mid value
    if(numArr.length % 2){
        median = numArr[mid];
    } else if(!(numArr.length % 2)){
        median = [numArr[mid-1], numArr[mid]]
    }

    return median;
}

function mode(nums){
    let numArr = convertToInt(nums);
    let hiScore = 0;
    let currScore = 0;
    let hiNum;

    for(let n of numArr){
        for(let i=0; i < numArr.length; i++){
            if(numArr[i] == n) currScore++;
        }

        if(currScore > hiScore) {
            hiScore = currScore;
            hiNum = n;
        };
        currScore = 0;
    }

    return hiNum;
}

module.exports = { convertToInt, formatResponse, mean, median, mode };