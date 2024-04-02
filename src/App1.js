import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Update from "./second/Update";
import Add from "./second/Add";

const App1 = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Add />}></Route>
          <Route path="/update/:name" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App1;
