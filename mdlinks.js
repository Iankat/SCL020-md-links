const fs = require('fs');
// const path = require("path");
const marked = require("marked");
const cheerio = require("cheerio");
const axios = require("axios").default;

// Extract Links
const processMd = (path, options) => { //
  try {
    const data = fs.readFileSync('./demo.md', 'utf8'); //Read the file and return its content
    const html = marked.parse(data); //Links to HTML
    const $ = cheerio.load(html) //transforma html en objeto
    const linkObjects = $('a'); // <a>
    
    const linkArr = []; 

    linkObjects.each((index, link) => { //Rellena linkArr bajo el formato 
      linkArr.push({
        text: $(link).text(), // get the text
        href: $(link).attr('href'), // get the href attribute
        file: path, 
      });
    })
    if(options.validate) {
      return validateLinks(linkArr)
    }
    else {
      console.log(linkArr)
    }
  } catch (err) {
    console.error('err');
  }
};

const validateLinks = (linkArr) => { //validación de links
  console.log("Validando...")
  const promisesArray = [] //Guarda las promesas
  linkArr.forEach((link) => { 
    const ax = axios.get(link.href).then((res) => { //Se ejecuta axios 
      link.status = res.status  //Validación de status del link
      link.ok = res.statusText //Validación 
      return link //LinkArr + respuesta axios
    }).catch( (error) => {
      if(error.response){
        link.status = error.response.status
        link.ok = error.response.statusText
      } else {
        link.status = ''
        link.ok = 'Fail'
      }
      return link
    })
    promisesArray.push(ax) //Pushea axios callback
  });
  

  Promise.all(promisesArray).then( (res) => { //Llama todas las promesas de axios
    console.log(res)
  })
}



// //Stats

module.exports = {
  processMd
}