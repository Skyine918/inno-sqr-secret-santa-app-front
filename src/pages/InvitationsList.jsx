import React, {useEffect, useState} from 'react';
import InvitationCard from "./InvitationCard";
import CircularProgress from "@mui/material/CircularProgress";
import sleep from "../utils/sleep";
import {acceptInvitation, declineInvitation, getInvitations} from "../api/invitaitons";
import {getAuth} from "@firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import axios from "axios";
import NoDataAlert from "../ui/NoDataAlert";


export default function InvitationList() {

    const [invitationsAreLoading, setInvitationsAreLoading] = useState(true);
    const [invitations, setInvitations] = useState([]);
    const [refetch, setRefetch] = useState(0);
    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth);

    const fetchInvitations = async () => {
        try {
            setInvitationsAreLoading(true);
            let result = await getInvitations(user);
            setInvitations(result);
        } catch {

        } finally {
            setInvitationsAreLoading(false);
        }
    }



    useEffect(() => {
        fetchInvitations()
    }, [refetch])

    if (invitationsAreLoading) {
        return <div style={{display: "flex", justifyContent: "center"}}><CircularProgress color="error"/></div>
    }

    if (invitations.length === 0) {
        return <NoDataAlert resource="Invitations"/>
    }

    return <div>

    </div>
}