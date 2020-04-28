const User = require("../models/Users");

/**
 * Create an array of all users not including the current user.
 *
 * @param {Object} currentUser   Current User making the request
 * @return {Array}               All user emails not including the current user
 */
async function getAllUserNamesExceptCurrentUser(currentUser) {
  const allUsers = await User.find({});
  const allOtherUsers = allUsers.filter(
    (user) => user.token !== currentUser.token
  );
  const allOtherUsersEmails = allOtherUsers.map((user) => user.email);
  return allOtherUsersEmails;
}

module.exports = getAllUserNamesExceptCurrentUser;
