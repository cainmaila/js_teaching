function Ghost(x, y, isRight, sc) {
    var texture = PIXI.loader.resources["./images/mc.png"].texture
    var mc = new PIXI.Sprite(texture)
    mc.anchor.set(0.5)
    mc.scale.set(sc)
    if (isRight) {
        mc.scale.x *= -1
    }
    mc.x = x
    mc.y = y
    this.mc = mc

    return this
}

Ghost.prototype.play = function(v) {
    if (this.mc.scale.x > 0) {
        this.mc.x -= v
        if (this.mc.x < 0) {
            this.mc.x = window.innerWidth
        }
    } else {
        this.mc.x += v
        if (this.mc.x > window.innerWidth) {
            this.mc.x = 0
        }
    }
}
