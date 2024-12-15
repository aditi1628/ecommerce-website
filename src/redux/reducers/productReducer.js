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

const initialState = {
  products: [],
  product: {},
  searchResults: {
    loading: false,
    error: null,
    results: [],
  },
  loading: false,
  error: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
    case FETCH_PRODUCT_REQUEST:
      return { ...state, loading: true };

    case FETCH_SEARCH_RESULTS_REQUEST:
      return {
        ...state,
        searchResults: { ...state.searchResults, loading: true, error: null },
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, ...action.payload],
      };

    case FETCH_PRODUCT_SUCCESS:
      return { ...state, loading: false, product: action.payload };

    case FETCH_SEARCH_RESULTS_SUCCESS:
      return {
        ...state,
        searchResults: { loading: false, results: action.payload, error: null },
      };

    case FETCH_PRODUCTS_FAILURE:
    case FETCH_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_SEARCH_RESULTS_FAILURE:
      return {
        ...state,
        searchResults: { loading: false, results: [], error: action.payload },
      };

    default:
      return state;
  }
};

export default productReducer;
