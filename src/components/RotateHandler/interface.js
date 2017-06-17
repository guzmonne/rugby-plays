import T from 'prop-types'

export const IRotateHandlerProps = {
  x: T.number,
  y: T.number,
  cx: T.number,
  cy: T.number,
  angle: T.number,
  width: T.number,
  height: T.number,
}

export const IRotateHandlerActions = {
  mouseToSvgCoordinates: T.func,
  onUpdate: T.func,
}

export default {
  ...IRotateHandlerProps,
  ...IRotateHandlerActions,
}
