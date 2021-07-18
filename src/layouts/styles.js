import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  appBarStyle: {
    lineHeight: 0
  },
  height48: {
    height: theme.spacing(6),
  },
  minBodyHeight: {
    minHeight: `calc(100vh - ${theme.spacing(14)}px)`,
  },
  footer: {
    padding: `0 ${theme.spacing(3)}px`,
    borderTop: '1px solid #eae8e7'
  }
}));

export default useStyles;
