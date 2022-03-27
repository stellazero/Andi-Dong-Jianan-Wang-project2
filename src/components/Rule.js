import React from "react";
import "../style/Rule.css";

export default function Rule() {
  return (
    <div>
        <div className='rule-content'>
            <h2>How to play?</h2>
            <p>Guess the WORDLE in six tries.</p>
            <p>Each guess must be a valid word. Hit the enter button to submit.</p>
        </div>
    </div>
  )
}