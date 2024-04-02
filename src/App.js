import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProducts from "./AddProducts";
import UpdateProduct from "./UpdateProduct";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<AddProducts />}></Route>
          <Route path="/update/:name" element={<UpdateProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
