import { get, set } from "./game-data"

function listenInput() {
  let map
  let player

  window.addEventListener('keyup', function (e) {
    map = get('currentLevel').pathmap
    player = get('player')

    if (e.key === 'w') {
      if (map[player.character.y - 1]?.[player.character.x] === 1) player.character.y--
    }

    else if (e.key === 's') {
      if (map[player.character.y + 1]?.[player.character.x] === 1) player.character.y++
    }

    else if (e.key === 'a') {
      if (map[player.character.y]?.[player.character.x - 1] === 1) player.character.x--
    }

    else if (e.key === 'd') {
      if (map[player.character.y]?.[player.character.x + 1] === 1) player.character.x++
    }

    set('player', player)
  })
}

export { listenInput }