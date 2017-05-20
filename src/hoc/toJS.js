import React from 'react'
import {Iterable} from 'immutable'

export default (Component) => (props) => {
  const jsProps = (
    Object.keys(props)
    .reduce((acc, prop) => ({
      ...acc,
      [prop]: (
        Iterable.isIterable(props[prop])
        ? props[prop].toJS()
        : props[prop]
      )
    }), {})
  )

  return (
    <Component {...jsProps} />
  )
}
