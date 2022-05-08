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

function getStatusColor(status) {
    switch (status) {
        case "pending":
            return "info"
        case "creator":
            return "info"
        case "accepted":
            return "success"
        case "denied":
            return "warning"
        default:
            return "primary"
    }
}

export default function GroupCard(props) {
    const [wishlistIsLoading, setWishlistIsLoading] = useState(false);
    const [assignmentIsLoading, setAssignmentIsLoading] = useState(false);
    const [wishlist, setWishlist] = useState("");
    const [wishlistError, setWishlistError] = useState(null);

    const onClickPatchWishlist = async () => {
        setWishlistIsLoading(true)
        patchWishlist(props.user, wishlist, props.event_id)
            .then((data) => {

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
        patchAssignees(props.user, props.event_id)
            .then((data) => {

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
                setAssignmentIsLoading(false)
            })
    }

    return (
        <Card className="group-card" sx={{ minWidth: 275, marginBottom: "1em" }}>
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

                <SantaTextField
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
                />

                {(wishlistIsLoading || assignmentIsLoading)
                    ? <div style={{display: "flex", justifyContent: "center"}}><CircularProgress color="success"/></div>
                    : <div/>}

                <Button disabled={wishlistIsLoading} variant="contained" color="success" onClick={onClickPatchWishlist}>
                    Edit own wishlist
                </Button>

                {!!props.assignee_wishlist ? <SantaTextField
                    disabled
                    margin="normal"
                    required
                    fullWidth
                    id="santa-wishlist"
                    type="text"
                    label={props.assignee_email + " Wishlist"}
                    name="Assignee Wishlist"
                    defaultValue={props.assignee_wishlist}
                    autoComplete="santa-event-assignee-wishlist"
                    autoFocus
                    onChange={(e) => {setWishlist(e.target.value)}}
                    helperText={!!wishlistError ? wishlistError : "You are assigned to be secret santa of this person. Here is his wishlist"}
                    error={!!wishlistError}
                    multiline
                    rows={4}
                /> : <div></div>}

                <Button disabled={props.creator !== props.user.email} variant="contained" color="warning" onClick={onClickAssignGiftees}>
                    {(props.creator === props.user.email) ? "Assign giftees" : "Only creator can assign giftees"}
                </Button>




            </CardContent>
        </Card>
    );
}