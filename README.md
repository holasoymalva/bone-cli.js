# Bone.js

[![npm version](https://img.shields.io/npm/v/@holasoymalva/bone.js.svg)](https://www.npmjs.com/package/@holasoymalva/bone.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Bone.js is a lightweight, modern Node.js framework designed to simplify API development while enforcing best practices. It provides an intuitive CLI for rapid development and a decorator-based approach for clean, maintainable code.

## Features

- 🚀 Quick setup with CLI tools
- 🎨 Decorator-based routing and controllers
- 🛡️ Built-in middleware and guard support
- 📝 TypeScript support out of the box
- 🔧 Modular architecture
- 🎯 Convention over configuration

## Installation

```bash
npm install @holasoymalva/bone.js
```

For global CLI access:

```bash
npm install -g @holasoymalva/bone.js
```

## Quick Start

### Creating a New Project

```bash
bone new my-api
cd my-api
npm install
```

### Creating Your First Controller

```bash
bone generate controller users
```

This will generate a controller with basic CRUD operations:

```typescript
import { Controller, Get, Post, Body } from '@holasoymalva/bone.js';

@Controller('/users')
export class UsersController {
  @Get('/')
  async getAllUsers() {
    return { message: 'Get all users' };
  }

  @Post('/')
  async createUser(@Body() userData: any) {
    return { message: 'Create user', data: userData };
  }
}
```

### Starting the Server

```typescript
import { BoneApplication } from '@holasoymalva/bone.js';

const app = new BoneApplication();
app.listen(3000);
```

## CLI Commands

Bone.js comes with a powerful CLI to speed up your development process:

- `bone new <project-name>` - Create a new project
- `bone generate <type> <name>` - Generate components
  - `controller` - Generate a new controller
  - `guard` - Generate a new guard
  - `middleware` - Generate a new middleware

## Decorators

### Available Decorators

- `@Controller(path: string)` - Define a controller and its base path
- `@Get(path: string)` - Handle GET requests
- `@Post(path: string)` - Handle POST requests
- `@Put(path: string)` - Handle PUT requests
- `@Delete(path: string)` - Handle DELETE requests
- `@Guard(guard: Class)` - Apply guard to controller or route
- `@Middleware(middleware: Function)` - Apply middleware

### Example Usage

```typescript
import { Controller, Get, Guard, Middleware } from '@holasoymalva/bone.js';
import { AuthGuard } from './guards/auth.guard';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Controller('/api/products')
@Guard(AuthGuard)
@Middleware(LoggerMiddleware)
export class ProductsController {
  @Get('/')
  async getProducts() {
    return { products: [] };
  }
}
```

## Middleware

Create custom middleware to handle cross-cutting concerns:

```typescript
import { Middleware } from '@holasoymalva/bone.js';

export const LoggerMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
```

## Guards

Implement guards to handle authentication and authorization:

```typescript
import { Guard } from '@holasoymalva/bone.js';

export class AuthGuard implements Guard {
  canActivate(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
```

## Configuration

Create a `bone.config.js` in your project root:

```javascript
module.exports = {
  port: 3000,
  cors: {
    enabled: true,
    origin: '*'
  },
  swagger: {
    enabled: true,
    path: '/docs'
  }
};
```

## Best Practices

1. **Project Structure**
   ```
   src/
   ├── controllers/
   ├── services/
   ├── guards/
   ├── middleware/
   ├── models/
   └── main.ts
   ```

2. **Error Handling**
   ```typescript
   @Controller('/users')
   export class UsersController {
     @Get('/:id')
     async getUser(@Param('id') id: string) {
       try {
         // Your logic here
       } catch (error) {
         throw new BoneException('User not found', 404);
       }
     }
   }
   ```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📚 [Documentation](https://bone.js.org)
- 💬 [Discord Community](https://discord.gg/bonejs)
- 🐛 [Issue Tracker](https://github.com/holasoymalva/bone.js/issues)

## Acknowledgments

Special thanks to all contributors who have helped shape Bone.js!

---

Made with ❤️ by [holasoymalva](https://github.com/holasoymalva)