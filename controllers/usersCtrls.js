const {
  getAllUsers,
  getUserById,
  addUser,
  removeUser,
} = require("../servises/usersServices");

const { noDataByIdError } = require("../helpers/errorHandlers");
const { successResult, successAddData } = require("../helpers/successResult");

const ctrlGetAllUsers = async (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;

  try {
    console.log(page, limit);
    const result = await getAllUsers(page, limit);

    if (!result.length) {
      return res.status(404).json({
        message: "no data found",
        code: 404,
      });
    }

    successResult(res, 200, "list of users", result);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const ctrlGetUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const result = await getUserById(userId);

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

const ctrlAddUser = async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber } = req.body;

  try {
    const newUser = {
      firstName,
      lastName,
      email,
      phoneNumber,
    };

    await addUser(newUser);
    successAddData(res, 201, "user created", newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const ctrlRemoveUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await removeUser(userId);

    if (result) {
      return res.json({
        message: `user by id: '${userId}' deleted`,
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
  ctrlGetAllUsers,
  ctrlGetUserById,
  ctrlAddUser,
  ctrlRemoveUser,
};
