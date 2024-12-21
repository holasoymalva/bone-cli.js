function Controller(path = "") {
  return function (target) {
    Reflect.defineMetadata("path", path, target);
    return target;
  };
}

module.exports = Controller;
