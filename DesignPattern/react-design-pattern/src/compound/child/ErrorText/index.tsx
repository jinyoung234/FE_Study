import React from 'react'
import {ErrorTextProps} from './type'

function ErrorText({message}: ErrorTextProps) {
  return <span>{message}</span>
}

export default ErrorText
