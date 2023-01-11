let svg = new SVG()

for (let i = 0; i < 10; i++) {
  // svg.circle(Math.random() * svg.width, Math.random() * svg.height, Math.random() * 50, '#ffffff')
}

let nRows = 2
let nCols = 2

for (let x = 0; x < nRows; x++) {
  for (let y = 0; y < nCols; y++) {
    let w = svg.w / nCols
    let h = svg.h / nRows
    let r = Math.min(w, h) / 2
    let c = new Pt(r + x * w, r + y *h)
    let a = new Pt(c.x + w, c.y + h)
    svg.makeCircle(c, r, '#000')
    svg.makeLine(c, a, '#f00', 10)
    svg.makeEllipse(c, '3%', h/4, '#0ff')
  }
}

svg.draw()

console.log(svg.els[1])





// My Only Friend, The End.