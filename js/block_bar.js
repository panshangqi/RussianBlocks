function BlockBar(){

    //_type 0 四连横  1 四连竖
    let _type = parseInt(10*Math.random())%2;
    let block_arr = []
    let color = Block.getRandomColor()
    let points = []
    if(_type === 0){
        points = [[3,0],[4,0],[5,0],[6,0]]
    }else if(_type === 1){
        points = [[4,0],[4,1],[4,2],[4,3]]
    }
    for(let i=0;i<4;i++){
        let block = new Block(color)
        block.setPos(points[i][0], points[i][1])
        block_arr.push(block)
    }
    this.getBlocks = function () {
        return block_arr
    }
    this.rotate = function (filled_map) {
        let points = []
        if(_type == 0){
            let block = block_arr[3] //横向的第三个方块作为竖向的第三块
            let pos = block.getPos()
            points.push([pos.left, pos.top - 2])
            points.push([pos.left, pos.top  - 1])
            points.push([pos.left, pos.top ])
            points.push([pos.left, pos.top  + 1])

            _type = 1
        }else if(_type == 1){

            let block = block_arr[3] //横向的第三个方块作为竖向的第三块
            let pos = block.getPos()
            points.push([pos.left - 2, pos.top])
            points.push([pos.left - 1, pos.top])
            points.push([pos.left, pos.top])
            points.push([pos.left + 1, pos.top])

            _type = 0
        }
        for(let p of points){
            if(filled_map[p[0]+'_'+p[1]])  //有碰撞，不能旋转
                return
        }
        for(let i=0;i<block_arr.length;i++){
            let block = block_arr[i]
            block.setPos(points[i][0], points[i][1])
        }
    }
}