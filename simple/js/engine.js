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

  makePath(d, fill = 'transparent', stroke = 'transparent', strokeW = 0) {
    let path = document.createElementNS(this.ns, 'path')
    path.setAttribute('d', d)
    path.setAttribute('fill', fill)
    path.setAttribute('stroke', stroke)
    path.setAttribute('stroke-width', strokeW)
    this.els.push(path)
  }

  // To Do:
  // makeGroup() {}
  // save() {}

}

// Also: Make classes for the different shapes. Collect them as objects.
// And only on draw() push them to svg... probably useful for animation etc.

// class Path {
//   constructor(ia = []) {
//     this.pts = ia
//     this.d = ''
//   }

//   makePath() {
//     let path = document.createElementNS(this.ns, 'path')
//     path.setAttribute('d', this.d)
//     // this.els.push(path)
//   }
// }


class Pt {
  constructor(x, y, z = 0) {
    this.x = x
    this.y = y
    this.z = z
  }

  add(op) {
    let xn = this.x + op.x,
        yn = this.y + op.y,
        zn = this.z + op.z
    return new Pt(xn, yn, zn)
  }

  sub(op) {
    let xn = this.x - op.x, 
        yn = this.y - op.y,
        zn = this.z - op.z
    return new Pt(xn, yn, zn)
  }

  mid(op) {
    let xn = (this.x + op.x) / 2,
        yn = (this.y + op.y) / 2,
        zn = (this.z + op.z) / 2
    return new Pt(xn, yn, zn)
  }

  lerp(op, t) {
    let xn = (1 - t) * this.x + op.x * t,
        yn = (1 - t) * this.y + op.y * t,
        zn = (1 - t) * this.z + op.z * t
    return new Pt(xn, yn, zn)
  }

}

class Vector {
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

// shorten to rand(), randInt() etc.

function random() {
  return Math.random()
}

// Add random w/ seed.

function randomInt(min, max) {
  if (min = max) {
    return min
  } else {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
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
  let xx = a.x - b.x,
      yy = a.y - b.y,
      zz = a.z - b.z
  return Math.sqrt(xx**2 + yy**2 + zz**2)
}

function rad(deg) {
  return deg * (Math.PI / 180)
}

function deg(rad) {
  return rad / (Math.PI / 180)
}

// make this universal (with Pts as input). As in Pt class.
function lerp(a, b, t) {
  return (1 - t) * a + b * t
}

// My Only Friend, The End.