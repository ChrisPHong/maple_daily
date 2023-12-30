const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const config = require('../../config/index');

const emailSender = config.emailSender;
const email = emailSender.email;
const emailPW = emailSender.password


const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

const validateEmail = [check('email')
  .exists({ checkFalsy: true })
  .isEmail()
  .withMessage('Please provide a valid email.')]

const transporter = nodemailer.createTransport({
  service: "gmail.com",
  auth: {
    user: email,
    pass: emailPW,
  }
})

// Sign up
router.post(
  '',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

// Forgot Password
router.post('/fp', validateEmail,
  asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({
      where: { email: email }
    })
    if (user) {
      // Send the email here
      return res.status(200).json({ message: 'A link was sent to your email to change your password' })
    } else {
      return res.status(200).json({ message: 'The email you provided does not match any emails in our database. Please provide a valid email' })
    }

  }))

module.exports = router;
