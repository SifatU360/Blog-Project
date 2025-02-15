# 📝 Blog Project Backend

## 🌎 Overview
The goal of this project is to develop a 🔙 backend for a 🖊️ blogging 📦 platform where 👥 users can ✍️ write, ✏️ update, and ❌ delete their 📰 blogs. The system has 2️⃣ roles: 👑 Admin and 👤 User. The Admin has special 🔑 permissions to 🛠️ manage users and their blogs, while users can perform CRUD ✨ operations on their own blogs. The backend includes 🔐 secure authentication, 🏷️ role-based access control, and a 🌍 public API for 📜 viewing blogs with 🔍 search, 📊 sort, and 🔎 filter functionalities.

---

## 💻 Technologies Used
- **🟦 TypeScript**
- **🟢 Node.js**
- **🚀 Express.js**
- **🍃 MongoDB with Mongoose**

---

## ⭐ Features & Requirements 🚀🎯📌

### 👥 User Roles

#### 👑 Admin:
- 🏗️ Created manually in the 🗄️ database with predefined credentials.
- ❌ Can delete any 📰 blog.
- 🚫 Can block any 👤 user by updating a property `isBlocked`.
- ✏️ Cannot update any blog.

#### 👤 User:
- ✅ Can 📝 register and 🔑 log in.
- 🆕 Can create 📰 blogs (only when logged in).
- ✏️ Can update and ❌ delete their own blogs.
- ❌ Cannot perform admin actions.

---

### 🔐 Authentication & Authorization 🔏🔑🛡️
- **🆔 Authentication**: Users must 🔑 log in to perform ✍️ write, ✏️ update, and ❌ delete operations.
- **🔑 Authorization**: Admin and User roles are differentiated and 🔒 secured.

---


## Models

### User Model
- `name`: `string` – The full name of the user.
- `email`: `string` – The email address of the user, used for authentication and communication.
- `password`: `string` – The password for the user, securely stored.
- `role`: `"admin" | "user"` – The role of the user, determining their access level. Default is `"user"`.
- `isBlocked`: `boolean` – A flag indicating whether the user is blocked or not. Default is `false`.
- `createdAt`: `Date` – The timestamp when the user was created.
- `updatedAt`: `Date` – The timestamp of the last update to the user.

### Blog Model
- `title`: `string` – The title of the blog post.
- `content`: `string` – The main body or content of the blog post.
- `author`: `ObjectId` – A reference to the User model, indicating the author of the blog post.
- `isPublished`: `boolean` – A flag indicating whether the blog post is published. Default is `true` (published).
- `createdAt`: `Date` – The timestamp when the blog post was created.
- `updatedAt`: `Date` – The timestamp of the last update to the blog post.

---

## 🔗 API Endpoints

### 🔐 Authentication 🔏🔑

#### 1️⃣ 🆕 Register User
- **📩 POST** `/api/auth/register`
- **Description**: Registers a new user with the platform.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response**:
    - Success (201):
  ```json
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
  ```
   - Failure (400):
  ```json
  {
  "success": false,
  "message": "Validation error",
  "statusCode": 400,
  "error": { "details" },
  "stack": "error stack"
  }

  ```
#### 2️⃣ 🔑 Login User
- **📩 POST** `/api/auth/login`
- **Description**: Authenticates a user with their email and password and generates a JWT token.
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response**:
    - Success (200):
  ```json
  {
  "success": true,
  "message": "Login successful",
  "statusCode": 200,
  "data": {
    "token": "string"
  }
  }
  ```
   - Failure (401):
  ```json
  {
  "success": false,
  "message": "Invalid credentials",
  "statusCode": 401,
  "error": { "details" },
  "stack": "error stack"
  }

  ```




### 📝 Blog Management 🖋️📖🗂️

