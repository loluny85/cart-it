import React, { useEffect, useContext } from "react";
import {
  Grid,
  Typography,
  Button,
  CardMedia,
  IconButton,
  CardContent,
  Card,
  Box,
} from "@material-ui/core";
import { AppContext } from "../../App";
import { Link, withRouter } from "react-router-dom";
import { PRODUCTS, CHECKOUT_ADDRESS } from "../../utils/routes";
import { commerce } from "../../lib/commerce";
import DeleteIcon from "@material-ui/icons/Delete";
import useCommonStyles from "../../styles";
import useStyles from "./styles";

const Cart = (props) => {
  const { state, dispatch } = useContext(AppContext);
  const { cart, subTotal } = state;
  const {
    justifySpaceBetween,
    justifyCenter,
    alignCenter,
    alignCenterColumn,
    flex,
  } = useCommonStyles();
  const { root, media, card } = useStyles();

  useEffect(() => {
    !cart.length && fetchCart();
  }, []);

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    updateCart(cart);
  };

  const NoItemsCard = () => (
    <Grid item xs={6} className={root}>
      <Box mt={8} mb={4} className={justifyCenter}><Typography variant="h4">Shopping Cart</Typography></Box>
      <Grid container className={alignCenterColumn}>
        <Typography>There are no Items in the Cart!</Typography>
        <Button
          color="secondary"
          variant="contained"
          component={Link}
          to={PRODUCTS}
        >
          Add Products
          </Button>
      </Grid>
    </Grid>
  );

  const updateCart = (cart) => {
    const { line_items, subtotal } = cart;
    dispatch({
      type: "UPDATE_CART",
      cart: line_items,
      subTotal: subtotal.formatted_with_code,
    });
  };

  const updateQuantity = async (product_id, quantity) => {
    const { cart } = await commerce.cart.update(product_id, { quantity });
    updateCart(cart);
  };

  const removeItem = async (product_id) => {
    const { cart } = await commerce.cart.remove(product_id);
    updateCart(cart);
  };

  const ShowCartItems = () => (
    <>
      <Grid item xs={6} className={root}>
        <Box mt={8} mb={4} className={justifyCenter}><Typography variant="h4">Shopping Cart</Typography></Box>
        <Grid container>
          {cart.map((item) => {
            return (
              <Grid key={item.id} item xs={4} className={justifyCenter}>
                <Card className={card}>
                  <CardMedia className={media} image={item.media.source} />
                  <Box>
                    <CardContent>
                      <Typography gutterBottom variant="h6">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.line_total.formatted_with_code}
                      </Typography>
                    </CardContent>
                    <Box className={`${alignCenter} ${justifySpaceBetween}`}>
                      <Box className={alignCenter}>
                        <IconButton
                          color="primary"
                          aria-label="Remote item from Cart"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton
                          color="primary"
                          aria-label="Remote item from Cart"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </IconButton>
                      </Box>
                      <IconButton
                        color="primary"
                        aria-label="Remote item from Cart"
                        onClick={() => removeItem(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Box pb={4} />
      </Grid>
      <Grid
        item
        xs={4}
        className={flex}
        style={{ height: "45px", marginTop: "32px" }}
      >
        <Box mr={3} ml={8}>
          <Typography variant="h5">Total: {subTotal}</Typography>
          <Button
            color="secondary"
            variant="contained"
            component={Link}
            to={PRODUCTS}
          >
            Add more products
          </Button>
        </Box>
        <Button
          component={Link}
          to={CHECKOUT_ADDRESS}
          color="primary"
          variant="contained"
        >
          Checkout
        </Button>
      </Grid>
    </>
  );

  return (
    <>
      {cart.length === 0 && <NoItemsCard />}
      {cart.length > 0 && <ShowCartItems />}
    </>
  );
};

export default withRouter(Cart);
