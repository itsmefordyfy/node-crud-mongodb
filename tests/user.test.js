// tests/user.test.js

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app"); // Import the app
const User = require("../models/User"); // User model

// Connect to MongoDB before running tests
beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect("mongodb://localhost/users_test");
  }
});

// Clear the database and close the connection after tests
afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close(); // Close the connection after tests
});

// User ID variable to hold the created user ID
let userId;

describe("User API", () => {
  // Test creating a user
  it("should create a new user", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ name: "John Doe", email: "john@example.com", age: 30 });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("_id");
    expect(res.body.user).toHaveProperty("name", "John Doe");
    userId = res.body.user._id; // Store user ID for later tests
  });

  // Test retrieving all users
  it("should retrieve all users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0); // There should be at least one user
  });

  // Test retrieving a user by ID
  it("should retrieve a user by ID", async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", userId);
    expect(res.body).toHaveProperty("name", "John Doe");
  });

  // Test updating a user by ID
  it("should update a user by ID", async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send({ name: "John Smith", email: "johnsmith@example.com", age: 31 });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("name", "John Smith");
  });

  // Test deleting a user by ID
  it("should delete a user by ID", async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "User deleted successfully");
  });
});
