const mongoose = require("mongoose"); // Import Mongoose to define schema and models
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const { v4: uuidv4 } = require("uuid"); // Import UUID

// Define Mongoose schema for User model
const userSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 }, // Use UUIDv4 as the default for _id
  username: { type: String, required: true, unique: true }, // Unique username
  password: { type: String, required: true }, // Hashed password
  email: { type: String, required: true }, // User's email
  role: { type: String, default: "user" } // Role with default value 'user'
});

// Middleware: Hash the password before saving a new or updated user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if password hasn't changed
  this.password = await bcrypt.hash(this.password, 10); // Hash the password with bcrypt
  next(); // Proceed with saving
});

// Method to compare input password with the hashed password
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password); // Compare input with hashed password
};

module.exports = mongoose.model("User", userSchema); // Export User model based on the schema
