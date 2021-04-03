import { createContext, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Products from "./components/products";
import Cart from "./components/cart";
import Checkout from "./components/checkout";
import appReducer from "./store/appReducer";
import initialState from "./store/initialState";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import * as routes from "./utils/routes";
import "./App.css";

export const AppContext = createContext();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#E40047",
    },
    secondary: {
      main: "#3F3F3F",
    },
  },
});

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { PRODUCTS, CART, CHECKOUT } = routes;
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path={PRODUCTS} component={Products} />
            <Route path={CART} component={Cart} />
            <Route path={CHECKOUT} component={Checkout} />
          </Switch>
        </Router>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
