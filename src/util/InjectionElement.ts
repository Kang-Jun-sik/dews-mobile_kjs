export function element(id: string = '') {
  return (target: any, propertyKey: string | symbol) => {
    const update = Object.defineProperty(target, propertyKey, {
      // configurable: true,
      enumerable: true,
      get: function () {
        const shadowRoot = this.shadowRoot;
        if (shadowRoot.hasChildNodes()) {
          return shadowRoot.querySelector(`#${id}`) || null;
        }
        return null;
      },
    });
    if (!update) {
      throw new Error('Unable to update property');
    }
  };
}
