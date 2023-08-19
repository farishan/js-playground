/**
 * Item Template
 *
 */

function Item({
  name = String,
  extend = {},
}) {
  // Basic properties
  this.id = `Item${ID()}`
  this.created_at = Date.now()
  this.name = name

  // Feature-specific properties
  const extendKeys = Object.keys(extend)
  if(extendKeys.length > 0){
    for (let index = 0; index < extendKeys.length; index++) {
      const element = extendKeys[index];
      this[element] = extend[element]
    }
  }

  return this;

  // Helpers
  function ID() {
    return '_' + Math.random().toString(36).substr(2, 9);
  };
}
