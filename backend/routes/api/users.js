const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const config = require('../../config/index');
const bcrypt = require("bcryptjs");


const emailSender = config.emailSender;
const emailHost = emailSender.email;
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
    user: emailHost,
    pass: emailPW,
  }
})
const emailSubject = 'Reset Your Password for DailyMapler'
const emailText = `Here's a link to reset your password! http://localhost:3000/resetpassword`

const sendEmail = async (to, subject, text) => {
  console.log(to, "to <<<<<<<<<<<<<")
  console.log(subject, "subject >>>>>>>>>>>>")
  console.log(text, "text <<<<<<<<<<<")
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

    const user = await User.findOne({
      where: { email: email }
    })
    if (user) {
      // Send the email here
      const testing = await sendEmail(email, emailSubject, emailText);
      console.log(testing, "<<<<<<<<<<<<< what is going on >>>>>>>>>>>>")
      return res.status(200).json({ message: 'A link was sent to your email to change your password' })
    } else {
      return res.status(200).json({ message: 'The email you provided does not match any emails in our database. Please provide a valid email' })
    }

  }))

// Forgot Password
router.post('/resetPassword',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email: email }
    })
    if (user) {

      const hashedPassword = bcrypt.hashSync(password);
      user.hashedPassword = hashedPassword;
      await user.save();
      return res.status(200).json({ message: 'Your Password has been updated' })
    } else {
      return res.status(200).json({ message: 'The email you provided does not match any emails in our database. Please provide a valid email' })
    }

  }))

module.exports = router;
