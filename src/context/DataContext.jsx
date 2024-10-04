/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";
import { useEffect } from "react";
import axios from "axios";

let API = "https://hn.algolia.com/api/v1/search?";

const DataContext = createContext();
const initialState = {
  isLoading: true,
  query: "CSS",
  nbPages: 0,
  page: 0,
  hits: [],
};

// reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "GET_DATA":
      return {
        ...state,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
        isLoading: false,
      };
    case "DELETE_POST":
      return {
        ...state,
        hits: state.hits.filter((p) => p.objectID !== action.payload.id),
      };
    case "SEARCH":
      return {
        ...state,
        query: (state.query = action.payload.query),
      };
    case "GET_NEXT_PAGE":
      let pageNum1 = state.page
      if (pageNum1 > state.nbPages) {
        pageNum1 = 0;
      }
      else {
        pageNum1 += 1
      }
      return {
        ...state,
        page: pageNum1
      };
    case "GET_PREVIOUS_PAGE":
      let pageNum = state.page;
      if (pageNum <= 0) {
        pageNum = 0
      } else {
        pageNum = pageNum - 1
      }
      return {
        ...state,
        page: pageNum
      }
    default:
      return state;
  }
};

export const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // delete post
  const deletePost = (id) => {
    dispatch({
      type: "DELETE_POST",
      payload: { id },
    });
  };
  const search = (query) => {
    dispatch({
      type: "SEARCH",
      payload: { query },
    });
  };

  const getNextPage = () => {
    dispatch({
      type: "GET_NEXT_PAGE"
    })
  }
  const getPreviousPage = () => {
    dispatch({
      type: "GET_PREVIOUS_PAGE"
    })
  }
  const getData = async (url) => {
    try {
      const { data } = await axios.get(url);

      dispatch({
        type: "GET_DATA",
        payload: {
          hits: data.hits,
          nbPages: data.nbPages,
        },
      });
    } catch (error) {
      console.log("API Error: ", error);
    }
  };

  useEffect(() => {
    const url = `${API}query=${state.query}&page=${state.page}`;

    getData(url);
  }, [state.query, state.page]);

  return (
    <DataContext.Provider value={{ ...state, deletePost, search, getNextPage, getPreviousPage }}>
      {children}
    </DataContext.Provider>
  );
};

export const useNews = () => {
  return useContext(DataContext);
};
