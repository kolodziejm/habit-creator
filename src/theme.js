import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#00e676',
      contrastText: '#000000'
    },
    secondary: {
      main: '#2e7d32',
      contrastText: '#ffffff'
    },
    danger: {
      backgroundColor: '#e53935',
      color: '#000000'
    },
    info: {
      backgroundColor: '#00e5ff',
      color: '#000000'
    },
    error: {
      main: '#d81b60',
      contrastText: '#ffffff'
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: '"Montserrat", sans-serif',
  },
  overrides: {

  },
});