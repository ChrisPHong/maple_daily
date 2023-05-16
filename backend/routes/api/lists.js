const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");

const { List, User } = require("../../db/models");
const axios = require("axios");

const router = express.Router();

const validateSignup = [];

// Get a list
router.get(
  "/", requireAuth,
  asyncHandler(async (req, res) => {
    // const userId = User
   console.log( User, '<<<<<<<<<<<<<<< userID >>>>>>>>>>>')
  //  console.log( req.params.username, '<<<<<<<<<<<<<<< params >>>>>>>>>>>')


  })
);
router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res) => {
    const { userId, name, character } = req.body;
    // https://api.maplestory.gg/v2/public/character/gms/charactername

    let apiContent;
    let list;
    let characterClass;
    let server;
    let level;
    axios
      .get(`https://api.maplestory.gg/v2/public/character/gms/${character}`)
      .then((response) => {

        apiContent = response.data.CharacterData.CharacterImageURL;
        characterClass = response.data.CharacterData.Class;
        server = response.data.CharacterData.Server;
        level = response.data.CharacterData.Level;

        list = List.create({
          userId,
          name,
          character,
          apiContent,
          characterClass,
          server,
          level,
        });
      })
      .catch((error) => {
        console.error(error);
      });

    return res.json({
      list,
    });
  })
);

module.exports = router;
