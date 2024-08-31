import React from 'react'

const Header = ({title}:{title:string}) => {
  return (
    <h1 className="text-3xl font-bold m-4 text-teal-600  ">{title}</h1>
  )
}

export default Header