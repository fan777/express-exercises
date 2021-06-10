const express = require('express');
const fs = require('fs');
const ExpressError = require('./error');
const { calcMean, calcMedian, calcMode } = require('./calc');

const app = express();

app.get('/mean', (req, res, next) => {
  try {
    let nums = convertParamsToNumArray(req.query.nums);
    return res.send({
      operation: 'mean',
      value: calcMean(nums),
    });
  } catch (e) {
    next(e);
  }
})

app.get('/median', (req, res, next) => {
  try {
    let nums = convertParamsToNumArray(req.query.nums);
    return res.send({
      operation: 'median',
      value: calcMedian(nums),
    })
  } catch (e) {
    next(e);
  }
})

app.get('/mode', (req, res, next) => {
  try {
    let nums = convertParamsToNumArray(req.query.nums);
    return res.send({
      operation: 'mode',
      value: calcMode(nums),
    })
  } catch (e) {
    next(e);
  }
})

app.get('/all', (req, res, next) => {
  try {
    let nums = convertParamsToNumArray(req.query.nums);
    return res.send({
      operation: 'all',
      mean: calcMean(nums),
      median: calcMedian(nums),
      mode: calcMode(nums),
    })
  } catch (e) {
    next(e);
  }
})

// 404 handler
app.use((req, res, next) => {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

// general error handler
app.use((err, req, res, next) => {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert the user
  return res.status(status).json({
    error: { message, status }
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000")
});

/********************
 * route input validation
 */
function convertParamsToNumArray(array) {
  let nums = array.split(',');

  if (!array)
    throw new ExpressError('nums are required', 400)

  if (nums.length < 2)
    throw new ExpressError('more than one num expected', 400)

  return nums.map(element => {
    if (isNaN(element))
      throw new ExpressError(`${element} is not a number`, 400)
    return (Number(element));
  })
}