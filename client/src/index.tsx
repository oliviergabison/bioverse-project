import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTicket from "./components/CreateTicket/CreateTicket";
import TicketOverview from "./components/TicketsOverview/TicketsOverview";
import Login from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/tickets",
    element: <TicketOverview />,
  },
  {
    path: "/submit-ticket",
    element: <CreateTicket />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);
