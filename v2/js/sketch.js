
const setup = {
      id: 'mySVG',
      parent: document.body,
      presAspect: 'none', // needs more work
}

const defaults = {
      fill: '#0f0',
      stroke: '#0f0',
      strokeW: 5
}

let svg = new SVG(setup, defaults)


let pts = [
  new Vec(svg.w*(randInt(1, 9)/10), svg.h*.1),
  new Vec(svg.w*(randInt(1, 9)/10), svg.h*.25),
  new Vec(svg.w*(randInt(1, 9)/10), svg.h*.5),
  // new Vec(svg.w*(randInt(1, 9)/10), svg.h*.75),
  // new Vec(svg.w*(randInt(1, 9)/10), svg.h*.9)
]

let path = new Path(pts, true)

// let polygon = svg.makePath(path.buildPolygon(), 'transparent', '#0f0', 1)
// let spline = svg.makePath(path.buildSpline(.6, true), 'transparent', '#f00', 2)
// let quad = svg.makePath(path.buildQuadBez(true), 'transparent', '#00f', 4)


for (let i = 0; i < pts.length; i++) {
  // const pt = svg.makeCircle(pts[i], 5, '#000')
}


let zero = nVec(0, 0)

let a = nVec(100, 300),
    b = nVec(300, 100)

svg.makeCircle(a, 5, '#000')
svg.makeCircle(b, 5, '#000')




let t = rand()
let d = rand()



// svg.makeCircle(cp, 5, '#f00')


function getControlPointQuad(a, b, t = 0.5, d = 0.5) {
  let m = b.sub(a)
  let p = lerp(a, b, d)
  let perp = nVec(-m.norm().y, m.norm().x)
  let amp = t * ( dist(a, b) / 2 )

  let cp = nVec(
    p.x + amp * perp.x,
    p.y + amp * perp.y
  )
  svg.makeLine(a, b, '#000', 1)
  svg.makeLine(p, cp, '#000', 1)
  return cp
}

let test = getControlPointQuad(a, b, t, d)

console.log(test)
svg.makeCircle(test, 10, 'transparent', '#0f0', 2)


// let m = lerp(a, b, rand())
// svg.makeCircle(m, 5, '#00f')

// let s = b.sub(a)
// console.log(s.norm())
// svg.makeCircle(s, 10, '#ff0')

// let swap = nVec(-s.y, s.x)
// console.log(swap)
// svg.makeCircle(swap, 5, '#f0f')



// let t = ( dist(a, b) / 2 ) * 1

// let n = m.norm()
// // console.log(n)


// let cp = nVec(
//   m.x + t * swap.norm().x,
//   m.y + t * swap.norm().y
// )



// svg.makeCircle(cp, 10, '#f00')

// svg.makeLine(zero, cp, '#ddd', 1)
// svg.makeLine(m, cp, '#f00', 1)
// svg.makeLine(zero, swap, '#ff0', 1)




// dx = x1-x2
// dy = y1-y2
// dist = sqrt(dx*dx + dy*dy)
// dx /= dist
// dy /= dist
// x3 = x1 + (N/2)*dy
// y3 = y1 - (N/2)*dx
// x4 = x1 - (N/2)*dy
// y4 = y1 + (N/2)*dx







// My Only Friend, The End.