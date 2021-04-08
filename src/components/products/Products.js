import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../App";
import { commerce } from "../../lib/commerce";
import {
  Grid,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { withRouter } from "react-router-dom";
import useStyles from "./styles";
import useCommonStyles from "../../styles";

const Products = () => {
  const { state, dispatch } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { root, card, media, progress } = useStyles();
  const { justifyCenter, justifySpaceBetween } = useCommonStyles();

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setLoading(false);
    setProducts(data);
  };

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    const { line_items, subtotal } = cart;
    dispatch({
      type: "UPDATE_CART",
      cart: line_items,
      subTotal: subtotal.formatted_with_code,
    });
    setLoading(false);
  };

  const addItemToCart = async (product_id, quantity) => {
    await commerce.cart.add(product_id, quantity);
    fetchCart();
  };

  return loading ? (
    <Box className={progress}>
      <CircularProgress />
    </Box>
  ) : (
      <Grid container className={root}>
        <Grid item xs={12} mt={8} mb={4} className={justifyCenter}><Typography variant="h4">Products</Typography></Grid>
        {products.map((product) => (
          <Grid item xs={3} key={product.id} className={justifyCenter}>
            <Card className={card}>
              <CardMedia className={media} image={product.media ?.source} />
              <Box className={justifySpaceBetween}>
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.price.formatted_with_code}
                  </Typography>
                </CardContent>
                <IconButton
                  color="primary"
                  aria-label="Add to shopping cart"
                  onClick={() => addItemToCart(product.id, 1)}
                >
                  <AddShoppingCartIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
};

export default withRouter(Products);
