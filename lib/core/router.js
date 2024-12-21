const express = require("express");

class Router {
  constructor() {
    this.router = express.Router();
    this.routes = new Map();
  }

  registerRoute(method, path, handler, middlewares = []) {
    const routeKey = `${method.toUpperCase()}:${path}`;
    this.routes.set(routeKey, { handler, middlewares });

    // Apply middlewares and handler to the route
    this.router[method.toLowerCase()](path, ...middlewares, handler);
  }

  getRouter() {
    return this.router;
  }

  getRoutes() {
    return Array.from(this.routes.entries()).map(([key, value]) => {
      const [method, path] = key.split(":");
      return {
        method,
        path,
        handler: value.handler,
        middlewares: value.middlewares,
      };
    });
  }

  prefix(path) {
    const router = express.Router();
    router.use(path, this.router);
    return router;
  }
}

module.exports = Router;
