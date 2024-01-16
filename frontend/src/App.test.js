import React from "react";
import { render, screen} from "@testing-library/react";
import App from "./App.js";
import MainPage from "./pages/MainPage.js";
import Login from "./pages/Login/Login.js";

test ("renders app link", () => {
    render(<App/>);
    const linkElement = screen.getByText("EzComs");
    expect(linkElement).toBeInTheDocument();
})