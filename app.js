const express = require("express");
const pageRoute = require("./routes/pageRoute");

const app = express();

//Template Engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));

//Routes
app.use("/", pageRoute);

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`App started on port ${PORT}`);
});
