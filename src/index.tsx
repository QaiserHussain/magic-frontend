import { MuiThemeProvider } from "@material-ui/core";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { theme } from "./shared/theme";
import rootReducers from "./store";
const queryClient = new QueryClient();
const store = createStore(rootReducers);

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {/* <StylesProvider injectFirst> */}
          <MuiThemeProvider theme={theme}>
            <Provider store={store}>
              <App />
            </Provider>
          </MuiThemeProvider>
          {/* </StylesProvider> */}
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </BrowserRouter>
      </QueryClientProvider>

    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
