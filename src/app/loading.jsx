'use client'
import React from 'react'
import PropagateLoader from "react-spinners/PropagateLoader";


const Loading = () => {
    
    return (
      <div className="sweet-loading h-screen flex justify-center items-center ">
  
        <PropagateLoader
            color="#22d3ee"
            aria-label="Loading Spinner"
            data-testid="loader"
        />
      </div>
    );
}

export default Loading