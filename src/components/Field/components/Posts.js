import React from "react"
import Post from './Post.js'
import {pure} from 'recompose'

const Posts = () => (
  <g className="posts">
    <Post x={40.7} y={1.5} />
    <Post x={40.7} y={101.5} />
  </g>
)

const PurePosts = pure(Posts)

PurePosts.displayName = 'PurePosts'

export default PurePosts
