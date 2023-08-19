function randomColor() {
  return `#${Math.floor(Math.random() * 9)}${Math.floor(
    Math.random() * 9
  )}${Math.floor(Math.random() * 9)}`;
}

function idToCoord(id) {
  const splitted = id.split('_');
  return {
    x: parseInt(splitted[0]),
    y: parseInt(splitted[1])
  };
}
