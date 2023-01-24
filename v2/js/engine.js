// 24-01-2023
// Reset The Preset.

class SVG {
  constructor(setup) {
    this.ns = 'http://www.w3.org/2000/svg'
    this.xl = 'http://www.w3.org/1999/xlink'
    this.mime = { type: 'image/svg+xml' }
    this.parent = setup.parent
    this.id = setup.id
    this.w = this.parent.clientWidth
    this.h = this.parent.clientHeight
    this.els = []

    // not really working yet.
    this.defaults()

    // initialize and push to dom on creation.
    this.init()
  }

  defaults(fill = '#000', stroke = '#000', strokeW = 1) {
    this.def = {
      fill: fill,
      stroke: stroke,
      strokeW: strokeW
    }
  }

  init() {
    this.stage = document.createElementNS(this.ns, 'svg')
    this.stage.setAttribute('id', this.id)
    this.stage.setAttribute('xmlns', this.ns)
    this.stage.setAttribute('xmlns:xlink', this.xl)
    this.stage.setAttribute('width', this.w)
    this.stage.setAttribute('height', this.h)
    this.stage.setAttribute('viewBox', `0 0 ${this.w} ${this.h}`)
    this.stage.setAttribute('preserveAspectRatio', setup.presAspect)
    this.parent.append(this.stage)
  }

  save() {
    const str = new XMLSerializer().serializeToString(this.stage)
    const blob = new Blob([str], this.mime)

    const link = document.createElement("a"),
          time = Math.round(new Date().getTime() / 1000)
    link.download = `${document.title}-${time}.svg`
    link.href = URL.createObjectURL(blob)
    link.click()
    URL.revokeObjectURL(link.href)
  }

  makeLine(a, b, stroke = this.def.stroke, strokeW = this.def.strokeW) {
    let line = document.createElementNS(this.ns, 'line')
    line.setAttribute('x1', a.x)
    line.setAttribute('y1', a.y)
    line.setAttribute('x2', b.x)
    line.setAttribute('y2', b.y)
    line.setAttribute('stroke', stroke)
    line.setAttribute('stroke-width', strokeW)
    // this.els.push(line)
    this.stage.append(line)
    return line
  }

  makeCircle(c, r, fill = this.def.fill, stroke = this.def.stroke, strokeW = this.def.strokeW) {
    let circle = document.createElementNS(this.ns, 'circle')
    circle.setAttribute('cx', c.x)
    circle.setAttribute('cy', c.y)
    circle.setAttribute('r', r)
    circle.setAttribute('fill', fill)
    circle.setAttribute('stroke', stroke)
    circle.setAttribute('stroke-width', strokeW)
    // this.els.push(circle)
    this.stage.append(circle)
    return circle
  }

  makeEllipse(c, rx, ry, fill = this.def.fill, stroke = this.def.stroke, strokeW = this.def.strokeW) {
    let ellipse = document.createElementNS(this.ns, 'ellipse')
    ellipse.setAttribute('cx', c.x)
    ellipse.setAttribute('cy', c.y)
    ellipse.setAttribute('rx', rx)
    ellipse.setAttribute('ry', ry)
    ellipse.setAttribute('fill', fill)
    ellipse.setAttribute('stroke', stroke)
    ellipse.setAttribute('stroke-width', strokeW)
    // this.els.push(ellipse)
    this.stage.append(ellipse)
    return ellipse
  }

  makeRect(pt, w, h, fill = 'transparent', stroke = this.def.stroke, strokeW = this.def.strokeW) {
    let rect = document.createElementNS(this.ns, 'rect')
    rect.setAttribute('x', pt.x)
    rect.setAttribute('y', pt.y)
    rect.setAttribute('width', w)
    rect.setAttribute('height', h)
    rect.setAttribute('fill', fill)
    rect.setAttribute('stroke', stroke)
    rect.setAttribute('stroke-width', strokeW)
    // this.els.push(rect)
    this.stage.append(rect)
    return rect
  }

  makePath(d, fill = this.def.fill, stroke = this.def.stroke, strokeW = this.def.strokeW) {
    let path = document.createElementNS(this.ns, 'path')
    path.setAttribute('d', d)
    path.setAttribute('fill', fill)
    path.setAttribute('stroke', stroke)
    path.setAttribute('stroke-width', strokeW)
    // this.els.push(path)
    this.stage.append(path)
    return path
  }

  // Hmm... Group only useful if i can set this as parent for other Elements. Maybe I still need to split this up a bit more... Maybe an Elements Class???

