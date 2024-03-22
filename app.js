const express = require('express');
const fs = require('fs');
// const {CustomError} = require('./customErrors');
const { formatResponse, mean, median, mode } = require('./mathOps')

app = express();

function writeResults(content) {
    fs.writeFile('./results.json', JSON.stringify(content), 
        err => {
            if(err) throw err;
            console.log('results written to results.json');
        });
}

app.get('/mean', (req, res, next) => {
    // debugger;
    const {save=false} = req.query;
    try{
        let meanVal = mean(req.query['numbers']);
        
        let operation = formatResponse('mean', meanVal);

        if(save){
            console.log('saving results...');
            writeResults(operation);
        }
        
        return res.send(operation);
    } catch(err) {
        next(err);
    }
})

app.get('/median', (req, res) => {
    const {save=false} = req.query;

    let medianVal = median(req.query['numbers']);
    
    let operation = formatResponse('median', medianVal);
    
        if(save){
            console.log('saving results...');
            writeResults(operation);
        }
        
    return res.send(operation);
})

app.get('/mode', (req, res) => {
    const {save=false} = req.query;

    let modeVal = mode(req.query['numbers']);
    
    let operation = formatResponse('mode', modeVal);
    
        if(save){
            console.log('saving results...');
            writeResults(operation);
        }

    return res.send(operation);
})

app.get('/all', (req, res) => {
    const {save=false} = req.query;

    let vals = req.query['numbers'];
    let meanVal = mean(vals);
    let medianVal = median(vals);
    let modeVal = mode(vals);

    let operation = {
        operation: 'all',
        mean: meanVal,
        median: medianVal,
        mode: modeVal
    }

    if(save){
        console.log('saving results...');
        writeResults(operation);
    }

    return res.send(operation);
})

app.use(function(err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;
  
    // set the status and alert the user
    return res.status(status).json({
      error: {message, status}
    });
  });

app.listen(3000, () => {
    console.log('Listening on port 3000...');
})