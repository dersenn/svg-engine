
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
  new Vec(0, 0),
  new Vec(svg.w/3, svg.h/3),
  new Vec(svg.w/2, svg.h * .75),
  new Vec(rand() * svg.w, rand() * svg.h)
]

let p = new Path(pts)

for (let i = 0; i < pts.length; i++) {
  const pt = svg.makeCircle(pts[i], 5, '#f00')
}

let path = svg.makePath(p.d, 'transparent', '#0f0', 1)


console.log(path)
console.log(svg.stage)




// My Only Friend, The End.