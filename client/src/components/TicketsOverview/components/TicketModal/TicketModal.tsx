import React, { useState, useEffect } from "react";
import { Modal, Label } from "flowbite-react";
import { Ticket } from "../../../../types";
import { Dropdown } from "flowbite-react";
import axios from "axios";
import StatusDropdown from "./components/StatusDropdown";
import TicketReply from "./components/TicketReply";

interface TicketModalProps {
  showTicketModal: boolean;
  setShowTicketModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTickets: React.Dispatch<React.SetStateAction<Array<Ticket>>>;
  ticket: Ticket;
}

function TicketModal({
  showTicketModal,
  setShowTicketModal,
  setTickets,
  ticket,
}: TicketModalProps) {
  const [replyText, setReplyText] = useState("");
  const [ticketReplies, setTicketReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(ticket?.status || "");

  useEffect(() => {
    const getTicketReplies = async () => {
      if (!ticket) {
        return;
      }
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/tickets/${ticket.id}/replies`
        );
        setTicketReplies(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getTicketReplies();
    setSelectedStatus(ticket?.status);
  }, [ticket]);

  const handleUpdateStatus = async (
    newStatus: string,
    shouldUpdateApi: boolean
  ) => {
    try {
      if (shouldUpdateApi) {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/update-ticket-status`,
          {
            id: ticket.id,
            status: newStatus,
          }
        );
        console.log(
          `Sending email to ${ticket.email} that his ticket status for ticket #${ticket.id} has been updated to ${newStatus}`
        );
      }

      // Update tickets locally to save an API request
      setTickets((prevTickets) =>
        prevTickets.map((t) =>
          t.id === ticket.id ? { ...t, status: newStatus } : t
        )
      );
      setSelectedStatus(newStatus);
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/tickets/${ticket.id}/replies`,
        { text: replyText }
      );
      console.log(
        `Sending email to ${ticket.email} with content: ${replyText}`
      );
    } catch (error) {
      console.log(error);
    }

    // Update tickets locally to save an API request
    setTicketReplies((prevReplies) => [...prevReplies, { content: replyText }]);
    handleUpdateStatus("in_progress", false);
    setReplyText("");
  };

  if (!ticket || loading) {
    return;
  }

  return (
    <>
      <Modal
        show={showTicketModal}
        onClose={() => {
          setShowTicketModal(false);
        }}
      >
        <Modal.Header>Ticket #{ticket.id}</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col space-y-5">
            <StatusDropdown
              currentStatus={selectedStatus}
              onUpdateStatus={(newStatus) =>
                handleUpdateStatus(newStatus, true)
              }
            />
            <p>
              <span className="font-semibold">Name:</span> <br />
              {ticket.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> <br />
              {ticket.email}
            </p>
            <p>
              <span className="font-semibold">Description:</span> <br />
              {ticket.description}
            </p>
          </div>
          <h1 className="font-semibold mt-5 mb-2">Ticket Replies</h1>
          <div className="flex flex-col space-y-0.5">
            {ticketReplies.map((item, index) => (
              <TicketReply key={index} reply={item} />
            ))}
          </div>
          <form className="flex flex-col gap-4 mt-10" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="problem1" value="Reply to Ticket" />
              </div>
              <textarea
                name="description"
                className="bg-gray-50 w-full rounded-md border-gray-300 text-gray-900 focus:border-gray-800 focus:ring-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500"
                required
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="mt-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-semibold rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Reply
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TicketModal;
