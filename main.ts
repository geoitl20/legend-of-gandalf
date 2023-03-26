controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
function loadLevel () {
    if (Level == 5050) {
        tiles.setCurrentTilemap(tilemap`level5050`)
    }
    if (Level == 5051) {
        tiles.setCurrentTilemap(tilemap`level5051`)
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
}
let playerSprite: Sprite = null
let Level = 0
Level = 5050
playerSprite = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(playerSprite, 100, 100)
loadLevel()
tiles.placeOnTile(playerSprite, tiles.getTileLocation(5, 3))
scene.cameraFollowSprite(playerSprite)
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
})
