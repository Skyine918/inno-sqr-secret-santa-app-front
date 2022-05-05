import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {acceptInvitation, declineInvitation} from "../api/invitaitons";
import {getAuth} from "@firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import CircularProgress from "@mui/material/CircularProgress";
import {useState} from "react";
import './main-page.css'

export default function InvitationCard(props) {
    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth);
    const [isLoading, setLoading] = useState(false);

    const acceptClick = async (eventId) => {
        try {
            setLoading(true);
            await acceptInvitation(user, eventId)
            props.onAccept()
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }
    const declineClick = async (eventId) => {
        try {
            setLoading(true);
            await declineInvitation(user, eventId)
            props.onDecline()
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="invitation-card" sx={{ minWidth: 275, marginBottom: "1em" }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Gift date planned: <b>{props.giftDate.split(" ")[0]}</b>
                </Typography>
                <Typography variant="h5" component="div">
                    Invitation to: {props.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Total members: {props.totalMembers}
                </Typography>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={props.creator}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                    </Typography>
                                    {" Group creator"}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                </List>
            </CardContent>
            {isLoading ? <div style={{display: "flex", justifyContent: "center"}}><CircularProgress color="error"/></div> : <div/>}

            <CardActions sx={{marginBottom: "1em"}}>
                <Button disabled={isLoading} variant="contained" color="success" onClick={() => {acceptClick(props.event_id)}}>
                    Accept
                </Button>
                <Button disabled={isLoading} variant="outlined" color="error" onClick={() => {declineClick(props.event_id)}}>
                    Decline
                </Button>
            </CardActions>
        </Card>
    );
}