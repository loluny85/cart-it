import React, { useContext } from "react";
import { Grid, Typography, Box } from "@material-ui/core";
import useStyles from "./styles"
import AddressForm from "./AddressForm"
import PaymentForm from "./PaymentForm"
import { AppContext } from "../../App"
import useCommonStyles from "../../styles";

const Checkout = () => {
  const { root } = useStyles()
  const { justifyCenter } = useCommonStyles()
  const { state, dispatch } = useContext(AppContext)
  return (
    <Grid container className={root}>
      <Grid item xs={12}>
        <Box mt={8} className={justifyCenter}><Typography variant="h4">Step 1/2: Address Details</Typography></Box>
        <AddressForm />
      </Grid>
    </Grid>
  );
};

export default Checkout;
