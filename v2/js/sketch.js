
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
  new Vec(svg.w*.75, svg.h*.25),
  new Vec(svg.w/3, svg.h/3),
  new Vec(svg.w/3, svg.h*.75),
  new Vec(svg.w/2, svg.h*.75),
  new Vec(randInt(70,100)/100 * svg.w, randInt(70,100)/100 * svg.h)
]

for (let i = 0; i < pts.length; i++) {
  // const pt = svg.makeCircle(pts[i], 5, '#000')
}

let path = new Path(pts, true)

let polygon = svg.makePath(path.buildPolygon(), 'transparent', '#0f0', 1)

// let quadratic = svg.makePath(path.buildQuadBez(), 'transparent', '#00f', 1)

let spline = svg.makePath(path.buildSpline(), 'transparent', '#f00', 2)
// console.log(path.buildSpline())



// My Only Friend, The End.