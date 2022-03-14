import sleep from "../utils/sleep";

export async function getGroups(user) {
    await sleep(1000)
    return [
        {name: "Innopolis Secret Santa 2022", totalMembers: 11,
        place: "Innopolis University, Big Hall", date: "31.12.2022", current: true},
        {name: "Innopolis Secret Santa 2020", totalMembers: 23,
        place: "Innopolis University, Big Hall", date: "31.12.2020", current: false},
      ]
    }