#### 1️⃣ 🆕 Create Blog
- **📩 POST** `/api/blogs`
- **Description**: Allows a logged-in user to create a blog by providing a title and content.
- **Request Body**:
  ```json
  {
     "title": "Cybersecurity Trends in 2025",
     "content": "As technology evolves, so do cyber threats. Here are some upcoming trends in 
                 cybersecurity...",
  }
  ```
- **Response**:
    - Success (201):
  ```json
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
  ```
#### 2️⃣ ✏️ Update Blog
- **📩 PATCH** `/api/blogs/:id`
- **Description**: Allows a logged-in user to update their own blog by its ID.
- **Request Header**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "title": "Updated Blog Title",
    "content": "Updated content."
  }
  ```
- **Response**:
    - Success (200):
  ```json
  {
  "success": true,
  "message": "Blog updated successfully",
  "statusCode": 200,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
  }
  ```
#### 3️⃣ ❌ Delete Blog
- **📩 DELETE** `/api/blogs/:id`
- **Description**: Allows a logged-in user to delete their own blog by its ID.
- **Request Header**: `Authorization: Bearer <token>`
- **Response**:
    - Success (200):
  ```json
  {
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
  }
  ```

  #### 4️⃣📜 Get All Blogs (Public)
- **📩 GET** `/api/blogs/:id`
- **Description**: Allows a logged-in user to delete their own blog by its ID.



  🔍 Query Parameters:
- `search`: 🔎 Search blogs by 📝 title or 📜 content.
- `sortBy`: 📊 Sort blogs by fields like createdAt.
- `sortOrder`: Accepts asc ⬆️ or desc ⬇️.
- `filter`: 🎯 Filter blogs by 👤 author ID.
- **Response**:
    - Success (200):
  ```json
  {
  "success": true,
  "message": "Blogs fetched successfully",
  "statusCode": 200,
  "data": [
    {
      "_id": "string",
      "title": "string",
      "content": "string",
      "author": { "details" }
    }
  ]
  }
  ```

## 👑 Admin Actions
  #### 1️⃣ 🚫 Block User
- **📩 PATCH** `/api/admin/users/:userId/block`
- **Description**: Allows an admin to block a user by updating the `isBlocked` property to `true`.
- **Request Header**: `Authorization: Bearer <admin_token>`
- **Response**:
    - Success (200):
  ```json
  {
  "success": true,
  "message": "User blocked successfully",
  "statusCode": 200
  }
  ```

  #### 2️⃣ ❌ Delete Blog
- **📩 DELETE** `/api/admin/blogs/:id`
- **Description**: Allows an admin to delete any blog by its ID.
- **Request Header**: `Authorization: Bearer <admin_token>`
- **Response**:
    - Success (200):
  ```json
  {
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
  }
  ```

  ---

## ⚠️ Error Handling
  ### 🛑 Common Error Response Format
  ```json
  {
  "success": false,
  "message": "Error message describing the issue",
  "statusCode": 400, // or other relevant HTTP status code
  "error": {"details": "Additional error details, if applicable"},
  "stack": "error stack trace, if available"
  }
  ```

  ### 🚨 Types of Errors Handled
 - ⚡ Zod Validation Error (`ZOD_ERROR`): Invalid data inputs.
 - ❓ Not Found Error (`NOT_FOUND_ERROR`): Missing resources.
 - 🚫 Validation Error (`VALIDATION_ERROR`): Incorrect/missing fields.
 - 🔑 Authentication Error (`AUTH_ERROR`): Invalid login/token.
 - 🔒 Authorization Error (`AUTHORIZATION_ERROR`): Insufficient permissions.
 - 🔥 Internal Server Error (`INTERNAL_SERVER_ERROR`): Unexpected server issues.


---

## ⚙️ Installation & Setup
  ### 1️⃣ Clone the repository:
  ```python
    git clone <repo-url>
  ```
  ### 2️⃣ Install dependencies:
  ```python
    npm install
  ```
  ### 3️⃣ Set up 📝 environment variables in .env file.
 
  ### 4️⃣ Start the 🚀 server:
  ```python
    npm run start
  ```
