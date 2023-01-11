
const setup = {
      parent: document.body,
      presAspect: 'none',
      border: 10
}


let svg = new SVG(setup)

console.log(svg)

let nRows = 1
let nCols = 2

for (let x = 0; x < nRows; x++) {
  for (let y = 0; y < nCols; y++) {
    let w = svg.w / nCols
    let h = svg.h / nRows
    let r = Math.min(w, h) / 2
    let c = new Pt(x * w, r + y *h)
    let a = new Pt(c.x + w, c.y + h)
    svg.makeCircle(c, r, 'rgb(0,0,100)')
    svg.makeLine(c, a, '#f00', 10)
    svg.makeEllipse(c, '3%', h/4, '#0ff')
  }
}

for (let i = 0; i < 10; i++) {
  let c = {
    x: Math.random() * svg.w,
    y: Math.random() * svg.h
  }
  svg.makeCircle(c, Math.random() * 50, '#ffffff')
}


svg.draw()

let v = new Vector(1,2,3)
console.log(v.normalize())





// My Only Friend, The End.