define(function () {
  function Component(obj) {
    if (!obj) console.warn('Creating empty component..');

    this.keys = Object.keys(obj || {});

    return this;
  }

  return Component;
});
