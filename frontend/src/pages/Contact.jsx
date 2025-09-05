import React from 'react'

import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  return (
    <section className="max-padd-container py-16 pt-28 bg-primary min-h-screen">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-tertiary">Get in Touch</h2>
        <p className="text-secondary mt-2">
          Have questions or need help? Fill out the form or reach us through our details below.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <form className="bg-white p-8 rounded-2xl shadow-lg space-y-6 border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-tertiary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-tertiary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              placeholder="Write your message"
              rows="5"
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-tertiary"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-tertiary text-white font-medium rounded-lg hover:bg-black transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 space-y-6">
          <h3 className="text-xl font-semibold text-tertiary">Contact Information</h3>
          <p className="text-secondary">
            Reach us directly through the following details or visit our office.
          </p>

          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-tertiary text-xl" />
            <p className="text-gray-700">123 Main Street, Lahore, Pakistan</p>
          </div>

          <div className="flex items-center gap-4">
            <FaPhone className="text-tertiary text-xl" />
            <p className="text-gray-700">+92 300 1234567</p>
          </div>

          <div className="flex items-center gap-4">
            <FaEnvelope className="text-tertiary text-xl" />
            <p className="text-gray-700">support@example.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
