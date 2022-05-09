import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Button from "@mui/material/Button";

import {render, cleanup, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom"
import GroupCard from "../pages/GroupCard";
import {createMuiTheme, createTheme, ThemeProvider} from "@mui/material";
import {BrowserRouter} from "react-router-dom";
import MainPage from "../pages/MainPage";
import AppRouter from "../ui/AppRouter";
import {useAuthState} from "react-firebase-hooks/auth";
import CircularProgress from "@mui/material/CircularProgress";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../globals";
import {getAuth} from "@firebase/auth";
import {MemoryRouter} from "react-router";
import {fireEvent, getByTestId} from "@testing-library/dom";

afterEach(cleanup)

it('matches snapshot', () => {
    const tree = renderer.create(<GroupCard
        tests={true}
        onAction={() => {}}
        user={{email: "test@santa.com"}}
        name="Test group"
        wishlist="Эчпочмак домашний"
        creator="test-creator@santa.com"
        assignee_wishlist={null}
        assignee_email={null}
        event_id={123}
        totalInvitedUsers={10}
        totalAcceptedUsers={10}
        location="Innopolis 106"
        date="01-01-2023"
        status="accepted"
    />).toJSON();

    expect(tree).toMatchSnapshot();
});

it('renders base page', async () => {
    initializeApp(firebaseConfig);

    const theme = createTheme({
        palette: {
            primary: {
                main: '#f76C6C'
            },
            secondary: {
                main: '#f0f0f0'
            }
        }
    });

    const div = document.createElement('div');

    const { getByTestId, asFragment, container, findByText, findByDisplayValue } = render(
        <ThemeProvider theme={theme}>
            <MemoryRouter initialEntries={['/', '/groups']}>
                <MainPage>
                    <AppRouter user={{email: "test@santa.com"}}/>
                </MainPage>
            </MemoryRouter>
        </ThemeProvider>,
        div
    );
    const loginPasswordField = await waitFor(() => getByTestId('login-password-input'));
    const loginEmailField = await waitFor(() => getByTestId('login-email-input'));
    const inputEmail = container.querySelector("#santa-auth-email")
    const inputPassword = container.querySelector("#santa-auth-password")

    fireEvent.change(inputEmail, {target: {value: 'test1@santa.com'}});
    await (waitFor(() => findByDisplayValue("test1@santa.com"),{timeout:3000, interval: 1000}));
    fireEvent.change(inputPassword, {target: {value: 'qwertu'}});
    await (waitFor(() => findByDisplayValue("qwertu"),{timeout:3000, interval: 1000}));
    fireEvent.click(await getByTestId("login-button"));

    expect(inputEmail.value).toBe('test1@santa.com')

    const helpText = await (waitFor(() => findByText("Invalid Email Or Password"),{timeout:3000, interval: 1000}));
    console.log(helpText)

});

