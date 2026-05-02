const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("public"));

// REGISTER
app.post("/register", (req, res) => {
  const users = JSON.parse(fs.readFileSync("users.json"));
  users.push(req.body);
  fs.writeFileSync("users.json", JSON.stringify(users));
  res.send("Registered");
});

// LOGIN
app.post("/login", (req, res) => {
  const users = JSON.parse(fs.readFileSync("users.json"));
  const user = users.find(
    u => u.email === req.body.email && u.pass === req.body.pass
  );

  if (!user) return res.status(401).send("Invalid");
  res.send("Success");
});

// GET JOBS
app.get("/jobs", (req, res) => {
  const jobs = JSON.parse(fs.readFileSync("jobs.json"));
  res.json(jobs);
});

// POST JOB
app.post("/jobs", (req, res) => {
  const jobs = JSON.parse(fs.readFileSync("jobs.json"));
  jobs.push(req.body);
  fs.writeFileSync("jobs.json", JSON.stringify(jobs));
  res.send("Job Added");
});

app.listen(3000, () => console.log("Server running on port 3000"));
