define(['Component'], function (Component) {
  // function Vector2() {
  //   Component.call(this, { x: 0, y: 0 });

  //   return this;
  // }

  // Vector2.prototype = Object.create(Component.prototype);

  // return Vector2;

  const vector2 = new Component({ x: 0, y: 0 });
  vector2.name = 'Vector2';

  return vector2;
});
