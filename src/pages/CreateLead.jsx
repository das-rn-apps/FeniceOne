import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

const addLead = async (payload) => {
  return await axios.post("https://seonebodev.sunedison.in/bo/api/lead/addLead", payload);
};

export default function CreateLead() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await addLead(data);
      reset();
      alert("Lead created successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to create lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 mt-10 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Create New Lead
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Lead Name */}
        <InputField
          label="Lead Name"
          register={register("lead_name", { required: true })}
          error={errors.lead_name}
        />

        {/* Email */}
        <InputField
          label="Email"
          register={register("email", { required: true })}
          error={errors.email}
        />

        {/* Phone */}
        <InputField
          label="Phone"
          register={register("phone", { required: true })}
          error={errors.phone}
        />

        {/* Company */}
        <InputField label="Company" register={register("company")} />

        {/* Submit */}
        <div className="md:col-span-2 flex justify-end mt-4">
          <button
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md font-medium hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? "Saving..." : "Save Lead"}
          </button>
        </div>
      </form>
    </div>
  );
}

function InputField({ label, register, error }) {
  return (
    <div className="relative">
      <input
        {...register}
        placeholder=" "
        className={`peer w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 ${error ? "border-red-500 ring-red-300" : "focus:ring-blue-300"
          }`}
      />
      <label
        className="absolute left-4 -top-2 bg-white px-1 text-sm text-blue-700 transition-all peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-700"
      >
        {label}
      </label>

      {error && <p className="text-red-500 text-xs mt-1">This field is required</p>}
    </div>
  );
}
