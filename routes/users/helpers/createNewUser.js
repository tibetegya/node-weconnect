const bcrypt = require('bcrypt');

const { User } = require('../../../models');
const response = require('../../../utils/response')
const saltRounds = 10;

module.exports = function(res, data, host, cb){

  data.password = bcrypt.hashSync(data.password, saltRounds);
  const newUser = new User({ ...data });
      newUser.save(function(err){
        const returnUser = newUser.cleanedFeilds()
        if (err){
          response({
            res,
            code: 422,
            message: 'Failed to add user to database',
            details: 'An error occured when adding the new user to the database',
            });
        } else {
          response({
            res,
            code: 201,
            message: 'Successfully registered user',
            details: 'A new user was sucessfully added to the database',
            ...returnUser,
            });
            cb(newUser.cleanedFeilds(), host);
        }
      })
}