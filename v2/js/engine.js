// 30-01-2023
// Reset The Preset.

// To Do:
// — get spline to work
// — implement fxhash or similar prng (use own rand() in all methods etc.!!!)
// — nice to have: working defaults.
// — nice to have: add shortcuts to setAttribute... e.g. strokeCap(5)
// — nice to have: color object or methods.
// — nice to have: modularize???
// — maybe get rid of z-coordinates... it's 2d after all. but maybe useful for noise etc. (?)
// — fuckin do something with it :-)


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

  defaults(fill = '#000', stroke = '#000', strokeW = 0) {
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
  constructor(pts = [new Vec(0,0)], close = false) {
    this.pts = pts
    this.close = close
  }
  
  buildPolygon() {
    let str = 'M '
    for (let i = 0; i < this.pts.length; i++) {
      let pt = this.pts[i]
      switch(i) {
        case(0):
          str += `${pt.x} ${pt.y}`
          break
        default:
          str += ` L ${pt.x} ${pt.y}`
          break
      }
    }
    if (this.close) {str += ' Z'}
    return str
  }

  // Quadratic
  buildQuadBez() {
    let str = 'M '
    for (let i = 0; i < this.pts.length; i++) {
      let pt = this.pts[i]
      let cp, m, p
      switch(i) {
        case 0:
          console.log('case 0')
          str += `${pt.x} ${pt.y}`
          break

        // case 1:
        //   cLog('case 1')
        //   m = pt.mid(pts[i-1])
        //   svg.makeCircle(m, 5, '#00f')

        //   p = nVec(m.x + 100, m.y + 100)
        //   svg.makeCircle(p, 5, '#0ff')

        //   cp = m.lerp(p, .5)
        //   svg.makeCircle(cp, 5, '#f00')

        //   str += ` S ${cp.x} ${cp.y} ${pt.x} ${pt.y}`

        //   break

        case this.pts.length-1:
          console.log('huhu', i)

          m = pt.mid(pts[i-1])
          // svg.makeCircle(m, 5, '#00f')

          p = nVec(m.x + 100, m.y + 100)
          // svg.makeCircle(p, 5, '#0ff')

          cp = m.lerp(p, .5)
          // svg.makeCircle(cp, 5, '#f00')

          str += ` S ${cp.x} ${cp.y} ${pt.x} ${pt.y}`

          if (this.close) {
            m = pts[0].mid(pt)
            // svg.makeCircle(m, 5, '#00f')
  
            p = nVec(m.x + 100, m.y + 100)
            // svg.makeCircle(p, 5, '#0ff')
  
            cp = m.lerp(p, .5)
            // svg.makeCircle(cp, 5, '#f00')
  
            str += ` S ${cp.x} ${cp.y} ${pts[0].x} ${pts[0].y}`  
          }
          break

        default:
          console.log('default', i)

          m = pt.mid(pts[i-1])
          // svg.makeCircle(m, 5, '#00f')

          p = nVec(m.x + 100, m.y + 100)
          // svg.makeCircle(p, 5, '#0ff')

          cp = m.lerp(p, .5)
          // svg.makeCircle(cp, 5, '#f00')

          str += ` S ${cp.x} ${cp.y} ${pt.x} ${pt.y}`

          break
      }
    }
    if (this.close) {str += ' Z'}
    return str
  }

  buildSpline(t = .4) {
    let pts = this.pts
    let str = 'M '
    for (let i = 0; i < pts.length; i++) {

      let p0, p1, p2, cps

      switch(i) {
        case 0:
          p0 = pts[pts.length-1]
          p1 = pts[i]
          p2 = pts[i+1]

          svg.makeCircle(p1, 10, 'transparent', '#00f', 3)

          cps = getControlPoints(p0, p1, p2, t)
          svg.makeCircle(cps[0], 3, '#00f')
          svg.makeCircle(cps[1], 3, '#00f')

          p1.cps = cps

          str += `${p1.x} ${p1.y}`
          break

        case pts.length-1:
          p0 = pts[i-1]
          p1 = pts[i]
          p2 = pts[0]

          svg.makeCircle(p1, 10, 'transparent', '#0f0', 3)

          cps = getControlPoints(p0, p1, p2, t)
          svg.makeCircle(cps[0], 3, '#0f0')
          svg.makeCircle(cps[1], 3, '#0f0')

          p1.cps = cps
          str += `C ${p0.cps[1].x} ${p0.cps[1].y} ${p1.cps[0].x} ${p1.cps[0].y} ${p1.x} ${p1.y} `

          // if closed...
          if (this.close) {
            str += `C ${p1.cps[1].x} ${p1.cps[1].y} ${p2.cps[0].x} ${p2.cps[0].y} ${p2.x} ${p2.y} `
          }
          break

        default:
          p0 = pts[i-1]
          p1 = pts[i]
          p2 = pts[i+1]

          svg.makeCircle(p1, 10, 'transparent', '#0f0', 3)

          cps = getControlPoints(p0, p1, p2, t)
          svg.makeCircle(cps[0], 3, '#0f0')
          svg.makeCircle(cps[1], 3, '#0f0')

          p1.cps = cps
          str += `C ${p0.cps[1].x} ${p0.cps[1].y} ${p1.cps[0].x} ${p1.cps[0].y} ${p1.x} ${p1.y} `
          break
      }
    }
    // console.log(str)
    return str
  }

}

