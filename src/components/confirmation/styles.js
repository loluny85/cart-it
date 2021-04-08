import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    modalContent: {
        height: 100,
        width: 300,
        background: '#fff',
        borderRadius: 4,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: `${theme.spacing(5)}px ${theme.spacing(6)}px ${theme.spacing(8)}px`
    },
    card: {
        width: 100,
        height: 100,
    },
    media: {
        height: 100,
        backgroundSize: 'contain'
    },
}));

export default useStyles;
