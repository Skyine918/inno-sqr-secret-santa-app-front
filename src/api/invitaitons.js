import sleep from "../utils/sleep";

export async function getInvitations(user) {
    await sleep(1000)
    return [
        {name: "Innopolis Secret Santa 2021", totalMembers: 12},
        {name: "Kazan Secret Santa 2022", totalMembers: 33},
        {name: "Something", totalMembers: 123}]
}