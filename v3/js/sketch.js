
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
      presAspect: 'none', // other values?
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

svg.makeCircle(svg.c, 5, '#f00', 'transparent')



let polygon = svg.makePath(path.buildPolygon(false), 'transparent', '#0f0', 1)
let spline = svg.makePath(path.buildSpline(.5, false), 'transparent', '#f00', 2)
let quad = svg.makePath(path.buildQuadBez(-.5, .5, false), 'transparent', '#00f', 2)


for (let i = 0; i < pts.length; i++) {
  const pt = svg.makeCircle(pts[i], 5, '#000')
}



console.log(spline)




// My Only Friend, The End.