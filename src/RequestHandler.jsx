import React, { useState } from 'react'
import './button.css'
export default function RequestHandler() {
  const [procResult, setProcResult] = useState("");
  const [conResult, setConResult] = useState("");
  const [procLoading, setProcLoading] = useState(false);
  const [conLoading, setConLoading] = useState(false);
  const [numRetries, setRetries] = useState(5);

  const pollConcurrentStatusUrl = async (url) => {
    if (numRetries < 1)
    {
      return new Error("Exceeded max retries");
    }
    try {

      const response = await fetch(url)
      if (response.ok)
      {
        const result = await response.json()
        if (result.runtimeStatus.toLowerCase() === 'running' ||
          result.runtimeStatus.toLowerCase() === 'pending')
        {
          setRetries(numRetries - 1)
          return pollConcurrentStatusUrl(url)
        }
        else if (result.runtimeStatus.toLowerCase() === 'completed')
        {
          setConResult(JSON.stringify(result.output))
        }
      }
    }
    catch (e) {
      setConResult(e)
    }
  }

  const startFetchConcurrent = async () => {
    setConLoading(true)
    try {
      const response = await fetch("https://js-actividades.azurewebsites.net/api/StartWithOrchestration")
      if (response.ok) {
        const url = await response.json();
        return pollConcurrentStatusUrl(url)
      }
    } catch (e) {
      setConResult(e)
    } finally {
      setConLoading(false)
    }
  }

  const startFetch = async () => {
    startFetchConcurrent()
  }


  return (
    <div className="main" >
      <button className="button" onClick={startFetch}>
        Start Race
      </button>
      <div className="request-container">
        <div className="request">
        { conLoading ?
            <div>Loading...</div>
          :
            <div className="result">
              { conResult }
            </div> 
        }
        </div>
        <div className="request">
        { conLoading ?
            <div>Loading...</div>
          :
            <div className="result">
              { conResult }
            </div> 
        }
        </div>
      </div>
    </div>      
  )
}
