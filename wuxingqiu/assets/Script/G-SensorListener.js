cc.Class({
    extends: cc.Component,
    properties: {
        rigidBody: null,  //
        is_move_hori: null, //
        is_move_verti: null, //
        acceleration: 10,
        speedLimit: 300
    },
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},
    start() {
        this.rigidBody = this.node.getComponent(cc.RigidBody)
        //重力测试
        cc.systemEvent.setAccelerometerEnabled(true);
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    },
    onDeviceMotionEvent: function (event) {
        //cc.log(event.acc.x + "   " + event.acc.y);
        var rigidBody = this.rigidBody
        var nowGX = event.acc.x.toFixed(2);
        var nowGY = event.acc.y.toFixed(2);
        var nowGZ = event.acc.z.toFixed(2);
      //  cc.log('nowGX:' + nowGX + 'nowGY:' + nowGY + 'nowGZ:' + nowGZ);
        // cc.log(event)
        //移动
        var acceleration = this.acceleration
        var v = rigidBody.linearVelocity
        v.x += acceleration * nowGX * 100
        v.y += acceleration * nowGY * 100
        if (v.x > this.speedLimit || v.x < -this.speedLimit) {
            return
        }
        rigidBody.linearVelocity = v
    }
    // update (dt) {},
});
