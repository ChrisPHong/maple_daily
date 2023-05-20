const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth");

const { Boss } = require("../../db/models");

const router = express.Router();

const validateSignup = [];

const sortingBossTasks = (tasks) => {
  let updatedTasks = {
    Weekly: { Boss: {}, Quest: {} },
    Daily: { Boss: {}, Quest: {} },
  };

  if (tasks.length > 0) {
    tasks.forEach((task) => {
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
  }
  return updatedTasks;
};
// Get a list
router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const tasks = await Boss.findAll();

    const sortedTasks = sortingBossTasks(tasks);
    let newObj = Object.assign({});
    newObj.weekly = [];
    newObj.daily = [];
    tasks.forEach((task) => {
      if (task.resetTime == "Weekly") {
        newObj.weekly.push(task);
      } else {
        newObj.daily.push(task);
      }
    });

    return res.json(sortedTasks);
  })
);

module.exports = router;
