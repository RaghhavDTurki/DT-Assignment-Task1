const express = require("express");
// const app = require("../app");
const eventController = require('./events/events');

const router = express.Router();


router.get("/events", eventController.getEvent);
router.post("/events", eventController.createEvent);
router.put("/events/:id", eventController.updateEvent);
router.delete("/events/:id", eventController.deleteEvent);

module.exports = router;