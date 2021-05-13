import React, { Suspense, createRef } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import BaseComponent from "./components/BaseComponent";
import Login from "./routes/Auth"
import store from "./store";
import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { routes } from "./routes.config";
import Notifier from "./Notifier";
import ConfirmProvider from "./context/ConfirmContext";

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
        <ConfirmProvider>
          <BrowserRouter>
            <Switch>
              <Suspense fallback={<div>Loading...</div>}>
                <Route path="/login" component={() => <Login />} />
                {routes.map((route, index) => {
                  return (
                    <Route
                      key={index}
                      exact={route.exact}
                      path={route.path}
                      component={() => <BaseComponent component={route.component} role={route.role} />}
                    />
                  )
                })}
                <Redirect from="*" to="/login" />
              </Suspense>
            </Switch>
          </BrowserRouter>
        </ConfirmProvider>
      </SnackbarProvider>
    </Provider >
  );
}

export default App;
