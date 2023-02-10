
const express = require('express')
const app = express()
const port = 3000


//setting view engine to ejs
app.set("view engine", "ejs");


app.use(express.static('assets'))

//route for index page
app.get("/", function (req, res) {
  res.render("index");
});

//route for magic page
app.get("/magic", function (req, res) {
  res.render("magic");
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
