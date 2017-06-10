import React from 'react'
import T from 'prop-types'
import {onlyUpdateForPropTypes} from 'recompose'

const Post = ({x, y, scale}) => (
  <g className="post" transform={`translate(${x}, ${y}) scale(${scale})`}>
    <path className="middle-post" 
      d="M0.4,9 L6.8,9 L6.8,8.6 L0.4,8.6z"
    />
    <path className="left-post" 
      d="M0.4,15 L0.8,15 L0.8,0 L0.4,0z"
    />
    <path className="right-post" 
      d="M6.4,15 L6.8,15 L6.8,0 L6.4,0z"
    />
    <path className="post-base" 
      d="M0,15 L1.2,15 L1.2,10 L0,10z"
    />
    <path className="post-base" 
      d="M6,15 L7.2,15 L7.2,10 L6,10z"
    />
  </g>
)

Post.propTypes = {
  x: T.oneOfType([T.number, T.string]),
  y: T.oneOfType([T.number, T.string]),
  scale: T.number,
}

Post.defaultProps = {
  x: 0,
  y: 0,
  scale: 0.9,
}

const PurePost = onlyUpdateForPropTypes(Post)

PurePost.displayName = 'PurePost'

export default PurePost
