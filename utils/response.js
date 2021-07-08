module.exports = function({ res, status, code, message, details, ...rest}){
  statuses = {
    200: 'Success',
    201: 'Record created',
    202: 'Accepted',
    400: 'Bad request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not found',
    422: 'error',
    500: 'internal server error'
  }
  code = code == undefined ? 200 : code 
  status = status == undefined ? statuses[code] : status
  message = message == undefined ? statuses[code] : message
  details = details == undefined ? message : details  
  return res.status(code).json({
    ...rest,
    status,
    message,
    details,
    });
}
