const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

//signUp
router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        userName: req.body.userName,
        password: hash,
        email: req.body.email,
        phone: req.body.phone,
      });
      user
        .save()
        .then((result) => {
          console.log(result);
          res.status(200).json({
            newUser: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    }
  });
});

//logIn

router.post("/login", (req, res, next) => {
  console.log(req.body);
  User.find({ userName: req.body.userName })
    .exec()
    .then((user) => {
      console.log(user);
      if (user.length < 1) {
        return res.status(401).json({
          msg: "user not exist",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (!result) {
          return res.status(401).json({
            msg: "password matching fail",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              userName: user[0].userName,
              email: user[0].email,
              phone: user[0].phone,
            },
            "this is dummy test",
            {
              expiresIn: "24h",
            }
          );
          res.status(200).json({
            userName: user[0].userName,
            email: user[0].email,
            phone: user[0].phone,
            token: token,
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
});

module.exports = router;
