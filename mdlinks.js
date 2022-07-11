const fs = require('fs');
// const path = require("path");
const marked = require("marked");
const cheerio = require("cheerio");
const axios = require("axios").default;

// Extract Links
const processMd = (path, options) => {
  try {
    const data = fs.readFileSync('./demo.md', 'utf8'); //Read the file and return its content
    const html = marked.parse(data); //Links to HTML
    const $ = cheerio.load(html)
    const linkObjects = $('a'); // <a>
    
    const linkArr = [];

    linkObjects.each((index, link) => {
      linkArr.push({
        text: $(link).text(), // get the text
        href: $(link).attr('href'),
        file: path, // get the href attribute
      });
    })
    if(options.validate) {
      return validateLinks(linkArr)
    }
    else if(options.stats){
      return stats(linkArr)
    }
    else {
      console.log(linkArr)
    }
  } catch (err) {
    console.error('err');
  }
};

const validateLinks = (linkArr) => {
  console.log("Validando...")
  const promisesArray = []
  linkArr.forEach((link) => {
    const ax = axios.get(link.href).then((res) => {
      link.status = res.status
      link.ok = res.statusText === 'OK' ? "OK" : "Fail"
      return link
    }).catch( (error) => {
      if(error.response){
        link.status = error.response.status
        link.ok = "Fail"
      } else {
        link.status = ''
        link.ok = 'Fail'
      }
      return link
    })
    promisesArray.push(ax)
  });

  Promise.all(promisesArray).then( (res) => {
    console.log(res)
  })
}

const stats = (linkArr) => {
  const stats = {}
  const linksList = linkArr.map(link => link.href)
  stats.total = linkArr.length
  stats.unique = [...new Set(linksList)].length;
  console.log(stats)
}

module.exports = {
  processMd
}