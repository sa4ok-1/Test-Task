"use client";
import { FormEvent, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.agree) return alert("You must agree to continue");

    const res = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, nctId }),
    });

    if (res.ok) setSuccess(true);
  };

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-xl shadow-md text-center w-full max-w-md">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-green-600 mb-2">
            Application submitted!
          </h1>
          <p className="text-gray-700 mb-6">
            Thank you for your interest. We will contact you soon.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition"
          >
            🔍 Back to Search
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md mt-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="firstName"
            className="block mb-1 font-semibold text-gray-700"
          >
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            required
            placeholder="John"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            value={formData.firstName}
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block mb-1 font-semibold text-gray-700"
          >
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            required
            placeholder="Doe"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            value={formData.lastName}
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block mb-1 font-semibold text-gray-700"
          >
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            required
            pattern="^\+?[0-9]{10,15}$"
            placeholder="+380931234567"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            value={formData.phone}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-1 font-semibold text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            value={formData.email}
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block mb-1 font-semibold text-gray-700"
          >
            Your Message
          </label>
          <textarea
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
            className="w-4 h-4 accent-blue-600"
            onChange={(e) =>
              setFormData({ ...formData, agree: e.target.checked })
            }
            checked={formData.agree}
          />
          <span className="text-gray-700 text-sm select-none">
            I agree to the privacy policy and terms of use
          </span>
        </label>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow transition"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
