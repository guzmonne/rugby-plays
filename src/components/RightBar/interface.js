import T from 'prop-types'

export const IRightBarProps = {
  areSelectedItems: T.bool,
}

export const IRightBarActions = {}

export const IRightBar = {
  ...IRightBarProps,
  ...IRightBarActions
}

export default IRightBar
