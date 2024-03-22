const express = require('express');
const {CustomError} = require('./customErrors');
const { formatResponse, mean, median, mode } = require('./mathOps')

app = express();


app.get('/mean', (req, res, next) => {
    // debugger;
    try{
        let meanVal = mean(req.query['numbers']);
        
        let operation = formatResponse('mean', meanVal);
        return res.send(operation);
    } catch(err) {
        next(err);
    }
})

app.get('/median', (req, res) => {
    let medianVal = median(req.query['numbers']);

    let operation = formatResponse('median', medianVal);
    return res.send(operation);
})

app.get('/mode', (req, res) => {
    let modeVal = mode(req.query['numbers']);

    let operation = formatResponse('mode', modeVal);
    return res.send(operation);
})

app.get('/all', (req, res) => {
    let vals = req.query['numbers'];
    let meanVal = mean(vals);
    let medianVal = median(vals);
    let modeVal = mode(vals);

    return res.send({
        operation: 'all',
        mean: meanVal,
        median: medianVal,
        mode: modeVal
    })
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