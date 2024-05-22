import React from "react";
import CheckMark from "../icons/CheckMark";

const RadioInput: React.FC<any> = ({ field, ...props }) => (
  <div className={`inline-block relative text-teal border-2 rounded-full w-5 h-5`}>
    <input {...field} {...props} className={`hidden`} />
    <CheckMark checked={field.checked} className="w-full h-full absolute top-0 left-0" />
  </div>
)

export default RadioInput;