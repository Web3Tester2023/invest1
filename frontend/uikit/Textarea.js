import React from "react";

const Textarea = (props) => {
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
      <div className="flex border rounded-lg border-gray-100 mt-2 p-1 items-center ">
      <textarea
        {...props}
        className={`w-full border-none focus:ring-0 focus:ring-offset-0 p-2 focus:outline-none ${
          props.className && props.className
        }`}
      />
      </div>
    </div>
  );
};

export default Textarea;
