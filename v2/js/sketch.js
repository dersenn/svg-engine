
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
  new Vec(svg.w*(randInt(1, 9)/10), svg.h*.75),
  new Vec(svg.w*(randInt(1, 9)/10), svg.h*.9)
]

let path = new Path(pts, true)

// let polygon = svg.makePath(path.buildPolygon(), 'transparent', '#0f0', 1)
// let spline = svg.makePath(path.buildSpline(.6, true), 'transparent', '#f00', 2)
let quad = svg.makePath(path.buildQuadBez(true), 'transparent', '#00f', 4)


for (let i = 0; i < pts.length; i++) {
  const pt = svg.makeCircle(pts[i], 5, '#000')
}


// My Only Friend, The End.