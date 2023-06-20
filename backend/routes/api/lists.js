const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");

const { List, Task } = require("../../db/models");
const axios = require("axios");
// const { Op } = require("Sequelize");
const Op = require("sequelize");

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
    Weekly: {
      Boss: { incomplete: {}, complete: {} },
      Quest: { incomplete: {}, complete: {} },
    },
    Daily: {
      Boss: { incomplete: {}, complete: {} },
      Quest: { incomplete: {}, complete: {} },
    },
  };

  if (list.Tasks.length > 0) {
    list.Tasks.forEach((task) => {
      const { resetTime, category } = task;
      if (resetTime === "Weekly" && category === "Boss") {
        if (task.completed === false) {
          updatedTasks["Weekly"]["Boss"]["incomplete"][task.id] = Object.assign(
            {},
            task.get()
          );
        } else {
          updatedTasks["Weekly"]["Boss"]["complete"][task.id] = Object.assign(
            {},
            task.get()
          );
        }
      } else if (resetTime === "Weekly" && category === "Quest") {
        if (task.completed === false) {
          updatedTasks["Weekly"]["Quest"]["incomplete"][task.id] =
            Object.assign({}, task.get());
        } else {
          updatedTasks["Weekly"]["Quest"]["complete"][task.id] = Object.assign(
            {},
            task.get()
          );
        }
      } else if (resetTime === "Daily" && category === "Boss") {
        if (task.completed === false) {
          updatedTasks["Daily"]["Boss"]["incomplete"][task.id] = Object.assign(
            {},
            task.get()
          );
        } else {
          updatedTasks["Daily"]["Boss"]["complete"][task.id] = Object.assign(
            {},
            task.get()
          );
        }
      } else {
        if (task.completed === false) {
          updatedTasks["Daily"]["Quest"]["incomplete"][task.id] = Object.assign(
            {},
            task.get()
          );
        } else {
          updatedTasks["Daily"]["Quest"]["complete"][task.id] = Object.assign(
            {},
            task.get()
          );
        }
      }
      // updatedTasks[task.id] = Object.assign({}, task.get());
    });

    updatedList.Tasks = updatedTasks;
    return updatedList;
  } else {
    updatedList.Tasks = updatedTasks;
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

    // Checks to make sure that only one list exists for each character
    const foundOne = await List.findOne({
      where: {
        userId,
        character,
      },
    });

    if (foundOne) {
      return res.status(400).json({
        message:
          "This character already exists in your lists. Please choose a different character",
      });
    }

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
            return error;
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
        character: character.toLowerCase(),
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
          Weekly: {
            Boss: { incomplete: {}, complete: {} },
            Quest: { incomplete: {}, complete: {} },
          },
          Daily: {
            Boss: { incomplete: {}, complete: {} },
            Quest: { incomplete: {}, complete: {} },
          },
        };
        list.Tasks = updatedTasks;
        return res.json(list);
      }
    } catch (error) {
      return res.status(500).json({
        message:
          "This character does not exist. Please input a character that already exists in MapleStory.",
      });
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

router.get(
  "/:listId/:userId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const listId = parseInt(req.params.listId);
    const userId = parseInt(req.params.userId);
    const list = await List.findOne({
      where: { id: listId, userId },
      include: [{ model: Task }],
    });
    const updatedList = await sortingLists([list]);
    return res.json(updatedList);
  })
);

router.put(
  "/:listId/update",
  requireAuth,
  asyncHandler(async (req, res) => {
    const listId = parseInt(req.params.listId);
    const { character } = req.body;

    const oldList = await List.findByPk(listId, { include: Task });
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
            return error;
          });
      });

      // Handle the axios response
      apiContent = axiosResponse.data.CharacterData.CharacterImageURL;
      characterClass = axiosResponse.data.CharacterData.Class;
      level = axiosResponse.data.CharacterData.Level;

      // Update the list Information
      oldList.apiContent = apiContent;
      oldList.characterClass = characterClass;
      oldList.level = level;
      await oldList.save();

      const updatedList = sortingTasks(oldList);

      return res.json(updatedList);
    } catch (error) {
      return res.status(500).json({
        message:
          "This character does not exist. Please input a character that has already been created.",
      });
    }
  })
);

// router.put(
//   "/:listId/edit",
//   requireAuth,
//   asyncHandler(async (req, res) => {
//     const id = req.params();
//     const pastList = await List.findByPk(id, { include: Task });
//   })
// );

router.get(
  "/:listId/:userId/update",
  requireAuth,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.listId);
    const userId = parseInt(req.params.userId);
    // const pastList = await List.findOne({
    //   where: { id, userId: userId },
    //   include: { model: Task },
    // });
    const pastList = await List.findOne({
      where: { id },
      include: { model: Task },
    });
    console.log(userId, "<<<<<< what is this >>>>>>");

    console.log(pastList, "<<<<<<<<<<<<<<<< WHAT IS THIS LIST?!?!?!");
    return res.json(pastList);
    // return res.json.message("Hello There");
  })
);

module.exports = router;
