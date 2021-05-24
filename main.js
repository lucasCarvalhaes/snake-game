let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')
let box = 32
let snake = []
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = 'right'

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

function starGame() {
    createBG()
    createSnake()
    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if (direction == 'right') snakeX += box
    if (direction == 'left') snakeX -= box
    if (direction == 'up') snakeY += box
    if (direction == 'down') snakeY -= box

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.pop()
    snake.unshift(newHead)
}

let jogo = setInterval(starGame, 1000)