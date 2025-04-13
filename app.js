import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const placesData = JSON.parse(fs.readFileSync("places.json", "utf-8"));

// Home Page
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./public" }); // Ensure it loads from public folder
});

// Login Handler (no DB, just console log)
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("User Logged In:", email);
  res.redirect("/");
});

// Register Handler (no DB, just console log)
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  console.log("User Registered:", name, email);
  res.redirect("/");
});

// Place Search Handler
app.post("/search", (req, res) => {
  const search = req.body.place.toLowerCase();

  if (placesData[search]) {
    const info = placesData[search];
    res.render("result", { place: search, info });
  } else {
    res.send(`
      <script>
        alert("City not found. Please try again.");
        window.location.href = "/";
      </script>
    `);
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
