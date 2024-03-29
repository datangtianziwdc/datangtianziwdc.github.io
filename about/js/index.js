console.clear()
var sX,
  sY,
  nX,
  nY,
  desX = 0,
  desY = 0,
  tX = 0,
  tY = 10
let moveX = 0
let moveY = 0
let moveFlg = false
let clientXStart = 0
let clientYStart = 0
let clientXEnd = 0
let clientYEnd = 0
let rotateSpeed = 0.0001
// Get the canvas element from the DOM
const canvas = document.querySelector('#scene')
canvas.width = canvas.clientWidth
canvas.height = canvas.clientHeight
// Store the 2D context
const ctx = canvas.getContext('2d')
if (window.devicePixelRatio > 1) {
  canvas.width = canvas.clientWidth * 2
  canvas.height = canvas.clientHeight * 2
  ctx.scale(2, 2)
}
ctx.rotate(Math.PI * 2)

/* ====================== */
/* ====== VARIABLES ===== */
/* ====================== */
let width = canvas.clientWidth // Width of the canvas
let height = canvas.clientHeight // Height of the canvas
let rotation = 0 // Rotation of the globe
let dots = [] // Every dots in an array

/* ====================== */
/* ====== CONSTANTS ===== */
/* ====================== */
/* Some of those constants may change if the user resizes their screen but I still strongly believe they belong to the Constants part of the variables */
const DOTS_AMOUNT = 99 // 点数量
const DOT_RADIUS = 4 // Radius of the dots
let GLOBE_RADIUS = width * 0.7 // Radius of the globe
let GLOBE_CENTER_Z = -GLOBE_RADIUS // Z value of the globe center
let PROJECTION_CENTER_X = width / 2 // X center of the canvas HTML
let PROJECTION_CENTER_Y = height / 2 // Y center of the canvas HTML
let FIELD_OF_VIEW = width * 0.8
const tags = [
  '猫',
  '梦想化',
  '诚实',
  '勤劳',
  '先知',
  '我不懂',
  '搞怪',
  '文字',
  '平和',
  '倔强',
  '朴素',
  '身材苗条',
  '神人',
  '一风情万种',
  '少女梦',
  '财迷',
  '非主流',
  '铲屎官',
]
const colors = ['#00ff00', '#ffff00', '#3385ff']

class Dot {
  constructor(x, y, z, tag, color) {
    this.x = x
    this.y = y
    this.z = z
    this.tag = tag
    this.color = color
    this.xProject = 0
    this.yProject = 0
    this.sizeProjection = 0
  }
  // Do some math to project the 3D position into the 2D canvas
  project(sin, cos) {
    const rotX = cos * this.x + sin * (this.z - GLOBE_CENTER_Z)
    const rotZ =
      -sin * this.x + cos * (this.z - GLOBE_CENTER_Z) + GLOBE_CENTER_Z
    this.sizeProjection = FIELD_OF_VIEW / (FIELD_OF_VIEW - rotZ)
    this.xProject = rotX * this.sizeProjection + PROJECTION_CENTER_X
    this.yProject = this.y * this.sizeProjection + PROJECTION_CENTER_Y
  }
  // 绘制点
  draw(sin, cos) {
    this.project(sin, cos)
    // ctx.fillRect(
    //   this.xProject - DOT_RADIUS,
    //   this.yProject - DOT_RADIUS,
    //   DOT_RADIUS * 2 * this.sizeProjection,
    //   DOT_RADIUS * 2 * this.sizeProjection
    // )
    // ctx.fillStyle = 'yellow'
    // ctx.fillRect(
    //   this.xProject - DOT_RADIUS,
    //   this.yProject - 4 * DOT_RADIUS,
    //   DOT_RADIUS * 2,
    //   DOT_RADIUS * 2
    // )
    ctx.fillStyle = '#f2f2f2'
    ctx.font = `${20 * this.sizeProjection}px Arial`
    // var txt = 'Hello World'
    var txt = this.tag
    ctx.fillText(
      txt,
      this.xProject - ctx.measureText(txt).width / 2,
      this.yProject - 4 * DOT_RADIUS
    )
    ctx.beginPath()
    ctx.arc(
      this.xProject,
      this.yProject,
      DOT_RADIUS * this.sizeProjection,
      0,
      Math.PI * 2
    )
    ctx.closePath()
    ctx.fillStyle = this.color
    // ctx.fillStyle = '#ccccff'
    // ctx.closePath()//闭合轨迹 会把线连接到某一点形成闭合轨迹
    ctx.fill()
  }
}
/**
 * 创建点集合
 */
