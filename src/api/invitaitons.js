import baseAPI from "./base";

export async function getInvitations(user) {
    const response = await baseAPI.get(`/events`, {headers: {token: user.accessToken}});
    return response.data.filter((m) => m.status === 'pending');
}

export async function acceptInvitation(user, eventId) {
    const response = await baseAPI.patch(`/invitation`, {status: "accepted", event_id: eventId},{headers: {token: user.accessToken}})
    return response.data
}

export async function declineInvitation(user, eventId) {
    const response = await baseAPI.patch(`/invitation`, {status: "denied", event_id: eventId},{headers: {token: user.accessToken}})
    console.debug(response.request.url, response.status)
    return response.data
}