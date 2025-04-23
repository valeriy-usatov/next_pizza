"use client"
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Example() {
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef()
  
  const toggle = ()=>{
    setIsVisible((prev)=>!prev)
    inputRef.current?.focus()
  }

  return (
  <div>
    <h2>current{isVisible}</h2>
    <button onClick={toggle}>Show focus</button>
    {isVisible && <input type="text" ref={inputRef}/>}
    </div>
  );
}