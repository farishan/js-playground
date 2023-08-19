const update = () => {
  console.log('update')
}

MainLoop.setUpdate(update).start()

setTimeout(function(){
  console.log(MainLoop.isRunning())
  MainLoop.stop()
}, 1000)
