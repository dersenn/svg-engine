//the main class

class Ngn {
  //by default appends to body.
  constructor(parent = document.body) {
    this.ns = 'http://www.w3.org/2000/svg'
    this.parent = parent
    this.width = this.parent.clientWidth
    this.height = this.parent.clientHeight

    this.init = function() {
      this.stage = document.createElementNS(this.ns, 'svg')
      this.stage.setAttribute('width', this.width)
      this.stage.setAttribute('height', this.height)
      this.stage.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`)
      this.parent.append(this.stage)
    }

    this.init()
  }

  circle(cx, cy, r, fill) {
    let circle = document.createElementNS(this.ns, 'circle')
    circle.setAttribute('cx', cx)
    circle.setAttribute('cy', cy)
    circle.setAttribute('r', r)
    circle.setAttribute('fill', fill)
    this.stage.append(circle)
  }

  rect(ax, ay, bx, by, fill) {
    let circle = document.createElementNS(this.ns, 'circle')
    circle.setAttribute('cx', cx)
    circle.setAttribute('cy', cy)
    circle.setAttribute('r', r)
    circle.setAttribute('fill', fill)
    this.stage.append(circle)
  }


}

let svg = new Ngn()

for (let i = 0; i < 10; i++) {
  // svg.circle(Math.random() * svg.width, Math.random() * svg.height, Math.random() * 50, '#ffffff')
}

let nRows = 10
let nCols = 10

for (let x = 0; x < nRows; x++) {
  for (let y = 0; y < nCols; y++) {
    let w = svg.width / nCols
    let h = svg.height / nRows
    let r = w / 2
    let c = {cx: r + x * w, cy: r + y * h}
    svg.circle(c.cx, c.cy, r, '#000')
  }  
}

console.log(svg)







// My Only Friend, The End.