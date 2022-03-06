import {GoogleAuthProvider, getAuth, signInWithPopup} from "@firebase/auth";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {Copyright} from "@mui/icons-material";
import Box from "@mui/material/Box";
import React from "react";


async function loginViaGoogle() {
    const provider = new GoogleAuthProvider();
    let userCredential = await signInWithPopup(getAuth(), provider)
    console.log(userCredential)
}

export default function FirebaseGoogleAuth2Login() {
    return (<Container component="main" maxWidth="xs">
        <div style={{
            marginTop: "20vh",
            padding: "2em 1em 1em 1em",
            borderRadius: "25px",
            display: "flex",
            flexDirection: "column",
            background: "#f76C6C",
            alignItems: "center"
        }}>
            <Typography variant="h6" component="h4">
                Sign In
            </Typography>
            <Button
                onClick={loginViaGoogle}
                variant="outlined"
                style={{
                    textTransform: "none",
                    paddingRight: "60px",
                    marginTop: "50px",
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