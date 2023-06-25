import React from 'react'
import {PraticeProps} from './Pratice.type'
import PraticePresenter from './PraticePresenter'

function PraticeContainer() {
  const [num, setNum] = React.useState(0)
  const handleIncreaseNum = () => {
    setNum(prev => prev + 1)
  }
  const propObject: PraticeProps = {
    num,
    handleIncreaseNum,
  }
  return <PraticePresenter {...propObject} />
}
export default PraticeContainer
