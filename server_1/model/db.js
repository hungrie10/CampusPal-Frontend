const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  console.log("DB connected");
});

const userSchema = new mongoose.Schema({
  user_name: String,
  email: { type: String, unique: true },
  password: String,
});

const docs_schema = new mongoose.Schema({
  asker_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  document: String,

  questions_from_documents: [String],

  answers_to_questions: [String],
});

const User = mongoose.model("user_profiles", userSchema);
const Docs = mongoose.model("documents", docs_schema);

module.exports = { User, Docs };
