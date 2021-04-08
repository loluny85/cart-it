import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    form: {
        padding: theme.spacing(8),
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    paymentForm: {
        width: '80%',
        paddingTop: theme.spacing(3),
    }
}));

export default useStyles;
