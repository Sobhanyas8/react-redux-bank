import { combineReducers, createStore } from "redux";

// NOTE: CREATE INITIAL STATE /////////////////////////////////////////
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCostumer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

// NOTE: CREATE REDUCER FUNCTION   /////////////////////////////////////////
function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

// SECTION:
function customerReducer(state = initialStateCostumer, action) {
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

// NOTE: CREATING ROOT REDUCER
const rootReducer = combineReducers({
  account: accountReducer,
  custumer: customerReducer,
});

// NOTE: CREATE STORE  //////////////////////////////////
const store = createStore(rootReducer);

// NOTE: ACTION CREATOR FUNCTIONS //////////////////////////////////
function deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}
function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount: amount, purpose: purpose },
  };
}
function payLoan() {
  return { type: "account/payLoan" };
}

// SECTION:
function createCustomer(fullName, nationalID) {
  return {
    type: "account/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toDateString() },
  };
}

function updateName(fullName) {
  return {
    type: "account/updateName",
    payLoan: fullName,
  };
}

// NOTE: DISPATCHING ATTIONS TO STORE ///////////////////////
store.dispatch(deposit(500));
store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(1000, "Buy a Car"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

store.dispatch(createCustomer("Sobhan Yasami", "1298323459"));
console.log(store.getState());