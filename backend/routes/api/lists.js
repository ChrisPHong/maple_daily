const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");

const { List, Task } = require("../../db/models");
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

      if (list.Tasks.length > 0) {
        list.Tasks.forEach((task) => {
          updatedTasks[task.id] = Object.assign({}, task.get());
        });

        updatedList.Tasks = updatedTasks;
        return updatedList;
      } else {
        return updatedList;
      }
    });

    return res.json(updatedLists);
  })
);

// router.post(
//   "/",
//   validateSignup,
//   asyncHandler(async (req, res) => {
//     const { userId, name, character } = req.body;
//     // https://api.maplestory.gg/v2/public/character/gms/charactername


//     let apiContent;
//     let list;
//     let characterClass;
//     let server;
//     let level;
//     await axios
//       .get(`https://api.maplestory.gg/v2/public/character/gms/${character}`)
//       .then((response) => {
//         apiContent = response.data.CharacterData.CharacterImageURL;
//         characterClass = response.data.CharacterData.Class;
//         server = response.data.CharacterData.Server;
//         level = response.data.CharacterData.Level;

//         list = List.create({
//           userId,
//           name,
//           character,
//           apiContent,
//           characterClass,
//           server,
//           level,
//         });

//         // const listId = list.id;
//         // const bosses = Object.keys(tasks);
//         // const result = [];

//         // const arr = bosses.forEach(async (boss) => {
//         //   const task = await Task.create({
//         //     userId,
//         //     listId,
//         //     objective: boss,
//         //   });
//         //   result.push(task);
//         // });
//         // console.log(result, "<<<<<< result");
//         // console.log(list, "<<<<<<<<<<<< tasks >>>>>>>>>")
//         return res.json(list);
//       })
//       .catch((error) => {
//         console.error(error);
//       });

//     // return res.json({
//     //   list,
//     // });
//   })
// );
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
      const bosses = Object.keys(payload)
    
      const taskCreationPromises = bosses.map(async (boss) => {

        return Task.create({
          userId,
          listId,
          objective: boss,
        });
      });

      // Wait for the list creation and all task creation promises to resolve
      await Promise.all([list, ...taskCreationPromises]);

      // Fetch the list with associated tasks after creation
      const updatedList = await List.findOne({
        where: { id: list.id },
        include: { model: Task },
      });

      return res.json(updatedList);
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
