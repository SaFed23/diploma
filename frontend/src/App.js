import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import BaseComponent from "./components/BaseComponent";
import Login from "./routes/Auth"
import Main from "./routes/Main";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Route path="/login" component={() => <Login />} />
          <Route exact path="/" component={() => <BaseComponent component={<Main />} />} />
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
