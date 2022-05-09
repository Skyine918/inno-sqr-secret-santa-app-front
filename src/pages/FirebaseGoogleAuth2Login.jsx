import {GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword} from "@firebase/auth";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React, {useState} from "react";
import SantaTextField from "../ui/SantaMemberEmailField";
import './login.css'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from "@mui/material/Avatar";


async function loginViaGoogle() {
    const provider = new GoogleAuthProvider();
    let userCredential = await signInWithPopup(getAuth(), provider)
    console.log(userCredential)
}


export default function FirebaseGoogleAuth2Login() {
    const [authIsLoading, setAuthIsLoading] = useState(false);
    const [fieldEmail, setFieldEmail] = useState("");
    const [fieldEmailError, setFieldEmailError] = useState(null);

    const [fieldPassword, setFieldPassword] = useState("");
    const [fieldPasswordError, setFieldPasswordError] = useState(null);

    async function loginViaPasswordAndEmail() {
        console.log("called")

        setAuthIsLoading(true);
        signInWithEmailAndPassword(getAuth(), fieldEmail, fieldPassword)
            .then((userCredential) => {
                console.log(userCredential.providerId)
                // react hook did something at this point
            })
            .catch((error) => {
                switch (error.code) {
                    case "auth/wrong-password":
                        setFieldEmailError("Invalid Email Or Password");
                        setFieldPasswordError("Invalid Email Or Password");
                        return
                    case 'auth/user-not-found':
                        setFieldEmailError("User with this email not found");
                        return
                    case "auth/user-disabled":
                        setFieldEmailError("Account is suspended");
                        return;
                    case "auth/too-many-requests":
                        setFieldEmailError("Too many auth requests, please wait a bit.");
                        return;
                }
            })
            .finally(() => {
                setAuthIsLoading(false)
            });

    }

    return (<Container component="main" maxWidth="xs">
        <div style={{
            marginTop: "20vh",
            padding: "2em 1em 1em 1em",
            display: "flex",
            flexDirection: "column",
            background: "white",
            alignItems: "center"
        }}>
            <Avatar sx={{ m: 1, bgcolor: 'green' }}>
                <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
                Sign In
            </Typography>
            <SantaTextField
                data-testid="login-email-input"
                margin="normal"
                required
                fullWidth
                size="small"
                id="santa-auth-email"
                label="Email"
                name="Email"
                autoComplete="santa-auth-email"
                autoFocus
                onChange={(e) => {setFieldEmail(e.target.value)}}
                helperText={!!fieldEmailError ? fieldEmailError : 'Your email'}
                error={!!fieldEmailError}
            />
            <SantaTextField
                data-testid="login-password-input"
                margin="normal"
                required
                fullWidth
                size="small"
                id="santa-auth-password"
                label="Password"
                type="password"
                name="Password"
                autoComplete="santa-auth-password"
                autoFocus
                onChange={(e) => {setFieldPassword(e.target.value)}}
                helperText={!!fieldPasswordError ? fieldPasswordError : 'Your password'}
                error={!!fieldPasswordError}
            />
            <Button data-testid="login-button" id="sign-in-button" variant="contained" color="success" onClick={() => loginViaPasswordAndEmail()} disabled={authIsLoading}>
                {authIsLoading ? "Loading ..." : "Sign in"}
            </Button>

            <Typography variant="small" component="p" style={{color: "black", margin: '0.5em 0'}}>
                OR
            </Typography>
            <Button
                data-testid="login-via-google-button"
                onClick={loginViaGoogle}
                variant="outlined"
                style={{
                    textTransform: "none",
                    paddingRight: "60px",
                    marginTop: "10px",
                    background: "white"
                }}
            >
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBRF__vDRer9N3lzmW-FJTnaiCi1Vd7TvcHrdcjzU28RHD2kcpRVdZIQhLvZaksbBPpak&usqp=CAU"
                    style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "60px"
                    }}
                    alt="google"
                />
                Log in with Google
            </Button>
        </div>
    </Container>)
}