const fs = require("fs").promises;
const path = require("path");
const chalk = require("chalk");
const { execSync } = require("child_process");

async function createProjectStructure(projectPath) {
  const directories = [
    "src",
    "src/controllers",
    "src/services",
    "src/guards",
    "src/middleware",
    "src/models",
    "test",
  ];

  for (const dir of directories) {
    await fs.mkdir(path.join(projectPath, dir), { recursive: true });
  }
}

async function createInitialFiles(projectPath, projectName) {
  const files = {
    "package.json": {
      name: projectName,
      version: "0.1.0",
      description: "A new Bone.js project",
      scripts: {
        start: "node src/index.js",
        test: "jest",
        dev: "nodemon src/index.js",
      },
      dependencies: {
        "@holasoymalva/bone.js": "^0.1.0",
        express: "^4.17.1",
      },
      devDependencies: {
        jest: "^27.4.7",
        nodemon: "^2.0.15",
      },
    },
    "src/index.js": `
const { BoneApplication } = require('@holasoymalva/bone.js');

const app = new BoneApplication();
app.listen(3000);
    `,
    ".gitignore": `
node_modules/
.env
.DS_Store
coverage/
    `,
  };

  for (const [fileName, content] of Object.entries(files)) {
    const filePath = path.join(projectPath, fileName);
    await fs.writeFile(
      filePath,
      typeof content === "string" ? content : JSON.stringify(content, null, 2)
    );
  }
}

async function createProject(projectName) {
  try {
    const projectPath = path.join(process.cwd(), projectName);

    // Create project directory
    await fs.mkdir(projectPath);

    // Create project structure
    await createProjectStructure(projectPath);

    // Create initial files
    await createInitialFiles(projectPath, projectName);

    // Initialize git repository
    execSync("git init", { cwd: projectPath });

    console.log(
      chalk.green(`
Successfully created project ${projectName}!

Get started with:
  cd ${projectName}
  npm install
  npm run dev
    `)
    );
  } catch (error) {
    console.error(chalk.red(`Error creating project: ${error.message}`));
    process.exit(1);
  }
}

module.exports = {
  createProject,
};
