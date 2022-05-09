import * as firebaseAuthHooks from "react-firebase-hooks/auth";
import * as firebaseAuth from "@firebase/auth";
import * as eventsApi from "../api/events";
import {mockedAuth, mockedEvents} from "./mocks";
import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router";
import React from "react";
import FirebaseGoogleAuth2Login from "../pages/FirebaseGoogleAuth2Login";
import {fireEvent} from "@testing-library/dom";


describe("Test login page", () => {
    const authHookSpy = jest.spyOn(firebaseAuthHooks, "useAuthState");
    const signInWithEmailAndPasswordSpy = jest.spyOn(firebaseAuth, "signInWithEmailAndPassword");
    const signInWithPopupSpy = jest.spyOn(firebaseAuth, "signInWithPopup");
    const getEventsSpy = jest.spyOn(eventsApi, "getEvents");

    beforeEach(() => {
        getEventsSpy.mockResolvedValue(mockedEvents)
        authHookSpy.mockReturnValue(mockedAuth)
    })

    it("Should render without user and show login page", async () => {
        authHookSpy.mockReturnValue([null, false, false])
        const result = render(<FirebaseGoogleAuth2Login/>, {wrapper: MemoryRouter})
        const loginPage = await result.findByText("Sign In")
        expect(loginPage).toBeInTheDocument();

        signInWithEmailAndPasswordSpy.mockRejectedValue({code: "auth/wrong-password"})
        const emailFieldMUI = await result.findByTestId("login-email-input");
        const passwordFieldMUI = await result.findByTestId("login-password-input");
        const loginButton = await result.findByTestId("login-button");

        fireEvent.change(emailFieldMUI.children[1].firstChild, {target: {value: "some-invalid-email@santa.com"}})
        fireEvent.change(passwordFieldMUI.children[1].firstChild, {target: {value: "some-invalid-password"}})
        fireEvent.click(loginButton)

        let errorParagraphs = await result.findAllByText("Invalid Email Or Password");
        expect(errorParagraphs.length).toBe(2);

        // test user not found
        signInWithEmailAndPasswordSpy.mockRejectedValue({code: 'auth/user-not-found'})
        fireEvent.click(loginButton)
        errorParagraphs = await result.findAllByText("User with this email not found");
        expect(errorParagraphs.length).toBe(1);

        // test user disabled
        signInWithEmailAndPasswordSpy.mockRejectedValue({code: "auth/user-disabled"})
        fireEvent.click(loginButton)
        errorParagraphs = await result.findAllByText("Account is suspended");
        expect(errorParagraphs.length).toBe(1);

        // too many requests
        signInWithEmailAndPasswordSpy.mockRejectedValue({code: "auth/too-many-requests"})
        fireEvent.click(loginButton)
        errorParagraphs = await result.findAllByText("Too many auth requests, please wait a bit.");
        expect(errorParagraphs.length).toBe(1);
    })

    it("authorize via google", async () => {
        authHookSpy.mockReturnValue([null, false, false])
        const result = render(<FirebaseGoogleAuth2Login/>, {wrapper: MemoryRouter})
        const loginPage = await result.findByText("Sign In")
        expect(loginPage).toBeInTheDocument();

        signInWithPopupSpy.mockResolvedValue({email: "some-google-user@gmail.com"});
        const loginViaGoogleButton = await result.findByTestId("login-via-google-button");

        fireEvent.click(loginViaGoogleButton)
    })
})