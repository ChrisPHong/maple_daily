const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");

const { List, User, Task } = require("../../db/models");
const axios = require("axios");

const router = express.Router();

const validateSignup = [];

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { userId, listId, resetTime, category, objective } = req.body;
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
    const { userId, listId, objective, resetTime, category, completed, id } =
      req.body;
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

router.put(
  "/:userId/daily",
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId);

    const tasks = await Task.findAll({ where: { userId, resetTime: "Daily" } });
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];
      task.completed = false;
      await task.save();
    }

    return res.json(tasks);
  })
);
router.put(
  "/:userId/weekly",
  asyncHandler(async (req, res) => {
    const { type } = req.body;

    const userId = parseInt(req.params.userId);
    let tasks;
    if (type === "Bosses") {
      tasks = await Task.findAll({
        where: { userId, resetTime: "Weekly", category: "Boss" },
      });
      for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        task.completed = false;
        await task.save();
      }
    } else {
      tasks = await Task.findAll({
        where: { userId, resetTime: "Weekly", category: "Quest" },
      });
      for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        task.completed = false;
        await task.save();
      }
    }

    return res.json(tasks);
  })
);
module.exports = router;
