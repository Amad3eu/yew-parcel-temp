#!/usr/bin/env node
const { spawn } = require("child_process");
const fs = require("fs");

let folderName = ".";

if (process.argv.length >= 3) {
  folderName = process.argv[2];
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
}

const clone = spawn("git", [
  "clone",
  "https://github.com/Amad3eu/yew-parcel-template.git",
  folderName,
]);

clone.on("close", (code) => {
  if (code !== 0) {
    handleError("install", code);
  } else {
    console.log("Yew and parcel ready. Installing dependencies ...");

    const install = spawn("npm", ["install"], { cwd: folderName });
    install.on("close", (code) => {
      if (code !== 0) {
        handleError("install", code);
      } else {
        console.log(" Installed dependencies ✅ ");
        console.log(
          " If you like Yew Parcel Template, help us supporting the project:" +
            "\nBAT rewards in case that you use Brave Browser in https://github.com/Amad3eu"
        );
      }
    });
  }
});

function handleError(type, errCode) {
  console.error();
  process.exit(errCode);
}
