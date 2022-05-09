import GroupsList from "../pages/GroupsList";
import React from "react";
import {render} from "@testing-library/react";
import {fireEvent} from "@testing-library/dom";

import * as eventsApi from "../api/events";
import * as firebaseAuth from "react-firebase-hooks/auth";
import * as useEvents from "../hooks/useEvents";
import {
    mockedEvents,
    mockedEventsAfterAccept,
    mockedUseEventsHookResultForError,
    mockedUseEventsHookResultForLoading
} from "./mocks";
import baseAPI from "../api/base";


describe("Test for Groups List whole functionality", () => {
    const authSpy = jest.spyOn(firebaseAuth, "useAuthState");
    const getEventsSpy = jest.spyOn(eventsApi, "getEvents");
    // const getEventsSpy = jest.spyOn(eventsApi, "getEvents");

    const baseAPIPostSpy = jest.spyOn(baseAPI, "post");
    //
    beforeEach(() => {
        getEventsSpy.mockResolvedValue(mockedEvents)
        authSpy.mockReturnValue([{email: "mocked-user@santa.com"}, false, null])
        baseAPIPostSpy.mockResolvedValue({data: {}})
    })

    it("Should render invitations and events properly", async () => {

        const result = render(<GroupsList/>)
        const button = await result.findByTestId("create-event-button")
        expect(button).toBeInTheDocument();

        fireEvent.click(button)

        const nameInput = await result.findByTestId("santa-event-name-input");
        expect(nameInput).toBeVisible();

        const addEmailInputButton = await result.findByTestId("button-add-email-field")
        const removeEmailInputButton = await result.findByTestId("button-add-email-field")
        let createButton = await result.findByTestId("create-event-button-final");

        fireEvent.click(createButton)

        expect(addEmailInputButton).toBeVisible();
        expect(removeEmailInputButton).toBeVisible();

        fireEvent.click(addEmailInputButton)
        fireEvent.click(addEmailInputButton)
        fireEvent.click(addEmailInputButton)
        fireEvent.click(addEmailInputButton)
        fireEvent.click(addEmailInputButton)
        fireEvent.click(addEmailInputButton)
        fireEvent.click(addEmailInputButton)
        fireEvent.click(addEmailInputButton)
        fireEvent.click(addEmailInputButton)
        fireEvent.click(addEmailInputButton)
        fireEvent.click(addEmailInputButton)
        fireEvent.click(addEmailInputButton)
        fireEvent.click(addEmailInputButton)
        // handle > 10 emails

        const allNewEmailFields = await result.findAllByTestId(/member-email-field/i);
        expect(allNewEmailFields.length).toBe(11);

        fireEvent.change(allNewEmailFields[0].children[1].firstChild, {target: {value: "kek@santa.com"}})
        fireEvent.change(allNewEmailFields[1].children[1].firstChild, {target: {value: "kek2@santa.com"}})
        fireEvent.change(allNewEmailFields[2].children[1].firstChild, {target: {value: "kek3@santa.com"}})

        fireEvent.click(removeEmailInputButton)
        fireEvent.click(removeEmailInputButton)
        fireEvent.click(removeEmailInputButton)
        fireEvent.click(removeEmailInputButton)
        fireEvent.click(removeEmailInputButton)
        fireEvent.click(removeEmailInputButton)
        fireEvent.click(removeEmailInputButton)
        fireEvent.click(removeEmailInputButton)
        fireEvent.click(removeEmailInputButton)

        fireEvent.click(createButton)

        await result.findByTestId("create-event-button-final");
    })
})
