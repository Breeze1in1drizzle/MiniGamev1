let mapData = require("MapData");
cc.Class({
    extends: cc.Component,
    properties: {
        blood: 2,
        isIntoObstacle: false,
        //地图数组
        array: null
    },
    onLoad() {
        //取地图的数据，为二维数组形式，关卡下标从0开始
        this.array = mapData.getMapData(0)
        //碰撞管理器启动
        cc.director.getCollisionManager().enabled = true
    },
    //球spriteFrame,用于更改图片,2：金球 3：木球 4：水球 5：火球  6：土球
    //球spriteFrame,用于更改图片,7：金障碍 8：木障碍  9：水障碍 10：火障碍 11：土障碍 
    //克制:2->8,3->8,6->9,4->10,5->7
    //碰撞产生时回调函数
    getDiminution(obstacleTag, ballTag){

    },
    onCollisionEnter: function (other, self) {
        cc.log('other:',other.tag,'self:',self.tag)
        //碰到的是终点
        if (other.tag == 1) {

        }
        //碰到的是障碍物
        else if (other.tag == 2) {
            if (this.isIntoObstacle == false) {
                //球克障碍，不扣血
                //障碍克球，扣一滴血
                //互不克制，扣两滴血
                let diminution = this.getDiminution(other.tag, self.tag)
                this.blood -= 1
                this.isIntoObstacle = true
            }
        }
        //碰到转换机
        else if (other.tag >= 21) {
            //cc.log(other.getParent())
            //定义转换次数
            let changeTime = other.tag - 20
            //转换机父节点
            let switchNode = other.node.getParent()
            //球球父节点
            let ballNode = self.node
            //转换机消失
            switchNode.active = false
            //球球转到转换机的位置
            ballNode.setPosition(switchNode.getPosition().x, switchNode.getPosition().y);
            //转换属性
            for (let i = 1; i <= changeTime; i++) {

            }
        }
    },
    //碰撞保持时回调函数
    onCollisionStay: function (other, self) {

    },
    //碰撞结束时回调函数
    onCollisionExit: function (other, self) {
        //碰到的是终点，胜利
        if (other.tag == 1) {

        }
        //碰到的是障碍物
        else if (other.tag == 2) {
            let x = parseInt(this.node.getPosition().x / 40)
            let y = parseInt(this.node.getPosition().y / 40)
            let array = this.array
            let row = array.length
            if (array[row - 1 - y][x] == 0)
                this.isIntoObstacle = false
        }
    },
    start() {
    },
    update(dt) {
        // cc.log('血-1: ', this.blood)
    },
});
