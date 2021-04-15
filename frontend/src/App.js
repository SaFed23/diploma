import React, { Suspense, createRef } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import BaseComponent from "./components/BaseComponent";
import Login from "./routes/Auth"
import store from "./store";
import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { routes } from "./routes.config";
import Notifier from "./Notifier";

function App() {
  const notistackRef = createRef();
  const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key);
  }

  return (
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        preventDuplicate
        ref={notistackRef}
        action={(key) => (
          <IconButton onClick={onClickDismiss(key)}>
            <Close />
          </IconButton>
        )}
      >
        <Notifier />
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Route path="/login" component={() => <Login />} />
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  exact={route.exact}
                  path={route.path}
                  component={() => <BaseComponent component={route.component} />}
                />
              )
            })}
          </Suspense>
        </BrowserRouter>
      </SnackbarProvider>
    </Provider >
  );
}

export default App;
