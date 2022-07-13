import React, { useEffect, useState } from "react";

export default function Example() {
  const [name, setName] = useState("John");

  useEffect(() => {
    document.title = name;
  });

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    console.log("useeffect2");

    return () => {
      console.log("return");
      window.removeEventListener("resize", handleResize);
    };
  });

  function handleNameChange(e) {
    setName(e.target.value);
  }

  return (
    <section>
      <input value={name} onChange={handleNameChange} />
      <span>Window Width: {width}</span>
    </section>
  );
}
