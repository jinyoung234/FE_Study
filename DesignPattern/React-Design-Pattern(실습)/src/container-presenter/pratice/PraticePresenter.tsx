import React from 'react'
import {PraticeProps} from './Pratice.type'

function PraticePresenter({num, handleIncreaseNum}: PraticeProps) {
  return (
    <div>
      <span>{num}</span>
      <button onClick={handleIncreaseNum}>+</button>
    </div>
  )
}

export default PraticePresenter
