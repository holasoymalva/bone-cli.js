const HTTP_METHODS = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  PATCH: "patch",
};

function createRouteDecorator(method) {
  return function (path = "/") {
    return function (target, propertyKey, descriptor) {
      if (!Reflect.hasMetadata("routes", target.constructor)) {
        Reflect.defineMetadata("routes", [], target.constructor);
      }

      const routes = Reflect.getMetadata("routes", target.constructor);
      routes.push({
        method,
        path,
        handlerName: propertyKey,
        handler: descriptor.value,
      });

      return descriptor;
    };
  };
}

const Get = createRouteDecorator(HTTP_METHODS.GET);
const Post = createRouteDecorator(HTTP_METHODS.POST);
const Put = createRouteDecorator(HTTP_METHODS.PUT);
const Delete = createRouteDecorator(HTTP_METHODS.DELETE);
const Patch = createRouteDecorator(HTTP_METHODS.PATCH);

module.exports = {
  Get,
  Post,
  Put,
  Delete,
  Patch,
  HTTP_METHODS,
};
