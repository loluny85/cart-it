import React, { useContext, useEffect, useState } from 'react';
import { TextField, Box, Button, Typography, Grid } from "@material-ui/core"
import BaseLayout from "../../layouts/BaseLayout"
import { useForm } from "react-hook-form"
import useStyles from "./styles"
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import useCommonStyles from '../../styles';
import { AppContext } from '../../App'
import { withRouter } from 'react-router-dom'
import { CHECKOUT_PAYMENT, CONFIRMATION, ERROR } from '../../utils/routes'
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
    const { justifyCenter } = useCommonStyles()
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
        const url_post_order_details = 'https://orderdetails.free.beeceptor.com'
        event.preventDefault();
        setError("")
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });
        if (error) {
            setError(error)
        }
        if (!error && paymentMethod) {
            // The Stripe payment was a success
            axios({
                method: 'post',
                url: url_post_order_details,
                data: constructRequestPayload(paymentMethod)
            })
                .then((response) => {
                    props.history.push(CONFIRMATION)
                })
                .catch((err) => {
                    props.history.push(ERROR)
                })
        }
    };

    return (
        <Box pt={8} className={justifyCenter}>
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
                <Box className={justifyCenter} mt={6}>
                    <p>{error ?.message}</p>
                    <Button color="primary" variant="contained" type="submit" disabled={!stripe}>
                        {`Pay ${subTotal}`}
                    </Button>
                </Box>
            </form>
        </Box>
    )
};

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = (props) => {
    const { justifyCenter } = useCommonStyles()
    return (
        <BaseLayout>
            <Grid item xs={6}>
                <Box mt={8} className={justifyCenter}><Typography variant="h4">Step 2/2: Payment Details</Typography></Box>
                <Elements stripe={stripePromise}>
                    <MyComponent {...props} />
                </Elements>
            </Grid>
        </BaseLayout>
    )
};

export default withRouter(PaymentForm)