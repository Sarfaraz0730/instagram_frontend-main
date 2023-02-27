import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontSize: 14,
    body1: {
      fontSize: "14px"
    }
  },
  palette: {
    primary: {
      main: '#39F',
      // main: '#00b8ec',
      contrastText: '#FFF'
    },
    secondary: {
      main: '#045099',
      contrastText: "#FFF"
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f1f5f8',
    },
  },
  shape: {
    borderRadius: 10,
  },
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.7)'
      }
    },
    MuiButton: {
      containedPrimary: {
        color: "white"
      },
      contained: {
        fontWeight: 700,
      },
      text: {
        fontWeight: 600,
      },
      containedSizeLarge: {
        fontSize: "13px",
        padding: "12px 12px"
      },
      textSizeLarge: {
        fontSize: "13px",
        padding: "12px 12px"
      }
    },
    MuiBadge: {
      colorPrimary: {
        color: "white",
        fontWeight: "bold"
      }
    },
    MuiOutlinedInput: {
      input: { padding: "14.7px 14px" },
    },
    MuiInputLabel: {
      outlined: {
        transform: 'translate(14px, 16.5px)'
      },
    },
  }
});

export default theme;
