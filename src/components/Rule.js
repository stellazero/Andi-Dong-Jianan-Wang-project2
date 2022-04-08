import React from "react";
import "../style/Rule.css";
import rule from "../img/rule.png";

export default function Rule() {
  return (
    <div>
        <div className='rule-content'>
            <h2>How to play?</h2>
            <div className='ruleBody'>
                <p>Guess the WORDLE in 7 tries for Easy, 6 tries for Normal, and 5 tries for Hard.</p>
                <p>Every word you enter must be in the word list. </p>
                <p>That hasn't been disclosed, but presumably it's based on a dictionary.</p>
                <p>A correct letter turns <span className='green'><strong>GREEN</strong></span>.</p>
                <p>A correct letter in the wrong place turn <span className='yellow'><strong>YELLOW</strong></span>.</p>
                <p>An incorrect letter turns <span className='gray'><strong>GRAY</strong></span>.</p>
                <p>Letters can be used more than once.</p>
                <img src={rule} className='ruleExample'/>
            </div>
        </div>
    </div>
  )
}