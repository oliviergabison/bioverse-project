import React from "react";

interface OpenTicketButtonProps {
  onClick: () => void;
}

function OpenTicketButton({ onClick }: OpenTicketButtonProps) {
  return (
    <button
      type="button"
      className="text-gray-800 bg-white border border-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 font-semibold rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      onClick={onClick}
    >
      Open Ticket
    </button>
  );
}

export default OpenTicketButton;
