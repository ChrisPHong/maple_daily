const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");

const { List, Task, sequelize } = require("../../db/models");
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
      order: sequelize.col("orderBy"),
    });

    const updatedLists = await sortingLists(lists);

    return res.json(updatedLists);
  })
);

router.post(
  "/checkingCharacter",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { character, userId } = req.body;
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
      return res.json(axiosResponse.data.CharacterData);
    } catch (error) {
      return res.status(500).json({
        message:
          "This character does not exist. Please input a character that already exists in MapleStory.",
      });
    }
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
  "/changeOrder/:userId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { lists } = req.body;

    for (let i = 0; i < lists.length; i++) {
      const list = lists[i];
      const oldList = await List.findByPk(list.id);
      oldList.orderBy = i + 1;
      oldList.save();
    }
    return res.json(lists);
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

/*
- any task that does not contain a listId is a new task that must be created
- if it does contain a listId then we must query for the same task in the database based on the task's id
  - if the database queried task's objective matches the sent in data's objective, then we do not do anything
  - if they don't match, we must update the database task with the new input and save it
  - we will create two loops,
    - first loop on the incoming payload will create the new tasks that do not have a listId
    - second loop, on the database tasks, if is not present within the payload, then we must delete that task
      - maybe, during the first loop, we can create a set with the task id's and check to see if the task id is present, if it is not, then we delete that task from the database

*/
router.put(
  "/:listId/edit",
  requireAuth,
  asyncHandler(async (req, res) => {
    const id = req.params.listId;
    const { name, userId, payload, listId } = req.body;
    const list = await List.findByPk(id, { include: Task });
    list.name = name;

    const tasks = list.Tasks;
    const payloadTasks = Object.values(payload);

    const set = new Set();
    for (let obj of payloadTasks) {
      if (!obj.listId) {
        const { resetTime, category, bossNames } = obj;

        Task.create({
          userId,
          listId,
          resetTime,
          category,
          objective: bossNames,
        });
      } else {
        set.add(obj.id);
      }
    }

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i].dataValues;
      if (!set.has(task.id)) {
        const delTask = await Task.findByPk(task.id);
        delTask.destroy();
      }
    }
    await list.save();
    return res.json(list);
  })
);

router.get(
  "/editingList/:listId/maple",
  requireAuth,
  asyncHandler(async (req, res) => {
    const listId = parseInt(req.params.listId);

    const list = await List.findByPk(listId, {
      include: { model: Task },
    });
    return res.json(list);
  })
);

module.exports = router;
