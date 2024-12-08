/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../services/api";
import { RootState } from "../store";

export interface Product {
  id: number;
  title: string;
  category: string;
  brand: string;
  rating: number;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  description?: string;
  stock?: number;
}

interface ProductState {
  products: Product[];
  product: Product | null;
  productsLoading: boolean;
  singleProductLoading: boolean;
  productsError: string | null;
  singleProductError: string | null;
  total: number;
}

const initialState: ProductState = {
  products: [],
  product: null,
  productsLoading: false,
  productsError: null,
  total: 0,
  singleProductLoading: false,
  singleProductError: null,
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (
    { skip, limit }: { skip: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(`${API_URL}`, {
        params: { skip, limit },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch products"
      );
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "product/fetchProductDetails",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch product details"
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productsLoading = true;
        state.productsError = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.productsLoading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.productsLoading = false;
        state.productsError = action.payload as string;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.singleProductLoading = true;
        state.singleProductError = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.product = action.payload;
        state.singleProductLoading = false;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.singleProductLoading = false;
        state.singleProductError = action.payload as string;
      });
  },
});

export const getProductsData = (state: RootState) => state.product;

export default productSlice.reducer;
