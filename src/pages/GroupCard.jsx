import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Chip } from '@mui/material';
import SantaTextField from "../ui/SantaMemberEmailField";
import {useState} from "react";
import Button from "@mui/material/Button";
import {patchAssignees, patchWishlist} from "../api/events";
import CircularProgress from "@mui/material/CircularProgress";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function getStatusColor(status) {
    switch (status) {
        case "creator":
            return "info"
        case "accepted":
            return "success"
        case "denied":
            return "warning"
    }
}

export default function GroupCard(props) {
    const [assignmentIsLoading, setAssignmentIsLoading] = useState(false);
    const [assignmentUpdated, setAssignmentUpdated] = useState(false);
    const [assignmentError, setAssignmentError] = useState(null);

    const [wishlist, setWishlist] = useState("");
    const [wishlistIsLoading, setWishlistIsLoading] = useState(false);
    const [wishlistUpdated, setWishlistUpdated] = useState(false);
    const [wishlistError, setWishlistError] = useState(null);

    const onClickPatchWishlist = async () => {
        setWishlistIsLoading(true);
        setWishlistError(null);
        setWishlistUpdated(false);
        patchWishlist(props.user, wishlist, props.event_id)
            .then((data) => {
                console.log(data)
                props.onAction()
                setWishlistUpdated(true);
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 400) {
                        alert(error.response.data.message)
                    }
                }
                setWishlistError(error.toString())
            })
            .finally(() => {
                setWishlistIsLoading(false)
            })
    }

    const onClickAssignGiftees = async () => {
        setAssignmentIsLoading(true)
        setAssignmentError(null);
        setWishlistUpdated(false);
        patchAssignees(props.user, props.event_id)
            .then((data) => {
                console.log(data)
                props.onAction()
                setAssignmentUpdated(true);
            })
            .catch(error => {
                console.log(error.response)
                if (error.response) {
                    if (error.response.status === 400) {
                        setAssignmentError(error.response.data.message)
                    }

                    if (error.response.status === 406) {
                        setAssignmentError(error.response.data.message)
                    }
                }
            })
            .finally(() => {
                setAssignmentIsLoading(false)
            })
    }

    return (
        <Card data-testid={`group-card-${props.event_id}`} className="group-card" sx={{ minWidth: 275, marginBottom: "1em" }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.name} <Chip label={props.status} color={getStatusColor(props.status)} />
                </Typography>
                <List sx={{ width: '100%', maxWidth: 360 }}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt={props.creator.toUpperCase()} src="/static/images/avatar/1.jpg" />
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
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Gift date: {props.date}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Event holds in {props.location}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    Total members invited: <b>{props.totalInvitedUsers}</b>
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    Total members Accepted: <b>{props.totalAcceptedUsers}</b>
                </Typography>

                {props.tests ? <SantaTextField
                    data-testid={`wishlist-input-${props.event_id}`}
                    margin="normal"
                    required
                    fullWidth
                    id="santa-wishlist"
                    type="text"
                    label="Own Wishlist"
                    name="Own Wishlist"
                    defaultValue={wishlist === "" ? props.wishlist : wishlist}
                    autoComplete="santa-event-own-wishlist"
                    autoFocus
                    onChange={(e) => {setWishlist(e.target.value)}}
                    helperText={!!wishlistError ? wishlistError : ''}
                    error={!!wishlistError}
                /> : <SantaTextField
                    data-testid={`wishlist-input-${props.event_id}`}
                    margin="normal"
                    required
                    fullWidth
                    id="santa-wishlist"
                    type="text"
                    label="Own Wishlist"
                    name="Own Wishlist"
                    defaultValue={wishlist === "" ? props.wishlist : wishlist}
                    autoComplete="santa-event-own-wishlist"
                    autoFocus
                    onChange={(e) => {setWishlist(e.target.value)}}
                    helperText={!!wishlistError ? wishlistError : ''}
                    error={!!wishlistError}
                    multiline
                    rows={4}
                />}


                {(wishlistIsLoading || assignmentIsLoading)
                    ? <div style={{display: "flex", justifyContent: "center"}}><CircularProgress color="success"/></div>
                    : <div/>}

                {wishlistUpdated
                    ? <Alert severity="success">
                        <AlertTitle>Successfully updated your Wishlist</AlertTitle>
                    </Alert>
                    : <div/>
                }

                {!!assignmentError
                    ? <Alert severity="error">
                        <AlertTitle>{assignmentError}</AlertTitle>
                    </Alert>
                    : <div/>
                }
                <div style={{textAlign: "center", marginTop: "0.5em"}}>
                    <Button data-testid={`button-edit-wishlist-${props.event_id}`} disabled={wishlistIsLoading} variant="contained" color="success" onClick={onClickPatchWishlist}>
                        Edit own wishlist
                    </Button>
                </div>

                <SantaTextField
                    disabled
                    margin="normal"
                    required
                    fullWidth
                    id="santa-wishlist"
                    type="text"
                    label={!props.members_assigned ? "" : props.assignee_email + " wishlist"}
                    name="Assignee Wishlist"
                    defaultValue={props.members_assigned ? ((props.assignee_wishlist === null || props.assignee_wishlist === "") ? "User did not filled wishlist =(" : props.assignee_wishlist) : "Members are not yet assigned" }
                    autoComplete="santa-event-assignee-wishlist"
                    autoFocus
                    onChange={(e) => {setWishlist(e.target.value)}}
                    helperText={props.members_assigned ? "You are assigned to be secret santa of this person. Here is his wishlist" : "Members are not yet assigned"}
                    error={!!wishlistError}
                    multiline
                    rows={4}
                />

                {assignmentUpdated
                    ? <Alert severity="success">
                        <AlertTitle>Successfully assigned secret Santas</AlertTitle>
                    </Alert>
                    : <div/>
                }

                <div style={{textAlign: "center", marginTop: "0.5em"}}>
                    <Button disabled={props.creator !== props.user.email || props.members_assigned} variant="contained" color="warning" onClick={onClickAssignGiftees} data-testid={`button-assignment-${props.event_id}`}>
                        {props.members_assigned ? "Already assigned" : (props.creator === props.user.email) ? "Assign giftees" : "Only creator can assign members"}
                    </Button>
                </div>


            </CardContent>
        </Card>
    );
}