import React from 'react'

const HStack = (props) => {
  return (
    <div className={`flex space-x-${props.space} ${props.className && props.className}`}>
         {props.children}
    </div>
  )
}

export default HStack