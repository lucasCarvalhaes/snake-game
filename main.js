let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')
let box = 32
let snake = []
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

function createBG() {
    context.fillStyle = "#505050";
    context.fillRect(0, 0, 16 * box, 16 * box)
}

function createSnake() {
    for (const pos in snake) {
        context.fillStyle = '#50ffff'
        context.fillRect(snake[pos].x, snake[pos].y, box, box)
    }

}

createBG()
createSnake()