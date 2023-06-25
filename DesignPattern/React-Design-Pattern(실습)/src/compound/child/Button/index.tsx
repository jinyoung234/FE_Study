import React from 'react'
import {ButtonProps} from './type'

function Button({disabledCondition, context}: ButtonProps) {
  return <button disabled={disabledCondition}>{context}</button>
}

export default Button
