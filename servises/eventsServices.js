const { Event } = require("../models/eventModel");

const getEvents = async (userId, page, limit) => {
  const skip = (page - 1) * limit;
  const events = await Event.find({ owner: userId }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id title description startDate endDate");
  return events;
};

const addEvent = async ({ title, description, startDate, endDate }, userId) => {
  const event = new Event({
    title,
    description,
    startDate,
    endDate,
    owner: userId,
  });

  await event.save();

  // findUserByIdAndUpdate(eventCount + 1 ) ?

  return event;
};

const removeEvent = async (eventId) => {
  const event = await Event.findByIdAndRemove({ _id: eventId });
  return event;
};

module.exports = {
  getEvents,
  addEvent,
  removeEvent,
};
