"use client";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function ApplyPage() {
  const { nctId } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    agree: false,
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agree) return alert("You must agree to continue");

    const res = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, nctId }),
    });

    if (res.ok) setSuccess(true);
  };

  return (
    <main className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      {success ? (
        <p className="text-green-600 text-center font-semibold text-lg">
          Application submitted successfully!
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block mb-1 font-medium text-gray-700">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              value={formData.firstName}
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block mb-1 font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              value={formData.lastName}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block mb-1 font-medium text-gray-700">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+380931234567"
              required
              pattern="^\+?[0-9]{10,15}$"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              value={formData.phone}
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-1 font-medium text-gray-700">
              Your message
            </label>
            <textarea
              id="message"
              readOnly
              value={`I hope this message finds you well. My name is ${formData.firstName} ${formData.lastName}, and I am writing to express my strong interest in participating in your upcoming clinical trial ${nctId}.
You can contact me by replying directly to this email or reaching me by phone at ${formData.phone} or ${formData.email}.
Thank you for considering my interest!`}
              className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-700 resize-none"
              rows={6}
            />
          </div>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              required
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              onChange={(e) =>
                setFormData({ ...formData, agree: e.target.checked })
              }
              checked={formData.agree}
            />
            <span className="text-gray-700 select-none">
              I agree to privacy policy and terms of use
            </span>
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 rounded-md transition"
          >
            Submit
          </button>
        </form>
      )}
    </main>
  );
}
