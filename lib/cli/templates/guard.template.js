const guardTemplate = (name) => `
const { Guard } = require('@holasoymalva/bone.js');

class ${name}Guard extends Guard {
  canActivate(context) {
    // Implement your guard logic here
    return true;
  }
}

module.exports = ${name}Guard;
`;

module.exports = {
  controllerTemplate,
  guardTemplate
};