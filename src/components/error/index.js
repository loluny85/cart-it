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
            {/* TODO - style this page */}
            Oops! Something went wrong
            <Button variant="contained" color="primary" onClick={returnToPreviousPage}>Go Back</Button>
        </BaseLayout>
    );
};

export default withRouter(ErrorPage);