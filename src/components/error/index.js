import React from 'react';
import BaseLayout from '../../layouts/BaseLayout';
import { withRouter } from 'react-router-dom'
import { Button } from "@material-ui/core"

const ErrorPage = (props) => {
    const returnToPreviousPage = () => {
        props.history.goBack()
    }
    return (
        <BaseLayout>
            Oops! Something went wrong
            <Button variant="contained" color="primary" onclick={returnToPreviousPage}>Go Back</Button>
        </BaseLayout>
    );
};

export default withRouter(ErrorPage);