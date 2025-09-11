"use client";
import React, { useState } from "react";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  GraduationCap,
  ListChecks,
  Award,
  Gift,
  FileText,
  Clock,
  ChevronLeft,
  ChevronRight,
  Eye,
  Send,
} from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";

interface JobFormValues {
  title: string;
  company: string;
  level: string;
  type: string;
  location: string;
  salary: string;
  deadline: string;
  companySize?: string;
  description: string;
  responsibilities: { value: string }[];
  requirements: { value: string }[];
  benefits: { value: string }[];
  alumniMessage?: string;
  referral?: boolean;
}

const defaultValues: JobFormValues = {
  title: "",
  company: "",
  level: "",
  type: "Full-time",
  location: "",
  salary: "",
  deadline: "",
  companySize: "",
  description: "",
  responsibilities: [{ value: "" }],
  requirements: [{ value: "" }],
  benefits: [{ value: "" }],
  alumniMessage: "",
  referral: false,
};

const InputWithIcon = ({
  icon: Icon,
  label,
  type = "text",
  required = false,
  ...props
}: any) => (
  <div className="space-y-2">
    {label && (
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <input
        type={type}
        required={required}
        {...props}
        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
      />
    </div>
  </div>
);

export default function MultiStepJobForm() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    setError,
    clearErrors,
    getValues,
    reset,
    formState: { errors },
  } = useForm<JobFormValues>({
    defaultValues,
    mode: "onTouched",
  });

  const {
    fields: respFields,
    append: appendResp,
    remove: removeResp,
  } = useFieldArray({ control, name: "responsibilities" });

  const {
    fields: reqFields,
    append: appendReq,
    remove: removeReq,
  } = useFieldArray({ control, name: "requirements" });

  const {
    fields: benFields,
    append: appendBen,
    remove: removeBen,
  } = useFieldArray({ control, name: "benefits" });

  const totalSteps = 6;
  const progress = Math.round((currentStep / totalSteps) * 100);

  // Validate step-specific fields and arrays before moving next
  const handleNext = async () => {
    if (currentStep === 1) {
      const ok = await trigger([
        "title",
        "company",
        "level",
        "type",
        "location",
        "salary",
        "deadline",
      ]);
      if (ok) {
        clearErrors();
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      const ok = await trigger("description");
      if (ok) {
        clearErrors();
        setCurrentStep(3);
      }
    } else if (currentStep === 3) {
      const values = getValues("responsibilities") || [];
      if (values.some((v) => (v?.value || "").trim() !== "")) {
        clearErrors("responsibilities" as any);
        setCurrentStep(4);
      } else {
        setError("responsibilities" as any, {
          type: "manual",
          message: "Add at least one responsibility",
        });
      }
    } else if (currentStep === 4) {
      const values = getValues("requirements") || [];
      if (values.some((v) => (v?.value || "").trim() !== "")) {
        clearErrors("requirements" as any);
        setCurrentStep(5);
      } else {
        setError("requirements" as any, {
          type: "manual",
          message: "Add at least one requirement",
        });
      }
    } else if (currentStep === 5) {
      const values = getValues("benefits") || [];
      if (values.some((v) => (v?.value || "").trim() !== "")) {
        clearErrors("benefits" as any);
        setCurrentStep(6);
      } else {
        setError("benefits" as any, {
          type: "manual",
          message: "Add at least one benefit",
        });
      }
    } else if (currentStep === 6) {
      // last step -> preview
      setShowPreview(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const onSubmit = async (data: JobFormValues) => {
  try {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const result = await res.json();
      console.log("✅ Job saved:", result);
      alert("Job posted successfully!");
      reset(defaultValues);
      setShowPreview(false);
      setCurrentStep(1);
    } else {
      alert("❌ Failed to post job. Try again.");
    }
  } catch (error) {
    console.error("Error posting job:", error);
    alert("⚠️ Something went wrong!");
  }
};


  const StepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputWithIcon
              icon={Briefcase}
              label="Job Title"
              {...register("title", { required: "Job title is required" })}
              placeholder="e.g. Senior Software Engineer"
            />
            {errors.title && (
              <p className="text-red-600 text-sm md:col-span-2">{errors.title.message}</p>
            )}

            <InputWithIcon
              icon={GraduationCap}
              label="Company"
              {...register("company", { required: "Company is required" })}
              placeholder="Company name"
            />
            <InputWithIcon
              icon={Award}
              label="Experience Level"
              {...register("level", { required: "Level is required" })}
              placeholder="e.g. 3-5 years"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  {...register("type", { required: true })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>
            </div>
            <InputWithIcon
              icon={MapPin}
              label="Location"
              {...register("location", { required: "Location is required" })}
              placeholder="Remote / Hybrid / City"
            />
            <InputWithIcon
              icon={DollarSign}
              label="Salary Range"
              {...register("salary", { required: "Salary is required" })}
              placeholder="$80k - $120k"
            />
            <InputWithIcon
              icon={Calendar}
              label="Application Deadline"
              type="date"
              {...register("deadline", { required: "Deadline is required" })}
            />
            <InputWithIcon
              icon={Users}
              label="Company Size (optional)"
              {...register("companySize")}
              placeholder="e.g., 200-500"
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Job Description <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-4 text-gray-400 h-5 w-5" />
              <textarea
                {...register("description", {
                  required: "Description is required",
                  minLength: { value: 20, message: "Write at least 20 characters" },
                })}
                placeholder="Write a clear and engaging job description..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg h-36 focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>
            {errors.description && (
              <p className="text-red-600 text-sm">{errors.description.message}</p>
            )}
          </div>
        );
      case 3:
        return (
          <div>
            <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
              <ListChecks className="h-5 w-5 text-purple-600" /> Responsibilities
            </h4>
            {respFields.map((f, idx) => (
              <div key={f.id} className="flex gap-3 mb-2 items-center">
                <input
                  {...register(`responsibilities.${idx}.value` as const)}
                  defaultValue={f.value}
                  placeholder="e.g. Build scalable web services..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={() => removeResp(idx)}
                  className="text-red-600 px-2 py-1 rounded hover:bg-red-50"
                >
                  ✕
                </button>
              </div>
            ))}
            {errors.responsibilities && (
              <p className="text-red-600 text-sm">{(errors.responsibilities as any).message}</p>
            )}
            <button
              type="button"
              onClick={() => appendResp({ value: "" })}
              className="mt-2 inline-flex items-center gap-2 text-purple-600 font-medium"
            >
              + Add Responsibility
            </button>
          </div>
        );
      case 4:
        return (
          <div>
            <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
              <Award className="h-5 w-5 text-purple-600" /> Requirements
            </h4>
            {reqFields.map((f, idx) => (
              <div key={f.id} className="flex gap-3 mb-2 items-center">
                <input
                  {...register(`requirements.${idx}.value` as const)}
                  defaultValue={f.value}
                  placeholder="e.g. 3+ years backend experience..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={() => removeReq(idx)}
                  className="text-red-600 px-2 py-1 rounded hover:bg-red-50"
                >
                  ✕
                </button>
              </div>
            ))}
            {errors.requirements && (
              <p className="text-red-600 text-sm">{(errors.requirements as any).message}</p>
            )}
            <button
              type="button"
              onClick={() => appendReq({ value: "" })}
              className="mt-2 inline-flex items-center gap-2 text-purple-600 font-medium"
            >
              + Add Requirement
            </button>
          </div>
        );
      case 5:
        return (
          <div>
            <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
              <Gift className="h-5 w-5 text-purple-600" /> Benefits
            </h4>
            {benFields.map((f, idx) => (
              <div key={f.id} className="flex gap-3 mb-2 items-center">
                <input
                  {...register(`benefits.${idx}.value` as const)}
                  defaultValue={f.value}
                  placeholder="e.g. Health insurance, remote stipend..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={() => removeBen(idx)}
                  className="text-red-600 px-2 py-1 rounded hover:bg-red-50"
                >
                  ✕
                </button>
              </div>
            ))}
            {errors.benefits && (
              <p className="text-red-600 text-sm">{(errors.benefits as any).message}</p>
            )}
            <button
              type="button"
              onClick={() => appendBen({ value: "" })}
              className="mt-2 inline-flex items-center gap-2 text-purple-600 font-medium"
            >
              + Add Benefit
            </button>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Alumni Message</label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-4 text-gray-400 h-5 w-5" />
              <textarea
                {...register("alumniMessage")}
                placeholder="Share any message for alumni candidates..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>
            <label className="flex items-center gap-3 mt-2">
              <input {...register("referral")} type="checkbox" className="w-4 h-4 accent-purple-600" />
              <span className="text-gray-700">Available for referrals</span>
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  const PreviewCard = ({ data }: { data: JobFormValues }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-3xl mx-auto">
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-900">{data.title || "Job Title"}</h1>
          <p className="text-lg text-gray-600">{data.company || "Company"}</p>
          <div className="flex gap-2 mt-3">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">{data.type}</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">{data.location}</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">{data.salary}</span>
          </div>
        </div>

        {data.description && (
          <div>
            <h3 className="font-semibold text-gray-900">About this role</h3>
            <p className="text-gray-600">{data.description}</p>
          </div>
        )}

        {data.responsibilities.filter(r => r.value.trim()).length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900">Key Responsibilities</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              {data.responsibilities.filter(r => r.value.trim()).map((r, i) => <li key={i}>{r.value}</li>)}
            </ul>
          </div>
        )}

        {data.requirements.filter(r => r.value.trim()).length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900">Requirements</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              {data.requirements.filter(r => r.value.trim()).map((r, i) => <li key={i}>{r.value}</li>)}
            </ul>
          </div>
        )}

        {data.benefits.filter(b => b.value.trim()).length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900">Benefits</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              {data.benefits.filter(b => b.value.trim()).map((b, i) => <li key={i}>{b.value}</li>)}
            </ul>
          </div>
        )}

        {(data.alumniMessage || data.referral) && (
          <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-purple-600" /> Alumni Notes
            </h3>
            {data.alumniMessage && <p className="text-gray-600">{data.alumniMessage}</p>}
            {data.referral && <p className="text-sm text-purple-700 font-medium mt-2">✓ Referrals available</p>}
          </div>
        )}
      </div>
    </div>
  );

  // when showing preview, call getValues to gather current form data
  const previewData = getValues();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-blue-200 py-8"> 
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 text-purple-700"
          style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.5)" }}
          >Post a New Job</h2>
          <p className="text-gray-600"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.6)" }}
          >Fill steps to create an engaging job posting</p>
        </div>

        {/* progress */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="h-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* form card */}
        {!showPreview ? (
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden">
            <div className="p-8">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{`Step ${currentStep}`} - {["Basic Info","Description","Responsibilities","Requirements","Benefits","Alumni"][currentStep-1]}</h3>
                <p className="text-sm text-gray-600 mt-1">Complete the fields for this section</p>
              </div>

              <div className="animate-fade-in">
                <StepContent />
              </div>
            </div>

            {/* navigation */}
            <div className="bg-gray-50 px-8 py-4 flex justify-between items-center">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  currentStep === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              <div className="flex gap-3">
                {currentStep === totalSteps ? (
                  <button
                    type="button"
                    onClick={() => setShowPreview(true)}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold shadow hover:shadow-lg flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Preview
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold shadow hover:shadow-lg flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </form>
        ) : (
          // preview screen
          <div>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Preview Job Posting</h3>
              <p className="text-gray-600">Review before final submit</p>
            </div>

            <PreviewCard data={previewData as JobFormValues} />

            <div className="flex justify-center gap-4 mt-6">
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="px-6 py-2 bg-gray-200 rounded-lg font-medium hover:bg-gray-300"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 flex items-center gap-2"
              >
                <Send className="h-4 w-4" /> Submit
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.36s ease-out; }
      `}</style>
    </div>
  );
}
