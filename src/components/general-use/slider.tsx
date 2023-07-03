"use client"

import { useState } from "react"

export default function Slider() {
    const [slider, setSlider] = useState(4)

    const handleChange = (value) => {
        setSlider(value)
    }

    return (<div>
        
    </div>)
}