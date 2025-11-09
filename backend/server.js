// Import dependencies
const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");

// Config
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "NewStrong!Pass123",
  database: "tailcity_db",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL Database");
  }
});

// ✅ Verify tables in database when server starts
db.query("SHOW TABLES", (err, results) => {
  if (err) {
    console.error("❌ Error showing tables:", err);
  } else {
    console.log("📦 Tables in database:");
    console.table(results);
  }
});


// ✅ Simple test route
app.get("/api/test", (req, res) => {
  res.send("Backend is working!");
});
app.get("/", (req, res) => {
  res.send("🐾 Welcome to TailCity Backend — Server is Running Successfully!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// 🐶 Route to get all pets
app.get("/api/pets", (req, res) => {
  const sql = "SELECT * FROM pets";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching pets:", err);
      res.status(500).send("Error fetching pets data");
    } else {
      res.json(results);
    }
  });
});
