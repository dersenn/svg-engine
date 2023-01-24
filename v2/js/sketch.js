
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






let nPts = 3
let r = rand() * (svg.w/nPts)

let a = new Vec(0, svg.h)
let b = new Vec(svg.w, 0)

let pts = divLength(a, b, 4)

let crcls = []

for (let i = 0; i < pts.length; i++) {
  let crcl = svg.makeCircle(pts[i], r)
  crcl.id = 'blah' + i
  crcls.push(crcl)
}


console.log(svg.stage)
console.log(svg)


// console.log(svg.els)

// svg.draw()

// function animate(t) {
//   crcls[1].setAttribute('r', randInt(5, 10))
//   requestAnimationFrame(animate)
// }

// animate(0)

// const keyHandlerSave = (event) => {
//   if (event.key === 's') {
      //   svg.save()
//         crcls[1].setAttribute('r', randInt(5, 10))
//         console.log(crcls[1])
//   }
// }
    
// document.addEventListener('keypress', keyHandlerSave);





// My Only Friend, The End.