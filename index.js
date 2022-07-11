#!/usr/bin/env node


const path = require("path");
const fs = require("fs");

const {processMd} = require("./mdlinks.js")

const mdLinks = (userPath, options) => {
    if(!userPath) return "Falta un path"

    if (fs.statSync(userPath).isFile()) {
        console.log("isFile")
        if (path.extname(userPath) === ".md") {
            processMd(userPath, options)
            
        } else {
            return "El path no es un archivo md"            
        }
    } else {
        return "El path no es un archivo"
    }
}

mdLinks('./demo.md', {validate: true});