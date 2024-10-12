const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);

// Export the app without starting the server
module.exports = app;

// Start the server in a different script or within this file conditionally
const PORT = process.env.PORT || 3000;

if (require.main === module) {
  // Check if this file is the main module
  mongoose
    .connect("mongodb://localhost/users_db")
    .then(() =>
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    )
    .catch((err) => console.error("Database connection failed", err));
}
