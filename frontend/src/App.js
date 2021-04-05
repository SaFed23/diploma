import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./routes/Auth"
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Route path="/login" component={() => <Login />} />
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
