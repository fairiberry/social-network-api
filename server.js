const express = require("express");
const routes = require("./routes");
const db = require('./config/connection');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


db.once('open', () => {
  app.listen(PORT, () => {
    console.log("▐▓█▀▀▀▀▀▀▀▀▀█▓▌░▄▄▄▄▄░");
    console.log("▐▓█░░▀░░▀▄░░█▓▌░█▄▄▄█░");
    console.log("▐▓█░░▄░░▄▀░░█▓▌░█▄▄▄█░");
    console.log("▐▓█▄▄▄▄▄▄▄▄▄█▓▌░█████░");
    console.log("____▄▄███▄▄____░█████░");
    console.log("");
    console.log(`✲´*。.❄¨¯*✲。❄。*。¨¯*✲❤ server running on port ${PORT}!!!`);
  });
});
