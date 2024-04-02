import React, { useState } from "react";
import { addProductsToList } from "./slices/productSlice";
import { useDispatch } from "react-redux";

const Form = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    pname: "",
    pprice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    dispatch(addProductsToList(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Product Name:
        <input
          type="text"
          name="pname"
          value={formData.pname}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Product Price:
        <input
          type="text"
          name="pprice"
          value={formData.pprice}
          onChange={handleChange}
        />
        <br />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
