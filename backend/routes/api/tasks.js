const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");

const { List, User, Task } = require("../../db/models");
const axios = require("axios");

const router = express.Router();

const validateSignup = [];
const dailyQuests = async (userId, listId) => {
  const tasks = await Task.findAll({ where: { userId, resetTime: "Daily", category: "Quest", listId } });
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    task.completed = false;
    await task.save();
  }

  return tasks
}
const dailyBosses = async (userId, listId) => {
  const tasks = await Task.findAll({ where: { userId, listId, resetTime: "Daily", category: "Boss" } });
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    task.completed = false;
    await task.save();
  }

  return tasks
}
const completeDailyQuests = async (userId, listId) => {
  const tasks = await Task.findAll({ where: { userId, listId, resetTime: "Daily", category: "Quest" } });
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    task.completed = true;
    await task.save();
  }

  return tasks
}
const completeDailyBosses = async (userId, listId) => {
  const tasks = await Task.findAll({ where: { userId, listId, resetTime: "Daily", category: "Boss" } });
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    task.completed = true;
    await task.save();
  }

  return tasks
}
const weeklyQuests = async (userId, listId) => {
  const tasks = await Task.findAll({ where: { userId, listId, resetTime: "Weekly", category: "Quest" } });
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    task.completed = false;
    await task.save();
  }

  return tasks
}
const weeklyBosses = async (userId, listId) => {
  const tasks = await Task.findAll({ where: { userId, listId, resetTime: "Weekly", category: "Boss" } });
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    task.completed = false;
    await task.save();
  }

  return tasks
}

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
    const { type, listId, complete } = req.body

    if (type === "Quests" && complete === false) {
      const tasks = await dailyQuests(userId, listId);
      return res.json(tasks);
    } else if (type === "Boss" && complete === false) {
      const tasks = await dailyBosses(userId, listId);

      return res.json(tasks);

    } else if (type === "Quests" && complete === true) {
      const tasks = await completeDailyQuests(userId, listId);
      return res.json(tasks);
    } else if (type === "Boss" && complete === true) {

      const tasks = await completeDailyBosses(userId, listId);
      return res.json(tasks);
    }
  })
);
router.put(
  "/:userId/weekly",
  asyncHandler(async (req, res) => {
    const { type, listId } = req.body;


    const userId = parseInt(req.params.userId);
    if (type === "Quests") {
      const tasks = await weeklyQuests(userId, listId)
      return res.json(tasks);
    } else if (type === "Boss") {

      const tasks = await weeklyBosses(userId, listId)

      return res.json(tasks);
    }

  })
);
module.exports = router;
