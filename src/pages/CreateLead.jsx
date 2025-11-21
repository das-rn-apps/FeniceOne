import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

const addLead = async (payload) => {
  return await axios.post(
    "https://seonebodev.sunedison.in/bo/api/lead/addLead",
    payload
  );
};

export default function CreateLead() {
  const { register, handleSubmit, reset } = useForm();
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
    <div className="max-w-5xl mx-auto p-10 mt-10 bg-white shadow-xl rounded-2xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Create New Lead
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <InputField label="Lead Name" register={register("lead_name")} />
        <InputField label="Customer Name" register={register("customer_name")} />
        <InputField label="Customer Email" register={register("customer_email")} />
        <InputField label="Customer Mobile" register={register("customer_mobile")} />
        <InputField label="Customer WhatsApp" register={register("customer_whatsapp")} />


        <InputField label="Property Type" register={register("property_type")} />

        <InputField label="City" register={register("city")} />
        <InputField label="Pincode" register={register("pincode")} />

        <InputField label="Address" register={register("address")} />
        <InputField label="Latitude" register={register("latitude")} />
        <InputField label="Longitude" register={register("longitude")} />

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-end mt-4">
          <button
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? "Saving..." : "Save Lead"}
          </button>
        </div>
      </form>
    </div>
  );
}

function InputField({ label, register }) {
  return (
    <div className="relative">
      <input
        {...register}
        placeholder=" "
        className="peer w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <label
        className="absolute left-4 -top-2 bg-white px-1 text-sm text-blue-700 transition-all
        peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent
        peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-700"
      >
        {label}
      </label>
    </div>
  );
}
