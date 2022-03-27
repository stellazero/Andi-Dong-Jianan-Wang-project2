import React from "react";
import { Route, Routes } from "react-router-dom";

import Homepage from "./components/Homepage";
import Rule from "./components/Rule";
import GameEasy from "./components/GameEasy";
import GameNormal from "./components/GameNormal";
import GameHard from "./components/GameHard";
import Title from "./components/Title";

export default function App() {
  return (
      <div>
          <Title />
          <Routes>
             <Route exact path="/" element={<Homepage />} />
             <Route path="Rule" element={<Rule />} />
             <Route path="GameEasy" element={<GameEasy />} />
             <Route path="GameNormal" element={<GameNormal />} />
             <Route path="GameHard" element={<GameHard />} />
         </Routes>
      </div>
  );
}