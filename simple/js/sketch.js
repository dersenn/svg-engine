
const setup = {
      id: '1',
      parent: document.body,
      presAspect: 'none', // needs more work
      border: 10 // will use later
}

let svg = new SVG(setup)

// for (let x = 0; x < nRows; x++) {
//   for (let y = 0; y < nCols; y++) {
//     let w = svg.w / nCols
//     let h = svg.h / nRows
//     let r = Math.min(w, h) / 2
//     let c = new Pt(r + x * w, r + y *h)
//     let a = new Pt(c.x + w, c.y + h)
//     svg.makeEllipse(c, w/2, h/2, '#fff')
//     svg.makeCircle(c, r, 'rgb(0,0,100)')
//     svg.makeEllipse(c, '3%', h/4, '#0f0')
//     svg.makeLine(c, a, '#f00', 10)
//   }
// }

// for (let i = 0; i < 10; i++) {
//   let c = {
//     x: Math.random() * svg.w,
//     y: Math.random() * svg.h
//   }
//   // svg.makeCircle(c, Math.random() * 50, '#ffffff')
// }


let nRows = 2
let nCols = 2
let cellW = svg.w / nCols
let cellH = svg.h / nRows


for (let x = 0; x < nRows; x++) {
  for (let y = 0; y < nCols; y++) {
    let xOff = x * cellW,
        yOff = y * cellH,
        c = new Pt(x * cellW + cellW / 2, y * cellH + cellH / 2),
        pts = []

    svg.makeCircle(c, 2, 'rgb(0,0,255')

    let yPos = yOff + random() * cellH
    for (let p = 0; p < randomInt(1, 3); p++) {
      pts.push(new Pt(xOff, yPos))
      yPos = yPos + random() * (cellH - yPos)
    }

    let xPos = xOff + random() * cellW
    for (let p = 0; p < randomInt(1, 3); p++) {
      pts.push(new Pt(xPos, yOff + cellH))
      xPos = xPos + random() * (cellW - xPos)
    }

    yPos = yOff + cellH - random() * cellH
    for (let p = 0; p < randomInt(1, 3); p++) {
      pts.push(new Pt(xOff + cellW, yPos))
      yPos = yPos - random() * (cellH - yPos)
    }

    xPos = xOff + cellW - random() * cellW
    for (let p = 0; p < randomInt(1, 3); p++) {
      pts.push(new Pt(xPos, yOff))
      xPos = xPos - random() * (cellW - xPos)
    }

    let nPts = pts.concat(pts[0])
    let nnPts = nPts.slice(1)

    let d = ''
    for (let j = 0; j < pts.length; j++) {

      if (j == 0) {
        d += `M ${pts[j].x} ${pts[j].y} `

      } else if (j != pts.length -1) {
        let m = pts[j].mid(pts[j-1])
        let cp = m.lerp(c, .5)
        d += `Q ${cp.x} ${cp.y} ${pts[j].x} ${pts[j].y} `

      } else {
        let m = pts[j].mid(pts[0])
        let cp = m.lerp(c, .5)
        d += `Q ${cp.x} ${cp.y} ${pts[0].x} ${pts[0].y}`
      }
    }

    // console.log(d)
    // svg.makePath(d, '#0f0')

    // for (let i = 0; i < pts.length; i++) {
    //   let p = nPts[i].mid(nPts[i+1])
    //   svg.makeCircle(nPts[i], 5, '#f00')
    //   svg.makeCircle(p, 3, '#0f0')
    // }
  }
}


// TESTS AND MATH

let p1 = new Pt(0, svg.h/2)
let p2 = new Pt(svg.w, svg.h/2)

svg.makeLine(p1, p2, '#f00')

let lrPts = []

function divLength(a, b, nSeg, t = 1/nSeg) {
  let pStart = a
  for (let i = 0; i < nSeg-1; i++) {
    pStart = pStart.lerp(b, t)
    lrPts.push(pStart)
  }
}

divLength(p1, p2, 4)

for (let i = 0; i < lrPts.length; i++) {
  svg.makeCircle(lrPts[i], 5, `rgb(${255/(i+1)}, 0, 0)`)
}

console.log(lrPts)


///////////////////////////////////////////

// let p1 = new Pt(0, 200)
// let p2 = new Pt(100, 500)
// let p3 = new Pt(400, 200)

// let p12 = p1.mid(p2)
// let p23 = p2.mid(p3)
// let p31 = p3.mid(p1)


// svg.makeCircle(p1, 5, '#ff0')
// svg.makeCircle(p2, 5, '#ff0')
// svg.makeCircle(p3, 5, '#ff0')

// svg.makeCircle(p12, 5, '#f00')
// svg.makeCircle(p23, 5, '#f00')
// svg.makeCircle(p31, 5, '#f00')

// svg.makeLine(p12, p3, '#0f0', 2)

// let r = random()
// let px = (1 - r) * p12.x + p3.x * r
// let py = (1 - r) * p12.y + p3.y * r
// let p = new Pt(px, py)
// let pl = p12.lerp(p3, r)

// svg.makeCircle(p, 5, '#f00')
// svg.makeCircle(p, 10, '#f00', '#fff', 2)

///////////////////////////////////////////

svg.draw()






// My Only Friend, The End.