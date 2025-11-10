import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Allow only letters and spaces for the name field
  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setFormData({ ...formData, name: value });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔹 EmailJS integration
    emailjs
      .sendForm(
        "service_40sjr34",
        "template_lqkogzo",
        form.current,
        "OFG90F9KdtGjVqJnM"
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("✅ Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });

          // 🔁 Refresh after 2 seconds
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        (error) => {
          console.error(error.text);
          setStatus("❌ Failed to send message. Please try again.");
        }
      );
  };

  return (
    <section
      id="contact"
      className="py-20 px-6 md:px-10 lg:px-20 flex flex-col items-center justify-center 
      text-gray-900 dark:text-white transition-colors duration-500"
    >
      {/* Heading */}
      <div className="text-center max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Let’s <span className="text-blue-500 dark:text-blue-400">[work]</span> together
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
          Open to full time, remote jobs or freelance projects.
        </p>
      </div>

      {/* Form */}
      <form
        ref={form}
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-lg flex flex-col gap-5"
      >
        {/* Name */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleNameChange}
          placeholder="Your Name"
          required
          className="w-full px-5 py-3 bg-transparent border border-gray-400 dark:border-gray-600 
          rounded-full focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 
          text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-500 
          transition-colors duration-300"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="w-full px-5 py-3 bg-transparent border border-gray-400 dark:border-gray-600 
          rounded-full focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 
          text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-500 
          transition-colors duration-300"
        />

        {/* Message */}
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows="5"
          required
          className="w-full px-5 py-3 bg-transparent border border-gray-400 dark:border-gray-600 
          rounded-2xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 
          text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-500 
          resize-none transition-colors duration-300"
        ></textarea>

        {/* Button */}
        <button
          type="submit"
          className="mt-2 w-full md:w-auto self-center bg-blue-400 hover:bg-blue-5s00 
          dark:bg-blue-400 dark:hover:bg-blue-500 text-white font-medium px-8 py-3 
          rounded-full transition-all duration-300 shadow-md"
        >
          Send Message
        </button>

        {/* Status Message */}
        {status && (
          <p className="text-center text-sm mt-3 transition-all duration-300">
            {status}
          </p>
        )}
      </form>
    </section>
  );
};

export default Contact;
