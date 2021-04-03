import { makeStyles } from "@material-ui/core/styles";

const useCommonStyles = makeStyles((theme) => ({
  mt8: {
    marginTop: theme.spacing(8),
  },
  flex: {
    display: 'flex'
  },
  alignCenter: {
    display: 'flex',
    alignItems: "center",
  },
  justifySpaceBetween: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  alignEnd: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  justifyCenter: {
    display: 'flex',
    justifyContent: 'center'
  },
  justifyEnd: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

export default useCommonStyles;
