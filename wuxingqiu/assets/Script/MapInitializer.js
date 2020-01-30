let mapData = require("MapData");
cc.Class({
    extends: cc.Component,
    properties: {
        //砖块预制体
        brick: {
            type: cc.Prefab,
            default: null
        },
        //障碍预制体
        obstacle: {
            type: cc.Prefab,
            default: null
        },
        //球预制体
        ball: {
            type: cc.Prefab,
            default: null
        },
        //终点预制体
        terminalPoint: {
            type: cc.Prefab,
            default: null
        },
        //转换机预制体
        switch: {
            type: cc.Prefab,
            default: null
        },
        //球spriteFrame,用于更改图片,2：金球 3：木球 4：水球 5：火球  6：土球
        metalBallSprite: cc.SpriteFrame,
        woodenBallSprite: cc.SpriteFrame,
        waterBallSprite: cc.SpriteFrame,
        fireBallSprite: cc.SpriteFrame,
        soilBallSprite: cc.SpriteFrame,
        //球spriteFrame,用于更改图片,7：金障碍 8：木障碍  9：水障碍 10：火障碍 11：土障碍 
        metalObstacleSprite: cc.SpriteFrame,
        woodenObstacleSprite: cc.SpriteFrame,
        waterObstacleSprite: cc.SpriteFrame,
        fireObstacleSprite: cc.SpriteFrame,
        soilObstacleSprite: cc.SpriteFrame
    },
    // use this for initialization
    onLoad: function () {
        //cc.log('mapData', mapData.getMapData(0))
        // 使用给定的模板在场景中生成一个新节点
        var brick = this.brick
        //取地图的数据，为二维数组形式，关卡下标从0开始
        let array = mapData.getMapData(0)
        //地图数据的长和宽，row为行数，list为列数
        let row = array.length
        let list = array[0].length
        //预加载预制体
        let cube = cc.instantiate(brick);
        //球实体，为了防止球被其他物体遮住，只能最后在add到node里面去,所以这里定义个变量先把节点存起来
        let ball = null
        //循环输出地图
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < list; j++) {//1.  0, 40*17
                if (array[i][j] == 0) continue
                //球的初始化,2：金球 3：木球 4：水球 5：火球  6：土球
                else if (array[i][j] >= 2 && array[i][j] <= 6) {
                    ball = this.ballInitializer(i, j)
                    continue
                }
                //障碍初始化,7：金障碍 8：木障碍  9：水障碍 10：火障碍 11：土障碍 
                else if (array[i][j] >= 7 && array[i][j] <= 11) {
                    this.obstacleInitializer(i, j)
                    continue
                }
                //12：终点
                else if (array[i][j] == 12) {
                    //创建并初始化终点节点
                    let cube = cc.instantiate(this.terminalPoint);
                    // 将新增的节点添加到 Canvas 节点下面
                    this.node.addChild(cube);
                    cube.setPosition(cc.v2(j * 40, (row - 1 - i) * 40));
                    continue
                }
                //转换机初始化，为了方便起从20开始，20代表转换一次，21为两次，依次类推
                else if (array[i][j] >= 20) {
                    //创建并初始化节点
                    let cube = cc.instantiate(this.switch)
                    //修改label的string,从1开始
                    cube.getChildByName('changeTime').getComponent(cc.Label).string = array[i][j] - 20
                    //修改collider的tag，从21开始
                    cube.getChildByName('collider').getComponent(cc.BoxCollider).tag = array[i][j]
                    // 将新增的节点添加到 Canvas 节点下面
                    this.node.addChild(cube);
                    cube.setPosition(cc.v2(j * 40, (row - 1 - i) * 40));
                    continue
                }
                //创建并初始化节点
                let cube = cc.instantiate(brick);
                // 将新增的节点添加到 Canvas 节点下面
                this.node.addChild(cube);
                cube.setPosition(cc.v2(j * 40, (row - 1 - i) * 40));
                //cc.log(cube.anchor)
            }
        }
        //最后再add入小球
        this.node.addChild(ball);
    },
    //球的初始化
    ballInitializer(i, j) {
        //创建并初始化障碍物节点
        let ball = cc.instantiate(this.ball);
        //取地图的数据，为二维数组形式，关卡下标从0开始
        let array = mapData.getMapData(0)
        //地图数据的长和宽，row为行数，list为列数
        let row = array.length
        let list = array[0].length
        //球的标识
        let ballNum = array[i][j]
        //设置球的tag
        ball.getComponent(cc.CircleCollider).tag = array[i][j]
        //设置spriteFrame
        switch (ballNum) {
            case 2://金球
                ball.getChildByName('background').getComponent(cc.Sprite).spriteFrame = this.metalBallSprite
                break
            case 3://木球
                ball.getChildByName('background').getComponent(cc.Sprite).spriteFrame = this.woodenBallSprite
                break
            case 4://水球
                ball.getChildByName('background').getComponent(cc.Sprite).spriteFrame = this.waterBallSprite
                break
            case 5://火球
                ball.getChildByName('background').getComponent(cc.Sprite).spriteFrame = this.fireBallSprite
                break
            case 6://土球
                ball.getChildByName('background').getComponent(cc.Sprite).spriteFrame = this.soilBallSprite
                break
        }
        //设置小球的位置
        ball.setPosition(cc.v2(j * 40 + 20, (row - 1 - i) * 40 + 20));
        //返回小球实体
        return ball
    },
    //障碍初始化
    obstacleInitializer(i, j) {
        //创建并初始化障碍物节点
        let obstacle = cc.instantiate(this.obstacle);
        //取地图的数据，为二维数组形式，关卡下标从0开始
        let array = mapData.getMapData(0)
        //地图数据的长和宽，row为行数，list为列数
        let row = array.length
        let list = array[0].length
        //障碍的标志
        let obstacleNum = array[i][j]
        //设置obstacle
        //设置障碍的tag,7：金障碍 8：木障碍  9：水障碍 10：火障碍 11：土障碍 
        obstacle.getComponent(cc.BoxCollider).tag = array[i][j]
        switch (obstacleNum) {
            case 7://金障碍
                obstacle.getComponent(cc.Sprite).spriteFrame = this.metalObstacleSprite
                break
            case 8://木障碍
                obstacle.getComponent(cc.Sprite).spriteFrame = this.woodenObstacleSprite
                break
            case 9://水障碍
                obstacle.getComponent(cc.Sprite).spriteFrame = this.waterObstacleSprite
                break
            case 10://火障碍
                obstacle.getComponent(cc.Sprite).spriteFrame = this.fireObstacleSprite
                break
            case 11://土障碍
                obstacle.getComponent(cc.Sprite).spriteFrame = this.soilObstacleSprite
                break
        }
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(obstacle);
        obstacle.setPosition(cc.v2(j * 40, (row - 1 - i) * 40));
    },
    // called every frame
    update: function (dt) {

    }
});
