import { useState } from 'react'

import Demo from './components/Demo'
import Demo2 from './components/Demo2'
import Demo3 from './components/Demo3'
import Demo4 from './components/Demo4'
import Demo5 from './components/Demo5'
import FramerMotion from './components/FramerMotion'

export default function Page() {
  const [start, setStart] = useState(true)
  const handleClick = () => {
    setStart(false)
    setTimeout(() => {
      setStart(true)
    }, 200)
  }
  return (
    <div className="grid grid-cols-2 place-items-center justify-items-center gap-y-3">
      <button onClick={handleClick} className="btn fixed right-0 top-0">
        refresh
      </button>
      {start && (
        <>
          <FramerMotion
            initial={{
              scale: 0,
              y: -100,
            }}
            animate={{
              scale: 1,
              y: 0,
              rotateZ: 720,
            }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
          />
          <Demo />
          <Demo2 />
          <Demo3 />
          <Demo4 />
          <Demo5 />
        </>
      )}
    </div>
  )
}
