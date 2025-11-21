import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads, updateLeadStatus, updateProfileShare } from "../features/leads/leadsSlice";
import { fetchTemplates } from "../features/formTemplates/formTemplatesSlice";
import LeadFormModal from "../components/LeadFormModal";
import { useNavigate } from "react-router-dom";

export default function LeadListView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list, loading } = useSelector((state) => state.leads);
  const templates = useSelector((state) => state.formTemplates?.templates || []);

  const [openLead, setOpenLead] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchLeads());
    dispatch(fetchTemplates());
  }, [dispatch]);

  const handleStatusChange = (id, newStatus, e) => {
    e.stopPropagation();
    dispatch(updateLeadStatus({ id, status: newStatus }));
  };

  const handleProfileShareToggle = (id, newValue) => {
    dispatch(updateProfileShare({ id, value: newValue }));
  };

  const statusColors = {
    New: "bg-gray-100 text-gray-700",
    Contacted: "bg-blue-100 text-blue-700",
    Qualified: "bg-amber-100 text-amber-700",
    "Follow Up": "bg-purple-100 text-purple-700",
    Lost: "bg-red-100 text-red-700",
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600 text-lg font-medium">
        Loading leads...
      </p>
    );

  return (
    <div className="p-8 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Lead Management
        </h1>

        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 px-4 py-2 text-sm rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-xl rounded-xl border border-gray-200">
        <table className="w-full min-w-[1000px]">
          <thead className="bg-gray-100 sticky top-0">
            <tr className="text-left text-sm font-semibold text-gray-600">
              {["Lead Name", "Email", "Phone", "Status", "Profile Shared", "Created At", "Form"].map(
                (head) => (
                  <th key={head} className="p-4">{head}</th>
                )
              )}
            </tr>
          </thead>

          <tbody className="text-sm text-gray-800">
            {list.map((lead) => (
              <tr
                key={lead._id}
                onClick={() => navigate(`/lead/${lead._id}`)}
                className="cursor-pointer hover:bg-blue-50 transition-all border-b last:border-none"
              >
                <td className="p-4 font-medium text-gray-900">{lead.lead_name}</td>
                <td className="p-4">{lead.email}</td>
                <td className="p-4">{lead.phone}</td>

                {/* Status badge */}
                <td className="p-4">
                  <select
                    value={lead.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleStatusChange(lead._id, e.target.value, e)}
                    className={`px-2 py-1 rounded-md text-xs font-semibold border border-gray-300 ${statusColors[lead.status]}`}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Follow Up">Follow Up</option>
                    <option value="Lost">Lost</option>
                  </select>
                </td>

                {/* Profile share switch */}
                <td className="p-4">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleProfileShareToggle(lead._id, !lead.profile_share); }}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition ${lead.profile_share
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {lead.profile_share ? "Shared" : "No"}
                  </button>
                </td>

                <td className="p-4">{lead.createdAt?.slice(0, 10) || "-"}</td>

                <td className="p-4">
                  <button
                    onClick={(e) => { e.stopPropagation(); setOpenLead(lead); }}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700"
                  >
                    Open Form
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {openLead && templates.length > 0 && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[550px] shadow-2xl rounded-2xl p-6 animate-fadeIn">
            <LeadFormModal
              lead={openLead}
              template={templates[0]}
              onClose={() => setOpenLead(null)}
              onSave={(updated) => console.log("Updated Lead:", updated)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
