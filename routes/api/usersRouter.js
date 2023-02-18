const express = require("express");
const router = express.Router();

const {
  ctrlGetAllUsers,
  ctrlGetUserById,
  ctrlAddUser,
  ctrlRemoveUser,
} = require("../../controllers/usersCtrls");

const {
  ctrlGetEventsByUserId,
  ctrlAddEvent,
  ctrlRemoveEvent,
} = require("../../controllers/eventsCtrls");

const {
  addUsersValidation,
} = require("../../middlewares/usersValidationMdlwr");

// users routes

router.get("/", ctrlGetAllUsers);

router.get("/:userId", ctrlGetUserById);

router.post("/", addUsersValidation, ctrlAddUser);

router.delete("/:userId", ctrlRemoveUser);

// events routes

router.get("/:userId/events", ctrlGetEventsByUserId);

router.post("/:userId/events", ctrlAddEvent);

router.delete("/:userId/events/:eventId", ctrlRemoveEvent);

module.exports = router;
