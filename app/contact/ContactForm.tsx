"use client";
import { useState, useEffect } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    subject: "",
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    if (res.status === 200) {
      alert("Email sent successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
        subject: "",
      });
    } else {
      alert("Internal Server Error: Email not sent!");
    }
  };

  return (
    <div className="w-full px-5 md:px-[120px] mb-10">
      <form
        onChange={handleChange}
        onSubmit={handleSubmit}
        className="w-full bg-[#085AA3] px-10 md:px-24 py-24 flex flex-wrap lg:flex-nowrap rounded-2xl gap-10"
      >
        <div className="flex-1 flex flex-col gap-10">
          <input
            name="name"
            type="text"
            placeholder="Full Name*"
            className="min-w-[150px] sm:min-w-[300px] w-full bg-transparent py-3 placeholder:text-[#eee] text-white text-base font-light outline-none border-b border-[#ffffff88] focus:border-[#FBC982] duration-300"
            value={form.name}
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address*"
            className="min-w-[150px] sm:min-w-[300px] w-full bg-transparent py-3 placeholder:text-[#eee] text-white text-base font-light outline-none border-b border-[#ffffff88] focus:border-[#FBC982] duration-300"
            value={form.email}
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone Number*"
            className="min-w-[150px] sm:min-w-[300px] w-full bg-transparent py-3 placeholder:text-[#eee] text-white text-base font-light outline-none border-b border-[#ffffff88] focus:border-[#FBC982] duration-300"
            value={form.phone}
          />
          <select
            name="subject"
            id="subject"
            className="min-w-[150px] sm:min-w-[300px] w-full bg-transparent py-3 placeholder:text-[#eee] text-white text-base font-light outline-none border-b border-[#ffffff88] focus:border-[#FBC982] duration-300"
          >
            <option className="text-[#888]" value="service">
              Select Service You Want
            </option>
            <option className="text-[#888]" value="service1">
              Service 1
            </option>
            <option className="text-[#888]" value="service2">
              Service 2
            </option>
            <option className="text-[#888]" value="service3">
              Service 3
            </option>
          </select>
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <textarea
            name="message"
            id="message"
            placeholder="Your Message*"
            rows={5}
            className="w-full bg-transparent py-3 px-5 placeholder:text-[#eee] text-white text-base font-light outline-none border border-[#ffffff88] focus:border-[#FBC982] duration-300"
            value={form.message}
          ></textarea>
          <button
            type="submit"
            className="w-fit py-5 px-10 bg-[#FBC982] text-black text-xl font-medium rounded-lg duration-300 hover:bg-[#ffffff88]"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
