import { useState } from "react";
import { X } from "lucide-react";

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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-999 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col border border-gray-200 max-h-[90vh] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-700">{template.name}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <X size={22} className="text-gray-700" />
          </button>
        </div>

        {/* Form Scrollable Body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-5 custom-scroll"
        >
          {template.fields.map((field) => (
            <div key={field.key} className="relative">
              <label className="block mb-1 font-medium text-gray-700">
                {field.label}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  value={formData[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-300 outline-none"
                  rows={3}
                />
              ) : field.type === "select" ? (
                <select
                  value={formData[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-300 outline-none"
                >
                  <option value="">Select Option</option>
                  {field.options?.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : field.type === "checkbox" ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData[field.key] || false}
                    onChange={(e) => handleChange(field.key, e.target.checked)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span>{field.label}</span>
                </div>
              ) : (
                <input
                  type={field.type}
                  value={formData[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-300 outline-none"
                />
              )}
            </div>
          ))}
        </form>

        {/* Footer */}
        <div className="border-t p-4 bg-white flex justify-end space-x-3">
          <button
            type="button"
            className="px-5 py-2 rounded-lg border bg-white hover:bg-gray-100 transition"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
