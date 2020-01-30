cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //碰撞管理器启动
        cc.director.getCollisionManager().enabled = true
    },

    start() {

    },
    //碰撞产生时回调函数
    onCollisionEnter: function (other, self) {
        //消失吧，人类！
       // this.node.getParent().active = false
    },
    // update (dt) {},
});
