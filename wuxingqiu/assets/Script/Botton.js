cc.Class({
    extends: cc.Component,
    properties: {
        leftMove: false,
        rightMove: false,
        hidePosi: 0,//隐藏时的位置
        showPosi: 0,//展示时的位置
        hideSpeed: 0,//隐藏速度
        showSpeed: 0,//展开速度
    },
    onLoad() {
        this.node.getChildByName('hide').active = false
    },
    start() {
    },
    clickBotton(obj, data) {
        if (data == 'show') {
            this.leftMove = true
            this.node.getChildByName('hide').active = true
            this.node.getChildByName('show').active = false
        }
        else if (data == 'hide') {
            this.rightMove = true
            this.node.getChildByName('show').active = true
            this.node.getChildByName('hide').active = false
        }
    },
    update(dt) {
       /* if (this.leftMove == true) {//860->640
            var move = dt * this,showSpeed
            this.node.x += move
            if (this.node.x > -420) {
                this.node.x = -420
                this.leftMove = false
            }
        }
        else if (this.rightMove == true) {//860->640
            var move = dt * this.hideSpeed
            this.node.x -= move
            if (this.node.x < -640) {
                this.node.x = this.hidePosi
                this.rightMove = false
            }
        }*/
        if (this.leftMove == true) {//860->640
            var move = dt * this.showSpeed//500
            this.node.x += move
            if (this.node.x > this.showPosi) {
                this.node.x = this.showPosi
                this.leftMove = false
            }
        }
        else if (this.rightMove == true) {//860->640
            var move = dt * this.hideSpeed
            this.node.x -= move
            if (this.node.x < this.hidePosi) {
                this.node.x = this.hidePosi
                this.rightMove = false
            }
        }
    },
});
