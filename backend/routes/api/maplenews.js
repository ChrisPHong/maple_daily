const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const axios = require("axios");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");

const { List, User, Task } = require("../../db/models");

const router = express.Router();

const validateSignup = [];

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const axiosResponse = await new Promise((resolve, reject) => {
      axios
        .get(`https://maplestory.nexon.net/news`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          return error;
        });
    });

    console.log(axiosResponse, "<<<<<<<<<<<<<<<< this is the response");
    return res.json(axiosResponse);
  })
);
module.exports = router;
