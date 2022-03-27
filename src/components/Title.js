import React from "react";
import { Link } from "react-router-dom";
import "../style/Title.css";

const Title = () => {
  return (

    <div className='nav-bar'>
        <Link to="/" className="link-title" >
          WORDLE
        </Link>
        {/* <div className='nav-list'>
            <Link to="/" className="link" >Home</Link>
            <Link to="/rule" className="link" >Rule</Link>
            <Link to="/easygame" className="link" >Game</Link>
        </div> */}
    </div>

  );
}

export default Title;