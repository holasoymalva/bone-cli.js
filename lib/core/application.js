const express = require('express');

class BoneApplication {
  constructor(options = {}) {
    this.app = express();
    this.options = options;
    this.middlewares = [];
    this.routes = [];
    
    this.setupMiddlewares();
  }

  setupMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    
    // Apply custom middlewares
    this.middlewares.forEach(middleware => {
      this.app.use(middleware);
    });
  }

  addMiddleware(middleware) {
    this.middlewares.push(middleware);
    return this;
  }

  listen(port = 3000) {
    return this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}

module.exports = BoneApplication;