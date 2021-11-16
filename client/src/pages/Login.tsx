import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { gql, useMutation } from "@apollo/client";
import { useHistory } from 'react-router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSignup } from '../stateManagement/actions';


function Copyright(props: any) { //Collected from material-ui, dont press link
    //https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                Gruppe 44
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export const LOGIN = gql`
mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password ) {
    email
    token
  }
}
`;

/**
 * The login page, from material-ui template
 * https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in
 * @returns The login page
 */
export default function Login() {
    const [login] = useMutation(LOGIN);
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState<String>("Email Address");
    const [error, setError] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        login({ variables: { email: data.get("email"), password: data.get("password") } }).then((user) => {
            if (user.data.login.token) {
                setError(false)
                localStorage.setItem("access-token", user.data.login.token)
                history.push("/prosjekt4")
                window.location.reload()
            }
        })
            .catch(error => {
                console.log(error)
                setError(true);
                setErrorMessage("Incorrect email or password")
            })
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            error={error}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label={errorMessage}
                            aria-label="email text field"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            aria-label='password text field'
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <Button
                            id="SignIn"
                            aria-label="Sign in button"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => {

                            }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link id="signUp" aria-label="link to signup page" variant="body2" onClick={() => dispatch(setSignup(true))}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}