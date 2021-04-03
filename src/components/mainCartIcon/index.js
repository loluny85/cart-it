import React, { useContext } from "react";
import { AppContext } from '../../App'
import { IconButton, Badge } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { withRouter, useLocation } from 'react-router-dom'
import * as routes from '../../utils/routes'

const MainCartIcon = (props) => {
  const { state, dispatch } = useContext(AppContext)
  const { cart } = state;

  const { pathname } = useLocation()
  const { CART, CHECKOUT } = routes;
  const hideMainCartIcon = pathname === CART || pathname === CHECKOUT

  const navigate = () => {
    props.history.push(CART)
  }

  return (
    !hideMainCartIcon && <IconButton aria-label="cart" onClick={navigate}>
      <Badge badgeContent={cart.length} color="secondary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

export default withRouter(MainCartIcon);
