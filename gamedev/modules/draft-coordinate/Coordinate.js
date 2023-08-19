function Coordinate(...args) {
  let a = { x: 0, y: 0 };

  if (args && args.length) {
    if (args[0]) a.x = args[0];
    if (args[1]) a.y = args[1];
  } else if (typeof args === 'object') {
    if (args.x) a.x = args.x;
    if (args.y) a.y = args.y;
  }

  this.x = a.x;
  this.y = a.y;
}
