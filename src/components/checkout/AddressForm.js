import React, { useContext } from 'react';
import { TextField, Box, Button } from "@material-ui/core"
import { useForm } from "react-hook-form"
import useStyles from "./styles"
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import useCommonStyles from '../../styles';
import { AppContext } from '../../App'

const AddressForm = () => {
    const { state, dispatch } = useContext(AppContext)
    const { JustifyEnd } = useCommonStyles()
    const schema = yup.object().shape({
        fullName: yup.string().required().min(2),
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
                street: data.street,
                city: data.city,
                country: data.country,
                zipCode: data.zipCode
            }
        })
    }

    return (
        <form className={form} onSubmit={handleSubmit(onSubmit)}>
            <Box width="75%">
                <TextField variant="outlined" fullWidth={true} label="Full Name" inputProps={register("fullName")} />
                {errors.fullName ?.type === "required" && <p>Full name is required</p>}
                {errors.fullName ?.type === "min" && <p>Name is not valid</p>}
            </Box>
            <Box mt={2} width="75%">
                <TextField variant="outlined" fullWidth={true} label="Street" inputProps={register("street")} />
                {errors.street ?.type === "required" && <p>Street is required</p>}
                {errors.street ?.type === "min" && <p>Street is not valid</p>}
            </Box>
            <Box mt={2} width="75%">
                <TextField variant="outlined" fullWidth={true} label="City" inputProps={register("city")} />
                {errors.city ?.type === "required" && <p>City is required</p>}
                {errors.city ?.type === "min" && <p>City is not valid</p>}
            </Box>
            <Box mt={2} width="75%">
                <TextField variant="outlined" fullWidth={true} label="Country" inputProps={register("country")} />
                {errors.country ?.type === "required" && <p>Country is required</p>}
                {errors.country ?.type === "min" && <p>Country is not valid</p>}
            </Box>
            <Box mt={2} width="75%">
                <TextField variant="outlined" fullWidth={true} label="Zipcode" inputProps={register("zipCode")} />
                {errors.zipCode ?.type === "required" && <p>Zipcode is required</p>}
                {errors.zipCode ?.type === "min" && <p>Zipcode must be 5 digits</p>}
                {errors.zipCode ?.type === "matches" && <p>Zipcode must be a number only</p>}
            </Box>
            <Box mt={3} className={JustifyEnd}>
                <Button type="submit" variant="contained" color="primary">Next</Button>
            </Box>
        </form>
    );
};

export default AddressForm;