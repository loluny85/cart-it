import React from 'react';
import BaseLayout from '../../layouts/BaseLayout';
import { withRouter } from 'react-router-dom'
import { Button, Grid, Typography, Box } from "@material-ui/core"
import useCommonStyles from '../../styles';

const ErrorPage = (props) => {
    const { alignCenterColumn } = useCommonStyles()
    const returnToPreviousPage = () => {
        props.history.goBack()
    }
    return (
        <BaseLayout>
            <Grid container>
                <Grid item xs={12}>
                    <Box mt={8} className={alignCenterColumn}>
                        <Typography>Oops! Something went wrong</Typography>
                        <Button variant="contained" color="secondary" onClick={returnToPreviousPage}>Go Back</Button>
                    </Box>
                </Grid>
            </Grid>
        </BaseLayout>
    );
};

export default withRouter(ErrorPage);