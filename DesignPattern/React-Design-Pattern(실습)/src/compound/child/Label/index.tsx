import React from 'react'
import {LabelProps} from './type'

function Label({label, htmlFor}: LabelProps) {
  return <label htmlFor={htmlFor}>{label}</label>
}

export default Label
