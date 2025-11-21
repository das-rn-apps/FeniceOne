import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Lead Manager</h1>

      <div className="flex items-center gap-4">
        <Link to="/" className="hover:text-blue-600">LeadsV1</Link>
        <Link to="/create" className="hover:text-blue-600">Create</Link>
      </div>
    </div>
  );
}
