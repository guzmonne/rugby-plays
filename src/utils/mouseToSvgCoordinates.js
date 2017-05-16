export default (e, svg, pt) => {
  pt.x = e.clientX
  pt.y = e.clientY
  // The cursor point, translated into svg coordinates.
  const {x, y} = pt.matrixTransform(svg.getScreenCTM().inverse())
  return {x, y}
}