  // makeGroup(id) {
  //   let group = document.createElementNS(this.ns, 'g')
  //   group.setAttribute('id', id)
  //   this.stage.append(group)
  //   return group
  // }

}

class Path {
  constructor() {

  }

  addPtCub() {

  }
  
  toStr() {

  }
}


class Tile {
  constructor(p1, p2) {
    this.p1 = p1
    this.p2 = p2
    this.xMin = Math.min(p1.x, p2.x)
    this.xMax = Math.max(p1.x, p2.x)
    this.yMin = Math.min(p1.y, p2.y)
    this.yMax = Math.max(p1.y, p2.y)
    this.pMin = new Vec(this.xMin, this.yMin)
    this.pMax = new Vec(this.xMax, this.yMax)
    this.w = Math.abs(this.p2.x - this.p1.x)
    this.h = Math.abs(this.p2.y - this.p1.y)
    this.c = new Vec(this.p1.x + ((this.p2.x - this.p1.x) /2), this.p1.y + ((this.p2.y - this.p1.y) /2))
  }
}

class Vec {
  constructor(x, y, z = 0) {
    this.x = x
    this.y = y
    this.z = z
    this.m = Math.sqrt(this.x**2 + this.y**2 + this.z**2) // Magnitude
  }
  norm() {
    let xn = this.x / this.m,
        yn = this.y / this.m,
        zn = this.z / this.m
    return new Vec(xn, yn, zn)
  }
  // ov = other Vec
  add(ov) {
    let xn = this.x + ov.x,
        yn = this.y + ov.y,
        zn = this.z + ov.z
    return new Vec(xn, yn, zn)
  }
  sub(ov) {
    let xn = this.x - ov.x, 
        yn = this.y - ov.y,
        zn = this.z - ov.z
    return new Vec(xn, yn, zn)
  }
  cross(ov) {
    let xn = this.y * ov.z - this.z * ov.y,
        yn = this.z * ov.x - this.x * ov.z,
        zn = this.x * ov.y - this.y * ov.x
    return new Vec(xn, yn, zn)
  }
  dot(ov) {
    return this.x * ov.x + this.y * ov.y + this.z * ov.z
  }
  ang(ov) {
    return Math.acos( this.norm().dot(ov.norm()) / (this.norm().m * ov.norm().m) )
  }
  lerp(ov, t) {
    let xn = (1 - t) * this.x + ov.x * t,
        yn = (1 - t) * this.y + ov.y * t,
        zn = (1 - t) * this.z + ov.z * t
    return new Vec(xn, yn, zn)
  }
  mid(ov) {
    let xn = (this.x + ov.x) / 2,
        yn = (this.y + ov.y) / 2,
        zn = (this.z + ov.z) / 2
    return new Vec(xn, yn, zn)
  }
}


/////// HELPER FUNCTIONS.

// Add random w/ seed.
function rand() {
  return Math.random()
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function coinToss(chance) {
  if (Math.random() <= chance / 100) {
    return true
  }
}

function map(val, minIn, maxIn, minOut, maxOut) {
  val = (val - minIn) / (maxIn - minIn)
  return minOut + val * (maxOut - minOut)
}

function dist(a, b) {
  let xx = a.x - b.x,
      yy = a.y - b.y,
      zz = a.z - b.z
  return Math.sqrt(xx**2 + yy**2 + zz**2)
}

function lerp(a, b, t) {
  let xn = (1 - t) * a.x + b.x * t,
      yn = (1 - t) * a.y + b.y * t,
      zn = (1 - t) * a.z + b.z * t
  return new Vec(xn, yn, zn)
}

function dot(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z
}

function ang(a, b) {
  return Math.acos( dot(a.norm(), b.norm()) / (a.norm().m * b.norm().m) )
}

function rad(deg) {
  return deg * (Math.PI / 180)
}

function deg(rad) {
  return rad / (Math.PI / 180)
}

// Divide length between to points. Returns intermediary Points. Not so sure.
// Looks very end-heavy to me. not really random.
// Maybe add a minimum Distance.
function divLength(a, b, nSeg, t = 1/nSeg, outA = []) {
  if (t === 'RAND') {
    for (let i = 0; i < nSeg-1; i++) {
      t = Math.random()
      a = a.lerp(b, t)
      outA.push(a)
    }
  } else {
    for (let i = 0; i < nSeg-1; i++) {
      outA.push(a.lerp(b, (i+1)*t))
    }
  }
  return outA
}










// My Only Friend, The End.