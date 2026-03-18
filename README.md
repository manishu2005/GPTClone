# GPT Chat Clone 🚀

A full-stack **ChatGPT-style AI chat application** built with **React, Node.js, Express, MongoDB, and Groq AI API**.
This project allows users to chat with an AI assistant, store chat history, and render formatted responses with Markdown and syntax-highlighted code blocks.

---

# ✨ Features

* 🤖 AI chat powered by **Groq AI API**
* 💬 Real-time conversation interface
* 🧠 Chat history stored in **MongoDB**
* 📝 Markdown rendering for AI responses
* 💻 Syntax highlighted code blocks
* 📋 Copy code button
* 🗑 Delete chat threads
* 📱 Responsive UI
* 🎨 Pure CSS styling (no CSS framework)

---

# 🛠 Tech Stack

## Frontend

* React
* Vite
* React Markdown
* Rehype Highlight
* Pure CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* REST API

## AI Integration

* Groq AI API

---

# 📂 Project Structure

```id="87211"
GPT/
│
├── Backend/
│   ├── models/
│   │   ├── messageSchema.js
│   │   └── threadSchema.js
│   │
│   ├── routes/
│   │   └── chat.js
│   │
│   ├── utils/
│   │   └── gptResponse.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── Sidebar.jsx
│   │   ├── Chat.jsx
│   │   ├── Message.jsx
│   │   ├── sidebar.css
│   │   └── Chat.css
│   │
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone the repository

```bash id="21873"
git clone https://github.com/yourusername/gpt-chat-clone.git
cd gpt-chat-clone
```

---

# 📦 Install Dependencies

## Backend

```bash id="66211"
cd Backend
npm install
```

## Frontend

```bash id="88321"
cd Frontend
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file inside **Backend**

```id="55721"
PORT=5000
MONGO_URI=your_mongodb_connection
GROQ_API_KEY=your_groq_api_key
```

---

# ▶️ Run the Application

### Start Backend

```bash id="22981"
cd Backend
npm run dev
```

### Start Frontend

```bash id="99421"
cd Frontend
npm run dev
```

The app will run at:

```id="33211"
http://localhost:5173
```

---

# 🔗 API Endpoints

### Create Chat

```id="88122"
POST /api/chat
```

### Get Chat History

```id="66122"
GET /api/chat
```

### Delete Chat Thread

```id="99122"
DELETE /api/chat/:id
```

---

# 🧠 How It Works

1. User sends a message from the **React UI**.
2. Request is sent to the **Express backend**.
3. Backend calls **Groq AI API**.
4. AI response is returned.
5. Messages are stored in **MongoDB**.
6. Chat history is displayed in the UI.

---

# 📌 Future Improvements

* Authentication system
* Streaming AI responses
* Multi-chat threads
* Sidebar conversation search
* Message editing
* Chat export

---

# 👨‍💻 Author

**Manish Kumar**

BCA Student | Full Stack Developer

---

# ⭐ Support

If you like this project, please **star the repository** ⭐
