const express = require('express')
const router = express.Router()
const UserSchema = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

// Sign-in
router.post("/signin", async (req, res, next) => {
  user = await UserSchema.findOne({ email: req.body.email })
 
  if (!user) {
    res.status(201).json({ status: false, msg: process.env.msgUserAuthNotFindFr })
    return
  }



  passwordCompare = await cryptr.decrypt(user.password)===req.body.password
  if (!passwordCompare) {
    res.status(201).json({ status: false, msg: process.env.msgPasswordCompare })
    return
  } else {
    user['password'] = undefined;
    user = JSON.parse(JSON.stringify(user));
  }

  if (user && passwordCompare) {
  
    let jwtToken = jwt.sign({ email: user.email, userId: user._id }, process.env.TOKEN_KEY, { expiresIn: '7d' });
    res.status(200).json({
      token: jwtToken,
      expiresIn: 3600,
      data: user,
      status: true
    });
  }

});

//Verify Connexion
router.post("/verifyToken", async (req, res, next) => {
  try {
 
    res.status(201).json(jwt.verify(req.body.token, process.env.SecrectCodeJwt));
  } catch (error) {
    res.status(201).json(false);
  }
})






module.exports = router