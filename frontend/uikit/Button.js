import React from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

const Button = (props) => {
  if(props.outlined){
    return (
      <button {...props} className={`inline-flex items-center w-full border-2 px-3 py-2 text-sm font-medium duration-150 focus:outline-none rounded-xl ${ props.primary ? 'border-indigo-600 hover:border-indigo-700' : 'border-gray-200 hover:border-gray-300' } ${ props.primary ? 'text-indigo-600' : 'text-gray-600' } ${props.className && props.className}`}>
          {props.leftIcon && !props.loading && props.leftIcon }
          {props.loading && <BiLoaderAlt className="text-sm animate-spin mr-1"/> }
          <span className={`${props.titleClass && props.titleClass}`}>{props.title}</span>
          {props.rightIcon && props.rightIcon }
      </button>
    )  
  }

  return (
    <button {...props} className={`inline-flex items-center w-full border-2 px-3 py-2 text-sm font-medium duration-150 focus:outline-none rounded-xl ${ props.primary ? 'bg-indigo-600 hover:bg-indigo-700 border-indigo-600' : 'bg-gray-200 border-gray-300 hover:bg-gray-300' } ${ props.primary ? 'text-white' : 'text-gray-600' } ${props.className && props.className}`}>
        {props.leftIcon && !props.loading && props.leftIcon }
        {props.loading && <BiLoaderAlt className="text-sm animate-spin mr-1"/> }
        <span className={`${props.titleClass && props.titleClass}`}>{props.title}</span>
        {props.rightIcon && props.rightIcon }
    </button>
  )
}

export default Button