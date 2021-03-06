import React, { useContext, useState } from 'react';
import { Box, Button, Typography, Grid, CircularProgress, Paper } from "@material-ui/core"
import BaseLayout from "../../layouts/BaseLayout"
import useStyles from "./styles"
import useCommonStyles from '../../styles';
import { AppContext } from '../../App'
import { withRouter } from 'react-router-dom'
import { CONFIRMATION, ERROR } from '../../utils/routes'
import { URL_POST_ORDER_DETAILS } from '../../utils/constants'
import { loadStripe } from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';

const MyComponent = (props) => {
    const { state } = useContext(AppContext)
    const { subTotal, email: loginEmail, cart, address: shippingAddress } = state
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const { justifyCenter, buttonLoader } = useCommonStyles()
    const { paymentForm } = useStyles()
    const stripe = useStripe();
    const elements = useElements();

    const constructRequestPayload = (stripeResponse) => {
        const { card, billing_details } = stripeResponse
        const { funding, brand, last4, exp_year } = card
        const { address } = billing_details
        const { postal_code } = address;
        const { fullName, email, phone, street, city, country, zipCode } = shippingAddress
        return {
            personalDetails: {
                loginEmail,
                fullName,
                email,
                phone
            },
            shippingDetails: {
                street,
                city,
                country,
                zipCode
            },
            productDetails: cart.map((item) => {
                const { product_id, product_name, price, quantity } = item
                const { formatted_with_code } = price
                return {
                    productId: product_id,
                    productName: product_name,
                    productPrice: formatted_with_code,
                    productQuantity: quantity
                }
            }),
            paymentDetails: {
                paymentType: funding,
                finalAmount: subTotal,
                cardBrand: brand,
                cardLast4Digits: last4,
                cardExpiryDate: exp_year,
                cardPostalCode: postal_code
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("")
        setLoading(true)
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });
        if (error) {
            setLoading(false)
            setError(error)
        }
        if (!error && paymentMethod) {
            // The Stripe payment was a success
            axios({
                method: 'post',
                url: URL_POST_ORDER_DETAILS,
                data: constructRequestPayload(paymentMethod)
            })
                .then(() => {
                    props.history.push(CONFIRMATION)
                })
                .catch(() => {
                    props.history.push(ERROR)
                })
        }
    };

    return (
        <Box pt={8} >
            <Paper className={justifyCenter}>
                <form onSubmit={handleSubmit} className={paymentForm}>
                    <CardElement options={{
                        style: {
                            base: {
                                fontSize: '24px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }} />
                    <Box className={justifyCenter} mt={6} mb={4}>
                        <p>{error ?.message}</p>
                        <Button color="primary" variant="contained" type="submit" disabled={!stripe || loading}>
                            {loading && <CircularProgress size={25} className={buttonLoader} />}
                            <Typography variant="h6">{`Pay ${subTotal}`}</Typography>
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    )
};

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = (props) => {
    const { justifyCenter } = useCommonStyles()
    return (
        <BaseLayout>
            <Grid item xs={6}>
                <Box mt={8} className={justifyCenter}><Typography variant="h4">Checkout: Payment Details</Typography></Box>
                <Elements stripe={stripePromise}>
                    <MyComponent {...props} />
                </Elements>
            </Grid>
        </BaseLayout>
    )
};

export default withRouter(PaymentForm)