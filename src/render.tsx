import {RootStateType} from "./redux/state";
import ReactDOM from "react-dom";
import React from "react";
import App from "./App";

export const renderTree = (state: RootStateType) => {
  ReactDOM.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>,
    document.getElementById('root')
  );
}