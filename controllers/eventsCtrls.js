const { Event } = require("../models/eventModel");

const ctrlGetEvents = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite = null } = req.query;

  try {
    const result = await getContacts(_id, page, limit);

    if (favorite === "false") {
      const filtredResult = result.filter((elem) => elem.favorite === false);

      successResult(res, 200, "list of contacts", filtredResult);

      return;
    }

    if (favorite === "true") {
      const filtredResult = result.filter((elem) => elem.favorite === true);

      successResult(res, 200, "list of contacts", filtredResult);
      return;
    }

    if (!result.length) {
      return res.status(404).json({
        message: "no data found",
        code: 404,
      });
    }

    successResult(res, 200, "list of contacts", result);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const getContacts = async (userId, page, limit, favorite) => {
  const skip = (page - 1) * limit;
  const contacts = await Event.find({ owner: userId }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  return contacts;
};

module.exports = ctrlGetEvents;
