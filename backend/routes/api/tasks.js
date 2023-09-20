const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");

const { List, User, Task } = require("../../db/models");
const axios = require("axios");

const router = express.Router();

const validateSignup = [];

const resetDailyQuests = async (userId, listId) => {
  const tasks = await Task.findAll({ where: { userId, resetTime: "Daily", category: "Quest", listId } });
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    task.completed = false;
    await task.save();
  }

  return tasks
}
const resetAllDailies = async (userId) => {
  const tasks = await Task.findAll({ where: { userId, resetTime: "Daily" } });
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    task.completed = false;
    await task.save();
  }

  return tasks
}
const resetAllBossWeeklies = async (userId) => {
  const tasks = await Task.findAll({ where: { userId, resetTime: "Weekly", category: "Boss" } });
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    task.completed = false;
    await task.save();
  }

  return tasks
}
const resetAllQuestWeeklies = async (userId) => {
  const tasks = await Task.findAll({ where: { userId, resetTime: "Weekly", category: "Quest" } });
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    task.completed = false;
    await task.save();
  }

  return tasks
}

const resetDailyBosses = async (userId, listId) => {
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

const resetWeeklyQuests = async (userId, listId) => {
  const tasks = await Task.findAll({ where: { userId, listId, resetTime: "Weekly", category: "Quest" } });
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    task.completed = false;
    await task.save();
  }

  return tasks
}

const resetWeeklyBosses = async (userId, listId) => {
  const tasks = await Task.findAll({ where: { userId, listId, resetTime: "Weekly", category: "Boss" } });
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    task.completed = false;
    await task.save();
  }

  return tasks
}
const completeWeeklyQuests = async (userId, listId) => {
  const tasks = await Task.findAll({ where: { userId, listId, resetTime: "Weekly", category: "Quest" } });
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    task.completed = true;
    await task.save();
  }

  return tasks
}
const completeWeeklyBosses = async (userId, listId) => {
  const tasks = await Task.findAll({ where: { userId, listId, resetTime: "Weekly", category: "Boss" } });
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    task.completed = true;
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
    if (listId === undefined) {
      const tasks = await resetAllDailies(userId)
      return res.json(tasks);
    }
    
    if (type === "Quests" && complete === false) {
      const tasks = await resetDailyQuests(userId, listId);
      return res.json(tasks);
    } else if (type === "Boss" && complete === false) {
      const tasks = await resetDailyBosses(userId, listId);

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
    const { type, listId, complete } = req.body;

    const userId = parseInt(req.params.userId);

    if (listId === undefined && type === "Boss") {
      const tasks = await resetAllBossWeeklies(userId)
      return res.json(tasks);
    }
    if (listId === undefined && type === "Quests") {
      const tasks = await resetAllQuestWeeklies(userId)
      return res.json(tasks);
    }

    if (type === "Quests" && complete === false) {
      const tasks = await resetWeeklyQuests(userId, listId)
      return res.json(tasks);
    } else if (type === "Boss" && complete === false) {
      const tasks = await resetWeeklyBosses(userId, listId)
      return res.json(tasks);
    } else if (type === "Quests" && complete === true) {
      const tasks = await completeWeeklyQuests(userId, listId)
      return res.json(tasks);
    } else if (type === "Boss" && complete === true) {
      const tasks = await completeWeeklyBosses(userId, listId)
      return res.json(tasks);
    }

  })
);
module.exports = router;
