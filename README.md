# Node.js Express API

## Description

This project is for technical test. This is a **Node.js** API built using **Express** and **MongoDB**. It provides RESTful services for searching and managing users (CRUD operations). The search functionality allows for case-insensitive querying by name or email. Unit tests are implemented using **Jest**.

## Features

- User search by name or email (case-insensitive)
- Full CRUD operations (Create, Read, Update, Delete)
- Proper error handling and logging
- Unit tests with **Jest**

## Technologies

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose** (MongoDB ODM)
- **Jest** (for unit testing)

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud-based solution)
- [npm](https://www.npmjs.com/) (usually installed with Node.js)

## Installation

Follow these steps to install and run the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-nodejs-express-api.git
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```

## Running the Application

1. **Production Mode**:
   ```bash
   npm start
   ```
2. **Running Tests**:
   ```bash
   npm test
   ```

## API Endpoints

1. GET /api/users Fetch all users
2. POST /api/users Create a new user
3. PUT /api/users/:id Update a user's information
4. DELETE /api/users/:id Delete a user
