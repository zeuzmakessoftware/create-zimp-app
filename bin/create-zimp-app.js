#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';

// Fix __dirname and __filename in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createProject() {
  let appName = process.argv[2];

  try {
    if (!appName) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'appName',
          message: "Enter the name of your zimp project:",
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

    // Read, modify, and write the package.json file
    const packageJsonPath = path.join(appDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = await fs.readJson(packageJsonPath);
      packageJson.name = appName;
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    } else {
      console.warn('package.json not found in template directory. Skipping name update.');
    }

    console.log('Zimp app created successfully!');
    console.log(`To get started:
      cd ${path.basename(appDir)}
      npm install
      npm run dev`);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

createProject();
