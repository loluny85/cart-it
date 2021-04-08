import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    width: '75%'
  },
  card: {
    width: 200,
    height: 220,
    padding: `${theme.spacing(4)}px ${theme.spacing(3)}px`,
    marginTop: theme.spacing(3),
    '&:hover': {
      boxShadow: '0 7px 17px 0 rgb(23 84 116 / 18%)'
    }
  },
  media: {
    height: 140,
    backgroundSize: 'contain'
  },
  progress: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export default useStyles;
