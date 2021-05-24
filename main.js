let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')
let box = 32
let snake = []
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
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

function createFood() {
    context.fillStyle = '#ff5050'
    context.fillRect(food.x, food.y, box, box)
}

document.addEventListener('keydown', updateDirection)

function updateDirection(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left'
    if (event.keyCode == 38 && direction != 'up') direction = 'down'
    if (event.keyCode == 39 && direction != 'left') direction = 'right'
    if (event.keyCode == 40 && direction != 'down') direction = 'up'
}

function starGame() {
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box
    if (snake[0].y > 15 * box && direction == "up") snake[0].y = 0
    if (snake[0].y < 0 && direction == "down") snake[0].y = 16 * box

    createBG()
    createSnake()
    createFood()
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

let jogo = setInterval(starGame, 200)