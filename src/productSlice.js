import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchProductsFromFile = createAsyncThunk(
  "products/fetchProductsFromFile",
  async () => {
    try {
      const response = await axios.get("http://localhost:8000/products");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const addTasktoserver = createAsyncThunk(
  "products/addTasktoserver",
  async ({ name, price }) => {
    const options = {
      method: "POST",
      body: JSON.stringify({ name, price }),
      headers: {
        "Content-type": "application/json; charset-UTF-8",
      },
    };
    const response = await fetch("http://localhost:8000/products", options);
    if (response.ok) {
      return response.data;
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },

  reducers: {
    addProductToList: (state, action) => {
      state.data = [...state.data, action.payload];
    },

    updateProductToList: (state, action) => {
      const { oldName, newName, price } = action.payload;
      const productIndex = state.data.findIndex(
        (product) => product.name === oldName
      );

      if (productIndex !== -1) {
        state.data[productIndex] = {
          ...state.data[productIndex],
          name: newName,
          price: price,
        };
      }
    },

    deleteProductFromList: (state, action) => {
      const deletedProductName = action.payload;
      state.data = state.data.filter(
        (product) => product.name !== deletedProductName
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsFromFile.pending, (state) => {
        console.log("Fetching data...");
        state.isLoading = true;
      })
      .addCase(fetchProductsFromFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchProductsFromFile.rejected, (state, action) => {
        console.error("Error fetching data:", action.payload);
        state.error = action.payload.error;
        state.data = [];
      })
      .addCase(addTasktoserver.pending, (state) => {
        console.log("Fetching data...");
        state.isLoading = true;
      })
      .addCase(addTasktoserver.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = [...state.data, action.payload];
      })
      .addCase(addTasktoserver.rejected, (state, action) => {
        console.error("Error fetching data:", action.payload);
        state.error = action.payload.error;
        state.data = [];
      });
  },
});
export const { addProductToList, updateProductToList, deleteProductFromList } =
  productSlice.actions;
export default productSlice.reducer;
