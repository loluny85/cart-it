import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(3),
        width: '75%'
    },
    card: {
        width: 200,
        height: 250,
        padding: `${theme.spacing(4)}px ${theme.spacing(3)}px`,
        '&:hover': {
            boxShadow: '0 7px 17px 0 rgb(23 84 116 / 18%)'
        },
        marginTop: theme.spacing(3)
    },
    media: {
        height: 140,
        backgroundSize: 'contain'
    }
}));

export default useStyles;
