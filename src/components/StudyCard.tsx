"use client";
import Link from "next/link";
import { Study } from "@/types";

export default function StudyCard({ study }: { study: Study }) {
  return (
    <li className="bg-white p-5 rounded-xl shadow hover:shadow-md transition-shadow">
      <h2 className="text-lg font-semibold text-gray-900 mb-1">
        {study.protocolSection.identificationModule.briefTitle}
      </h2>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Conditions:</strong>{" "}
        {study.protocolSection.conditionsModule.conditions?.join(", ")}
      </p>
      <p className="text-xs text-gray-500">
        <strong>NCT ID:</strong>{" "}
        {study.protocolSection.identificationModule.nctId}
      </p>
      <Link
        href={`/apply/${study.protocolSection.identificationModule.nctId}`}
        className="inline-block mt-3 text-sm text-white bg-blue-600 hover:bg-blue-700 font-medium px-4 py-2 rounded-md transition"
      >
        Apply To Trial
      </Link>
    </li>
  );
}
