import { Routes, Route } from "react-router-dom";
import CreateLead from "./pages/CreateLead";
import LeadDetail from "./pages/LeadDetail";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import LeadListView from "./pages/LeadListView";

export default function App() {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Navbar />

      <div className="w-full">
        <Routes>
          <Route path="/create" element={<CreateLead />} />
          <Route path="/lead/:id" element={<LeadDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LeadListView />} />
        </Routes>
      </div>
    </div>
  );
}

