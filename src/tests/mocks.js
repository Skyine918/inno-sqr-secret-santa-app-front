import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../globals";

initializeApp(firebaseConfig);


export const mockedUseEventsHookResultForLoading = {
    events: [],
    eventsAreLoading: true,
    isError: false,
    eventsError: null,
    refetch: () => {}
}
export const mockedUseEventsHookResultForError = {
    events: [],
    eventsAreLoading: false,
    isError: true,
    eventsError: "Error for unit tests",
    refetch: () => {}
}
export const mockedAuth = [{email: "mocked-user@santa.com"}, false, null]
export const mockedEvents = [
    {
        "event_id": 10,
        "invitations": 1,
        "accepted_members": 1,
        "creator": "twicetwix@gmail.com",
        "name": "Inno SQR",
        "gift_date": "2023-01-03 00:00:00",
        "location": "Innopolis 106",
        "current_user_wishlist": null,
        "members_assigned": false,
        "assignee_email": null,
        "assignee_wishlist": null,
        "wishlist": null,
        "status": "denied"
    },
    {
        "event_id": 1,
        "invitations": 1,
        "accepted_members": 1,
        "creator": "twicetwix@gmail.com",
        "name": "Inno SQR",
        "gift_date": "2023-01-03 00:00:00",
        "location": "Innopolis 106",
        "current_user_wishlist": null,
        "members_assigned": false,
        "assignee_email": "alisa@santa.com",
        "assignee_wishlist": "Her cool wishlist",
        "wishlist": "My cool wishlist",
        "status": "accepted"
    },
    {
        "event_id": 2,
        "invitations": 1,
        "accepted_members": 0,
        "creator": "mocked-user@santa.com",
        "name": "Inno Test",
        "gift_date": "2022-05-01 00:00:00",
        "location": "Innopolis 106",
        "current_user_wishlist": null,
        "members_assigned": false,
        "assignee_email": null,
        "assignee_wishlist": null,
        "wishlist": null,
        "status": "creator"
    },
    {
        "event_id": 3,
        "invitations": 1,
        "accepted_members": 0,
        "creator": "twicetwix@gmail.com",
        "name": "Inno Test",
        "gift_date": "2022-05-01 00:00:00",
        "location": "Innopolis 106",
        "current_user_wishlist": null,
        "members_assigned": false,
        "assignee_email": null,
        "assignee_wishlist": null,
        "wishlist": null,
        "status": "pending"
    }
]
export const mockedEventsAfterAccept = [
    {
        "event_id": 10,
        "invitations": 1,
        "accepted_members": 1,
        "creator": "twicetwix@gmail.com",
        "name": "Inno SQR",
        "gift_date": "2023-01-03 00:00:00",
        "location": "Innopolis 106",
        "current_user_wishlist": null,
        "members_assigned": false,
        "assignee_email": null,
        "assignee_wishlist": null,
        "wishlist": null,
        "status": "denied"
    },
    {
        "event_id": 1,
        "invitations": 1,
        "accepted_members": 1,
        "creator": "twicetwix@gmail.com",
        "name": "Inno SQR",
        "gift_date": "2023-01-03 00:00:00",
        "location": "Innopolis 106",
        "current_user_wishlist": null,
        "members_assigned": false,
        "assignee_email": "alisa@santa.com",
        "assignee_wishlist": "Her cool wishlist",
        "wishlist": "My cool wishlist",
        "status": "accepted"
    },
    {
        "event_id": 2,
        "invitations": 1,
        "accepted_members": 0,
        "creator": "twicetwix@gmail.com",
        "name": "Inno Test",
        "gift_date": "2022-05-01 00:00:00",
        "location": "Innopolis 106",
        "current_user_wishlist": null,
        "members_assigned": false,
        "assignee_email": null,
        "assignee_wishlist": null,
        "wishlist": null,
        "status": "creator"
    },
    {
        "event_id": 3,
        "invitations": 1,
        "accepted_members": 1,
        "creator": "twicetwix@gmail.com",
        "name": "Inno Test",
        "gift_date": "2022-05-01 00:00:00",
        "location": "Innopolis 106",
        "current_user_wishlist": null,
        "members_assigned": false,
        "assignee_email": null,
        "assignee_wishlist": null,
        "wishlist": null,
        "status": "accepted"
    }
]
export const mockedEventsAfterDecline = [
    {
        "event_id": 10,
        "invitations": 1,
        "accepted_members": 1,
        "creator": "twicetwix@gmail.com",
        "name": "Inno SQR",
        "gift_date": "2023-01-03 00:00:00",
        "location": "Innopolis 106",
        "current_user_wishlist": null,
        "members_assigned": false,
        "assignee_email": null,
        "assignee_wishlist": null,
        "wishlist": null,
        "status": "denied"
    },
    {
        "event_id": 1,
        "invitations": 1,
        "accepted_members": 1,
        "creator": "twicetwix@gmail.com",
        "name": "Inno SQR",
        "gift_date": "2023-01-03 00:00:00",
        "location": "Innopolis 106",
        "current_user_wishlist": null,
        "members_assigned": false,
        "assignee_email": "alisa@santa.com",
        "assignee_wishlist": "Her cool wishlist",
        "wishlist": "My cool wishlist",
        "status": "accepted"
    },
    {
        "event_id": 2,
        "invitations": 1,
        "accepted_members": 0,
        "creator": "twicetwix@gmail.com",
        "name": "Inno Test",
        "gift_date": "2022-05-01 00:00:00",
        "location": "Innopolis 106",
        "current_user_wishlist": null,
        "members_assigned": false,
        "assignee_email": null,
        "assignee_wishlist": null,
        "wishlist": null,
        "status": "creator"
    },
    {
        "event_id": 3,
        "invitations": 1,
        "accepted_members": 1,
        "creator": "twicetwix@gmail.com",
        "name": "Inno Test",
        "gift_date": "2022-05-01 00:00:00",
        "location": "Innopolis 106",
        "current_user_wishlist": null,
        "members_assigned": false,
        "assignee_email": null,
        "assignee_wishlist": null,
        "wishlist": null,
        "status": "decline"
    }
]