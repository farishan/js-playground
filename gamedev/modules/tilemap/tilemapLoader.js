define(function () {
  function TilemapLoader() {
    let tilemap = {};

    this.getTilemap = function (name) {
      return tilemap[name];
    };

    this.load = function (path, callback) {
      if (!window.onTileMapLoaded) {
        window.onTileMapLoaded = function (name, data) {
          console.log({ name, data });
          tilemap[name] = data;
          callback(data);
        };
      }

      require([path]);
    };
  }
  return TilemapLoader;
});