// adapted from this: http://scaledinnovation.com/analytics/splines/aboutSplines.html
function getControlPoints(p0, p1, p2, t) {
  let d01 = Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2)); // distance between pt1 and pt2
  let d12 = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)); // distance between pt2 and pt3
  let fa = t * d01 / (d01+d12);   // scaling factor for triangle Ta
  let fb = t * d12 / (d01+d12);   // ditto for Tb, simplifies to fb=t-fa
  let cp1x = p1.x - fa * (p2.x - p0.x);    // x2-x0 is the width of triangle T
  let cp1y = p1.y - fa * (p2.y - p0.y);    // y2-y0 is the height of T
  let cp2x = p1.x + fb * (p2.x - p0.x);
  let cp2y = p1.y + fb * (p2.y - p0.y);  

  // return [{x: cp1x, y: cp1y}, {x: cp2x, y: cp2y}];
  return [new Vec(cp1x, cp1y), new Vec(cp2x, cp2y)]
}





// class PathPoint {
//   constructor(pt, type = 'LINE') {
//     this.type = type
//     this.x = pt.x
//     this.y = pt.y
//     this.z = pt.z
//     this.t = null
//     this.cp1 = {}
//     this.cp2 = {}
//   }
// }


// TILE 
// (NOT SURE IF NECESSARY)

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


// VECTORS.
// BASICALLY POINTS. WITH EXTRAS.

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


function nVec(x, y, z) { 
  return new Vec(x, y, z) 
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




/////// UTILITY FUNCTIONS.

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
  } else {
    return false
  }
}

function map(val, minIn, maxIn, minOut, maxOut) {
  val = (val - minIn) / (maxIn - minIn)
  return minOut + val * (maxOut - minOut)
}

function rad(deg) {
  return deg * (Math.PI / 180)
}

function deg(rad) {
  return rad / (Math.PI / 180)
}

// Divide length between to points. Returns intermediary Points.
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





// EX FXHASH


//---- do not edit the following code (you can indent as you wish)
let alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
var fxhash = "oo" + Array(49).fill(0).map(_=>alphabet[(Math.random()*alphabet.length)|0]).join('')
let b58dec = str=>[...str].reduce((p,c)=>p*alphabet.length+alphabet.indexOf(c)|0, 0)
let fxhashTrunc = fxhash.slice(2)
let regex = new RegExp(".{" + ((fxhashTrunc.length/4)|0) + "}", 'g')
let hashes = fxhashTrunc.match(regex).map(h => b58dec(h))
let sfc32 = (a, b, c, d) => {
  return () => {
    a |= 0; b |= 0; c |= 0; d |= 0
    var t = (a + b | 0) + d | 0
    d = d + 1 | 0
    a = b ^ b >>> 9
    b = c + (c << 3) | 0
    c = c << 21 | c >>> 11
    c = c + t | 0
    return (t >>> 0) / 4294967296
  }
}
var fxrand = sfc32(...hashes)
// true if preview mode active, false otherwise
// you can append preview=1 to the URL to simulate preview active
var isFxpreview = new URLSearchParams(window.location.search).get('preview') === "1"
// call this method to trigger the preview
function fxpreview() {
  console.log("fxhash: TRIGGER PREVIEW")
}
//---- /do not edit the following code













// My Only Friend, The End.