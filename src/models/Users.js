const mongoose = require("mongoose");
const validator = require("validator");
const hash = require("bcryptjs"); 
const jwt = require("jsonwebtoken");

/**
 * User model Schema.
 */
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    validate(email) {
      if (!validator.isEmail(email)) {
        throw Error("invalid email");
      }
    },
  },
  password: {
    type: String,
    validate(password) {
      if (!password.length > 7) {
        throw Error("invalid password length must be more than 7 characters");
      }
    },
  },
  token: {
    type: String,
    required: true,
  },
  totalPoints: {
    type: Number,
    default: 0,
    validate(totalPoints) {
      if (totalPoints < 0) {
        throw Error("Must be positive number");
      }
    },
  },
});

/**
 * Before saving a newly modified password, 
 * hash the password
 */
UserSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (user.isModified("password")) {
      user.password = await hash.hash(user.password, 8);
    }
    next();
  } catch (error) {
    console.log("error with ");
  }
});

/**
 * On creation of a new user, generate a new JWT, set it to user token and start session mgmt 
 * of current user in redis.
 * 
 */
UserSchema.methods.generateJWTToken = async function (redisClient) {
  try {
    const user = this;
    const newToken = jwt.sign({ email: user.email.toString() }, `${process.env.HASH_PASSWORD}`);
    user.token = newToken; // add token to array of tokens.

    // set token user email to redis db
    await redisClient.setAsync(newToken, user.email);
    await user.save();
    return newToken;
  } catch (error) {
    console.log(error);
  }
};
const User = mongoose.model("User", UserSchema);

module.exports = User;
