import React, { useContext } from "react";
import { AppContext } from '../../App'
import { IconButton, Badge, Typography, Box } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { withRouter, useLocation } from 'react-router-dom'
import * as routes from '../../utils/routes'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import fire from "../../fire";

const MainCartIcon = (props) => {
  const { state, dispatch } = useContext(AppContext)
  const { cart, userName, loggedIn } = state;

  const { pathname } = useLocation()
  const { PRODUCTS, CART, LOGIN, ERROR } = routes;
  const hideMainCartIcon = pathname !== PRODUCTS

  const navigate = () => {
    props.history.push(CART)
  }

  const logout = () => {
    fire.auth().signOut()
      .then(() => {
        dispatch({
          type: "LOGOUT_STATUS",
          loggedIn: false
        })
        props.history.push(LOGIN)
      })
      .catch(() => {
        props.history.push(ERROR)
      })
  }

  return (
    <IconButton aria-label="cart" >
      <Typography variant="h6">{userName}</Typography>
      <Box mr={2}></Box>
      {!hideMainCartIcon &&
        <Badge badgeContent={cart.length} color="secondary">
          <ShoppingCartIcon onClick={navigate} />
        </Badge>
      }
      {
        loggedIn && <Box ml={3}><ExitToAppIcon onClick={logout} /></Box>
      }
    </IconButton>
  );
};

export default withRouter(MainCartIcon);
