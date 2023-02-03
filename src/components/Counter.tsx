import { useState } from 'react'
import classes from './Counter.module.scss'
const Counter = () => {
  const [value,setValue] = useState(0)
    return (
    <div className={classes.button}>
      <h1>{value}</h1>
      <button onClick={()=>setValue(value+1)}>increment</button>
    </div>
  )
}

export default Counter
