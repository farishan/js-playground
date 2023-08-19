define(function () {
  function Entity(id) {
    if (!id) console.warn('Creating entity without an id..');

    this.id = id;

    return this;
  }

  return Entity;
});
