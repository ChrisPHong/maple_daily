const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");

const { List, Task } = require("../../db/models");
const axios = require("axios");

const router = express.Router();

const validateSignup = [];

const sortingLists = async (lists) => {
  let updatedLists = lists.map((list) => {
    return sortingTasks(list);
  });

  return updatedLists;
};

const sortingTasks = (list) => {
  let updatedList = Object.assign({}, list.get());
  let updatedTasks = {
    Weekly: { Boss: {}, Quest: {} },
    Daily: { Boss: {}, Quest: {} },
  };

  if (list.Tasks.length > 0) {
    list.Tasks.forEach((task) => {
      const { resetTime, category } = task;
      if (resetTime === "Weekly" && category === "Boss") {
        updatedTasks["Weekly"]["Boss"][task.id] = Object.assign({}, task.get());
      } else if (resetTime === "Weekly" && category === "Quest") {
        updatedTasks["Weekly"]["Quest"][task.id] = Object.assign(
          {},
          task.get()
        );
      } else if (resetTime === "Daily" && category === "Boss") {
        updatedTasks["Daily"]["Boss"][task.id] = Object.assign({}, task.get());
      } else {
        updatedTasks["Daily"]["Quest"][task.id] = Object.assign({}, task.get());
      }
      // updatedTasks[task.id] = Object.assign({}, task.get());
    });

    updatedList.Tasks = updatedTasks;
    return updatedList;
  } else {
    return updatedList;
  }
};
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

    const updatedLists = await sortingLists(lists);
    return res.json(updatedLists);
  })
);

router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res) => {
    const { userId, name, character, payload } = req.body;

    let apiContent;
    let list;
    let characterClass;
    let server;
    let level;

    try {
      // Wrap the axios request in a Promise and await it
      const axiosResponse = await new Promise((resolve, reject) => {
        axios
          .get(`https://api.maplestory.gg/v2/public/character/gms/${character}`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });

      // Handle the axios response
      apiContent = axiosResponse.data.CharacterData.CharacterImageURL;
      characterClass = axiosResponse.data.CharacterData.Class;
      server = axiosResponse.data.CharacterData.Server;
      level = axiosResponse.data.CharacterData.Level;

      // Create the list
      list = await List.create({
        userId,
        name,
        character,
        apiContent,
        characterClass,
        server,
        level,
      });

      const listId = list.dataValues.id;

      // Create an array of promises for task creation
      const bossesNames = Object.keys(payload);
      if (bossesNames.length > 0) {
        const taskCreationPromises = bossesNames.map(async (bossName) => {
          const { resetTime, category } = payload[bossName];
          return Task.create({
            userId,
            listId,
            resetTime,
            category,
            objective: bossName,
          });
        });

        // Wait for the list creation and all task creation promises to resolve
        await Promise.all([list, ...taskCreationPromises]);

        // Fetch the list with associated tasks after creation
        const oneList = await List.findOne({
          where: { id: list.id },
          include: { model: Task },
        });
        // organizes the tasks into weeklies and dailies
        const updatedList = sortingTasks(oneList);

        return res.json(updatedList);
      } else {

        let updatedTasks = {
          Weekly: { Boss: {}, Quest: {} },
          Daily: { Boss: {}, Quest: {} },
        };
        list.Tasks = updatedTasks;
        return res.json(list);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred." });
    }
  })
);

router.delete(
  "/:listId",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.listId);
    const list = await List.findByPk(id);

    await list.destroy();

    return res.json(list);
  })
);

module.exports = router;
