
const setup = {
      id: '1',
      parent: document.body,
      presAspect: 'none', // needs more work
      border: 10 // will use later
}

let svg = new SVG(setup)

let nRows = 2
let nCols = 2
let cellW = svg.w / nCols
let cellH = svg.h / nRows

let xOff,
    yOff

for (let x = 0; x < nCols; x++) {
  xOff = x * cellW
  for (let y = 0; y < nRows; y++) {
    yOff = y * cellH
    let pts = []

    let tl = new Pt(xOff, yOff),
        br = new Pt(xOff + cellW, yOff + cellH)

    let tile = new Tile(tl, br)

    // svg.makeCircle(tile.tl, 5, 'rgb(0,255,0')
    // svg.makeCircle(tile.bl, 5, 'rgb(0,255,0')
    // svg.makeCircle(tile.br, 5, 'rgb(0,255,0')
    // svg.makeCircle(tile.tr, 5, 'rgb(0,255,0')

    // svg.makeCircle(tile.c, 5, 'rgb(0,0,255')

    pts = pts.concat(
          divLength(tile.tl, tile.bl, randomInt(2,4), 'RAND'),
          divLength(tile.bl, tile.br, randomInt(2,4), 'RAND'),
          divLength(tile.br, tile.tr, randomInt(2,4), 'RAND'),
          divLength(tile.tr, tile.tl, randomInt(2,4), 'RAND')
    )


    // hmm, this????
    pts = pts.concat(pts[0])

    let d = ''
    for (let j = 0; j < pts.length; j++) {
      // console.log(j, pts.length)

      switch (j) {
        case 0:
          d += `M ${pts[j].x} ${pts[j].y} `
          break
        // case pts.length-1: {
        //   let m = pts[0].mid(pts[j])
        //   let cp = m.lerp(tile.c, .5)
        //   d += `Q ${cp.x} ${cp.y} ${pts[j].x} ${pts[j].y} `
        //   break
        // }
        default: {
          let m = pts[j].mid(pts[j-1])
          let cp = m.lerp(tile.c, .5)
          d += `Q ${cp.x} ${cp.y} ${pts[j].x} ${pts[j].y} `
          break
        }
      }
      // console.log(pts.length, pts[-1])

    }

    // console.log(d)
    svg.makePath(d, '#0f0', 'transparent', 1)

    // for (let i = 0; i < pts.length; i++) {
    //   let p = nPts[i].mid(nPts[i+1])
    //   svg.makeCircle(nPts[i], 5, '#f00')
    //   svg.makeCircle(p, 3, '#0f0')
    // }
  }
}


// TESTS AND MATH

// let p1 = new Pt(0, svg.h/2)
// let p2 = new Pt(svg.w, svg.h/2)

// svg.makeLine(p1, p2, '#f00')

// let lrPts = divLength(p1, p2, 4, 'RAND')


// for (let i = 0; i < lrPts.length; i++) {
//   svg.makeCircle(lrPts[i], 5, `rgb(${255/(i+1)}, 0, 0)`)
// }

// console.log(lrPts)



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



// Save

const keyHandlerSave = (event) => {
  if (event.key === "s") {
    svg.save()
  }
};

document.addEventListener("keypress", keyHandlerSave);



// My Only Friend, The End.