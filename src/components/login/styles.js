import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%'
    },
    loginFormContainer: {
        height: 500,
        width: 400,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        marginLeft: theme.spacing(24),
    },
    loginForm: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    textUnderline: {
        textDecoration: 'underline'
    }
}));

export default useStyles;
