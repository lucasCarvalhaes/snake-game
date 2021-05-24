const SPEEDS = {
    FAST: 100,
    MEDIUM: 150,
    SLOW: 200
}

let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')
let box = 32
let snake = []
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 17 + 1) * box
}
let direction = 'right'
let score = 0

function createBG() {
    context.fillStyle = "hsl(180, 50%, 70%)";
    context.fillRect(0, 0, 18 * box, 18 * box)
}

function createSnake() {
    for (const pos in snake) {
        context.fillStyle = '#ff8000'
        context.fillRect(snake[pos].x, snake[pos].y, box, box)
    }
}

function createFood() {
    context.fillStyle = '#ff0000'
    context.fillRect(food.x, food.y, box, box)
}

function getSpeed() {
    const options = document.querySelectorAll('.menu label input')
    let speed = 'medium'
    for (const opt of options) {
        opt.addEventListener('click', restart)
        if (opt.checked) {
            speed = opt.value
        }
    }
    if (speed == 'fast') return SPEEDS.FAST
    if (speed == 'medium') return SPEEDS.MEDIUM
    if (speed == 'slow') return SPEEDS.SLOW
}

document.addEventListener('keydown', updateDirection)

function updateDirection(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left'
    if (event.keyCode == 38 && direction != 'up') direction = 'down'
    if (event.keyCode == 39 && direction != 'left') direction = 'right'
    if (event.keyCode == 40 && direction != 'down') direction = 'up'
}

function startGame() {
    if (snake[0].x > 17 * box && direction == "right") snake[0].x = 0
    if (snake[0].x < 0 && direction == "left") snake[0].x = 18 * box
    if (snake[0].y > 17 * box && direction == "up") snake[0].y = 0
    if (snake[0].y < 0 && direction == "down") snake[0].y = 18 * box

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo)
            const finalScore = document.querySelector('#score').innerText
            alert(`GAME OVER!!!\nHere's your final score: ${finalScore}. °O°`)
        }
    }

    createBG()
    createSnake()
    createFood()
    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if (direction == 'right') snakeX += box
    if (direction == 'left') snakeX -= box
    if (direction == 'up') snakeY += box
    if (direction == 'down') snakeY -= box

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop()
    } else {
        score++
        document.querySelector('#score').innerText = score
        food.x = Math.floor(Math.random() * 17 + 1) * box
        food.y = Math.floor(Math.random() * 17 + 1) * box
    }

    snake.unshift({ x: snakeX, y: snakeY })
}

function restart() {
    document.getElementById('snake').focus()
    clearInterval(jogo)
    setInterval(startGame, getSpeed())
}

jogo = setInterval(startGame, getSpeed())