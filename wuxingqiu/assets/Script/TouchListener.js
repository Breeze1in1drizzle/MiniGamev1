cc.Class({
    extends: cc.Component,
    properties: {
        x: 0,
        y: 0,
        speedLimit: 300,
        ball: cc.Component
    },
    onLoad() {
        //监听触摸移动
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move, this);
        //监听触摸在区域内离开
        this.node.on(cc.Node.EventType.TOUCH_END, this.on_touch_end, this);
        //监听触摸在区域外离开
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.on_touch_end, this);
    },
    //触摸监听移动回调函数
    on_touch_move(t) {
        //定义一个n_pos变量存储当前触摸点的位置
        var n_pos = t.getLocation();
        //console.log('n_pos', n_pos, n_pos.x, n_pos.y);
        //console.log('t.getDelta()= ', t.getDelta())

        var delta = t.getDelta();
        var x = this.node.x + delta.x
        var y = this.node.y + delta.y
        if (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) <= 100 - 33.5) {
            this.node.x = x;
            this.node.y = y;
            this.moveBall(x, y);
        }
    },
    //触摸监听离开回调函数
    on_touch_end(t) {
        //触控球恢复原始位置
        this.node.x = 0;
        this.node.y = 0;
    },
    //移动球球
    moveBall: function (x, y) {
        var rigidBody = this.ball
        cc.log('rigidBody', rigidBody)
        //移动
        //var acceleration = this.acceleration
        var v = rigidBody.linearVelocity
        v.x += x * 100
        v.y += y * 100
        if (v.x > this.speedLimit || v.x < -this.speedLimit) {
            return
        }
        rigidBody.linearVelocity = v
    },
    start() {

    },
    update(dt) {

    },
});
