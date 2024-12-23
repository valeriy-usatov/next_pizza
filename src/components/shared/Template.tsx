"use client"
import React from 'react'
import Example from './Example'

const Template = () => {
  let name = "Val"

  const handleClick =()=>{
    return name="Olefg"
  }

  return (
    <div>
      <Example name={name}/>
      <button onClick={handleClick}>Click me</button>
    </div>
  )
}

export default Template