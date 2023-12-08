import React from "react";
import Header from "../Header";
import { useState } from "react";
import CreateTicketModal from "./components/CreateTicketModal";

function SubmitTicket() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Header />
      <div className="flex justify-center items-center w-full h-[80vh]">
        <button
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-semibold rounded-lg text-sm px-10 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={() => setOpenModal(true)}
        >
          Create New Ticket
        </button>
      </div>
      <CreateTicketModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}

export default SubmitTicket;
