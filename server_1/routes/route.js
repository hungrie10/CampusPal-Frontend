const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const { signup_logic } = require("../controller/signup_logic");
const { login_logic } = require("../controller/login_logic");
const { profile_logic } = require("../controller/profile_logic");
const { generateQuestions } = require("../controller/gen_ques");
const {Docs} = require("../model/db");

const multer = require("multer");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// const upload = multer({ dest: "uploads/" });
const upload = multer({ storage });

// User Authentication Routes
router.post("/login", login_logic);
router.post("/signup", signup_logic);
router.get("/profile", authMiddleware, profile_logic);

// File Upload Routes
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      const filePath = req.file.path;
      const userId = req.user.id;

      fs.readFile(filePath, "utf8", async (err, data) => {
        if (err) {
          return res.status(500).json({
            error: "Could not read file",
          });
        }

        // Split text into chunks/paragraphs
        const contents = data.split("\n").filter((text) => text.trim() !== "");

        // Generate questions
        const store = await generateQuestions(contents);

        const fakeQuestions = [
          "What is the main idea of the content?",
          "Who is the central character discussed?",
          "What problem is being addressed?",
          "Why is this topic important?",
          "What are the key points mentioned?",
          "How does the content begin?",
          "What conclusion can be drawn from the text?",
          "What evidence supports the main argument?",
          "How does this information relate to real life?",
          "What examples are provided in the content?",
          "What lesson can be learned from this?",
          "What are the major themes discussed?",
          "How would you summarize the content?",
          "What challenges are mentioned?",
          "What solution does the content suggest?",
          "Why might this topic matter in the future?",
          "What emotions does the content convey?",
          "How does the author explain the topic?",
          "What assumptions are made in the text?",
          "What additional questions does this content raise?",
        ];

        const finalQuestions = store.questions || fakeQuestions;

         const savedDoc = await Docs.create({
          asker_id: userId,
          document: data,
          questions_from_documents: finalQuestions,
        });


        res.json({
          questions: finalQuestions,
        });
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
);

module.exports = { router };
