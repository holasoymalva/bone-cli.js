class MiddlewareHandler {
  constructor() {
    this.middlewares = new Map();
  }

  add(name, middleware) {
    this.middlewares.set(name, middleware);
  }

  get(name) {
    return this.middlewares.get(name);
  }

  apply(app) {
    this.middlewares.forEach((middleware) => {
      app.use(middleware);
    });
  }

  compose(...middlewares) {
    return (req, res, next) => {
      const executeMiddleware = (index) => {
        if (index < middlewares.length) {
          middlewares[index](req, res, () => executeMiddleware(index + 1));
        } else {
          next();
        }
      };
      executeMiddleware(0);
    };
  }
}

module.exports = MiddlewareHandler;
