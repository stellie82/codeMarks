const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/codeMarks"
);

const tagSeed = [
  {
    name: "javascript",
    alias: ["ecmascript", "js", "livescript", "jscript", "es"],
    date: new Date(Date.now()),
    isLanguage: true
  },
  {
    name: "python",
    alias: ["python"],
    date: new Date(Date.now()),
    isLanguage: true
  },
  {
    name: "c-sharp",
    alias: ["c-sharp", "cs", "c#", "c sharp", "cool"],
    date: new Date(Date.now()),
    isLanguage: true
  },
  {
    name: "c/cpp",
    alias: ["c/cpp", "c/c++"],
    date: new Date(Date.now()),
    isLanguage: true
  },
  {
    name: "java",
    alias: ["java"],
    date: new Date(Date.now()),
    isLanguage: true
  },
  {
    name: "ruby",
    alias: ["ruby"],
    date: new Date(Date.now()),
    isLanguage: true
  },
  {
    name: "go",
    alias: ["go", "golang"],
    date: new Date(Date.now()),
    isLanguage: true
  },
  {
    name: "php",
    alias: ["php"],
    date: new Date(Date.now()),
    isLanguage: true
  },
  {
    name: "swift",
    alias: ["swift"],
    date: new Date(Date.now()),
    isLanguage: true
  },
  {
    name: "r",
    alias: ["r", "r programming"],
    date: new Date(Date.now()),
    isLanguage: true
  },
  {
    name: "sql",
    alias: ["sql", "structured query language"],
    date: new Date(Date.now()),
    isLanguage: true
  },
  {
    name: "xml",
    alias: ["xml", "extensible markup language"],
    date: new Date(Date.now()),
    isLanguage: true
  },
  {
    name: "json",
    alias: ["json", "javascript object notation"],
    date: new Date(Date.now()),
    isLanguage: true
  },
  {
    name: "yaml",
    alias: ["yaml", "yet another markup language"],
    date: new Date(Date.now()),
    isLanguage: true
  },
  {
    name: "html",
    alias: ["html", "hypertext markup language"],
    date: new Date(Date.now()),
    isLanguage: true
  },
  {
    name: "css",
    alias: ["css", "cascading style sheets"],
    date: new Date(Date.now()),
    isLanguage: true
  },
  {
    name: "android",
    alias: ["android", "android os"],
    date: new Date(Date.now()),
    isLanguage: false
  },
  {
    name: "ios",
    alias: ["ios", "iphone os", "iphone"],
    date: new Date(Date.now()),
    isLanguage: false
  },
  {
    name: "linux",
    alias: ["linux"],
    date: new Date(Date.now()),
    isLanguage: false
  },
  {
    name: "windows",
    alias: ["windows", "microsoft windows", "microsoft windows os"],
    date: new Date(Date.now()),
    isLanguage: false
  },
  {
    name: "macos",
    alias: ["macos", "mac os x"],
    date: new Date(Date.now()),
    isLanguage: false
  },
  {
    name: "ui",
    alias: ["ui", "user interface"],
    date: new Date(Date.now()),
    isLanguage: false
  }
];

db.Tag
  .remove({})
  .then(() => db.Tag.collection.insertMany(tagSeed))
  .then(data => {
    console.log(data.result.n + " tag records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
