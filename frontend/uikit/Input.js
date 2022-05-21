import React from "react";

const Input = (props) => {
  return (
    // <input {...props} className={`px-4 flex space-x-2 text-sm duration-150 font-medium py-2 items-center rounded-xl ${ props.primary ? 'bg-violet-500 hover:bg-violet-600 border-violet-700' : 'bg-gray-200 border-gray-300 hover:bg-gray-300' } ${ props.primary ? 'text-white' : 'text-gray-600' }`}>
    //     {props.leftIcon && props.leftIcon }
    //     {props.title}
    //     {props.rightIcon && props.rightIcon }
    // </input>
    <div className="flex flex-col space-y-1 mt-2 mb-3">
      {props.label && (
        <label className="font-medium text-gray-600">{props.label}</label>
      )}
      <div className="flex border border-gray-100 rounded-lg mt-2 py-2 px-3 items-center ">
        {props.rightIcon && (
          <div className="mr-2">{props.rightIcon}</div>
        )}
        <input
          {...props}
          className={`w-full focus:ring-0 focus:ring-offset-0 focus:outline-none ${
            props.className && props.className
          }`}
        />
        {props.leftIcon && (
          <div className="ml-2">{props.leftIcon}</div>
        )}
      </div>
    </div>
  );
};

export default Input;
