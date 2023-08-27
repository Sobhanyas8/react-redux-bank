import { createSlice } from "@reduxjs/toolkit";

// NOTE: CREATE INITIAL STATE /////////////////////////////////////////
const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

// CREATE SLICE //////////////////////////////////

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID) {
        return {
          payload: { fullName, nationalID, createdAt: new Date().toDateString()},
        };
      },

      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});


export const {createCustomer, updateName} = customerSlice.actions;
export default customerSlice.reducer;

/*

// NOTE: CREATE REDUCER FUNCTION   /////////////////////////////////////////
export default function customerReducer(state = initialStateCostumer, action) {
  switch (action.type) {
    case "account/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };

    case "account/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

// NOTE: ACTION CREATOR FUNCTIONS //////////////////////////////////
export function createCustomer(fullName, nationalID) {
  return {
    type: "account/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toDateString() },
  };
}

export function updateName(fullName) {
  return {
    type: "account/updateName",
    payLoan: fullName,
  };
}
*/
