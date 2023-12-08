import React from "react";
import Header from "../Header";
import { Table } from "flowbite-react";
import { useState, useEffect } from "react";
import { formatDate } from "../../stringHelpers";
import axios from "axios";
import OpenTicketButton from "./components/OpenTicketButton";
import StatusLabel from "./components/StatusLabel/StatusLabel";
import TicketModal from "./components/TicketModal/TicketModal";
import { Ticket, TicketStatus } from "../../types";

function TicketOverview() {
  const [tickets, setTickets] = useState<Array<Ticket>>([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);

  useEffect(() => {
    const getTickets = async () => {
      const resp = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/tickets`
      );
      setTickets(resp.data);
    };
    getTickets();
  }, []);

  const openTicketModal = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setShowTicketModal(true);
  };

  const renderTableBody = () => {
    return tickets.map((item: Ticket, index) => {
      return (
        <Table.Row key={index}>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{item.email}</Table.Cell>
          <Table.Cell>
            <StatusLabel status={item.status as TicketStatus} />
          </Table.Cell>
          <Table.Cell>{formatDate(item.created_at)}</Table.Cell>
          <Table.Cell>
            <OpenTicketButton onClick={() => openTicketModal(item)} />
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  return (
    <>
      <Header />
      <div className="md:px-5 mt-6 overflow-x-scroll overflow-y-scroll">
        <h1 className="text-xl font-semibold mb-5 ml-3">All Tickets</h1>
        <Table className="">
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Created At</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body>{renderTableBody()}</Table.Body>
        </Table>
      </div>
      <TicketModal
        showTicketModal={showTicketModal}
        setShowTicketModal={setShowTicketModal}
        ticket={selectedTicket}
        setTickets={setTickets}
      />
    </>
  );
}

export default TicketOverview;
