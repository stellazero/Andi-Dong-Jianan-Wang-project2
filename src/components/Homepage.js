import React from "react";
import { Link } from "react-router-dom";
import "../style/Homepage.css";
import wordle from '../img/wordle.webp';

export default function Homepage() {
  return (

    <div className='content'>
        <h1>Welcome to Wordle!</h1>
        <img src={wordle} className="logo"/>
        <Link to="/rule" className="link-rule" >How to play ?</Link>
        <h2>Start with a difficulty:</h2>
        <div className="mode">
        <Link to="/GameEasy" className="mode-link" >Easy</Link>
        <Link to="/GameNormal" className="mode-link" >Normal</Link>
        <Link to="/GameHard" className="mode-link" >Hard</Link>
        </div>
        
    </div>

  )
}