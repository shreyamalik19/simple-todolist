//jshint esversion: 6

const express = require("express");
const bodyparser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

const items = ["Do Yoga", "Meditate"];
const workItems = [];

app.get("/", function(req, res) {
  //sending data from server to browser

  let day = date.getDate();

  res.render("list", {
    listTitle : day,
    newListItems: items
  });

});


app.post("/", function(req, res) {

  let item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});



app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });

});

app.post("/work", function(req, res) {

  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");


});


app.listen(3000, function() {
  console.log("listening on port 3000!");

});
