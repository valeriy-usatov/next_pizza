"use client"
import { useEffect, useLayoutEffect, useState } from "react";

export default function Example() {
  const [value, setValue] = useState("Исходное значение");

  useEffect(() => {
    setValue("useEffect изменил");
    console.log("useEffect сработал");
  }, []);

  useLayoutEffect(() => {
    setValue("useLayoutEffect изменил");
    console.log("useLayoutEffect сработал");
  }, []);

  return (
  <p>значение:{value}</p>
  );
}