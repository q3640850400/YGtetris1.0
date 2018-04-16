const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const btnCTRL = 80 //按钮大小
const mapcol = 12 //地图的总列数
const pix = screenWidth / 2 / mapcol //每个方块格的长度
const pix_mini = pix / 2//小方格的长度
const screenleft = screenWidth / 8 //地图左边距
const screenup = screenHeight / 5 //地图上边距
const headleft = screenWidth / 10; const headup = screenHeight / 40 //头像位置
const screenleft_mini = 220//小地图左边距
const screenup_mini = 100 //小地图上边距
var ready_btnArea, left_btnArea, right_btnArea, turn_btnArea
var tertris1 = 'images/tetris2.png'
var View_IMG_SRC = new Image()
View_IMG_SRC.src = tertris1
var tetris = [[0x0660], [0x2222, 0xf00], [0xc600, 0x2640], [0x6c00, 0x4620], [0x4460, 0x2e0, 0x6220, 0x740], [0x2260, 0xe20, 0x6440, 0x4700], [0x2620, 0x720, 0x2320, 0x2700]]

export default class GameView {
  constructor(ctx) {
    this._ctx = ctx
    this.ready_btnArea = { startX: 230, startY: 50, endX: 230 + pix * 4, endY: 50 + pix * 2 }
    this.left_btnArea = { startX: screenleft - 10, startY: 420, endX: screenleft + 30, endY: 420+40 }
    this.right_btnArea = { startX: 230, startY: 50, endX: 230 + pix * 4, endY: 50 + pix * 2 }
    this.turn_btnArea = { startX: 230, startY: 50, endX: 230 + pix * 4, endY: 50 + pix * 2 }
  }

  renderBackGround(ctx) {
    ctx.drawImage(View_IMG_SRC, 186, 893, 491, 978, screenleft + pix, screenup, pix * 10, pix * 20)//方块池
    ctx.drawImage(View_IMG_SRC, 186, 893, 491, 978, screenleft_mini + pix_mini, screenup_mini, pix_mini * 10, pix_mini * 20)//方块池2
    ctx.drawImage(View_IMG_SRC, 48, 779, 585, 116, headleft, screenup - 30, 170, 30)//草
    ctx.drawImage(View_IMG_SRC, 623, 463, 565, 69, headleft, headup + 5, 170, 30)//分数盘
    ctx.drawImage(View_IMG_SRC, 0, 254, 127, 125, headleft, headup, 20, 20) //头像
  }
  renderControlPanal(ctx) {
    ctx.drawImage(View_IMG_SRC, 36, 418, 315, 318, screenleft - 10, 420, pix * 10, pix * 10)//方向键
    ctx.drawImage(View_IMG_SRC, 360, 457, 272, 272, screenleft + 150, 440, pix * 6, pix * 6)//旋转键
    ctx.drawImage(View_IMG_SRC, 1140, 296, 152, 84, 230, 50, pix * 4, pix * 2)//准备键
  }
  renderGameScore(ctx, score) {
    for (let i = 0; score > 0; i++) {
      let num = score % 10
      score = Math.floor(score / 10)
      ctx.drawImage(View_IMG_SRC, 377, 0, 48, 69, 160 - i * 15, 15, 12, 17)
    }
  }
  /**
   * 下落方块渲染
   */
  renderTetris(ctx, cot, bak) {
    let t = 0x8000  //定义一个最高位为1的16位16进制数，和方块逐位作与运算，大于0的就画出相应的方块粒
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        //console.log(t & tetris[cot][bak.s], j, i)
        if ((t & tetris[cot][bak.s]) > 0) {
          ctx.drawImage(View_IMG_SRC, 48 * cot, 0, 48, 48, screenleft + (bak.x + j) * pix, screenup + (bak.y + i) * pix, pix, pix)
        }
        t >>= 1
      }
    }
  }
  /**
   * 堆叠方块渲染
   */
  renderTetrispool(ctx, map, color) {
    for (let i = 0; i < 21; i++) {
      let t = 0x800
      for (let j = 0; j < mapcol; j++) {
        //console.log(t & tetris[cot][bak.s], j, i)
        if ((t & map[i]) > 0) {
          ctx.drawImage(View_IMG_SRC, 48 * color[i][j], 0, 48, 48, screenleft + j * pix, screenup + i * pix, pix, pix)
        }
        t >>= 1
      }
    }
  }
  renderOthers(ctx, map, color) {
    for (let i = 0; i < 21; i++) {
      let t = 0x800
      for (let j = 0; j < mapcol; j++) {
        //console.log(t & tetris[cot][bak.s], j, i)
        if ((t & map[i]) > 0) {
          ctx.drawImage(View_IMG_SRC, 48 * color[i][j], 0, 48, 48, screenleft_mini + j * pix_mini, screenup_mini + i * pix_mini, pix_mini, pix_mini)
        }
        t >>= 1
      }
    }
  }

  renderGameOver(ctx, score) {
    ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 150, screenHeight / 2 - 100, 300, 300)

    ctx.fillStyle = "#ffffff"
    ctx.font = "20px Arial"

    ctx.fillText(
      '游戏结束',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 50
    )

    ctx.fillText(
      '得分: ' + score,
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 130
    )

    ctx.drawImage(
      atlas,
      120, 6, 39, 24,
      screenWidth / 2 - 60,
      screenHeight / 2 - 100 + 180,
      120, 40
    )

    ctx.fillText(
      '重新开始',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 205
    )

  }

}

