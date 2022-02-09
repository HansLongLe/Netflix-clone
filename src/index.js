import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieDescriptionPage from "./MovieDescriptionPage";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import BrowsePage from "./BrowsePage";

const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route exact path="/" element={<App />} />
            <Route
              exact
              path="/movies/:movieId"
              element={<MovieDescriptionPage />}
            />
            <Route
              exact
              path="/browse/:type/:genreId"
              element={<BrowsePage />}
            />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
