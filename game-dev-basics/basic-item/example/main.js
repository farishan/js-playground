console.log('hello from main.js')

const $root = document.createElement('div')

const player = new Player({
  name: 'faris'
})

const items = []

for (let index = 0; index < 10; index++) {
  const item = new Item({
    name: `item${index}`,
    extend: {
      craftable: index % 2 === 0 ? true : false,
      recipe: index % 4 === 0 ? {ingredient1: 'test'} : false
    }
  })

  items.push(item)

  // $root.innerHTML += (JSON.stringify(item))
}

player.items = items
$root.innerHTML += `<pre><code>${JSON.stringify(player, '', 2)}</code></pre>`

document.body.appendChild($root)
