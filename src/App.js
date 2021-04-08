import { createContext, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Products from "./components/products";
import Cart from "./components/cart";
import Login from "./components/login";
import Checkout from "./components/checkout/AddressForm";
import Payment from "./components/checkout/PaymentForm";
import Error from "./components/error";
import Confirmation from "./components/confirmation";
import appReducer from "./store/appReducer";
import initialState from "./store/initialState";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import * as routes from "./utils/routes";
import ProtectedRoute from "./utils/ProtectedRoute"
import { red } from '@material-ui/core/colors'
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
    error: {
      main: red[500]
    }
  },
});

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { LOGIN, PRODUCTS, CART, CHECKOUT_ADDRESS, CHECKOUT_PAYMENT, ERROR, CONFIRMATION } = routes;
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path={LOGIN} component={Login} />
            <Route path={ERROR} component={Error} />
            <ProtectedRoute path={PRODUCTS} component={Products} />
            <ProtectedRoute path={CART} component={Cart} />
            <ProtectedRoute path={CHECKOUT_ADDRESS} component={Checkout} />
            <ProtectedRoute path={CHECKOUT_PAYMENT} component={Payment} />
            <ProtectedRoute path={CONFIRMATION} component={Confirmation} />
          </Switch>
        </Router>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
