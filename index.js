var curBlockObj = null
let timer = null
var filled_map = {}
let filledBlocks = []
let total_score = 0
let score_weight = [0,10,30,50,80] //分数权重
for(let i=LIMIT.top-1; i<=LIMIT.top + 20;i++){
    for(let j=LIMIT.left-1; j<=LIMIT.left + 10;j++)
    {
        if(j>=LIMIT.left && j<=LIMIT.right && i>=LIMIT.top && i<=LIMIT.bottom)
            filled_map[j+'_'+i] = false
        else
            filled_map[j+'_'+i] = true
    }
}
console.log(filled_map)
function isGameOver(blocks){
    for(let b of blocks){
        let pos = b.getPos()
        if(filled_map[pos.left + '_' + pos.top] === true){
            return true
        }
    }
    return false
}
function MoveDown(blocks){  //碰撞及边缘检测
    for(let b of blocks){
        let pos = b.getPos()

        if(filled_map[pos.left + '_' + (pos.top+1)] === true){

            return false
        }
    }
    for(let b of blocks){
        let pos = b.getPos()
        b.setPos(pos.left , pos.top + 1)
    }
    return true
}
function MoveLeft(blocks, offset){
    for(let b of blocks){
        let pos = b.getPos()
        if(filled_map[(pos.left - 1) + '_' + pos.top] === true){
            return false
        }
    }
    for(let b of blocks){
        let pos = b.getPos()
        b.setPos(pos.left - 1 , pos.top)
    }
    return true
}
function MoveRight(blocks){
    for(let b of blocks){
        let pos = b.getPos()
        if(filled_map[(pos.left + 1) + '_' + pos.top] === true){
            return false
        }
    }
    for(let b of blocks){
        let pos = b.getPos()
        b.setPos(pos.left + 1 , pos.top)
    }
    return true
}
function DeleteRows(){ //消行判断
    let filled_down = {}  //消行判断记录每个元素下落几行
    let moreRow = 0
    for(let row = LIMIT.bottom; row >=0; row--){
        let isRowFill = true
        for(let col= 0; col <= LIMIT.right; col++){
            if(filled_map[col+'_'+row] == false){
                isRowFill = false
                break
            }
        }
        if(isRowFill){
            moreRow++
            $('#game_area').find('.block_rect').each(function () {
                let left = $(this).attr('offset_left')
                let top = parseInt($(this).attr('offset_top'))
                if(top <= row){  //TODO <=很重要
                    if(!filled_down[left+'_'+top]){
                        filled_down[left+'_'+top] = 1
                    }else{
                        filled_down[left+'_'+top] += 1
                    }
                }
                if(top == row){
                    $(this).css('background-color', '#000')
                    $(this).remove()
                } //消除满行，且把满行以上都标记为false
            })
        }
    }
    for(let key in filled_down){
        filled_map[key] = false
    }
    $('#game_area').find('.block_rect').each(function () {
        let left = $(this).attr('offset_left')
        let top = parseInt($(this).attr('offset_top'))
        let step = filled_down[left+'_'+top]
        if(step){
            $(this).css('top', ((top+step)*40)+'px')
            $(this).attr('offset_top', (top+step))
            filled_map[left+'_'+(top+step)] = true
        }else{
            //TODO
            console.log('一定是什么地方有问题')
        }
    })
    total_score += score_weight[moreRow]
    $('#score').html(total_score)
}
function createElement(){
    curBlockObj = new BlockBar()
    var blocks = curBlockObj.getBlocks()
    for(let b of blocks)
        $('#game_area_face').append(b.getBlockEle())
}
function gameStart() {
    createElement()

    timer = setInterval(function () {

        var blocks = curBlockObj.getBlocks()
        if(isGameOver(blocks)){
            if(timer){
                clearInterval(timer)
                timer = null
                console.log('timer clear')
            }

            console.log('game over')
            return
        }
        if(!MoveDown(blocks)) {
            $('#game_area_face').empty()
            for(let b of blocks){
                let pos = b.getPos()
                filled_map[pos.left +'_' + pos.top] = true
                filledBlocks.push(b)
                $('#game_area').append(b.getBlockEle())
            }
            DeleteRows()
            createElement()
        }
    },400)
}

$('#start_btn').click(function () {
    gameStart()
})
document.onkeydown = function (event) {
    var event = event || window.event
    console.log(event.keyCode)
    if(38 == event.keyCode){ //上箭头
        curBlockObj.rotate(filled_map)
    }else if(37 == event.keyCode){ //左箭头
        var blocks = curBlockObj.getBlocks()
        MoveLeft(blocks)
    }else if(39 == event.keyCode){ //右箭头
        var blocks = curBlockObj.getBlocks()
        MoveRight(blocks)
    }else if(40 == event.keyCode){ //下箭头
        var blocks = curBlockObj.getBlocks()
        MoveDown(blocks)
    }
}