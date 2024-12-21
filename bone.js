#!/usr/bin/env node
const program = require('commander');
const { generateController, generateGuard } = require('../lib/cli/commands/generate');
const { createProject } = require('../lib/cli/commands/new');

program
  .version('0.1.0')
  .description('CLI for Bone.js Framework');

program
  .command('new <project-name>')
  .description('Create a new Bone.js project')
  .action(async (projectName) => {
    try {
      console.log(`Creating new project: ${projectName}`);
      await createProject(projectName);
    } catch (error) {
      console.error('Error creating project:', error.message);
      process.exit(1);
    }
  });

program
  .command('generate <type> <name>')
  .description('Generate a new component (controller, guard, etc.)')
  .action((type, name) => {
    switch (type) {
      case 'controller':
        generateController(name);
        break;
      case 'guard':
        generateGuard(name);
        break;
      default:
        console.error('Invalid component type');
    }
  });

program.parse(process.argv);
