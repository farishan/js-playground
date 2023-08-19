var libLoader = new ScriptLoader({
  path: '../node_modules/@farishan/'
})
libLoader.init({
  statics: ['player/dist/player.min']
})

var scriptObject = new ScriptObject({
  statics: ['lib', 'item'],
  main: 'main'
})
var scriptLoader = new ScriptLoader()
scriptLoader.init(scriptObject)
