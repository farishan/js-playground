function OrderedPair(a, b, name = 'orderedPair') {
  this[name] = [a, b];

  return this;
}

console.log(new OrderedPair(0, 0, 'coordinate'));
