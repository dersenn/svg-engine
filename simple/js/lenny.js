
//Reset of my SVG Engine following lennyjpgs inputs.

//body (maybe we'll go for window here?)
const body = document.body

//stage (do i need this?)
const stage = document.createElement('main')
stage.setAttribute('id', 'stage')
stage.setAttribute('width', '100%')
stage.setAttribute('height', '100%')
body.append(stage)

//svg
const ns = 'http://www.w3.org/2000/svg'
const svg = document.createElementNS(ns, 'svg')
svg.setAttributeNS(ns, 'width', '100%')
svg.setAttributeNS(ns, 'height', '100%')
body.append(svg)

//circle
let circle = document.createElementNS(ns, 'circle')
circle.setAttribute('cx', '50%')
circle.setAttribute('cy', 50)
circle.setAttribute('r', 50)
circle.setAttribute('fill', '#ffffff')
svg.append(circle)