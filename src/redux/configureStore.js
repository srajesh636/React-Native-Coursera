import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { dishes } from "./dishes";
import { comments } from "./comments";
import { promotions } from "./promotions";
import { leaders } from "./leaders";
import { favourites } from "./favourites";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage";

const config = {
  key: "root",
  storage,
  debug: true
};

export const ConfigureStore = () => {
  const store = createStore(
    persistCombineReducers(config, {
      dishes,
      comments,
      promotions,
      leaders,
      favourites
    }),
    {},
    applyMiddleware(thunk, createLogger())
  );

  const persistor = persistStore(store);

  return { persistor, store };
};