function createDots() {
  // Empty the array of dots
  dots.length = 0

  // Create a new dot based on the amount needed
  // for (let i = 0; i < DOTS_AMOUNT; i++) {
  //   const theta = Math.random() * 2 * Math.PI // Random value between [0, 2PI]
  //   const phi = Math.acos(Math.random() * 2 - 1) // Random value between [-1, 1]

  //   // Calculate the [x, y, z] coordinates of the dot along the globe
  //   const x = GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta)
  //   const y = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta)
  //   const z = GLOBE_RADIUS * Math.cos(phi) + GLOBE_CENTER_Z
  //   dots.push(new Dot(x, y, z))
  // }
  const arr1 = []
  let val1 = 0
  for (let i = 0; i < DOTS_AMOUNT; i++) {
    val1 += 0.99 / DOTS_AMOUNT
    arr1.push(val1)
  }
  // const arr2 = []
  // let val2 = 0.5
  // for (let i = 0; i < DOTS_AMOUNT; i++) {
  //   val2 += 0.99 / DOTS_AMOUNT
  //   arr2.push(val2)
  // }
  for (let i = 0; i < DOTS_AMOUNT; i++) {
    // 生成的点坐标
    const val = Math.random()
    // const val = arr1[DOTS_AMOUNT - i]

    const theta = val * 2 * Math.PI // Random value between [0, 2PI]
    // console.log('随机数', Math.random())
    // const phi = Math.acos(Math.random() * 2 - 1) // Random value between [-1, 1]
    const phi = Math.acos(arr1[i] * 2 - 1) // Random value between [-1, 1]

    // Calculate the [x, y, z] coordinates of the dot along the globe
    const x = GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta)
    const y = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta)
    const z = GLOBE_RADIUS * Math.cos(phi) + GLOBE_CENTER_Z
    dots.push(
      new Dot(x, y, z, tags[i % tags.length], colors[i % colors.length])
    )
  }
}

/* ====================== */
/* ======== RENDER ====== */
/* ====================== */
function render(a) {
  console.log("render",a)
  // Clear the scene
  ctx.clearRect(0, 0, width, height)
  //   旋转速度
  // Increase the globe rotation
  rotation = a * rotateSpeed

  const sineRotation = Math.sin(rotation) // Sine of the rotation
  const cosineRotation = Math.cos(rotation) // Cosine of the rotation

  // Loop through the dots array and draw every dot
  for (var i = 0; i < dots.length; i++) {
    dots[i].draw(sineRotation, cosineRotation)
  }

  window.requestAnimationFrame(render)
}

// Function called after the user resized its screen
function afterResize() {
  width = canvas.offsetWidth
  height = canvas.offsetHeight
  if (window.devicePixelRatio > 1) {
    canvas.width = canvas.clientWidth * 2
    canvas.height = canvas.clientHeight * 2
    ctx.scale(2, 2)
  } else {
    canvas.width = width
    canvas.height = height
  }
  GLOBE_RADIUS = width * 0.7
  GLOBE_CENTER_Z = -GLOBE_RADIUS
  PROJECTION_CENTER_X = width / 2
  PROJECTION_CENTER_Y = height / 2
  FIELD_OF_VIEW = width * 0.8

  createDots() // Reset all dots
}

// Variable used to store a timeout when user resized its screen
let resizeTimeout
// Function called right after user resized its screen
function onResize() {
  // Clear the timeout variable
  resizeTimeout = window.clearTimeout(resizeTimeout)
  // Store a new timeout to avoid calling afterResize for every resize event
  resizeTimeout = window.setTimeout(afterResize, 500)
}
window.addEventListener('resize', onResize)
// 鼠标位置
let mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
}
// Populate the dots array with random dots
createDots()
// Render the scene
window.requestAnimationFrame(render)
console.log('对象', ctx)
// ctx.canvas.addEventListener(
//   'mousedown',
//   (e) => {
//     moveFlg = true
//     moveX = 0
//     moveY = 0
//     // console.log('鼠标按下', e)
//     clientXStart = e.screenX
//     clientYStart = e.screenY
//   },
//   false
// )
// ctx.canvas.addEventListener(
//   'mouseup',
//   (e) => {
//     moveFlg = false
//     // console.log('鼠标抬起', e)
//     clientXEnd = e.screenX
//     clientYEnd = e.screenY
//     moveX = clientXEnd - clientXStart
//     moveY = clientYEnd - clientYStart
//     console.log(
//       '横向移动距离',
//       moveX,
//       '纵向移动距离',
//       moveY
//       // ctx.getTransform()
//     )
//     if (moveX > 0) {
//       rotateSpeed = rotateSpeed * 2
//     } else {
//       rotateSpeed = rotateSpeed / 2
//     }
//   },
//   false
// )
function applyTranform(obj) {
  // Constrain the angle of camera (between 0 and 180)
  if (tY > 180) tY = 180
  if (tY < 0) tY = 0

  // Apply the angle
  obj.style.transform = 'rotateX(' + -tY + 'deg) rotateY(' + tX + 'deg)'
}
// function playSpin(yes) {
//   ospin.style.animationPlayState = yes ? 'running' : 'paused'
// }

// setup events
// document.onpointerdown = function (e) {
//   console.log('onpointerdown', e)
//   clearInterval(canvas.timer)
//   e = e || window.event
//   var sX = e.clientX,
//     sY = e.clientY

//   this.onpointermove = function (e) {
//     console.log('onpointermove', e)
//     e = e || window.event
//     var nX = e.clientX,
//       nY = e.clientY
//     desX = nX - sX
//     desY = nY - sY
//     tX += desX * 0.1
//     tY += desY * 0.1
//     applyTranform(canvas)
//     sX = nX
//     sY = nY
//   }

//   this.onpointerup = function (e) {
//     console.log('onpointerup', e)
//     canvas.timer = setInterval(function () {
//       desX *= 0.95
//       desY *= 0.95
//       tX += desX * 0.1
//       tY += desY * 0.1
//       applyTranform(canvas)
//       // playSpin(false)
//       if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
//         clearInterval(canvas.timer)
//         // playSpin(true)
//       }
//     }, 17)
//     this.onpointermove = this.onpointerup = null
//   }

//   return false
// }
