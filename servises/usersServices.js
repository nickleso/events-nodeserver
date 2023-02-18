const { User } = require("../models/userModel");

const getAllUsers = async () => {
  const users = await User.find({});
  return users;
};

const getUserById = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

const addUser = async ({ firstName, lastName, email, phoneNumber }) => {
  const user = new User({
    firstName,
    lastName,
    email,
    phoneNumber,
  });

  await user.save();
  return user;
};

const removeUser = async (userId) => {
  const user = await User.findByIdAndRemove({ _id: userId });
  return user;
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  removeUser,
};
