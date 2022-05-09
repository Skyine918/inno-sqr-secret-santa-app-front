import {useEffect, useState} from "react";
import {getEvents} from "../api/events";
import {getAuth} from "@firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";


export default function useEvents() {
    const auth = getAuth();
    const [user] = useAuthState(auth);
    const [eventsAreLoading, setEventsAreLoading] = useState(true);
    const [refetchState, setRefetchState] = useState(0);
    const [eventsError, setEventsError] = useState(null);
    const [isError, setIsError] = useState(false);
    const [events, setEvents] = useState([]);

    const refetch = () => {
        setRefetchState(refetchState + 1)
    }

    useEffect(() => {
        getEvents(user)
            .then((result) => {setEvents(result)})
            .catch((err) => {
                console.error("Error fetching Events", err);
                setEventsError(err);
                setIsError(true)})
            .finally(() => {
                setEventsAreLoading(false);
            })
    }, [refetchState, user])
    return {events, eventsAreLoading, isError, eventsError, refetch}
}
