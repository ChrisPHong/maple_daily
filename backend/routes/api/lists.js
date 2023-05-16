const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { List } = require("../../db/models");
const axios = require("axios");

const router = express.Router();

const validateSignup = [];

// create a list
router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res) => {
    const { userId, name, character } = req.body;
    // https://api.maplestory.gg/v2/public/character/gms/charactername
    let apiContent;
    let list;

    axios.get(
      `https://api.maplestory.gg/v2/public/character/gms/${character}`
    ).then(response =>{
      apiContent = response.data.CharacterData.CharacterImageURL
      console.log(response.data);
      list = List.create({ userId, name, character, apiContent });
    }).catch(error=>{
      console.error(error)
      list = List.create({ userId, name, character });
    })


    return res.json({
      list,
    });
  })
);

module.exports = router;
