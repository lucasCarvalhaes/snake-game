
export function gameSize(height, box) {
    let gameSize = 300
    do {
        if (height % box === 0) {
            return height
        }

        height--
    } while (height > 300)

    return gameSize
}

