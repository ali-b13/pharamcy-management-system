import React from 'react'
import { IconType } from 'react-icons';
type ButtonProps = {
 label :string,
 onClick:()=>void;
disabled?:boolean,
icon?:IconType
className?:string
}
const OutlinedButton:React.FC<ButtonProps> = ({label,onClick,disabled,className,icon:Icon}) => {
  return (
    <button 
    className={className+"  rounded min-w-20 flex gap-1 justify-center items-center"}
    onClick={onClick}>
       <span>{label}</span>
       {Icon&&<Icon/>}
    </button>
  )
}

export default OutlinedButton