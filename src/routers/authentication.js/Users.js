const express = require("express");
const User = require("../../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userRouter = new express.Router();
const auth = require("../../middleware/auth");
const getAllUserNamesExceptCurrentUser = require("../../utils/getAllUserNamesExceptCurrentUser");
const { redisClient } = require("../../db/redisClient");

/**
 * Create and return a token on valid sign in.
 *
 * @return {String}     A JWT token acknowledging the user is logged in
 */
userRouter.post("/user/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.data.email });
    const isPasswordMatching = await bcrypt.compare(
      req.body.data.password,
      user.password
    );
    if (isPasswordMatching) {
      // create a token for user and send it back
      const token = await user.generateJWTToken(redisClient);
      res.send({ token: token });
    } else {
      res.status("400").send("password is invalid");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("error email does not exist");
  }
});

/**
 * Create a new user and return them a JWT.
 *
 * @return {String}     A JWT token acknowledging the user is logged in.
 */
userRouter.post("/user/create/", async (req, res) => {
  try {
    const newUser = new User(req.body.data);
    await newUser.generateJWTToken(redisClient);
    res.send(newUser);
  } catch (error) {
    res.status("400");
    res.send(`error on user creation ${error}`);
  }
});

/**
 * Return user email and totalPoints
 *
 * Return Example:
 * {email: testUser@test.com, totalPoints:100}
 */
userRouter.get("/user/profile/", auth, async (req, res) => {
  try {
    const userEmailAndTotalPoints = {
      email: req.user.email,
      totalPoints: req.user.totalPoints,
    };
    res.send(userEmailAndTotalPoints);
  } catch (error) {
    res.status(400).send("could not find user profile");
  }
});

/**
 * Return an array of all users emails except the email of the user making the request.
 *
 * Emample:
 * [userOne@test.com, userTwo@test.com, userThree@test.com]
 */
userRouter.get("/user/allUsers/", auth, async (req, res) => {
  try {
    const allUserNamesExceptCurrentUser = await getAllUserNamesExceptCurrentUser(
      req.user
    );
    res.send(allUserNamesExceptCurrentUser);
  } catch (error) {
    res.status(400).send("could not find any users");
  }
});

module.exports = userRouter;
