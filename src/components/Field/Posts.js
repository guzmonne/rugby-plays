import React from "react"
import Post from './Post.js'
import {shouldUpdate} from 'recompose'

const Posts = () => (
  <g className="posts">
    <Post x={40.7} y={1.5} />
    <Post x={40.7} y={101.5} />
  </g>
)

export default shouldUpdate(() => true)(Posts)
