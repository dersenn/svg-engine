
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


const nLines = 10
const cols = [
  '#0ff',
  '#ff0',
  '#00f',
  '#f0f'
]

zero = nVec(0,0)
svg.makeRect(zero, svg.w, svg.h, '#fff')

for (let l = 0; l < nLines; l++) {
  let pts = [
    new Vec(svg.w*rand(), svg.h*0),
    new Vec(svg.w*rand(), svg.h*rand()),
    // new Vec(svg.w*rand(), svg.h*.5),
    // new Vec(svg.w*rand(), svg.h*.75),
    new Vec(svg.w*rand(), svg.h*1)
  ]
  
  let path = new Path(pts, true)
  
  let spline = svg.makePath(path.buildSpline(rand(), false), 'transparent', cols[randInt(0, cols.length-1)], randInt(1, 10))
  let quad = svg.makePath(path.buildQuadBez(), 'transparent', cols[randInt(0, cols.length-1)], randInt(0, svg.w / nLines))

  quad.setAttributeNS(null,'stroke-linecap', 'round')

  // let poly = svg.makePath(path.buildPolygon(.3, true), 'transparent', cols[randInt(0, cols.length-1)], randInt(1, 100))
  // poly.setAttributeNS(null, 'stroke-linejoin', 'round')
 
  
  for (let i = 0; i < pts.length; i++) {
    const pt = svg.makeCircle(pts[i], 5, '#000')
  }
}













// My Only Friend, The End.