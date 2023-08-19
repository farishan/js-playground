window.addEventListener('keydown', e => {
    if (e.key === 'd' || e.key === 'ArrowRight') {
        if (direction !== 'left') direction = 'right'
    }
    else if (e.key === 'a' || e.key === 'ArrowLeft') {
        if (direction !== 'right') direction = 'left'
    }
    else if (e.key === 'w' || e.key === 'ArrowUp') {
        if (direction !== 'down') direction = 'up'
    }
    else if (e.key === 's' || e.key === 'ArrowDown') {
        if (direction !== 'up') direction = 'down'
    }
    else if (e.key === ' ') {
        if (loopEngine.should_stop) {
            loopEngine.start()
        } else {
            loopEngine.stop()
        }
        if (loopEngine1.should_stop) {
            loopEngine1.start()
        } else {
            loopEngine1.stop()
        }
    }
})
