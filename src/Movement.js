class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    init() {
        this.PLAYER_VELOCITY = 350
    }

    preload() {
        this.load.spritesheet('character','./assets/spritesheets/Character_002.png', {
            frameWidth: 48

        })
    }

    create() {
        this.cameras.main.setBackgroundColor(0xDDDDDD)
        this.player = this.physics.add.sprite(width/2, height/2, 'character', 1).setScale(2)
        this.player.body.setCollideWorldBounds(true)
        this.player.body.setSize(32, 32).setOffset(8, 16)

        this.anims.create({
            key: 'idle-down',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 1,
                end: 1
            })
        })

        this.anims.create({
            key: 'walk-down',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 0,
                end: 2
            })
        })

        this.anims.create({
            key: 'walk-up',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 9,
                end: 11
            })
        })

        this.anims.create({
            key: 'walk-left',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 3,
                end: 5
            })
        })

        this.anims.create({
            key: 'walk-right',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 6,
                end: 8
            })
        })

        cursors = this.input.keyboard.createCursorKeys()
        
    }

    update() {

        // this.player.play('walk-down', true)
        let playerVector = new Phaser.Math.Vector2(0, 0)
        let playerDirection = 'down'
        
        //Left/Right
        if(cursors.left.isDown) {
            playerVector.x = -1
            playerDirection = 'left'
        } else if (cursors.right.isDown) {
            playerVector.x = 1
            playerDirection = 'right'
        }

        //Up/Down
        if(cursors.up.isDown) {
            playerVector.y = -1
            playerDirection = 'up'
        } else if (cursors.down.isDown) {
            playerVector.y = 1
            playerDirection = 'down'
        }

        playerVector.normalize()

        // this.player.x += playerVector.x * this.PLAYER_VELOCITY
        // this.player.y += playerVector.y * this.PLAYER_VELOCITY

        this.player.setVelocity(this.PLAYER_VELOCITY*playerVector.x, this.PLAYER_VELOCITY*playerVector.y)

        let playerMovment
        playerVector.length() ? playerMovment = 'walk' : playerMovment = 'idle'
        this.player.play(playerMovment + '-' + playerDirection, true)
    }

}