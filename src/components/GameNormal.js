import React, { useEffect, useState } from 'react';
import '../style/Game.css';
import Keyboard from './Keyboard';
import { wordListNormal } from '../dictionary/WordListNormal';

const GameNormal = () => {
  const [boardData, setBoardData] = useState(JSON.parse(localStorage.getItem("board-data-2")));
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [charArray, setCharArray] = useState([]);

  const resetBoard = () => {
    var alphabetIndex = Math.floor(Math.random()*26);
    var wordIndex = Math.floor(Math.random()*wordListNormal[String.fromCharCode(97 + alphabetIndex)].length);
    let newBoardData = {...boardData, "solution":wordListNormal[String.fromCharCode(97 + alphabetIndex)][wordIndex],
                          "rowIndex": 0, "boardWords":[], "boardRowStatus":[], "presentCharArray":[],
                          "absentCharArray":[], "correctCharArray":[], "status":"IN_PROGRESS"};
    setBoardData(newBoardData);
    localStorage.setItem('board-data-2', JSON.stringify(newBoardData));
  }

  const handleMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }

  const handleError = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 2000);
  }

  const enterBoardWord = (word) => {
    let boardWords=boardData.boardWords;
    let boardRowStatus=boardData.boardRowStatus;
    let solution=boardData.solution;
    let presentCharArray=boardData.presentCharArray;
    let absentCharArray=boardData.absentCharArray;
    let correctCharArray=boardData.correctCharArray;
    let rowIndex=boardData.rowIndex;
    let rowStatus =[];
    let matchCount=0;
    let status=boardData.status;

    for(var index = 0; index < word.length; index++) {
      if(solution.charAt(index) === word.charAt(index)) {
        matchCount++;
        rowStatus.push("correct");
        if(!correctCharArray.includes(word.charAt(index))) correctCharArray.push(word.charAt(index));
        if(presentCharArray.indexOf(word.charAt(index))!== -1) presentCharArray.splice(presentCharArray.indexOf(word.charAt(index)), 1);
      } else if(solution.includes(word.charAt(index))){
        rowStatus.push("present");
        if(!presentCharArray.includes(word.charAt(index)) && !correctCharArray.includes(word.charAt(index))) presentCharArray.push(word.charAt(index));
      } else {
        rowStatus.push("absent");
        if(!absentCharArray.includes(word.charAt(index))) absentCharArray.push(word.charAt(index));
      }
    }
    console.log(solution);
    if(matchCount === 6) {
      status="WIN";
      handleMessage("Congratulations!  Would you like to try again?")
    } else if(rowIndex + 1 === 7) {
      status = "LOST";
      handleMessage("The answer is: " + boardData.solution);
    }
    boardRowStatus.push(rowStatus);
    boardWords[rowIndex] = word;
    let newBoardData = {...boardData,
                        "boardWords": boardWords,
                      "boardRowStatus": boardRowStatus,
                    "rowIndex": rowIndex + 1,
                  "status": status,
                "presentCharArray": presentCharArray,
              "correctCharArray": correctCharArray,
            "absentCharArray": absentCharArray};
    setBoardData(newBoardData);
    localStorage.setItem("board-data-2", JSON.stringify(newBoardData));
  }

  const enterCurrentText=(word) => {
    let boardWords = boardData.boardWords;
    let rowIndex = boardData.rowIndex;
    boardWords[rowIndex] = word;
    let newBoardData = {...boardData, "boardWords": boardWords};
    setBoardData(newBoardData);
  }

  const handleKeyPress = (key) => {
    if(boardData.rowIndex > 6 || boardData.status === "WIN") return;
    if(key === "ENTER"){
      if(charArray.length === 6) {
        let word = charArray.join("").toLowerCase();
        if(!wordListNormal[word.charAt(0)].includes(word)) {
          handleError();
          handleMessage("Not in the word list");
          return;
        }
        enterBoardWord(word);
        setCharArray([]);
      } else {
        handleMessage("Not enough letters");
      }
      return;
    }
    if(key === "???") {
      charArray.splice(charArray.length - 1, 1);
      setCharArray([...charArray]);
    } else if(charArray.length < 6) {
      charArray.push(key);
      setCharArray([...charArray]);
    }
    enterCurrentText(charArray.join("").toLowerCase());
  }

  useEffect(() => {
    if(!boardData || !boardData.solution) {
      var alphabetIndex = Math.floor(Math.random()*26);
      var wordIndex = Math.floor(Math.random() * wordListNormal[String.fromCharCode(97 + alphabetIndex)].length);
      let newBoardData = {...boardData, "solution": wordListNormal[String.fromCharCode(97 + alphabetIndex)][wordIndex],
                          "rowIndex": 0, "boardWords":[], "boardRowStatus":[], "presentCharArray":[],
                          "absentCharArray":[], "correctCharArray":[], "status":"IN_PROGRESS"}
      setBoardData(newBoardData);
      localStorage.setItem('board-data-2', JSON.stringify(newBoardData));
    }
  }, []);
  return (
    <div className='container'>
      <div className='top'>
        <button className='reset-board' onClick={resetBoard}>{"\u27f3"}</button>
      </div>
      {message && <div className='message'>{message}</div>}
      <div className='cube'>
        {[0, 1, 2, 3, 4, 5].map((row, rowIndex) =>(
          <div className={`cube-row ${boardData && row===boardData.rowIndex && error && "error"}`} key={rowIndex}> {
            [0, 1, 2, 3, 4, 5].map((column, letterIndex)=>(
              <div key={letterIndex} className={`letter ${boardData && boardData.boardRowStatus[row] ? boardData.boardRowStatus[row][column] :""}`}>
                {boardData && boardData.boardWords[row] && boardData.boardWords[row][column]}
              </div>
            ))
          }
          </div>

        ))}
      </div>
      <div className='bottom'>
        <Keyboard boardData={boardData} 
                  handleKeyPress = {handleKeyPress}/>
      </div>
    </div>
  );
};

export default GameNormal;

