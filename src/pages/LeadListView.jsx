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
    New: "bg-gray-100 text-gray-800 border-gray-300",
    Contacted: "bg-blue-100 text-blue-800 border-blue-300",
    Qualified: "bg-amber-100 text-amber-800 border-amber-300",
    "Follow Up": "bg-purple-100 text-purple-800 border-purple-300",
    Lost: "bg-red-100 text-red-800 border-red-300",
  };

  if (loading)
    return (
      <div className="flex justify-center pt-20">
        <p className="text-gray-600 text-lg font-medium animate-pulse">
          Loading leads...
        </p>
      </div>
    );

  return (
    <div className="w-full px-8 py-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Lead Management
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Manage and track all customer leads efficiently
          </p>
        </div>

        <input
          type="text"
          placeholder="Search by name, phone or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-72 px-4 py-2 text-sm rounded-lg border border-gray-300 shadow-sm
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
        <table className="w-full min-w-[1100px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-left text-sm font-semibold text-gray-700">
              {["Lead Name", "Email", "Phone", "Status", "Profile Shared", "Created At", "Actions"].map(
                (head) => (
                  <th key={head} className="p-4 uppercase tracking-wider">
                    {head}
                  </th>
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
                <td className="p-4 font-semibold text-gray-900">{lead.lead_name || "-"}</td>
                <td className="p-4">{lead.customer_email || "-"}</td>
                <td className="p-4">{lead.customer_mobile || "-"}</td>

                <td className="p-4">
                  <select
                    value={lead.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleStatusChange(lead._id, e.target.value, e)}
                    className={`px-2 py-1 rounded-md text-xs font-semibold border ${statusColors[lead.status]}`}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Follow Up">Follow Up</option>
                    <option value="Lost">Lost</option>
                  </select>
                </td>

                <td className="p-4">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleProfileShareToggle(lead._id, !lead.profile_share); }}
                    className={`px-4 py-1 rounded-full text-xs font-semibold border transition ${lead.profile_share
                      ? "bg-green-100 text-green-800 border-green-300"
                      : "bg-gray-200 text-gray-700 border-gray-300"
                      }`}
                  >
                    {lead.profile_share ? "YES" : "NO"}
                  </button>
                </td>

                <td className="p-4">{lead.createdAt?.slice(0, 10) || "-"}</td>

                <td className="p-4">
                  <button
                    onClick={(e) => { e.stopPropagation(); setOpenLead(lead); }}
                    className="px-4 py-1 bg-blue-600 text-white rounded-lg text-xs shadow hover:bg-blue-700 transition"
                  >
                    OPEN FORM
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
          <div className="bg-white w-[600px] shadow-2xl rounded-2xl p-6 animate-fadeIn">
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
