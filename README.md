📝 Blogging Platform Backend

🌎 Overview 🌟🌍✨

The goal of this project is to develop a 🔙 backend for a 🖊️ blogging 📦 platform where 👥 users can ✍️ write, ✏️ update, and ❌ delete their 📰 blogs. The system has 2️⃣ roles: 👑 Admin and 👤 User. The Admin has special 🔑 permissions to 🛠️ manage users and their blogs, while users can perform CRUD ✨ operations on their own blogs. The backend includes 🔐 secure authentication, 🏷️ role-based access control, and a 🌍 public API for 📜 viewing blogs with 🔍 search, 📊 sort, and 🔎 filter functionalities.

💻 Technologies Used 💾⚙️🔧

🟦 TypeScript

🟢 Node.js

🚀 Express.js

🍃 MongoDB with Mongoose

⭐ Features & Requirements 🚀🎯📌

👥 User Roles 🏆🛡️

👑 Admin:

🏗️ Created manually in the 🗄️ database with predefined credentials.

❌ Can delete any 📰 blog.

🚫 Can block any 👤 user by updating a property isBlocked.

✏️ Cannot update any blog.

👤 User:

✅ Can 📝 register and 🔑 log in.

🆕 Can create 📰 blogs (only when logged in).

✏️ Can update and ❌ delete their own blogs.

❌ Cannot perform admin actions.

🔐 Authentication & Authorization 🔏🔑🛡️

🆔 Authentication: Users must 🔑 log in to perform ✍️ write, ✏️ update, and ❌ delete operations.

🔑 Authorization: Admin and User roles are differentiated and 🔒 secured.

🔗 API Endpoints 🌐📡🛠️

🔐 Authentication 🔏🔑

1️⃣ 🆕 Register User

📩 POST /api/auth/register

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}

Response:

{
  "success": true,
  "message": "User registered successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "name": "string",
    "email": "string"
  }
}

2️⃣ 🔑 Login User

📩 POST /api/auth/login

{
  "email": "john@example.com",
  "password": "securepassword"
}

Response:

{
  "success": true,
  "message": "Login successful",
  "statusCode": 200,
  "data": {
    "token": "string"
  }
}

📝 Blog Management 🖋️📖🗂️

1️⃣ 🆕 Create Blog

📩 POST /api/blogs

{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}

Response:

{
  "success": true,
  "message": "Blog created successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}

👑 Admin Actions 🎩🔧🛠️

1️⃣ 🚫 Block User

📩 PATCH /api/admin/users/:userId/block
Response:

{
  "success": true,
  "message": "User blocked successfully",
  "statusCode": 200
}

2️⃣ ❌ Delete Blog

📩 DELETE /api/admin/blogs/:id
Response:

{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}

⚠️ Error Handling 🚨⚡❗

🛑 Common Error Response Format

{
  "success": false,
  "message": "Error message describing the issue",
  "statusCode": 400,
  "error": { "details": "Additional error details" },
  "stack": "error stack trace"
}

⚙️ Installation & Setup 🏗️💻🔧

1️⃣ Clone the repository:

git clone <repo-url>


2️⃣ Install dependencies:

npm install

3️⃣ Set up 📝 environment variables in .env file.
4️⃣ Start the 🚀 server:

npm run start
