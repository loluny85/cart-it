import React, { useContext, useState } from "react";
import {
  Grid,
  CardMedia,
  Typography,
  Button,
  Paper,
  Box,
  TextField,
  CircularProgress
} from "@material-ui/core";
import { AppContext } from "../../App";
import { withRouter } from "react-router-dom";
import useCommonStyles from "../../styles";
import useStyles from "./styles";
import logo from "../../images/logo.png";
import { PRODUCTS } from "../../utils/routes"
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import fire from "../../fire";

const Login = (props) => {
  const { state, dispatch } = useContext(AppContext);
  const [error, setError] = useState("")
  const [loading, setLoading] = useState("")

  const {
    alignCenter,
    buttonLoader
  } = useCommonStyles();
  const { root, loginForm, loginFormContainer, textUnderline } = useStyles();

  const schema = yup.object().shape({
    email: yup.string().required().matches(/^\S+@\S+\.\S+$/),
    password: yup.string().required().min(6)
  })
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    setError("");
    setLoading(true)
    fire
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((user) => {
        dispatch({
          type: "LOGIN_STATUS",
          loggedIn: true,
          email: data.email
        })
        props.history.push(PRODUCTS)
      })
      .catch((err) => {
        setLoading(false)
        setError(err);
      });
  }

  // TODO - Make responsive


  return (
    <Grid item xs={10} className={root}>
      <Grid container spacing={1} className={root}>
        <Grid item xs={6} className={alignCenter}>
          <CardMedia>
            <img src={logo} alt="Logo" />
          </CardMedia>
        </Grid>
        <Grid item xs={6} className={alignCenter}>
          <Paper className={loginFormContainer} elevation={3}>
            <form className={loginForm} onSubmit={handleSubmit(onSubmit)}>
              <Typography variant="h5" className={textUnderline}>SignIn</Typography>
              <Box mt={4} />
              <TextField label="email" variant="outlined" inputProps={register('email')} />
              {errors.email ?.type === "required" && <span>email is required</span>}
              {errors.email ?.type === "matches" && <span>Enter a valid Email</span>}
              <Box mt={2} />
              <TextField type="password" label="Password" variant="outlined" inputProps={register('password')} />
              {errors.password ?.type === "required" && <span>Password is required</span>}
              {errors.password ?.type === "min" && <span>Password too short</span>}
              <Box mt={3} />
              <Button type="submit" size="large" color="primary" variant="contained" disabled={loading}>
                {loading && <CircularProgress size={25} className={buttonLoader} />}
                <Typography variant="h6">Login</Typography>
              </Button>
              <Box pr={3} pl={3} mt={3}>
                <Typography color="error">{error ?.message}</Typography>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withRouter(Login);
