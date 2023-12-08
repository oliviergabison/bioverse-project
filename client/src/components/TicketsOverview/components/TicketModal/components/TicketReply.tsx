import React from "react";

function TicketReply({ reply }) {
  return (
    <div className="border text-sm bg-gray-50 border-gray-300 rounded-md p-8">
      {reply.content}
    </div>
  );
}

export default TicketReply;
