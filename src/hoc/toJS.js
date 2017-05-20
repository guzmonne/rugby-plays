import React from 'react'
import {Iterable} from 'immutable'

export default (immutableProps) => (Component) => (props) => {
  const jsProps = immutableProps.reduce((acc, prop) => ({
    ...acc,
    [prop]: (
      Iterable.isIterable(props[prop])
      ? props[prop].toJS()
      : props[prop]
    )
  }), {})

  return (
    <Component {...jsProps} />
  )
}
