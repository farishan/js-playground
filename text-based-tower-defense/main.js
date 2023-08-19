requirejs(['utility'], (utility) => {
    utility.use('darkmode')
    const getId = () => Math.random().toString(36).slice(2, 6)

    /* DOM declarations */
    const $GUI = document.createElement('div')

    const $opponent = document.createElement('div')
    $opponent.style.border = '1px solid'
    $opponent.innerHTML = 'opponent'

    const $battleArea = document.createElement('div')
    $battleArea.style.border = '1px solid'
    $battleArea.style.overflow = 'auto'
    $battleArea.innerHTML = 'battleArea'

    const $hud = document.createElement('div')
    $hud.style.border = '1px solid'
    $hud.style.textAlign = 'center'

    const $endTurn = document.createElement('button')
    $endTurn.onclick = update
    $endTurn.innerHTML = 'end turn'
    $hud.appendChild($endTurn)

    /* Gameplay */
    const battleArea = {
        entity: {},
        createElement: function () {
            const e = {
                id: getId(),
                hp: 10,
            }
            this.entity[e.id] = e

            return e
        },
        remove: function (id) {
            this.entity[id].element.remove()
            delete this.entity[id]
        },
        forEachEntity: function (cb) {
            for (const e of Object.values(this.entity)) { cb(e) }
        },
        update: function () {
            this.forEachEntity(e => {
                if (e.hp <= 0) {
                    this.remove(e.id)
                }
            })
        },
        render: function () {
            $battleArea.innerHTML = ''
            this.forEachEntity(e => {
                const $e = document.createElement('p')
                $e.innerHTML = `id:${e.id} | hp:${e.hp}`
                e.element = $e
                $battleArea.appendChild(e.element)
            })
        }
    }

    const player = {
        hp: 10,
        turn: function () {
            battleArea.createElement()
        }
    }

    const opponent = {
        logs: [],
        turn: function () {
            battleArea.createElement()
        }
    }

    /* DOM Init */
    $GUI.appendChild($opponent)
    $GUI.appendChild($battleArea)
    $GUI.appendChild($hud)

    document.body.appendChild($GUI)

    /* Post-render */
    $battleArea.style.height = `${window.innerHeight - $opponent.offsetHeight - $hud.offsetHeight}px`

    /* Post-init */
    function update() {
        opponent.turn()
        player.turn()
        battleArea.entity[Object.keys(battleArea.entity)[0]].hp--
        battleArea.update()
        battleArea.render()
    }
})