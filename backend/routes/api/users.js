const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const config = require('../../config/index');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require('sequelize');


const emailSender = config.emailSender;
const emailHost = emailSender.email;
const emailPW = emailSender.password
const secretKey = emailSender.secretKey
const emailExpires = emailSender.emailExpires


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
    user: emailHost,
    pass: emailPW,
  }
})

const sendEmail = async (to, subject, text) => {

  try {
    const mailOptions = {
      from: emailHost,
      to,
      subject,
      text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email: ', error);
    return error;
  }
};

// Sign up
router.post(
  '', validateEmail,
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
router.post('/fp',
  asyncHandler(async (req, res) => {
    const { email } = req.body;
    const payload = { email }
    const emailSubject = 'Reset Your Password for DailyMapler'
    const token = jwt.sign(payload, secretKey, { expiresIn: emailExpires })

    console.log(token, "<<<<<<<<<<<<<< This is my token! ")

    const emailText = `Here's a link to reset your password! http://localhost:3000/resetpassword/${token}`
    const user = await User.findOne({
      where: { email: email }
    })
    if (user) {
      // Send the email here
      const testing = await sendEmail(email, emailSubject, emailText);
      // you need to send a Token and a expiration token here
      user.resetPasswordToken = token;
      user.resetPasswordTokenExpires = new Date(Date.now() + (1 * 60 * 5000))
      await user.save();
      return res.status(200).json({ message: 'A link was sent to your email to change your password' })
    } else {
      return res.status(200).json({ message: 'The email you provided does not match any emails in our database. Please provide a valid email' })
    }

  }))

// Forgot Password
router.post('/resetPassword/:token',
  asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;

    // make sure to test out the token and the expiration date, you will use the token as a key to get access to the user's account instead of their email.

    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordTokenExpires: { [Op.gt]: new Date() }
      }
    })
    console.log(user, "<<<<<<<<<<<<<<< This is the user!");
    if (user) {

      const hashedPassword = bcrypt.hashSync(password);
      user.hashedPassword = hashedPassword;
      // Clear the user's token and the expiration date so that it is null
      user.resetPasswordToken = null;
      user.resetPasswordTokenExpires = null;
      await user.save();
      return res.status(200).json({ message: 'Your Password has been updated' });
    } else {
      return res.status(200).json({ message: 'The email you provided does not match any emails in our database. Please provide a valid email' })
    }

  }))

module.exports = router;
