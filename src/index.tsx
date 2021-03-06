import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieDescriptionPage from "./pages/MovieDescriptionPage";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import BrowsePage from "./pages/BrowsePage";
import SignPage from "./pages/SignPage";

const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/description/:id" element={<MovieDescriptionPage />} />
            <Route path="/browse/:type/:sortBy" element={<BrowsePage />} />
            <Route path="/sign" element={<SignPage />}></Route>
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
