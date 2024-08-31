import React from 'react'
import { IconType } from 'react-icons';
type ButtonProps = {
 label :string,
 onClick?:()=>void;
disabled?:boolean,
type?:"submit"|"button"
icon?:IconType
className?:string
}
const PrimaryButton:React.FC<ButtonProps> = ({label,onClick,disabled,className,icon:Icon,type}) => {
  return (
    <button
    type={type}
    className={className+"  rounded min-w-20 flex gap-1 items-center justify-center "}
     onClick={onClick}>
     <span>{label}</span>
     {Icon&&<Icon/>}
    </button>
  )
}

export default PrimaryButton