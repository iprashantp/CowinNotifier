import express from "express";
import cowin from "./cowin.js";
import constLib from './constants.js';
var app = express();

app.set("view engine", "ejs");

var f = () => {
    setInterval(cowin.callCowin, 30000);
}

app.listen(3000, () => {
    constLib.initConstants();
    console.log(`cowin search starts...`)
    f()
});