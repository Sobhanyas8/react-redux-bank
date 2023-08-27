import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";



// NOTE: CREATING ROOT REDUCER
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// NOTE: CREATE STORE  //////////////////////////////////
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));



export default store;