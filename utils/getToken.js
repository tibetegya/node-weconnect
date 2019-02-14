module.exports = function(req){
  const { headers: { authorization } } =  req;
  if(authorization){
    if (authorization.includes('Bearer')){
      return authorization.split(' ')[1]
    } else {
      return authorization.split(' ')[0]
    }
  } else {
    return null
  }
}