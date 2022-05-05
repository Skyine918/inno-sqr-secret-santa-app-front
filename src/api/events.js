import baseAPI from "./base";

export async function getEvents(user) {
    return (await baseAPI.get(`/events`, {headers: {token: user.accessToken}})).data
}

export async function createEvent(user, name, date, location, emails) {
    const params = {
        name: name === null ? "" : name,
        gift_date: date === null ? "" : date,
        location: location === null ? "" : location,
        members: emails
    };
    const response = await baseAPI.post(`/events`, params, {headers: {token: user.accessToken}})
    return response.data
}