const Guard = (guardClass) => {
  return function (target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args) {
      const guard = new guardClass();

      const canActivate = await guard.canActivate(this, ...args);
      if (!canActivate) {
        throw new Error("Access denied by guard");
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
};

class BaseGuard {
  async canActivate(context, ...args) {
    throw new Error("Guard must implement canActivate method");
  }
}

module.exports = {
  Guard,
  BaseGuard,
};
