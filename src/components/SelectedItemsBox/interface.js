import T from 'prop-types'
import {List} from 'immutable'

export const ISelectedItemsBoxProps = {
  title: T.string,
  items: T.instanceOf(List),
  item: T.object,
}

export const ISelectedItemsBoxActions = {
  updatePlayer: T.func,
  onChangeFactory: T.func,
}

export const ISelectedItemsBox = {
  ...ISelectedItemsBoxProps,
  ...ISelectedItemsBoxActions
}

export default ISelectedItemsBox
