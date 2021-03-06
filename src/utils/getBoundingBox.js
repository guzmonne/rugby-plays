export default (svg, scale=1, offset=0) => {
  const bbox = svg.getBBox()
  const x = bbox.x * scale - offset
  const y = bbox.y * scale - offset
  const width = bbox.width * scale + 2 * offset
  const height = bbox.height * scale + 2 * offset
  return {x, y, width, height}
}
