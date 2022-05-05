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
            display: "flex",
            flexDirection: "column",
            background: "#c33131",
            alignItems: "center"
        }}>
            <Typography variant="h4" component="h4" style={{color: "white", marginBottom: '0.5em'}}>
                Sign In
            </Typography>
            <div style={{textAlign: "center"}}>
                <img style={{width: "60%"}} src="secret-santa-picture.jpeg" alt="secret-santa-picture"/>
            </div>
            <Typography variant="small" component="p" style={{color: "white", marginBottom: '0.5em'}}>
                Participate secret santa together with your friends!
            </Typography>
            <Button
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