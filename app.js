const express = require("express");

const app = express();

//Template Engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));

//Routes
app.get("/", (req, res) => {
	res.status(200).render("index", {
		pageName: "index",
	});
});

app.get("/about", (req, res) => {
	res.status(200).render("about", {
		pageName: "about",
	});
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`App started on port ${PORT}`);
});
