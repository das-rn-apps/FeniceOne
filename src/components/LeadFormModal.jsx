import { useState } from "react";

export default function LeadFormModal({ lead = {}, template, onClose, onSave }) {
  const [formData, setFormData] = useState(lead);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[999] px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-gray-200 max-h-[90vh] flex flex-col">

        {/* Header */}
        <h2 className="text-2xl font-bold p-6 pb-4 text-blue-700 border-b">
          {template.name}
        </h2>

        {/* Scrollable form container */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {template.fields.map((field) => (
            <div key={field.key}>
              <label className="block font-medium mb-1 text-gray-700">
                {field.label}
              </label>

              {/* Dynamic field rendering */}
              {field.type === "textarea" ? (
                <textarea
                  value={formData[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full border p-2 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-300"
                />
              ) : field.type === "select" ? (
                <select
                  value={formData[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full border p-2 rounded-lg bg-gray-50"
                >
                  {field.options?.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : field.type === "checkbox" ? (
                <input
                  type="checkbox"
                  checked={formData[field.key] || false}
                  onChange={(e) => handleChange(field.key, e.target.checked)}
                  className="h-4 w-4 text-blue-600"
                />
              ) : (
                <input
                  type={field.type}
                  value={formData[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full border p-2 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-300"
                />
              )}
            </div>
          ))}
        </form>

        {/* Footer buttons fixed bottom */}
        <div className="border-t p-4 flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
