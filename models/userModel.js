const { Schema, model } = require("mongoose");

// ? on main page getting all user
// const numEvents = await Event.estimatedDocumentCount();

const userModel = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
    },
    eventsCount: {
      type: Number,
      default: 0,
    },

    // token: {
    //   type: String,
    //   default: null,
    // },
    // avatarURL: {
    //   type: String,
    //   required: true,
    // },
    // verify: {
    //   type: Boolean,
    //   default: false,
    // },
    // verificationToken: {
    //   type: String,
    //   required: [true, "Verify token is required"],
    // },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userModel);

module.exports = { User };
