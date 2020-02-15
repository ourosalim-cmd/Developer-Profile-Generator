const fs = require("fs");
const path = require("path");
const generateHTML = require("./generateHTML");
const inquirer = require("inquirer");
const axios = require("axios");
//const open = require("open");
const util = require("util");
const HTML5ToPDF = require("html5-to-pdf")
const writeFileAsync = util.promisify(fs.writeFile);

var query;
var question = {};
inquirer .prompt([
  {
    type: "input",
    name: "github",
    message: "What is your GitHub user name?"
  },

  {
    type: "list",
    name: "color",
    message: "What is your favorite color?",
    choices: ["red", "blue", "green", "pink"]
  }
])
.then(function (res){
    console.log(`username is:  ${res.github}`);
    console.log(JSON.stringify(res, null, '  '));
    console.log(`Your favorite color is:  ${res.color}`);
    question =  JSON.stringify(res);
    console.log(`from question: ${question}`);
    //var query;
    return query = axios.get(`https://api.github.com/users/${res.github}`)
    .then(function (response) {
      // handle success
      //console.log(response);
      //console.log(JSON.stringify(response))
      const { answer } = response.data;
      console.log(`my name is  ${response.data.name}`);
      console.log(`i am from ${response.data.location}`);
      console.log(`I work at ${response.data.company}`);
      console.log(`my GitHub link is: ${response.data.html_url}`);
      console.log(`About me: ${response.data.bio}`);
      console.log(`My followers: ${response.data.followers}`);
      console.log(`I follower: ${response.data.following}`);
      console.log(`Check out my blog: ${response.data.blog}`);
      console.log(`I have ${response.data.public_repos} cool projects`);
      console.log("From answer variable:"+ "\n")
    //   console.log(res.color);

      var setArr = [response.data.name, response.data.location,
        response.data.company, res.color]
        console.log(setArr);
    //   var HTML = generateHTML(res, response.data);
      
    //   var fileName = "./test.html";
    //   writeToFile(fileName, HTML);
    //   function writeToFile(fileName, HTML) {
    //   return fs.writeFileSync(path.join(process.cwd(), fileName), HTML);
    // }
//////////////////////////////////////////////
fileMaker();
async function fileMaker() {
    console.log("hi")
    // const html5ToPDF = new HTML5ToPDF({
    //     inputPath: path.join(__dirname, "test.html"),
    //     outputPath: path.join(__dirname, "index.pdf")
    //   })

    try {
      //const answers = await promptUser();
      var htmlFile = "./index.html";
      const HTML = generateHTML(res, response.data);
      await fs.writeFileSync(path.join(process.cwd(), htmlFile), HTML);
      const html5ToPDF = new HTML5ToPDF({
        inputPath: path.join(__dirname, "index.html"),
        outputPath: path.join(__dirname, "index.pdf")
      })
      await html5ToPDF.start()
      await html5ToPDF.build()
      await html5ToPDF.close()
      console.log("DONE")
      process.exit(0);
      //console.log("Successfully wrote to index.html");
    } catch(err) {
      console.log(err);
    }
  }
////////////////////////////////////////////
    })
    // .catch(function (error) {
    //   // handle error
    //   console.log(error);
    // })
    // .finally(function () {
    //   // always executed
    // });
});
// console.log(`my name is  ${query.data.name}`);
// console.log(`i am from ${query.data.location}`);
// console.log(`I work at ${query.data.company}`);
// console.log(`my GitHub link is: ${query.data.html_url}`);
var username = question.github;
var color = question.color;
//module.exports = index;
