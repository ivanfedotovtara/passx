import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers/root.reducer";

const persistedState = localStorage.getItem("passx")
  ? JSON.parse(localStorage.getItem("passx"))
  : {};

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
  localStorage.setItem("passx", JSON.stringify(store.getState()));
});

export default store;
