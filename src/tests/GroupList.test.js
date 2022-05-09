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
    const baseAPIPatchSpy = jest.spyOn(baseAPI, "patch");
    // const baseAPIPostSpy = jest.spyOn(baseAPI, "post");

    beforeEach(() => {
        getEventsSpy.mockResolvedValue(mockedEvents)
        authSpy.mockReturnValue([{email: "mocked-user@santa.com"}, false, null])
    })

    it("Should render invitations and events properly", async () => {
        const result = render(<GroupsList/>)
        const groupCard = await result.findByTestId("events-double-list")
        expect(groupCard).toBeInTheDocument();
    })

    it("Should show loader when events are loading", async () => {
        const useEventsSpy = jest.spyOn(useEvents, "default");
        useEventsSpy.mockReturnValue(mockedUseEventsHookResultForLoading);
        const result = render(<GroupsList/>)
        const loader = await result.findByTestId("events-loader")
        expect(loader).toBeInTheDocument();
    })

    it("Should show error when there is event error", async () => {
        const useEventsSpy = jest.spyOn(useEvents, "default");
        useEventsSpy.mockReturnValue(mockedUseEventsHookResultForError);
        const result = render(<GroupsList/>)
        const errors = await result.findAllByText("Error for unit tests")
        expect(errors.length).toBe(2);
        errors.forEach((e) => {
            expect(e).toBeInTheDocument();
        })
    })

    it("Should rerender when user decline invitation", async () => {
        const useEventsSpy = jest.spyOn(useEvents, "default");
        useEventsSpy.mockRestore()

        const result = render(<GroupsList/>)
        const button = await result.findByTestId(`button-accept-invitation-${mockedEvents[3].event_id}`)
        expect(getEventsSpy).toBeCalledTimes(1);

        getEventsSpy.mockResolvedValue(mockedEventsAfterAccept)
        baseAPIPatchSpy.mockResolvedValue({})
        fireEvent.click(button)

        // expect(getEventsSpy).toBeCalledTimes(2);
        const newGroupCards = await result.findByTestId(`group-card-${mockedEvents[3].event_id}`)
        expect(newGroupCards).toBeInTheDocument();
    })

    it("Should rerender when user accepts invitation", async () => {
        const useEventsSpy = jest.spyOn(useEvents, "default");
        useEventsSpy.mockRestore()
        getEventsSpy.mockResolvedValue(mockedEvents)

        const result = render(<GroupsList/>)
        const button = await result.findByTestId(`button-decline-invitation-${mockedEvents[3].event_id}`)
        expect(getEventsSpy).toBeCalledTimes(1);

        getEventsSpy.mockResolvedValue(mockedEventsAfterAccept)
        baseAPIPatchSpy.mockResolvedValue({})
        fireEvent.click(button)

        // expect(getEventsSpy).toBeCalledTimes(2);
        const newGroupCards = await result.findByTestId(`group-card-${mockedEvents[3].event_id}`)
        expect(newGroupCards).toBeInTheDocument();
    })

    it("Should rerender when user accepts invitation", async () => {
        const baseAPIGetSpy = jest.spyOn(baseAPI, "get");
        const useEventsSpy = jest.spyOn(useEvents, "default");

        baseAPIGetSpy.mockResolvedValue({data: mockedEvents})
        baseAPIPatchSpy.mockResolvedValue({})

        useEventsSpy.mockRestore()
        getEventsSpy.mockRestore()

        const result = render(<GroupsList/>)
        const wishlistInputMUI = await result.findByTestId(`wishlist-input-${mockedEvents[0].event_id}`)
        const buttonEditWishlist = await result.findByTestId(`button-edit-wishlist-${mockedEvents[0].event_id}`)
        const buttonAssignmentWishlist = await result.findByTestId(`button-assignment-${mockedEvents[2].event_id}`)

        const wishlistInput = wishlistInputMUI.children[1].firstChild;
        fireEvent.change(wishlistInput, {target: {value: "My wishlist too change and check event"}})
        fireEvent.click(buttonEditWishlist)

        const newGroupCards = await result.findByText(`Successfully updated your Wishlist`)
        expect(newGroupCards).toBeInTheDocument();

        fireEvent.click(buttonAssignmentWishlist)
        await result.findByText("Successfully assigned secret Santas")
    })
})
