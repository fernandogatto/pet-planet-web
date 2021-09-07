import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        primary: {
            dark: '#BB563B',
            main: '#FB6118',
            light: '#F19663',
            contrastText: '#FBFAFA',
        },
        secondary: {
            main: '#606E98',
        },
        background: {
            primary: {
                main: '#FBFAFA',
            },
            secondary: {
                main: '#F0EFF1',
            },
            tertiary: {
                main: '#E8E8E8',
            },
            quaternary: {
                main: '#FFFFFF',
            },
        },
        description: {
            primary: {
                main: '#2F212E',
            },
            secondary: {
                main: '#767676',
                light: '#929FB1',
            },
        },
    },
    overrides: {
        MuiOutlinedInput: {
            root: {
                borderRadius: 12,
            },
        },
        MuiButton: {
            root: {
                borderRadius: 12,
            },
        },
        MuiAlert: {
            root: {
                borderRadius: 12,
            },
        },
        MuiPaper: {
            root: {
                padding: 0,
            },
            rounded: {
                borderRadius: 12,
            },
        },
        MuiDrawer: {
            paper: {
                width: 255,
            }
        }
    },
});

export default theme;
