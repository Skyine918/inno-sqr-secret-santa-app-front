import React from 'react';
import GroupCard from "./GroupCard";
import CircularProgress from "@mui/material/CircularProgress";
import {getAuth} from "@firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import useEvents from "../hooks/useEvents";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import InvitationCard from "./InvitationCard";
import Button from "@mui/material/Button";
import EventCreationModal from "./EventCreationModal";
import './main-page.css'


export default function GroupsList() {

    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth);
    const {events, eventsAreLoading, isError, eventsError, refetch} = useEvents();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const invitations = events.filter((m) => m.status === 'pending');
    const groups = events.filter((m) => m.status !== 'pending');

    const onClickAcceptInvitation = () => {
        refetch()
    }

    const onClickDeclineInvitation = () => {
        refetch();
    }

    if (eventsAreLoading) {
        return <div style={{display: "flex", justifyContent: "center"}}><CircularProgress color="error"/></div>
    }

    if (isError) {
        return <div style={{display: "flex"}}>
            <div style={{flex: 1, padding: '4px'}}>
                <Alert severity="error">
                    <AlertTitle>Error loading Events</AlertTitle>
                    <span>{eventsError.toString()}</span>
                </Alert>
            </div>
            <div style={{flex: 1, padding: '4px'}}>
                <Alert severity="error">
                    <AlertTitle>Error loading Invitations</AlertTitle>
                    <span>{eventsError.toString()}</span>
                </Alert>
            </div>
        </div>

    }

    return <div style={{display: "flex"}}>
        <div style={{flex: 1, padding: '4px'}}>
            {groups.length === 0
                ? <div>
                    <Alert severity="info">
                        <AlertTitle>No events found</AlertTitle>
                    </Alert>
                </div>
                : groups.map((group, key) => <GroupCard
                    key={key}
                    name={group.name}
                    totalInvitedUsers={group.invitations}
                    totalAcceptedUsers={group.accepted_members}
                    location={group.location}
                    date={group.gift_date}
                    status={group.status}
                />)}
            <div style={{textAlign: "center"}}>
                <Button id="create-event-button" color="success" style={{margin: "4px"}} variant="contained" onClick={handleOpen}>
                    🎅Create Secret Santa Event🎅
                </Button>
                <EventCreationModal open={open} setOpen={setOpen} handleClose={handleClose} refetch={refetch}/>
            </div>
        </div>

        <div style={{flex: 1}}>
            {invitations.length === 0
                ? <div>
                    <Alert severity="info">
                        <AlertTitle>No invitations found</AlertTitle>
                    </Alert>
                </div>
                : invitations.map((invitation, key) => <InvitationCard
                    key={key}
                    event_id={invitation.event_id}
                    name={invitation.name}
                    totalMembers={invitation.invitations}
                    giftDate={invitation.gift_date}
                    creator={invitation.creator}
                    onAccept={() => {onClickAcceptInvitation(invitation.event_id)}}
                    onDecline={() => {onClickDeclineInvitation(invitation.event_id)}}
                />)}</div>
    </div>
}