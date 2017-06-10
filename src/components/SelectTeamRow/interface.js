import T from 'prop-types'

export const ISelectTeamRowProps = {
  team: T.string,
  teamAColor: T.string,
  teamBColor: T.string,
  isOpenTeamAColorPicker: T.bool,
  isOpenTeamBColorPicker: T.bool,
}

export const ISelectTeamRowActions = {
  onClick: T.func.isRequired,
  onChangeColor: T.func.isRequired,
  toggleTeamAColorPicker: T.func.isRequired,
  toggleTeamBColorPicker: T.func.isRequired,
}

export default {
  ...ISelectTeamRowProps,
  ...ISelectTeamRowActions,
}
