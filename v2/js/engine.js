// 24-01-2023
// Reset The Preset.

// the main class

class SVG {
  constructor(setup) {
    this.ns = 'http://www.w3.org/2000/svg'
    this.xl = 'http://www.w3.org/1999/xlink'
    this.mime = { type: "image/svg+xml" }
    this.parent = setup.parent
    this.id = setup.id
    this.w = this.parent.clientWidth
    this.h = this.parent.clientHeight
    this.els = []

    this.bg = '#ff0'

    // initialize and push to dom on creation.
    this.init()
  }

  init() {
    this.stage = document.createElementNS(this.ns, 'svg')
    this.stage.setAttribute('xmlns', this.ns)
    this.stage.setAttribute('xmlns:xlink', this.xl)
    this.stage.setAttribute('width', this.w)
    this.stage.setAttribute('height', this.h)
    this.stage.setAttribute('viewBox', `0 0 ${this.w} ${this.h}`)
    this.stage.setAttribute('preserveAspectRatio', setup.presAspect)
    this.parent.append(this.stage)
  }

  save() {
    const str = new XMLSerializer().serializeToString(this.stage);
    const blob = new Blob([str], this.mime);

    const link = document.createElement("a"),
          time = Math.round(new Date().getTime() / 1000);
    link.download = `${document.title}-${time}.svg`;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);  
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
    path.setAttributeNS(null, 'd', d)
    path.setAttribute('fill', fill)
    path.setAttribute('stroke', stroke)
    path.setAttribute('stroke-width', strokeW)
    this.els.push(path)
  }

  // To Do:
  // makeGroup() {}

}



// The bones of a grid thing. TopLeft and BottomRight as defining Pts.
class Tile {
  constructor(tl, br) {
    this.tl = tl
    this.bl = new Vec(tl.x, br.y)
    this.br = br
    this.tr = new Vec(br.x, tl.y)
    this.c = tl.mid(br)

    // What else? corners array?
  }
}


// Probably should only have one class, either Pt{} or Vec{}.
// They are mostly identical...


class Pt {
  constructor(x, y, z = 0) {
    this.x = x
    this.y = y
    this.z = z
  }

  // op = other Point
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

// Make those shorter. Arrow functions?!
// shorten to rand(), randInt() etc.

// Add random w/ seed.
function random() {
  return Math.random()
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
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

function lerp(a, b, t) {
  let xn = (1 - t) * a.x + b.x * t,
      yn = (1 - t) * a.y + b.y * t,
      zn = (1 - t) * a.z + b.z * t
  return new Vec(xn, yn, zn)
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
  if (t == 'RAND') {
    for (let i = 0; i < nSeg-1; i++) {
      t = random()
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