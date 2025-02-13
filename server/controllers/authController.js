var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(
  bodyParser.urlencoded({
    extended: false
  })
);
router.use(bodyParser.json());
var User = require("../models/User");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var config = require("../config");

module.exports = {
  register: function(req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    console.log("register end point");
    User.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      },
      function(err, user) {
        if (err)
          return res
            .status(500)
            .send("There was a problem registering the user.");

        //create token
        var token = jwt.sign(
          {
            id: user._id
          },
          config.secret,
          {
            expiresIn: 86400 //24 hours
          }
        );

        res.status(200).send({
          auth: true,
          token: token
        });
      }
    );
  },
  user: function(req, res) {
    var token = req.headers["x-access-token"];
    if (!token)
      return res.status(401).send({
        auth: false,
        message: "No token provided"
      });

    jwt.verify(token, config.secret, function(err, decoded) {
      if (err)
        return res.status(500).send({
          auth: false,
          message: "Failed to authenticate token"
        });

      User.findById(
        decoded.id,
        {
          password: 0
        },
        function(err, user) {
          if (err)
            return res.status(500).send("There was a problem finding the user");
          if (!user) return res.status(200).send("No user found");

          res.status(200).send(user);
        }
      );
    });
  },
  login: function(req, res) {
    console.log("login called");
    User.findOne(
      {
        email: req.body.email
      },
      ["password", "name"],
      function(err, user) {
        if (err) return res.status(500).send("Error on the server.");
        if (!user) return res.status(404).send("No user found.");

        var isPasswordValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!isPasswordValid)
          return res.status(401).send({
            auth: false,
            token: null
          });

        var token = jwt.sign(
          {
            id: user._id
          },
          config.secret,
          {
            expiresIn: 86400 //expires in 24 hours
          }
        );
        console.log(user);
        res.status(200).send({
          auth: true,
          token: token,
          name: user.name
        });
      }
    );
  }
};
