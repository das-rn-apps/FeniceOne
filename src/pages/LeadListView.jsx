import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads, updateLeadStatus, updateProfileShare } from "../features/leads/leadsSlice";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import axios from "axios";


const statusColors = {
  new: "bg-blue-100 text-blue-700 border-blue-400",
  in_progress: "bg-yellow-100 text-yellow-700 border-yellow-400",
  converted: "bg-green-100 text-green-700 border-green-400",
  lost: "bg-red-100 text-red-700 border-red-400",
};

export default function LeadListView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading } = useSelector((state) => state.leads);

  const [meetForm, setMeetForm] = useState(null);
  const [responseDrawerLead, setResponseDrawerLead] = useState(null);
  const [hoverLead, setHoverLead] = useState(null);

  /* Form State */
  const [formState, setFormState] = useState({
    site_location: "",
    customer_name: "",
    phone: "",
    survey_date: "",
    roof_type: "",
    shadow_analysis: "",
    rooftop_area: "",
    load_requirement: "",
    distance_meter: "",
    mount_type: "",
    comments: "",
  });

  const handleFormChange = (k, v) => setFormState((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const handleSubmitForm = async () => {
    const payload = { lead_id: meetForm._id, ...formState };
    console.log("Submitting payload:", payload);
    try {
      const response = await axios.post(
        "https://seonebodev.sunedison.in/bo/api/lead/updateLeadData",
        payload
      );

      setMeetForm(null);
      alert("Survey Form Submitted Successfully!");
      return response;
    } catch (error) {
      console.error("API submission failed:", error);
      alert("Submission Failed: Please try again.");
      throw error;
    }
  };

  if (loading) return <p className="pt-20 text-center">Loading...</p>;

  return (
    <div className="w-full p-5">
      {/* Table */}
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 bg-white">
        <table className="w-full min-w-[1100px]">
          <thead className="bg-gray-50">
            <tr className="text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
              {["Lead Name", "Email", "Phone", "Status", "Shared", "Created", "Responses", "Meeting"].map((h) => (
                <th key={h} className="p-4">{h}</th>
              ))}
            </tr>
          </thead>

          <tbody className="text-sm text-gray-800">
            {list.map((lead) => (
              <tr key={lead._id}
                className="cursor-pointer hover:bg-blue-50 border-b transition"
                onClick={() => navigate(`/lead/${lead._id}`)}>

                <td className="p-4 font-semibold">{lead.lead_name}</td>
                <td className="p-4">{lead.customer_email}</td>
                <td className="p-4">{lead.customer_mobile}</td>

                {/* Status */}
                <td className="p-4">
                  <select
                    className={`px-2 py-1 rounded text-xs border font-semibold ${statusColors[lead.status]}`}
                    value={lead.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => dispatch(updateLeadStatus({ id: lead._id, status: e.target.value }))}>
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="converted">Converted</option>
                    <option value="lost">Lost</option>
                  </select>
                </td>

                {/* Checkbox */}
                <td className="p-4">
                  <Checkbox checked={lead.profile_share}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(v) => dispatch(updateProfileShare({ id: lead._id, value: v }))}
                  />
                </td>

                <td className="p-4">{lead.createdAt?.slice(0, 10)}</td>

                {/* Details Drawer */}
                <td className="p-4">
                  <button
                    className="px-3 py-1 bg-gray-900 hover:bg-black text-white rounded-md text-xs"
                    onClick={(e) => { e.stopPropagation(); setResponseDrawerLead(lead); }}
                    onMouseEnter={() => setHoverLead(lead)}
                    onMouseLeave={() => setHoverLead(null)}>
                    Show Details
                  </button>
                </td>

                {/* Meeting */}
                <td className="p-4">
                  <button
                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                    onClick={(e) => { e.stopPropagation(); setMeetForm(lead); }}>
                    <Plus size={16} />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MEETING FORM DRAWER */}
      {meetForm && <MeetingDrawer meetForm={meetForm} setMeetForm={setMeetForm} formState={formState} handleChange={handleFormChange} submit={handleSubmitForm} />}

      {/* DETAILS DRAWER */}
      {(responseDrawerLead || hoverLead) && <ResponseDrawer lead={responseDrawerLead || hoverLead} close={() => { setHoverLead(null); setResponseDrawerLead(null); }} />}

    </div>
  );
}

/* Reusable components */
const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-semibold">{label}</label>
    <input {...props} className="w-full border px-3 py-2 rounded-lg mt-1" />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="text-sm font-semibold">{label}</label>
    <select {...props} className="w-full border px-3 py-2 rounded-lg mt-1">
      <option value="">Select</option>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  </div>
);

const Checkbox = ({ checked, onChange, onClick }) => (
  <input type="checkbox" checked={checked} className="w-5 h-5 accent-green-600 cursor-pointer"
    onClick={onClick} onChange={(e) => onChange(e.target.checked)} />
);

const MeetingDrawer = ({ meetForm, setMeetForm, formState, handleChange, submit }) => (
  <div className="fixed inset-0 bg-black/40 z-50">
    <div className="fixed left-0 top-0 h-full w-[75vw] bg-white shadow-2xl border-r p-6 animate-slideIn overflow-y-auto">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Solar Site Survey — {meetForm.lead_name}</h2>
        <button onClick={() => setMeetForm(null)} className="text-3xl hover:text-black">×</button>
      </div>

      <form className="grid grid-cols-2 gap-4">
        <Input label="Site Location" value={formState.site_location} onChange={(e) => handleChange("site_location", e.target.value)} />
        <Input label="Customer Name" value={formState.customer_name} onChange={(e) => handleChange("customer_name", e.target.value)} />
        <Input label="Phone Number" value={formState.phone} onChange={(e) => handleChange("phone", e.target.value)} />
        <Input label="Survey Date" type="date" value={formState.survey_date} onChange={(e) => handleChange("survey_date", e.target.value)} />

        <Select label="Roof Type" value={formState.roof_type} onChange={(e) => handleChange("roof_type", e.target.value)} options={["RCC", "Metal Sheet", "Asbestos", "Tile"]} />
        <Select label="Shadow Analysis" value={formState.shadow_analysis} onChange={(e) => handleChange("shadow_analysis", e.target.value)} options={["Yes", "No"]} />

        <Input label="Available Rooftop Area (sqft)" value={formState.rooftop_area} onChange={(e) => handleChange("rooftop_area", e.target.value)} />
        <Input label="Load Requirement (kW)" value={formState.load_requirement} onChange={(e) => handleChange("load_requirement", e.target.value)} />
        <Input label="Distance to Main Meter (meters)" value={formState.distance_meter} onChange={(e) => handleChange("distance_meter", e.target.value)} />
        <Select label="Mount Type" value={formState.mount_type} onChange={(e) => handleChange("mount_type", e.target.value)} options={["Rooftop", "Ground Mounted"]} />

        <div className="col-span-2">
          <label className="text-sm font-semibold">Additional Comments</label>
          <textarea rows={4} className="w-full border rounded-lg p-3 mt-1"
            value={formState.comments} onChange={(e) => handleChange("comments", e.target.value)} />
        </div>
      </form>

      <div className="mt-6 flex justify-end gap-4">
        <button onClick={() => setMeetForm(null)} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
        <button onClick={submit} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save</button>
      </div>
    </div>
  </div>
);

const ResponseDrawer = ({ lead, close }) => (
  <div className="fixed left-0 top-0 h-full w-[75vw] bg-white shadow-2xl border-r p-6 animate-slideIn overflow-y-auto">
    <div className="flex justify-between items-center mb-5">
      <h2 className="text-2xl font-bold">Meeting Details — {lead.lead_name}</h2>
      <button onClick={close} className="text-3xl hover:text-black">×</button>
    </div>

    <div className="grid grid-cols-2 gap-4">
      {lead.form_history?.map((r, i) => (
        <div key={i} className="p-4 bg-gray-100 rounded-xl border shadow-sm">
          <p className="text-sm font-semibold">Version {r.version}</p>
          <p className="text-xs text-gray-600">Updated: {r.updated_at?.slice(0, 10)}</p>
          <pre className="text-xs whitespace-pre-wrap mt-2">{JSON.stringify(r, null, 2)}</pre>
        </div>
      ))}
    </div>
  </div>
);
