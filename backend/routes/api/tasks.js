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
// router.get(
//   "/:userId",
//   requireAuth,
//   asyncHandler(async (req, res) => {
//     const userId = parseInt(req.params.userId);

//     const lists = await List.findAll({ where: { userId: userId } });

//     // const tasks = await Task.findAll({where: {listId}})

//     // trying to send the tasks and lists all at once

//     // lists.map(async (list)=>{
//     //   const tasks = await Task.findAll({where: {listId: list.id}})
//     //   list.tasks = tasks;
//     // })
//     // console.log(lists, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")

//     return res.json({ lists });
//   })
// );

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { userId, listId, objective } = req.body;

   const task = Task.create({
      userId,
      listId,
      objective,
    });
    return res.json({ task });
  })
);

router.delete(
  "/:taskId",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.listId);
    const task = await Task.findByPk(id);
    await task.destroy();

    return res.json(task);
  })
);

module.exports = router;
