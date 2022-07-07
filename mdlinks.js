const fs = require('fs');
// const path = require("path");
const marked = require("marked");
const cheerio = require("cheerio");
const axios = require("axios").default;

// Extract Links
const extractFiles = (filename) => {
  try {
    const data = fs.readFileSync('./demo.md', 'utf8'); //Read the file and return its content
    const html = marked.parse(data); //Links to HTML
    //   console.log(html);
    const $ = cheerio.load(html) // <a>
    const linkObjects = $('a');
    // console.log(linkObjects)
    const linkArr = [];
    linkObjects.each((index, link) => {
      linkArr.push({
        text: $(link).text(), // get the text
        href: $(link).attr('href'),
        file: filename, // get the href attribute
      });
    })
    console.log(linkArr)
  } catch (err) {
    console.error('err');
  }
};

// extractFiles();

//Validate
extractFiles.map((fileObj) => {
  const link = fileObj.href;


axios.get(link)
.then( (response) => {
    // console.log(response.data);
    console.log(response.status);
    if (response.status == 404) console.log("fail")
else console.log("ok")
    const linkData = {
      href: url,
    };
    return linkData;
  })
  .catch( (error) => {
    if (error.response) {
        const linkData = {
          href: url,
        };
        return linkData;}
  });
});

// //Stats
