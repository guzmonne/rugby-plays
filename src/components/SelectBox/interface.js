import T from 'prop-types'

export const IPoint = T.shape({
  x: T.number,
  y: T.number,
})

export const ISelectBoxProps = {
  a: IPoint,
  b: IPoint,
  isSelectingItems: T.bool,
}

export const ISelectBoxActions = {

}

const ISelectBox = {
  ...ISelectBoxProps,
  ...ISelectBoxActions,
}

export default ISelectBox
