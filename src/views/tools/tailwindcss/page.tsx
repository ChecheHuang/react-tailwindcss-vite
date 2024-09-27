import React, { useState } from 'react'

function Tailwindcss() {
  return (
    <>
      <div>
        <div className="peer/name group/other-name grid h-20 w-20 place-items-center bg-blue-400 transition-colors duration-300 hover:bg-purple-400">
          <div className="h-5 w-5 bg-black transition-colors duration-300 group-hover/other-name:bg-red-600"></div>
          <div className="h-5 w-5 bg-black transition-colors duration-300 group-hover/other-name:bg-red-600"></div>
        </div>
        <div className="h-20 w-20 bg-green-400 transition-colors duration-300 peer-hover/name:bg-orange-500"></div>
      </div>
      <div className="grid grid-cols-2  gap-10 p-5 sm:grid-cols-3">
        <div className="aspect-video w-full bg-purple-400"></div>
        <div className="aspect-video w-full bg-purple-400"></div>
        <div className="aspect-video w-full bg-purple-400"></div>
        <div className="aspect-video w-full bg-purple-400"></div>
        <div className="aspect-video w-full bg-purple-400"></div>
        <div className="aspect-video w-full bg-purple-400"></div>
      </div>
      <ChoseColor />
    </>
  )
}

export default Tailwindcss

const ChoseColor = () => {
  const colors = ['red', 'green', 'blue']
  const [color, setColor] = useState('red')

  //   const possible = ['bg-red-400', 'bg-green-400', 'bg-blue-400']

  return (
    <select
      className={`bg-${color}-400`}
      onChange={(e) => setColor(e.target.value)}
      value={`${color}-400`}
    >
      <option disabled value="">
        choose
      </option>
      {colors.map((color, index) => {
        return (
          <option key={index} value={color}>
            {color}
          </option>
        )
      })}
    </select>
  )
}
