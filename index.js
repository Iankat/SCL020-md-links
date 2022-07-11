const path = require("path");
const fs = require("fs");

const {processMd} = require("./mdlinks.js")

const mdLinks = (userPath, options) => {
    if(!userPath) return "Falta un path" //To-Do: mensaje de error 

    if (fs.statSync(userPath).isFile()) { //Revisa si path es archivo
        if (path.extname(userPath) === ".md") { //Revisa si es md
            processMd(userPath, options) //procesa el md
            
        } else {
            return "El path no es un archivo md"        
        }
    } else {
        return "El path no es un archivo"
    }
}

mdLinks('./demo.md', {validate: true});