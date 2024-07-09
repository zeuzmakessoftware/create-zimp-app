#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');

async function createProject() {
  let appName = process.argv[2];

  if (!appName) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'appName',
        message: 'Enter the name of your zimp project:',
        validate: function(input) {
          if (input.trim() === '') {
            return 'Project name cannot be empty';
          }
          return true;
        }
      }
    ]);
    appName = answers.appName;
  }

  const templateDir = path.resolve(__dirname, '../template');
  const appDir = path.resolve(process.cwd(), appName);

  if (fs.existsSync(appDir)) {
    console.error(`Directory ${appDir} already exists. Please choose a different name or delete the existing directory.`);
    process.exit(1);
  }

  fs.copySync(templateDir, appDir);

  console.log('Zimp app created successfully!');
  console.log(`To get started:
    cd ${path.basename(appDir)}
    npm install
    npm run dev`);
}

createProject();