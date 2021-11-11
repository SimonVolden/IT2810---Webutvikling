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
import { useHistory } from 'react-router';
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSignup } from '../stateManagement/actions';

function Copyright(props: any) {
    //https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-up
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

export const SIGNUP = gql`
mutation SignupMutation ($email: String!, $password: String!) {
  signup(email: $email, password: $password) 
}
`;

const theme = createTheme();

/** 
 * Lets the user create a user.
 * users is saved in the database.
 * https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-up
 * @returns 
 */
export default function SignUp() {
    const [signup] = useMutation(SIGNUP);
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState<String>("Email Address");
    const [error, setError] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        signup({ variables: { email: data.get("email"), password: data.get("password") } }).then((user) => {
            if (user.data.signup) {
                history.push("/prosjekt3/login")
            } else {
                setErrorMessage("Account already exists")
                setError(true);
            }
        }).catch((error) => {
            console.log(error)
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    error={error}
                                    required
                                    fullWidth
                                    id="email"
                                    aria-label='email text field'
                                    label={errorMessage}
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    aria-label='password text field'
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            id="signUpButton"
                            aria-label="signup button"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link  variant="body2" aria-label="link to sign in page" onClick={() => dispatch(setSignup(false))}>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}