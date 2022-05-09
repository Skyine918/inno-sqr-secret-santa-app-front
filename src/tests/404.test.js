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
import PageNotFound404 from "../pages/404";


describe("Test error 404 ", () => {

    it("is rendered correctly", async () => {
        const result = render(<PageNotFound404/>, {wrapper: MemoryRouter})
        const groupCard = await result.findByText("404")
        expect(groupCard).toBeInTheDocument();
    })
})