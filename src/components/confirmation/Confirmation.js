import React, { useState, useEffect, useContext } from "react";
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
import { PRODUCTS, CHECKOUT_ADDRESS, ERROR, LOGIN } from "../../utils/routes";
import { commerce } from "../../lib/commerce";
import DeleteIcon from "@material-ui/icons/Delete";
import useCommonStyles from "../../styles";
import useStyles from "./styles";
import Modal from '@material-ui/core/Modal';
import fire from "../../fire";

const Confirmation = (props) => {
    const { state, dispatch } = useContext(AppContext);
    const [open, setOpen] = React.useState(false);
    const {
        justifySpaceBetween,
        justifyCenter,
        alignCenter,
        flex,
    } = useCommonStyles();
    const { root, media, card } = useStyles();

    useEffect(() => {
        setTimeout(() => {
            handleOpen()
        }, 5000)
    }, [])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


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
        <>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <>
                    <Typography variant="h6">Thanks for shopping with us! Would like to shop more?!</Typography>
                    <Button component={Link} to={PRODUCTS} >Shop more</Button>
                    <Button onClick={logout}>Logout</Button>
                </>
            </Modal>
            Confirmation!
            {/* TODO - Build this page */}
        </>
    );
};

export default withRouter(Confirmation);