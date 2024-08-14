const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Path to the local database file
const dbFilePath = path.join(__dirname, "./database/formBuilderDB.json");

// Read the current database file
const readDatabase = () => {
  try {
    const data = fs.readFileSync(dbFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return []; // Return an empty array if the file doesn't exist or is empty
  }
};

// Write data to the database file
const writeDatabase = (data) => {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), "utf8");
};

// API route to handle form submission
app.post("/form-builder/multiselect", (req, res) => {
  const formData = req.body;

  // Read the current database file
  const database = readDatabase();

  // Add the new form data to the database
  database.push(formData);

  // Write the updated database back to the file
  writeDatabase(database);

  res.status(201).json({ message: "Form data saved successfully!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
