controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    lastDirection = 1
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (lastDirection == 0) {
        projectile = sprites.createProjectileFromSprite(assets.image`Fireball`, playerSprite, 100, 0)
    }
    if (lastDirection == 1) {
        projectile = sprites.createProjectileFromSprite(assets.image`Fireball`, playerSprite, 0, -100)
    }
    if (lastDirection == 2) {
        projectile = sprites.createProjectileFromSprite(assets.image`Fireball`, playerSprite, -100, 0)
    }
    if (lastDirection == 3) {
        projectile = sprites.createProjectileFromSprite(assets.image`Fireball`, playerSprite, 0, 100)
    }
    music.play(music.melodyPlayable(music.sonar), music.PlaybackMode.UntilDone)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    playerSprite,
    assets.animation`Tauriel_knife`,
    200,
    false
    )
    swordOut = 1
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    lastDirection = 2
})
function loadLevel () {
    for (let value of enemyList) {
        sprites.destroy(value)
    }
    enemyList = []
    if (Level == 5050) {
        tiles.setCurrentTilemap(tilemap`level5050`)
    }
    if (Level == 5051) {
        tiles.setCurrentTilemap(tilemap`level5051`)
        enemyList = [
        sprites.create(assets.image`enemyDog`, SpriteKind.Enemy),
        sprites.create(assets.image`enemyMonkey`, SpriteKind.Enemy),
        sprites.create(assets.image`hermitCrabAttack0`, SpriteKind.Enemy),
        sprites.create(assets.image`kaijuBabyWalk4`, SpriteKind.Enemy),
        sprites.create(assets.image`kaijuMomWalk5`, SpriteKind.Enemy),
        sprites.create(assets.image`pigeonIcon`, SpriteKind.Enemy),
        sprites.create(assets.image`skellyAttackLeft2`, SpriteKind.Enemy),
        sprites.create(assets.image`footballPlayer0`, SpriteKind.Enemy)
        ]
        enemyX = [30, 100]
        enemyY = [30, 60]
    }
    if (Level == 5049) {
        tiles.setCurrentTilemap(tilemap`level5049`)
    }
    if (Level == 4950) {
        tiles.setCurrentTilemap(tilemap`level4950`)
    }
    if (playerSprite.tilemapLocation().column == 0) {
        tiles.placeOnTile(playerSprite, tiles.getTileLocation(14, playerSprite.tilemapLocation().row))
    }
    if (playerSprite.tilemapLocation().column == 15) {
        tiles.placeOnTile(playerSprite, tiles.getTileLocation(1, playerSprite.tilemapLocation().row))
    }
    if (playerSprite.tilemapLocation().row == 15) {
        tiles.placeOnTile(playerSprite, tiles.getTileLocation(playerSprite.tilemapLocation().column, 1))
    }
    if (playerSprite.tilemapLocation().row == 0) {
        tiles.placeOnTile(playerSprite, tiles.getTileLocation(playerSprite.tilemapLocation().column, 14))
    }
    for (let index = 0; index <= enemyList.length - 1; index++) {
        enemyList[index].setPosition(enemyX[index], enemyY[index])
        enemyList[index].setVelocity(randint(-20, 20), randint(-20, 20))
        enemyList[index].setStayInScreen(false)
        enemyList[index].setBounceOnWall(true)
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    lastDirection = 0
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    swordOut = 0
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    lastDirection = 3
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 500)
    music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (swordOut == 0 && Wait_time < 0) {
        statusbar.value += -20
        Wait_time = 100
        music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.UntilDone)
    } else {
        if (swordOut == 1) {
            sprites.destroy(otherSprite, effects.spray, 500)
            music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
        }
    }
})
let enemyY: number[] = []
let enemyX: number[] = []
let projectile: Sprite = null
let Wait_time = 0
let swordOut = 0
let enemyList: Sprite[] = []
let statusbar: StatusBarSprite = null
let playerSprite: Sprite = null
let Level = 0
let lastDirection = 0
lastDirection = 0
Level = 5050
playerSprite = sprites.create(assets.image`Tauriel_front`, SpriteKind.Player)
statusbar = statusbars.create(20, 4, StatusBarKind.Health)
statusbar.positionDirection(CollisionDirection.Top)
statusbar.value = 100
statusbar.setColor(10, 4)
controller.moveSprite(playerSprite, 100, 100)
enemyList = []
loadLevel()
tiles.placeOnTile(playerSprite, tiles.getTileLocation(5, 3))
scene.cameraFollowSprite(playerSprite)
swordOut = 0
Wait_time = 0
forever(function () {
    if (playerSprite.tilemapLocation().column < 1) {
        Level += -1
        loadLevel()
    }
    if (playerSprite.tilemapLocation().column > 14) {
        Level += 1
        loadLevel()
    }
    if (playerSprite.tilemapLocation().row < 1) {
        Level += -100
        loadLevel()
    }
    if (playerSprite.tilemapLocation().row > 14) {
        Level += 100
        loadLevel()
    }
    if (statusbar.value == 0) {
        game.gameOver(false)
    }
    Wait_time += -5
})
