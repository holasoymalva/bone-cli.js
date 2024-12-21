const fs = require("fs").promises;
const path = require("path");
const chalk = require("chalk");
const {
  controllerTemplate,
  guardTemplate,
} = require("../templates/controller.template");

async function createFile(filePath, content) {
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, content);
    return true;
  } catch (error) {
    console.error(chalk.red(`Error creating file: ${error.message}`));
    return false;
  }
}

async function generateController(name) {
  const controllerName = name.endsWith("Controller")
    ? name
    : `${name}Controller`;
  const filePath = path.join(
    process.cwd(),
    "src",
    "controllers",
    `${controllerName}.js`
  );

  if (await createFile(filePath, controllerTemplate(name))) {
    console.log(chalk.green(`Successfully created controller: ${filePath}`));
  }
}

async function generateGuard(name) {
  const guardName = name.endsWith("Guard") ? name : `${name}Guard`;
  const filePath = path.join(process.cwd(), "src", "guards", `${guardName}.js`);

  if (await createFile(filePath, guardTemplate(name))) {
    console.log(chalk.green(`Successfully created guard: ${filePath}`));
  }
}

module.exports = {
  generateController,
  generateGuard,
};
