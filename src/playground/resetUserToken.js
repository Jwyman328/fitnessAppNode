const createRandomToken = require('./createRandomToken')
module.exports = function resetUserToken(targetUser){
    const token = await createRandomToken(16);
    targetUser.passwordResetToken = token;
    targetUser.passwordResetExpires = moment().add(1, 'months').toDate();
    await targetUser.save();
    return token
  }