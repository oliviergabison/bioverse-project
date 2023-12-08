import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.username === "user" && formData.password === "bioverse") {
      return navigate("/submit-ticket");
    } else if (formData.username === "admin" && formData.password === "admin") {
      return navigate("/tickets");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <h1 className="font-semibold text-3xl text-gray-800 mb-4">
          BIOVERSE LOGIN
        </h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="bg-gray-50 m-2 p-2 rounded-md border-gray-300 text-gray-900 focus:border-gray-800 focus:ring-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="bg-gray-50 m-2 p-2 rounded-md border-gray-300 text-gray-900 focus:border-gray-800 focus:ring-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500"
        />
        <button
          type="submit"
          className="text-white mt-4 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-semibold rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
