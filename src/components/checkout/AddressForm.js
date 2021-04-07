import React, { useContext, useEffect } from 'react';
import { TextField, Box, Button, Typography, Grid } from "@material-ui/core"
import { useForm } from "react-hook-form"
import useStyles from "./styles"
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import useCommonStyles from '../../styles';
import { AppContext } from '../../App'
import { withRouter } from 'react-router-dom'
import { CHECKOUT_PAYMENT } from '../../utils/routes'
import BaseLayout from "../../layouts/BaseLayout"

const AddressForm = (props) => {
    const { state, dispatch } = useContext(AppContext)
    const { address } = state;
    const { JustifyEnd, justifyCenter } = useCommonStyles()
    const schema = yup.object().shape({
        fullName: yup.string().required().min(2),
        email: yup.string().required().matches(/^\S+@\S+\.\S+$/),
        phone: yup.string().required().min(10),
        street: yup.string().required().min(6),
        city: yup.string().required().min(3),
        country: yup.string().required().min(5),
        zipCode: yup.string().required().min(5).matches(/[0-9]{5}/),
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema)
    })
    const { form } = useStyles()

    const onSubmit = (data) => {
        dispatch({
            type: "UPDATE_ADDRESS",
            address: {
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                street: data.street,
                city: data.city,
                country: data.country,
                zipCode: data.zipCode
            },
        })
        props.history.push(CHECKOUT_PAYMENT);
    }

    return (
        <BaseLayout>
            <Grid item xs={6}>
                <Box mt={8} className={justifyCenter}><Typography variant="h4">Step 1/2: Address Details</Typography></Box>
                <form className={form} onSubmit={handleSubmit(onSubmit)}>
                    <Box width="75%">
                        <TextField variant="outlined" fullWidth={true} label="Full Name" value={address ?.fullName} inputProps={register("fullName")} />
                        {errors.fullName ?.type === "required" && <p>Full name is required</p>}
                        {errors.fullName ?.type === "min" && <p>Name is not valid</p>}
                    </Box>
                    <Box mt={2} width="75%">
                        <TextField variant="outlined" fullWidth={true} label="Email" value={address ?.email} inputProps={register("email")} />
                        {errors.email ?.type === "required" && <p>Emai is required</p>}
                        {errors.email ?.type === "matches" && <p>Enter a valid email</p>}
                    </Box>
                    <Box mt={2} width="75%">
                        <TextField type="number" variant="outlined" fullWidth={true} label="Phone" value={address ?.phone} inputProps={register("phone")} />
                        {errors.phone ?.type === "required" && <p>Phone is required</p>}
                    </Box>
                    <Box mt={2} width="75%">
                        <TextField variant="outlined" fullWidth={true} label="Street" value={address ?.street} inputProps={register("street")} />
                        {errors.street ?.type === "required" && <p>Street is required</p>}
                        {errors.street ?.type === "min" && <p>Street is not valid</p>}
                    </Box>
                    <Box mt={2} width="75%">
                        <TextField variant="outlined" fullWidth={true} label="City" value={address ?.city} inputProps={register("city")} />
                        {errors.city ?.type === "required" && <p>City is required</p>}
                        {errors.city ?.type === "min" && <p>City is not valid</p>}
                    </Box>
                    <Box mt={2} width="75%">
                        <TextField variant="outlined" fullWidth={true} label="Country" value={address ?.country} inputProps={register("country")} />
                        {errors.country ?.type === "required" && <p>Country is required</p>}
                        {errors.country ?.type === "min" && <p>Country is not valid</p>}
                    </Box>
                    <Box mt={2} width="75%">
                        <TextField type="number" variant="outlined" fullWidth={true} label="Zipcode" value={address ?.zipCode} inputProps={register("zipCode")} />
                        {errors.zipCode ?.type === "required" && <p>Zipcode is required</p>}
                        {errors.zipCode ?.type === "min" && <p>Zipcode must be 5 digits</p>}
                        {errors.zipCode ?.type === "matches" && <p>Zipcode must be a number only</p>}
                    </Box>
                    <Box mt={3} className={JustifyEnd}>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
                    </Box>
                </form>
            </Grid>
        </BaseLayout>
    );
};

export default withRouter(AddressForm)