const gameData: Record<string, any> = {
  currentLevel: {
    pathmap: [
      [0, 0, 1, 1, 1],
      [0, 0, 1, 0, 0],
      [1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
    ]
  },
  player: {
    character: {
      x: 2,
      y: 2
    }
  }
}

function get(key: string) {
  return { ...gameData[key] }
}

function set(key: string, value: any) {
  gameData[key] = value
  return gameData
}

export { get, set }