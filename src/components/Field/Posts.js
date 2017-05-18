import React from "react"
import Post from './Post.js'
import {onlyUpdateForKeys} from 'recompose'

const Posts = () => (
  <g className="posts">
    <Post x={41.2} y={1.5} />
    <Post x={41.2} y={99.5} />
  </g>
)

export default onlyUpdateForKeys([])(Posts)
