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
//   "/:listId",
//   requireAuth,
//   asyncHandler(async (req, res) => {
//     const listId = parseInt(req.params.listId);
//     const tasks = await Task.findAll({ where: { listId }, include: List });
//     return res.json({ tasks });
//   })
// );

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { userId, listId, resetTime,category, objective } = req.body;
    const task = await Task.create({
      userId,
      listId,
      resetTime,
      category,
      objective,
    });

    return res.json(task);
  })
);

router.delete(
  "/:taskId",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.taskId);
    const task = await Task.findByPk(id);
    await task.destroy();

    return res.json(task);
  })
);

router.put(
  "/:taskId",
  asyncHandler(async (req, res) => {
    const { userId, listId, objective, resetTime,category, completed, id } = req.body;
    const task = await Task.findByPk(id);
    task.listId = listId;
    task.resetTime = resetTime;
    task.category = category;
    task.objective = objective;
    task.completed = completed;
    await task.save();
    return res.json(task);
  })
);
module.exports = router;
