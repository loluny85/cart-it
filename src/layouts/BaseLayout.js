import React from "react";
import MainCartIcon from "../components/mainCartIcon";
import Grid from "@material-ui/core/Grid";
import { AppBar, Toolbar, Typography, CardMedia } from "@material-ui/core";
import useStyles from "./styles";
import useCommonStyles from "../styles";
import logo from '../images/logo.png';

const BaseLayout = ({ children }) => {
  const { root, height48, minBodyHeight, footer, appBarStyle } = useStyles();
  const { mt8, alignCenter, justifySpaceBetween, justifyCenter } = useCommonStyles();
  return (
    <Grid container className={root}>
      <AppBar className={appBarStyle}>
        <Toolbar className={`${justifySpaceBetween} ${alignCenter}`}>
          <Typography>
            <CardMedia>
              <img src={logo} alt="Logo" height="50px" />
            </CardMedia>
          </Typography>
          <MainCartIcon />
        </Toolbar>
      </AppBar>

      <Grid container xs={12} className={`${mt8} ${minBodyHeight} ${justifyCenter}`}>
        {children}
      </Grid>

      <Grid item xs={12} className={`${alignCenter} ${height48} ${footer}`}>
        <Typography variant="caption">
          Copyright © 2021, Cart It. All Rights Reserved
          </Typography>
      </Grid>
    </Grid>
  );
};

export default BaseLayout;
