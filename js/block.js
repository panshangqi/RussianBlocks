var COLORS = ['#99CC33',
    '#FF6633',
    '#FF0066',
    '#9900FF',
    '#6600FF',
    '#00AA55',
    '#886600',
    '#9370D8'
]
var LIMIT = {
    left: 0,
    right: 9,
    top: 0,
    bottom: 19
}

function Block(_color){
    this.$block = $('<div class="block_rect"></div>')
    let _width = 40
    this.$block.css({
        width: (_width-1) + 'px',
        height: (_width-1) + 'px',
        'background-color': _color,
        'border': '1px solid ' + '#ADFF2F',
        position: 'absolute'
    })
    let left_step = 0
    let top_step = 0
    this.setPos = function(offset_left, offset_top) {
        this.$block.css({
            left: (_width * offset_left) + 'px',
            top: (_width * offset_top) +'px'
        })
        left_step = offset_left
        top_step = offset_top
        this.$block.attr({
            'offset_left': offset_left,
            'offset_top': offset_top
        })
    }
    this.getBlockEle = function () {
        return this.$block
    }
    this.getPos = function () {
        return {
            left: left_step,
            top: top_step
        }
    }
    this.getColor = function () {
        return _color
    }
}
Block.getRandomColor = function(){
    let id = parseInt(10*Math.random())%COLORS.length
    return COLORS[id]
}