import ReactDOM from "react-dom";
import React from "react";
import App from "./App";

import store from "./redux/state";

export const renderTree = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App store = { store }
           // addPost={store.addPost.bind(store)}
           // changeNewText={store.changeNewText.bind(store)}
           dispatch = {store.dispatch.bind(store)}
      />
    </React.StrictMode>,
    document.getElementById('root')
  );
}