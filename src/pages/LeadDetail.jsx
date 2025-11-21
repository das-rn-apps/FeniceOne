import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function LeadDetail() {
  const { id } = useParams();

  const lead = useSelector((state) =>
    state.leads.list.find((l) => l._id === id)
  );

  const v = (x) => (x === undefined || x === null || x === "" ? "-" : x);

  if (!lead) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-10 text-center">
        <h2 className="text-xl font-semibold text-gray-600">Lead not found</h2>
        <p className="text-sm text-gray-400 mt-2">Maybe deleted or not synced.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-10 bg-white rounded-2xl shadow-lg mt-8 space-y-10">

      {/* Header */}
      <div className="flex justify-between items-center pb-6 border-b border-gray-200">
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-1">{v(lead.lead_name)}</h2>
          <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {v(lead.status)}
          </span>
        </div>

        <button
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md font-medium"
          onClick={() => console.log("Convert to deal:", lead._id)}
        >
          Convert to Deal
        </button>
      </div>

      {/* Main fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Field label="Email" value={v(lead.email)} />
        <Field label="Phone" value={v(lead.phone)} />
        <Field label="Alternate Phone" value={v(lead.alt_phone)} />
        <Field label="Company" value={v(lead.company)} />
        <Field label="Industry" value={v(lead.industry)} />
        <Field label="Source" value={v(lead.source)} />
        <Field label="Assigned To" value={v(lead.assigned_to)} />
        <Field label="Address" value={v(lead.address)} className="lg:col-span-2" />
        <Field label="Created At" value={lead.createdAt ? new Date(lead.createdAt).toLocaleString() : "-"} />
        <Field label="Last Updated" value={lead.updatedAt ? new Date(lead.updatedAt).toLocaleString() : "-"} />
      </div>

      {/* Notes */}
      {lead.notes && (
        <div>
          <h3 className="text-xl font-semibold mb-3">Notes</h3>
          <p className="text-gray-700 bg-gray-50 p-4 rounded-lg shadow-sm whitespace-pre-line">
            {v(lead.notes)}
          </p>
        </div>
      )}

      {/* Form History Timeline */}
      {lead.form_history?.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Form Responses</h3>

          <div className="space-y-6 border-l-4 border-blue-400 pl-6">
            {lead.form_history.map((item, index) => (
              <div key={index} className="relative bg-gray-50 rounded-xl shadow-sm p-5">
                <span className="absolute -left-3 top-4 h-6 w-6 bg-blue-500 border-4 border-white rounded-full shadow"></span>

                <p className="text-sm text-blue-700 font-semibold mb-2">
                  Version {item.version} • {new Date(item.updated_at).toLocaleString()}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(item).map(([key, value], idx) => (
                    key !== "_id" && key !== "__v" && (
                      <div key={idx} className="bg-white p-3 rounded-md shadow-sm">
                        <p className="text-gray-500 text-xs uppercase tracking-wide">{key}</p>
                        <p className="font-medium text-gray-900">{String(value)}</p>
                      </div>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, className = "" }) {
  return (
    <div className={className}>
      <p className="text-gray-500 text-sm uppercase tracking-wide">{label}</p>
      <p className="font-semibold text-gray-900 text-lg mt-1">{value}</p>
    </div>
  );
}
