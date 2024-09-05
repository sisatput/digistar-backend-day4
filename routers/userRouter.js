const express = require("express"); // Import Express framework
const { getAllUsersHandler, getUserByIdHandler, createUserHandler, updateUserHandler, deleteUserHandler } = require("../handlers/userHandler"); // Import user handlers

const router = express.Router(); // Create a new router

// Define routes and map them to handlers
router.get("/", getAllUsersHandler); // GET /users - Get all users
router.get("/:id", getUserByIdHandler); // GET /users/:id - Get user by ID
router.post("/", createUserHandler); // POST /users - Create a new user
router.put("/:id", updateUserHandler); // PUT /users/:id - Update user by ID
router.delete("/:id", deleteUserHandler); // DELETE /users/:id - Delete user by ID

module.exports = router; // Export the router
