import React, {useEffect, useState} from 'react';
import GroupCard from "./GroupCard";
import CircularProgress from "@mui/material/CircularProgress";
import sleep from "../utils/sleep";
import {getGroups} from "../api/groups";
import {getAuth} from "@firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";


export default function GroupsList() {

    const [groupsAreLoading, setGroupsAreLoading] = useState(true);
    const [groups, setGroups] = useState([]);
    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        getGroups(user)
            .then((result) => {
                setGroups(result)
            })
            .catch()
            .finally(() => {
                setGroupsAreLoading(false);
            })
    }, [])

    if (groupsAreLoading) {
        return <div style={{display: "flex", justifyContent: "center"}}><CircularProgress color="error"/></div>
    }

    return <div>
        {groups.map((group, key) => <GroupCard key={key} name={group.name} totalMembers={group.totalMembers}
        place={group.place} date={group.date} current={group.current}/>)}
    </div>
}