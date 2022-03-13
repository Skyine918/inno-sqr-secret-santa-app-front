import React, {useEffect, useState} from 'react';
import InvitationCard from "./InvitationCard";
import CircularProgress from "@mui/material/CircularProgress";
import sleep from "../utils/sleep";
import {getInvitations} from "../api/invitaitons";
import {getAuth} from "@firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";


export default function InvitationList() {

    const [invitationsAreLoading, setInvitationsAreLoading] = useState(true);
    const [invitations, setInvitations] = useState([]);
    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        getInvitations(user)
            .then((result) => {
                setInvitations(result)
            })
            .catch()
            .finally(() => {
                setInvitationsAreLoading(false);
            })
    }, [])

    if (invitationsAreLoading) {
        return <div style={{display: "flex", justifyContent: "center"}}><CircularProgress color="error"/></div>
    }

    return <div>
        {invitations.map((invitation, key) => <InvitationCard key={key} name={invitation.name} totalMembers={invitation.totalMembers} />)}
    </div>
}