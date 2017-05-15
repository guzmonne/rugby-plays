import '../../_styles/Icon.css'
import React from 'react'

export const Plus = () => (
  <svg className="Icon" width="32" height="32" viewBox="0 0 32 32">
    <g id="plus" aria-labelledby="t-plus d-plus">
      <title id="t-plus">Plus</title>
      <desc id="d-plus">Two horizontal and vertical lines crossed</desc>
      <path d="M18 18v12c0 1.104-.896 2-2 2s-2-.896-2-2V18H2c-1.105 0-2-.896-2-2s.896-2 2-2h12V2c0-1.105.895-2 2-2 1.104 0 2 .896 2 2v12h12c1.105 0 2 .895 2 2 0 1.104-.895 2-2 2H18z"/>
    </g>
  </svg>
)

export const Cross = () => (
  <svg className="Icon" width="32" height="32" viewBox="0 0 32 32">
    <g id="cross" aria-labelledby="t-cross d-cross">
      <title id="t-cross">Cross</title>
      <desc id="d-cross">Two lines crossed diagonally</desc>
      <path d="M13.172 16L.586 3.414c-.78-.78-.78-2.047 0-2.828.78-.78 2.048-.78 2.828 0L16 13.172 28.586.586c.78-.78 2.047-.78 2.828 0 .78.78.78 2.047 0 2.828L18.828 16l12.586 12.586c.78.78.78 2.047 0 2.828-.78.78-2.048.78-2.828 0L16 18.828 3.414 31.414c-.78.78-2.047.78-2.828 0-.78-.78-.78-2.047 0-2.828L13.172 16z"/>
    </g>
  </svg>
)
