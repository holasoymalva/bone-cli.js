const controllerTemplate = (name) => `
const { Controller, Get, Post } = require('@holasoymalva/bone.js');

@Controller('/${name.toLowerCase()}')
class ${name}Controller {
  @Get('/')
  async getAll() {
    return { message: 'Retrieved all ${name.toLowerCase()}s' };
  }

  @Get('/:id')
  async getOne(req) {
    return { message: 'Retrieved ${name.toLowerCase()} with ID: ' + req.params.id };
  }

  @Post('/')
  async create(req) {
    return { 
      message: 'Created new ${name.toLowerCase()}',
      data: req.body 
    };
  }
}

module.exports = ${name}Controller;
`;