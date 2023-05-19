const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const listRouter = require("./lists.js");
const taskRouter = require("./tasks.js");
const bossRouter = require("./bosses.js");

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/lists", listRouter);

router.use("/tasks", taskRouter);

router.use("/bosses", bossRouter);

module.exports = router;
