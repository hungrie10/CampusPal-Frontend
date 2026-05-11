const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

require("dotenv").config();

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const chatSchema = new mongoose.Schema({
  username: String,
  date: {
    type: Date,
    default: Date.now,
  },
  chatbots_name: String,
  users_message: String,
  chatbots_message: String,
});

const Chat = mongoose.model("Chat", chatSchema);

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-3.5-flash",
  systemInstruction:
    "You are a helpful assistant that provides information about movies.",
});

async function bayne(prompt) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (err) {
    console.error("AI Error:", err);
    return "Something went wrong 🤖";
  }
}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.emit("first_reply", "Hello! I'm Bayne 👋");

//   socket.on("chat_with_bayne", async ({ message }) => {
//     if (!message || message.trim() === "") return;

//     // Optional typing event
//     socket.emit("bayne_typing");

//     const reply = await bayne(message);

//     socket.emit("bayne_replies_back", reply);
//   });

socket.on("chat_with_bayne", async ({ message, username }) => {
  if (!message || message.trim() === "") return;

  socket.emit("bayne_typing");

  const reply = await bayne(message);

  // 💾 Save to MongoDB
  try {
    await Chat.create({
      username: username || "Anonymous",
      chatbots_name: "Bayne",
      users_message: message,
      chatbots_message: reply,
    });
  } catch (err) {
    console.error("DB Error:", err);
  }

  socket.emit("bayne_replies_back", reply);
});

});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});