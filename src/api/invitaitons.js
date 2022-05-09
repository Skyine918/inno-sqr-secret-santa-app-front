import baseAPI from "./base";

export async function acceptInvitation(user, eventId) {
    const response = await baseAPI.patch(`/invitation`, {status: "accepted", event_id: eventId},{headers: {token: user.accessToken}})
    return response.data
}

export async function declineInvitation(user, eventId) {
    const response = await baseAPI.patch(`/invitation`, {status: "denied", event_id: eventId},{headers: {token: user.accessToken}})
    return response.data
}