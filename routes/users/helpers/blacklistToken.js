const { Blacklist } = require('../../../models');

module.exports = function(token, res){
  let isBlacklisted = false;
    const blacklisted = new Blacklist({
      token
    })
    blacklisted.save(function(err){
      isBlacklisted = true
    });
    return isBlacklisted;
}