
// INIT

let useSeed = true
let seed
if (useSeed) {
  seed = new Hash()
} else {
  seed = false
}

const setup = {
      id: 'mySVG',
      parent: document.body,
      presAspect: 'none', // needs more work
}

let svg = new SVG(setup)



// SETUP

let pts = [
  nVec(svg.w*(rndInt(1, 9)/10), svg.h*.1),
  nVec(svg.w*(rndInt(1, 9)/10), svg.h*.25),
  nVec(svg.w*(rndInt(1, 9)/10), svg.h*.5),
  nVec(svg.w*(rndInt(1, 9)/10), svg.h*.75),
  nVec(svg.w*(rndInt(1, 9)/10), svg.h*.9)
]

let path = new Path(pts, true)



// DRAW/ANIMATE

let polygon = svg.makePath(path.buildPolygon(), 'transparent', '#0f0', 1)
let spline = svg.makePath(path.buildSpline(.6, true), 'transparent', '#f00', 2)
let quad = svg.makePath(path.buildQuadBez(-.5, .5, false), 'transparent', '#00f', 4)

let q1 = svg.makeRectAB(nVec(0,0), svg.c)

for (let i = 0; i < pts.length; i++) {
  const pt = svg.makeCircle(pts[i], 5, '#000')
}

svg.makeCircle(svg.c, 5, '#f00', 'transparent')







// My Only Friend, The End.