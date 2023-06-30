'use client'

import { useState } from "react"
export default function PlaylistText({text}: {text: string}) {
    const [clippedText] = useState(
        () => text.length > 20 ? text.substring(0, 20) + "..." : text);
    
    const [hover, setHover] = useState(false);
    const [click, setClick] = useState(false);

    const handleMouseEnter = () => {
        setHover(true);
      };
    
      const handleMouseLeave = () => {
        setHover(false);
      };

      const handleClick = () => {
        setClick(!click)
      }
    
    return (
        <h2 onMouseEnter={() => {handleMouseEnter()}} onMouseLeave={() => {handleMouseLeave()}} onClick={() => {handleClick()}} 
        className={hover ? "text-lime-500 font-sans font-bold" : "font-sans font-bold"}>{hover || click ? text : clippedText}</h2>
    )
    
}