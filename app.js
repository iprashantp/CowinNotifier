import express from "express";
import cowin from "./cowin.js";
import constants from './constants/constants.js';
var app = express();
app.set("view engine", "ejs");

var f = () => {
    setInterval(cowin.callCowin, 10000);
}

app.listen(3000, () => {
    constants.initConstants();
    console.log(`cowin search starts...`)
    f()
});