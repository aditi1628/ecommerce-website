import axios from "axios";
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  FETCH_SEARCH_RESULTS_REQUEST,
  FETCH_SEARCH_RESULTS_SUCCESS,
  FETCH_SEARCH_RESULTS_FAILURE,
} from "../constants/productConstants";

const axiosInstance = axios.create();

const MAX_RETRIES = 5;
const RETRY_DELAY = 1000;

const fetchWithRetry = async (url, retries = MAX_RETRIES) => {
  try {
    return await axiosInstance.get(url);
  } catch (error) {
    console.error(`Error during fetch from URL: ${url}`, error);
    if (retries > 0 && error.response && error.response.status === 429) {
      const delay = Math.pow(2, MAX_RETRIES - retries) * RETRY_DELAY;
      console.log(`Retrying in ${delay} ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(url, retries - 1);
    }
    throw error;
  }
};

export const fetchAllProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });
  try {
    const response = await fetchWithRetry(
      `https://dummyjson.com/products?limit=10`
    );
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: response.data.products,
    });
  } catch (error) {
    let errorMessage = error.message;
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    console.error(`Error message: ${errorMessage}`);
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: errorMessage });
  }
};

export const fetchProductById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCT_REQUEST });
  try {
    const response = await fetchWithRetry(
      `https://dummyjson.com/products/${id}`
    );
    dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    let errorMessage = error.message;
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    console.error(`Error message: ${errorMessage}`);
    dispatch({ type: FETCH_PRODUCT_FAILURE, payload: errorMessage });
  }
};

export const fetchSearchResults = (query) => async (dispatch) => {
  dispatch({ type: FETCH_SEARCH_RESULTS_REQUEST });
  try {
    const response = await fetchWithRetry(
      `https://dummyjson.com/products/search?q=${query}`
    );
    dispatch({
      type: FETCH_SEARCH_RESULTS_SUCCESS,
      payload: response.data.products,
    });
  } catch (error) {
    let errorMessage = error.message;
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    console.error(`Error message: ${errorMessage}`);
    dispatch({ type: FETCH_SEARCH_RESULTS_FAILURE, payload: errorMessage });
  }
};
