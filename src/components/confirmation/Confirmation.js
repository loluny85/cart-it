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

const Confirmation = (props) => {
    const { state, dispatch } = useContext(AppContext);

    const {
        justifySpaceBetween,
        justifyCenter,
        alignCenter,
        flex,
    } = useCommonStyles();
    const { root, media, card } = useStyles();

    return (
        <>
            Confirmation!
    </>
    );
};

export default withRouter(Confirmation);
