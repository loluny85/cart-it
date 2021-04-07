import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '40%'
    },
    form: {
        padding: theme.spacing(8),
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
    }
}));

export default useStyles;
