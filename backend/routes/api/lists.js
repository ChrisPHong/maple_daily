const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");

const { List, User, Task } = require("../../db/models");
const axios = require("axios");

const router = express.Router();

const validateSignup = [];

// Get a list
router.get(
  "/:userId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId);
    const lists = await List.findAll({
      where: { userId: userId },
      include: { model: Task },
    });

    let updatedLists = lists.map((list) => {
      let updatedList = Object.assign({}, list.get());
      let updatedTasks = {};

      list.Tasks.forEach((task) => {
        updatedTasks[task.id] = Object.assign({}, task.get());
      });

      updatedList.Tasks = updatedTasks;
      return updatedList;
    });

    return res.json(updatedLists);
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
    await axios
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
        return res.json({ list });
      })
      .catch((error) => {
        console.error(error);
      });

    // return res.json({
    //   list,
    // });
  })
);

router.delete(
  "/:listId",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.listId);
    const list = await List.findByPk(id);
    console.log(list, "<<<<< list >>>>>>>>>>>>>>>");
    await list.destroy();

    return res.json(list);
  })
);

module.exports = router;
