import T from 'prop-types'

export const IDraggingBoxProps = {
  x: T.number,
  y: T.number,
  width: T.number,
  height: T.number,
}

export const IDraggingBoxActions = {
  mouseToSvgCoordinates: T.func,
  onUpdate: T.func,
}

export default {
  ...IDraggingBoxProps,
  ...IDraggingBoxActions,
}
