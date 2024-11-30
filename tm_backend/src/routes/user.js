const express = require("express");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const { user } = require("../config/database");
const userSchema = require("../config/types");

const router = express.Router();

//middleware that checks if the user already exist when trying to signup. Does so by searching if the username in the form is already present in DB.
const userExist = (req, res, next) => {
  const userName = req.body["userName"];
  user
    .findOne({ userName: userName })
    .then((user) => {
      if (user) {
        console.log("user already exists");
        res.status(409).json({
          message:
            "sorry! This user already exists in our database. use another username.",
        });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log("DB error.");
      res
        .status(500)
        .json({ message: "Internal server error. Try again later." });
    });
};

router.post("/signup", userExist, (req, res) => {
  const fullName = req.body["fullName"];
  const userName = req.body["userName"];
  const password = req.body["password"];
  const email = req.body["email"];

  const userDetail = {
    fullName: fullName,
    userName: userName,
    password: password,
    email: email,
  };

  const inputValidation = userSchema.safeParse(userDetail); // Ensures that the provided user input matches the expected formate and type.

  if (inputValidation.success) {
    argon2
      .hash(inputValidation.data.password)
      .then((hashedPassword) => {
        const newUser = new user({
          fullName,
          userName,
          password: hashedPassword,
          email, // Save the hashed passworde
        });

        newUser
          .save()
          .then((data) => {
            console.log("account sucessfully created");
            const jwtToken = jwt.sign(
              { userid: data._id, userName: data.fullName },
              process.env.JWT_SECRET
            );
            res.status(200).json({
              status: "success",
              message: "Authentication successful",
              token: jwtToken,
            });
          })
          .catch((err) => {
            console.log("some error occured when trying to save to the db.");
            res.status(400).json({ message: err });
          });
      })
      .catch((err) => {
        console.log("Error occurred while hashing the password.");
        res
          .status(400)
          .json({ message: err.message || "Password hashing error" });
      });
  } else {
    res.status(400).json({ message: inputValidation.error.errors[0] });
  }
});

router.post("/signin", (req, res) => {
  const { userName, password } = req.body;
  user
    .findOne({ userName })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      } else {
        argon2
          .verify(user.password, password)
          .then((isPassCorrect) => {
            if (!isPassCorrect) {
              return res.status(400).json({ message: "Invalid credentials" });
            }

            // generate a jwt token if the password is also correct.
            const jwtToken = jwt.sign(
              { userid: data._id, userName: data.fullName },

              process.env.JWT_SECRET
            );
            res.status(200).json({
              status: "success",
              message: "Authentication successful",
              token: jwtToken,
            });
          })
          .catch((err) => {
            console.log("Error verifying password:", err);
            res.status(500).json({ message: "Server error" });
          });
      }
    })
    .catch((err) => {
      console.log("Error during signin:", err);
      res.status(500).json({ message: "Server error" });
    });
});

module.exports = router;
