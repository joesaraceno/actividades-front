import React, { useState } from 'react'
import './button.css'
export default function ConcurrentRequestHandler() {
  const [result, setResult] = useState("");
  const handleConcurrentClick = async () => {
    try {
        debugger;
      const response = await fetch("https://js-actividades.azurewebsites.net/api/StartWithOrchestration")
      const result = await response.json();
      setResult(result);
    } catch (e) {
      setResult(`${e}- error`)
    }
  }
  const Button = () => {
    return (
      <button className="button" onClick={handleConcurrentClick}>
        Fetch Concurrent
      </button>        
    ) 
  }

    return (
      <div className="request">
      { Button() } 
        <div className="result">
          { result }
        </div>
      </div>
    )
}
