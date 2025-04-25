"use client"
import { useEffect, useLayoutEffect, useRef, useState } from "react";

function getPeaople (name, page = 1){
  return fetch('https://rickandmortyapi.com/api/character/?name=${name}&page=${page}').then(res => res.json())
}

export default function Example() {

  const [query, setQury] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [people, setPeople] = useState(null);
  
  
  

  return (
  <div>
    <input type="text" placeholder="query" onChange={(e) => setQury(e.target.value)} />
    {people.map(item=>{
     return <li>{item.name}</li>
    })}
    </div>
  );
}