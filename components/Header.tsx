import React from 'react'
interface headerPros {
  title:string
  className?:string
}
const Header = ({title,className}:headerPros) => {
  return (
    <h1 className={`text-3xl font-bold m-4 text-teal-600 ${className&&className} `}>{title}</h1>
  )
}

export default Header