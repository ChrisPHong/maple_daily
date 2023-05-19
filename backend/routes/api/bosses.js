const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth");

const { Boss } = require("../../db/models");

const router = express.Router();

const validateSignup = [];

// Get a list
router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const bosses = await Boss.findAll()

    let newObj = Object.assign({});
    newObj.weekly = []
    newObj.daily = []
    bosses.forEach(boss => {
      if(boss.resetTime == "Weekly"){
        newObj.weekly.push(boss)
      }else{
        newObj.daily.push(boss)
      }
    });

    return res.json(newObj);
  })
);



module.exports = router;
