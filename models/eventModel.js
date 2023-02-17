const { Schema, model } = require("mongoose");

// title, description, startDate, endDate, owner;

// start end ? numbers ? dates

const eventModel = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set event heading"],
    },
    description: {
      type: String,
      required: [true, "Set event description"],
    },
    startDate: {
      type: String,
      required: [true, "Set start date"],
    },
    endDate: {
      type: String,
      required: [true, "Set end date"],
    },
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: "user",   ?customer
    //   required: true,
    // },
  },
  { versionKey: false, timestamps: true }
);

const Event = model("contact", eventModel);

module.exports = { Event };
