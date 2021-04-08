import React, { useEffect, useContext } from "react";
import {
    Grid,
    Typography,
    Button,
    CardMedia,
    Card,
    Box,
    Paper,
} from "@material-ui/core";
import { AppContext } from "../../App";
import { withRouter } from "react-router-dom";
import { PRODUCTS, ERROR, LOGIN } from "../../utils/routes";
import { commerce } from "../../lib/commerce";
import useCommonStyles from "../../styles";
import useStyles from "./styles";
import Modal from '@material-ui/core/Modal';
import fire from "../../fire";

const Confirmation = (props) => {
    const { state, dispatch } = useContext(AppContext);
    const { cart, subTotal } = state
    const [open, setOpen] = React.useState(false);
    const {
        justifySpaceBetween,
        justifyCenter,
        alignCenter,
        justifyEnd
    } = useCommonStyles();
    const { root, modalContainer, modalContent, card, media } = useStyles();

    useEffect(() => {
        setTimeout(() => {
            handleOpen()
        }, 5000)
    }, [])

    const emptyCartAndOrderDetails = (route) => {
        commerce.cart.delete()
            .then(() => {
                dispatch({
                    type: "EMPTY_CART_AND_ORDER_DETAILS",
                    cart: [],
                    subTotal: 0
                })
                props.history.push(route)
            })
            .catch(() => props.history.push(ERROR))
    }

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
                emptyCartAndOrderDetails(LOGIN);
            })
            .catch(() => {
                props.history.push(ERROR)
            })
    }

    const navigateToProducts = () => {
        emptyCartAndOrderDetails(PRODUCTS);
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                className={modalContainer}
            >
                <Box className={modalContent}>
                    <Typography variant="h6">Thanks for shopping with us! Would you like to shop more?</Typography>
                    <Box className={justifySpaceBetween} mt={3}>
                        <Button color="primary" variant="outlined" onClick={logout}>Logout</Button>
                        <Button color="primary" variant="contained" onClick={navigateToProducts} >Shop more</Button>
                    </Box>
                </Box>
            </Modal>
            <Grid item xs={6}>
                <Box mt={8} mb={4} className={justifyCenter}><Typography variant="h4">Confirmation</Typography></Box>
                <Paper>
                    <Box ml={4} mr={4} pt={4} pb={4} className={`${justifySpaceBetween} ${alignCenter}`}>
                        <Typography variant="h6">#</Typography>
                        <Box />
                        <Typography variant="h6">PRODUCT</Typography>
                        <Typography variant="h6">QUANTITY</Typography>
                        <Typography variant="h6">PRICE</Typography>
                    </Box>
                    {cart.map((item, index) => {
                        return (<Box ml={4} mr={4} mt={3} className={`${justifySpaceBetween} ${alignCenter}`} key={item.id}>
                            <Box>{index + 1}</Box>
                            <Box>
                                <Card className={card}>
                                    <CardMedia className={media} image={item.media ?.source} />
                                </Card>
                            </Box>
                            <Box>
                                {item.name}
                            </Box>
                            <Box>{item.quantity}</Box>
                            <Box>{item.price.formatted_with_code}</Box>
                        </Box>
                        )
                    }
                    )}
                    <Box mt={4} mr={4} className={justifyEnd}>
                        <Typography variant="h5">Total</Typography>
                        <Box ml={3}></Box>
                        <Typography variant="h5">{subTotal}</Typography>
                    </Box>
                </Paper>
            </Grid>
        </>
    );
};

export default withRouter(Confirmation);