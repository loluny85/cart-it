import React, { useContext } from "react";
import { AppContext } from '../../App'
import { IconButton, Badge, Typography, Box } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { withRouter, useLocation } from 'react-router-dom'
import * as routes from '../../utils/routes'

const MainCartIcon = (props) => {
  const { state, dispatch } = useContext(AppContext)
  const { cart, userName } = state;

  const { pathname } = useLocation()
  const { CART, CHECKOUT } = routes;
  const hideMainCartIcon = pathname === CART || pathname === CHECKOUT

  const navigate = () => {
    props.history.push(CART)
  }

  return (
    <IconButton aria-label="cart" onClick={navigate}>
      <Typography variant="h6">{userName}</Typography>
      <Box mr={2}></Box>
      {!hideMainCartIcon &&
        <Badge badgeContent={cart.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      }
    </IconButton>
  );
};

export default withRouter(MainCartIcon);
