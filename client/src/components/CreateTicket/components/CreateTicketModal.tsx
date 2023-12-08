import React, { useState, ChangeEvent } from "react";
import { Modal, Label } from "flowbite-react";
import axios from "axios";

interface CreateTicketModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateTicketModal({
  openModal,
  setOpenModal,
}: CreateTicketModalProps) {
  const defaultFormData = {
    name: "",
    email: "",
    description: "",
  };

  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/create-ticket`,
        formData
      );
      alert("Ticket Submitted Successfully!");
    } catch (error) {
      console.log(error);
    }

    setOpenModal(false);
    setFormData(defaultFormData);
  };

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create a New Ticket</Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name1" value="Your name" />
              </div>
              <input
                name="name"
                type="text"
                className="bg-gray-50 w-full rounded-md border-gray-300 text-gray-900 focus:border-gray-800 focus:ring-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500"
                placeholder="Jane Doe"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <input
                name="email"
                type="email"
                className="bg-gray-50 w-full rounded-md border-gray-300 text-gray-900 focus:border-gray-800 focus:ring-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500"
                placeholder="jane.doe@gmail.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="problem1" value="Problem Description" />
              </div>
              <textarea
                name="description"
                className="bg-gray-50 w-full rounded-md border-gray-300 text-gray-900 focus:border-gray-800 focus:ring-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="mt-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-semibold rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateTicketModal;
