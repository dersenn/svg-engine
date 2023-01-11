//the main class

class SVG {
  //by default appends to body.
  constructor(setup) {
    this.ns = 'http://www.w3.org/2000/svg'
    this.xl = 'http://www.w3.org/1999/xlink'
    this.parent = setup.parent
    this.w = this.parent.clientWidth
    this.h = this.parent.clientHeight
    this.els = []

    this.init = function() {
      this.stage = document.createElementNS(this.ns, 'svg')
      this.stage.setAttribute('width', this.w)
      this.stage.setAttribute('height', this.h)
      this.stage.setAttribute('viewBox', `0 0 ${this.w} ${this.h}`)
      this.stage.setAttribute('xmlns', this.ns)
      this.stage.setAttribute('xmlns:xlink', this.xl)
      this.stage.setAttribute('preserveAspectRatio', setup.presAspect)
      this.parent.append(this.stage)
    }

    this.init()
  }

  draw() {
    for (let e = 0; e < this.els.length; e++) {
      this.stage.append(this.els[e])
    }
  }

  makeLine(a, b, stroke = 'transparent', strokeW = 1) {
    let line = document.createElementNS(this.ns, 'line')
    line.setAttribute('x1', a.x)
    line.setAttribute('y1', a.y)
    line.setAttribute('x2', b.x)
    line.setAttribute('y2', b.y)
    line.setAttribute('stroke', stroke)
    line.setAttribute('stroke-width', strokeW)
    this.els.push(line)
  }

  makeCircle(c, r, fill = 'transparent', stroke = 'transparent', strokeW = 0) {
    let circle = document.createElementNS(this.ns, 'circle')
    circle.setAttribute('cx', c.x)
    circle.setAttribute('cy', c.y)
    circle.setAttribute('r', r)
    circle.setAttribute('fill', fill)
    circle.setAttribute('stroke', stroke)
    circle.setAttribute('stroke-width', strokeW)
    this.els.push(circle)
  }

  makeEllipse(c, rx, ry, fill = 'transparent', stroke = 'transparent', strokeW = 0) {
    let ellipse = document.createElementNS(this.ns, 'ellipse')
    ellipse.setAttribute('cx', c.x)
    ellipse.setAttribute('cy', c.y)
    ellipse.setAttribute('rx', rx)
    ellipse.setAttribute('ry', ry)
    ellipse.setAttribute('fill', fill)
    ellipse.setAttribute('stroke', stroke)
    ellipse.setAttribute('stroke-width', strokeW)
    this.els.push(ellipse)
  }

  makeRect(pt, w, h, fill = 'transparent', stroke = 'transparent', strokeW = 0) {
    let rect = document.createElementNS(this.ns, 'rect')
    rect.setAttribute('x', pt.x)
    rect.setAttribute('y', pt.y)
    rect.setAttribute('width', w)
    rect.setAttribute('height', h)
    rect.setAttribute('fill', fill)
    rect.setAttribute('stroke', stroke)
    rect.setAttribute('stroke-width', strokeW)
    this.els.push(rect)
  }
}

class Path {
  constructor(ia = []) {
    this.pts = ia
    this.d = ''
  }

  makePath() {
    let path = document.createElementNS(this.ns, 'path')
    path.setAttribute('d', this.d)
    // this.els.push(path)
  }
}

let p = new Path()

console.log(p)

class Pt {
  constructor(x, y, z = 0) {
    this.x = x
    this.y = y
    this.z = z
  }
}

class Vector {
  constructor(x, y, z = 0) {
    this.x = x
    this.y = y
    this.z = z
    this.m = Math.sqrt(this.x**2 + this.y**2 + this.z**2) // Magnitude
  }

  normalize() {
    let xn = this.x / this.m,
        yn = this.y / this.m,
        zn = this.z / this.m
    return new Vector(xn, yn, zn)
  }

  add(ov) {
    let xn = this.x + ov.x,
        yn = this.y + ov.y,
        zn = this.z + ov.z
    return new Vector(xn, yn, zn)
  }

  sub(ov) {
    let xn = this.x - ov.x, 
        yn = this.y - ov.y,
        zn = this.z - ov.z
    return new Vector(xn, yn, zn)
  }

  cross(ov) {
    let xn = this.y * ov.z - this.z * ov.y,
        yn = this.z * ov.x - this.x * ov.z,
        zn = this.x * ov.y - this.y * ov.x
    return new Vector(xn, yn, zn)
  }

  dot(ov) {
    return this.x * ov.x + this.y * ov.y + this.z * ov.z
  }
}




/////// HELPER FUNCTIONS.

function random() {
  return Math.random()
}

function randomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

function coinToss(chance) {
  if (random() <= chance / 100) {
    return true
  }
}

function map(val, minIn, maxIn, minOut, maxOut) {
  val = (val - minIn) / (maxIn - minIn)
  return minOut + val * (maxOut - minOut)
}

function dist(a, b) {
  let xx = a.x - b.x
  let yy = a.y - b.y
  return Math.sqrt(xx**2 + yy**2)
  // return Math.round(Math.sqrt(aa * aa + bb * bb) * 100) / 100 // Why is it rounded???
}

function rad(deg) {
  return deg * (Math.PI / 180)
}

function deg(rad) {
  return rad / (Math.PI / 180)
}



// My Only Friend, The End.