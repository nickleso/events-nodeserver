const { Event } = require("../models/eventModel");
const { User } = require("../models/userModel");

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

  const eventsTotal = await Event.estimatedDocumentCount({ owner: userId });
  await User.findByIdAndUpdate({ _id: userId }, { eventsCount: eventsTotal });

  return event;
};

const removeEvent = async (userId, eventId) => {
  const event = await Event.findByIdAndRemove({ _id: eventId });

  const eventsTotal = await Event.estimatedDocumentCount({ owner: userId });
  await User.findByIdAndUpdate({ _id: userId }, { eventsCount: eventsTotal });

  return event;
};

module.exports = {
  getEvents,
  addEvent,
  removeEvent,
};
