import { useState, useEffect, useRef } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0); 
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if(isRunning) {
        startTimeRef.current = Date.now() - (time * 1000)
        intervalRef.current = setInterval(() => {
        setTime(Math.floor((Date.now() - startTimeRef.current)/1000))
        },1000) }

    else{
        clearInterval(intervalRef.current)
    }
    
    return () => {clearInterval(intervalRef)}

  },[isRunning])

  const handleReset = () => { 
    setIsRunning(false)
    setTime(0) 
    }

  const minutes = Math.floor(time/60)
  const seconds = time%60 
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Stopwatch</h1>
      <h2>
        Time: {minutes.toString().padStart(1, "0")}:
        {seconds.toString().padStart(2, "0")}
      </h2>
      {
       (!isRunning)?
        (<button onClick={()=> setIsRunning(true)}>Start</button>):
        (<button onClick={()=> setIsRunning(false)}>Stop</button>)
      }
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
