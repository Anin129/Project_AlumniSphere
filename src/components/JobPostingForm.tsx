"use client";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  GraduationCap,
} from "lucide-react";

interface JobFormValues {
  title: string;
  company: string;
  level: string;
  type: string;
  location: string;
  salary: string;
  deadline: string;
  companySize: string;
  description: string;
  responsibilities: { value: string }[];
  requirements: { value: string }[];
  benefits: { value: string }[];
  alumniMessage: string;
  referral: boolean;
}

const JobPostingForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [previewData, setPreviewData] = useState<JobFormValues | null>(null);

  const { register, handleSubmit, control, reset } = useForm<JobFormValues>({
    defaultValues: {
      responsibilities: [{ value: "" }],
      requirements: [{ value: "" }],
      benefits: [{ value: "" }],
    },
  });

  const {
    fields: respFields,
    append: addResp,
    remove: removeResp,
  } = useFieldArray({ control, name: "responsibilities" });

  const {
    fields: reqFields,
    append: addReq,
    remove: removeReq,
  } = useFieldArray({ control, name: "requirements" });

  const {
    fields: benefitFields,
    append: addBenefit,
    remove: removeBenefit,
  } = useFieldArray({ control, name: "benefits" });

  const onSubmit = (data: JobFormValues) => {
    setPreviewData(data);
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 mt-8 shadow-lg rounded-xl border border-gray-200">
      {!submitted ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">
            Post a Job
          </h2>
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              {...register("title")}
              placeholder="Job Title"
              className="w-full border border-gray-400 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              {...register("company")}
              placeholder="Company Name"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              {...register("level")}
              placeholder="Experience Level"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              {...register("type")}
              placeholder="Job Type (Full-time, Part-time...)"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              {...register("location")}
              placeholder="Location (Remote/Hybrid/Onsite)"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              {...register("salary")}
              placeholder="Salary (e.g. $120k - $150k)"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              {...register("deadline")}
              type="date"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              {...register("companySize")}
              placeholder="Company Size (e.g. 200-500)"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Description */}
          <textarea
            {...register("description")}
            placeholder="Job Description"
            className="w-full border border-gray-300 p-3 rounded-lg h-24 focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Responsibilities */}
          <div>
            <h3 className="font-semibold text-lg text-gray-700 mb-2">
              Responsibilities
            </h3>
            {respFields.map((field, index) => (
              <div key={field.id} className="flex gap-3 mb-2">
                <input
                  {...register(`responsibilities.${index}.value`)}
                  placeholder="Responsibility"
                  className="flex-1 border p-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeResp(index)}
                  className="text-red-600 hover:text-red-800 px-2 py-1 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addResp({ value: "" })}
              className="text-blue-600 text-sm mt-2"
            >
              + Add Responsibility
            </button>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="font-semibold text-lg text-gray-700 mb-2">
              Requirements
            </h3>
            {reqFields.map((field, index) => (
              <div key={field.id} className="flex gap-3 mb-2">
                <input
                  {...register(`requirements.${index}.value`)}
                  placeholder="Requirement"
                  className="flex-1 border p-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeReq(index)}
                  className="text-red-600 hover:text-red-800 px-2 py-1 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addReq({ value: "" })}
              className="text-blue-600 text-sm mt-2"
            >
              + Add Requirement
            </button>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="font-semibold text-lg text-gray-700 mb-2">
              Benefits
            </h3>
            {benefitFields.map((field, index) => (
              <div key={field.id} className="flex gap-3 mb-2">
                <input
                  {...register(`benefits.${index}.value`)}
                  placeholder="Benefit"
                  className="flex-1 border p-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeBenefit(index)}
                  className="text-red-600 hover:text-red-800 px-2 py-1 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addBenefit({ value: "" })}
              className="text-blue-600 text-sm mt-2"
            >
              + Add Benefit
            </button>
          </div>

          {/* Alumni Section */}
          <textarea
            {...register("alumniMessage")}
            placeholder="Alumni Message / Insights"
            className="w-full border border-gray-300 p-3 rounded-lg h-20 focus:ring-2 focus:ring-blue-500 mt-2"
          />
          <label className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              {...register("referral")}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-gray-700">Available for Referrals</span>
          </label>

          {/* Submit */}
          <div className="flex justify-center gap-4 pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Preview Job Posting
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4 text-center text-blue-700">
            Job Preview
          </h2>
          <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto border border-gray-200">
            {JSON.stringify(previewData, null, 2)}
          </pre>
          <div className="mt-4 flex gap-4 justify-center">
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2 bg-gray-300 rounded-lg font-medium hover:bg-gray-400 transition"
            >
              Edit
            </button>
            <button
              onClick={() => reset()}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPostingForm;
