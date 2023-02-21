const {
  getEvents,
  addEvent,
  removeEvent,
} = require("../servises/eventsServices");

const { noDataByIdError } = require("../helpers/errorHandlers");
const { successAddData } = require("../helpers/successResult");

const ctrlGetEventsByUserId = async (req, res, next) => {
  const { userId } = req.params;
  const { page = 1, limit = 5 } = req.query;

  try {
    const result = await getEvents(userId, page, limit);

    if (!result.length) {
      return res.status(404).json({
        message: "no events found",
        code: 404,
      });
    }

    if (result) {
      return res.json({
        message: "user",
        code: 200,
        data: result,
      });
    }

    noDataByIdError(res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const ctrlAddEvent = async (req, res, next) => {
  const { userId } = req.params;
  const { title, description, startDate, endDate } = req.body;

  try {
    const newEvent = {
      title,
      description,
      startDate,
      endDate,
    };

    await addEvent(newEvent, userId);
    successAddData(res, 201, "event created");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const ctrlRemoveEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { userId } = req.params;
    const result = await removeEvent(userId, eventId);

    if (result) {
      return res.json({
        message: `event by id: '${eventId}' deleted`,
        code: 200,
        data: result,
      });
    }

    noDataByIdError(res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  ctrlGetEventsByUserId,
  ctrlAddEvent,
  ctrlRemoveEvent,
};
