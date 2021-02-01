export function element(id = '') {
  return (target: unknown, propertyKey: string | symbol) => {
    const update = Object.defineProperty(target, propertyKey, {
      // configurable: true,
      enumerable: true,
      get: function () {
        return this.selectElementById(id);
      }
    });
    if (!update) {
      throw new Error('Unable to update property');
    }
  };
}
