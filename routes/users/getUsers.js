const { User } = require('../../models')
const { userReturnFeilds } = require('../../utils/constants')

module.exports = function(req, res, next) {
  User.find({},
    userReturnFeilds, function(err, existingUser){
      res.json({users: existingUser});
    })
  
}