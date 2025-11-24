import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowLeft, Phone, Mail, MapPin, User, CalendarDays } from "lucide-react";

export default function LeadDetail() {
  const { id } = useParams();

  const lead = useSelector((state) =>
    state.leads.list.find((l) => l._id === id)
  );

  const v = (x) => (x === undefined || x === null || x === "" ? "-" : x);

  if (!lead) {
    return (
      <div className="max-w-4xl mx-auto p-10 mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-700">Lead not found</h2>
        <p className="text-gray-500 mt-2">It may have been removed or unsynced.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-10 mt-10 bg-white shadow-xl rounded-3xl space-y-12 border border-gray-200">

      {/* HEADER */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-300">
        <div className="space-y-2">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {v(lead.lead_name)}
          </h2>

          <span className="inline-block px-4 py-1 bg-blue-50 border border-blue-300
            text-blue-700 rounded-full text-sm font-semibold tracking-wide">
            {v(lead.status)}
          </span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => console.log("convert to deal")}
            className="px-6 py-2 bg-green-600 text-white rounded-xl text-sm font-semibold
              shadow hover:bg-green-700 transition"
          >
            Convert to Deal
          </button>
        </div>
      </div>

      {/* PRIMARY INFO SECTION */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800 tracking-wide">Lead Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Field icon={<User size={16} />} label="Customer Name" value={v(lead.customer_name)} />
          <Field icon={<Mail size={16} />} label="Email" value={v(lead.customer_email)} />
          <Field icon={<Phone size={16} />} label="Phone" value={v(lead.customer_mobile)} />
          <Field icon={<Phone size={16} />} label="Whatsapp" value={v(lead.customer_whatsapp)} />
          <Field icon={<User size={16} />} label="Lead Owner" value={v(lead.lead_owner_email)} />
          <Field icon={<MapPin size={16} />} label="Address" value={v(lead.address)} className="lg:col-span-2" />
          <Field label="Pincode" value={v(lead.pincode)} />
          <Field label="City" value={v(lead.city)} />
          <Field icon={<CalendarDays size={16} />} label="Created At" value={lead.createdAt ? new Date(lead.createdAt).toLocaleString() : "-"} />
          <Field icon={<CalendarDays size={16} />} label="Last Updated" value={lead.updatedAt ? new Date(lead.updatedAt).toLocaleString() : "-"} />
        </div>
      </section>

      {/* NOTES */}
      {lead.notes && (
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800 tracking-wide">Notes</h3>
          <p className="text-gray-800 bg-gray-50 p-5 rounded-xl shadow-inner border border-gray-200 whitespace-pre-line leading-relaxed">
            {v(lead.notes)}
          </p>
        </section>
      )}

      {/* FORM RESPONSE HISTORY TIMELINE */}
      {lead.form_history?.length > 0 && (
        <section>
          <h3 className="text-2xl font-bold mb-4 text-gray-900 tracking-tight">Form Response Timeline</h3>

          <div className="space-y-8 border-l-4 border-blue-500 pl-8 relative">
            {lead.form_history.map((item, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-md relative">
                <span className="absolute -left-5 top-6 h-6 w-6 bg-blue-600 border-4 border-white rounded-full shadow-lg"></span>

                <p className="text-blue-700 font-semibold mb-3">
                  Version {item.version} • {new Date(item.updated_at).toLocaleString()}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(item).map(([key, value], idx) =>
                    key !== "_id" && key !== "__v" ? (
                      <div key={idx} className="bg-white p-3 rounded-lg border shadow-sm">
                        <p className="text-gray-500 text-xs uppercase tracking-wide">{key}</p>
                        <p className="font-semibold text-gray-900">{String(value)}</p>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Field({ label, value, icon, className = "" }) {
  return (
    <div className={className}>
      <p className="text-gray-500 flex items-center gap-2 text-xs uppercase tracking-wider font-semibold">
        {icon} {label}
      </p>
      <p className="font-bold text-gray-900 text-lg mt-1">{value}</p>
    </div>
  );
}
