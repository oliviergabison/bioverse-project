import React, { useState, useEffect } from "react";

interface StatusDropdownProps {
  currentStatus: string;
  onUpdateStatus: (newStatus: string) => void;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  currentStatus,
  onUpdateStatus,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  useEffect(() => {
    setSelectedStatus(currentStatus);
  }, [currentStatus]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  const handleUpdateStatus = () => {
    onUpdateStatus(selectedStatus);
  };

  return (
    <div className="flex space-x-5 items-center">
      <p className="font-semibold">Ticket Status:</p>
      <select
        value={selectedStatus}
        onChange={handleStatusChange}
        className="rounded-md p-1"
      >
        <option value="new">New</option>
        <option value="in_progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>
      <button
        className="text-gray-800 bg-white border border-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 font-semibold rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={handleUpdateStatus}
      >
        Update Status
      </button>
    </div>
  );
};

export default StatusDropdown;
