import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import image from '../../imgvid/contact.png';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



export default function ContactForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = {
      name: event?.target[0]?.value,
      email: event?.target[1]?.value,
      phone: event?.target[2]?.value,
      address: event?.target[3]?.value,
      message: event?.target[4]?.value,
    };

    try {
      const response = await axios.post('/api/email/send', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Email sent successfully:', response.data);
      toast.success('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Error sending email. Please try again.');
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-white md:flex-row md:p-28">
      {/* Left side with background image and contact info */}
      <div className="relative p-8 bg-purple-300 md:w-1/2">
        <div className="absolute inset-0 bg-purple-900 opacity-50"></div>
        <img
          src={image}
          alt="Office Space"
          className="absolute inset-0 object-cover w-full h-full"
        />
      </div>

      {/* Right side with the form */}
      <div className="p-8 bg-white md:w-1/2">
        <h2 className="mb-8 text-3xl font-bold text-blue-500">Send Us A Message</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-full"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-full"
          />
          <input
            type="tel"
            placeholder="Phone"
            className="w-full p-3 border border-gray-300 rounded-full"
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full p-3 border border-gray-300 rounded-full"
          />
         
          <textarea
            placeholder="Message"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg"
          ></textarea>
          <button
            type="submit"
            className="w-full py-3 font-semibold text-white transition duration-300 bg-blue-600 rounded-full hover:bg-blue-800"
           >
            Send
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}