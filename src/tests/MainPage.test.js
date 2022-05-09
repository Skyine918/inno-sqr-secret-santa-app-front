import * as firebaseAuth from "react-firebase-hooks/auth";
import * as eventsApi from "../api/events";
import * as invitationAPI from "../api/invitaitons";
import {render} from "@testing-library/react";
import GroupsList from "../pages/GroupsList";
import React from "react";
import MainPage from "../pages/MainPage";
import {mockedAuth, mockedEvents} from "./mocks";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../globals";
import {MemoryRouter} from "react-router";
import App from "../App";


describe("Test for Groups List whole functionality", () => {
    const authSpy = jest.spyOn(firebaseAuth, "useAuthState");
    const getEventsSpy = jest.spyOn(eventsApi, "getEvents");

    beforeEach(() => {
        getEventsSpy.mockResolvedValue(mockedEvents)
        authSpy.mockReturnValue(mockedAuth)
    })

    it("Should render without errors", async () => {
        const result = render(<App/>, {wrapper: MemoryRouter})
        const groupCard = await result.findByTestId("auth-icon-button")
        expect(groupCard).toBeInTheDocument();
    })

    it("Should render without user and show login page", async () => {
        authSpy.mockReturnValue([null, false, false])
        const result = render(<App/>, {wrapper: MemoryRouter})
        const loginPage = await result.findByText("Sign In")
        expect(loginPage).toBeInTheDocument();
    })
})