const User = require('../models/Users')

/**
 * Return an array of all user emails except the current user.
 * 
 * @param {Object} currentUser -- User making the request.
 */
async function getAllUserNamesExceptCurrentUser(currentUser){
   const allUsers = await User.find({})
   const allOtherUsers = allUsers.filter(user => user.token !== currentUser.token) 
   const allOtherUsersEmails = allOtherUsers.map(user => user.email)
   return allOtherUsersEmails
}

module.exports = getAllUserNamesExceptCurrentUser 