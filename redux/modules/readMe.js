import uuid from "react-native-uuid";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// action value
// const ADD_README = "ADD_README";

// action creator
// export const addReadMe = (payload) => {
//   return {
//     type: ADD_README,
//     payload: payload,
//   };
// };

// initial state
// const initialState = {
//   test: [
//     {
//       id: uuid.v4(),
//       imgUri: "",
//       title: "",
//       writer: "",
//       rating: 0,
//       period: "",
//       isDone: "",
//       bestSentence: "",
//       myThinking: "",
//     },
//   ],
// };

// reducer
// const readMe = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_README:
//       return {
//         ...state,
//         test: [...state.test, action.payload],
//       };
//     default:
//       return state;
//   }
// };

// export default readMe;

/////////////// 리덕스와 리덕스 툴킷 구분 ///////////////

// initial state
// const initialState = {
//   test: [
//     {
//       id: uuid.v4(),
//       imgUri: "",
//       title: "",
//       writer: "",
//       rating: 0,
//       period: "",
//       isDone: "",
//       bestSentence: "",
//       myThinking: "",
//     },
//   ],
// };

// action creator, reducer : createSlice
// const readMeSlice = createSlice({
//   name: "readMe",
//   initialState: initialState,
//   reducers: {
//     addReadMe: (state, action) => {
//       return {
//         ...state,
//         test: [...state.test, action.payload],
//       };
//     },
//   },
// });

// export default readMeSlice.reducer;
// export const { addReadMe } = readMeSlice.actions;

/////////////// 리덕스 툴킷과 리덕스 툴킷 떵크 구분 ///////////////

// initial state
const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

// Thunk : createAsyncThuck, fulfillWithValue, rejectWithValue
export const __getReadMe = createAsyncThunk(
  "getReadMe",
  async (payload, thunkAPI) => {
    try {
      const response_data = await axios.get("https://lying-magical-math.glitch.me/data");
      // console.log(response_data);
      // console.log(response_data.data);
      return thunkAPI.fulfillWithValue(response_data.data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __addReadMe = createAsyncThunk(
  "addReadMe",
  async (payload, thunkAPI) => {
    try {
      // console.log(payload);
      await axios.post("https://lying-magical-math.glitch.me/data", payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// action creator, reducer : createSlice
const readMeSlice = createSlice({
  name: "readMe",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__getReadMe.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(__getReadMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(__getReadMe.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(__addReadMe.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(__addReadMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = [...state.data, action.payload];
    });
    builder.addCase(__addReadMe.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { getReadMe, addReadMe } = readMeSlice.actions;
export default readMeSlice.reducer;
