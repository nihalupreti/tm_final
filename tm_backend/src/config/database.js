const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to the database succesfully.");
  })
  .catch((err) => {
    console.log(
      "some error occured while trying to connect to the database." + err
    );
  });

const userSchema = new mongoose.Schema({
  fullName: String,
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
});

const todoScheme = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: { type: Boolean, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the 'User' model
      required: true, // Ensure a user is associated with the todo
    },
  },
  { timestamps: true }
);

const user = mongoose.model("User", userSchema);
const todos = mongoose.model("todos", todoScheme);

module.exports = { user, todos };
