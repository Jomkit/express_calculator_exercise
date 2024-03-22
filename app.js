const express = require('express');
const {CustomError} = require('./customErrors');
const { formatResponse, mean, median } = require('./mathOps')

app = express();

function meanRoute(req, res, next){
    try{
        let meanVal = mean(req.query['numbers']);
        
        let operation = formatResponse('mean', meanVal);
        return res.send(operation);
    } catch(err) {
        next(err);
    }
}
app.get('/mean', meanRoute);

function medianRoute(req, res, next){
    let medianVal = median(req.query['numbers']);
    
    let operation = formatResponse('median', medianVal);
    return res.send(operation);

}
app.get('/median', medianRoute);

app.get('/mode', (req, res) => {
    let modeVal = mode(req,query['numbers']);

    let operation = formatResponse('mode', modeVal);
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