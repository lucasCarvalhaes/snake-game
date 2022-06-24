import { gameSize } from "./util.js";

const canvas = document.getElementById('snake')
const context = canvas.getContext('2d')
const box = 28
let score = 0

const SPEEDS = {
    ZOOM: box,
    FAST: box * 2,
    MEDIUM: box * 3,
    SLOW: box * 4
}

const MODE = {
    VERY_HARD: 100,
    HARD: 20,
    NORMAL: 10,
    EASY: 3
}


// Define a altura máxima do jogo menos uma margem
canvas.height = gameSize(window.innerHeight, box) - (box * 3)
canvas.width = canvas.height
const boxResize = canvas.height / box

// Posição Snake inicial
let snake = [
    {
        x: 8 * box + box,
        y: 8 * box + box
    },
    {
        x: 8 * box,
        y: 8 * box,
    }
]

// Posição do food inicial
let food = {
    x: Math.floor(Math.random() * (boxResize - 1) + 1) * box,
    y: Math.floor(Math.random() * (boxResize - 1) + 1) * box
}

function createBG() {
    context.fillStyle = "hsl(180, 50%, 70%)";
    context.fillRect(0, 0, boxResize * box, boxResize * box)
}

function createSnake() {
    for (const pos in snake) {
        context.fillStyle = '#00b51a'
        context.fillRect(snake[pos].x, snake[pos].y, box - 1, box - 1)
    }
}

function createFood() {
    context.fillStyle = '#ff0000'
    context.fillRect(food.x + (box / 6), food.y + (box / 6), box / 1.5, box / 1.5)
}

function getSpeed() {
    const options = document.querySelectorAll('.menu label input')
    let speed = 'slow'
    for (const opt of options) {
        opt.addEventListener('change', restartSpeed)
        if (opt.checked) {
            speed = opt.value
        }
    }
    if (speed == 'zoom') return SPEEDS.ZOOM
    if (speed == 'fast') return SPEEDS.FAST
    if (speed == 'medium') return SPEEDS.MEDIUM
    if (speed == 'slow') return SPEEDS.SLOW
}


// Mapeamento dos comandos de direção
let direction = ['right']
document.addEventListener("keydown", updateDirection)

function updateDirection(event) {

    if (event.keyCode == 37 && direction[direction.length - 1] != 'right') direction.push('left')
    if (event.keyCode == 38 && direction[direction.length - 1] != 'up') direction.push('down')
    if (event.keyCode == 39 && direction[direction.length - 1] != 'left') direction.push('right')
    if (event.keyCode == 40 && direction[direction.length - 1] != 'down') direction.push('up')

}

// função executada a cada frame
function startGame() {
    if (snake[0].x > (boxResize - 1) * box && direction == 'right') snake[0].x = 0
    if (snake[0].x > (boxResize - 1) * box && direction == 'up') snake[0].x = 0
    if (snake[0].x > (boxResize - 1) * box && direction == 'down') snake[0].x = 0

    if (snake[0].x < 0 && direction == 'left') snake[0].x = (boxResize - 1) * box
    if (snake[0].x < 0 && direction == 'up') snake[0].x = (boxResize - 1) * box
    if (snake[0].x < 0 && direction == 'down') snake[0].x = (boxResize - 1) * box

    if (snake[0].y > (boxResize - 1) * box && direction == 'up') snake[0].y = 0
    if (snake[0].y > (boxResize - 1) * box && direction == 'right') snake[0].y = 0
    if (snake[0].y > (boxResize - 1) * box && direction == 'left') snake[0].y = 0

    if (snake[0].y < 0 && direction == 'down') snake[0].y = (boxResize - 1) * box
    if (snake[0].y < 0 && direction == 'right') snake[0].y = (boxResize - 1) * box
    if (snake[0].y < 0 && direction == 'left') snake[0].y = (boxResize - 1) * box

    for (let i = 3; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo)
            const finalScore = document.getElementById('score').innerText
            alert('GAME OVER!!!\nYour Score: ' + finalScore)
            location.reload()
        }
    }

    createBG()
    createSnake()
    createFood()
    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if (direction[0] == 'right') snakeX += box
    if (direction[0] == 'left') snakeX -= box
    if (direction[0] == 'up') snakeY += box
    if (direction[0] == 'down') snakeY -= box

    direction.length > 1 ? direction.shift() : ''

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop()
    } else {
        score++
        document.querySelector('#score').innerText = score
        food.x = Math.floor(Math.random() * (boxResize - 1) + 1) * box
        food.y = Math.floor(Math.random() * (boxResize - 1) + 1) * box
    }


    if (score == MODE.EASY) {
        document.getElementById('medium').checked = true
        restartSpeed()
    }
    if (score == MODE.NORMAL) {
        document.getElementById('fast').checked = true
        restartSpeed()
    }
    if (score >= MODE.HARD) {
        document.getElementById('zoom').checked = true
        restartSpeed()
    }

    snake.unshift({ x: snakeX, y: snakeY })
}

// Reinicia a velociadade do jogo
function restartSpeed() {
    document.getElementById('snake').focus()
    clearInterval(jogo)
    jogo = setInterval(startGame, getSpeed())
}

// Inicia o jogo e guarda a referência
let jogo = setInterval(startGame, getSpeed())

// to do - refatorar kkkkkkkkk